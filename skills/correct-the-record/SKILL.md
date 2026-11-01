---
name: correct-the-record
description: Correct something a/bible got wrong. Fix the claim and every view that uses it, and leave a trail back to the earlier version.
---

First, which kind is it?

- **Typo, broken link, formatting.** Fix it in a small PR. No correction note needed.
- **Wrong fact or number** (a date, a measurement, a misattributed quote). Correction PR, with a note.
- **Disputed interpretation.** That isn't a correction yet; it's a disagreement. See "When people disagree" in CONTRIBUTING.md.

For a real correction:

1. Find every place the claim appears. A date can sit in `events.json`, an artifact's text, a `SOURCES.md`, an index summary and a reading guide. Search the repo for it.
2. Fix all of them in one PR, with the evidence and its exact locator.
3. Add `corrections/<id>.md`, using a short id like `2026-11-shrine-date`. Say what we said before and where, what it says now and why, the files changed, and links to the PR and to the Discussion where it came up.
4. Use the correction PR template and the `correction` label.
5. After it's merged, link the fix from the original Discussion.

Keep the old wording in the note so the earlier conversation still makes sense. Don't delete criticism that turned out to be right.

Exception: if the problem is private information or media we don't have the right to publish, remove it and don't quote it in the note.

Thank people for the correction in the thread if you like, by name if they're happy with that. Don't invent one to show the process off.
