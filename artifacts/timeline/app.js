const nav = document.querySelector('#events'); const detail = document.querySelector('#detail');
try {
  const response = await fetch('./events.json'); if (!response.ok) throw new Error('Missing events');
  const events = await response.json(); let selected = 0;
  function show(index) {
    selected = index; const e = events[index]; detail.replaceChildren();
    const date = document.createElement('div'); date.className = 'eyebrow'; date.textContent = e.date;
    const h = document.createElement('h2'); h.textContent = e.label;
    const p = document.createElement('p'); p.textContent = e.note;
    const links = document.createElement('div'); links.className = 'sources';
    e.sources.forEach(s => { const a = document.createElement('a'); a.href = s.url; a.textContent = s.title; a.target = '_blank'; a.rel = 'noopener'; links.append(a); });
    detail.append(date, h, p, links);
    nav.querySelectorAll('button').forEach(b => b.setAttribute('aria-current', String(Number(b.dataset.index) === index)));
  }
  function render() {
    nav.replaceChildren(); const keyOnly = document.querySelector('#key').checked;
    events.forEach((e, i) => {
      if (keyOnly && !e.key) return;
      const b = document.createElement('button'); b.dataset.index = i; b.dataset.key = e.key;
      const t = document.createElement('time'); t.textContent = e.date;
      const label = document.createElement('strong'); label.textContent = e.label; b.append(t, label);
      b.addEventListener('click', () => show(i)); nav.append(b);
    });
    if (keyOnly && !events[selected].key) selected = events.findIndex(e => e.key);
    show(selected);
  }
  document.querySelector('#key').addEventListener('change', render); render();
} catch (error) { detail.textContent = 'The timeline could not be loaded. Please reload or open events.json directly.'; }
