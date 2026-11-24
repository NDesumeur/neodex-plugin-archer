// Archer : Dix flèches, une cible de plus en plus loin et un vent qui change. Tire en arrière pour bander l'arc, lâche pour tirer.
// Jeu NeoDex en pixel art dessiné à la main (police bitmap, cadres et boutons en pixels). Il tourne dans le bac à sable de NeoDex.
const HTML = `<div class="appWrap wide">
  <div class="agHead"><span class="label">Archer</span><span class="hint">Clic maintenu et tirer en arrière : viser et doser · lâcher : tirer · 1 2 3 : flèche normale, lourde, fendante</span></div>
  <div class="gMain"><div class="gameBox"><canvas id="gc" width="480" height="270" role="img" aria-label="Archer"></canvas><button class="btn gFs" id="gFs">PLEIN ÉCRAN</button></div>
    <div class="gSide">
      <div class="sysCard"><b>RECORDS</b><div class="gStats" id="gStats"></div></div>
      <div class="row"><button class="btn main" id="gNew">ÉPREUVES</button></div>
      
      <div class="hint">Trois flèches : la normale ; la lourde, que le vent pousse à peine ; la fendante, qui se sépare en trois au sommet de sa course. Chaque épreuve donne une lourde et une fendante (plus avec le carquois). Les points gagnés deviennent des pièces pour améliorer l’arc (puissance, viseur, carquois). Chaque mois, un tournoi de saison : trois épreuves d’affilée contre sept archers, et un classement.</div><div class="hint">Un tournoi de 15 épreuves : chacune s’ouvre quand la précédente a au moins une étoile. La manche à air montre le vent, qui pousse la flèche pendant tout son vol ; les pointillés montrent le début du tir, sans le vent. Les ballons et les plateaux se crèvent au passage, la flèche continue. Le tir rapide : 60 secondes pour crever le plus de ballons.</div>
    </div></div>
</div>`;
const CSS = `.gMain{display:flex;gap:18px;align-items:flex-start}
.gameBox{display:grid;place-items:center;padding:10px;background:#05010b;flex:1 1 0;min-width:0;max-width:calc(min(72vh,620px) * 480 / 270 + 20px);position:relative}
.gameBox canvas{width:100%;height:auto;aspect-ratio:480/270;image-rendering:pixelated;cursor:var(--cp,pointer);touch-action:none}
.gSide{display:flex;flex-direction:column;gap:14px;flex:0 0 260px;min-width:0}
.gSide .sysCard{display:flex;flex-direction:column}
.gStats{display:grid;grid-template-columns:1fr auto;gap:4px 14px}
.gStats b{text-align:right}
.gFs{position:absolute;top:14px;right:14px;opacity:.85}
.gameBox:fullscreen{padding:0;background:#05010b;max-width:none}
.gameBox:fullscreen .gFs{display:none}
.gameBox:fullscreen canvas{max-width:none;width:auto;height:100vh}
@media (max-width:620px){.gMain{flex-direction:column}.gameBox{width:100%;flex:none}.gSide{flex:none;width:100%}}`;
/* ---------- l'habillage pixel art, dessiné à la main : police bitmap (accents compris), cadres, boutons, icônes ----------
   Tout est en pixels pleins, agrandis par 2 sans lissage : aucun dégradé, aucune ombre floue. */
const PXK = (() => {
  // chaque lettre : ses lignes, de haut en bas, à partir de la ligne 2 de la case (0-1 : accents des majuscules, 9-10 : jambages)
  const S = {
    A: '.###. #...# #...# ##### #...# #...# #...#', B: '####. #...# #...# ####. #...# #...# ####.', C: '.###. #...# #.... #.... #.... #...# .###.',
    D: '####. #...# #...# #...# #...# #...# ####.', E: '##### #.... #.... ####. #.... #.... #####', F: '##### #.... #.... ####. #.... #.... #....',
    G: '.###. #...# #.... #.### #...# #...# .####', H: '#...# #...# #...# ##### #...# #...# #...#', I: '### .#. .#. .#. .#. .#. ###',
    J: '..### ...#. ...#. ...#. #..#. #..#. .##..', K: '#...# #..#. #.#.. ##... #.#.. #..#. #...#', L: '#.... #.... #.... #.... #.... #.... #####',
    M: '#...# ##.## #.#.# #.#.# #...# #...# #...#', N: '#...# ##..# #.#.# #..## #...# #...# #...#', O: '.###. #...# #...# #...# #...# #...# .###.',
    P: '####. #...# #...# ####. #.... #.... #....', Q: '.###. #...# #...# #...# #.#.# #..#. .##.#', R: '####. #...# #...# ####. #.#.. #..#. #...#',
    S: '.#### #.... #.... .###. ....# ....# ####.', T: '##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..', U: '#...# #...# #...# #...# #...# #...# .###.',
    V: '#...# #...# #...# #...# #...# .#.#. ..#..', W: '#...# #...# #...# #.#.# #.#.# ##.## #...#', X: '#...# #...# .#.#. ..#.. .#.#. #...# #...#',
    Y: '#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..', Z: '##### ....# ...#. ..#.. .#... #.... #####',
    a: '..... ..... .###. ....# .#### #...# .####', b: '#.... #.... ####. #...# #...# #...# ####.', c: '..... ..... .###. #.... #.... #.... .###.',
    d: '....# ....# .#### #...# #...# #...# .####', e: '..... ..... .###. #...# ##### #.... .###.', f: '..## .#.. #### .#.. .#.. .#.. .#..',
    g: '..... ..... .#### #...# #...# #...# .#### ....# .###.', h: '#.... #.... ####. #...# #...# #...# #...#', i: '.#. ... ##. .#. .#. .#. ###',
    'ı': '... ... ##. .#. .#. .#. ###', j: '...# .... ..## ...# ...# ...# ...# #..# .##.', k: '#... #... #..# #.#. ##.. #.#. #..#',
    l: '##. .#. .#. .#. .#. .#. ###', m: '..... ..... ##.#. #.#.# #.#.# #.#.# #...#', n: '..... ..... ####. #...# #...# #...# #...#',
    o: '..... ..... .###. #...# #...# #...# .###.', p: '..... ..... ####. #...# #...# #...# ####. #.... #....', q: '..... ..... .#### #...# #...# #...# .#### ....# ....#',
    r: '.... .... #.## ##.. #... #... #...', s: '..... ..... .#### #.... .###. ....# ####.', t: '.#.. .#.. #### .#.. .#.. .#.. ..##',
    u: '..... ..... #...# #...# #...# #..## .##.#', v: '..... ..... #...# #...# #...# .#.#. ..#..', w: '..... ..... #...# #...# #.#.# #.#.# .#.#.',
    x: '..... ..... #...# .#.#. ..#.. .#.#. #...#', y: '..... ..... #...# #...# #...# #...# .#### ....# .###.', z: '..... ..... ##### ...#. ..#.. .#... #####',
    0: '.###. #...# #..## #.#.# ##..# #...# .###.', 1: '..#.. .##.. ..#.. ..#.. ..#.. ..#.. .###.', 2: '.###. #...# ....# ...#. ..#.. .#... #####',
    3: '####. ....# ....# .###. ....# ....# ####.', 4: '...#. ..##. .#.#. #..#. ##### ...#. ...#.', 5: '##### #.... ####. ....# ....# #...# .###.',
    6: '.###. #.... #.... ####. #...# #...# .###.', 7: '##### ....# ...#. ..#.. .#... .#... .#...', 8: '.###. #...# #...# .###. #...# #...# .###.',
    9: '.###. #...# #...# .#### ....# ....# .###.',
    '.': '. . . . . . #', ',': '.. .. .. .. .. .# .# #.', ':': '. . # . . . #', ';': '.. .. .# .. .. .# .# #.', '!': '# # # # # . #',
    '?': '.###. #...# ....# ...#. ..#.. ..... ..#..', "'": '# # . . . . .', '"': '#.# #.# ... ... ... ... ...', '-': '... ... ... ### ... ... ...',
    '+': '..... ..#.. ..#.. ##### ..#.. ..#.. .....', '/': '....# ...#. ...#. ..#.. .#... .#... #....', '(': '.# #. #. #. #. #. .#', ')': '#. .# .# .# .# .# #.',
    '%': '##..# ##.#. ...#. ..#.. .#... .#.## #..##', '·': '. . . # . . .', '×': '..... ..... #...# .#.#. ..#.. .#.#. #...#',
    '<': '...# ..#. .#.. #... .#.. ..#. ...#', '>': '#... .#.. ..#. ...# ..#. .#.. #...', '=': '.... .... #### .... #### .... ....',
    '_': '..... ..... ..... ..... ..... ..... #####', '#': '.#.#. .#.#. ##### .#.#. ##### .#.#. .#.#.', '&': '.##.. #..#. #.#.. .#... #.#.# #..#. .##.#',
    '…': '..... ..... ..... ..... ..... ..... #.#.#', '«': '..... ..#.# .#.#. #.#.. .#.#. ..#.# .....', '»': '..... #.#.. .#.#. ..#.# .#.#. #.#.. .....',
    '◀': '...# ..## .### #### .### ..## ...#', '▶': '#... ##.. ###. #### ###. ##.. #...', '→': '..... ..#.. ...#. ##### ...#. ..#.. .....',
    '←': '..... ..#.. .#... ##### .#... ..#.. .....', '↑': '..#.. .###. #.#.# ..#.. ..#.. ..#.. ..#..', '↓': '..#.. ..#.. ..#.. ..#.. #.#.# .###. ..#..',
    '*': '..... #.#.# .###. ##### .###. #.#.# .....', '[': '## #. #. #. #. #. ##', ']': '## .# .# .# .# .# ##', '|': '# # # # # # #',
    '@': '.###. #...# #.### #.#.# #.### #.... .###.', '€': '..### .#... ####. .#... ####. .#... ..###', '$': '..#.. .#### #.#.. .###. ..#.# ####. ..#..',
    '°': '.#. #.# .#. ... ... ... ...', '~': '..... ..... .#..# #.##. ..... ..... .....', '♪': '..##. ..#.# ..#.. ..#.. .##.. ###.. .#...',
  };
  const ACC = { a: ['..#', '.#.'], g: ['#..', '.#.'], c: ['.#.', '#.#'], d: ['...', '#.#'], t: ['.#.#', '#.#.'], z: ['.#.', '##.'] };  // aigu, grave, circonflexe, tréma, tilde, cédille
  const COMP = { é: 'ea', è: 'eg', ê: 'ec', ë: 'ed', á: 'aa', à: 'ag', â: 'ac', ä: 'ad', í: 'ıa', ì: 'ıg', î: 'ıc', ï: 'ıd', ó: 'oa', ò: 'og', ô: 'oc', ö: 'od',
    ú: 'ua', ù: 'ug', û: 'uc', ü: 'ud', ÿ: 'yd', ñ: 'nt', ç: 'cz', É: 'Ea', È: 'Eg', Ê: 'Ec', Ë: 'Ed', Á: 'Aa', À: 'Ag', Â: 'Ac', Ä: 'Ad', Í: 'Ia', Î: 'Ic', Ï: 'Id',
    Ó: 'Oa', Ô: 'Oc', Ö: 'Od', Ú: 'Ua', Ù: 'Ug', Û: 'Uc', Ü: 'Ud', Ñ: 'Nt', Ç: 'Cz' };
  const SUB = { 'œ': 'oe', 'Œ': 'OE', '’': "'", '‘': "'", '“': '"', '”': '"', '–': '-', '—': '-', ' ': ' ', ' ': ' ', '•': '·', '✓': 'v', 'ᐸ': '<', 'ᐳ': '>', '＜': '<', '＞': '>', '｜': '|', '／': '/', '！': '!', '？': '?', '（': '(', '）': ')', '：': ':', '　': ' ' };  // ᐸ ᐳ : les < > des titres YouTube
  const H = 11, glyphs = new Map(); let raster;
  function glyph(ch) {
    let g = glyphs.get(ch); if (g) return g;
    const px = [], add = (rows, ox, oy) => rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) if (r[x] === '#') px.push([ox + x, oy + y]); });
    const c = COMP[ch], src = S[c ? c[0] : ch]; let w = 3;
    if (src) {
      const rows = src.split(' '); w = Math.max(...rows.map(r => r.length)); add(rows, 0, 2);
      if (c) { const a = ACC[c[1]]; add(a, Math.floor((w - a[0].length) / 2), c[1] === 'z' ? 9 : /[A-Z]/.test(c[0]) ? 0 : 1); }
    } else if (ch !== ' ') {  // japonais, emoji… : la lettre du système, réduite à des pixels nets (sans lissage) sur la même hauteur que la police
      const q = (raster ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true })), RW = 16;
      q.canvas.width = RW; q.canvas.height = H; q.font = '11px "MS Gothic", "Yu Gothic UI", Meiryo, "Segoe UI Symbol", sans-serif'; q.fillStyle = '#000'; q.fillText(ch, 0, 10);
      const d = q.getImageData(0, 0, RW, H).data; let mx = 0;
      for (let y = 0; y < H; y++) for (let x = 0; x < RW; x++) if (d[(y * RW + x) * 4 + 3] > 110) { px.push([x, y]); mx = Math.max(mx, x + 1); }
      w = mx || 3;
      if (!px.length) { w = 5; add(['#####', '#...#', '#...#', '#...#', '#...#', '#...#', '#####'], 0, 2); }  // vraiment inconnue : une petite case
    }
    g = { w, px }; glyphs.set(ch, g); return g;
  }
  function layout(text) {
    let x = 0; const items = [];
    for (const ch of String(text)) for (const c of SUB[ch] ?? ch) { const g = glyph(c); items.push([g, x]); x += g.w + 1; }
    return { w: Math.max(0, x - 1), items };
  }
  function draw(g, text, x, y, color, s = 1) {  // (x, y) : coin haut gauche de la case
    const L = layout(text); g.fillStyle = color;
    for (const [gl, ox] of L.items) for (const [px, py] of gl.px) g.fillRect(x + (ox + px) * s, y + py * s, s, s);
    return L.w * s;
  }
  const bmp = new Map();
  function sprite(text, color, s = 1) {  // le texte tout prêt, gardé pour les images suivantes du jeu
    const k = text + '|' + color + '|' + s; let c = bmp.get(k); if (c) return c;
    c = document.createElement('canvas'); c.width = Math.max(1, layout(text).w * s); c.height = H * s; draw(c.getContext('2d'), text, 0, 0, color, s);
    if (bmp.size > 400) bmp.delete(bmp.keys().next().value);
    bmp.set(k, c); return c;
  }
  // comme fillText : (x, y) sur la ligne de base, aligné à gauche, au centre ou à droite
  function fill(g, text, x, y, color, s = 1, align = 'left') {
    const c = sprite(String(text), color, s), dx = align === 'center' ? -c.width / 2 : align === 'right' ? -c.width : 0;
    g.drawImage(c, Math.round(x + dx), Math.round(y - 9 * s));
  }
  const scale = size => Math.max(1, Math.round((size || 8) / 8));
  function art(rows, pal, s = 1) {  // un dessin en lignes de caractères, chaque caractère une couleur de la palette (« . » : transparent)
    const c = document.createElement('canvas'); c.width = Math.max(...rows.map(r => r.length)) * s; c.height = rows.length * s;
    const g = c.getContext('2d');
    rows.forEach((r, y) => { for (let x = 0; x < r.length; x++) { const col = pal[r[x]]; if (col) { g.fillStyle = col; g.fillRect(x * s, y * s, s, s); } } });
    return c;
  }
  return { H, layout, draw, sprite, fill, scale, art };
})();

