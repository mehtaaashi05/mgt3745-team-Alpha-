// Alpha travel app pages. Everything stays inside this IIFE so nothing becomes an accidental global (STANDARDS.md).
(function () {
  'use strict';

  const PENDING_INVITE_KEY = 'alpha_pending_invite';
  // Photos are shrunk in the browser so they fit in D1 (ADR-001 consequences); the Worker rejects anything larger.
  const MAX_PHOTO_EDGE = 1280;
  const MAX_PHOTO_CHARS = 650000;
  // ?failSave lets testers check F3-2 without breaking the real database.
  const simulateFailedSave = new URLSearchParams(window.location.search).has('failSave');

  const views = {
    auth: document.getElementById('auth-view'),
    trips: document.getElementById('trips-view'),
    trip: document.getElementById('trip-view'),
  };
  const statusMessage = document.getElementById('status-message');
  const sessionBar = document.getElementById('session-bar');
  const sessionUsername = document.getElementById('session-username');

  let signedInAccount = null;
  let selectedPhotoDataUrl = '';

  function showStatus(message, isError) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle('is-error', Boolean(isError));
  }

  function showView(viewName) {
    for (const [name, element] of Object.entries(views)) element.hidden = name !== viewName;
  }

  async function callApi(path, options) {
    const requestOptions = Object.assign({ headers: {} }, options);
    if (requestOptions.body !== undefined) {
      requestOptions.headers['content-type'] = 'application/json';
      requestOptions.body = JSON.stringify(requestOptions.body);
    }
    let response;
    try {
      response = await fetch(path, requestOptions);
    } catch (networkError) {
      return { ok: false, status: 0, data: { error: 'Could not reach the server. Check your connection and try again.' } };
    }
    let data = {};
    try {
      data = await response.json();
    } catch (parseError) {
      data = {};
    }
    return { ok: response.ok, status: response.status, data };
  }

  function setSignedIn(account) {
    signedInAccount = account;
    sessionBar.hidden = !account;
    sessionUsername.textContent = account ? account.username : '';
  }

  function formatTime(databaseTime) {
    // D1 stores UTC as "YYYY-MM-DD HH:MM:SS"; show it in the viewer's own time zone.
    const parsed = new Date(databaseTime.replace(' ', 'T') + 'Z');
    return Number.isNaN(parsed.getTime()) ? databaseTime : parsed.toLocaleString();
  }

  // ---------- F1: accounts ----------

  async function submitSignup(event) {
    event.preventDefault();
    const form = event.target;
    const result = await callApi('/api/signup', {
      method: 'POST',
      body: { email: form.email.value, username: form.username.value, password: form.password.value },
    });
    if (!result.ok) {
      // F1-2: the form keeps what was typed so only the username needs changing.
      showStatus(result.data.error || 'Sign-up failed. Please try again.', true);
      if (result.status === 409) form.username.focus();
      return;
    }
    form.reset();
    setSignedIn(result.data.account);
    showStatus('Welcome, ' + result.data.account.username + '! Your account is ready.');
    await afterSignIn();
  }

  async function submitLogin(event) {
    event.preventDefault();
    const form = event.target;
    const result = await callApi('/api/login', {
      method: 'POST',
      body: { username: form.username.value, password: form.password.value },
    });
    if (!result.ok) {
      showStatus(result.data.error || 'Sign-in failed. Please try again.', true);
      return;
    }
    form.reset();
    setSignedIn(result.data.account);
    showStatus('Signed in.');
    await afterSignIn();
  }

  async function logout() {
    await callApi('/api/logout', { method: 'POST' });
    setSignedIn(null);
    showStatus('Signed out.');
    window.location.hash = '';
    showView('auth');
  }

  // ---------- F2: trips and invites ----------

  function rememberInviteFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const inviteToken = params.get('invite');
    if (!inviteToken) return;
    try {
      sessionStorage.setItem(PENDING_INVITE_KEY, inviteToken);
    } catch (storageError) {
      // Storage can be blocked; the token is then only used if the person is already signed in.
    }
    params.delete('invite');
    const remainingQuery = params.toString();
    window.history.replaceState(null, '', window.location.pathname + (remainingQuery ? '?' + remainingQuery : '') + window.location.hash);
    return inviteToken;
  }

  function takePendingInvite() {
    try {
      const inviteToken = sessionStorage.getItem(PENDING_INVITE_KEY);
      sessionStorage.removeItem(PENDING_INVITE_KEY);
      return inviteToken;
    } catch (storageError) {
      return null;
    }
  }

  async function joinWithInvite(inviteToken) {
    const result = await callApi('/api/trips/join', { method: 'POST', body: { token: inviteToken } });
    if (!result.ok) {
      // F2-2: refuse and show no trip details.
      showStatus(result.data.error || 'That invite link is not valid.', true);
      window.location.hash = '#/trips';
      return;
    }
    showStatus('You joined ' + result.data.trip.name + '.');
    window.location.hash = '#/trip/' + result.data.trip.id;
  }

  async function afterSignIn() {
    const inviteToken = takePendingInvite();
    if (inviteToken) {
      await joinWithInvite(inviteToken);
      return;
    }
    if (!window.location.hash || window.location.hash === '#/') window.location.hash = '#/trips';
    await renderRoute();
  }

  async function renderTrips() {
    showView('trips');
    const tripList = document.getElementById('trip-list');
    const emptyNotice = document.getElementById('trip-list-empty');
    tripList.replaceChildren();
    const result = await callApi('/api/trips');
    if (!result.ok) {
      showStatus(result.data.error || 'Could not load your trips.', true);
      return;
    }
    emptyNotice.hidden = result.data.trips.length > 0;
    for (const trip of result.data.trips) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#/trip/' + trip.id;
      link.textContent = trip.name;
      const details = document.createElement('span');
      details.className = 'muted';
      details.textContent = ' · ' + trip.member_count + (trip.member_count === 1 ? ' member' : ' members') + (trip.is_creator ? ' · you created this' : '');
      item.append(link, details);
      tripList.append(item);
    }
  }

  async function submitCreateTrip(event) {
    event.preventDefault();
    const form = event.target;
    const result = await callApi('/api/trips', { method: 'POST', body: { name: form.name.value } });
    if (!result.ok) {
      showStatus(result.data.error || 'Could not create the trip.', true);
      return;
    }
    form.reset();
    document.getElementById('invite-trip-name').textContent = result.data.trip.name;
    document.getElementById('invite-url').value = result.data.inviteUrl;
    document.getElementById('invite-panel').hidden = false;
    showStatus('Trip created. Copy the invite link and send it to your group.');
    await renderTrips();
  }

  async function copyInvite() {
    const inviteField = document.getElementById('invite-url');
    try {
      await navigator.clipboard.writeText(inviteField.value);
      showStatus('Invite link copied.');
    } catch (clipboardError) {
      inviteField.select();
      showStatus('Select the link and copy it manually.', true);
    }
  }

  // ---------- F3 and F4: moments ----------

  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = function () {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = function () {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('unreadable image'));
      };
      image.src = objectUrl;
    });
  }

  async function shrinkPhoto(file) {
    const image = await loadImage(file);
    let longestEdge = Math.min(MAX_PHOTO_EDGE, Math.max(image.naturalWidth, image.naturalHeight));
    let quality = 0.75;
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const scale = longestEdge / Math.max(image.naturalWidth, image.naturalHeight);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      if (dataUrl.length <= MAX_PHOTO_CHARS) return dataUrl;
      longestEdge = Math.round(longestEdge * 0.75);
      quality = Math.max(0.5, quality - 0.05);
    }
    throw new Error('photo too large');
  }

  async function choosePhoto(event) {
    const preview = document.getElementById('moment-photo-preview');
    const file = event.target.files && event.target.files[0];
    selectedPhotoDataUrl = '';
    preview.hidden = true;
    if (!file) return;
    try {
      selectedPhotoDataUrl = await shrinkPhoto(file);
      preview.src = selectedPhotoDataUrl;
      preview.hidden = false;
    } catch (photoError) {
      event.target.value = '';
      showStatus('That photo could not be used. Try a JPEG or PNG.', true);
    }
  }

  function currentTripId() {
    const match = window.location.hash.match(/^#\/trip\/(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  async function submitMoment(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = document.getElementById('moment-submit');
    const note = form.note.value.trim();
    const place = form.place.value.trim();
    // F3-3: refuse an empty moment before sending anything.
    if (!note && !place && !selectedPhotoDataUrl) {
      showStatus('Add a photo, a note, or a place.', true);
      return;
    }
    submitButton.disabled = true;
    let result;
    if (simulateFailedSave) {
      result = { ok: false, data: { error: 'Saving failed (test mode). Your moment is still here; try again.' } };
    } else {
      result = await callApi('/api/trips/' + currentTripId() + '/moments', {
        method: 'POST',
        body: { note: note, place: place, photo: selectedPhotoDataUrl },
      });
    }
    submitButton.disabled = false;
    if (!result.ok) {
      // F3-2: keep the photo, note, and place on screen so the member can retry.
      showStatus(result.data.error || 'Saving failed. Your moment is still here; try again.', true);
      return;
    }
    // Storage succeeded, so now the form and list may change (STANDARDS.md).
    form.reset();
    selectedPhotoDataUrl = '';
    document.getElementById('moment-photo-preview').hidden = true;
    showStatus('Moment added.');
    await renderTrip(currentTripId());
  }

  async function deleteMoment(momentId) {
    const result = await callApi('/api/moments/' + momentId, { method: 'DELETE' });
    if (!result.ok) {
      showStatus(result.data.error || 'Could not delete that moment.', true);
      return;
    }
    showStatus('Moment deleted.');
    await renderTrip(currentTripId());
  }

  function buildMomentItem(moment, viewerId) {
    const item = document.createElement('li');
    const heading = document.createElement('p');
    const author = document.createElement('span');
    author.className = 'moment-author';
    author.textContent = moment.author_username;
    const time = document.createElement('span');
    time.className = 'moment-time';
    time.textContent = ' · ' + formatTime(moment.created_at);
    heading.append(author, time);
    item.append(heading);

    if (moment.place) {
      const place = document.createElement('p');
      place.className = 'moment-place';
      place.textContent = moment.place;
      item.append(place);
    }
    if (moment.photo_data_url) {
      const photo = document.createElement('img');
      photo.className = 'moment-photo';
      photo.src = moment.photo_data_url;
      photo.alt = 'Photo added by ' + moment.author_username + (moment.place ? ' at ' + moment.place : '');
      item.append(photo);
    }
    if (moment.note) {
      const note = document.createElement('p');
      note.className = 'moment-note';
      note.textContent = moment.note;
      item.append(note);
    }
    // F4-2: only the author sees a delete button; the Worker refuses everyone else anyway.
    if (moment.author_id === viewerId) {
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'link-button';
      deleteButton.textContent = 'Delete my moment';
      deleteButton.addEventListener('click', function () {
        deleteMoment(moment.id);
      });
      item.append(deleteButton);
    }
    return item;
  }

  async function renderTrip(tripId) {
    showView('trip');
    const result = await callApi('/api/trips/' + tripId);
    if (!result.ok) {
      showStatus(result.data.error || 'Could not load that trip.', true);
      window.location.hash = '#/trips';
      return;
    }
    document.getElementById('trip-title').textContent = result.data.trip.name;
    document.getElementById('trip-members').textContent = result.data.members.join(', ');
    const momentList = document.getElementById('moment-list');
    momentList.replaceChildren();
    document.getElementById('moment-list-empty').hidden = result.data.moments.length > 0;
    for (const moment of result.data.moments) momentList.append(buildMomentItem(moment, result.data.viewerId));
  }

  // ---------- routing ----------

  async function renderRoute() {
    if (!signedInAccount) {
      showView('auth');
      return;
    }
    const tripId = currentTripId();
    if (tripId) await renderTrip(tripId);
    else await renderTrips();
  }

  async function start() {
    const inviteToken = rememberInviteFromUrl();
    document.getElementById('signup-form').addEventListener('submit', submitSignup);
    document.getElementById('login-form').addEventListener('submit', submitLogin);
    document.getElementById('logout-button').addEventListener('click', logout);
    document.getElementById('create-trip-form').addEventListener('submit', submitCreateTrip);
    document.getElementById('copy-invite-button').addEventListener('click', copyInvite);
    document.getElementById('moment-photo').addEventListener('change', choosePhoto);
    document.getElementById('moment-form').addEventListener('submit', submitMoment);
    window.addEventListener('hashchange', renderRoute);

    const me = await callApi('/api/me');
    if (me.ok) {
      setSignedIn(me.data.account);
      await afterSignIn();
    } else {
      showView('auth');
      if (inviteToken) showStatus('Sign up or sign in to join the trip you were invited to.');
    }
  }

  start();
})();
