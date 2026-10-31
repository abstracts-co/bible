---
name: cite-an-archaeological-source
description: Source archaeological finds, excavation reports and manuscript dating claims for a/bible artifacts, including provenance, uncertainty and image rights.
---

Cite evidence close to each claim. Prefer the primary excavation report or peer-reviewed study; use IAA and Israel Museum collection records for object identity, custody, dimensions and announcements. A press release establishes what was announced, not necessarily a settled interpretation.

- Record author or institution, publication title, year, stable URL or DOI, and the exact page, figure, table or catalogue number supporting the claim. Fetch every cited URL and inspect the relevant passage. A successful HTTP response containing a security checkpoint is not verification. If the source is inaccessible, use a verified alternative and name the substitution; otherwise omit the claim.
- Distinguish discovery, excavation, acquisition, announcement and publication dates. Preserve year-only dates and date ranges. For a find, record site, cave, locus/stratum and inventory number where published. Mark unknown provenance and distinguish excavated objects from antiquities-market material.
- For radiocarbon results, specify the sampled material, pretreatment, calibration curve, calibrated interval, confidence level and laboratory identifier when provided. Do not substitute an interval midpoint for a calendar date. Material age, copying date and composition date are different claims.
- For AI or handwriting studies, cite the paper and separate training data, test data, predictions and expert evaluation. State relevant sample-size and calibration limitations. Treat writer identification separately from dating. Explain whether palaeography informed selection of radiocarbon ranges.
- For maps, cite the coordinate source and coordinate system. Distinguish site centroids, entrances, excavation grids and camera positions. State approximate locations; use null GeoJSON geometry when unverified. Never fabricate coordinates or imply survey precision.
- For a reconstructed object, cite dimensions with units and object number. Mark inferred profile, color, wall thickness, missing parts and assembly. A procedural model is not an archaeological scan.
- For images, verify the original file page, creator and license. Keep author, title, source URL, license URL and modifications per file. Carry forward ShareAlike terms on adaptations. Publicly viewable does not mean freely reusable.

Store sources beside the artifact: `SOURCES.md`, `sources: [{title, url}]` on each timeline event or GeoJSON feature, and `CREDITS.md` for images. Keep evidence and interpretation distinct, acknowledge disputed readings, and avoid theological conclusions from archaeological evidence.

Useful verified starting points:

- [IAA discovery sites](https://www.deadseascrolls.org.il/learn-about-the-scrolls/discovery-sites): cave-level overview; follow through to excavation publications for detailed claims.
- [IAA digital library](https://www.deadseascrolls.org.il/about-the-project/the-digital-library): imaging project and archive context.
- [Library of Congress / IAA exhibition](https://www.loc.gov/exhibits/scrolls/intr.html): named objects, dimensions and bibliography.
- [Popović et al. 2025](https://doi.org/10.1371/journal.pone.0323185): example of coupled radiocarbon and handwriting-based dating with explicit methodological limitations.
