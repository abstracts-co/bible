---
name: add-a-timeline-event
description: Add or change an event on the a/bible timeline, keeping the source's own date precision and keeping discovery, excavation, announcement and publication dates apart.
---

The data is `artifacts/timeline/events.json`. Each event has `date`, `label`, `note`, `sources` (title and https URL) and `key` (whether it shows with "key milestones only").

**Which date?** A find can have several: when it was found, when it was excavated, when it was announced, when it was published. Pick one, and say which in the note. A press release gives you the announcement date, not the discovery date.

**Precision.** Write the date as precisely as the source does and no more:

- a year: `1952`
- a month: `2017-02`
- a day: `2021-04-21`
- a range: `1947–1956`
- disputed: `1946/1947`, and the note says who says what

Don't turn a range into its midpoint. A radiocarbon interval is a probability range, not a date; put the interval and confidence level in the note.

**Sources.** At least one per event, and it has to be something you opened. An institution's own page beats a news story about it; the report or paper beats both. If you had to use a secondary source, label it "(secondary)" in its title like the existing ones.

**Order.** Keep the file in date order. Ranges sort by their start.

The 2026 "Research remains open" entry is our own checkpoint, not an event. Leave it at the end unless the PR is about it.

Run `python3 checks/verify.py`, then look at the timeline on the site. Use the timeline-map PR template.
