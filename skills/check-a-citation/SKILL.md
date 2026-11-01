---
name: check-a-citation
description: Check a citation in an a/bible PR or artifact by opening the source and saying exactly which claim and locator you checked, and what you couldn't.
---

This is the citation reader's job, and anyone careful can do it.

For each claim you take on:

1. Open the cited source itself, the edition named, not a summary of it or a search snippet. A page that loads but shows a bot check or a paywall isn't the source.
2. Go to the locator: page, figure, table, verse, catalogue number. If it's a PDF, note whether the page number is the PDF position or the printed one.
3. Read the passage around it, not just the line.
4. Compare. Does the source actually say this, or something weaker? Is our text the paper's conclusion, or our inference from it? Is a quotation word for word?

Then write it up in the PR, plainly:

> Checked "jar height 49.8 cm" against loc.gov/exhibits/scrolls/art1.html, KhQ 1474 entry. Matches. Didn't check the lid figures.

Say what you didn't check. Say if you couldn't open something. "Looks fine" isn't a review.

If you used an AI tool to help find passages, that's fine; you still have to read them yourself. The check is yours.

Problems go back as suggestions in the PR: the right locator, or "the source says X, not Y". Add the `needs-citation` label if it can't be fixed yet.
