// Live cutaway: the slider opens a wedge through the jar and lid, then through the linen, then lifts the lid.
// Drag (or hover with a mouse) across the figure, use the arrow keys, or pick a part in the legend.
import { pose } from './cut.js';

const stage = document.querySelector('.iso-stage');
const svg = stage?.querySelector('svg');
const readout = document.querySelector('[data-readout]');
const hint = document.querySelector('[data-corner="hint"]');
const buttons = [...document.querySelectorAll('[data-pick]')];
const still = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

async function load() {
  const [geometry, parts] = await Promise.all([fetch('./geometry.json'), fetch('./parts.json')]);
  if (!geometry.ok || !parts.ok) throw new Error('Missing figure data');
  return [await geometry.json(), await parts.json()];
}

function start(geo, data) {
  const byId = Object.fromEntries(data.parts.map((part) => [part.id, part]));
  const q = (selector) => svg.querySelector(selector);
  const faces = (prefix) => ['a', 'b'].map((side) => {
    const group = q(`[data-dyn="${prefix}-${side}"]`);
    return { group, paths: [...group.querySelectorAll('path')], shade: group.querySelector('.iso-shade') };
  });
  const el = {
    jarMask: q('[data-mask="m-jar"]'),
    wrapMask: q('[data-mask="m-wrap"]'),
    lidMask: q('[data-mask="m-lid"]'),
    ledge: q('[data-dyn="ledge"]'),
    ledgeEdge: q('[data-dyn="ledge-edge"]'),
    jarFaces: faces('jar'),
    wrapFaces: faces('wrap'),
    lidFaces: faces('lid'),
    lids: [...svg.querySelectorAll('[data-move="lid"]')],
  };
  const groups = (id) => [...svg.querySelectorAll(`[data-part="${id}"]`)];

  const initial = Number(stage.getAttribute('aria-valuenow')) / 100;
  let open = initial;
  let target = initial;
  let picked = 'scroll';
  let preview = null;
  let showing = null; // a part named by the legend, until the slider moves again
  let touring = !still.matches;
  let clock = 0;
  let frame = 0;
  let last = 0;
  let visible = false;
  let idle = 0;
  let drawn = -1;

  const setD = (node, d) => { if (node.getAttribute('d') !== d) node.setAttribute('d', d); };
  const setFaces = (list, values) => list.forEach((face, index) => {
    const { d, shade } = values[index];
    face.paths.forEach((path) => setD(path, d));
    face.shade.setAttribute('data-shade', String(Math.min(3, shade)));
  });

  function stageText(value) {
    if (value < geo.stage.jar[0] + 0.02) return data.sealed;
    if (value < geo.stage.wrapper[0]) return byId.jar.read;
    if (value < geo.stage.lid[0]) return byId.wrapper.read;
    if (value < 0.9) return byId.scroll.read;
    return byId.lid.read;
  }

  function label() {
    const id = preview ?? showing;
    const text = id ? byId[id].read : stageText(open);
    if (readout.textContent !== text) readout.textContent = text;
    stage.setAttribute('aria-valuenow', String(Math.round(open * 100)));
    stage.setAttribute('aria-valuetext', text);
  }

  function highlight() {
    const id = preview ?? picked;
    for (const part of data.parts) {
      for (const group of groups(part.id)) group.toggleAttribute('data-on', part.id === id);
    }
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.pick === picked)));
  }

  function draw() {
    if (Math.abs(open - drawn) > 1e-5) {
      const p = pose(open, geo);
      setD(el.jarMask, p.jarMask);
      setD(el.wrapMask, p.wrapMask);
      setD(el.lidMask, p.lidMask);
      setD(el.ledge, p.ledge);
      setD(el.ledgeEdge, p.ledgeEdge);
      setFaces(el.jarFaces, p.jarFaces);
      setFaces(el.wrapFaces, p.wrapFaces);
      setFaces(el.lidFaces, p.lidFaces);
      el.lids.forEach((node) => node.setAttribute('transform', p.lidMove));
      drawn = open;
    }
    label();
  }

  // The idle tour: closed, open in three steps, hold, close.
  const TOUR = [[0, 1.4], [0.46, 1.6], [0.74, 1.6], [1, 2.6], [0, 0]];
  const RAMP = 2.4;
  const tourLength = TOUR.reduce((sum, [, hold]) => sum + hold + RAMP, 0);
  function tourAt(time) {
    let t = time % tourLength;
    for (let index = 0; index < TOUR.length; index++) {
      const [value, hold] = TOUR[index];
      const next = TOUR[(index + 1) % TOUR.length][0];
      if (t < hold) return value;
      t -= hold;
      if (t < RAMP) {
        const u = t / RAMP;
        return value + (next - value) * (u * u * (3 - 2 * u));
      }
      t -= RAMP;
    }
    return 0;
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    if (touring) {
      clock += dt;
      target = tourAt(clock);
    }
    open = still.matches ? target : open + (target - open) * (1 - Math.exp(-dt / (touring ? 0.12 : 0.32)));
    if (Math.abs(target - open) < 0.0005) open = target;
    draw();
    const settled = !touring && open === target;
    frame = visible && !settled ? requestAnimationFrame(tick) : 0;
  }
  const run = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };
  // Join the tour where the figure already is: the first phase whose value is nearest.
  const sync = () => {
    let best = 0;
    for (let t = 0; t < tourLength; t += 0.05) if (Math.abs(tourAt(t) - open) < Math.abs(tourAt(best) - open) - 1e-6) best = t;
    clock = best;
  };
  const rest = () => {
    clearTimeout(idle);
    idle = setTimeout(() => {
      if (still.matches) return;
      touring = true;
      showing = null;
      sync();
      label();
      run();
    }, 6000);
  };
  const steer = (value, part = null) => {
    showing = part;
    touring = false;
    target = clamp(value, 0, 1);
    rest();
    label();
    run();
  };

  // Pointer: a mouse scrubs by position; touch and pen drag, and a tap toggles open and closed.
  let drag = null;
  const share = (event) => {
    const box = svg.getBoundingClientRect();
    return clamp(((event.clientX - box.left) / box.width - 0.18) / 0.64, 0, 1);
  };
  stage.addEventListener('pointermove', (event) => {
    if (drag && event.pointerId === drag.id) {
      const box = svg.getBoundingClientRect();
      const dx = event.clientX - drag.x;
      if (Math.abs(dx) > 6) drag.moved = true;
      if (drag.moved) steer(drag.from + (dx / box.width) * 1.6);
      return;
    }
    if (event.pointerType === 'mouse' && !drag) steer(share(event));
  });
  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    drag = { id: event.pointerId, x: event.clientX, from: target, moved: false };
  });
  const release = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    if (!drag.moved && event.type === 'pointerup') steer(open > 0.5 ? 0 : 1);
    drag = null;
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('pointerleave', (event) => { if (event.pointerType === 'mouse') rest(); });
  stage.addEventListener('keydown', (event) => {
    const steps = { ArrowRight: 0.25, ArrowUp: 0.25, ArrowLeft: -0.25, ArrowDown: -0.25 };
    let to = null;
    if (event.key in steps) to = Math.round((target + steps[event.key]) * 4) / 4;
    if (event.key === 'Home') to = 0;
    if (event.key === 'End') to = 1;
    if (event.key === 'Enter' || event.key === ' ') to = open > 0.5 ? 0 : 1;
    if (to === null) return;
    event.preventDefault();
    steer(to);
  });

  // Legend: pick a part to light it and open the figure far enough to show it.
  for (const button of buttons) {
    const id = button.dataset.pick;
    button.addEventListener('click', () => {
      picked = id;
      preview = null;
      highlight();
      steer(data.open[id] ?? target, id);
    });
    button.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') { preview = id; highlight(); label(); } });
    button.addEventListener('pointerleave', () => { preview = null; highlight(); label(); });
    button.addEventListener('focus', () => { preview = id; highlight(); label(); });
    button.addEventListener('blur', () => { preview = null; highlight(); label(); });
  }

  if (hint && finePointer.matches) hint.textContent = 'Hover or drag to cut open';
  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: '80px 0px' }).observe(stage);
  still.addEventListener?.('change', () => {
    touring = !still.matches;
    if (still.matches) open = target;
    run();
  });
  if (touring) sync();
  else target = open;
  highlight();
  draw();
}

if (stage && svg) {
  load().then(([geo, data]) => start(geo, data)).catch((error) => {
    // The static figure stays as drawn; only the live cut is unavailable.
    console.warn('Jar figure is static:', error.message);
  });
}