// les pièces de l'interface, pixel par pixel (K : contour, les autres lettres : la palette du jeu)
const PX_PANEL = ['..KKKKKKKKKKKK..', '.KAAAAAAAAAAAAK.', 'KALAAAAAAAAAALSK', 'KAAKKKKKKKKKKSSK', 'KAAKHHHHHHHHKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK',
  'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKHDDDDDDDKSSK', 'KAAKKKKKKKKKKSSK', 'KALSSSSSSSSSSLSK', '.KSSSSSSSSSSSSK.', '..KKKKKKKKKKKK..'];
const PX_CARD = ['.KKKKKKKKKK.', 'KFFFFFFFFFFK', 'KFHHHHHHHHFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFHDDDDDDDFK', 'KFSSSSSSSSFK', 'KFFFFFFFFFFK', '.KKKKKKKKKK.'];
const PX_BTN = ['.KKKKKKKKKK.', 'KWWWWWWWWWWK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KWMMMMMMMMBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK', 'KDDDDDDDDDDK', '.KKKKKKKKKK.'];
const PX_BTN_DOWN = ['............', '............', '.KKKKKKKKKK.', 'KBBBBBBBBBBK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KBMMMMMMMMWK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.'];
const PX_TRACK = ['.KKKKKKKKKK.', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KHHHHHHHHHHK', '.KKKKKKKKKK.'];
const PX_KNOB = ['.KKKKK.', 'KWWWWWK', 'KWAAABK', 'KWAAABK', 'KKKKKKK', 'KWAAABK', 'KWAAABK', 'KBBBBBK', 'KDDDDDK', '.KKKKK.'];
const PX_RAIL = ['KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDHHDDK'];
const PX_ICONS = {
  play: ['kk......', 'kakk....', 'kaaakk..', 'kaaaaakk', 'kaaaaaak', 'kaaaaakk', 'kaaakk..', 'kakk....', 'kk......'],
  full: ['www...www', 'w.......w', 'w.......w', '.........', '....a....', '.........', 'w.......w', 'w.......w', 'www...www'],
  note: ['...aaaaaa', '...aaaaaa', '...a....a', '...a....a', '...a....a', '.aaa..aaa', 'aaaa.aaaa', 'aaaa.aaaa', '.aa...aa.'],
  star: ['....g....', '....g....', '...ggg...', 'ggggwgggg', '.ggwwwgg.', '..ggggg..', '..oo.oo..', '.oo...oo.', '.o.....o.'],
  crown: ['g...g...g', 'gg.ggg.gg', 'ggggggggg', 'grgggggrg', 'ggggggggg', 'ooooooooo'],
  folder: ['oooo.....', 'oggoooooo', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ooooooooo'],
  vol: ['....w....', '...ww..b.', 'wwwww.b.b', 'wwwww.b.b', 'wwwww.b.b', 'wwwww.b.b', '...ww..b.', '....w....'],
  clock: ['..wwwww..', '.w.....w.', 'w...a...w', 'w...a...w', 'w...aaa.w', 'w.......w', 'w.......w', '.w.....w.', '..wwwww..'],
  cursor: ['....a....', '..aaaaa..', '.a..a..a.', '.a.....a.', 'aaa.w.aaa', '.a.....a.', '.a..a..a.', '..aaaaa..', '....a....'],
  plus: ['...b...', '...b...', '...b...', 'bbbbbbb', '...b...', '...b...', '...b...'],
  down: ['wwwwwww', '.wwwww.', '..www..', '...w...'],
};

/* habille la page du jeu : root = son conteneur, T = sa palette, icons = [motif du texte, icône] pour les boutons et libellés */
function pxSkin(root, { T, icons = [], emblem, title }) {
  root.classList.add('pxk'); const s = 2, url = c => c.toDataURL();
  const btnPal = (M, W, B, D) => ({ K: T.k, W, M, B, D });
  const BN = btnPal(T.btn, T.btnHi, T.btnLo, T.k2), BH = btnPal(T.btnHov, T.btnHovHi, T.btnLo, T.k2);
  const BA = btnPal(T.acc, T.accL, T.accS, T.accD), BAH = btnPal(T.accL, '#ffffff', T.acc, T.accD);
  const img = { panel: PXK.art(PX_PANEL, { K: T.k, A: T.acc, S: T.accS, L: T.rivet, H: T.hl, D: T.fill }, s),
    card: PXK.art(PX_CARD, { K: T.k, F: T.line, H: T.hl, D: T.fill, S: T.k2 }, s), cardOn: PXK.art(PX_CARD, { K: T.k, F: T.acc, H: T.accS, D: T.fillOn, S: T.accD }, s),
    btn: PXK.art(PX_BTN, BN, s), btnH: PXK.art(PX_BTN, BH, s), btnD: PXK.art(PX_BTN_DOWN, BH, s),
    main: PXK.art(PX_BTN, BA, s), mainH: PXK.art(PX_BTN, BAH, s), mainD: PXK.art(PX_BTN_DOWN, BA, s),
    track: PXK.art(PX_TRACK, { K: T.k, D: T.k2, H: T.line }, s), knob: PXK.art(PX_KNOB, { K: T.k, W: T.accL, A: T.acc, B: T.accS, D: T.accD }, s),
    rail: PXK.art(PX_RAIL, { K: T.k, D: T.k2, H: T.line }, s), tile: PXK.art(T.tile, { x: T.bgDot, ':': T.bgDot2, '+': T.spark, '*': T.spark2 }, s) };
  const u = Object.fromEntries(Object.entries(img).map(([k, c]) => [k, url(c)]));
  const nine = (k, sl) => `border-style:solid;border-width:${sl * s}px;border-image:url(${u[k]}) ${sl * s} fill / ${sl * s}px stretch`;
  const IP = { k: T.k, w: T.text, a: T.acc, b: T.acc2, g: T.gold, o: T.orange, r: T.red, n: T.green, N: T.green2, m: T.muted, s: T.accS };
  const iconUrl = new Map(), icon = name => {
    let v = iconUrl.get(name); if (!v) { const c = PXK.art(PX_ICONS[name] || emblem, IP, s); v = { u: url(c), w: c.width, h: c.height }; iconUrl.set(name, v); }
    const b = document.createElement('b'); b.className = 'pxI'; b.setAttribute('aria-hidden', 'true'); b.style.cssText = `width:${v.w}px;height:${v.h}px;background-image:url(${v.u})`; return b;
  };
  const R = '.pxk.pxk';
  const css = document.createElement('style');
  css.textContent = `html,html body{background:${T.bg} url(${u.tile}) 0 0/${img.tile.width}px ${img.tile.height}px repeat!important}
::-webkit-scrollbar{width:16px;height:16px} ::-webkit-scrollbar-track{background:url(${u.rail}) 0 0/16px 8px repeat-y} ::-webkit-scrollbar-thumb{${nine('main', 4)}} ::-webkit-scrollbar-corner{background:none}
${R}{color:${T.text}}
${R} .px{box-shadow:none;background:none}
${R} .agHead{gap:18px;margin:0}
${R} .agHead .label{display:flex;align-items:center;gap:12px}
${R} .btn,${R} .tab{${nine('btn', 4)};height:auto;min-height:0;padding:0 6px 4px;margin:0;color:${T.text};font:12px/1 monospace;display:inline-flex;align-items:center;gap:6px;filter:none;text-shadow:none;letter-spacing:0;cursor:var(--cp,pointer)}
${R} .btn:hover,${R} .tab:hover{border-image-source:url(${u.btnH})}
${R} .btn:active,${R} .tab:active{border-image-source:url(${u.btnD});padding:4px 6px 0}
${R} .btn.main,${R} .tab.on{border-image-source:url(${u.main});color:${T.k}}
${R} .btn.main:hover,${R} .tab.on:hover{border-image-source:url(${u.mainH})}
${R} .btn.main:active,${R} .tab.on:active{border-image-source:url(${u.mainD})}
${R} .btn:focus-visible,${R} .tab:focus-visible{outline:2px dashed ${T.acc2};outline-offset:2px}
${R} .btn .pxV,${R} .tab .pxV{white-space:nowrap}
${R} .sysCard{${nine('card', 4)};padding:4px 6px;gap:8px;background:none}
${R} .sysCard.on{border-image-source:url(${u.cardOn})}
${R} .sysCard.on>b{color:${T.acc}}
${R} .sysCard>b{color:${T.text}}
${R} .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
${R} .gameBox,${R} .thBox{${nine('panel', 5)};box-shadow:none;background:none;padding:2px;gap:8px;grid-template-rows:auto auto}
${R} .gameBox canvas,${R} .thBox canvas{display:block;background:#05010b}
${R} .gameBox:fullscreen,${R} .thBox:fullscreen{border:0;padding:0;background:#000}
${R} .rhFs{position:static;opacity:1;justify-self:end;margin:0 6px 6px 0}
${R} .rhTabs{gap:8px;flex-wrap:wrap}
${R} .hint{color:${T.muted};line-height:24px}
${R} label{color:${T.muted};display:inline-flex;align-items:center;gap:8px}
${R} .rhDel{color:${T.red};top:6px;right:8px}
${R} input[type=range]{-webkit-appearance:none;appearance:none;background:none;height:20px;width:150px}
${R} input[type=range]::-webkit-slider-runnable-track{height:12px;${nine('track', 2)}}
${R} input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:20px;border:0;background:url(${u.knob}) 0 0/100% 100%;margin-top:-8px;cursor:var(--cp,pointer)}
${R} .pxSel{justify-content:space-between;gap:10px;max-width:100%;overflow:hidden}
${R} .rhImport .pxSel{flex:1;min-width:0}
.pxMenu{position:fixed;z-index:50;${nine('card', 4)};padding:2px;max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;color:${T.text}}
.pxMenu button{all:unset;padding:3px 8px;cursor:var(--cp,pointer);white-space:nowrap}
.pxMenu button:hover,.pxMenu button:focus-visible,.pxMenu button.on{background:${T.btnHov};color:${T.text}}
.pxMenu button.on{color:${T.acc}}
.pxT{position:relative;white-space:normal;font:12px/1 monospace;letter-spacing:0;text-transform:none}
.pxT i{display:inline-block;vertical-align:middle;background:currentColor;-webkit-mask:var(--m) 0 0/100% 100% no-repeat;mask:var(--m) 0 0/100% 100% no-repeat;image-rendering:pixelated}
.pxI{display:inline-block;vertical-align:middle;background:0 0/100% 100% no-repeat;image-rendering:pixelated;margin-right:6px}
.pxV>.pxI+.pxI{margin-left:-4px}
.pxSr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`;
  document.head.append(css);
  // un mot = une image (en masque : sa couleur suit celle du texte), une règle par mot pour ne pas répéter l'image
  const words = new Map(), sheet = document.head.appendChild(document.createElement('style')).sheet;
  const word = w => {
    let k = words.get(w);
    if (!k) { const c = PXK.sprite(w, '#fff', s); k = 'pw' + words.size; words.set(w, k); sheet.insertRule(`.${k}{--m:url(${c.toDataURL()});width:${c.width}px;height:${c.height}px}`, sheet.cssRules.length); }
    const i = document.createElement('i'); i.className = k; return i;
  };
  function render(vis, text, lead) {
    const parts = [], ic = lead && icons.find(([re]) => re.test(text.trim()));
    if (ic) parts.push(icon(ic[1]));
    for (const m of text.matchAll(/(★+)|(\s+)|([^\s★]+)/g)) {
      if (m[1]) for (const _ of m[1]) parts.push(icon('star'));
      else if (m[2]) parts.push(document.createTextNode(' '));
      else parts.push(word(m[3]));
    }
    vis.replaceChildren(...parts);
  }
  const lead = node => node.parentElement?.matches('button,label,.tab,.btn') && !node.previousSibling;
  function pixText(node) {  // le texte reste dans la page (lecteur d'écran, copier) ; on voit ses lettres en pixels
    const wrap = document.createElement('span'), sr = document.createElement('span'), vis = document.createElement('span');
    wrap.className = 'pxT'; sr.className = 'pxSr'; vis.className = 'pxV'; vis.setAttribute('aria-hidden', 'true');
    const first = lead(node); node.replaceWith(wrap); sr.append(node); wrap.append(sr, vis); render(vis, node.data, first);
  }
  function pxSelect(sel) {  // une liste déroulante en pixels ; la vraie reste cachée et garde sa valeur et ses événements
    sel.dataset.px = '1'; sel.style.display = 'none';
    const b = document.createElement('button'), lab = document.createElement('span'); b.type = 'button'; b.className = 'btn pxSel'; b.append(lab, icon('down')); sel.after(b);
    const sync = () => { const t = sel.selectedOptions[0]?.textContent || '—'; if (lab.dataset.t !== t) { lab.dataset.t = t; lab.textContent = t; } };
    const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', { configurable: true, get() { return d.get.call(this); }, set(v) { d.set.call(this, v); sync(); } });
    new MutationObserver(sync).observe(sel, { childList: true, subtree: true, characterData: true, attributes: true });
    sel.addEventListener('change', sync);
    b.onclick = () => {
      document.querySelector('.pxMenu')?.remove();
      const m = document.createElement('div'), r = b.getBoundingClientRect(); m.className = 'pxMenu'; m.setAttribute('role', 'listbox');
      for (const o of sel.options) {
        const it = document.createElement('button'); it.type = 'button'; it.textContent = o.textContent; it.className = o.selected ? 'on' : ''; it.setAttribute('role', 'option');
        it.onclick = () => { sel.value = o.value; sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); close(); b.focus(); };
        m.append(it);
      }
      root.append(m);
      const below = innerHeight - r.bottom; m.style.minWidth = r.width + 'px'; m.style.left = Math.min(r.left, innerWidth - m.offsetWidth - 4) + 'px';
      m.style.top = (below > m.offsetHeight + 8 || below > r.top ? r.bottom + 2 : r.top - m.offsetHeight - 2) + 'px';
      const close = () => { m.remove(); removeEventListener('pointerdown', out, true); removeEventListener('keydown', key, true); removeEventListener('blur', close); };
      const out = e => { if (!m.contains(e.target) && e.target !== b && !b.contains(e.target)) close(); };
      const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); b.focus(); } };
      addEventListener('pointerdown', out, true); addEventListener('keydown', key, true); addEventListener('blur', close);
      (m.querySelector('.on') || m.firstChild)?.focus();
    };
    sync();
  }
  const SKIP = 'select,option,textarea,script,style,canvas,.pxT,[data-pxskip]';
  let queued = false;
  function pass() {
    queued = false;
    root.querySelectorAll('select.gSel:not([data-px])').forEach(pxSelect);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), todo = [];
    for (let n; (n = w.nextNode());) if (n.data.trim() && n.parentElement && !n.parentElement.closest(SKIP)) todo.push(n);
    todo.forEach(pixText);
  }
  new MutationObserver(ms => {
    for (const m of ms) if (m.type === 'characterData') { const wrap = m.target.parentNode?.closest?.('.pxT'); if (wrap) render(wrap.lastChild, m.target.data, false); }
    if (!queued) { queued = true; queueMicrotask(pass); }
  }).observe(root, { childList: true, subtree: true, characterData: true });
  // le titre : grosses lettres à contour, trois tons, et l'emblème du jeu
  const lab = root.querySelector('.agHead .label');
  if (lab) {
    const L = PXK.layout(title), c = document.createElement('canvas'), g = c.getContext('2d'), on = [];
    c.width = L.w + 3; c.height = PXK.H + 3;
    for (const [gl, ox] of L.items) for (const [x, y] of gl.px) on.push([ox + x + 1, y + 1]);
    g.fillStyle = T.k; for (const [x, y] of on) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [2, 2], [1, 2], [2, 1]]) g.fillRect(x + dx, y + dy, 1, 1);
    for (const [x, y] of on) { g.fillStyle = y <= 5 ? T.accL : y <= 7 ? T.acc : T.accS; g.fillRect(x, y, 1, 1); }
    const big = document.createElement('canvas'), z = 4; big.width = c.width * z; big.height = c.height * z;
    const bg = big.getContext('2d'); bg.imageSmoothingEnabled = false; bg.drawImage(c, 0, 0, big.width, big.height);
    const t = document.createElement('b'); t.className = 'pxI'; t.style.cssText = `width:${big.width}px;height:${big.height}px;background-image:url(${big.toDataURL()})`;
    const e = PXK.art(emblem, IP, 3), em = document.createElement('b'); em.className = 'pxI'; em.style.cssText = `width:${e.width}px;height:${e.height}px;background-image:url(${e.toDataURL()})`;
    const sr = document.createElement('span'); sr.className = 'pxSr'; sr.textContent = lab.textContent;
    lab.dataset.pxskip = '1'; lab.replaceChildren(em, t, sr);
  }
  pass();
}

