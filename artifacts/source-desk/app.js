const tabs = document.querySelector('#tabs');
const card = document.querySelector('#card');

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

// Just enough Markdown for these notes: # heading, paragraphs, **bold**, *italic*, `code`, [links](url).
const inline = (parent, text) => {
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    parent.append(text.slice(last, m.index));
    if (m[1]) parent.append(el('b', '', m[1]));
    else if (m[2]) parent.append(el('i', '', m[2]));
    else if (m[5]) parent.append(el('code', '', m[5]));
    else {
      const a = el('a', '', m[3]);
      a.href = m[4];
      a.target = '_blank';
      a.rel = 'noopener';
      parent.append(a);
    }
    last = m.index + m[0].length;
  }
  parent.append(text.slice(last));
};

const render = (md) => {
  const box = el('div', 'note');
  md.trim().split(/\n{2,}/).forEach((block, i) => {
    const h = block.match(/^# (.*)$/);
    if (h) return box.append(el('h2', '', h[1]));
    const p = el('p', i === 1 ? 'cite' : '');
    inline(p, block.replace(/\n/g, ' '));
    box.append(p);
  });
  return box;
};

const dims = async () => {
  try {
    const d = await (await fetch('../jar/dimensions.json')).json();
    return `jar ${d.jar.height_cm} cm high, ${d.jar.diameter_cm} cm across; lid ${d.lid.height_cm} cm high, ${d.lid.diameter_cm} cm across.`;
  } catch {
    return 'see artifacts/jar/dimensions.json.';
  }
};

try {
  const res = await fetch('./cards.json');
  if (!res.ok) throw new Error('missing cards');
  const cards = await res.json();
  const notes = await Promise.all(cards.map((c) => fetch('./' + c.note).then((r) => r.text())));
  const sizes = await dims();
  const show = (i) => {
    const c = cards[i];
    tabs.querySelectorAll('button').forEach((b, j) => {
      b.setAttribute('aria-selected', String(j === i));
      b.tabIndex = j === i ? 0 : -1;
    });
    const fig = el('figure');
    const img = el('img');
    img.src = './' + c.figure.file;
    img.alt = c.figure.alt;
    fig.append(img);
    const cap = el('figcaption', '', c.figure.credit + (c.figure.page ? ` ${c.figure.page}.` : ''));
    if (c.figure.link) {
      const a = el('a', '', c.figure.linkText ?? 'Original');
      a.href = c.figure.link;
      a.target = '_blank';
      a.rel = 'noopener';
      cap.append(' ', a);
    }
    fig.append(cap);
    card.replaceChildren(fig, render(notes[i].replace(/\{dimensions[^}]*\}/, sizes)));
    card.classList.toggle('wide', !!c.figure.wide);
    card.setAttribute('aria-labelledby', 'tab-' + c.id);
  };
  cards.forEach((c, i) => {
    const b = el('button', '', c.tab);
    b.type = 'button';
    b.id = 'tab-' + c.id;
    b.setAttribute('role', 'tab');
    b.addEventListener('click', () => show(i));
    b.addEventListener('keydown', (e) => {
      const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!n) return;
      const j = (i + n + cards.length) % cards.length;
      show(j);
      tabs.children[j].focus();
    });
    tabs.append(b);
  });
  const start = Math.max(0, cards.findIndex((c) => c.id === location.hash.slice(1)));
  show(start);
} catch {
  card.textContent = 'The notes could not load. They are Markdown files in the notes/ folder.';
}
