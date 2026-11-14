// lancé par le test « local » de NeoDex : vérification interne, le menu du tournoi, la 1re épreuve jouée à la souris (tirs sans vent bien visés) jusqu'au bilan,
// quelques lieux en capture, le tir rapide, la mise en page et le plein écran
module.exports = async ({ pj, sleep }) => {
  const A = `document.getElementById('gc').__ar`;
  const shot = async name => { const dir = process.env.NEO_SHOTS; if (!dir) return; const d = await pj(`document.getElementById('gc').toDataURL()`); require('fs').writeFileSync(require('path').join(dir, 'archer-' + name + '.png'), Buffer.from(d.split(',')[1], 'base64')); };
  const ptr = (type, x, y) => pj(`(() => { const cv = document.getElementById('gc'), r = cv.getBoundingClientRect(), k = r.width / 480; cv.dispatchEvent(new PointerEvent('${type}', {clientX: r.left + ${x} * k, clientY: r.top + ${y} * k, pointerId: 1, bubbles: true})); return 0; })()`);
  const st = () => pj(`${A}.st().st`);
  const fire = async () => {  // un tir sans vent, visé par le calcul
    const v = await pj(`(() => { ${A}.st().wind = 0; return ${A}.solve(); })()`); if (!v) throw new Error('aucun tir possible');
    await ptr('pointerdown', 300, 150); await ptr('pointermove', 300 - v[0], 150 - v[1]); await ptr('pointerup', 300 - v[0], 150 - v[1]);
  };
  const sc = await pj(`document.querySelector('[data-selfcheck]')?.dataset.selfcheck`); if (sc !== 'ok') throw new Error('vérification interne : ' + sc);
  await sleep(600); await shot('menu');
  if (await st() !== 'menu') throw new Error('le menu devait s’afficher');
  await ptr('pointerdown', 16 + 53, 36 + 25); await sleep(300);
  if (await st() !== 'intro' && await st() !== 'aim') throw new Error('l’épreuve 1 ne démarre pas : ' + await st());
  await ptr('pointerdown', 240, 150); await sleep(200);
  for (let i = 0; i < 6; i++) {
    await fire();
    for (let k = 0; k < 80 && !['aim', 'done'].includes(await st()); k++) { await sleep(100); if (i === 0 && k === 6) await shot('vol'); }
    if (i === 0) await shot('loupe');
  }
  await sleep(1200); await shot('bilan');
  const res = await pj(`(() => { const a = ${A}.st(); return {st: a.st, score: a.score, stars: a.stars, open2: ${A}.open(1)}; })()`);
  if (res.st !== 'done' || res.stars < 1 || !res.open2) throw new Error('bilan : ' + JSON.stringify(res));
  for (const [lv, name] of [[3, 'ballons'], [5, 'chateau'], [7, 'plage'], [10, 'nuit'], [9, 'falaise']]) {
    await pj(`(() => { ${A}.start(${lv - 1}); const a = ${A}.st(); a.st = 'aim'; a.cam = 0; return 0; })()`); await sleep(400);
    await fire(); await sleep(lv === 10 ? 1400 : 900); await shot(name);
  }
  await pj(`(${A}.start('r'), 0)`); await sleep(300);
  for (let i = 0; i < 3; i++) { await fire(); await sleep(700); }
  const rapid = await pj(`${A}.st().score`); if (!(rapid >= 5)) throw new Error('tir rapide : ' + rapid + ' points');
  await shot('rapide');
  const lay = await pj(`(() => { const c = document.getElementById('gc').getBoundingClientRect(), s = document.querySelector('.gSide').getBoundingClientRect(); return { beside: s.left >= c.right - 1, fits: document.documentElement.scrollWidth <= innerWidth + 1, w: innerWidth }; })()`);
  if (!lay.fits || (lay.w >= 700 && !lay.beside)) throw new Error('mise en page : ' + JSON.stringify(lay));
  await pj(`document.getElementById('gFs').click(), 0`); await sleep(700);
  const fs = await pj(`(() => { const c = document.getElementById('gc'); return document.fullscreenElement === c.parentElement && Math.abs(c.getBoundingClientRect().height - innerHeight) < 3; })()`);
  await pj(`document.fullscreenElement && document.exitFullscreen(), 0`); await sleep(300);
  if (!fs) throw new Error('le plein écran ne remplit pas la hauteur');
  return 'épreuve 1 : ' + res.score + ' points, ' + res.stars + ' étoiles · tir rapide ' + rapid + ' · fenêtre ' + lay.w + ' px';
};
