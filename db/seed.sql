-- Synthetic seed data only: invented people on example.com addresses, no real photos or locations of anyone (Phase 2 rule).
-- Demo sign-in for every seeded account: password alpha-demo-pass (a test value for these fake accounts only).
-- Demo invite links: /?invite=demo-invite-lisbon and /?invite=demo-invite-asheville
DELETE FROM moments; DELETE FROM members; DELETE FROM trips; DELETE FROM sessions; DELETE FROM accounts;

INSERT INTO accounts (id, email, username, password_hash, created_at) VALUES (1, 'alex.rivera@example.com', 'alex_r', 'pbkdf2$100000$arp1TLzLloWy/taFifK8ew==$qEpBq2/s9pkHnyNtlDEEvnuIEioBUd8PoO4KbHNmlhk=', '2026-10-01 12:00:00');
INSERT INTO accounts (id, email, username, password_hash, created_at) VALUES (2, 'bea.santos@example.com', 'bea_s', 'pbkdf2$100000$/8MnRA03BqQ4TeCR2lcdew==$iEB5VwEmMSbfUbiGjeJCBDPv7Tw6FCYxg4MuNuF2Jns=', '2026-10-01 12:00:00');
INSERT INTO accounts (id, email, username, password_hash, created_at) VALUES (3, 'chris.okafor@example.com', 'chris_o', 'pbkdf2$100000$BWXuImOKnhXFvVmdChk/Og==$IrCLfqMC7krnVj+Z2TlNRPPwNafDBXCLYCfpg7ouo6Q=', '2026-10-01 12:00:00');

INSERT INTO trips (id, name, creator_id, invite_token_hash, created_at) VALUES (1, 'Lisbon spring break', 1, 'W8K+P2keixRiRz1wutoao+kghpcpyN8EdLXISD3YA40=', '2026-10-02 09:00:00');
INSERT INTO trips (id, name, creator_id, invite_token_hash, created_at) VALUES (2, 'Asheville fall weekend', 2, 'Ts5xeS1Kt/CH6WtRGiQjeuuRP4Z1SUThhpdCxH6GF5c=', '2026-10-05 15:00:00');

INSERT INTO members (trip_id, account_id, joined_at) VALUES (1, 1, '2026-10-02 09:00:00'), (1, 2, '2026-10-02 10:15:00'), (1, 3, '2026-10-02 11:30:00'), (2, 2, '2026-10-05 15:00:00');

INSERT INTO moments (trip_id, author_id, photo_data_url, note, place, created_at) VALUES (1, 1, NULL, 'Landed. Pastéis de nata before we even checked in.', 'Pastéis de Belém', '2026-10-03 10:05:00');
INSERT INTO moments (trip_id, author_id, photo_data_url, note, place, created_at) VALUES (1, 2, NULL, NULL, 'Miradouro da Senhora do Monte', '2026-10-03 18:40:00');
INSERT INTO moments (trip_id, author_id, photo_data_url, note, place, created_at) VALUES (1, 3, NULL, 'Tram 28 was packed, walked up the hill instead.', NULL, '2026-10-04 09:20:00');
INSERT INTO moments (trip_id, author_id, photo_data_url, note, place, created_at) VALUES (1, 1, NULL, 'Fado night. Chris almost cried.', 'Alfama', '2026-10-04 22:10:00');
INSERT INTO moments (trip_id, author_id, photo_data_url, note, place, created_at) VALUES (2, 2, NULL, 'Fog on the parkway all morning.', 'Blue Ridge Parkway', '2026-10-06 08:30:00');
