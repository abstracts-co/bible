# Verification

Run `python3 checks/verify.py` from the repository. It checks JSON and GeoJSON parsing, JavaScript syntax with `node --check`, metadata contracts, local HTML references, relative data fetches, source fields and the 300,000-byte file limit.

`source-fetches.json` records the final HTTP GET checks on 30 October 2026. Supporting passages and photo-license metadata were read during research; HTTP status alone does not establish a claim.

All 28 artifact files were served locally with Python’s HTTP server and fetched in full successfully. The citation skill passed the skill-creator frontmatter validator. Photos are at most 1280 px wide and under 300,000 bytes. Browser rendering and iframe interaction have not been manually verified; CDN and WebGL availability remain runtime dependencies.

## Known content gap

The map contains 13 GeoJSON features: Caves 1–11 have verified archaeological notes but **null geometry**, and Khirbet Qumran and Ein Feshkha have approximate published site coordinates. No cave entrance coordinates were verified. The selector identifies this gap, and Cave 12 is omitted from the map. Its 2017 announcement remains on the timeline. This seed does not yet fulfill a geographically complete cave map.
