// Doomsday Talent Planner
// Trees live in data/*.js, heroes in data/heroes.js. Positions are relative to the hero portrait (0,0).

const STATS = {
  global_atk: ['All Squad ATK', '%'], global_def: ['All Squad DEF', '%'], global_hp: ['All Squad HP', '%'], global_speed: ['All Squad Speed', '%'],
  ranged_atk: ['Ranged Squad ATK', '%'], ranged_def: ['Ranged Squad DEF', '%'], ranged_hp: ['Ranged Squad HP', '%'], ranged_speed: ['Ranged Squad Speed', '%'],
  dmg_to_infantry: ['DMG to Infantry', '%'], hp_below_50_atk: ['ATK when Squad Size < 50%', '%'],
  extra_attack: ['Extra Attack (10% chance, Damage Factor)', ''], chance_atk_buff: ['ATK Buff (10% chance, 2s)', '%'],
  skill_dmg_passive: ['Skill DMG (Passive)', '%'], skill_dmg_temp: ['Skill DMG (6s)', '%'], skill_dmg_dealt: ['Skill DMG Dealt', '%'],
  skill_dmg_taken: ['Skill DMG Taken', '%', 'bad'], dmg_reduction: ['DMG Reduction', '%'],
  rage_basic: ['Rage (Basic Atk)', ''], rage_skill: ['Rage (Skill Use)', ''], rage_chance: ['Rage (10% chance)', '']
};
const SIZE_R = { normal: 14, special: 22, final: 26 };
const NS = 'http://www.w3.org/2000/svg';
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const EDIT = params.has('edit');
const hero = HEROES[params.get('hero')] || Object.values(HEROES)[0];

let N = {};   // full id -> { n: node data, slot, req: [full ids], g: svg element }
let lv = {};  // full id -> current level
let total = 74, current = null, linesG = null;

