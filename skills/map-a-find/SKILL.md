---
name: map-a-find
description: Add a place to the a/bible cave map. Locate the right kind of point, cite where the coordinates came from, and leave unknown cave entrances unmapped.
---

The data is `artifacts/qumran-map/places.geojson`. Coordinates are WGS84, `[longitude, latitude]`, which is the opposite order from most websites.

Before adding a point, work out what it is:

- a **cave entrance**
- a **site centre** (Khirbet Qumran as a whole)
- an **excavation grid point** or locus
- a **camera position**, where a photo was taken from

These aren't interchangeable. A photo's GPS tag is where the photographer stood, not where the cave is. Say which kind it is in the feature's `note`.

The coordinates need a source you can cite: a published survey, an excavation report, a gazetteer. Give the source, the page or table, the coordinate system it used and how precise it says it is. If you converted from another grid, say how. Don't add decimal places the source doesn't have.

Caves 1–11 are in the file with `"geometry": null` on purpose. That's the honest state: nobody here has verified entrance coordinates. Filling one in from a survey, properly cited, would be a great contribution. Filling one in because it looks about right on satellite imagery isn't one.

The map tiles are OpenStreetMap; keep the attribution visible.

Use the timeline-map PR template. New points need someone who can check the coordinates; see CONTRIBUTING.md.
