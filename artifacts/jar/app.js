const host = document.querySelector('#scene');
try {
  const [THREE, {OrbitControls}, response] = await Promise.all([
    import('three'), import('three/addons/controls/OrbitControls.js'), fetch('./dimensions.json')
  ]);
  if (!response.ok) throw new Error('Missing dimensions');
  const data = await response.json();
  document.querySelector('#dimensions').textContent = `${data.object} · Jar ${data.jar.height_cm} cm high × ${data.jar.diameter_cm} cm diameter. Lid ${data.lid.height_cm} cm high × ${data.lid.diameter_cm} cm diameter.`;
  const scene = new THREE.Scene();
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.setClearColor(0x000000, 0);
  host.append(renderer.domElement); renderer.domElement.style.display = 'block';
  const camera = new THREE.PerspectiveCamera(36, 1, .01, 20);
  camera.position.set(.75, .64, .9);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, .29, 0); controls.enableDamping = true; controls.enablePan = false;
  controls.minDistance = .65; controls.maxDistance = 2; controls.maxPolarAngle = Math.PI * .49;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  controls.autoRotate = !motion.matches; controls.autoRotateSpeed = .55;
  const ambient = new THREE.HemisphereLight(0xfff5e5, 0x62503d, 2.5); scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffead0, 3.2); key.position.set(-1, 1.5, 1); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -.8; key.shadow.camera.right = .8;
  key.shadow.camera.top = 1; key.shadow.camera.bottom = -.5; key.shadow.normalBias = .003; scene.add(key);
  const fill = new THREE.DirectionalLight(0xe0ebff, .8); fill.position.set(1, .6, -.4); scene.add(fill);
  const surface = document.createElement('canvas'); surface.width = surface.height = 256;
  const ctx = surface.getContext('2d'); const pixels = ctx.createImageData(256, 256);
  let seed = 1474;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const v = 125 + (seed % 25); pixels.data.set([v, v, v, 255], i);
  }
  ctx.putImageData(pixels, 0, 0);
  const bump = new THREE.CanvasTexture(surface); bump.wrapS = bump.wrapT = THREE.RepeatWrapping; bump.repeat.set(3, 3);
  const clay = new THREE.MeshStandardMaterial({color: 0xb99b76, roughness: .95, bumpMap: bump, bumpScale: .0012, side: THREE.DoubleSide});
  function lathe(profile) {
    const mesh = new THREE.Mesh(new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 96), clay);
    mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); return mesh;
  }
  const h = data.jar.height_cm / 100; const r = data.jar.diameter_cm / 200;
  lathe([[0,0],[r*.68,0],[r*.85,.008],[r*.96,.03],[r,.09],[r,.36],[r*.98,.405],[r*.88,.445],[r*.67,.465],[r*.65,.487],[r*.69,h],[r*.61,h],[r*.58,.487],[r*.60,.467],[r*.80,.44],[r*.90,.40],[r*.92,.09],[r*.87,.035],[0,.018]]);
  const lr = data.lid.diameter_cm / 200; const lh = data.lid.height_cm / 100;
  const lid = lathe([[lr,0],[lr,.009],[lr*.98,.035],[lr*.84,lh],[0,lh],[0,lh-.009],[lr*.75,lh-.009],[lr*.88,.03],[lr*.89,0],[lr,0]]);
  lid.position.y = h - .009;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({opacity: .14}));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.001; floor.receiveShadow = true; scene.add(floor);
  let lifted = false;
  const spin = document.querySelector('#spin');
  function setSpin(value) { controls.autoRotate = value; spin.textContent = value ? 'Pause rotation' : 'Rotate'; }
  controls.addEventListener('start', () => setSpin(false));
  renderer.domElement.addEventListener('wheel', () => setSpin(false), {passive: true});
  host.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight'].includes(e.key)) return;
    e.preventDefault(); setSpin(false);
    const offset = camera.position.clone().sub(controls.target);
    offset.applyAxisAngle(new THREE.Vector3(0,1,0), e.key === 'ArrowLeft' ? .12 : -.12);
    camera.position.copy(controls.target).add(offset); controls.update();
  });
  renderer.domElement.tabIndex = 0; renderer.domElement.setAttribute('aria-label', 'Scroll jar. Drag or use left and right arrows to orbit.');
  for (const b of document.querySelectorAll('button')) b.disabled = false;
  document.querySelector('#lid').addEventListener('click', e => { lifted = !lifted; setSpin(false); e.target.textContent = lifted ? 'Replace lid' : 'Lift lid'; e.target.setAttribute('aria-pressed', String(lifted)); });
  spin.addEventListener('click', () => setSpin(!controls.autoRotate));
  document.querySelector('#reset').addEventListener('click', () => { camera.position.set(.75,.64,.9); controls.target.set(0,.29,0); controls.update(); setSpin(false); });
  motion.addEventListener('change', () => { if (motion.matches) setSpin(false); });
  setSpin(controls.autoRotate);
  function resize() { const w = host.clientWidth, height = host.clientHeight; renderer.setSize(w,height); camera.aspect = w/height; camera.updateProjectionMatrix(); }
  new ResizeObserver(resize).observe(host); resize();
  document.querySelector('#status').remove();
  let last = performance.now();
  renderer.setAnimationLoop(now => {
    const dt = Math.min((now-last)/1000, .05); last = now; controls.update(dt);
    const goal = h - .009 + (lifted ? .12 : 0);
    lid.position.y = motion.matches ? goal : THREE.MathUtils.damp(lid.position.y, goal, 12, dt);
    renderer.render(scene, camera);
    const a = new THREE.Vector3(0,.2,0); const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0).multiplyScalar(.1);
    const b = a.clone().add(right); a.project(camera); b.project(camera);
    document.querySelector('#scale').style.width = `${Math.abs(b.x-a.x)*host.clientWidth/2}px`;
  });
  dark.addEventListener('change', () => renderer.render(scene,camera));
} catch (error) {
  document.querySelector('#status').textContent = 'The model could not load. WebGL and CDN access are required. Catalog dimensions are available in dimensions.json.';
}