const svgEl = (tag, attrs, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
const val = (n, l) => +(n.step * l).toFixed(2);
const effectText = (n, l) => n.text.replace(/\{v\}/g, val(n, l));
const spent = () => Object.values(lv).reduce((a, b) => a + b, 0);

function init() {
  document.title = hero.name + ' - Talent Planner';
  for (const slot in hero.trees) {
    const tid = hero.trees[slot];
    if (!TREES[tid]) continue;
    TREES[tid].nodes.forEach(n => {
      const fid = tid + '__' + n.id;
      N[fid] = { n, slot, req: n.requires.map(r => tid + '__' + r) };
      lv[fid] = 0;
    });
  }
  const svg = $('board');
  if (EDIT && hero.ref) {
    const r = hero.ref;
    svgEl('image', { href: r.img, x: -r.hub[0], y: -r.hub[1], width: r.w, height: r.h, opacity: 0.45 }, svg);
  }
  linesG = svgEl('g', {}, svg);
  const hub = svgEl('g', {}, svg);
  svgEl('circle', { r: 34, class: 'hub' }, hub);
  svgEl('text', { class: 'hub-text' }, hub).textContent = hero.name;
  const nodesG = svgEl('g', {}, svg);
  for (const fid in N) {
    const { n, slot } = N[fid];
    const g = svgEl('g', { class: `node slot-${slot} ${n.size}`, transform: `translate(${n.x},${n.y})` }, nodesG);
    svgEl('circle', { r: SIZE_R[n.size] }, g);
    svgEl('text', { class: 'lv', dy: '.35em' }, g);
    svgEl('title', {}, g).textContent = n.name;
    g.addEventListener(EDIT ? 'pointerdown' : 'click', e => EDIT ? startDrag(e, fid) : openPopup(fid));
    N[fid].g = g;
  }

  $('total-points-input').addEventListener('change', function () {
    total = Math.min(74, Math.max(0, parseInt(this.value) || 0));
    this.value = total;
    refresh();
  });
  window.addEventListener('click', e => {
    if (!e.target.closest('.node, .popup')) { $('popup-window').classList.add('hidden'); closeConfirm(); }
  });
  if (EDIT) setupEditBar();
  refresh();
}

function refresh() {
  for (const fid in N) {
    N[fid].g.classList.toggle('active', lv[fid] > 0);
    N[fid].g.querySelector('.lv').textContent = `${lv[fid]}/${N[fid].n.max}`;
  }
  drawLines();
  $('points-left').textContent = total - spent();
  updateStats();
}

function drawLines() {
  linesG.innerHTML = '';
  for (const fid in N) N[fid].req.forEach(r => svgEl('line', {
    x1: N[r].n.x, y1: N[r].n.y, x2: N[fid].n.x, y2: N[fid].n.y,
    class: `line slot-${N[fid].slot}` + (lv[fid] > 0 ? ' active' : '')
  }, linesG));
}

function updateStats() {
  const t = {};
  for (const fid in N) if (lv[fid] > 0) [].concat(N[fid].n.stat).forEach(s => t[s] = (t[s] || 0) + val(N[fid].n, lv[fid]));
  const html = Object.keys(STATS).filter(s => t[s] > 0).map(s => {
    const [label, suffix, cls] = STATS[s];
    return `<p class="${cls || ''}"><strong>${label}:</strong> +${+t[s].toFixed(2)}${suffix}</p>`;
  }).join('');
  $('stats-list').innerHTML = html || '<p class="no-buffs">No active buffs yet.</p>';
}

// ---- Talent logic ----
function prereqs(fid, set = new Set()) {
  N[fid].req.forEach(r => { if (!set.has(r)) { set.add(r); prereqs(r, set); } });
  return set;
}
const missing = fid => [...prereqs(fid)].reduce((s, r) => s + N[r].n.max - lv[r], 0);

function openPopup(fid) {
  current = fid;
  const n = N[fid].n, l = lv[fid];
  $('popup-title').textContent = n.name;
  $('popup-level').textContent = `${l}/${n.max}`;
  $('popup-current-effect').textContent = l > 0 ? effectText(n, l) : 'No active effect.';
  $('popup-next-effect').textContent = l < n.max ? 'Next: ' + effectText(n, l + 1) : 'Max Level Reached!';
  $('popup-window').classList.remove('hidden');
}

function tryLevelUp() {
  const n = N[current].n, left = total - spent();
  if (lv[current] >= n.max) return alert('Max level reached!');
  if (N[current].req.every(r => lv[r] >= N[r].n.max)) {
    if (left < 1) return alert('No points remaining!');
    lv[current]++; refresh(); openPopup(current);
  } else {
    const cost = missing(current) + 1;
    if (cost > left) return alert(`Not enough points! You need ${cost}, you have ${left}.`);
    $('popup-window').classList.add('hidden');
    $('confirm-title').textContent = n.name;
    $('confirm-level').textContent = `${lv[current]}/${n.max}`;
    $('confirm-cost').textContent = cost;
    $('confirm-current-points').textContent = left;
    $('confirm-popup').classList.remove('hidden');
  }
}

function confirmAutoBuy() {
  prereqs(current).forEach(r => lv[r] = N[r].n.max);
  if (lv[current] < N[current].n.max) lv[current]++;
  closeConfirm(); refresh(); openPopup(current);
}
function closeConfirm() { $('confirm-popup').classList.add('hidden'); }

function resetAllPoints() {
  if (!confirm('Are you sure you want to reset all talent points?')) return;
  for (const fid in lv) lv[fid] = 0;
  $('popup-window').classList.add('hidden'); closeConfirm(); refresh();
}

// ---- Edit mode (open index.html?edit): drag nodes over the reference screenshot ----
function startDrag(e, fid) {
  e.preventDefault();
  const svg = $('board'), n = N[fid].n;
  const move = ev => {
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(svg.getScreenCTM().inverse());
    n.x = Math.round(p.x); n.y = Math.round(p.y);
    N[fid].g.setAttribute('transform', `translate(${n.x},${n.y})`);
    drawLines();
  };
  const up = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', up); };
  addEventListener('pointermove', move); addEventListener('pointerup', up);
}

function setupEditBar() {
  const bar = $('edit-bar');
  bar.classList.remove('hidden');
  bar.innerHTML = '<b>Edit mode</b>: drag the nodes, then copy the file and paste it over the original.<br>';
  Object.values(hero.trees).forEach(tid => {
    const b = document.createElement('button');
    b.textContent = `Copy data/${tid}.js`;
    b.onclick = () => {
      const txt = `TREES.${tid} = ${JSON.stringify(TREES[tid], null, 1)};\n`;
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(
        () => b.textContent = 'Copied!',
        () => { const ta = document.createElement('textarea'); ta.value = txt; ta.rows = 6; bar.appendChild(ta); ta.select(); }
      );
    };
    bar.appendChild(b);
  });
}

init();
