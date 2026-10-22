# VALIDATION.md

Accountable: Semaj Johnson II, Phase 2 Specifier.

Three real users, met and recorded. This file says who they were, how we reached them, what happened in each session, and what changed in FEATURES.md because of it.

## How these sessions were run, and by whom

The three sessions were run on **2026-10-20 by Rishika Sikhakolli**, the Phase 2 Reviewer and Evaluator, as the RAT test that `context/EVALS.md` planned during Phase 1. She was the named member present at all three, and each ran about twelve minutes. I was not in the room for any of them; I am Accountable for this record and for the FEATURES.md changes that follow from it, not for the sessions themselves.

All three were reached as prior interviewees: people Rishika had already spoken to for earlier research on this project. That made three sessions in one day possible with two days' notice, and it is also the clearest limitation in this record, so it is stated here rather than left to be inferred. People who have been interviewed about a project before are not strangers to it, and at least some of this group already shaped the profiles in `context/USERS.md`. Their answers are about their own past trips and are no less true for that, but they are not an independent sample.

The method was the one EVALS.md committed to before Phase 2 began: ask about the person's most recent trip, with their camera roll and group chat open, and record what they actually did rather than what they would do. Past behavior, not intention, which is the rule this course has used since the first interviews. The format was tightly structured, the same questions in the same order for each person, which is why the table below is the complete record rather than a summary of it. Nothing was said in any session that the table does not carry.

**Two further things to be straight about.** Our DACI-001 reopen trigger set October 22 as the date by which three real-user interviews had to exist, and the Phase 2 brief set October 15 for confirming users. These sessions ran on October 20: inside the DACI trigger, late against the brief. And they are interviews about how people already travel, not usability sessions on our deployed build. Nobody in this record has used the app. What they validate is the premise underneath it; what they cannot validate is whether what we shipped serves that premise.

## Who we spoke with

Role descriptions only, as the Phase 2 rule requires. No names, contact details, photos, or locations of anyone outside the team.

| | Person 1 | Person 2 | Person 3 |
|---|---|---|---|
| Role | Full-time employee | Intern | Student |
| Trip discussed | New York, one month, 2 people | Taiwan, 2 days, 3 people | San Francisco, 5 days, 6 people |
| How we reached them | Prior interviewee from earlier project research | Prior interviewee from earlier project research | Prior interviewee from earlier project research |
| Session date and length | 2026-10-20, about 12 minutes | 2026-10-20, about 12 minutes | 2026-10-20, about 12 minutes |
| Member present | Rishika Sikhakolli | Rishika Sikhakolli | Rishika Sikhakolli |

## What each session found

| Question | Person 1 | Person 2 | Person 3 |
|---|---|---|---|
| When were photos taken? | During | During | During |
| When were things posted to the group chat? | During | During | After |
| When were notes, captions, or reviews written? | During | After | After |
| What was posted most? | Photos and text | Photos | Photos |
| Did they look for something from the trip later? | Yes, found it | Yes, found it | No |
| How did they search? | Searched a word | Asked someone | Did not |
| What they said | Sent a photo with text to the chat and later found it by searching for a word | Enjoyed when people sent things in the group chat to reminisce on an old event | Wanted everything in a shared album; likes having it all accessible together |

## What this tells us

**The capture half of the premise holds. The writing half does not.** Three of three took photos during the trip. Only one of three wrote any text during it; the other two wrote afterward, if at all. PROJECT.md's outcome depends on a record existing during the trip, and photos are that record. Notes are not.

**Finding things later is real, but it is not always searching.** Two of three went looking for something from the trip afterward. One searched for a word; the other asked a person. The third never looked. F5-1 lets a member search by word, place, date, or member, and only one of these three people would have used it the way it is written.

**Person 3 described the product without being shown it.** "Wanted everything in a shared album, likes having it all accessible together" is PROJECT.md's outcome in a sentence. That is the strongest statement of need in this record, and it came from the one person who never went looking for anything afterward, which makes it a wish rather than a behavior we observed.

**What contradicts our own test data.** The seven moments in our Phase 2 test trip all carried a note. These three sessions say notes are the field people skip. The test trip was filled by teammates exercising a form, not by anyone on a trip, so where the two disagree the interviews are the better evidence. This is recorded in `context/EVALS.md` alongside the stake resolutions.

## What changed in FEATURES.md because of this

| Finding | Change | Status |
|---|---|---|
| Only 1 of 3 wrote notes during the trip; 3 of 3 took photos | F3-1 already allows a moment with any one of photo, note, or place. These sessions confirm that rule rather than change it, and it is now evidence rather than an assumption. | No change needed |
| One person searched by a word, one asked a person, one did not look | Proposed below, not yet opened as a pull request | Open |

**Proposed, not yet opened.** F5-1 reads as though searching by a word is equal to searching by place, date, or member. One of three used a word; the other two did not search in a way the feature supports. I am not proposing to cut word search on a sample of three prior interviewees. I am proposing the row name which of the four paths is primary, so the build has an order to optimize, with the sample size noted beside it. That needs the team's agreement in a pull request rather than a decision taken in this file.

## What this record does not cover

- **Nobody here used the build.** These are interviews about past travel, not usability sessions. A tester did ask for likes and comments, but that came from team testing and is recorded in the EVALS.md stake resolutions, not here.
- **Three people, twelve minutes each, one interviewer, one day, all previously interviewed.** Everything above is directional. No count in this file should be read as a rate.
- **I was not present.** The notes are Rishika's. I have not independently verified any of them, and where this file quotes a person it quotes her record of what they said.