export default async function (ctx) {
  const view = ctx.view;
  if (!ctx.host) { view.textContent = "Ce plugin doit être approuvé par NeoDex pour s'ouvrir."; return; }
  const host = ctx.host, { el, toast, sfx } = host;
  const folder = ctx.folder;
  host.addStyle(CSS);
  view.innerHTML = HTML;
  pxSkin(view.querySelector('.appWrap'), { title: "ARCHER", T: {"k": "#050c06", "k2": "#0c1a0e", "fill": "#142a18", "fillOn": "#1c3a22", "hl": "#24482a", "line": "#3a6a40", "acc": "#ff4a5a", "accL": "#ffb0b8", "accS": "#c02a3a", "accD": "#4a0a14", "rivet": "#ffb0b8", "btn": "#24482a", "btnHi": "#5a9a5a", "btnLo": "#0c1a0e", "btnHov": "#2a5430", "btnHovHi": "#7aba7a", "text": "#f0fff0", "muted": "#b0d0a8", "acc2": "#ffd84a", "gold": "#ffd84a", "orange": "#ffa030", "red": "#ff4a5a", "green": "#7ee07a", "green2": "#2f8a3a", "bg": "#060e08", "bgDot": "#142a18", "bgDot2": "#0c1a0e", "spark": "#3a6a40", "spark2": "#ffd84a", "tile": ["................", "...:............", "................", "..........+.....", "................", "................", ".....:..........", "................", "................", ".............:..", "................", "..+.............", "................", ".........:......", "................", "................"]},
  emblem: [".........kk.", "........kwk.", ".......kwk..", "..kk..kwk...", "..kak.kk....", "...kakk.....", "....kak.....", "...kkkak....", "..kk..kak...", ".kk....kak..", "kk......kk..", "............"],
  icons: [[/^ÉPREUVES/, "play"], [/^RECORDS/, "crown"]] });
  const $ = id => view.querySelector('#' + id) || document.getElementById(id);
  const doc = async n => { try { return await folder.read(n); } catch { return null; } };
  const games = { best: {}, ...(await doc('games')) };
  let gamesTimer = null;
  const saveGames = () => { clearTimeout(gamesTimer); gamesTimer = setTimeout(() => { gamesTimer = null; folder.write('games', games).catch(() => {}); }, 500); };
  const best = (k, v) => { const b = games.best[k]; if (b == null || v > b) { games.best[k] = v; saveGames(); return true; } return false; };
  const gstore = (k, init) => (games[k] ??= init);
function gameLoop(st, appKey, update, draw) {
  cancelAnimationFrame(st.raf);
  const STEP = 1000 / 60; let acc = 0, last = performance.now();
  const frame = t => {
    if (!view.classList.contains('on')) { st.raf = 0; if (st.mode === 'play') st.mode = 'pause'; return; }  // leaving the tab pauses the game
    st.raf = requestAnimationFrame(frame);
    acc += Math.min(200, t - last); last = t;
    while (acc >= STEP) { if (st.mode === 'play') update(); st.tick++; acc -= STEP; }
    draw();
  };
  st.raf = requestAnimationFrame(frame);
}
function gameText(g, w, lines, y0) {  // lignes centrées en police pixel, sur une bande sombre
  g.fillStyle = 'rgba(11,3,28,.72)'; g.fillRect(0, y0 - 14, w, lines.length * 14 + 14);
  lines.forEach(([text, color, size], i) => PXK.fill(g, text, w / 2, y0 + i * 14, color, PXK.scale(size), 'center'));
}
const px = (g, color, x, y, w = 1, h = 1) => { g.fillStyle = color; g.fillRect(Math.round(x), Math.round(y), w, h); };
function sprite(g, rows, x, y, pal) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const c = pal[r[i]]; if (c) px(g, c, x + i, y + j); } }); }
const seeded = s => () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const pxFont = (g, text, x, y, color, size = 8, align = 'left') => { const s = PXK.scale(size); PXK.fill(g, text, x + s, y + s, '#05010b', s, align); PXK.fill(g, text, x, y, color, s, align); };

