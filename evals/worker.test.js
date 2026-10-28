// Code evals from context/EVALS.md, run against the deployed Worker.
// EARS rows tested: F1-2, F2-2, F3-3, F4-2 (each Must-be row with a server-side effect).
// Run: API=https://alpha-trips.travlr.workers.dev npm test
import { test } from "node:test";
import assert from "node:assert/strict";

const API = process.env.API;
const id = Date.now(); // makes every username unique, so the tests can run again

// Send a request to the Worker. `cookie` is who is signed in (or nobody).
function send(method, path, body, cookie) {
  return fetch(API + path, {
    method,
    headers: { "content-type": "application/json", cookie: cookie || "" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

// Sign up a fake user and return their sign-in cookie.
async function signUp(name) {
  const res = await send("POST", "/api/signup", { email: name + "@example.test", username: name, password: "test-pass-123" });
  return res.headers.get("set-cookie").split(";")[0];
}

// Create a trip and return its id and invite token.
async function makeTrip(cookie) {
  const res = await send("POST", "/api/trips", { name: "Test Trip " + id }, cookie);
  const body = await res.json();
  return { id: body.trip.id, invite: new URL(body.inviteUrl).searchParams.get("invite") };
}

test("F1-2 refuses a username that is already taken", async () => {
  await signUp("taken" + id);
  const res = await send("POST", "/api/signup", { email: "other" + id + "@example.test", username: "taken" + id, password: "test-pass-123" });
  assert.equal(res.status, 409);
});

test("F2-2 refuses to join without a valid invite link", async () => {
  const outsider = await signUp("outsider" + id);
  const res = await send("POST", "/api/trips/join", { token: "fake-invite" }, outsider);
  assert.equal(res.status, 403);
});

test("F3-3 refuses a moment with no photo, note, or place", async () => {
  const user = await signUp("empty" + id);
  const trip = await makeTrip(user);
  const res = await send("POST", "/api/trips/" + trip.id + "/moments", { photo: "", note: "", place: "" }, user);
  assert.equal(res.status, 400);
});

test("F4-2 refuses to delete a moment someone else added", async () => {
  const owner = await signUp("owner" + id);
  const member = await signUp("member" + id);
  const trip = await makeTrip(owner);
  await send("POST", "/api/trips/join", { token: trip.invite }, member);

  const added = await send("POST", "/api/trips/" + trip.id + "/moments", { note: "Owner's note" }, owner);
  const momentId = (await added.json()).moment.id;

  const res = await send("DELETE", "/api/moments/" + momentId, null, member);
  assert.equal(res.status, 403);
});