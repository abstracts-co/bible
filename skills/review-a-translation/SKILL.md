---
name: review-a-translation
description: Review a translation or reading in an a/bible PR as a language reviewer. Check the language and textual basis you actually know, and leave the rest for someone who does.
---

Start by saying what you can review: which language, which period, which kind of text. "Biblical Hebrew prose, comfortable; Qumran Aramaic, no" is a useful sentence. Hebrew doesn't cover Greek, and a classicist isn't automatically at home in Koine.

Then check, for the passage in the PR:

- **Base text.** Which edition or manuscript is it translating, and is the transcription right? Get the line or verse numbers right.
- **Grammar.** Is the rendering possible? Is it the most likely? What else could it be?
- **Variants.** If the reading depends on a variant, is the variant real, and is it cited from an edition or apparatus rather than from memory?
- **Gloss and translation.** A literal gloss and a readable translation should be kept separate. Smooth English can hide a choice.
- **Published translations.** If they're quoted, are they quoted exactly, with edition and license?

Write down what you checked, on which commit, and what you left alone. If part of it is outside what you know, say so and add `needs-language` so someone else picks it up. A partial review that says it's partial is much more use than a full-sounding one.

You can disagree with the author and still approve the PR going in as their proposed reading, if it's clearly labelled as theirs and your objection is recorded. You can also hold it. Either way, say why.