const clock = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
// petits outils communs aux jeux : une toile pré-dessinée, la position du pointeur dans le canevas, un bip
const cnv = (w, h, fn) => { const c = el('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.imageSmoothingEnabled = false; fn(g); return c; };
const spr = (rows, pal) => cnv(Math.max(...rows.map(r => r.length)), rows.length, g => sprite(g, rows, 0, 0, pal));
const W = 480, H = 270, cv = $('gc'), g = cv.getContext('2d'); g.imageSmoothingEnabled = false;
const cpos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
let actx = null;
const beep = (f, d = .1, type = 'square', slide = 0, vol = .08) => { try { actx ??= new AudioContext(); const o = actx.createOscillator(), gn = actx.createGain(), t = actx.currentTime; o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d); gn.gain.setValueAtTime(vol, t); gn.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + d + .02); } catch {} };
const keyOk = e => view.classList.contains('on') && !/INPUT|SELECT|TEXTAREA/.test(e.target.tagName);
const showStats = rows => $('gStats').replaceChildren(...rows.flatMap(([a, b]) => [el('span', '', a), el('b', '', String(b))]));

/* ---------- Archer : un tournoi de 12 épreuves dans des lieux différents (cibles, ballons, plateaux), et un tir rapide de 60 secondes.
   Tirer en arrière pour bander l'arc, lâcher pour tirer ; la caméra suit la flèche, ralentit près des cibles, et une loupe montre l'impact. ---------- */
