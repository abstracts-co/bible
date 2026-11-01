const container = document.querySelector('#photos');
try {
  const response = await fetch('./photos.json');
  if (!response.ok) throw new Error('Missing credits');
  const photos = await response.json();
  container.replaceChildren();
  for (const [i, p] of photos.entries()) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = './' + p.file;
    img.alt = p.alt;
    img.width = p.width;
    img.height = p.height;
    img.loading = i ? 'lazy' : 'eager';
    const caption = document.createElement('figcaption');
    const who = document.createElement('b');
    who.textContent = p.author;
    const license = document.createElement('a');
    license.href = p.licenseUrl;
    license.textContent = p.license;
    const source = document.createElement('a');
    source.href = p.source;
    source.textContent = 'original on Wikimedia Commons';
    for (const a of [license, source]) { a.target = '_blank'; a.rel = 'noopener'; }
    caption.append('Photo: ', who, ' · ', license, ' · ', source, '. ' + p.modification);
    figure.append(img, caption);
    container.append(figure);
  }
} catch (error) {
  container.textContent = 'The photo credits could not load, so the photos are not shown. See CREDITS.md before reusing them.';
}
