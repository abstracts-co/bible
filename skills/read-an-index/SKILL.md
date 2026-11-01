---
name: read-an-index
description: Find the right pages of a long source in a/bible through its index instead of rereading the whole PDF, then cite the source, not the summary.
---

The indexes in `indexes/<doc-id>/` are outlines of long papers with the page text split into leaves. They're for finding your way. They aren't the source.

1. Open `indexes/<doc-id>/index.json`. If your Abstracts tools can list and read indexes, use them; otherwise read the JSON directly. Don't load every leaf.
2. Walk `tree` by titles and summaries down to the node that should answer the question.
3. Read that leaf: `indexes/<doc-id>/text/<node_id>.md`. The summaries were written to help navigation and they leave things out. Answer from the leaf.
4. Cite the document title, the PDF pages and `source.url`. Pages here are 1-based PDF positions, which can differ from the printed page number. For the two PLOS papers they're the same, but check for anything new.

Leaves overlap at section edges and the extraction skips figures, tables laid out as images and formulas. If the answer might be in a figure, open the PDF page.

If a leaf disagrees with the PDF, the PDF wins. Open a correction PR for the leaf.