const AR = {GY: 232, AX: 44, G: .055, V: 7.4, BIG: 900};
const mixc = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)), x = p(a), y = p(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
const AR_PLACES = {  // ciel (haut, milieu, bas), astre [couleur, x, y], fond lointain, plan du milieu, herbe
  pre: {sky: ['#2a3a7a', '#6a7ac0', '#ffb070'], sun: ['#ffe0a0', 250, 70], far: ['#4a5a8a', 'monts'], mid: ['#2a5a3a', 'collines'], grass: ['#3a8a3a', '#2a6a2a']},
  verger: {sky: ['#3a6ab0', '#7aaee0', '#d8f0ff'], sun: ['#fff4c0', 380, 50], far: ['#6a8ab0', 'monts'], mid: ['#2f6a2a', 'arbres'], grass: ['#4a9a3a', '#3a7a2a']},
  foret: {sky: ['#1a2a4a', '#4a5a7a', '#e08a5a'], sun: ['#ffc080', 120, 120], far: ['#2a3a4a', 'sapins'], mid: ['#1a3a2a', 'sapins'], grass: ['#2f6a2a', '#1f4a1f']},
  chateau: {sky: ['#3a5a9a', '#8aaad8', '#f0e0c0'], sun: ['#fff0c0', 90, 60], far: ['#5a6a8a', 'chateau'], mid: ['#3a6a3a', 'collines'], grass: ['#4a8a3a', '#3a6a2a']},
  plage: {sky: ['#2a8ad0', '#7ac8f0', '#f0f8ff'], sun: ['#fff8d0', 400, 44], far: ['#2a7ab0', 'mer'], mid: ['#d8c080', 'dunes'], grass: ['#e8d090', '#c8b070']},
  nuit: {sky: ['#05081a', '#101a3a', '#2a2a5a'], sun: ['#e8f0ff', 360, 50], far: ['#141a34', 'chateau'], mid: ['#0f1f1a', 'sapins'], grass: ['#1f3a2a', '#142a1f'], night: true},
  falaise: {sky: ['#4a3a7a', '#c06a7a', '#ffc080'], sun: ['#ffe0a0', 420, 110], far: ['#5a4a6a', 'mer'], mid: ['#6a5a5a', 'rocs'], grass: ['#5a7a3a', '#4a6a2a']},
};
// les épreuves : nom, lieu, flèches, vent maximal, cibles (c : cible, b : ballon, p : plateau ; x, h : hauteur au-dessus du sol, m : mouvement), étoiles
const AR_LV = [
  ['Premier tir', 'pre', 6, .3, [{k: 'c', x: 220, h: 30}], [20, 35, 50]],
  ['Plus loin', 'pre', 6, .6, [{k: 'c', x: 330, h: 30}], [18, 32, 46]],
  ['Ballons du verger', 'verger', 8, .4, [{k: 'b', x: 230, h: 60}, {k: 'b', x: 280, h: 90}, {k: 'b', x: 330, h: 50}, {k: 'b', x: 380, h: 110}, {k: 'b', x: 300, h: 130}, {k: 'b', x: 420, h: 70}], [15, 25, 30]],
  ['L’orée du bois', 'foret', 6, .8, [{k: 'c', x: 400, h: 34}], [15, 30, 45]],
  ['La cible qui danse', 'foret', 6, .6, [{k: 'c', x: 320, h: 40, m: 24}], [15, 28, 42]],
  ['Les remparts', 'chateau', 8, .7, [{k: 'c', x: 300, h: 30}, {k: 'c', x: 500, h: 70}], [25, 45, 60]],
  ['Vent du large', 'plage', 6, 1.6, [{k: 'c', x: 400, h: 30}], [12, 26, 40]],
  ['Mouettes de bois', 'plage', 8, .8, [{k: 'p', x: 300, h: 120, m: 60}, {k: 'p', x: 420, h: 150, m: 80}, {k: 'p', x: 520, h: 110, m: 50}, {k: 'p', x: 360, h: 170, m: 90}], [16, 24, 32]],
  ['Le guet de nuit', 'nuit', 6, .6, [{k: 'c', x: 520, h: 40, m: 20}], [12, 25, 40]],
  ['Au bord du vide', 'falaise', 6, 1.2, [{k: 'c', x: 620, h: 30}], [10, 22, 36]],
  ['La fête de nuit', 'nuit', 8, .8, [{k: 'c', x: 450, h: 34}, {k: 'b', x: 300, h: 80}, {k: 'b', x: 380, h: 120}, {k: 'b', x: 560, h: 90}, {k: 'b', x: 620, h: 140}], [20, 35, 50]],
  ['Le grand tournoi', 'chateau', 10, 1.5, [{k: 'c', x: 720, h: 36, m: 26}], [30, 55, 80]],
  ['Cerfs-volants', 'plage', 8, .9, [{k: 'k', x: 300, h: 150, m: 70}, {k: 'k', x: 430, h: 175, m: 90}, {k: 'k', x: 540, h: 130, m: 60}, {k: 'k', x: 380, h: 120, m: 50}], [12, 24, 36]],
  ['Le chariot du marché', 'verger', 6, .6, [{k: 'c', x: 400, h: 34, mx: 70, cart: true}], [12, 24, 38]],
  ['La grande finale', 'falaise', 10, 1.3, [{k: 'c', x: 600, h: 34, mx: 50, cart: true}, {k: 'k', x: 360, h: 160, m: 80}, {k: 'k', x: 480, h: 140, m: 70}, {k: 'b', x: 300, h: 90}, {k: 'b', x: 420, h: 110}], [30, 50, 70]],
];
// l'arc à améliorer avec les pièces (les points gagnés) : nom, clé, niveau max, prix, ce que ça fait
const AR_BOW = [['Puissance', 'pow', 3, [60, 150, 300], 'flèches plus rapides : +4 % par niveau'], ['Viseur', 'eye', 3, [40, 100, 200], 'pointillés de visée plus longs'], ['Carquois', 'quiv', 2, [80, 200], '+1 lourde et +1 fendante par épreuve']];
const AR_KIND = {n: 'NORMALE', l: 'LOURDE', f: 'FENDANTE'};
// le tournoi de saison : un par mois, trois épreuves tirées au sort, sept archers en face
const AR_RIVALS = ['Aube', 'Brin', 'Corentin', 'Dalia', 'Elouan', 'Fanny', 'Gaspard', 'Hortense', 'Ilian', 'Jade', 'Kilian', 'Maëlle'];
const arSeason = () => { const d = new Date(); return d.getFullYear() * 12 + d.getMonth(); };
const AR_PTS = {b: 5, p: 8, k: 12}, AR_RAPID = 60 * 60;
const ars = gstore('archer', {rounds: 0, bulls: 0}); ars.stars ??= {}; ars.rapid ??= 0; ars.gold ??= 0; ars.bow ??= {pow: 0, eye: 0, quiv: 0}; ars.season ??= {id: 0, best: 0}; ars.podiums ??= 0;
const arV = () => AR.V * (1 + .04 * ars.bow.pow);
function arBuy(i) {  // acheter un niveau de l'arc
  const [, k, max, cost] = AR_BOW[i], lv = ars.bow[k]; if (lv >= max || ars.gold < cost[lv]) return false;
  ars.gold -= cost[lv]; ars.bow = {...ars.bow, [k]: lv + 1}; saveGames(); arInfo(); beep(880, .1, 'triangle', 1320, .07); return true;
}
function arTour() {  // le tournoi de saison : les mêmes épreuves et les mêmes rivaux pour tout le mois
  const id = arSeason(), r = seeded(id * 97 + 13), lvs = [0, 1, 2].map(() => Math.floor(r() * AR_LV.length)), names = [...AR_RIVALS];
  for (let i = names.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [names[i], names[j]] = [names[j], names[i]]; }
  const rivals = names.slice(0, 7).map(n => ({n, s: lvs.reduce((a, lv) => a + Math.round(AR_LV[lv][5][1] * (.55 + r() * .75)), 0)}));
  ar = ar || {tick: 0, raf: 0}; ar.tour = {id, lvs, i: 0, total: 0, rivals}; arStart(lvs[0]);
}
const arRank = t => 1 + t.rivals.filter(r => r.s > t.total).length;
const arStarsOf = (lv, score) => AR_LV[lv][5].filter(s => score >= s).length;
const arOpen = lv => lv === 0 || (ars.stars[lv - 1] || 0) > 0;
let ar = null;
const arWind = () => ar.lv === 'r' ? 0 : Math.round((Math.random() * 2 - 1) * AR_LV[ar.lv][3] * 10) / 10;
function arTargets(list) { return list.map(t => ({...t, mx: t.mx || 0, x0: t.x, y0: AR.GY - t.h, y: AR.GY - t.h, m: t.m || (t.k === 'b' ? 4 : 0), sp: .02 + Math.random() * .015, ph: Math.random() * 6, alive: true})); }
function arStart(lv) {
  const rapid = lv === 'r', L = rapid ? null : AR_LV[lv];
  ar = Object.assign(ar || {tick: 0, raf: 0}, {mode: 'play', st: rapid ? 'aim' : 'intro', lv, place: rapid ? 'verger' : L[1], n: 0, score: 0, arrows: [], stuck: [], parts: [], pops: [], cam: 0, shake: 0, loupe: null, banner: null, aim: null, start: null, rel: 0, t0: ar?.tick || 0, time: AR_RAPID, btns: [], kind: 'n', quiver: rapid ? {l: 0, f: 0} : {l: 1 + ars.bow.quiv, f: 1 + ars.bow.quiv}});
  ar.tg = rapid ? [] : arTargets(L[4]); ar.worldW = rapid ? W : Math.max(W, ...ar.tg.map(t => t.x0 + (t.k === 'p' || t.k === 'k' ? t.m : 0) + t.mx + 90)); ar.wind = arWind();
  if (rapid) for (let i = 0; i < 6; i++) arBalloon();
  arInfo();
}
const arMenu = () => { ar = Object.assign(ar || {tick: 0, raf: 0}, {tour: null, mode: 'play', st: 'menu', place: 'pre', cam: 0, tg: [], arrows: [], stuck: [], parts: [], pops: [], shake: 0, loupe: null, banner: null, btns: []}); arInfo(); };
function arBalloon() { const h = 40 + Math.random() * 140; ar.tg.push(...arTargets([{k: 'b', x: 170 + Math.random() * 280, h}])); }
function arShoot(dx, dy) {
  const p = Math.min(1, Math.hypot(dx, dy) / 70), a = Math.atan2(dy, dx); if (p < .1) return;
  const [hx, hy] = arHand(a, p); let kind = ar.kind || 'n';
  if (kind !== 'n' && ar.quiver?.[kind] > 0) ar.quiver[kind]--; else kind = 'n'; ar.kind = 'n';
  ar.arrows.push({x: hx, y: hy, vx: Math.cos(a) * p * arV(), vy: Math.sin(a) * p * arV(), pts: 0, trail: [], kind}); ar.rel = 12; beep(300, .08, 'triangle', 900, .07);
  if (ar.lv !== 'r') { ar.n++; ar.st = 'fly'; }
}
// une flèche avance (deux demi-pas) : touche une cible (elle s'y plante), crève les ballons et brise les plateaux au passage (elle continue)
function arAdvance(a, tgs, wind, dt, wW) {
  for (let s = 0; s < 2; s++) {
    a.vy += AR.G / 2 * dt * (a.kind === 'l' ? 1.15 : 1); a.vx += wind * .004 * dt * (a.kind === 'l' ? .15 : 1); a.x += a.vx / 2 * dt; a.y += a.vy / 2 * dt;
    for (const t of tgs) {
      if (!t.alive) continue;
      if (t.k === 'c' && a.x >= t.x - 2 && a.x <= t.x + 4 && Math.abs(a.y - t.y) <= 20) { const dy = a.y - t.y, pts = Math.max(1, 10 - Math.floor(Math.abs(dy) / 2)); a.pts += pts; return {end: 'c', t, dy, pts}; }
      if (t.k !== 'c' && Math.hypot(a.x - t.x, a.y - t.y) < (t.k === 'b' ? 8 : 9)) { t.alive = false; a.pts += AR_PTS[t.k]; return {pop: t}; }
    }
    if (a.y >= AR.GY) return {end: 'g'};
    if (a.x > wW + 40 || a.x < -20 || a.y > H + 40) return {end: 'o'};
  }
  return null;
}
const arHand = (a, p) => { const sx = AR.AX + 3, sy = AR.GY - 25; return [sx + Math.cos(a) * 10, sy + Math.sin(a) * 10]; };
function arPart(x, y, n, cols, sp = 1.5) { for (let i = 0; i < n; i++) ar.parts.push({x, y, vx: (Math.random() - .5) * 2 * sp, vy: -Math.random() * 2 * sp, c: cols[i % cols.length], life: 40 + Math.random() * 30}); }
function arUpdate() {
  if (ar.st === 'menu' || ar.st === 'bow') return;
  for (const t of ar.tg) if (t.alive) { if (t.mx) t.x = t.x0 + Math.sin(ar.tick * t.sp * .5 + t.ph) * t.mx;  // le chariot roule
    if (t.k === 'k') { t.x = t.x0 + Math.sin(ar.tick * t.sp * .6 + t.ph) * t.m; t.y = t.y0 + Math.sin(ar.tick * t.sp * 1.7 + t.ph) * 14; continue; }  // le cerf-volant louvoie
    if (t.k === 'p') { t.x = t.x0 + Math.sin(ar.tick * t.sp + t.ph) * t.m; t.y = t.y0 + Math.cos(ar.tick * t.sp * 2 + t.ph) * 6; } else { t.y = t.y0 + Math.sin(ar.tick * t.sp + t.ph) * t.m; } }
  for (const p of ar.parts) { p.x += p.vx; p.y += p.vy; p.vy += .12; p.life--; if (p.y > AR.GY) { p.y = AR.GY; p.vx *= .6; p.vy = 0; } } ar.parts = ar.parts.filter(p => p.life > 0);
  for (const p of ar.pops) p.t++; ar.pops = ar.pops.filter(p => p.t < 60);
  if (ar.shake) ar.shake--; if (ar.rel) ar.rel--;
  if (ar.loupe && ar.tick - ar.loupe.t > 110) ar.loupe = null; if (ar.banner && ar.tick - ar.banner.t > 80) ar.banner = null;
  const camMax = ar.worldW - W;
  if (ar.st === 'intro') {  // la caméra va voir la cible, puis revient
    const k = ar.tick - ar.t0, goal = k < 70 ? camMax : k < 110 ? camMax : 0; ar.cam += (goal - ar.cam) * .06;
    if (k > 170 || !camMax) { ar.st = 'aim'; ar.cam = 0; }
    return;
  }
  if (ar.lv === 'r' && ar.st === 'aim') { if (--ar.time <= 0) return arEnd(); while (ar.tg.filter(t => t.alive).length < 6) arBalloon(); ar.tg = ar.tg.filter(t => t.alive); }
  const slow = ar.lv !== 'r' && ar.arrows.some(a => ar.tg.some(t => t.alive && t.x - a.x > -4 && t.x - a.x < 46 && Math.abs(t.y - a.y) < 34 && a.vx > 0));
  for (const a of [...ar.arrows]) {
    a.trail.push([a.x, a.y]); if (a.trail.length > 14) a.trail.shift();
    if (a.kind === 'f' && !a.split && a.vy >= 0) { a.split = true; for (const d of [-1, 1]) ar.arrows.push({...a, trail: [], pts: 0, vy: a.vy + d * 1.1, vx: a.vx * (1 - d * .05)}); arPart(a.x, a.y, 6, ['#ffffff', '#c8c8d8'], .6); beep(1400, .06, 'triangle', 700, .05); }
    const r = arAdvance(a, ar.tg, ar.wind, slow ? .3 : 1, ar.worldW); if (!r) continue;
    if (r.pop) { const t = r.pop; arPart(t.x, t.y, 14, t.k === 'b' ? ['#ff4a5a', '#ffffff', '#ff9aa0'] : t.k === 'k' ? ['#3f8aff', '#ffd84a', '#ffffff'] : ['#ff8a3a', '#c05a2a', '#ffd0a0'], 1.4); ar.pops.push({x: t.x, y: t.y - 10, text: '+' + AR_PTS[t.k], t: 0}); ar.score += AR_PTS[t.k]; ar.shake = 3; beep(t.k === 'b' ? 900 : 500, .08, 'square', t.k === 'b' ? 200 : 0, .07); continue; }
    ar.arrows.splice(ar.arrows.indexOf(a), 1);
    if (r.end === 'c') {
      ar.score += r.pts; ar.stuck.push({t: r.t, dy: r.dy, a: Math.atan2(a.vy, a.vx)}); ar.loupe = {dy: r.dy, dx: (Math.random() - .5) * 8, pts: r.pts, t: ar.tick};
      ar.shake = r.pts >= 9 ? 7 : 4; arPart(r.t.x, r.t.y + r.dy, 8, ['#e8c878', '#a07040', '#fff0c0'], 1);
      ar.pops.push({x: r.t.x, y: r.t.y - 26, text: '+' + r.pts, t: 0});
      if (r.pts === 10) { ars.bulls++; ar.banner = {text: 'DANS LE MILLE !', t: ar.tick}; [660, 880, 1100, 1320].forEach((f, i) => setTimeout(() => beep(f, .12, 'square', 0, .07), i * 90)); } else beep(r.pts >= 7 ? 1000 : 600, .1, 'square', 0, .07);
    } else { if (r.end === 'g') ar.stuck.push({x: a.x, y: AR.GY, a: Math.atan2(a.vy, a.vx)}); if (!a.pts) ar.pops.push({x: Math.min(a.x, ar.worldW - 20), y: AR.GY - 20, text: 'raté', t: 0}); beep(150, .1, 'square', 0, .05); }
    if (ar.lv !== 'r' && !ar.arrows.length) { ar.st = 'land'; ar.landT = ar.tick; }
  }
  if (ar.lv === 'r') return;
  if (ar.st === 'fly' && ar.arrows[0]) ar.cam += (Math.max(0, Math.min(camMax, ar.arrows[0].x - W * .45)) - ar.cam) * .12;
  if (ar.st === 'land' && ar.tick - ar.landT > 60) ar.st = 'back';
  if (ar.st === 'back') { ar.cam += (0 - ar.cam) * .1; if (ar.cam < 1) { ar.cam = 0; if (ar.n >= AR_LV[ar.lv][2] || !ar.tg.some(t => t.alive)) arEnd(); else { ar.st = 'aim'; ar.wind = arWind(); } } }
}
function arEnd() {
  ar.st = 'done'; ar.endAt = ar.tick; ars.rounds++; ars.gold += ar.score;
  if (ar.tour && ar.lv !== 'r') { const t = ar.tour; t.total += ar.score; t.i++; if (t.i >= t.lvs.length) { t.rank = arRank(t); if (ars.season.id !== t.id || t.rank < ars.season.best) ars.season = {id: t.id, best: t.rank}; if (t.rank <= 3) ars.podiums++; } }
  if (ar.lv === 'r') { ar.newBest = ar.score > ars.rapid; ars.rapid = Math.max(ars.rapid, ar.score); best('archerRapide', ar.score); }
  else { ar.stars = arStarsOf(ar.lv, ar.score); ar.newBest = ar.stars > (ars.stars[ar.lv] || 0); if (ar.newBest) ars.stars = {...ars.stars, [ar.lv]: ar.stars}; best('archer' + ar.lv, ar.score); }
  saveGames(); arInfo();
}
/* ---------- le dessin ---------- */
const AR_BG = {};
function arLayers(place) {  // le ciel, le fond lointain, le plan du milieu et le sol, dessinés une fois par lieu
  if (AR_BG[place]) return AR_BG[place];
  const P = AR_PLACES[place], r = seeded(place.length * 131 + 9), GY = AR.GY, big = AR.BIG + W;
  const sky = cnv(W, H, b => {
    for (let y = 0; y < GY; y++) { const k = y / GY * 9, lo = Math.floor(k), fr = k - lo, c = i => i < 4.5 ? mixc(P.sky[0], P.sky[1], i / 4.5) : mixc(P.sky[1], P.sky[2], (i - 4.5) / 4.5); px(b, c(lo), 0, y, W, 1); if (fr > .5) { b.fillStyle = c(lo + 1); for (let x = y % 2; x < W; x += 2) b.fillRect(x, y, 1, 1); } }
    if (P.night) for (let i = 0; i < 90; i++) px(b, i % 9 ? '#c8d0ff' : '#ffffff', Math.floor(r() * W), Math.floor(r() * GY * .7), 1, 1);
    const [sc, sx, sy] = P.sun; for (let y = -12; y <= 12; y++) for (let x = -12; x <= 12; x++) { const d = Math.hypot(x, y); if (d <= 10) px(b, d > 8 ? mixc(sc, P.sky[2], .3) : sc, sx + x, sy + y); else if (!P.night && d <= 12 && (x + y) % 2) px(b, mixc(sc, P.sky[1], .5), sx + x, sy + y); }
    if (P.night) { px(b, mixc(P.sun[0], '#8890b0', .4), sx - 3, sy - 2, 3, 3); px(b, mixc(P.sun[0], '#8890b0', .4), sx + 3, sy + 3, 2, 2); }
    if (!P.night) for (let i = 0; i < 5; i++) { const cx = Math.floor(r() * W), cy = 20 + Math.floor(r() * 60), w = 30 + Math.floor(r() * 40); for (let j = 0; j < 4; j++) aqLike(b, '#ffffff', cx + j * w / 4, cy - (j % 2) * 4, w / 3, 5, .55); }
  });
  const layer = (w, col, kind, base, amp, seedK) => cnv(w, H, b => {
    const rr = seeded(seedK), dark = mixc(col, '#000000', .25), lite = mixc(col, '#ffffff', .15);
    if (kind === 'monts') { let y = base; for (let x = 0; x < w; x += 2) { y = Math.max(base - amp, Math.min(base, y + (rr() - .5) * 6)); px(b, col, x, y, 2, GY - y); if (rr() < .3) px(b, lite, x, y, 2, 1); } }
    if (kind === 'collines') for (let x = 0; x < w; x++) { const y = base - amp * (.5 + .3 * Math.sin(x * .013 + seedK) + .2 * Math.sin(x * .031)); px(b, (x + Math.floor(y)) % 2 ? col : dark, x, y, 1, GY - y); px(b, lite, x, y, 1, 1); }
    if (kind === 'arbres' || kind === 'sapins') { px(b, col, 0, base - 10, w, GY - base + 10); for (let x = 0; x < w; x += 10 + Math.floor(rr() * 18)) { const h = amp * (.5 + rr() * .6); if (kind === 'sapins') for (let j = 0; j < h; j++) px(b, j % 5 === 0 ? dark : col, x - Math.floor(j / 3), base - h + j, Math.floor(j / 1.5) + 2, 1); else { px(b, dark, x + 4, base - 14, 3, 14); for (let dy = -9; dy <= 9; dy++) { const ww = Math.round(Math.sqrt(81 - dy * dy)); px(b, dy < -3 ? lite : col, x + 5 - ww, base - 22 + dy, 2 * ww, 1); } if (rr() < .5) for (let k = 0; k < 4; k++) px(b, '#e04a3a', x + 1 + Math.floor(rr() * 9), base - 28 + Math.floor(rr() * 12), 2, 2); } } }
    if (kind === 'chateau') { for (let x = 0; x < w; x += 2) px(b, col, x, base - 6 - Math.round(Math.sin(x * .02) * 4), 2, GY); for (let c = 0; c < w; c += 300) { const cx = c + 60 + Math.floor(rr() * 120); px(b, col, cx, base - 60, 80, 60); for (let i = 0; i < 80; i += 8) px(b, col, cx + i, base - 65, 5, 5); for (const tx of [cx - 10, cx + 80]) { px(b, col, tx, base - 85, 16, 85); for (let i = 0; i < 16; i += 6) px(b, col, tx + i, base - 90, 4, 5); px(b, place === 'nuit' ? '#ffd07a' : dark, tx + 6, base - 70, 3, 5); } } }
    if (kind === 'mer') { for (let y = base; y < GY; y++) px(b, (y % 4) ? col : mixc(col, '#ffffff', .2), 0, y, w, 1); for (let i = 0; i < w / 8; i++) px(b, mixc(col, '#ffffff', .45), Math.floor(rr() * w), base + Math.floor(rr() * (GY - base)), 3, 1); }
    if (kind === 'dunes') for (let x = 0; x < w; x++) { const y = base - amp * (.5 + .5 * Math.sin(x * .01 + 1)); px(b, col, x, y, 1, GY - y); if (x % 3 === 0) px(b, lite, x, y, 1, 1); }
    if (kind === 'rocs') for (let x = 0; x < w; x += 2) { const y = base - amp * Math.abs(Math.sin(x * .02)) - rr() * 4; px(b, (x / 2) % 3 ? col : dark, x, y, 2, GY - y); }
  });
  const ground = cnv(big, H, b => {
    const [g1, g2] = P.grass; px(b, '#05010b', 0, GY, big, 1);
    for (let y = GY + 1; y < H; y++) for (let x = 0; x < big; x += 2) px(b, (x * 3 + y * 7) % 11 < 2 ? g2 : (y - GY < 3 ? mixc(g1, '#ffffff', .15) : g1), x, y, 2, 1);
    for (let x = 0; x < big; x += 3 + Math.floor(r() * 5)) px(b, g2, x, GY - 2 - Math.floor(r() * 3), 1, 3);  // des brins d'herbe
    for (let i = 0; i < big / 30; i++) px(b, place === 'plage' ? '#b89a60' : ['#ffe04a', '#ffffff', '#ff8ad0'][i % 3], Math.floor(r() * big), GY + 4 + Math.floor(r() * (H - GY - 8)), 2, 1);
  });
  const fw = W + AR.BIG * .25, mw = W + AR.BIG * .55;
  return AR_BG[place] = {sky, far: layer(fw, P.far[0], P.far[1], GY - 40, 50, 3), mid: layer(mw, P.mid[0], P.mid[1], GY - 8, 30, 7), ground};
}
function aqLike(b, c, cx, cy, rx, ry, alpha) { b.globalAlpha = alpha; for (let dy = -ry; dy <= ry; dy++) { const w = Math.round(rx * Math.sqrt(1 - (dy / (ry + .5)) ** 2)); b.fillStyle = c; b.fillRect(Math.round(cx - w), Math.round(cy + dy), 2 * w, 1); } b.globalAlpha = 1; }
const line = (c, x0, y0, x1, y1, w = 1) => { const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0))); for (let i = 0; i <= n; i++) px(g, c, x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, w, w); };
function arArcher(x, aim) {  // l'archer, 44 pixels : capuche, carquois, et les bras qui suivent la visée
  const K = '#05010b', G = AR.GY, bob = !aim && ar.tick % 80 < 40 ? 1 : 0, a = aim ? aim[0] : -.12, p = aim ? aim[1] : 0;
  const box = (c, X, Y, w, h) => { px(g, K, X - 1, Y - 1, w + 2, h + 2); px(g, c, X, Y, w, h); };
  box('#3a2a1a', x - 5, G - 4, 4, 4); box('#3a2a1a', x + 2, G - 4, 4, 4);  // les bottes
  box('#5a4a3a', x - 4, G - 13, 3, 9); box('#5a4a3a', x + 2, G - 13, 3, 9);  // les jambes
  box('#8a5428', x - 9, G - 33 + bob, 4, 14); px(g, '#ff4a5a', x - 10, G - 37 + bob, 2, 4); px(g, '#ffffff', x - 7, G - 36 + bob, 2, 3);  // le carquois
  box('#3a8a3a', x - 5, G - 27 + bob, 11, 15); px(g, '#2a6a2a', x - 5, G - 27 + bob, 3, 15); px(g, '#8a5428', x - 5, G - 16 + bob, 11, 2); px(g, '#ffd84a', x, G - 16 + bob, 2, 2);  // la tunique et la ceinture
  box('#2a6a2a', x - 5, G - 38 + bob, 10, 11); px(g, '#ffd8a8', x - 1, G - 35 + bob, 6, 7); px(g, K, x + 2, G - 33 + bob, 1, 2); px(g, '#e8a878', x + 3, G - 30 + bob, 2, 1); px(g, '#3a8a3a', x - 4, G - 38 + bob, 8, 2); px(g, '#2a6a2a', x - 7, G - 31 + bob, 3, 6);  // la tête sous la capuche
  const dx = Math.cos(a), dy = Math.sin(a), hx = x + 3 + dx * 10, hy = G - 25 + dy * 10, nx = -dy, ny = dx, vib = ar.rel ? Math.sin(ar.rel * 2) * ar.rel / 6 : 0;
  line(K, x + 2, G - 25 + bob, hx, hy, 2); line('#ffd8a8', x + 3, G - 25 + bob, hx, hy);  // le bras tendu
  const pull = 3 + p * 10, nkx = hx - dx * pull + nx * vib, nky = hy - dy * pull + ny * vib, tips = [];
  for (let s = -1; s <= 1.001; s += .05) { const bx = hx + nx * s * 13 + dx * (1 - s * s) * 4, by = hy + ny * s * 13 + dy * (1 - s * s) * 4; px(g, '#5a3010', bx, by, 2, 2); px(g, '#a06a30', bx, by, 1, 1); if (Math.abs(Math.abs(s) - 1) < .03) tips.push([bx, by]); }  // l'arc
  if (tips.length >= 2) { line('#e8e0d0', tips[0][0], tips[0][1], nkx, nky); line('#e8e0d0', tips[tips.length - 1][0], tips[tips.length - 1][1], nkx, nky); }  // la corde
  line(K, x - 1, G - 25 + bob, nkx, nky, 2); line('#ffd8a8', x, G - 25 + bob, nkx, nky);  // le bras qui tire la corde
  if (aim || (ar.st === 'aim' && !ar.rel)) arArrow(nkx + dx * 17, nky + dy * 17, a);
}
function arArrow(x, y, a, kind) { for (let i = 0; i < 17; i++) px(g, i < 3 ? (kind === 'l' ? '#5a5a6a' : '#c8c8d8') : '#a07040', x - Math.cos(a) * i, y - Math.sin(a) * i, kind === 'l' && i < 4 ? 2 : 1, 1); px(g, kind === 'f' ? '#3f8aff' : kind === 'l' ? '#ffd84a' : '#ff4a5a', x - Math.cos(a) * 15, y - Math.sin(a) * 15 - 1, 2, 3); }
function arTarget(t, X) {
  const Y = Math.round(t.y);
  if (t.k === 'k') {  // un cerf-volant en losange, sa queue à nœuds qui ondule
    for (let j = 0; j < 20; j++) { const tx = X - j * .6 + Math.sin(ar.tick / 8 + j / 3) * 2; px(g, '#e8e0d0', tx, Y + 10 + j, 1, 1); if (j % 6 === 5) px(g, '#ff4a5a', tx - 1, Y + 10 + j, 3, 2); }
    for (let dy = -10; dy <= 10; dy++) { const w = Math.round((10 - Math.abs(dy)) * .7); px(g, '#05010b', X - w - 1, Y + dy, 2 * w + 3, 1); px(g, dy < 0 ? '#3f8aff' : '#ffd84a', X - w, Y + dy, w + 1, 1); px(g, dy < 0 ? '#ffd84a' : '#3f8aff', X + 1, Y + dy, w, 1); }
    px(g, '#5a3a1a', X, Y - 9, 1, 19); px(g, '#5a3a1a', X - 6, Y - 2, 13, 1);
    return;
  }
  if (t.k === 'c') {  // la cible de paille sur son trépied, ou sur son chariot qui roule
    if (t.cart) { const wy = AR.GY - 5, rot = Math.floor(t.x / 3) % 4;
      px(g, '#05010b', X - 13, Y + 18, 30, 12); px(g, '#a0602a', X - 12, Y + 19, 28, 10); px(g, '#c88040', X - 12, Y + 19, 28, 2); for (let i = 0; i < 4; i++) px(g, '#7a4420', X - 9 + i * 7, Y + 21, 1, 8);
      for (const wx of [X - 7, X + 11]) { px(g, '#05010b', wx - 4, wy - 4, 9, 9); px(g, '#7a4420', wx - 3, wy - 3, 7, 7); px(g, '#c88040', wx - 1 + [0, 1, 0, -1][rot], wy - 1 + [-1, 0, 1, 0][rot], 2, 2); px(g, '#05010b', wx, wy, 1, 1); }
      line('#3a2410', X + 1, Y + 8, X + 1, Y + 18);
    } else { line('#5a3a1a', X + 1, Y + 8, X - 6, AR.GY, 2); line('#5a3a1a', X + 2, Y + 8, X + 9, AR.GY, 2); line('#3a2410', X + 1, Y + 8, X + 1, AR.GY); }
    const ring = ['#ffd84a', '#ffd84a', '#ff4a5a', '#ff4a5a', '#3f8aff', '#3f8aff', '#1a1a2a', '#1a1a2a', '#f0f0f0', '#f0f0f0'];
    px(g, '#05010b', X - 2, Y - 22, 8, 45); for (let d = -20; d <= 20; d++) { const c = ring[Math.min(9, Math.floor(Math.abs(d) / 2))]; px(g, c, X - 1, Y + d, 4, 1); px(g, mixc(c, '#000000', .35), X + 3, Y + d, 2, 1); }
  } else if (t.k === 'b') {  // un ballon et sa ficelle
    const c = ['#ff4a5a', '#ffd84a', '#3f8aff', '#7ee07a', '#ff5ad9'][Math.floor(t.ph * 10) % 5];
    for (let j = 0; j < 14; j++) px(g, '#e8e0d0', X + Math.round(Math.sin(ar.tick / 15 + j / 3)), Y + 7 + j, 1, 1);
    for (let dy = -7; dy <= 6; dy++) { const w = Math.round(5.5 * Math.sqrt(1 - (dy / 7.5) ** 2)); px(g, dy > 3 ? mixc(c, '#000000', .3) : c, X - w, Y + dy, 2 * w + 1, 1); }
    px(g, '#ffffff', X - 3, Y - 4, 2, 3); px(g, mixc(c, '#000000', .3), X - 1, Y + 7, 3, 1);
  } else {  // un plateau d'argile
    px(g, '#5a2a10', X - 8, Y - 1, 17, 4); px(g, '#ff8a3a', X - 7, Y - 2, 15, 3); px(g, '#ffd0a0', X - 5, Y - 2, 8, 1);
  }
}
const AR_STAR = ['...#...', '..###..', '#######', '.#####.', '.##.##.', '##...##'];
const AR_STARC = {};
const arStar = (x, y, on, big) => { const c = AR_STARC[on] ??= cnv(7, 6, b => sprite(b, AR_STAR, 0, 0, {'#': on ? '#ffd84a' : '#3a3046'})); g.drawImage(c, x, y, 7 * (big || 1), 6 * (big || 1)); };
function arButton(x, y, w, h, label, fn, on = true, col = '#ff4a5a') {
  px(g, '#05010b', x - 1, y - 1, w + 2, h + 2); px(g, on ? col : '#3a3046', x, y, w, h); px(g, on ? '#ffb0b8' : '#5a4a66', x, y, w, 1); px(g, on ? mixc(col, '#000000', .4) : '#2a2036', x, y + h - 2, w, 2);
  pxFont(g, label, x + w / 2, y + h / 2 + 4, on ? '#ffffff' : '#8a7a99', 7, 'center'); if (on) ar.btns.push({x, y, w, h, fn});
}
function arDraw() {
  g.imageSmoothingEnabled = false; ar.btns = [];
  const L = arLayers(ar.place), cam = Math.round(ar.cam), sh = ar.shake ? Math.round((Math.random() - .5) * ar.shake) : 0;
  g.save(); g.translate(sh, sh ? Math.round((Math.random() - .5) * ar.shake) : 0);
  g.drawImage(L.sky, 0, 0); g.drawImage(L.far, -Math.round(cam * .25), 0); g.drawImage(L.mid, -Math.round(cam * .55), 0); g.drawImage(L.ground, -cam, 0);
  if (ar.st === 'menu' || ar.st === 'bow') { g.restore(); return arDrawMenu(); }
  for (const t of ar.tg) if (t.alive) arTarget(t, Math.round(t.x - cam));
  for (const s of ar.stuck) s.t ? arArrow(s.t.x - cam + 2, s.t.y + s.dy, s.a) : arArrow(s.x - cam, s.y, s.a);
  const aiming = ar.aim && ar.st === 'aim', p = aiming ? Math.min(1, Math.hypot(ar.aim[0], ar.aim[1]) / 70) : 0, ang = aiming ? Math.atan2(ar.aim[1], ar.aim[0]) : 0;
  arArcher(AR.AX - cam, aiming ? [ang, p] : null);
  if (aiming && p >= .1) { const [hx, hy] = arHand(ang, p); let x = hx, y = hy, vx = Math.cos(ang) * p * arV(), vy = Math.sin(ang) * p * arV(); for (let i = 0; i < 60; i++) { vy += AR.G; x += vx; y += vy; if (i % 2 === 0 && i < 10 + p * 14 + ars.bow.eye * 9) px(g, i < 24 + p * 14 ? '#ffffff' : '#ffd84a', x - cam, y, 1, 1); } }  // un début de trajectoire (sans le vent)
  for (const a of ar.arrows) { a.trail.forEach(([x, y], i) => { if (i % 2) { g.fillStyle = `rgba(255,255,255,${i / 30})`; g.fillRect(Math.round(x - cam), Math.round(y), 1, 1); } }); arArrow(a.x - cam, a.y, Math.atan2(a.vy, a.vx), a.kind); }
  for (const q of ar.parts) px(g, q.c, q.x - cam, q.y, 2, 2);
  for (const q of ar.pops) pxFont(g, q.text, q.x - cam, q.y - q.t / 3, q.text === 'raté' ? '#ffffff' : '#ffd84a', 8, 'center');
  for (const t of ar.tg) if (t.alive && t.x - cam > W - 6) { const y = Math.max(30, Math.min(AR.GY - 10, t.y)); px(g, '#05010b', W - 14, y - 4, 12, 9); for (let i = 0; i < 4; i++) px(g, '#ffd84a', W - 12 + i, y - 3 + i, 1, 7 - 2 * i); pxFont(g, Math.round((t.x - AR.AX) / 10) + ' m', W - 16, y + 3, '#ffd84a', 6, 'right'); }  // une cible plus loin
  g.restore();
  // le vent : une manche à air et sa force
  const wx = W / 2, wy = 22, w = ar.wind;
  if (ar.lv !== 'r') { px(g, '#05010b', wx - 1, wy - 8, 2, 20); for (let i = 0; i < Math.round(Math.abs(w) * 8) + 2; i++) px(g, i % 4 < 2 ? '#ff4a5a' : '#ffffff', wx + Math.sign(w || 1) * (i + 1), wy - 7 + Math.round(Math.sin(ar.tick / 6 + i) * (1 - Math.abs(w) / 4)), 1, 5);
    pxFont(g, 'vent ' + (w > 0 ? '→ ' : w < 0 ? '← ' : '') + Math.abs(w).toFixed(1), wx, wy + 20, '#ffffff', 6, 'center'); }
  // le bandeau du haut : épreuve, points, flèches qui restent, étoiles visées
  g.fillStyle = 'rgba(5,1,11,.55)'; g.fillRect(0, 0, W, 13);
  if (ar.lv === 'r') { pxFont(g, 'TIR RAPIDE · ' + Math.ceil(ar.time / 60) + ' s', 4, 10, ar.time < 600 ? '#ff4a5a' : '#ffffff', 7); pxFont(g, String(ar.score), W - 4, 10, '#ffd84a', 7, 'right'); }
  else { const Lv = AR_LV[ar.lv]; pxFont(g, (ar.lv + 1) + '. ' + Lv[0], 4, 10, '#ffffff', 7); pxFont(g, String(ar.score), W - 64, 10, '#ffd84a', 7, 'right');
    for (let i = 0; i < Lv[2]; i++) px(g, i < ar.n ? '#4a3a2a' : '#ffd84a', W - 6 - i * 5, 3, 2, 8);
    Lv[5].forEach((s, i) => arStar(160 + i * 28, 3, ar.score >= s)); Lv[5].forEach((s, i) => pxFont(g, String(s), 169 + i * 28, 10, ar.score >= s ? '#ffd84a' : '#8a7a99', 6)); }
  if (ar.loupe) {  // la loupe : la cible vue de face, et le trou de la flèche
    const lx = W - 76, ly = 20, cx = lx + 34, cy = ly + 34, k = Math.min(1, (ar.tick - ar.loupe.t) / 8);
    px(g, '#05010b', lx - 2, ly - 2, 72, 80); px(g, '#d8c08a', lx, ly, 68, 68);
    const ring = ['#ffd84a', '#ffd84a', '#ff4a5a', '#ff4a5a', '#3f8aff', '#3f8aff', '#1a1a2a', '#1a1a2a', '#f0f0f0', '#f0f0f0'];
    for (let y = -30; y <= 30; y++) for (let x = -30; x <= 30; x++) { const d = Math.hypot(x, y) * k; if (d <= 30) px(g, ring[Math.min(9, Math.floor(d / 3))], cx + x, cy + y); }
    if (k >= 1) { const hx = cx + Math.round(ar.loupe.dx * 1.5), hy = cy + Math.round(ar.loupe.dy * 1.5); px(g, '#05010b', hx - 1, hy - 1, 3, 3); px(g, '#a07040', hx - 4, hy, 3, 1); px(g, '#ff4a5a', hx - 7, hy - 1, 3, 3); }
    pxFont(g, '+' + ar.loupe.pts, cx, ly + 76, ar.loupe.pts >= 9 ? '#ffd84a' : '#ffffff', 8, 'center');
  }
  if (ar.banner) { const k = ar.tick - ar.banner.t; pxFont(g, ar.banner.text, W / 2, 80 - Math.max(0, 10 - k), k % 10 < 5 ? '#ffd84a' : '#ffffff', 16, 'center'); }
  if (ar.st === 'intro') pxFont(g, 'Clic : passer', W / 2, H - 8, '#ffffff', 6, 'center');
  if (ar.lv !== 'r' && (ar.st === 'aim' || ar.st === 'intro')) ['n', 'l', 'f'].forEach((k, i) => {  // le choix de la flèche
    const n = k === 'n' ? '' : ar.quiver[k], on = k === 'n' || n > 0, x = 96 + i * 82;
    arButton(x, 250, 76, 16, (i + 1) + ' ' + AR_KIND[k] + ' ' + n, () => { if (on) ar.kind = k; }, on, ar.kind === k ? '#3fa040' : '#5a4a66'); });
  if (ar.tour) pxFont(g, 'SAISON · ' + (ar.tour.i + (ar.st === 'done' ? 0 : 1)) + '/3 · total ' + (ar.tour.total + (ar.st === 'done' ? 0 : ar.score)), 4, 24, '#ffd84a', 6);
  if (ar.st === 'done') arDrawEnd();
  if (ar.tick % 20 === 0) cv.setAttribute('aria-label', 'Archer, ' + (ar.lv === 'r' ? 'tir rapide' : 'épreuve ' + (ar.lv + 1)) + ', ' + ar.score + ' points' + (ar.st === 'done' ? ', fini' + (ar.lv === 'r' ? '' : ', ' + ar.stars + ' étoiles') : '') + '.');
}
function arDrawBow() {  // l'atelier de l'arc
  g.fillStyle = 'rgba(5,1,11,.72)'; g.fillRect(0, 0, W, H);
  pxFont(g, 'L’ARC', W / 2, 26, '#ffd84a', 12, 'center'); pxFont(g, ars.gold + ' pièces', W / 2, 42, '#ffd84a', 8, 'center');
  AR_BOW.forEach(([name, k, max, cost, what], i) => {
    const y = 58 + i * 52, lv = ars.bow[k], maxed = lv >= max;
    px(g, '#05010b', 39, y - 1, W - 78, 46); px(g, '#2a2036', 40, y, W - 80, 44);
    pxFont(g, name, 52, y + 16, '#ffffff', 8); pxFont(g, what, 52, y + 32, '#c0b8cc', 6);
    for (let j = 0; j < max; j++) px(g, j < lv ? '#ffd84a' : '#3a3046', 180 + j * 12, y + 8, 9, 9);
    arButton(W - 156, y + 12, 104, 20, maxed ? 'MAX' : 'ACHETER ' + cost[lv], () => arBuy(i), !maxed && ars.gold >= cost[lv], '#3fa040');
  });
  arButton(W / 2 - 60, 222, 120, 22, 'RETOUR', arMenu, true, '#5a4a66');
}
function arDrawMenu() {
  if (ar.st === 'bow') return arDrawBow();
  g.fillStyle = 'rgba(5,1,11,.55)'; g.fillRect(0, 0, W, H);
  pxFont(g, 'LE TOURNOI', W / 2, 24, '#ffd84a', 12, 'center');
  AR_LV.forEach((L, i) => {
    const x = 12 + (i % 5) * 92, y = 34 + Math.floor(i / 5) * 56, open = arOpen(i), st = ars.stars[i] || 0;
    px(g, '#05010b', x - 1, y - 1, 88, 52); px(g, open ? '#2a2036' : '#16121e', x, y, 86, 50); px(g, open ? AR_PLACES[L[1]].sky[1] : '#221c2c', x, y, 86, 4);
    pxFont(g, String(i + 1), x + 5, y + 18, open ? '#ffd84a' : '#5a4a66', 10);
    pxFont(g, open ? L[0] : '???', x + 43, y + 34, open ? '#ffffff' : '#5a4a66', 6, 'center');
    for (let k = 0; k < 3; k++) arStar(x + 46 + k * 12, y + 9, k < st);
    if (open) ar.btns.push({x, y, w: 86, h: 50, fn: () => { ar.tour = null; arStart(i); }});
  });
  pxFont(g, ars.gold + ' pièces', W - 12, 24, '#ffd84a', 7, 'right');
  arButton(12, 208, 146, 22, 'TIR RAPIDE · ' + ars.rapid, () => { ar.tour = null; arStart('r'); }, true, '#3f8aff');
  arButton(167, 208, 146, 22, 'L’ARC', () => { ar.st = 'bow'; }, true, '#3fa040');
  arButton(322, 208, 146, 22, 'SAISON' + (ars.season.id === arSeason() ? ' · ' + ars.season.best + 'e' : ''), arTour, true, '#c0802a');
  pxFont(g, 'Une épreuve s’ouvre quand la précédente a une étoile', W / 2, 254, '#c0b8cc', 6, 'center');
  if (ar.tick % 20 === 0) cv.setAttribute('aria-label', 'Archer, le tournoi : ' + AR_LV.filter((L, i) => arOpen(i)).length + ' épreuves ouvertes.');
}
function arDrawEnd() {
  const k = ar.tick - ar.endAt, rapid = ar.lv === 'r'; g.fillStyle = 'rgba(5,1,11,.78)'; g.fillRect(60, 50, W - 120, 170);
  if (ar.tour?.rank) {  // le classement de la saison
    const t = ar.tour, rows = [...t.rivals, {n: 'Toi', s: t.total, me: true}].sort((a, b) => b.s - a.s || (a.me ? -1 : 1));
    pxFont(g, 'TOURNOI DE SAISON · ' + t.rank + (t.rank === 1 ? 'er' : 'e') + ' / 8', W / 2, 70, t.rank <= 3 ? '#7ee07a' : '#ff8a3a', 10, 'center');
    rows.forEach((r, i) => { const y = 86 + i * 11; pxFont(g, (i + 1) + '. ' + r.n, 150, y, r.me ? '#ffd84a' : '#ffffff', 7); pxFont(g, String(r.s), 330, y, r.me ? '#ffd84a' : '#c0b8cc', 7, 'right'); });
    if (k < 40) return;
    arButton(124, 186, 108, 22, 'REJOUER', arTour); arButton(248, 186, 108, 22, 'MENU', arMenu, true, '#5a4a66'); return;
  }
  if (ar.tour) {  // entre deux épreuves du tournoi
    pxFont(g, 'ÉPREUVE ' + ar.tour.i + ' / 3 DE LA SAISON', W / 2, 80, '#ffd84a', 10, 'center'); pxFont(g, ar.score + ' points · total ' + ar.tour.total, W / 2, 104, '#ffffff', 8, 'center');
    pxFont(g, 'Ensuite : ' + AR_LV[ar.tour.lvs[ar.tour.i]][0], W / 2, 126, '#c0b8cc', 7, 'center');
    if (k < 40) return;
    arButton(124, 170, 108, 22, 'SUIVANTE', () => arStart(ar.tour.lvs[ar.tour.i])); arButton(248, 170, 108, 22, 'ABANDON', arMenu, true, '#5a4a66'); return;
  }
  const ok = rapid || ar.stars > 0;
  pxFont(g, rapid ? 'TEMPS ÉCOULÉ' : ok ? 'ÉPREUVE RÉUSSIE !' : 'PAS ENCORE…', W / 2, 74, ok ? '#7ee07a' : '#ff8a3a', 12, 'center');
  pxFont(g, ar.score + ' points' + (rapid && ar.newBest ? ' · record !' : '') + ' · +' + ar.score + ' pièces', W / 2, 96, '#ffd84a', 8, 'center');
  if (!rapid) { for (let i = 0; i < 3; i++) arStar(W / 2 - 46 + i * 32, 106, i < ar.stars && k > 20 + i * 15, 4); AR_LV[ar.lv][5].forEach((s, i) => { for (let j = 0; j <= i; j++) arStar(W / 2 - 104 + i * 76 + j * 8, 140, true); pxFont(g, String(s), W / 2 - 100 + i * 76 + (i + 1) * 8, 147, '#c0b8cc', 6); }); }
  if (k < 40) return;
  arButton(84, 170, 96, 22, 'REJOUER', () => arStart(ar.lv));
  if (!rapid && ar.lv + 1 < AR_LV.length) arButton(192, 170, 96, 22, 'SUIVANTE', () => arStart(ar.lv + 1), arOpen(ar.lv + 1));
  arButton(300, 170, 96, 22, 'MENU', arMenu, true, '#5a4a66');
}
cv.onpointerdown = e => {
  e.preventDefault(); if (!ar) return; const [x, y] = cpos(e);
  const b = ar.btns.find(b => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h); if (b) { beep(700, .05); return b.fn(); }
  if (ar.st === 'intro') { ar.st = 'aim'; ar.cam = 0; return; }
  if (ar.st !== 'aim' || (ar.lv === 'r' && ar.arrows.length >= 3)) return;
  ar.start = [x, y]; ar.aim = [0, 0]; try { cv.setPointerCapture(e.pointerId); } catch {}
};
document.addEventListener('keydown', e => { if (!ar || !keyOk(e) || ar.lv === 'r' || !['aim', 'intro'].includes(ar.st)) return; const k = ['n', 'l', 'f']['123'.indexOf(e.key)]; if (k && (k === 'n' || ar.quiver[k] > 0)) { ar.kind = k; beep(700, .05); } });
cv.onpointermove = e => { if (!ar?.start) return; const [x, y] = cpos(e); ar.aim = [ar.start[0] - x, ar.start[1] - y]; };
cv.onpointerup = () => { if (!ar?.start) return; const [dx, dy] = ar.aim; ar.start = null; ar.aim = null; if (ar.st === 'aim') arShoot(dx, dy); };
function arInfo() { const done = AR_LV.filter((L, i) => ars.stars[i]).length; showStats([['Étoiles', Object.values(ars.stars).reduce((a, b) => a + b, 0) + ' / ' + AR_LV.length * 3], ['Épreuves réussies', done + ' / ' + AR_LV.length], ['Dans le mille', ars.bulls], ['Tir rapide', ars.rapid], ['Pièces', ars.gold], ['Arc', 'puissance ' + ars.bow.pow + ' · viseur ' + ars.bow.eye + ' · carquois ' + ars.bow.quiv], ['Saison', ars.season.id === arSeason() ? ars.season.best + (ars.season.best === 1 ? 'er' : 'e') + ' sur 8' : '—'], ['Podiums', ars.podiums]]); }
$('gNew').onclick = () => { arMenu(); $('gNew').blur(); };
$('gFs').onclick = () => { $('gFs').blur(); if (document.fullscreenElement) document.exitFullscreen(); else cv.parentElement.requestFullscreen?.().catch(() => {}); };
// le tir qui touche le centre de la première cible encore là, sans vent (pour la vérification et le test)
function arSolve(tgs, wW, fine = true) {
  const t = tgs.find(t => t.alive && t.k === 'c') || tgs.find(t => t.alive); if (!t) return null;
  let bestS = null;
  for (let a = -1.3; a < .1; a += fine ? .005 : .012) for (let p = .3; p <= 1.001; p += fine ? .05 : .1) {
    const [hx, hy] = arHand(a, p), ar0 = {x: hx, y: hy, vx: Math.cos(a) * p * arV(), vy: Math.sin(a) * p * arV(), pts: 0}, copy = [{...t}];
    let r = null; for (let i = 0; i < 600 && !r; i++) r = arAdvance(ar0, copy, 0, 1, wW);
    const err = r && (r.end === 'c' ? Math.abs(r.dy) : r.pop ? 0 : 99); if (err != null && err < 99 && (!bestS || err < bestS.err)) bestS = {a, p, err};
  }
  return bestS && [Math.cos(bestS.a) * bestS.p * 70, Math.sin(bestS.a) * bestS.p * 70];
}
{  // vérification : chaque épreuve a un tir qui touche sa première cible sans vent ; un tir traverse deux ballons ; les étoiles
  const bad = [];
  AR_LV.forEach((L, i) => { const tgs = arTargets(L[4]).map(t => ({...t, m: 0})), wW = Math.max(W, ...tgs.map(t => t.x0 + 90)); if (!arSolve(tgs, wW, false)) bad.push('épreuve ' + (i + 1) + ' impossible'); });
  const two = arTargets([{k: 'b', x: 120, h: 60}, {k: 'b', x: 160, h: 60}]).map(t => ({...t, y: AR.GY - 60})), shot = {x: 60, y: AR.GY - 60, vx: 6, vy: 0, pts: 0};
  for (let i = 0; i < 40; i++) { const r = arAdvance(shot, two, 0, 1, W); shot.vy = 0; if (r?.end) break; }
  if (shot.pts !== 10 || two.some(t => t.alive)) bad.push('ballons : ' + shot.pts);
  if (arStarsOf(0, 35) !== 2 || arStarsOf(0, 10) !== 0) bad.push('étoiles');
  { const shoot = (kind, wind) => { const a = {x: 60, y: 150, vx: 5, vy: -2, pts: 0, kind}; for (let i = 0; i < 400; i++) if (arAdvance(a, [], wind, 1, 2000)) break; return a.x; };
    if (Math.abs(shoot('l', 1.5) - shoot('l', 0)) * 3 > Math.abs(shoot('n', 1.5) - shoot('n', 0))) bad.push('la lourde craint le vent'); }
  { const kite = arTargets([{k: 'k', x: 200, h: 100, m: 0}]), a = {x: 150, y: AR.GY - 100, vx: 6, vy: 0, pts: 0}; for (let i = 0; i < 30; i++) { const r = arAdvance(a, kite, 0, 1, W); a.vy = 0; if (r) break; } if (a.pts !== 12 || kite[0].alive) bad.push('cerf-volant'); }
  { const keepAr = ar, kg = {...ars, bow: {...ars.bow}, season: {...ars.season}};
    ars.gold = 100; ars.bow = {pow: 0, eye: 0, quiv: 0}; if (!arBuy(0) || ars.gold !== 40 || ars.bow.pow !== 1 || arBuy(0)) bad.push('achat de l’arc');
    ar = null; arTour(); const t = ar.tour, t2 = (ar.tour = null, arTour(), ar.tour); if (t.lvs.join() !== t2.lvs.join() || t.rivals[0].n !== t2.rivals[0].n || t.rivals.length !== 7) bad.push('saison');
    ar.quiver = {l: 1, f: 0}; ar.kind = 'l'; ar.st = 'aim'; arShoot(40, -20); if (ar.arrows[0]?.kind !== 'l' || ar.quiver.l !== 0) bad.push('flèche lourde'); ar.kind = 'f'; ar.arrows = []; ar.st = 'aim'; arShoot(40, -20); if (ar.arrows[0]?.kind !== 'n') bad.push('fendante sans stock');
    ar.arrows = [{x: 60, y: 150, vx: 4, vy: .2, pts: 0, trail: [], kind: 'f'}]; ar.tg = []; ar.st = 'fly'; ar.worldW = 2000; arUpdate(); if (ar.arrows.length !== 3) bad.push('la fendante ne se sépare pas');
    t2.total = 1e6; if (arRank(t2) !== 1) bad.push('classement'); t2.total = 0; if (arRank(t2) !== 8) bad.push('classement bas');
    ar = keepAr; Object.assign(ars, kg); }
  console.assert(!bad.length, 'archer', bad); view.dataset.selfcheck = bad.join(' | ') || 'ok';
}
cv.__ar = {st: () => ar, solve: () => arSolve(ar.tg.map(t => ({...t})), ar.worldW), start: arStart, menu: arMenu, open: arOpen, tour: arTour, end: arEnd, buy: arBuy};  // pour le test
ctx.onOpen(() => { if (!ar) arMenu(); ar.mode = 'play'; gameLoop(ar, 'archer', arUpdate, arDraw); arInfo(); });

}
