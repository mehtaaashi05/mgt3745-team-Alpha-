// Alpha travel app API. One Worker serves /api/* and the static pages in public/ (ADR-001).
// Every query uses prepare().bind() (STANDARDS.md). Each route names the EARS rows it serves.

const SESSION_COOKIE = 'alpha_session';
const SESSION_DAYS = 30;
// Workers caps PBKDF2 at 100,000 iterations.
const PBKDF2_ITERATIONS = 100000;
// Keeps a resized photo well under D1's per-value limit; full-size photos are not stored (ADR-001 consequences).
const MAX_PHOTO_CHARS = 700000;
const MAX_NOTE_CHARS = 2000;
const MAX_PLACE_CHARS = 200;
const MAX_TRIP_NAME_CHARS = 100;
const USERNAME_PATTERN = /^[A-Za-z0-9_.-]{3,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHOTO_PREFIX_PATTERN = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

const textEncoder = new TextEncoder();

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extraHeaders },
  });
}

function errorResponse(status, message) {
  return jsonResponse({ error: message }, status);
}

function toBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(text) {
  return Uint8Array.from(atob(text), (character) => character.charCodeAt(0));
}

function randomToken(byteCount = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteCount));
  return toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sha256Base64(text) {
  const digest = await crypto.subtle.digest('SHA-256', textEncoder.encode(text));
  return toBase64(new Uint8Array(digest));
}

