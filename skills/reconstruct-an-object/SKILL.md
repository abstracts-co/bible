---
name: reconstruct-an-object
description: Build a 3D model or drawing of a find for a/bible from published dimensions, and keep a list of every shape you had to guess.
---

The jar and the jar cutaway are the examples to copy. Both are built from catalogue numbers, and both have a `SOURCES.md` that says which parts are measured and which are made up.

1. **Start from a record.** Object number, institution, catalogue or report, and the exact page or entry. Write the measurements into a data file (`dimensions.json` or similar) with units and the source, and have the code read from it. Don't type numbers into the code.
2. **Separate measured from guessed.** Catalogues usually give height and maximum diameter. Everything else (the profile curve, wall thickness, colour, texture, how the lid sits) is a guess. List every guess in `SOURCES.md`. If you used a photo of a different object for the profile, name it.
3. **Two objects, two records.** If you combine sizes from several objects, say so and show the range. Don't present the result as either one.
4. **Call it what it is.** A model is a reconstruction, not a scan. Write that in the description and on the page.
5. **Scale.** Add a scale bar and say how it behaves (perspective, isometric foreshortening).

On the practical side: load three.js from a CDN at a pinned version, keep everything else inside the artifact folder, make it fit the site's small frame, give it a keyboard-usable control or two, and add a `preview.webp` so the card doesn't start WebGL while someone scrolls.

A new claim about what the object was for, or how it was made, goes through the archaeology route in CONTRIBUTING.md. Better geometry from the same numbers doesn't.
