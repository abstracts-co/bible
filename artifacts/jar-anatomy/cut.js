// Isometric camera and the live cutaway geometry (wedge masks, cut faces, ledge).
// Pure functions shared by app.js in the browser. World units are centimetres, z is up.

const BANDS = [0, 0.2, 0.42, 0.62];
const LIGHT_UP = 1.2;
const UNIT = Math.sqrt(1.6);
const TAU = Math.PI * 2;

export function camera({ scale, azimuth = 45, elevation = 30 }) {
  const a = (azimuth * Math.PI) / 180;
  const e = (elevation * Math.PI) / 180;
  return { sinA: Math.sin(a), cosA: Math.cos(a), sinE: Math.sin(e), cosE: Math.cos(e), k: scale * UNIT };
}

export function iso([x, y, z], P) {
  const { sinA, cosA, sinE, cosE, k } = camera(P);
  return [P.origin[0] + (x * sinA - y * cosA) * k, P.origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k];
}

export function view(P) {
  const { sinA, cosA, sinE, cosE } = camera(P);
  return [cosA * cosE, sinA * cosE, sinE];
}

export function light(P) {
  const { sinA, cosA } = camera(P);
  const length = Math.hypot(sinA, cosA, LIGHT_UP);
  return [-sinA / length, cosA / length, LIGHT_UP / length];
}

export function band(score) {
  let tone = 0;
  while (tone < BANDS.length && score >= BANDS[tone]) tone++;
  return tone;
}

// The floor angle that faces the viewer, in radians.
export const facing = (P) => Math.atan2(camera(P).sinA, camera(P).cosA);

// A point on a vertical axis through o: s up the axis, r out from it, at an angle from +x.
export const point = (o, s, r, angle) => [o[0] + r * Math.cos(angle), o[1] + r * Math.sin(angle), o[2] + s];

const tenth = (value) => {
  const text = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, "");
  return text === "-0" ? "0" : text;
};

export function pathOf(points, closed = false) {
  if (points.length < 2) return "";
  return points.map(([x, y], at) => `${at ? "L" : "M"}${tenth(x)} ${tenth(y)}`).join("") + (closed ? "Z" : "");
}

export function arc(o, s, r, a0, a1, P) {
  const count = Math.max(2, Math.ceil(Math.abs(a1 - a0) * Math.max(r, 0.01) * camera(P).k / 1.5));
  return Array.from({ length: count + 1 }, (_, index) => iso(point(o, s, r, a0 + ((a1 - a0) * index) / count), P));
}

// The screen region of a body of revolution's outer surface between two angles: the meridian
// [[s, r], ...] at a0, the arc at its last point, the meridian back at a1 and the arc at its first point.
// Valid on the side that faces the viewer, where the surface never folds on screen.
export function patch(o, meridian, a0, a1, P) {
  if (a1 - a0 < 1e-4) return "";
  const first = meridian[0];
  const last = meridian[meridian.length - 1];
  const points = [
    ...meridian.map(([s, r]) => iso(point(o, s, r, a0), P)),
    ...arc(o, last[0], last[1], a0, a1, P).slice(1, -1),
    ...[...meridian].reverse().map(([s, r]) => iso(point(o, s, r, a1), P)),
    ...arc(o, first[0], first[1], a1, a0, P).slice(1, -1),
  ];
  return pathOf(points, true);
}

// A cut face: a section polygon [[r, s], ...] laid in the half-plane at one angle.
export const section = (o, polygon, angle, P) => pathOf(polygon.map(([r, s]) => iso(point(o, s, r, angle), P)), true);

// The cut face at a0 shows toward +angle and the one at a1 toward -angle.
export function cutNormal(angle, side) {
  return side > 0 ? [-Math.sin(angle), Math.cos(angle), 0] : [Math.sin(angle), -Math.cos(angle), 0];
}

export function faceShade(angle, side, P) {
  const n = cutNormal(angle, side);
  const L = light(P);
  return band(n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
}

export function faceSeen(angle, side, P) {
  const n = cutNormal(angle, side);
  const V = view(P);
  return n[0] * V[0] + n[1] * V[1] > 1e-6;
}

// A flat annular sector on a horizontal plane (the exposed ledge of a cut base).
export function sector(o, s, r0, r1, a0, a1, P) {
  if (a1 - a0 < 1e-4) return "";
  return pathOf([...arc(o, s, r1, a0, a1, P), ...arc(o, s, r0, a1, a0, P)], true);
}

export function translate(P, [dx, dy, dz]) {
  const a = iso([0, 0, 0], P);
  const b = iso([dx, dy, dz], P);
  return `translate(${(b[0] - a[0]).toFixed(2)} ${(b[1] - a[1]).toFixed(2)})`;
}

export const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
export const share = (value, from, to) => ease((value - from) / (to - from));

// Everything the cutaway draws for one opening of the slider (0 closed, 1 fully open).
export function pose(open, geo) {
  const { P, stage } = geo;
  const centre = facing(P);
  const cut = share(open, stage.jar[0], stage.jar[1]) * geo.jar.half;
  const wrap = share(open, stage.wrapper[0], stage.wrapper[1]) * geo.wrapper.half;
  const lift = share(open, stage.lid[0], stage.lid[1]) * geo.lid.lift;
  const faces = (body, half) => {
    const a0 = centre - half;
    const a1 = centre + half;
    return [
      { d: half > 1e-4 && faceSeen(a0, 1, P) ? section(body.o, body.section, a0, P) : "", shade: faceShade(a0, 1, P) },
      { d: half > 1e-4 && faceSeen(a1, -1, P) ? section(body.o, body.section, a1, P) : "", shade: faceShade(a1, -1, P) },
    ];
  };
  const { jar, wrapper, lid } = geo;
  return {
    open,
    lift,
    lidMove: translate(P, [0, 0, lift]),
    jarMask: patch(jar.o, jar.patch, centre - cut, centre + cut, P),
    jarFaces: faces(jar, cut),
    ledge: sector(jar.o, jar.ledge.s, jar.ledge.r0, jar.ledge.r1, centre - cut, centre + cut, P),
    ledgeEdge: cut > 1e-4 ? pathOf(arc(jar.o, jar.ledge.s, jar.ledge.r0, centre - cut, centre + cut, P)) : "",
    wrapMask: patch(wrapper.o, wrapper.patch, centre - wrap, centre + wrap, P),
    wrapFaces: faces(wrapper, wrap),
    lidMask: patch(lid.o, lid.patch, centre - cut, centre + cut, P),
    lidFaces: faces(lid, cut),
    cutDegrees: (cut * 2 * 180) / Math.PI,
  };
}

export { TAU };
