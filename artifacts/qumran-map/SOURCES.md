# Sources

Checked by HTTP fetch on 2026-10-30; claims are paraphrased.

- [IAA: Discovery Sites](https://www.deadseascrolls.org.il/learn-about-the-scrolls/discovery-sites) — supports the cave finds or site note on the matching feature in places.geojson.
- [Published site coordinates (secondary location reference)](https://en.wikipedia.org/wiki/Qumran) — supports the cave finds or site note on the matching feature in places.geojson.
- [Library of Congress: Introduction](https://www.loc.gov/exhibits/scrolls/intr.html) — supports the cave finds or site note on the matching feature in places.geojson.
- [Published site coordinates and overview (secondary)](https://en.wikipedia.org/wiki/Ein_Feshkha) — supports the cave finds or site note on the matching feature in places.geojson.

## Location limits

Caves 1–11 are included as GeoJSON features with `geometry: null`: no cave entrance coordinates were verified in the fetched publications. No camera GPS positions are used as cave locations. The map plots only the two named site reference points. Cave 12 is covered on the timeline but omitted here because its coordinates could not be verified. This artifact is an intentionally incomplete location dataset, not a route guide.

Site coordinates reproduce the published reference coordinates; they do not imply survey precision. Wikipedia is used only for site locations and the Ein Feshkha overview; the IAA supplies the cave finds.

[Leaflet 1.9.4](https://unpkg.com/leaflet@1.9.4/dist/leaflet.js) supplies map controls. [OpenStreetMap](https://www.openstreetmap.org/copyright) supplies map tiles under its attribution requirements.