async function pbkdf2(password, saltBytes, iterations) {
  const keyMaterial = await crypto.subtle.importKey('raw', textEncoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

// Stored as pbkdf2$iterations$salt$hash so the cost can rise later without breaking old accounts.
async function hashPassword(password) {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const hashBytes = await pbkdf2(password, saltBytes, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toBase64(saltBytes)}$${toBase64(hashBytes)}`;
}

async function verifyPassword(password, storedHash) {
  const [scheme, iterationText, saltText, hashText] = storedHash.split('$');
  if (scheme !== 'pbkdf2') return false;
  const candidateBytes = await pbkdf2(password, fromBase64(saltText), Number(iterationText));
  const expectedBytes = fromBase64(hashText);
  if (candidateBytes.length !== expectedBytes.length) return false;
  // Constant-time comparison so response timing does not leak how much of the hash matched.
  let difference = 0;
  for (let index = 0; index < expectedBytes.length; index += 1) difference |= candidateBytes[index] ^ expectedBytes[index];
  return difference === 0;
}

function readCookie(request, cookieName) {
  const cookieHeader = request.headers.get('cookie') || '';
  for (const part of cookieHeader.split(';')) {
    const [rawName, ...rawValue] = part.trim().split('=');
    if (rawName === cookieName) return rawValue.join('=');
  }
  return null;
}

function sessionCookie(token, maxAgeSeconds) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

async function startSession(env, accountId) {
  const sessionToken = randomToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString();
  await env.DB.prepare('INSERT INTO sessions (token_hash, account_id, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256Base64(sessionToken), accountId, expiresAt)
    .run();
  return sessionCookie(sessionToken, SESSION_DAYS * 86400);
}

async function currentAccount(request, env) {
  const sessionToken = readCookie(request, SESSION_COOKIE);
  if (!sessionToken) return null;
  return env.DB.prepare(
    `SELECT accounts.id, accounts.username
       FROM sessions JOIN accounts ON accounts.id = sessions.account_id
      WHERE sessions.token_hash = ? AND sessions.expires_at > ?`,
  )
    .bind(await sha256Base64(sessionToken), new Date().toISOString())
    .first();
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function cleanText(value, maxChars) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxChars);
}

// F1-1, F1-2
async function handleSignup(request, env) {
  const body = await readJson(request);
  if (!body) return errorResponse(400, 'Send email, username, and password.');
  const email = cleanText(body.email, 254);
  const username = cleanText(body.username, 30);
  const password = typeof body.password === 'string' ? body.password : '';
  if (!EMAIL_PATTERN.test(email)) return errorResponse(400, 'Enter a valid email address.');
  if (!USERNAME_PATTERN.test(username)) return errorResponse(400, 'Usernames are 3 to 30 letters, numbers, dots, dashes, or underscores.');
  if (password.length < 8) return errorResponse(400, 'Passwords need at least 8 characters.');

  const usernameTaken = await env.DB.prepare('SELECT 1 FROM accounts WHERE username = ?').bind(username).first();
  if (usernameTaken) return errorResponse(409, 'That username is taken. Please choose a different one.');
  const emailTaken = await env.DB.prepare('SELECT 1 FROM accounts WHERE email = ?').bind(email).first();
  if (emailTaken) return errorResponse(409, 'An account already uses that email.');

  const insertResult = await env.DB.prepare('INSERT INTO accounts (email, username, password_hash) VALUES (?, ?, ?)')
    .bind(email, username, await hashPassword(password))
    .run();
  const accountId = insertResult.meta.last_row_id;
  const cookie = await startSession(env, accountId);
  return jsonResponse({ account: { id: accountId, username } }, 201, { 'set-cookie': cookie });
}

async function handleLogin(request, env) {
  const body = await readJson(request);
  const username = cleanText(body && body.username, 30);
  const password = body && typeof body.password === 'string' ? body.password : '';
  const account = await env.DB.prepare('SELECT id, username, password_hash FROM accounts WHERE username = ?').bind(username).first();
  // One message for both cases so the login form does not reveal which usernames exist.
  if (!account || !(await verifyPassword(password, account.password_hash))) {
    return errorResponse(401, 'That username and password do not match.');
  }
  const cookie = await startSession(env, account.id);
  return jsonResponse({ account: { id: account.id, username: account.username } }, 200, { 'set-cookie': cookie });
}

async function handleLogout(request, env) {
  const sessionToken = readCookie(request, SESSION_COOKIE);
  if (sessionToken) {
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256Base64(sessionToken)).run();
  }
  return jsonResponse({ ok: true }, 200, { 'set-cookie': sessionCookie('', 0) });
}

async function listTrips(env, account) {
  const { results } = await env.DB.prepare(
    `SELECT trips.id, trips.name, trips.created_at, trips.creator_id = ? AS is_creator,
            (SELECT COUNT(*) FROM members AS counted WHERE counted.trip_id = trips.id) AS member_count
       FROM trips JOIN members ON members.trip_id = trips.id
      WHERE members.account_id = ?
      ORDER BY trips.created_at DESC, trips.id DESC`,
  )
    .bind(account.id, account.id)
    .all();
  return jsonResponse({ trips: results });
}

function inviteUrlFor(request, inviteToken) {
  const origin = new URL(request.url).origin;
  return `${origin}/?invite=${encodeURIComponent(inviteToken)}`;
}

// F2-1, F2-3
async function createTrip(request, env, account) {
  const body = await readJson(request);
  const tripName = cleanText(body && body.name, MAX_TRIP_NAME_CHARS);
  if (!tripName) return errorResponse(400, 'Give the trip a name.');
  const inviteToken = randomToken();
  const tripInsert = await env.DB.prepare('INSERT INTO trips (name, creator_id, invite_token_hash) VALUES (?, ?, ?)')
    .bind(tripName, account.id, await sha256Base64(inviteToken))
    .run();
  const tripId = tripInsert.meta.last_row_id;
  await env.DB.prepare('INSERT INTO members (trip_id, account_id) VALUES (?, ?)').bind(tripId, account.id).run();
  // The token is shown once: only its hash is stored, so a leaked database cannot be used to join trips.
  return jsonResponse({ trip: { id: tripId, name: tripName }, inviteUrl: inviteUrlFor(request, inviteToken) }, 201);
}

// F2-2: an invalid link gets the same refusal whether or not the trip exists, and no trip details.
async function joinTrip(request, env, account) {
  const body = await readJson(request);
  const inviteToken = cleanText(body && body.token, 200);
  if (!inviteToken) return errorResponse(403, 'That invite link is not valid.');
  const trip = await env.DB.prepare('SELECT id, name FROM trips WHERE invite_token_hash = ?')
    .bind(await sha256Base64(inviteToken))
    .first();
  if (!trip) return errorResponse(403, 'That invite link is not valid.');
  await env.DB.prepare('INSERT OR IGNORE INTO members (trip_id, account_id) VALUES (?, ?)').bind(trip.id, account.id).run();
  return jsonResponse({ trip });
}

async function isMember(env, tripId, accountId) {
  const membership = await env.DB.prepare('SELECT 1 FROM members WHERE trip_id = ? AND account_id = ?').bind(tripId, accountId).first();
  return Boolean(membership);
}

// F4-1: moments in added order, each with its author.
async function getTrip(env, account, tripId) {
  // Non-members get the same 404 as a missing trip, so private trips stay invisible.
  if (!(await isMember(env, tripId, account.id))) return errorResponse(404, 'Trip not found.');
  const trip = await env.DB.prepare('SELECT id, name, creator_id, created_at FROM trips WHERE id = ?').bind(tripId).first();
  const { results: moments } = await env.DB.prepare(
    `SELECT moments.id, moments.photo_data_url, moments.note, moments.place, moments.created_at,
            moments.author_id, accounts.username AS author_username
       FROM moments JOIN accounts ON accounts.id = moments.author_id
      WHERE moments.trip_id = ?
      ORDER BY moments.created_at ASC, moments.id ASC`,
  )
    .bind(tripId)
    .all();
  const { results: members } = await env.DB.prepare(
    `SELECT accounts.username FROM members JOIN accounts ON accounts.id = members.account_id
      WHERE members.trip_id = ? ORDER BY members.joined_at ASC`,
  )
    .bind(tripId)
    .all();
  return jsonResponse({ trip, moments, members: members.map((member) => member.username), viewerId: account.id });
}

// F3-1, F3-3
async function addMoment(request, env, account, tripId) {
  if (!(await isMember(env, tripId, account.id))) return errorResponse(404, 'Trip not found.');
  const body = await readJson(request);
  if (!body) return errorResponse(400, 'Add a photo, a note, or a place.');
  const note = cleanText(body.note, MAX_NOTE_CHARS);
  const place = cleanText(body.place, MAX_PLACE_CHARS);
  const photoDataUrl = typeof body.photo === 'string' ? body.photo.trim() : '';
  if (photoDataUrl) {
    if (!PHOTO_PREFIX_PATTERN.test(photoDataUrl)) return errorResponse(400, 'That photo could not be read. Try a JPEG or PNG.');
    if (photoDataUrl.length > MAX_PHOTO_CHARS) return errorResponse(413, 'That photo is too large even after resizing. Try a smaller one.');
  }
  if (!note && !place && !photoDataUrl) return errorResponse(400, 'Add a photo, a note, or a place.');
  const momentInsert = await env.DB.prepare('INSERT INTO moments (trip_id, author_id, photo_data_url, note, place) VALUES (?, ?, ?, ?, ?)')
    .bind(tripId, account.id, photoDataUrl || null, note || null, place || null)
    .run();
  return jsonResponse({ moment: { id: momentInsert.meta.last_row_id } }, 201);
}

// F4-2
async function deleteMoment(env, account, momentId) {
  const moment = await env.DB.prepare('SELECT id, trip_id, author_id FROM moments WHERE id = ?').bind(momentId).first();
  if (!moment || !(await isMember(env, moment.trip_id, account.id))) return errorResponse(404, 'Moment not found.');
  if (moment.author_id !== account.id) return errorResponse(403, 'You can only delete moments you added.');
  await env.DB.prepare('DELETE FROM moments WHERE id = ? AND author_id = ?').bind(momentId, account.id).run();
  return jsonResponse({ ok: true });
}

async function routeApi(request, env, url) {
  const { pathname } = url;
  const method = request.method;

  if (pathname === '/api/signup' && method === 'POST') return handleSignup(request, env);
  if (pathname === '/api/login' && method === 'POST') return handleLogin(request, env);
  if (pathname === '/api/logout' && method === 'POST') return handleLogout(request, env);

  const account = await currentAccount(request, env);
  if (!account) return errorResponse(401, 'Please sign in.');

  if (pathname === '/api/me' && method === 'GET') return jsonResponse({ account });
  if (pathname === '/api/trips' && method === 'GET') return listTrips(env, account);
  if (pathname === '/api/trips' && method === 'POST') return createTrip(request, env, account);
  if (pathname === '/api/trips/join' && method === 'POST') return joinTrip(request, env, account);

  const tripMatch = pathname.match(/^\/api\/trips\/(\d+)$/);
  if (tripMatch && method === 'GET') return getTrip(env, account, Number(tripMatch[1]));
  const momentsMatch = pathname.match(/^\/api\/trips\/(\d+)\/moments$/);
  if (momentsMatch && method === 'POST') return addMoment(request, env, account, Number(momentsMatch[1]));
  const momentMatch = pathname.match(/^\/api\/moments\/(\d+)$/);
  if (momentMatch && method === 'DELETE') return deleteMoment(env, account, Number(momentMatch[1]));

  return errorResponse(404, 'Not found.');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS ? env.ASSETS.fetch(request) : new Response('Not found', { status: 404 });
    try {
      return await routeApi(request, env, url);
    } catch (error) {
      // A database constraint is the last line of defense; report it as a refusal rather than a crash.
      if (String(error && error.message).includes('constraint')) return errorResponse(400, 'That change was refused.');
      return errorResponse(500, 'Something went wrong on our side. Please try again.');
    }
  },
};
