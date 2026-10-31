# Document indexes for agents

This folder holds reusable PageIndex trees for agents. Start with a document's `index.json`, navigate `tree` by titles and summaries, and read `text/<node_id>.md` for the selected leaf. The community skill is [read-an-index](../skills/read-an-index/SKILL.md).

Page ranges are **1-based, inclusive PDF positions**, including covers and front matter, rather than printed page labels. Leaf files contain the full cleaned text of their page ranges, so adjacent leaves can overlap and include neighbouring sections. This preserves context and parent introductions; consult the source PDF for exact section boundaries, figures, formulas, or layout. Text extraction does not transcribe image-only content. Linked supplements are not included.

## Documents

| Document | PDF pages | Source | License | How built |
| --- | ---: | --- | --- | --- |
| [Dating ancient manuscripts using radiocarbon and AI-based writing style analysis](enoch-2025/index.json) | 14 | [Official PDF](https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0323185&type=printable) | CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/; Popović M et al. (2025), PLOS ONE 20(6): e0323185, https://doi.org/10.1371/journal.pone.0323185 | PageIndex 0.5.0 local Flash + `claude-code/haiku`; reviewed and corrected on 2026-10-30. |
| [Artificial intelligence based writer identification generates new evidence for the unknown scribes of the Dead Sea Scrolls exemplified by the Great Isaiah Scroll (1QIsaa)](isaiah-2021/index.json) | 28 | [Official PDF](https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0249769&type=printable) | CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/; Popović M, Dhali MA, Schomaker L (2021), PLOS ONE 16(4): e0249769, https://doi.org/10.1371/journal.pone.0249769 | PageIndex 0.5.0 local Flash + `claude-code/haiku`; reviewed and corrected on 2026-10-30. |

## Build and verification

Installed `pip install -U "pageindex[claude]"` into a fresh `/tmp/pageindex-venv`. Read the upstream README, SDK getting-started documentation, installed client API, and Flash README. Used the machine owner's Claude Code sign-in, with no cloud indexing or PageIndex API key:

```python
from pageindex import PageIndexClient
client = PageIndexClient(
    index={"model": "claude-code/haiku", "storage_path": "/tmp/pageindex-store/<doc-id>",
           "summary_max_words": 65, "summary_concurrency": 3},
    chat="claude-code/haiku",
)
doc_id = client.submit_document("source.pdf", mode="flash")["doc_id"]
tree = client.get_tree(doc_id, node_summary=True, include_text=True)["result"]
```

Flash extracts headings from layout, deterministically merges, and uses Haiku to refine and summarize. Converted `start_index` / `end_index` to `start_page` / `end_page`, kept node IDs, and normalized missing child lists to `[]`. Editorial review checked nesting, replaced model-added navigation labels with printed headings, and shortened summaries. Poppler `pdftotext` extracted leaf page text in reading order; repeated headers, footers, and page labels were removed. Summaries are paraphrases; leaf text is an extraction, not an authoritative transcription. Source SHA-256 hashes and page counts in each JSON identify the exact downloaded PDF bytes. The PDFs are not bundled.

Validated JSON keys and values, unique IDs, nested page bounds, complete leaf page coverage, matching leaf files, SHA-256 hashes, and the strict 300,000-byte cap for every JSON/text file. Five nodes per document were checked against rendered source PDF pages for headings and summary content; their inclusive ranges were also checked against extracted text and section transitions:

| Document | Checked node IDs and PDF pages |
| --- | --- |
| `enoch-2025` | `0001` (p. 1), `0002` (p. 2), `0003` (p. 5), `0004` (p. 6), `0006` (p. 10) |
| `isaiah-2021` | `0001` (p. 2), `0004` (p. 6), `0006` (p. 8), `0009` (p. 10), `0015` (p. 26) |

Source section text is reused under the licenses above. CC BY attributions identify the authors, publication, DOI, and license; extraction, cleanup, indexing, and summaries are the changes made here. No redacted content has been reconstructed.
