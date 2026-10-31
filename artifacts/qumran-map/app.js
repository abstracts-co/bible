const detail = document.querySelector('#detail');
function sources(node, items) {
  const box = document.createElement('div'); box.className = 'sources';
  for (const s of items) { const a = document.createElement('a'); a.href = s.url; a.textContent = s.title; a.target = '_blank'; a.rel = 'noopener'; box.append(a); }
  node.append(box);
}
try {
  const response = await fetch('./places.geojson'); if (!response.ok) throw new Error('Catalogue unavailable');
  const data = await response.json();
  let map; const markers = new Map();
  if (window.L) {
    map = L.map('map').setView([31.738, 35.454], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'}).addTo(map);
    L.control.scale({imperial: false}).addTo(map);
  } else document.querySelector('#map').textContent = 'Map library unavailable. The catalogue remains available below.';
  const select = document.querySelector('#place'); select.replaceChildren(); select.disabled = false;
  function show(index) {
    const f = data.features[index]; const p = f.properties; select.value = String(index); detail.replaceChildren();
    const h = document.createElement('h2'); h.textContent = p.name;
    const note = document.createElement('p'); note.textContent = p.note;
    const status = document.createElement('p'); status.textContent = p.location_status; status.className = 'eyebrow';
    detail.append(h, note, status); sources(detail, p.sources);
    if (map && f.geometry) { map.setView([...f.geometry.coordinates].reverse(), 15); markers.get(index).openPopup(); }
  }
  data.features.forEach((f, i) => {
    const o = document.createElement('option'); o.value = i; o.textContent = f.properties.name; select.append(o);
    if (map && f.geometry) {
      const label = document.createElement('span'); label.textContent = f.properties.name;
      const m = L.circleMarker([...f.geometry.coordinates].reverse(), {radius: 8, color: '#C2410C', fillOpacity: .75}).addTo(map).bindPopup(label);
      markers.set(i, m); m.on('click', () => show(i));
    }
  });
  select.addEventListener('change', () => show(Number(select.value))); show(0);
} catch (error) { detail.textContent = 'The places could not be loaded. Please reload or open places.geojson directly.'; }
