const cols = document.querySelector('#cols');
const pick = document.querySelector('#pick');
const question = document.querySelector('#question');

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

// A line's text can carry footnote marks like [†] or [*1]; show them as superscripts.
const fill = (p, text) => {
  for (const part of text.split(/(\[[^\]]+\])/)) {
    const m = part.match(/^\[([^\]]+)\]$/);
    if (m) p.append(el('sup', 'fn', m[1].replace(/\d+$/, '')));
    else if (part) p.append(part);
  }
};

try {
  const res = await fetch('./passages.json');
  if (!res.ok) throw new Error('missing passages');
  const data = await res.json();
  cols.replaceChildren();
  const columns = [];
  for (const ver of data.versions) {
    const col = el('section', 'col');
    col.setAttribute('aria-label', ver.name);
    col.append(el('h2', '', `${ver.name} (${ver.short})`));
    const ed = el('p', 'ed', ver.edition + ' · ');
    const lic = el('a', '', ver.license);
    lic.href = ver.licenseUrl; lic.target = '_blank'; lic.rel = 'noopener';
    ed.append(lic);
    col.append(ed);
    const text = el('div', 'text');
    text.lang = 'en';
    if (ver.heading) text.append(el('p', 'sh', ver.heading));
    for (const line of ver.lines) {
      const p = el('p', line.style);
      if (line.v) p.append(el('sup', 'v', String(line.v)));
      fill(p, line.text);
      text.append(p);
    }
    col.append(text);
    if (ver.notes.length) {
      const notes = el('ul', 'notes');
      notes.setAttribute('aria-label', `${ver.short} footnotes`);
      for (const n of ver.notes) notes.append(el('li', '', `${n.mark.replace(/\d+$/, '')} ${n.text}`));
      col.append(notes);
    }
    cols.append(col);
    columns.push(col);
  }
  // On a narrow screen the two versions stack; buttons let you flip between them.
  data.versions.forEach((ver, i) => {
    const b = el('button', '', ver.short);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', () => {
      columns.forEach((c, j) => { c.hidden = j !== i; });
      pick.querySelectorAll('button').forEach((x, j) => x.setAttribute('aria-pressed', String(j === i)));
    });
    pick.append(b);
  });
  const narrow = matchMedia('(max-width:560px)');
  const sync = () => columns.forEach((c, j) => { c.hidden = narrow.matches && pick.querySelectorAll('button')[j].getAttribute('aria-pressed') !== 'true'; });
  narrow.addEventListener('change', sync);
  sync();
  question.append(el('p', '', data.question));
  question.hidden = false;
} catch {
  cols.textContent = 'The passages could not load. Both texts are in passages.json in this folder.';
}
