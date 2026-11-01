# Verification

Run `python3 checks/verify.py` from the repository. It checks JSON and GeoJSON parsing, JavaScript syntax with `node --check`, metadata contracts, local HTML references, relative data fetches, source fields and the 300,000-byte file limit.

`source-fetches.json` records the final HTTP GET checks on 30 October 2026. Supporting passages and photo-license metadata were read during research; HTTP status alone does not establish a claim.

All 28 artifact files were served locally with Python’s HTTP server and fetched in full successfully. The citation skill passed the skill-creator frontmatter validator. Photos are at most 1280 px wide and under 300,000 bytes.

## In the site's sandbox

On 1 November 2026 each artifact was opened inside the abstracts.co artifact viewer, running the site locally against this repo. That means the sandboxed iframe with no same-origin access and the 16:10 frame (about 580 × 360 at a 1280 px window), at desktop and phone widths, in headless Chrome with software WebGL. The timeline, map (Leaflet and OpenStreetMap tiles), jar (three.js from jsDelivr), cutaway and shrine photos all loaded their data and drew. The jar turned, and the Lift lid / Pause / Reset buttons were present.

What that found: the map, jar and timeline put their visual below the fold of the short frame. They now use a compact header there. The shrine photos were listed as a `gallery`, which the site shows without credits, so they're now a web page that shows credits under each photo.

Not checked: real GPUs, Safari, and screen readers. CDN and WebGL availability are still runtime dependencies.

## Known content gap

The map contains 13 GeoJSON features: Caves 1–11 have verified archaeological notes but **null geometry**, and Khirbet Qumran and Ein Feshkha have approximate published site coordinates. No cave entrance coordinates were verified. The selector identifies this gap, and Cave 12 is omitted from the map. Its 2017 announcement remains on the timeline. This seed does not yet fulfill a geographically complete cave map.
