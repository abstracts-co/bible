# Who reviews what

[CONTRIBUTING.md](../CONTRIBUTING.md) says which checks each kind of work needs. This file is about the people who do them.

## Who's here now

| GitHub | Does | Subjects | Access |
| --- | --- | --- | --- |
| [AGZ-TX](https://github.com/AGZ-TX) (Alex) | founder, moderator, merge maintainer; citation reading and media/visual checks on other people's work | none as a specialist | admin |

That's the whole list. There's no editorial board, no language reviewer and no subject reviewer yet. When I check my own work against its sources, that's a self-check, and the PR says so. It isn't peer review.

So any PR that needs an independent subject or language reviewer stays open until one turns up. That's not a rejection.

## The jobs

**Citation reader.** Opens the cited edition and checks the passage, the locator and the quotation. Anyone careful can do this. You don't need a degree, just the source in front of you.

**Language reviewer.** Works in the relevant language and with the relevant manuscript or edition. Say where your competence stops: Hebrew doesn't mean Greek, Aramaic or every period of Hebrew.

**Subject reviewer.** Manuscript studies, archaeology, dating methods, historical context, whichever the change needs. What counts is careful work we can see, and self-taught counts. A popular reply on the Wall doesn't.

**Visual/data reviewer.** Checks geometry, units, joins, code, keyboard use, posters and how it behaves inside the site's sandboxed frame. A 3D scene that works says nothing about whether the archaeology is right.

**Moderator / merge maintainer.** Handles conduct and repository permissions. I give this to a real account on purpose, after seeing their work, and it can be taken back. Reputation on the site never comes with write access.

One person can do several of these. But "two independent reviewers" means two different people, and neither of them wrote the PR. Test accounts I control don't count as anyone. Neither does an AI model. Running a second model over your work can help you find mistakes before you open the PR, but it isn't a reviewer.

## Volunteering

Leave a careful review on an open PR first: what you opened, what you checked, what you couldn't. Anyone can review a public PR without being added anywhere. If you'd like to be listed here, say so on the Wall or in a PR, with the subjects you're willing to take and links to work that shows it.

A row only goes in this file after the person has agreed to it, in a PR they can see. I won't list anyone because they wrote a paper we cite. Write access and a line in `.github/CODEOWNERS` are a separate step, and only for maintainers. Reviewers don't need either.

## Review records

During review, put everything in the PR conversation: what you checked, the commit you checked it on, and what's still open. If the PR changes after you've approved, your approval no longer covers the new commit; look again.

After a research PR is merged, a small follow-up PR can add `reviews/<pr-number>.md` to keep that record with the repo:

```markdown
PR: #<number>, merged as <merge commit>
Reviewed head: <commit the reviews were done on>

| Who | Role | What they checked | Link |
| --- | --- | --- | --- |

Still open:
```

Only record reviews that actually happened. The merge commit can't go inside the PR it belongs to (changing the file would change the commit), which is why this is a follow-up.
