# Contributing to a/bible

Most things don't need a Contribution. A photo, a question, a link, something you noticed while reading: post it on the Wall and it's up straight away.

A Contribution is for things we keep: a source note, a translation comparison, a fixed date on the timeline, a new pin on the map, a reading guide, a new artifact. Every Contribution is a pull request on this repo, opened from your own GitHub account. That's true whether you use Contribute on abstracts.co, the GitHub website, or `gh`/git on your own machine, and it's true if your agent prepared the files. It's your PR and your name on it.

## Pick the right template

GitHub doesn't show a template picker for pull requests. The default template is short. For anything bigger, add `?template=<file>` to your compare URL, for example

```
https://github.com/abstracts-co/bible/compare/main...YOUR-NAME:YOUR-BRANCH?expand=1&template=source-note.md
```

or copy the body from the file into your PR. Delete the lines that don't apply.

| Template | Use it for |
| --- | --- |
| [source-note.md](.github/PULL_REQUEST_TEMPLATE/source-note.md) | a bibliography entry, a short note on a paper, a citation repair, an index addition |
| [translation.md](.github/PULL_REQUEST_TEMPLATE/translation.md) | published translations side by side, or your own proposed rendering |
| [find.md](.github/PULL_REQUEST_TEMPLATE/find.md) | a manuscript profile, an archaeological write-up, a dating note, an object record |
| [timeline-map.md](.github/PULL_REQUEST_TEMPLATE/timeline-map.md) | changing a date, adding a milestone, mapping a place |
| [visual.md](.github/PULL_REQUEST_TEMPLATE/visual.md) | galleries, video, 3D, custom HTML |
| [guide-answer.md](.github/PULL_REQUEST_TEMPLATE/guide-answer.md) | a reading route, or a Wall answer worth keeping |
| [correction.md](.github/PULL_REQUEST_TEMPLATE/correction.md) | fixing something we got wrong, small or contested |
| [community.md](.github/PULL_REQUEST_TEMPLATE/community.md) | rules, skills, checks, how review works |

The template is a starting point. What a PR needs checked depends on what's in it, not on which template you picked. A gallery of manuscript photos with your own translation of the captions needs the photo rights checked *and* a language reviewer.

## What gets checked, and by whom

Who the people are is in [reviews/README.md](reviews/README.md). Right now that's mostly me, so some things will wait. That's fine.

**Wall posts and replies.** Nobody reviews them before they go up. If somebody makes a factual claim, someone may ask for a page number. A civil question doesn't get deleted because people disagree with it.

**A note or summary of a published source.** A citation reader opens the source and follows each claim to the actual passage, and checks we've kept the paper's conclusion apart from our own inference. I can merge my own short summaries after checking them myself, but the PR says it was a self-check. It doesn't say "reviewed". If I couldn't get at a source, the claim comes out or turns into a question.

**An indexed or transcribed source.** Someone compares a few leaves against the rendered PDF pages, and checks headings, coverage, the source hash, page numbering and rights. A small fix to an extraction can be self-checked. A new long index needs a spot-check by someone other than its author before we treat it as maintained. A summary never replaces reading the leaf.

**Your own interpretation, or a contested one** (about a manuscript, a date, what something means). This needs a citation reader *and* a subject reviewer: two different people, and neither of them the author. Both say what they checked and what they object to. Until those two people exist, the PR stays open. I won't invent a second reviewer or write up a consensus for anyone.

**Translations and variants.** Someone who reads the language checks the edition, the transcription, the grammar and the alternative renderings. If a variant or a manuscript claim is involved, add a textual or manuscript reviewer. Putting accurately copied published translations side by side, with their editions and licenses, doesn't need a linguist. A new argument about the Greek or Hebrew does. We don't rank translations by votes.

**Archaeology, provenance, dating.** A subject reviewer checks the context, the object's identity, the method and the uncertainty, and a citation reader checks the report separately. Copying a catalogue dimension accurately is fine without a specialist; it just doesn't mean a specialist approved it. Unknown origin stays unknown. An announcement date is not an excavation date.

**Timeline and map data.** A citation reader checks the kind of event and the date precision. New map points need someone who can check the coordinate source, the coordinate system, what kind of point it is (entrance, site centre, camera position) and how precise it really is. Fixing a citation or a link can go through quickly. The cave entrances stay unmapped until someone brings a published survey. A source's range doesn't become a single day or a single pin.

