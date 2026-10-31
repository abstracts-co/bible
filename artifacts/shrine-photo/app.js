const container = document.querySelector('#photos');
try {
  const response = await fetch('./photos.json'); if (!response.ok) throw new Error('Missing credits');
  const photos = await response.json(); container.replaceChildren();
  for (const [i, p] of photos.entries()) {
    const figure = document.createElement('figure'); const img = document.createElement('img');
    img.src = './' + p.file; img.alt = ['Shrine of the Book exterior, photographed by xiquinhosilva', 'White roof of the Shrine of the Book, photographed by Dan Lundberg', 'Entrance to the Shrine of the Book, photographed by Edmund Gall'][i];
    img.width = p.width; img.height = p.height; img.loading = i ? 'lazy' : 'eager';
    const caption = document.createElement('figcaption'); caption.append(p.author + ' · ');
    const license = document.createElement('a'); license.href = p.licenseUrl; license.textContent = p.license;
    const source = document.createElement('a'); source.href = p.source; source.textContent = 'Wikimedia Commons';
    for (const a of [license, source]) { a.target = '_blank'; a.rel = 'noopener'; }
    caption.append(license, ' · ', source, '. ' + p.modification); figure.append(img, caption); container.append(figure);
  }
} catch (error) { container.textContent = 'Credits could not load. See CREDITS.md before reusing these photos.'; }