**3D, custom HTML, data visualisations.** A visual/data reviewer opens it on the site, tries the controls with a mouse and the keyboard, checks units and joins, and looks at it on a phone. If it shows a new reconstruction claim, that also goes through the archaeology route above. Media rights get checked as usual. A model of a jar is a model, not a scan, and we say so.

**Photos, video, galleries.** One maintainer checks each file's original page and license, that the credits are visible next to the image, that the image is what the caption says it is, and that it shows up properly. A correctly identified photo of a building doesn't need a scholar. A manuscript scan without clear reuse rights doesn't go in at all; link it.

**Reading guides and kept answers.** Someone actually follows the route and opens the references. Any substantial claim in it takes whichever route above fits. A guide that points to published scholarship is fine; a made-up expert FAQ isn't. A good Wall answer only becomes a kept answer through its own PR, with the person who wrote it agreeing, and a link back to the Discussion.

**Typos, broken links, unit slips.** A maintainer checks the diff against the source and merges. No waiting period for a spelling fix. If the "typo" changes the meaning or a number, it's a correction, below.

**Rules, roles, skills, review policy.** Try the change against one real contribution first. Anything that changes who has to review what gets posted on the Wall for seven days before it's merged. No vote count gives anyone merge rights.

## Before you open the PR

- Keep it to one thing. Two unrelated fixes are two PRs.
- Run `python3 checks/verify.py`. It catches broken JSON, bad paths, JS syntax errors and oversized files. It doesn't check whether anything is true, and it doesn't look at the page in a browser.
- If you changed something visual, look at it inside the site's artifact frame, which is only about 580 × 360 on a laptop and smaller on a phone. A branch on this repo can be opened at `abstracts.co/a/bible/artifacts/<id>?ref=<branch>`. From a fork, serve the folder locally and look at it at that size. A full browser tab working isn't enough.
- Put credits for every image next to the image, not only in the repo.

## Labels

A maintainer labels each PR by type: `source`, `translation`, `manuscript`, `archaeology`, `timeline`, `map`, `visual`, `guide`, `correction`, `community`. A PR can have more than one.

Then there are the ones that say what's left to do: `needs-citation`, `needs-language`, `needs-subject`, `needs-rights`, `disputed`. They come off when that thing is done. `ready` means every check the PR needs has happened on its current commit.

Labels are about the work left on a PR. They don't say whether a claim is true, and they don't earn anyone points.

Each area's reviewer is set in [.github/CODEOWNERS](.github/CODEOWNERS), so GitHub asks them automatically. Right now every line says `@AGZ-TX`.

## When people disagree

First pin down the exact claim and the exact source locator, in the PR or the Wall thread it came from. Then work out what kind of disagreement it is: a transcription, a measurement, a date, an interpretation, or just scope.

If the evidence doesn't settle it, we keep both published readings side by side. Two incompatible readings can be two separate notes. A single timeline or map record can't hold both, so it keeps the range or stays unresolved; nobody gets to quietly pick their favourite precise value.

A maintainer can narrow a PR to what's agreed, ask another real specialist, or close it with the reasons and a note on what new evidence would reopen it. Likes mean people are interested. They aren't scholarly consensus.

Conduct is moderated separately from who's right. And once there's another maintainer, whoever wrote a contested claim doesn't decide on it, me included.

## Corrections

When we get something wrong, fix it in a small PR with the [correction template](.github/PULL_REQUEST_TEMPLATE/correction.md). Add a file `corrections/<id>.md` (the first correction creates the folder) with:

- what we said before, and where
- what it says now, with the evidence and locator
- every artifact and index leaf that changed
- links to the PR and the original Discussion

Update every view that used the old claim in the same PR. Leave fair criticism where it is, and post a link to the fix in the Discussion where the problem came up.

If something serious is wrong, take the claim down first and review its replacement properly afterwards. If the problem is private information or media we can't share, remove it and don't repeat it in the correction note. Git keeps history, and copies of a public repo may exist elsewhere; we can stop publishing something, we can't promise it's gone everywhere.

## Merging

All changes to kept files go through PRs, squash-merged. For now I'm the only maintainer, so I merge my own self-checked work where the rules above allow it (summaries, curation, media, mechanical fixes, technical work) and leave specialist claims open until the right reviewers exist. When a second maintainer joins, we'll require an approval from someone other than the author on every PR.

Right before merging, whoever merges checks that every review the PR needs has happened, on the commit that's actually being merged. Nothing auto-merges because of rep, likes or comment counts.

After a research PR is merged, a short follow-up PR can add `reviews/<pr-number>.md` recording who checked what, on which commit, and what's still open. See [reviews/README.md](reviews/README.md).
