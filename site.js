// Сайт Brawl Legends. Контент — в data.js, здесь только логика и разметка.
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const view = $("#view");
const BL = window.BL;
const SITE = BL.site;
// Аккаунты и API живут на хабе (Render); сайт на GitHub Pages ходит туда.
const API = (SITE.api || "").replace(/\/$/, "");

/* =====================  Иконки  ===================== */
const I = {
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
  crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
  swords: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2M9.5 17.5 21 6V3h-3L6.5 14.5M11 19l-6-6M8 16l-4 4M5 21l-2-2"/>',
  sword: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  fish: '<path d="M3 12c3-5 9-6 13-3l5-3-1 6 1 6-5-3c-4 3-10 2-13-3z"/><circle cx="8" cy="11" r="1"/>',
  gift: '<path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"/>',
  gem: '<path d="M6 3h12l3 6-9 12L3 9zM3 9h18M9 3l3 18M15 3l-3 18"/>',
  skull: '<path d="M12 3a8 8 0 0 0-8 8c0 3 2 5 3 6v3h10v-3c1-1 3-3 3-6a8 8 0 0 0-8-8z"/><circle cx="9" cy="11" r="1.6"/><circle cx="15" cy="11" r="1.6"/>',
  safe: '<rect x="3" y="4" width="18" height="15" rx="2"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8v1M12 14v1M5 19v2M19 19v2"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/>',
  download: '<path d="M12 3v12M6 10l6 6 6-6M4 20h16"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  warn: '<path d="M12 3l10 18H2zM12 10v5M12 18v.5"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6M20 4v14h-6"/>',
  tree: '<path d="M12 21v-6M12 15l-6-5M12 15l6-5M6 10V6M18 10V6M12 15V9"/><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="7" r="2"/>',
  key: '<circle cx="8" cy="14" r="4"/><path d="M11 11l9-9M17 5l3 3M14 8l2 2"/>',
  coin: '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 9.5h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15"/>',
  gravi: '<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)"/>',
  drop: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  column: '<path d="M4 6h16M5 6l1-3h12l1 3M7 6v12M12 6v12M17 6v12M4 21h16M5 18h14"/>',
  rune: '<path d="M8 3v18M8 7l8-4M8 12l8 4"/>',
  ankh: '<circle cx="12" cy="6.5" r="3.5"/><path d="M12 10v11M6 13h12"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 12h18M10 12v3h4v-3M8 7V5h8v2"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v2h18v-2a2 2 0 0 0 0-4 2 2 0 0 0 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const tx = (n, cls = "", alt = "") => `<img class="tx ${cls}" src="tx/${n}.png" alt="${alt}" loading="lazy" draggable="false">`;
const ic = (n, cls = "") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || ""}</svg>`;

/* =====================  Утилиты  ===================== */
let token = load("token");
let me = null;
let serversCache = null;
const ROLES = { owner: "Создатель", admin: "Админ", moder: "Модератор" };
const roleBadge = (r, cls = "") => r && ROLES[r] ? `<span class="role-badge r-${r} ${cls}">${r === "owner" ? "♛ " : r === "admin" ? "★ " : "✦ "}${ROLES[r]}</span>` : "";
const isStaffAdmin = () => me && (me.role === "owner" || me.role === "admin");

function load(k) { try { return localStorage.getItem(k); } catch { return null; } }
function save(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch {} }
function loadJson(k, d) { try { return JSON.parse(load(k)) ?? d; } catch { return d; } }
function esc(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function toast(t, icon = "check") {
  const el = $("#toast"); el.innerHTML = `${ic(icon)}<span>${esc(t)}</span>`; el.hidden = false;
  el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
  clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 2600);
}
function head(uuid, size = 26) { return `https://mc-heads.net/avatar/${uuid}/${size}`; }
function mcStrip(s) { return String(s || "").replace(/§(#[0-9a-f]{6}|[0-9a-fk-or])/gi, ""); }
const roman = (n) => ["", "I", "II", "III", "IV", "V"][n] || n;
const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c; };

async function copyText(text, msg) {
  try { await navigator.clipboard.writeText(text); toast(msg || "Скопировано: " + text, "copy"); }
  catch { toast(text, "info"); }
}
function copyIp(ev) {
  copyText(SITE.ip, "IP скопирован: " + SITE.ip);
  if (ev) burst(ev.clientX, ev.clientY);
}
window.copyIp = copyIp;

// Пиксельные искры при копировании IP
function burst(x, y) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#ffc93c", "#2f8bff", "#ff4d5e", "#4cd964", "#a259ff", "#fff"];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("i"); p.className = "spark";
    const a = (Math.PI * 2 * i) / 16 + Math.random() * 0.4, d = 40 + Math.random() * 50;
    p.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px`;
    document.body.appendChild(p); setTimeout(() => p.remove(), 700);
  }
}

// На GitHub Pages аккаунты работают через хаб (SITE.api); без него сайт — только витрина.
const STATIC = !/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && /github\.io$/.test(location.hostname) && !(window.BL && BL.site && BL.site.api);
async function api(path, { method = "GET", body } = {}) {
  if (STATIC) throw new Error("Аккаунты пока работают только в лаунчере Brawl Legends");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${API}/api${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  let data = null;
  try { data = await r.json(); } catch {}
  if (!r.ok) {
    if (r.status === 401 && token && !path.startsWith("/auth/")) { token = null; me = null; save("token", null); renderNav(); }
    throw new Error(data?.error || `Ошибка ${r.status}`);
  }
  return data;
}
async function servers() {
  if (serversCache && Date.now() - serversCache.t < 15000) return serversCache.v;
  if (STATIC) {
    try {
      const j = await fetch(`https://api.mcsrvstat.us/3/${SITE.ip}`).then((r) => r.json());
      const v = [{ status: { online: !!j.online, players: j.players?.online ?? 0, max: j.players?.max ?? 0, ping_ms: null } }];
      serversCache = { t: Date.now(), v }; return v;
    } catch { return []; }
  }
  try { const v = await api("/servers"); serversCache = { t: Date.now(), v }; return v; } catch { return []; }
}

/* =====================  Модель дерева  ===================== */
// Узлы: trunk (1–4), hub (5), city (6+), god. У каждого узла: id, type, tier, parents.
const TREE = (() => {
  const nodes = {}; const edges = [];
  const add = (n) => (nodes[n.id] = n);
  BL.trunk.forEach((t, i) => {
    add({ ...t, type: "trunk", id: "t" + t.tier });
    if (i) edges.push(["t" + (t.tier - 1), "t" + t.tier, "main"]);
  });
  BL.hubs.forEach((h) => {
    add({ ...h, type: "hub", tier: 5, id: h.id });
    edges.push(["t4", h.id, "main"]);
    h.branches.forEach((b) => {
      let prev = h.id;
      b.cities.forEach((c, i) => {
        const id = `${b.id}${i}`;
        add({ ...c, type: "city", id, tier: 6 + i, level: i + 1, hub: h, branch: b });
        edges.push([prev, id, "main"]); prev = id;
      });
      const n = b.cities.length;
      [["weak", 6 + n], ["strong", 7 + n]].forEach(([side, tier]) => {
        const gid = b[side]; const g = BL.gods[gid];
        add({ ...g, type: "god", id: gid, side, tier, hub: h, branch: b, prot: side === "weak" ? 35 : 40,
          rival: b[side === "weak" ? "strong" : "weak"] });
        edges.push([prev, gid, side]);
      });
    });
  });
  const parent = {}; edges.forEach(([a, b]) => (parent[b] = a));
  const pathTo = (id) => { const p = []; while (id) { p.unshift(id); id = parent[id]; } return p; };
  const children = (id) => edges.filter((e) => e[0] === id).map((e) => e[1]);
  return { nodes, edges, parent, pathTo, children };
})();
const godIds = Object.keys(BL.gods);
const cityCount = BL.trunk.length + BL.hubs.length + BL.hubs.reduce((s, h) => s + h.branches.reduce((a, b) => a + b.cities.length, 0), 0);
const setCount = (() => {
  let n = BL.trunk.reduce((s, t) => s + t.sets.length, 0) + BL.hubs.length * 2;
  BL.hubs.forEach((h) => h.branches.forEach((b) => b.cities.forEach((c) => (n += c.sets.filter(Boolean).length))));
  return n + godIds.length;
})();

// клавиши: ЛКМ/ПКМ рисуем текстурами мыши из ресурспака
function kbdHtml(x) { return x === "ЛКМ" ? `<kbd class="mouse">${tx("lmb")}ЛКМ</kbd>` : x === "ПКМ" ? `<kbd class="mouse">${tx("rmb")}ПКМ</kbd>` : `<kbd>${esc(x)}</kbd>`; }
function stars(s) { return `<span class="stars" aria-label="редкость">${esc(s)}</span>`; }
function prot(v) { return `<span class="prot" data-tip="Защита — уровень зачарования брони">${ic("shield")}${esc(v)}</span>`; }
function panIcon(p) { const P = BL.pantheons[p]; return `<span class="pan" style="--pc:${P.color}" data-tip="${esc(P.name)}">${ic(P.icon)}</span>`; }
function godEmblem(id, size = "", plain = false) {
  const g = BL.gods[id]; const P = BL.pantheons[g.pan]; const n = TREE.nodes[id];
  const icon = !plain && window.BL_GOD_ITEMS?.[id]?.chest?.icon;
  if (icon) return `<span class="gslot ${size} ${n.side}" style="--pc:${P.color}" data-tipgod="${id}">${tx(icon, "gslot-i", g.name)}<i class="gslot-p">${ic(P.icon)}</i></span>`;
  return `<span class="emblem ${size} ${n.side}" style="--pc:${P.color}"><b>${esc(g.name[0])}</b>${ic(P.icon)}</span>`;
}
function setName(s) { return s ? esc(s) : `<span class="soon" data-tip="Сет ещё в работе">скоро</span>`; }

/* =====================  Детали узла (боковая панель)  ===================== */
function nodeDetail(id) {
  const n = TREE.nodes[id]; if (!n) return "";
  const path = TREE.pathTo(id).map((p) => TREE.nodes[p]);
  const crumbs = `<div class="crumbs">${path.map((p) => `<button data-node="${p.id}" class="${p.id === id ? "cur" : ""}">${esc(p.short || p.name)}</button>`).join('<span>›</span>')}</div>`;
  const next = TREE.children(id).map((c) => TREE.nodes[c]);
  const nextHtml = next.length ? `<div class="dl-h">Следующая ступень</div><div class="next">${next.map((c) =>
    `<button data-node="${c.id}" class="nx ${c.side || ""}">${c.type === "god" ? godEmblem(c.id, "xs") : `<i style="background:${(c.color || c.hub?.color || "#2f8bff")}"></i>`}<span>${esc(c.short || c.name)}</span>${ic("arrow")}</button>`).join("")}</div>` : "";

  let body = "";
  if (n.type === "trunk" || n.type === "hub") {
    body = `
      <div class="d-pic" style="background-image:url(media/${n.img}.jpg)"><span class="tier">Ступень ${n.tier}</span></div>
      <p>${esc(n.text)}</p>
      <div class="stats3"><div>${prot(n.prot)}<small>защита</small></div><div>${stars(n.stars)}<small>редкость</small></div><div><b>${n.sets.length}</b><small>${plural(n.sets.length, "сет", "сета", "сетов")}</small></div></div>
      <div class="dl-h">Сеты по порядку</div>
      <ol class="setlist">${n.sets.map((s, i) => `<li><span class="sw" style="--c:${n.color}"></span>${esc(s)} ${s.startsWith("Броня") ? "" : "броня"}${n.swords?.[i] ? `<em>${ic("sword")} меч ${n.swords[i]} урона</em>` : ""}</li>`).join("")}</ol>
      ${n.farm ? `<div class="callout">${ic("info")}<span>${esc(n.farm)}</span></div>` : ""}
      ${n.type === "hub" ? `<div class="dl-h">Ветки хаба</div>${n.branches.map((b) => `<div class="mini-branch"><b>${esc(b.name)}</b><span>${b.cities.map((c) => esc(c.short || c.name)).join(" → ")} → <i class="y">${esc(BL.gods[b.weak].name)}</i> / <i class="r">${esc(BL.gods[b.strong].name)}</i></span></div>`).join("")}` : ""}`;
  } else if (n.type === "city") {
    const wg = BL.gods[n.branch.weak], sg = BL.gods[n.branch.strong];
    body = `
      <div class="d-pic hubpic${n.img ? "" : " drawn"}" style="background-image:${cityBg(n, n.hub.color)};--hc:${n.hub.color}">${n.img ? "" : `<span class="d-soon">скриншот скоро</span>`}<span class="tier">Ступень ${n.tier}</span><span class="d-city">${esc(n.name)}</span></div>
      <p>${esc(n.text)}</p>
      <div class="stats3"><div><b>${roman(n.level)}</b><small>уровень эффекта</small></div><div><b>${n.tier}</b><small>ступень</small></div><div><b>${n.branch.cities.length}</b><small>${plural(n.branch.cities.length, "город", "города", "городов")} в ветке</small></div></div>
      <div class="dl-h">Два сета города</div>
      <div class="twosets">
        <div class="ts y"><span class="lbl">Левый сет → ${esc(wg.name)}</span><b>${setName(n.sets[0])}</b>${n.weapons?.[0] ? `<em>${ic("sword")}${esc(n.weapons[0])}</em>` : ""}</div>
        <div class="ts r"><span class="lbl">Правый сет → ${esc(sg.name)}</span><b>${setName(n.sets[1])}</b>${n.weapons?.[1] ? `<em>${ic("sword")}${esc(n.weapons[1])}</em>` : ""}</div>
      </div>
      <div class="callout">${ic("info")}<span>${esc(n.branch.name)}: эффект на этой ступени — уровень ${roman(n.level)}. Каждый следующий город ветки — тот же эффект, но сильнее.</span></div>`;
  } else {
    const P = BL.pantheons[n.pan]; const rv = BL.gods[n.rival];
    body = `
      <div class="god-hero${P.img ? " has-img" : ""}" style="--pc:${P.color}${P.img ? `;--pimg:url(media/${P.img}_thumb.jpg)` : ""}">${godEmblem(id, "xl")}<div><div class="pname">${esc(P.name)}</div><div class="gside ${n.side}">${n.side === "weak" ? "Жёлтый путь" : "Красный путь · сильнейший"}</div></div></div>
      <p>${esc(n.text)}</p>
      <div class="stats3"><div>${prot(n.prot)}<small>защита</small></div><div>${n.stars ? stars(n.stars) : `<b>${n.tier}</b>`}<small>${n.stars ? "редкость" : "ступень"}</small></div><div><b>IV</b><small>уровень эффекта</small></div></div>
      <div class="dl-h">Способности</div>
      <div class="abil"><div><span class="ab-ic">${ic("shield")}</span><div><b>${esc(n.armor)}</b><small>эффект брони</small></div></div>
        <div><span class="ab-ic">${ic("sword")}</span><div><b>${esc(n.sword)}</b><small>эффект меча${n.weapon ? " · " + esc(n.weapon) : ""}</small></div></div>
        <div><span class="ab-ic">${ic("bolt")}</span><div><b>Ульта</b><small><kbd>Shift</kbd> + ${kbdHtml("ПКМ")} мечом бога${n.throwable ? " · ПКМ — метнуть" : ""}</small></div></div></div>
      <div class="vs"><span>${godEmblem(id, "xs")} ${esc(n.name)}</span><b>${n.side === "weak" ? "&lt;" : "&gt;"}</b><span>${godEmblem(n.rival, "xs")} ${esc(rv.name)}</span></div>
      ${godSetHtml(id)}`;
  }
  const isGoal = load("goal") === id;
  return `<div class="dr-top">${crumbs}<button class="x" data-close aria-label="Закрыть">${ic("close")}</button></div>
    <h2 class="st dr-title">${esc(n.name)}</h2>
    ${body}
    ${nextHtml}
    ${n.type === "god" ? `<button class="btn ${isGoal ? "ghost" : ""} wide" data-goal="${id}">${ic("route")}${isGoal ? "Это моя цель ✓" : "Сделать целью — показать маршрут"}</button>` : ""}`;
}

function openDrawer(id) {
  const d = $("#drawer"); d.innerHTML = nodeDetail(id); d.dataset.cur = id;
  document.body.classList.add("drawer-open"); d.scrollTop = 0;
  $$(".tnode").forEach((el) => el.classList.toggle("sel", el.dataset.node === id));
}
function closeDrawer() { document.body.classList.remove("drawer-open"); $$(".tnode.sel").forEach((e) => e.classList.remove("sel")); }
document.addEventListener("click", (e) => {
  const nb = e.target.closest("[data-node]"); if (nb && !e.target.closest(".tree-scroll.dragging")) { openDrawer(nb.dataset.node); return; }
  if (e.target.closest("[data-close]") || e.target.id === "scrim") closeDrawer();
  const gb = e.target.closest("[data-goal]");
  if (gb) { setGoal(gb.dataset.goal); openDrawer(gb.dataset.goal); }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

function setGoal(id) {
  save("goal", id); save("done", JSON.stringify({}));
  toast(`Цель: ${BL.gods[id].name}. Маршрут — на странице «Ветки»`, "route");
  if (location.hash.startsWith("#/tree")) pages.tree();
}

/* =====================  Шапка  ===================== */
function renderNav() {
  const right = $("#navRight");
  if (me) {
    const av = me.minecraft ? `<img src="${head(me.minecraft.uuid, 30)}" alt="">` : `<img src="logo.png" alt="">`;
    right.innerHTML = `${isStaffAdmin() ? `<a class="btn sm admin-btn" href="#/admin">${ic("shield")}Админка</a>` : ""}<a class="chip-user${me.role ? " staff r-" + me.role : ""}" href="#/cabinet">${av}<span>${esc(me.login)}</span>${me.role ? `<i class="chip-role r-${me.role}">${esc(ROLES[me.role] || "")}</i>` : ""}</a>`;
  } else {
    right.innerHTML = STATIC ? `<a class="btn sm" href="download/BrawlLegends-Launcher-setup.exe">Скачать лаунчер</a>` : `<a class="btn ghost sm" href="#/login">Войти</a><a class="btn sm" href="#/register">Регистрация</a>`;
  }
}

/* =====================  Общие блоки  ===================== */
function ipCard(s) {
  const st = s?.status || {};
  const on = st.online;
  const pct = on && st.max ? Math.min(100, Math.round((st.players / st.max) * 100)) : 0;
  return `<div class="card ipcard pop">
    <div class="corner-tag">JAVA ${esc(SITE.version)}</div>
    ${tx("logo_small", "ip-logo", "Brawl Legends")}<div class="lbl">IP сервера</div>
    <button class="ip" onclick="copyIp(event)" data-tip="Нажми, чтобы скопировать">${esc(SITE.ip)}</button>
    <button class="btn blue wide" onclick="copyIp(event)">${ic("copy")}Скопировать IP</button>
    <div class="online"><span class="dot ${on ? "on" : s ? "off" : ""}"></span>${on ? `Онлайн: <b>${st.players ?? 0}</b> / ${st.max ?? "?"}` : s ? "Сервер сейчас выключен" : "Проверяем…"}</div>
    ${on ? `<div class="bar" data-tip="${pct}% мест занято"><i style="width:${pct}%"></i></div>` : `<div class="bar off"><i></i></div>`}
    <div class="ipmeta"><span>${ic("pin")}Европа</span><span>${ic("bolt")}${on && st.ping_ms ? st.ping_ms + " мс" : "—"}</span><span>${ic("shield")}Paper</span></div>
  </div>`;
}

function featCard(f, i = 0) {
  return `<a class="card feat pop lift" href="${f.href || "#/guide"}" style="--d:${i * 40}ms"><div class="ico ${f.tx ? "has-tx" : ""}" style="--c:${f.color}">${f.tx ? tx(f.tx) : ic(f.icon)}</div><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><span class="more">Подробнее ${ic("arrow")}</span></div></a>`;
}

const tagName = { update: "Обновление", event: "Событие", fix: "Исправление" };
async function newsList() { try { return await api("/news"); } catch { return []; } }
function newsCard(n, i) {
  return `<article class="card news-item pop lift" style="--d:${i * 50}ms"><div class="date"><span class="tag ${esc(n.tag)}">${esc(tagName[n.tag] || n.tag)}</span>${esc(n.date)}</div><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></article>`;
}
const skeleton = (k = 3) => Array.from({ length: k }, () => `<div class="card sk"><i></i><i></i><i></i></div>`).join("");

function sectionHead(title, sub, action = "") {
  return `<div class="section-h"><div><h2 class="st">${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ""}</div>${action}</div>`;
}
const HERO_TX = { tree: "g_armor", crown: "titul", book: "g_basics", swords: "g_modes", star: "s_shop", gift: "s_stardrop", info: "g_quests", sparkle: "g_mystery", map: "g_pin" };
function pageHero(kicker, title, text, icon, color = "#ffc93c") {
  const t = HERO_TX[icon];
  return `<section class="phero" style="--pc:${color}"><div class="phero-coins">${tx("goldcoin")}${tx("starcoin")}${tx("gravicoin")}${tx("stardrop")}</div><div class="wrap phero-in">
    <div class="ph-ico ${t ? "has-tx" : ""}">${t ? tx(t) : ic(icon)}</div>
    <div><div class="kicker">${kicker}</div><h1 class="st">${title}</h1><p>${text}</p></div>
  </div><div class="zig"></div></section>`;
}

function countUp(root = document) {
  $$("[data-count]", root).forEach((el) => {
    const to = +el.dataset.count; const t0 = performance.now(); const dur = 900;
    const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

/* =====================  Дерево (разметка + линии)  ===================== */
const COL = 196, NODE_W = 164, ROW = 46, PAD_T = 54, PAD_L = 18;
function treeLayout() {
  // строки: 16 путей (8 веток × 2)
  const pos = {};
  let row = 0;
  BL.hubs.forEach((h) => {
    const hubRow0 = row;
    h.branches.forEach((b) => {
      const r0 = row;
      b.cities.forEach((c, i) => (pos[`${b.id}${i}`] = { tier: 6 + i, y: r0 + 1, h: 2 }));
      pos[b.weak] = { tier: 6 + b.cities.length, y: r0 + 0.5, h: 1 };
      pos[b.strong] = { tier: 7 + b.cities.length, y: r0 + 1.5, h: 1 };
      row += 2;
    });
    pos[h.id] = { tier: 5, y: (hubRow0 + row) / 2, h: 2.4 };
  });
  BL.trunk.forEach((t) => (pos["t" + t.tier] = { tier: t.tier, y: row / 2, h: 2.4 }));
  return { pos, rows: row };
}

function treeHtml() {
  const { pos, rows } = treeLayout();
  const W = PAD_L * 2 + COL * 10, H = PAD_T + rows * ROW + 20;
  const x = (t) => PAD_L + (t - 1) * COL;
  const y = (p) => PAD_T + p.y * ROW;
  const nodes = Object.entries(pos).map(([id, p]) => {
    const n = TREE.nodes[id];
    const top = y(p) - (p.h * ROW) / 2 + 4, hh = p.h * ROW - 8;
    const color = n.color || n.hub?.color || BL.pantheons[n.pan]?.color;
    let inner = "";
    if (n.type === "god") inner = `${godEmblem(id, "xs")}<span class="tn-name">${esc(n.name)}</span><span class="tn-meta">${ic("shield")}${n.prot}</span>`;
    else if (n.type === "city") inner = `<span class="tn-name">${esc(n.short || n.name)}</span><span class="tn-sets"><i class="y">${setName(n.sets[0])}</i><i class="r">${setName(n.sets[1])}</i></span><span class="lvl">${roman(n.level)}</span>`;
    else inner = `<span class="tn-img" style="background-image:url(media/${n.img}_thumb.jpg)"></span><span class="tn-name">${esc(n.name)}</span><span class="tn-meta">${ic("shield")}${esc(n.prot)} · ${esc(n.stars)}</span>`;
    return `<button class="tnode tn-${n.type} ${n.side || ""}" data-node="${id}" data-hub="${n.hub?.id || (n.type === "hub" ? n.id : "")}" style="left:${x(p.tier)}px;top:${top}px;height:${hh}px;--c:${color}">${inner}</button>`;
  }).join("");
  const lines = TREE.edges.map(([a, b, kind]) => {
    const pa = pos[a], pb = pos[b];
    const x1 = x(pa.tier) + NODE_W, y1 = y(pa), x2 = x(pb.tier), y2 = y(pb);
    const mx = (x1 + x2) / 2;
    const hub = TREE.nodes[b].hub?.id || (TREE.nodes[b].type === "hub" ? b : "");
    return `<path class="edge ${kind}" data-a="${a}" data-b="${b}" data-hub="${hub}" d="M${x1} ${y1} C${mx} ${y1} ${x2 - 30} ${y2} ${x2} ${y2}"/>`;
  }).join("");
  const ruler = Array.from({ length: 10 }, (_, i) => `<div class="tr-col" style="left:${x(i + 1)}px;width:${NODE_W}px"><b>${i + 1}</b><span>${["Ствол", "Ствол", "Ствол", "Ствол", "Хаб", "Город I", "Город II", "Город III", "Бог / город", "Бог"][i]}</span></div>`).join("");
  return `<div class="tree" style="width:${W}px;height:${H}px">${ruler}<svg class="tree-svg" width="${W}" height="${H}">${lines}</svg>${nodes}</div>`;
}

function hiPath(id, on) {
  const path = new Set(on ? TREE.pathTo(id) : []);
  $$(".tnode").forEach((el) => el.classList.toggle("hp", path.has(el.dataset.node)));
  $$(".edge").forEach((el) => el.classList.toggle("hp", path.has(el.dataset.a) && path.has(el.dataset.b)));
  $(".tree")?.classList.toggle("hovering", on);
}

function enableDragScroll(el) {
  let down = false, sx = 0, sy = 0, sl = 0, st = 0, moved = false;
  el.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sy = e.clientY; sl = el.scrollLeft; st = el.scrollTop; });
  window.addEventListener("pointermove", (e) => {
    if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 6) { moved = true; el.classList.add("dragging"); }
    el.scrollLeft = sl - dx; el.scrollTop = st - dy;
  });
  window.addEventListener("pointerup", () => { down = false; setTimeout(() => el.classList.remove("dragging"), 0); });
}

function routePanel() {
  const goal = load("goal");
  if (!goal || !TREE.nodes[goal]) return `<div class="card route empty pop">${ic("route")}<div><b>Мой путь</b><p class="muted">Выбери бога в дереве и нажми «Сделать целью» — здесь появится маршрут, и ты сможешь отмечать собранные сеты.</p></div></div>`;
  const g = TREE.nodes[goal]; const done = loadJson("done", {});
  const steps = [];
  TREE.pathTo(goal).forEach((id) => {
    const n = TREE.nodes[id];
    if (n.type === "trunk" || n.type === "hub") n.sets.forEach((s) => steps.push({ k: `${id}:${s}`, t: s.startsWith("Броня") ? s : s + " броня", where: n.name, tier: n.tier }));
    else if (n.type === "city") { const s = n.sets[g.side === "weak" ? 0 : 1]; steps.push({ k: `${id}`, t: s || "сет скоро", where: n.name, tier: n.tier, soon: !s }); }
    else steps.push({ k: id, t: `Сет бога ${n.name}`, where: "Вершина пути", tier: n.tier, god: true });
  });
  const got = steps.filter((s) => done[s.k]).length; const pct = Math.round((got / steps.length) * 100);
  return `<div class="card route pop">
    <div class="route-h">${godEmblem(goal, "sm")}<div><small class="muted">Моя цель</small><h3>${esc(g.name)}</h3></div>
      <div class="ring" style="--p:${pct}"><span>${pct}%</span></div></div>
    <div class="bar thin"><i style="width:${pct}%"></i></div>
    <ol class="steps-list">${steps.map((s) => `<li class="${done[s.k] ? "done" : ""} ${s.god ? "god" : ""}"><label><input type="checkbox" data-step="${esc(s.k)}" ${done[s.k] ? "checked" : ""}><span class="cb"></span><span class="st-t">${esc(s.t)}<small>${esc(s.where)} · ступень ${s.tier}</small></span></label></li>`).join("")}</ol>
    <div class="route-f"><span class="muted tiny">Сохраняется в этом браузере</span><button class="btn ghost sm" id="resetGoal">Сбросить</button></div>
  </div>`;
}

/* =====================  Страницы  ===================== */
const pages = {
  async home() {
    const firstGods = ["zeus", "hades", "odin", "sekhmet", "poseidon", "anubis", "thor", "hephaestus"];
    view.innerHTML = `
    <section class="hero">
      <div class="hero-bg" style="background-image:url(media/hero.jpg)"></div>
      <div class="clouds"><i></i><i></i><i></i><i></i></div>
      <div class="hero-coins">${["goldcoin", "starcoin", "gravicoin", "stardrop", "goldcoin", "starcoin"].map((n, i) => tx(n, "fc fc" + i)).join("")}</div>
      <div class="wrap hero-in">
        <div>
          <span class="badge-ver"><span class="live"></span>MINECRAFT JAVA ${esc(SITE.version)}</span>
          <h1 class="hero-h1"><span class="st hero-hi">Добро пожаловать на</span>${tx("logo_big", "hero-logo wobble", "Brawl Legends")}</h1>
          <p class="lead">Сервер в стиле Brawl Stars: проходи города Бравл Тауна, собирай броню по ступеням, выбирай ветку и дойди до своего бога. А между походами — режимы Brawl, рыбалка, кейсы и подарки каждый день.</p>
          <div class="hero-btns">
            <a class="btn big shine" href="${SITE.launcher}">${ic("download")}Скачать лаунчер</a>
            <a class="btn big blue" href="#/tree">${ic("tree")}Дерево веток</a>
          </div>
          <div class="hero-mini"><span>${ic("check")}Свой лаунчер с модами на FPS</span><span>${ic("check")}Только лицензия</span><span>${ic("check")}Бесплатно</span></div>
        </div>
        <div id="ipBox">${ipCard(null)}</div>
      </div>
      <div class="zig"></div>
    </section>

    <section class="statsbar"><div class="wrap statsbar-in">
      <div>${tx("g_pin", "sb-ic")}<b data-count="${cityCount}">0</b><span>городов</span></div>
      <div>${tx("g_armor", "sb-ic")}<b data-count="${setCount}">0</b><span>сетов брони</span></div>
      <div>${tx("titul", "sb-ic")}<b data-count="${godIds.length}">0</b><span>богов</span></div>
      <div>${tx("g_gear", "sb-ic")}<b data-count="10">0</b><span>ступеней</span></div>
      <div>${tx("trophy", "sb-ic")}<b data-count="${BL.modes.length}">0</b><span>режимов Brawl</span></div>
    </div></section>

    <div class="ticker"><div class="ticker-in" id="ticker"></div></div>

    <section class="section"><div class="wrap">
      ${sectionHead("Что тебя ждёт", "Всё, что уже работает на сервере")}
      <div class="grid g3">${[
        { title: "Дерево веток", color: "#2f8bff", icon: "tree", tx: "g_armor", href: "#/tree", text: `${cityCount} городов: ствол из 4 ступеней, 4 хаба и 8 веток, каждая делится на два пути.` },
        { title: "16 богов", color: "#ffc93c", icon: "crown", tx: "titul", href: "#/gods", text: "Олимп, Египет, Асгард и Подземное царство. Защита до 40 и ульта на Shift + ПКМ." },
        { title: "Режимы Brawl Stars", color: "#ff4d5e", icon: "swords", tx: "g_modes", href: "#/modes", text: "Захват кристаллов, Нокаут, Ограбление и ещё 3 режима с трофеями." },
        { title: "Эффекты веток", color: "#a259ff", icon: "bolt", tx: "s_hyper", href: "#/guide?effects", text: "Уровни I–IV: каждый город ветки усиливает её способность, бог даёт ульту." },
        { title: "Рыбалка", color: "#4cd964", icon: "fish", tx: "s_hook", href: "#/rewards?fish", text: "Шесть удочек бравлеров — от удочки Шелли до удочки акулы Леона." },
        { title: "Подарки и кейсы", color: "#ff5ec7", icon: "gift", tx: "s_stardrop", href: "#/rewards", text: "Подарок каждый день, ежедневный кейс, кейс с титулами и боевой пропуск." },
      ].map(featCard).join("")}</div>
    </div></section>

    <section class="section band"><div class="wrap">
      ${sectionHead("Путь бравлера", "От песков Бравл Тауна до своего бога", `<a class="btn sm blue" href="#/tree">Открыть дерево ${ic("arrow")}</a>`)}
      <div class="journey">
        ${BL.trunk.map((t, i) => `<button class="jstep pop" data-node="t${t.tier}" style="--c:${t.color};--d:${i * 60}ms"><span class="jn">${t.tier}</span><span class="jimg" style="background-image:url(media/${t.img}_thumb.jpg)"></span><b>${esc(t.name)}</b><small>${prot(t.prot)}</small></button><span class="jarr">${ic("arrow")}</span>`).join("")}
        <div class="jhubs pop">${BL.hubs.map((h) => `<button data-node="${h.id}" style="--c:${h.color}"><span class="jimg" style="background-image:url(media/${h.img}_thumb.jpg)"></span>${esc(h.name)}</button>`).join("")}</div>
        <span class="jarr">${ic("arrow")}</span>
        <a class="jgods pop" href="#/gods">${godIds.slice(0, 16).map((g) => godEmblem(g, "xs")).join("")}<b>16 богов</b></a>
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      ${sectionHead("Боги", "Вершины веток. Жёлтый путь — бог послабее, красный — сильнейший", `<a class="btn sm blue" href="#/gods">Все боги ${ic("arrow")}</a>`)}
      <div class="godstrip">${firstGods.map((g, i) => godCard(g, i)).join("")}</div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap two-col">
      <div>
        ${sectionHead("Подарки дня", "Команда <kbd>/подарки</kbd> — раз в день, 7 дней по кругу")}
        <div class="gift-row">${BL.gifts.map((g, i) => giftCard(g, i, true)).join("")}</div>
      </div>
      <div>
        ${sectionHead("Режимы", "")}
        <div class="mode-mini">${BL.modes.map((m) => `<a href="#/modes" style="--c:${m.color}"><span class="mi">${ic(m.icon)}</span>${esc(m.name)}</a>`).join("")}</div>
      </div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      ${sectionHead("Новости", "", `<a class="btn sm blue" href="#/news">Все новости ${ic("arrow")}</a>`)}
      <div class="grid g3" id="homeNews">${skeleton(3)}</div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      <div class="cta card">
        <div class="cta-art">${tx("trophy")}</div>
        <div><h2 class="st">Готов к бою?</h2><p>Скачай лаунчер — он сам поставит Minecraft ${esc(SITE.version)}, моды на FPS и ресурспак, а потом зайдёт на сервер в одну кнопку.</p></div>
        <div class="cta-b"><a class="btn big shine" href="${SITE.launcher}">${ic("download")}Скачать</a><a class="btn blue" href="#/guide">${ic("book")}Гайд новичка</a></div>
      </div>
    </div></section>`;
    countUp(view);
    const news = await newsList();
    const hn = $("#homeNews"); if (hn) hn.innerHTML = news.length ? news.slice(0, 3).map(newsCard).join("") : `<div class="card empty-st">${ic("info")}Новостей пока нет.</div>`;
    const tk = $("#ticker");
    if (tk) { const items = (news.length ? news : [{ tag: "update", title: "Добро пожаловать на Brawl Legends" }]).map((n) => `<span><i class="tag ${esc(n.tag)}">${esc(tagName[n.tag] || "")}</i>${esc(n.title)}</span>`).join(""); tk.innerHTML = items + items + items; }
    const list = await servers();
    const box = $("#ipBox"); if (box) box.innerHTML = ipCard(list[0] || { status: { online: false } });
  },

  tree() {
    const q = location.hash.split("?")[1];
    view.innerHTML = `${pageHero("Ступени 1–10", "Дерево веток", `Ствол из четырёх городов → один из 4 хабов → ветка → жёлтый или красный путь → бог. Наведи на узел — подсветится путь, нажми — откроются детали.`, "tree", "#2f8bff")}
    <section class="section"><div class="wrap-wide">
      <div class="tree-tools">
        <div class="seg" id="hubFilter"><button class="on" data-h="">Все</button>${BL.hubs.map((h) => `<button data-h="${h.id}" style="--c:${h.color}"><i></i>${esc(h.name)}</button>`).join("")}</div>
        <div class="legend"><span><i class="lgl y"></i>путь к слабому богу</span><span><i class="lgl r"></i>путь к сильнейшему</span><span class="muted">${ic("arrow")} тяни мышкой, чтобы листать</span></div>
      </div>
      <div class="tree-layout">
        <div class="card tree-card"><div class="tree-scroll" id="treeScroll">${treeHtml()}</div><div class="fade-r"></div></div>
        <aside id="routeBox">${routePanel()}</aside>
      </div>
    </div></section>
    <section class="section" style="padding-top:0"><div class="wrap">
      ${sectionHead("Как растёт броня", "Цифры, которые важно знать")}
      <div class="grid g4">
        <div class="card fact pop"><b class="big-n">${ic("shield")}2 → 40</b><p>Защита от первого сета Бравл Тауна до бога. С 6-й ступени растёт быстрее.</p></div>
        <div class="card fact pop"><b class="big-n">2+</b><p>На каждой ступени минимум два сета брони и два меча. У бога — один сет и один меч.</p></div>
        <div class="card fact pop"><b class="big-n">I → IV</b><p>Эффект ветки: города дают I, II, III, сет бога — IV и ульту.</p></div>
        <div class="card fact pop"><b class="big-n">35 / 40</b><p>Защита богов: жёлтый путь — 35, красный — 40. Красный путь на ступень длиннее.</p></div>
      </div>
      ${protChart()}
    </div></section>`;
    const sc = $("#treeScroll"); enableDragScroll(sc);
    $$(".tnode").forEach((el) => { el.addEventListener("mouseenter", () => hiPath(el.dataset.node, true)); el.addEventListener("mouseleave", () => hiPath(null, false)); });
    $("#hubFilter").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("#hubFilter button").forEach((x) => x.classList.toggle("on", x === b));
      const h = b.dataset.h; $(".tree").classList.toggle("filtered", !!h);
      $$(".tnode,.edge").forEach((el) => el.classList.toggle("dim", !!h && el.dataset.hub !== h && !(el.classList.contains("tn-trunk") || el.dataset.a?.startsWith("t") && el.dataset.b?.startsWith("t"))));
      if (h) { const n = $(`.tnode[data-node="${h}"]`); sc.scrollTo({ top: n.offsetTop - 120, left: n.offsetLeft - 200, behavior: "smooth" }); }
    });
    bindRoute();
    const goal = load("goal");
    if (goal) { const path = new Set(TREE.pathTo(goal)); $$(".tnode").forEach((el) => el.classList.toggle("goal", path.has(el.dataset.node))); $$(".edge").forEach((el) => el.classList.toggle("goal", path.has(el.dataset.a) && path.has(el.dataset.b))); }
    if (q && TREE.nodes[q]) setTimeout(() => { openDrawer(q); const n = $(`.tnode[data-node="${q}"]`); n && sc.scrollTo({ left: n.offsetLeft - 300, top: n.offsetTop - 150, behavior: "smooth" }); }, 50);
    // стартовая прокрутка к центру по вертикали
    else sc.scrollTop = (sc.scrollHeight - sc.clientHeight) / 2;
  },

  gods() {
    view.innerHTML = `${pageHero("Вершины веток", "Боги", "Шестнадцать богов из четырёх пантеонов. В каждой паре один бог сильнее: у жёлтого пути Защита 35, у красного — 40.", "crown", "#ffc93c")}
    <section class="section"><div class="wrap">
      <div class="tree-tools"><div class="seg" id="panF"><button class="on" data-p="">Все</button>${Object.entries(BL.pantheons).map(([k, p]) => `<button data-p="${k}" style="--c:${p.color}"><i></i>${esc(p.name)}</button>`).join("")}</div>
      <div class="seg" id="sideF"><button class="on" data-s="">Оба пути</button><button data-s="weak" style="--c:#ffc93c"><i></i>Жёлтый</button><button data-s="strong" style="--c:#ff4d5e"><i></i>Красный</button></div></div>
      <div class="godgrid" id="godGrid">${godIds.map((g, i) => godCard(g, i)).join("")}</div>
      ${sectionHead("Пары богов", "Кто сильнее в каждой ветке")}
      <div class="pairs">${BL.hubs.flatMap((h) => h.branches.map((b) => `<div class="card pair pop"><div class="pair-h" style="--c:${h.color}">${esc(h.name)} · ${esc(b.name)}</div><div class="pair-b"><button data-node="${b.weak}">${godEmblem(b.weak, "sm")}<span>${esc(BL.gods[b.weak].name)}<small>Защита 35</small></span></button><b class="lt">&lt;</b><button data-node="${b.strong}">${godEmblem(b.strong, "sm")}<span>${esc(BL.gods[b.strong].name)}<small>Защита 40</small></span></button></div></div>`)).join("")}</div>
    </div></section>`;
    const apply = () => {
      const p = $("#panF .on").dataset.p, s = $("#sideF .on").dataset.s;
      $$("#godGrid .gcard").forEach((c) => (c.hidden = (p && c.dataset.pan !== p) || (s && c.dataset.side !== s)));
    };
    ["#panF", "#sideF"].forEach((sel) => $(sel).addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$(sel + " button").forEach((x) => x.classList.toggle("on", x === b)); apply(); }));
  },

  cities() {
    const cityTile = (c, hub, lvl, bid, i) => `<button class="card ctile pop lift" data-node="${bid}${i}" style="--c:${hub.color}"><span class="ct-pic${c.img ? "" : " drawn"}" style="background-image:${cityBg(c, hub.color, true)}"></span>
      <span class="ct-top"><span class="ct-lvl">${roman(lvl)}</span><span class="tier-pill">ступень ${5 + lvl}</span></span>
      <b>${esc(c.name)}</b><small>${esc(c.text)}</small>
      <span class="ct-sets"><i class="y">${setName(c.sets[0])}</i><i class="r">${setName(c.sets[1])}</i></span></button>`;
    view.innerHTML = `${pageHero(`${cityCount} городов`, "Города", "Каждый город — свой стиль, свои дома и свой способ фарма. Здесь все города по порядку прохождения.", "map", "#4cd964")}
    <section class="section"><div class="wrap">
      ${sectionHead("Ствол", "Ступени 1–4 проходят все")}
      <div class="grid g4">${BL.trunk.map((c, i) => `<button class="card city pop lift" data-node="t${c.tier}" style="--d:${i * 50}ms"><div class="pic" style="background-image:url(media/${c.img}_thumb.jpg)"><span class="tier">Ступень ${c.tier}</span><span class="pic-prot">${prot(c.prot)}</span></div><div class="body"><h3>${esc(c.name)}</h3><p>${esc(c.text)}</p><div class="chips">${c.sets.map((s) => `<span class="chip b">${esc(s)}</span>`).join("")}</div></div></button>`).join("")}</div>
      ${BL.hubs.map((h) => `
      <div class="hub-block" style="--c:${h.color}">
        <button class="hub-banner" data-node="${h.id}" style="background-image:url(media/${h.img}.jpg)"><span class="hb-in"><span class="tier">Ступень 5 · хаб</span><b class="st">${esc(h.name)}</b><small>${esc(h.text)}</small><span class="chips">${h.sets.map((s) => `<span class="chip b">${esc(s)}</span>`).join("")}<span class="chip">${ic("shield")} ${esc(h.prot)}</span></span></span></button>
        ${h.branches.map((b) => `<div class="branch-row"><div class="br-name">${esc(b.name)}</div><div class="br-cities">${b.cities.map((c, i) => cityTile(c, h, i + 1, b.id, i)).join(`<span class="br-arr">${ic("arrow")}</span>`)}<span class="br-arr">${ic("arrow")}</span><div class="br-gods"><button data-node="${b.weak}" class="y">${godEmblem(b.weak, "xs")}${esc(BL.gods[b.weak].name)}</button><button data-node="${b.strong}" class="r">${godEmblem(b.strong, "xs")}${esc(BL.gods[b.strong].name)}</button></div></div></div>`).join("")}
      </div>`).join("")}
    </div></section>`;
  },

  guide() {
    const q = location.hash.split("?")[1];
    const ch = [
      ["start", "Первый вход", "download"], ["armor", "Ступени и броня", "shield"], ["branch", "Хаб и ветка", "tree"],
      ["effects", "Эффекты и ульты", "bolt"], ["money", "Валюты", "coin"], ["map", "Карта и GPS", "map"],
      ["modes", "Режимы Brawl", "swords"], ["fish", "Рыбалка", "fish"], ["gifts", "Подарки и кейсы", "gift"], ["rules", "АФК и правила", "warn"],
    ];
    view.innerHTML = `${pageHero("Для новичков и не только", "Гайд по серверу", "Всё по шагам: от первого входа до сета бога. Главы можно читать по порядку или прыгать по оглавлению.", "book", "#a259ff")}
    <section class="section"><div class="wrap guide">
      <aside class="toc"><div class="card toc-card"><div class="toc-h">Оглавление</div><ol>${ch.map(([id, t, icn], i) => `<li><a href="#/guide?${id}" data-toc="${id}"><span class="tn">${i + 1}</span>${tx({ start: "g_basics", armor: "g_armor", branch: "titul", effects: "s_hyper", money: "g_money", map: "g_pin", modes: "g_modes", fish: "s_hook", gifts: "s_stardrop", rules: "clock" }[id], "toc-tx")}${t}</a></li>`).join("")}</ol><div class="toc-prog"><i id="tocProg"></i></div></div></aside>
      <article class="gdoc">
        <section class="gch card" id="g-start"><div class="gch-h"><span class="gn">1</span>${tx("g_basics", "gch-tx")}<h2>Первый вход</h2></div>
          <ol class="gsteps">
            <li><b>Скачай лаунчер.</b> Он сам поставит Minecraft ${esc(SITE.version)} с Fabric и модами на FPS, заранее скачает ресурспак. <a href="${SITE.launcher}">Скачать</a></li>
            <li><b>Создай аккаунт</b> на сайте или прямо в лаунчере, затем один раз привяжи лицензию через Microsoft.</li>
            <li><b>Нажми «Играть».</b> На сервере придумай пароль: <kbd class="cmd">/reg пароль пароль</kbd>, в следующий раз — <kbd class="cmd">/login пароль</kbd>.</li>
            <li><b>Разреши ресурспак.</b> Без него не будет моделей брони, иконок и интерфейса.</li>
          </ol>
          <div class="callout advice">${ic("sparkle")}<span><b>Совет.</b> Первым делом забери подарок дня — <kbd class="cmd">/подарки</kbd>. В первый день это 10 000 голдкоинов.</span></div>
        </section>

        <section class="gch card" id="g-armor"><div class="gch-h"><span class="gn">2</span>${tx("g_armor", "gch-tx")}<h2>Ступени и броня</h2></div>
          <p>Броня идёт по ступеням: на каждой ступени минимум два сета брони и два меча. Меч сета бьёт свою же броню максимум на одно сердце — так бои равных игроков остаются честными.</p>
          <div class="read-item">
            ${mcTooltip()}
            <ul class="anno">
              <li><span class="an">1</span>Имя с градиентом — цвет города</li>
              <li><span class="an">2</span>Тип: сет и часть брони</li>
              <li><span class="an">3</span>Звёзды редкости (⯪ — половина звезды)</li>
              <li><span class="an">4</span>Эффект брони (у первых ступеней — нет)</li>
              <li><span class="an">5</span>Защита — уровень зачарования</li>
              <li><span class="an">6</span>Цитата о городе</li>
              <li><span class="an">7</span>Куда идти дальше</li>
            </ul>
          </div>
          <div class="ttable"><div class="tt-h"><span>Ступень</span><span>Город</span><span>Сеты</span><span>Защита</span><span>Редкость</span></div>
            ${BL.trunk.map((t) => `<div><span class="tierbox">${t.tier}</span><span>${esc(t.name)}</span><span>${t.sets.map(esc).join(", ")}</span><span>${prot(t.prot)}</span><span>${stars(t.stars)}</span></div>`).join("")}
            <div><span class="tierbox">5</span><span>Хабы</span><span>Метеор, Лиановая, Водяная, Снежная → вторые сеты</span><span>${prot("9–10")}</span><span>${stars("★★")}</span></div>
            <div><span class="tierbox">6–8</span><span>Города веток</span><span>Два сета в каждом городе</span><span>${prot("растёт")}</span><span>${stars("★★★")} <small class="muted">с 6-й</small></span></div>
            <div><span class="tierbox g">8–10</span><span>Боги</span><span>Один сет и один меч</span><span>${prot("35 / 40")}</span><span>${stars("♛")}</span></div>
          </div>
        </section>

        <section class="gch card" id="g-branch"><div class="gch-h"><span class="gn">3</span>${tx("titul", "gch-tx")}<h2>Хаб и ветка</h2></div>
          <p>После брони <b>Гром</b> (Лайттаун) выбираешь один из четырёх хабов. В каждом хабе две ветки, в каждом городе ветки — два сета:</p>
          <div class="ysplit"><div class="ys y"><b>Левый сет → жёлтый путь</b><span>Ведёт к богу послабее. Путь короче на одну ступень, Защита бога 35.</span></div><div class="ys r"><b>Правый сет → красный путь</b><span>Ведёт к сильнейшему богу пары. На ступень длиннее, Защита 40.</span></div></div>
          <p class="muted">Части брони разных веток можно смешивать: у каждой ветки своя способность, а полный сет одной брони даёт бонус.</p>
          <a class="btn blue sm" href="#/tree">${ic("tree")}Открыть дерево</a>
        </section>

        <section class="gch card" id="g-effects"><div class="gch-h"><span class="gn">4</span>${tx("s_hyper", "gch-tx")}<h2>Эффекты и ульты</h2></div>
          <div class="lvls">${[["I", "1-й город ветки"], ["II", "2-й город"], ["III", "3-й город"], ["IV", "Сет бога + ульта"]].map(([l, t], i) => `<div class="lv" style="--k:${i}"><b>${l}</b><span>${t}</span></div>`).join("")}</div>
          <p>Эффекты работают просто от ношения брони — никаких кланов. Статус ветки показывается в HUD рядом с хотбаром. Эндгейм-эффекты сильнее, у каждой ветки свои, с заметными частицами. PvP честное: никаких призванных мобов и помощников.</p>
          <div class="keyrow"><span class="keys"><kbd>Shift</kbd>+${kbdHtml("ПКМ")}</span><span>мечом бога — ульта</span></div>
          <div class="keyrow"><span class="keys">${kbdHtml("ПКМ")}</span><span>Молния Зевса и Сюрикен Цирка — метательные</span></div>
        </section>

        <section class="gch card" id="g-money"><div class="gch-h"><span class="gn">5</span>${tx("g_money", "gch-tx")}<h2>Валюты</h2></div>
          <div class="grid g3">${BL.economy.map((e) => `<div class="cur" style="--c:${e.color}"><span class="coin-tx">${tx({ gold: "goldcoin", gravi: "gravicoin", star: "starcoin" }[e.id])}</span><b>${esc(e.name)}</b><small>${esc(e.text)}</small></div>`).join("")}</div>
          <div class="conv card inset"><b>Обменник</b>
            <label><input id="cvG" type="number" min="0" value="1"><span>гравикойнов</span></label><span class="eq">=</span><label><input id="cvC" type="number" min="0" value="8"><span>голдкоинов</span></label></div>
        </section>

        <section class="gch card" id="g-map"><div class="gch-h"><span class="gn">6</span>${tx("g_pin", "gch-tx")}<h2>Карта и GPS</h2></div>
          <p>Мини-карта — справа сверху, север всегда вверху, крутится только стрелка игрока. Под ней — координаты, название места и GPS-панель. Меню мест «Куда пойдём?» — <kbd class="cmd">/gps</kbd>.</p>
          <div class="keys-grid">${BL.keys.filter((k) => /Карта|карту/.test(k.d)).map((k) => `<div class="keyrow"><span class="keys">${k.k.map(kbdHtml).join("+")}</span><span>${esc(k.d.replace("Карта: ", ""))}</span></div>`).join("")}</div>
        </section>

        <section class="gch card" id="g-modes"><div class="gch-h"><span class="gn">7</span>${tx("g_modes", "gch-tx")}<h2>Режимы Brawl</h2></div>
          <p>Шесть режимов прямо на сервере: заходи через меню режимов, зарабатывай трофеи.</p>
          <div class="mode-mini">${BL.modes.map((m) => `<a href="#/modes" style="--c:${m.color}"><span class="mi">${ic(m.icon)}</span>${esc(m.name)}</a>`).join("")}</div>
          <div class="callout warn">${ic("warn")}<span>Вышел посреди матча — бан на режимы на <b>15 минут</b>.</span></div>
        </section>

        <section class="gch card" id="g-fish"><div class="gch-h"><span class="gn">8</span>${tx("s_hook", "gch-tx")}<h2>Рыбалка</h2></div>
          <p>Ловишь ${kbdHtml("ЛКМ")}. Удочки покупаются по очереди — крафта нет, ломаться они не будут.</p>
          ${rodsHtml()}
        </section>

        <section class="gch card" id="g-gifts"><div class="gch-h"><span class="gn">9</span>${tx("s_stardrop", "gch-tx")}<h2>Подарки и кейсы</h2></div>
          <p><kbd class="cmd">/подарки</kbd> — один подарок в день. Пропуск не сбрасывает серию, после 7-го дня всё по кругу.</p>
          <div class="gift-row">${BL.gifts.map((g, i) => giftCard(g, i, true)).join("")}</div>
          <a class="btn blue sm" href="#/rewards">${ic("gift")}Все награды</a>
        </section>

        <section class="gch card" id="g-rules"><div class="gch-h"><span class="gn">10</span>${tx("clock", "gch-tx")}<h2>АФК и правила</h2></div>
          <div class="afk"><div class="afk-bar"><i></i></div><div class="afk-l"><span>0 мин</span><span>1 мин — появился счётчик</span><span>10 мин — кик</span></div></div>
          <p>Любое движение, поворот головы, сообщение в чат или клик сбрасывают таймер.</p>
        </section>
      </article>
    </div></section>`;
    // обменник
    const g = $("#cvG"), c = $("#cvC");
    g.oninput = () => (c.value = Math.max(0, +g.value || 0) * 8);
    c.oninput = () => (g.value = +(Math.max(0, +c.value || 0) / 8).toFixed(2));
    // оглавление: прокрутка и подсветка
    $$("[data-toc]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); $("#g-" + a.dataset.toc).scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", a.getAttribute("href")); }));
    const secs = $$(".gch");
    const spy = () => {
      let cur = secs[0].id; secs.forEach((s) => { if (s.getBoundingClientRect().top < 160) cur = s.id; });
      $$("[data-toc]").forEach((a) => a.classList.toggle("on", "g-" + a.dataset.toc === cur));
      const i = secs.findIndex((s) => s.id === cur); const p = $("#tocProg"); if (p) p.style.height = `${((i + 1) / secs.length) * 100}%`;
    };
    pages._spy = spy; spy();
    if (q && $("#g-" + q)) setTimeout(() => $("#g-" + q).scrollIntoView({ block: "start" }), 30);
  },

  modes() {
    view.innerHTML = `${pageHero("Мини-игры", "Режимы Brawl", "Режимы Brawl Stars прямо на сервере: заходи через меню режимов и зарабатывай трофеи.", "swords", "#ff4d5e")}
    <section class="section"><div class="wrap">
      <div class="callout warn">${ic("warn")}<span>Вышел посреди матча — бан на режимы на <b>15 минут</b>. Доиграй, даже если проигрываешь.</span></div>
      <div class="grid g3 modes">${BL.modes.map((m, i) => `<div class="card mode pop lift" style="--c:${m.color};--d:${i * 50}ms">
        <div class="mode-top"><span class="mi">${ic(m.icon)}</span><span class="mode-pl">${ic("user")}${esc(m.players)}</span></div>
        <h3>${esc(m.name)}</h3><div class="en">${esc(m.en)}</div><p>${esc(m.text)}</p>
        <div class="mode-tip">${ic("sparkle")}<span>${esc(m.tip)}</span></div></div>`).join("")}</div>
      <div class="card trophy pop"><span class="tr-ic tx-ic">${tx("trophy")}</span><div><b>Трофеи</b><p class="muted">За победы в режимах начисляются трофеи. Чем их больше — тем выше ты в таблице режимов.</p></div></div>
    </div></section>`;
  },

  ranks() {
    const all = BL.ranks;
    const rows = [];
    all.forEach((r, i) => r.perks.forEach(([c, d]) => rows.push({ c, d, from: i })));
    const cell = (v) => (v ? `<b>${v}</b>` : `<span class="no">—</span>`);
    view.innerHTML = `${pageHero("Донат", "Привилегии", "Восемь привилегий — как в меню /donate на сервере. Каждая следующая включает всё из предыдущих. Донат-валюта сервера — старкоины.", "star", "#ff5ec7")}
    <section class="section"><div class="wrap">
      <div class="rank-ladder">${all.map((r, i) => `<div class="card rank pop lift rk-${r.id} ${r.top ? "top" : ""}" style="--rc:${r.color};--d:${i * 40}ms">
        <div class="stripe"></div><div class="rk-lv">${i + 1}</div>${r.top ? `<div class="rk-crown">${ic("crown")}</div>` : ""}
        <div class="rk-top">${tx("tag_" + r.id, "rk-tagbig", r.name)}<span class="sr">${esc(r.name)}</span></div>
        <div class="rk-price"><b>${r.price}</b>₽</div>
        
        <div class="rk-store"><span data-tip="Строк в рюкзаке /backpack">${ic("case")}${r.backpack}</span>${r.ender ? `<span data-tip="Рядов в эндер-сундуке /ec">${ic("safe")}${r.ender}</span>` : ""}<span data-tip="Новых команд">${ic("bolt")}${r.perks.length}</span></div>
        <ul>${r.perks.map(([c, d]) => `<li><code>${esc(c)}</code><span>${esc(d)}</span></li>`).join("")}${i ? `<li class="inh">+ всё из «${esc(all[i - 1].name)}»</li>` : ""}</ul>
        <button class="btn wide buy-btn ${r.top ? "red" : ""}" data-buy="${r.id}">${tx("starcoin", "btn-tx")}Купить за ${r.price}₽</button></div>`).join("")}</div>


      <div class="card pay-info pop">${tx("s_shop", "pi-tx")}<div><b>Как купить</b><p class="muted">Нажми «Купить», впиши ник на сервере и выбери способ оплаты — российские карты и СБП, зарубежные карты, PayPal. После оплаты привилегия выдаётся автоматически, даже если ты не в игре.</p></div></div>
      <p class="muted tiny" style="margin-top:12px">Список взят из меню <b>/donate</b> и прав групп на сервере. Если что-то не совпадает с игрой — верно то, что в игре.</p>
    </div></section>`;
  },

  rewards() {
    const q = location.hash.split("?")[1];
    view.innerHTML = `${pageHero("Каждый день", "Награды", "Подарки дня, кейсы, боевой пропуск и рыбалка — всё, что даёт ресурсы помимо фарма в городах.", "gift", "#ff5ec7")}
    <section class="section"><div class="wrap">
      ${sectionHead("Подарки дня", "<kbd class='cmd'>/подарки</kbd> · <kbd class='cmd'>/gifts</kbd> · <kbd class='cmd'>/daily</kbd>")}
      <div class="card gift-board pop"><div class="gift-row big">${BL.gifts.map((g, i) => giftCard(g, i)).join("")}</div>
        <div class="gift-rules"><span>${ic("check")}Один подарок в календарный день</span><span>${ic("check")}Пропуск не сжигает серию</span><span>${ic("check")}После 7-го дня — по кругу</span></div></div>
      ${sectionHead("Кейсы", "")}
      <div class="grid g3">
        <div class="card case pop lift" style="--c:#2f8bff"><span class="case-ic tx-ic">${tx("g_mystery")}</span><h3>Ежедневный кейс</h3><p class="muted">Ключ — в подарке 3-го дня.</p></div>
        <div class="card case pop lift" style="--c:#ffc93c"><span class="case-ic tx-ic">${tx("titul")}</span><h3>Кейс с титулами</h3><p class="muted">Ключ — в подарке 7-го дня. Титулы показываются рядом с ником.</p></div>
        <div class="card case pop lift" style="--c:#ff5ec7"><span class="case-ic tx-ic">${tx("trophy")}</span><h3>Боевой пропуск</h3><p class="muted">Задания и награды по уровням сезона.</p></div>
      </div>
      <div id="fish">${sectionHead("Рыбалка", "Удочки бравлеров — покупаются по очереди, без крафта")}</div>
      <div class="card pop">${rodsHtml()}<p class="muted tiny" style="margin:12px 0 0">Ловля — ${kbdHtml("ЛКМ")}. Удочки неразрушаемые, на них ванильные чары.</p></div>
    </div></section>`;
    if (q === "fish") setTimeout(() => $("#fish").scrollIntoView({ block: "start" }), 30);
  },

  commands() {
    const cats = { "": "Все", base: "Основные", nav: "Навигация", eco: "Награды", rank: "Привилегии" };
    view.innerHTML = `${pageHero("Шпаргалка", "Команды и управление", "Нажми на команду — она скопируется. Нажми / — чтобы искать.", "info", "#2f8bff")}
    <section class="section"><div class="wrap">
      <div class="cmd-tools"><label class="search">${ic("search")}<input id="cq" placeholder="Найти команду…" autocomplete="off"><kbd>/</kbd></label>
        <div class="seg" id="cc">${Object.entries(cats).map(([k, v], i) => `<button class="${i ? "" : "on"}" data-c="${k}">${v}</button>`).join("")}</div></div>
      <div class="cmd-list" id="cl">${[...BL.commands, ...BL.ranks.flatMap((r) => r.perks.map(([c, d]) => ({ c, d, cat: "rank", rank: r.name })))].map((c) => `<button class="card cmdrow" data-cat="${c.cat}" data-copy="${esc(c.c.split(" ")[0])}"><code>${esc(c.c)}</code><span>${esc(c.d)}${c.alt ? `<small>также: ${esc(c.alt)}</small>` : ""}</span>${c.rank ? `<span class="rk-mini" style="--rc:${BL.ranks.find((r) => r.name === c.rank).color};background:${BL.ranks.find((r) => r.name === c.rank).color}">${esc(c.rank)}+</span>` : "<span></span>"}<span class="cp">${ic("copy")}</span></button>`).join("")}
        <div class="card empty-st" id="cEmpty" hidden>${ic("search")}Ничего не нашлось</div></div>
      ${sectionHead("Управление", "")}
      <div class="grid g2 keys-grid">${BL.keys.map((k) => `<div class="card keyrow">${`<span class="keys">${k.k.map(kbdHtml).join("+")}</span>`}<span>${esc(k.d)}</span></div>`).join("")}</div>
    </div></section>`;
    const apply = () => {
      const q = $("#cq").value.trim().toLowerCase(), cat = $("#cc .on").dataset.c; let n = 0;
      $$(".cmdrow").forEach((r) => { const ok = (!cat || r.dataset.cat === cat) && (!q || r.textContent.toLowerCase().includes(q)); r.hidden = !ok; n += ok; });
      $("#cEmpty").hidden = !!n;
    };
    $("#cq").oninput = apply;
    $("#cc").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; $$("#cc button").forEach((x) => x.classList.toggle("on", x === b)); apply(); };
    $$(".cmdrow").forEach((r) => (r.onclick = () => { copyText(r.dataset.copy, "Скопировано: " + r.dataset.copy); r.classList.add("flash"); setTimeout(() => r.classList.remove("flash"), 500); }));
  },

  faq() {
    view.innerHTML = `${pageHero("Вопросы", "FAQ", "Частые вопросы игроков. Не нашёл ответ — спроси в игре у стаффа.", "info", "#4cd964")}
    <section class="section"><div class="wrap narrow">
      <div class="acc">${BL.faq.map((f, i) => `<details class="card acc-i pop" style="--d:${i * 30}ms" ${i ? "" : "open"}><summary><span class="qn">${i + 1}</span>${esc(f.q)}<span class="pm"></span></summary><p>${esc(f.a)}</p></details>`).join("")}</div>
    </div></section>`;
  },

  async news() {
    view.innerHTML = `${pageHero("Что нового", "Новости", "Обновления сервера, события и исправления.", "sparkle", "#ffc93c")}
    <section class="section"><div class="wrap narrow"><div class="timeline" id="nl">${skeleton(3)}</div></div></section>`;
    const list = await newsList();
    $("#nl").innerHTML = list.length ? list.map((n, i) => `<div class="tl-i"><span class="tl-dot ${esc(n.tag)}"></span>${newsCard(n, i)}</div>`).join("") : `<div class="card empty-st">${ic("info")}Новостей пока нет.</div>`;
  },

  start() { location.replace("#/guide?start"); },

  register() {
    if (me) return go("#/cabinet");
    view.innerHTML = `<section class="auth"><form class="card auth-card pop" id="f" novalidate>
      <img class="auth-logo" src="logo.png" alt="">
      <h1>Регистрация</h1><p class="muted" style="margin:0">Аккаунт для сайта и лаунчера.</p>
      <div class="field"><label for="login">Логин</label><input id="login" autocomplete="username" maxlength="16" required><span class="hint">3–16 символов: латиница, цифры, _</span></div>
      <div class="field"><label for="email">Почта</label><input id="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="pw">Пароль</label><div class="pw-wrap"><input id="pw" type="password" autocomplete="new-password" required><button type="button" class="eye" data-eye="pw" aria-label="Показать пароль">👁</button></div><div class="pw-meter"><i id="meter"></i></div><span class="hint" id="pwHint">Минимум 8 символов</span></div>
      <div class="field"><label for="pw2">Повтори пароль</label><input id="pw2" type="password" autocomplete="new-password" required></div>
      <label class="check"><input type="checkbox" id="agree"><span class="cb"></span><span>Я понимаю, что для лаунчера нужна лицензия Minecraft: Java Edition, и согласен с правилами сервера.</span></label>
      <div class="form-error" id="err" hidden></div>
      <button class="btn wide" style="margin-top:18px" id="sub">Создать аккаунт</button>
      <div class="form-foot">Уже есть аккаунт? <a href="#/login">Войти</a></div>
    </form></section>`;
    const pw = $("#pw");
    pw.addEventListener("input", () => {
      const v = pw.value; let score = 0;
      if (v.length >= 8) score++; if (v.length >= 12) score++; if (/[A-ZА-Я]/.test(v) && /[a-zа-я]/.test(v)) score++; if (/\d/.test(v)) score++; if (/[^\w]/.test(v)) score++;
      const colors = ["#ff4d5e", "#ff4d5e", "#ffc93c", "#ffc93c", "#4cd964", "#4cd964"];
      $("#meter").style.width = `${(score / 5) * 100}%`; $("#meter").style.background = colors[score];
      $("#pwHint").textContent = ["Минимум 8 символов", "Слабый", "Средний", "Хороший", "Надёжный", "Отличный"][score];
    });
    $("#f").addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = $("#err"); err.hidden = true;
      const show = (m) => { err.textContent = m; err.hidden = false; $("#f").classList.remove("shake"); void $("#f").offsetWidth; $("#f").classList.add("shake"); };
      if ($("#pw").value !== $("#pw2").value) return show("Пароли не совпадают");
      if (!$("#agree").checked) return show("Подтверди согласие с правилами");
      $("#sub").disabled = true;
      try {
        const r = await api("/auth/register", { method: "POST", body: { login: $("#login").value, email: $("#email").value, password: $("#pw").value, client: "site" } });
        token = r.token; me = r.account; save("token", token); renderNav();
        toast("Аккаунт создан! Теперь скачай лаунчер.");
        go("#/cabinet");
      } catch (ex) { show(ex.message); } finally { $("#sub").disabled = false; }
    });
  },

  login() {
    if (me) return go("#/cabinet");
    view.innerHTML = `<section class="auth"><form class="card auth-card pop" id="f" novalidate>
      <img class="auth-logo" src="logo.png" alt="">
      <h1>Вход</h1><p class="muted" style="margin:0">Логин или почта и пароль от аккаунта Brawl Legends.</p>
      <div class="field"><label for="login">Логин или почта</label><input id="login" autocomplete="username" required></div>
      <div class="field"><label for="pw">Пароль</label><div class="pw-wrap"><input id="pw" type="password" autocomplete="current-password" required><button type="button" class="eye" data-eye="pw" aria-label="Показать пароль">👁</button></div></div>
      <div class="form-error" id="err" hidden></div>
      <button class="btn wide" style="margin-top:18px" id="sub">Войти</button>
      <div class="form-foot">Нет аккаунта? <a href="#/register">Зарегистрироваться</a></div>
    </form></section>`;
    $("#f").addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = $("#err"); err.hidden = true; $("#sub").disabled = true;
      try {
        const r = await api("/auth/login", { method: "POST", body: { login: $("#login").value, password: $("#pw").value, client: "site" } });
        token = r.token; me = r.account; save("token", token); renderNav(); go("#/cabinet");
      } catch (ex) { err.textContent = ex.message; err.hidden = false; $("#f").classList.remove("shake"); void $("#f").offsetWidth; $("#f").classList.add("shake"); } finally { $("#sub").disabled = false; }
    });
  },

  async cabinet() {
    if (!token) return go("#/login");
    try { me = await api("/me"); } catch { return go("#/login"); }
    renderNav();
    const since = new Date(me.created_at * 1000).toLocaleDateString("ru-RU");
    const mc = me.minecraft;
    const goal = load("goal");
    view.innerHTML = `<section class="section"><div class="wrap"><div class="cab">
      <aside class="card profile pop">
        <div class="pf-bg"></div>
        <img class="skin" id="pfSkin" src="${mc ? `https://mc-heads.net/body/${mc.uuid}/120` : "logo.png"}" alt="">
        <h3 style="font-size:24px">${esc(me.login)}</h3>${roleBadge(me.role, "pf-role")}
        <span class="pf-badge ${mc ? "ok" : ""}">${mc ? ic("check") + "Лицензия привязана" : ic("warn") + "Без лицензии"}</span>
        <div class="kv">
          <div><span>Почта</span><b>${esc(me.email)}</b></div>
          <div><span>С нами с</span><b>${since}</b></div>
          <div><span>Minecraft</span><b>${mc ? esc(mc.name) : "не привязан"}</b></div>
        </div>
        ${isStaffAdmin() ? `<a class="btn wide admin-btn" style="margin-top:18px" href="#/admin">${ic("shield")}Админ-панель</a>` : ""}
        <a class="btn wide" style="margin-top:18px" href="${SITE.launcher}">${ic("download")}Скачать лаунчер</a>
        <button class="btn ghost wide" style="margin-top:10px" id="logout">Выйти</button>
      </aside>
      <div class="grid" style="align-content:start">
        ${mc
          ? `<div class="card notice ok pop">${ic("check")}<div>Minecraft <b>${esc(mc.name)}</b> привязан — лицензия подтверждена. Входи в лаунчер и жми «Играть».</div></div>`
          : `<div class="card notice warn pop">${ic("warn")}<div>Minecraft ещё не привязан. Открой лаунчер, войди этим аккаунтом и нажми «Привязать Minecraft» — войди аккаунтом Microsoft с лицензией.</div></div>`}
        <div class="grid g2">
          <div class="card pop"><h3 class="ch">${ic("bolt")}Сервер</h3><div id="srv" class="muted">Проверяем…</div></div>
          <div class="card pop"><h3 class="ch">${ic("route")}Мой путь</h3>${goal && BL.gods[goal] ? `<div class="mini-goal">${godEmblem(goal, "sm")}<div><b>${esc(BL.gods[goal].name)}</b><div class="muted tiny">${TREE.pathTo(goal).length} ступеней маршрута</div></div><a class="btn sm blue" href="#/tree">Открыть</a></div>` : `<p class="muted" style="margin:0">Цель не выбрана. <a href="#/tree">Выбрать бога</a></p>`}</div>
        </div>
        ${skinCardHtml()}
        <div class="card pop"><h3 class="ch">${tx("s_shop", "ch-tx")}Мои покупки</h3><div id="myOrders" class="orders"><div class="sk"><i></i><i></i></div></div></div>
        <form class="card pop" id="pwf" novalidate>
          <h3 class="ch">${ic("shield")}Сменить пароль</h3>
          <div class="grid g2"><div class="field"><label for="old">Текущий пароль</label><input id="old" type="password" autocomplete="current-password"></div>
          <div class="field"><label for="npw">Новый пароль</label><input id="npw" type="password" autocomplete="new-password"></div></div>
          <div class="form-error" id="perr" hidden></div>
          <button class="btn blue" style="margin-top:14px" id="psub">Сохранить</button>
          <div class="hint" style="margin-top:8px">После смены пароля другие устройства и лаунчер выйдут из аккаунта.</div>
        </form>
      </div>
    </div></div></section>`;
    $("#logout").onclick = async () => { try { await api("/auth/logout", { method: "POST" }); } catch {} token = null; me = null; save("token", null); renderNav(); go("#/"); };
    $("#pwf").addEventListener("submit", async (e) => {
      e.preventDefault(); const err = $("#perr"); err.hidden = true; $("#psub").disabled = true;
      try {
        const r = await api("/auth/password", { method: "POST", body: { old_password: $("#old").value, new_password: $("#npw").value } });
        token = r.token; save("token", token); toast("Пароль изменён"); $("#old").value = $("#npw").value = "";
      } catch (ex) { err.textContent = ex.message; err.hidden = false; } finally { $("#psub").disabled = false; }
    });
    bindSkin();
    api("/me/orders").then((l) => { const b = $("#myOrders"); if (b) b.innerHTML = l.length ? l.map((p) => orderCard(p)).join("") : `<p class="muted" style="margin:0">Покупок пока нет. <a href="#/ranks">Привилегии</a></p>`; }).catch(() => { const b = $("#myOrders"); if (b) b.innerHTML = `<p class="muted" style="margin:0">Покупки появятся здесь.</p>`; });
    const list = await servers(); const s = list[0];
    $("#srv").innerHTML = s ? `<b>Brawl Legends</b> — ${s.status?.online ? `онлайн ${s.status.players ?? 0} / ${s.status.max ?? "?"}, ${esc(mcStrip(s.status.version || ""))}` : "сейчас выключен"}<br>Адрес: <b>${esc(SITE.ip)}</b>` : "Нет данных";
  },

  async admin() {
    if (!token) return go("#/login");
    try { me = await api("/me"); } catch { return go("#/login"); }
    renderNav();
    if (!isStaffAdmin()) {
      view.innerHTML = `<section class="section"><div class="wrap narrow"><div class="card empty-st">${ic("shield")}Админка доступна только команде проекта.</div></div></section>`;
      return;
    }
    view.innerHTML = `${pageHero(ROLES[me.role], "Админка", "Управление сайтом и лаунчером: новости, команда проекта и аккаунты игроков.", "shield", me.role === "owner" ? "#ff5d73" : "#ffc93c")}
    <section class="section"><div class="wrap" id="adm">${skeleton(3)}</div></section>`;
    let D;
    try { D = await api("/admin/overview"); } catch (ex) { $("#adm").innerHTML = `<div class="card empty-st">${ic("warn")}${esc(ex.message)}</div>`; return; }
    const owner = D.my_role === "owner";
    let news = (D.news || []).map((n) => ({ date: n.date || "", tag: n.tag || "update", title: n.title || "", text: n.text || "" }));
    const date = (t) => new Date(t * 1000).toLocaleDateString("ru-RU");
    const staffHtml = (list) => list.map((x) => `<div class="adm-staff-row"><b>${esc(x.nick)}</b>${roleBadge(x.role)}${owner && x.role !== "owner" ? `<button class="btn ghost sm" data-unrole="${esc(x.nick)}">Снять</button>` : ""}</div>`).join("") || `<p class="muted">Пока никого.</p>`;
    const newsHtml = () => news.map((n, i) => `<div class="adm-news" data-i="${i}">
        <div class="adm-news-top"><input class="an-title" placeholder="Заголовок" value="${esc(n.title)}" maxlength="120">
          <select class="an-tag">${[["update", "Обновление"], ["event", "Событие"], ["fix", "Исправление"]].map(([v, t]) => `<option value="${v}"${n.tag === v ? " selected" : ""}>${t}</option>`).join("")}</select>
          <input class="an-date" placeholder="Дата (15 ноября)" value="${esc(n.date)}" maxlength="40"></div>
        <textarea class="an-text" rows="3" placeholder="Текст новости" maxlength="2000">${esc(n.text)}</textarea>
        <div class="adm-news-act"><button class="btn ghost sm" data-up="${i}" ${i === 0 ? "disabled" : ""}>↑</button><button class="btn ghost sm" data-down="${i}" ${i === news.length - 1 ? "disabled" : ""}>↓</button><button class="btn ghost sm danger" data-del="${i}">Удалить</button></div>
      </div>`).join("") || `<p class="muted">Новостей нет — добавь первую.</p>`;
    $("#adm").innerHTML = `
      <div class="grid g3 adm-stats">
        <div class="card pop"><b class="big">${D.stats.accounts}</b><span class="muted">аккаунтов</span></div>
        <div class="card pop"><b class="big">${D.stats.linked}</b><span class="muted">с лицензией</span></div>
        <div class="card pop"><b class="big">${D.staff.length}</b><span class="muted">в команде</span></div>
      </div>
      <div class="grid g2" style="margin-top:16px;align-items:start">
        <div class="card pop"><h3 class="ch">${ic("sparkle")}Новости <small class="muted">сайт + лаунчер</small></h3>
          <div id="anList">${newsHtml()}</div>
          <div class="adm-row"><button class="btn ghost" id="anAdd">${ic("sparkle")}Добавить новость</button><button class="btn blue" id="anSave">Сохранить новости</button></div>
          <div class="form-error" id="anErr" hidden></div>
        </div>
        <div class="grid" style="align-content:start">
          <div class="card pop"><h3 class="ch">${ic("shield")}Команда проекта</h3>
            <div id="stList">${staffHtml(D.staff)}</div>
            ${owner ? `<form class="adm-row" id="stForm"><input id="stNick" placeholder="Ник игрока" maxlength="32"><select id="stRole"><option value="admin">Админ</option><option value="moder">Модератор</option><option value="owner">Создатель</option></select><button class="btn blue sm">Назначить</button></form><div class="form-error" id="stErr" hidden></div>`
              : `<p class="hint">Роли назначает только Создатель.</p>`}
          </div>
          <div class="card pop"><h3 class="ch">${ic("user")}Аккаунты <small class="muted">${D.accounts.length}</small></h3>
            <input id="accQ" placeholder="Поиск по нику" style="width:100%;margin-bottom:10px">
            <div class="adm-acc" id="accList"></div>
          </div>
        </div>
      </div>`;
    const accRows = (q) => D.accounts.filter((a) => !q || [a.login, a.game_name, a.minecraft].some((x) => x && x.toLowerCase().includes(q))).map((a) =>
      `<div class="adm-acc-row"><div><b>${esc(a.login)}</b> ${roleBadge(a.role)}<div class="muted tiny">игровой ник: ${esc(a.game_name || "—")} · лицензия: ${esc(a.minecraft || "нет")}</div></div><span class="muted tiny">${date(a.created_at)}</span></div>`).join("") || `<p class="muted">Не найдено.</p>`;
    $("#accList").innerHTML = accRows("");
    $("#accQ").oninput = (e) => { $("#accList").innerHTML = accRows(e.target.value.trim().toLowerCase()); };
    const readNews = () => { $$("#anList .adm-news").forEach((el) => { const n = news[+el.dataset.i]; n.title = el.querySelector(".an-title").value; n.tag = el.querySelector(".an-tag").value; n.date = el.querySelector(".an-date").value; n.text = el.querySelector(".an-text").value; }); };
    const redraw = () => { $("#anList").innerHTML = newsHtml(); };
    $("#anAdd").onclick = () => { readNews(); news.unshift({ date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long" }), tag: "update", title: "", text: "" }); redraw(); $("#anList .an-title")?.focus(); };
    $("#anList").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return; readNews();
      if (b.dataset.del != null) news.splice(+b.dataset.del, 1);
      else if (b.dataset.up != null) { const i = +b.dataset.up; [news[i - 1], news[i]] = [news[i], news[i - 1]]; }
      else if (b.dataset.down != null) { const i = +b.dataset.down; [news[i + 1], news[i]] = [news[i], news[i + 1]]; }
      redraw();
    });
    $("#anSave").onclick = async () => {
      readNews(); const err = $("#anErr"); err.hidden = true; $("#anSave").disabled = true;
      try { const v = await api("/admin/news", { method: "PUT", body: news }); news = v; redraw(); toast("Новости сохранены — уже на сайте и в лаунчере"); }
      catch (ex) { err.textContent = ex.message; err.hidden = false; } finally { $("#anSave").disabled = false; }
    };
    const setRole = async (nick, role) => {
      const err = $("#stErr"); if (err) err.hidden = true;
      try { const list = await api("/admin/role", { method: "POST", body: { nick, role } }); $("#stList").innerHTML = staffHtml(list); toast(role ? `${nick}: ${ROLES[role]}` : `Роль снята: ${nick}`); }
      catch (ex) { if (err) { err.textContent = ex.message; err.hidden = false; } else toast(ex.message, "warn"); }
    };
    $("#stList").addEventListener("click", (e) => { const b = e.target.closest("[data-unrole]"); if (b) setRole(b.dataset.unrole, ""); });
    $("#stForm")?.addEventListener("submit", (e) => { e.preventDefault(); const n = $("#stNick").value.trim(); if (n) { setRole(n, $("#stRole").value); $("#stNick").value = ""; } });
  },

  notfound() {
    view.innerHTML = `<section class="auth"><div class="card nf pop">${tx("g_mystery", "nf-tx")}<div class="nf-n st">404</div><h2>Такой страницы нет</h2><p class="muted">Похоже, этот город ещё не построили.</p><a class="btn" href="#/">На главную</a></div></section>`;
  },
};


/* =====================  Скин в личном кабинете  ===================== */
let skinView = null;
const SKIN = { file: null, url: null, model: "classic", saved: null };

function loadScript(src) {
  return new Promise((ok, bad) => { if ([...document.scripts].some((s) => s.src === src)) return ok(); const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = bad; document.head.appendChild(s); });
}

function skinCardHtml() {
  return `<div class="card skin-card pop" id="skinCard">
    <div class="sk-head"><h3 class="ch">${ic("user")}Мой скин</h3><span class="sk-state" id="skState">Загружаем…</span></div>
    <div class="sk-body">
      <div class="sk-stage">
        <canvas id="skCanvas" width="260" height="320" aria-label="3D-превью скина"></canvas>
        <div class="sk-flat" id="skFlat" hidden></div>
        <div class="sk-ctrl">
          <button type="button" data-anim="walk" class="on" data-tip="Ходьба">${ic("route")}</button>
          <button type="button" data-anim="idle" data-tip="Стоять">${ic("user")}</button>
          <button type="button" data-anim="spin" data-tip="Вращать">${ic("sparkle")}</button>
        </div>
        <span class="sk-hint">тяни мышкой, чтобы повернуть</span>
      </div>
      <div class="sk-side">
        <label class="drop" id="skDrop">
          <input type="file" id="skFile" accept="image/png">
          <span class="drop-ic">${ic("download")}</span>
          <b>Перетащи PNG сюда</b><small>или нажми, чтобы выбрать файл · 64×64 или 64×32</small>
        </label>
        <div class="field"><label>Модель рук</label>
          <div class="seg light" id="skModel"><button type="button" data-m="classic" class="on">Classic · Стив</button><button type="button" data-m="slim">Slim · Алекс</button></div>
          <span class="hint" id="skAuto"></span></div>
        <div class="sk-faces" id="skFaces"></div>
        <div class="form-error" id="skErr" hidden></div>
        <div class="sk-btns">
          <button type="button" class="btn green" id="skSave" disabled>${ic("check")}Сохранить скин</button>
          <a class="btn blue sm" id="skDl" hidden download>${ic("download")}Скачать</a>
          <button type="button" class="btn ghost sm" id="skDel" hidden>Удалить</button>
        </div>
        <div class="sk-game" id="skGame" hidden>
          <div class="dl-h">Поставить в игре</div>
          <button type="button" class="cmdcopy" id="skCmd"><code></code>${ic("copy")}</button>
          <p class="hint">Команда SkinsRestorer. Работает, когда сайт доступен из интернета (на brawllegends.com) — с localhost сервер скин не скачает.</p>
        </div>
      </div>
    </div>
  </div>`;
}

function skinErr(m) { const e = $("#skErr"); if (!e) return; e.textContent = m || ""; e.hidden = !m; }

// Определение slim: у Алекс рука 3px, пиксель (54,20) прозрачный
function detectSlim(img) {
  if (img.height !== 64) return false;
  const c = document.createElement("canvas"); c.width = 64; c.height = 64; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
  return x.getImageData(54, 20, 1, 1).data[3] === 0 && x.getImageData(55, 31, 1, 1).data[3] === 0;
}

// Лица: голова и шлем крупно (пиксельно)
function drawFace(img, size = 64) {
  const c = document.createElement("canvas"); c.width = c.height = size; const x = c.getContext("2d"); x.imageSmoothingEnabled = false;
  x.drawImage(img, 8, 8, 8, 8, 0, 0, size, size); x.drawImage(img, 40, 8, 8, 8, 0, 0, size, size);
  return c.toDataURL();
}

// Плоское превью (если 3D недоступно): перед и спина
function flatPreview(img) {
  const c = document.createElement("canvas"); const k = 6; c.width = 16 * k * 2 + 20; c.height = 32 * k; const x = c.getContext("2d"); x.imageSmoothingEnabled = false;
  const slim = SKIN.model === "slim"; const aw = slim ? 3 : 4; const old = img.height === 32;
  const part = (sx, sy, w, h, dx, dy, flip) => { x.save(); if (flip) { x.translate(dx + w * k, dy); x.scale(-1, 1); x.drawImage(img, sx, sy, w, h, 0, 0, w * k, h * k); } else x.drawImage(img, sx, sy, w, h, dx, dy, w * k, h * k); x.restore(); };
  const fig = (ox, back) => {
    const o = back ? 1 : 0;
    part(back ? 24 : 8, 8, 8, 8, ox + 4 * k, 0); part(back ? 56 : 40, 8, 8, 8, ox + 4 * k, 0);
    part(back ? 32 : 20, 20, 8, 12, ox + 4 * k, 8 * k);
    part(back ? 52 : 44, 20, aw, 12, ox + (4 - aw) * k, 8 * k);
    if (old) part(back ? 52 : 44, 20, aw, 12, ox + 12 * k, 8 * k, true); else part(back ? 44 : 36, 52, aw, 12, ox + 12 * k, 8 * k);
    part(back ? 12 : 4, 20, 4, 12, ox + 4 * k, 20 * k);
    if (old) part(back ? 12 : 4, 20, 4, 12, ox + 8 * k, 20 * k, true); else part(back ? 28 : 20, 52, 4, 12, ox + 8 * k, 20 * k);
    return o;
  };
  fig(0, false); fig(16 * k + 20, true);
  return c.toDataURL();
}

async function show3d(url) {
  const cv = $("#skCanvas"); if (!cv) return;
  try {
    await loadScript("https://cdn.jsdelivr.net/npm/skinview3d@3.1.0/bundles/skinview3d.bundle.js");
    if (!skinView) {
      skinView = new skinview3d.SkinViewer({ canvas: cv, width: 260, height: 320 });
      skinView.zoom = 0.85; skinView.fov = 40;
      skinView.animation = new skinview3d.WalkingAnimation(); skinView.animation.speed = 0.7;
      skinView.controls.enableZoom = false;
    }
    if (url) await skinView.loadSkin(url, { model: SKIN.model === "slim" ? "slim" : "default" }); else skinView.loadSkin(null);
    cv.hidden = false; $("#skFlat").hidden = true; $(".sk-ctrl").hidden = false; $(".sk-hint").hidden = false;
  } catch {
    // нет интернета для 3D-библиотеки — показываем плоское превью
    cv.hidden = true; $(".sk-ctrl").hidden = true; $(".sk-hint").hidden = true;
    const fl = $("#skFlat"); fl.hidden = false;
    if (url) { const img = new Image(); img.onload = () => (fl.innerHTML = `<img src="${flatPreview(img)}" alt="Скин спереди и сзади">`); img.src = url; }
    else fl.innerHTML = `<div class="sk-empty">${ic("user")}<span>Скин не загружен</span></div>`;
  }
}

function setModelUi(m) { SKIN.model = m; $$("#skModel button").forEach((b) => b.classList.toggle("on", b.dataset.m === m)); }

function renderFaces(img) {
  $("#skFaces").innerHTML = `<img src="${drawFace(img, 56)}" alt="" data-tip="Голова со шлемом"><span><b>${img.width}×${img.height}</b><small>${img.height === 32 ? "старый формат" : "новый формат"} · ${SKIN.model === "slim" ? "Slim" : "Classic"}</small></span>`;
}

function skinState(t, cls = "") { const e = $("#skState"); if (e) { e.textContent = t; e.className = "sk-state " + cls; } }

async function bindSkin() {
  const card = $("#skinCard"); if (!card) return;
  // текущий скин с сервера
  try {
    const info = await api("/me/skin"); SKIN.saved = info;
    if (info.has) {
      setModelUi(info.model); SKIN.url = info.url + "?t=" + info.updated;
      skinState("Загружен " + new Date(info.updated * 1000).toLocaleDateString("ru-RU"), "ok");
      const img = new Image(); img.onload = () => { renderFaces(img); const pf = $("#pfSkin"); if (pf && !me.minecraft) { pf.src = drawFace(img, 120); pf.classList.add("face"); } }; img.src = SKIN.url;
      $("#skDl").hidden = false; $("#skDl").href = info.url; $("#skDl").setAttribute("download", me.login + ".png"); $("#skDel").hidden = false;
      showGameCmd(info);
    } else skinState("Не загружен");
  } catch (e) { skinState("Ошибка: " + e.message, "bad"); }
  show3d(SKIN.url);

  const pick = async (file) => {
    skinErr("");
    if (!file) return;
    if (!/png$/i.test(file.type) && !/\.png$/i.test(file.name)) return skinErr("Нужен PNG-файл скина");
    if (file.size > 64 * 1024) return skinErr("Файл больше 64 КБ — это точно скин?");
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.width !== 64 || (img.height !== 64 && img.height !== 32)) { skinErr(`Скин должен быть 64×64 или 64×32, а этот ${img.width}×${img.height}`); return; }
      SKIN.file = file; SKIN.url = url;
      const slim = detectSlim(img); setModelUi(slim ? "slim" : "classic");
      $("#skAuto").textContent = slim ? "Похоже на тонкие руки — выбрали Slim" : "Обычные руки — выбрали Classic";
      renderFaces(img); show3d(url);
      $("#skSave").disabled = false; skinState("Не сохранён", "warn");
      card.classList.add("dirty");
    };
    img.onerror = () => skinErr("Не получилось открыть картинку");
    img.src = url;
  };
  $("#skFile").onchange = (e) => pick(e.target.files[0]);
  const drop = $("#skDrop");
  ["dragenter", "dragover"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
  drop.addEventListener("drop", (e) => pick(e.dataTransfer.files[0]));

  $("#skModel").onclick = async (e) => {
    const b = e.target.closest("button"); if (!b) return; setModelUi(b.dataset.m); show3d(SKIN.url);
    const img = new Image(); img.onload = () => renderFaces(img); if (SKIN.url) img.src = SKIN.url;
    if (!SKIN.file && SKIN.saved?.has) { try { SKIN.saved = await fetch(`${API}/api/me/skin/model?model=${SKIN.model}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()); showGameCmd(SKIN.saved); toast("Модель рук сохранена"); } catch {} }
  };

  $(".sk-ctrl").onclick = (e) => {
    const b = e.target.closest("button"); if (!b || !skinView) return;
    $$(".sk-ctrl button").forEach((x) => x.classList.toggle("on", x === b));
    const a = b.dataset.anim;
    skinView.autoRotate = a === "spin"; skinView.autoRotateSpeed = 2;
    skinView.animation = a === "walk" ? Object.assign(new skinview3d.WalkingAnimation(), { speed: 0.7 }) : a === "idle" ? new skinview3d.IdleAnimation() : null;
  };

  $("#skSave").onclick = async () => {
    if (!SKIN.file) return; skinErr(""); $("#skSave").disabled = true; $("#skSave").classList.add("busy");
    try {
      const r = await fetch(`${API}/api/me/skin?model=${SKIN.model}`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "image/png" }, body: SKIN.file });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Ошибка " + r.status);
      SKIN.saved = data; SKIN.file = null; card.classList.remove("dirty");
      skinState("Сохранён только что", "ok"); toast("Скин сохранён!", "check"); burst(innerWidth / 2, innerHeight / 2);
      $("#skDl").hidden = false; $("#skDl").href = data.url; $("#skDel").hidden = false; showGameCmd(data);
      const img = new Image(); img.onload = () => { const pf = $("#pfSkin"); if (pf && !me.minecraft) { pf.src = drawFace(img, 120); pf.classList.add("face"); } }; img.src = data.url + "?t=" + Date.now();
    } catch (e) { skinErr(e.message); $("#skSave").disabled = false; }
    finally { $("#skSave").classList.remove("busy"); }
  };

  $("#skDel").onclick = async () => {
    if (!confirmInline($("#skDel"))) return;
    try { await api("/me/skin", { method: "DELETE" }); } catch (e) { return skinErr(e.message); }
    SKIN.saved = null; SKIN.url = null; SKIN.file = null; $("#skFaces").innerHTML = ""; $("#skDl").hidden = $("#skDel").hidden = true; $("#skGame").hidden = true;
    skinState("Не загружен"); show3d(null); toast("Скин удалён", "info");
  };
}

// Удаление в два нажатия, без всплывающих окон браузера
function confirmInline(btn) {
  if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = "Удалить"; return true; }
  btn.dataset.armed = "1"; btn.textContent = "Точно удалить?"; setTimeout(() => { if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = "Удалить"; } }, 3000);
  return false;
}

function showGameCmd(info) {
  const box = $("#skGame"); if (!box || !info?.has) return;
  const full = location.origin + info.url;
  const cmd = `/skin url ${full} ${info.model === "slim" ? "slim" : "classic"}`;
  box.hidden = false; $("#skCmd code").textContent = cmd; $("#skCmd").onclick = () => copyText(cmd, "Команда скопирована");
}


/* =====================  Покупка донатов  ===================== */
let shopCache = null;
async function shopInfo() { if (!shopCache) { try { shopCache = await api("/shop"); } catch { shopCache = { products: [], providers: [], external: [], delivery_ready: false, offline: true }; } } return shopCache; }

const PROV_TX = { yookassa: "goldcoin", freekassa: "gravicoin", stripe: "starcoin", paypal: "stardrop" };
async function openBuy(rankId) {
  const r = BL.ranks.find((x) => x.id === rankId); if (!r) return;
  const info = await shopInfo(); const prod = info.products.find((p) => p.id === rankId);
  const nick = (me && (me.game_name || me.minecraft?.name)) || load("buyNick") || "";
  const ru = info.providers.filter((p) => p.region === "ru"), intl = info.providers.filter((p) => p.region === "intl");
  const price = (p) => (p.currency === "EUR" ? (prod?.price_eur ? `${prod.price_eur.toFixed(2)} €` : "—") : `${prod?.price_rub ?? r.price} ₽`);
  const provBtn = (p) => `<button type="button" class="pay-opt" data-prov="${p.id}" ${p.currency === "EUR" && !prod?.price_eur ? "disabled" : ""}>${tx(PROV_TX[p.id] || "goldcoin", "po-tx")}<span><b>${esc(p.name)}</b><small>${esc(p.methods)}</small></span><em>${price(p)}</em></button>`;
  const ext = (info.external || []).map((e) => `<a class="pay-opt ext" href="${esc(e.url)}" target="_blank" rel="noopener">${tx("s_shop", "po-tx")}<span><b>${esc(e.name)}</b><small>${esc(e.note)}</small></span><em>${ic("arrow")}</em></a>`).join("");
  const none = !info.providers.length && !ext;
  const d = $("#drawer");
  d.innerHTML = `<div class="dr-top"><div class="crumbs"><span>Привилегии</span><span>›</span><span>Покупка</span></div><button class="x" data-close aria-label="Закрыть">${ic("close")}</button></div>
    <div class="buy-head rk-${r.id}" style="--rc:${r.color}">${tx("tag_" + r.id, "buy-tag", r.name)}<div class="buy-price"><b>${prod?.price_rub ?? r.price}</b> ₽${prod?.price_eur ? `<small>или ${prod.price_eur.toFixed(2)} €</small>` : ""}</div></div>
    <ul class="buy-perks">${r.perks.slice(0, 4).map(([c, dd]) => `<li><code>${esc(c)}</code> ${esc(dd)}</li>`).join("")}${r.perks.length > 4 ? `<li class="muted">и ещё ${r.perks.length - 4}…</li>` : ""}</ul>
    <form id="buyForm" novalidate>
      <div class="field"><label for="buyNick">Ник на сервере</label><input id="buyNick" value="${esc(nick)}" maxlength="16" autocomplete="off" placeholder="например _Dov1s_" required><span class="hint">Привилегия выдаётся на этот ник. Можно купить в подарок другу.</span></div>
      ${none ? `<div class="callout warn">${ic("warn")}<span>${info.offline ? "Магазин сейчас недоступен — хаб не отвечает." : "Оплата скоро подключится. Пока купить можно в игре через <b>/donate</b>."}</span></div>` : ""}
      ${ru.length ? `<div class="dl-h">🇷🇺 Россия и СНГ</div><div class="pay-list">${ru.map(provBtn).join("")}</div>` : ""}
      ${intl.length ? `<div class="dl-h">🌍 Другие страны</div><div class="pay-list">${intl.map(provBtn).join("")}</div>` : ""}
      ${ext ? `<div class="dl-h">Донат-магазины</div><div class="pay-list">${ext}</div>` : ""}
      <div class="form-error" id="buyErr" hidden></div>
      <label class="check"><input type="checkbox" id="buyAgree"><span class="cb"></span><span>Я понимаю, что покупаю игровую привилегию для ника выше и что выдача автоматическая.</span></label>
    </form>
    ${info.delivery_ready === false && !none ? `<p class="hint" style="margin-top:12px">Выдача после оплаты — в течение нескольких минут.</p>` : ""}`;
  document.body.classList.add("drawer-open"); d.scrollTop = 0;
  $$("#buyForm .pay-opt[data-prov]").forEach((b) => b.addEventListener("click", async () => {
    const err = $("#buyErr"); err.hidden = true;
    const n = $("#buyNick").value.trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(n)) { err.textContent = "Ник: 3–16 символов — латиница, цифры и _"; err.hidden = false; $("#buyNick").focus(); return; }
    if (!$("#buyAgree").checked) { err.textContent = "Поставь галочку подтверждения"; err.hidden = false; return; }
    save("buyNick", n); b.classList.add("busy");
    try { const res = await api("/shop/buy", { method: "POST", body: { product: rankId, nick: n, provider: b.dataset.prov } }); save("lastOrder", res.order); location.href = res.url; }
    catch (e) { err.textContent = e.message; err.hidden = false; b.classList.remove("busy"); }
  }));
}
document.addEventListener("click", (e) => { const b = e.target.closest("[data-buy]"); if (b) openBuy(b.dataset.buy); });

const ORDER_STATE = {
  created: ["Ждём оплату", "Если ты уже оплатил — подожди минуту, касса подтверждает платёж.", "clock", "wait"],
  paid: ["Оплачено — выдаём", "Платёж получен. Выдаём привилегию на сервере…", "goldcoin", "paid"],
  delivered: ["Готово!", "Привилегия выдана. Перезайди на сервер, если ты был онлайн.", "trophy", "ok"],
  canceled: ["Платёж отменён", "Деньги не списаны. Можно попробовать ещё раз.", "g_quests", "bad"],
};
function orderCard(p, big = false) {
  const st = ORDER_STATE[p.status] || ORDER_STATE.created; const r = BL.ranks.find((x) => x.id === p.product);
  return `<div class="order ${st[3]} ${big ? "big" : ""}">${tx(st[2], "or-tx")}<div class="or-main"><b>${esc(st[0])}</b>${big ? `<p>${esc(st[1])}</p>` : ""}
    <div class="or-meta">${r ? tx("tag_" + r.id, "or-tag", r.name) : esc(p.product)}<span>для <b>${esc(p.nick)}</b></span><span>${esc(p.amount)} ${p.currency === "RUB" ? "₽" : "€"}</span><span class="muted">${new Date(p.created_at * 1000).toLocaleString("ru-RU")}</span></div>
    ${p.error ? `<div class="or-err">${esc(p.error)}</div>` : ""}<div class="or-id">Заказ ${esc(p.id)}</div></div></div>`;
}

pages.pay = async function () {
  const id = new URLSearchParams(location.hash.split("?")[1] || "").get("order") || load("lastOrder");
  view.innerHTML = `${pageHero("Оплата", "Статус заказа", "Страница сама обновляется, пока платёж проходит.", "gift", "#4cd964")}
    <section class="section"><div class="wrap narrow"><div class="card pop" id="payBox">${id ? `<div class="sk"><i></i><i></i><i></i></div>` : `<p>Заказ не найден.</p>`}</div>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn blue" href="#/ranks">К привилегиям</a><a class="btn ghost" href="#/cabinet">Мои покупки</a></div></div></section>`;
  if (!id) return;
  let tries = 0;
  const tick = async () => {
    if (!location.hash.startsWith("#/pay")) return;
    try {
      const p = await api(`/shop/check/${encodeURIComponent(id)}`, { method: "POST" });
      $("#payBox").innerHTML = orderCard(p, true);
      if (p.status === "delivered") { burst(innerWidth / 2, 260); return; }
      if (p.status === "canceled") return;
    } catch (e) { $("#payBox").innerHTML = `<div class="callout warn">${ic("warn")}<span>${esc(e.message)}</span></div>`; }
    if (++tries < 60) setTimeout(tick, 4000);
  };
  tick();
};

/* =====================  Повторяющиеся карточки  ===================== */
/* ---------- MiniMessage → HTML (подсказки предметов как в игре) ---------- */
const MC_COLORS = { black: "#000000", dark_blue: "#0000AA", dark_green: "#00AA00", dark_aqua: "#00AAAA", dark_red: "#AA0000", dark_purple: "#AA00AA", gold: "#FFAA00", gray: "#AAAAAA", grey: "#AAAAAA", dark_gray: "#555555", dark_grey: "#555555", blue: "#5555FF", green: "#55FF55", aqua: "#55FFFF", red: "#FF5555", light_purple: "#FF55FF", yellow: "#FFFF55", white: "#FFFFFF" };
function mmHtml(src, base = { color: "#AA00AA", italic: true }) {
  const out = []; let color = base.color, italic = base.italic, bold = false; const stack = []; let grad = null;
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("");
  const emit = (text) => {
    if (!text) return;
    if (grad) { for (const ch of text) grad.buf.push({ ch, bold, italic }); return; }
    out.push(`<span style="color:${color};${bold ? "font-weight:700;" : ""}${italic ? "font-style:italic;" : ""}">${esc(text)}</span>`);
  };
  const re = /<([^<>]+)>/g; let last = 0, m;
  while ((m = re.exec(src))) {
    emit(src.slice(last, m.index)); last = re.lastIndex;
    const t = m[1].trim().toLowerCase();
    if (t === "!i" || t === "!italic") italic = false;
    else if (t === "i" || t === "italic" || t === "em") italic = true;
    else if (t === "/i" || t === "/italic") italic = base.italic && false;
    else if (t === "b" || t === "bold") bold = true;
    else if (t === "/b" || t === "/bold") bold = false;
    else if (t.startsWith("gradient")) { const cs = t.split(":").slice(1).filter((c) => c.startsWith("#")); grad = { cs: cs.length > 1 ? cs : [color, color], buf: [] }; }
    else if (t === "/gradient" && grad) {
      const g = grad; grad = null; const n = Math.max(1, g.buf.length - 1); const cs = g.cs.map(hex);
      g.buf.forEach((c, i) => { const p = (i / n) * (cs.length - 1); const k = Math.min(cs.length - 2, Math.floor(p)); const col = mix(cs[k], cs[k + 1], p - k);
        out.push(`<span style="color:${col};${c.bold ? "font-weight:700;" : ""}${c.italic ? "font-style:italic;" : ""}">${esc(c.ch)}</span>`); });
    }
    else if (/^#[0-9a-f]{6}$/.test(t)) { stack.push(color); color = t; }
    else if (MC_COLORS[t]) { stack.push(color); color = MC_COLORS[t]; }
    else if (t.startsWith("/") && (MC_COLORS[t.slice(1)] || /^\/#/.test(t))) color = stack.pop() || base.color;
    else if (t === "reset") { color = base.color; bold = false; italic = false; }
  }
  emit(src.slice(last));
  if (grad) { const g = grad; grad = null; g.buf.forEach((c) => out.push(`<span style="color:${g.cs[0]}">${esc(c.ch)}</span>`)); }
  return out.join("");
}
function mmPlain(src) { return String(src || "").replace(/<[^>]+>/g, ""); }

// Подсказка предмета в стиле Minecraft
function itemTooltip(item, note = "") {
  if (!item) return "";
  return `<div class="mct mct-item">
    <div class="mct-name">${mmHtml(item.dn, { color: "#FFFFFF", italic: true })}</div>
    ${(item.lore || []).map((l) => `<div class="l">${l ? mmHtml(l.replace(/[\uE000-\uF8FF]/g, "🛡")) : "&nbsp;"}</div>`).join("")}
    ${note ? `<div class="mct-note">${esc(note)}</div>` : ""}
  </div>`;
}
// Для богов без предметов в ресурспаке — подсказка из данных сайта
function godFallbackItem(id) {
  const g = BL.gods[id]; const n = TREE.nodes[id];
  return { dn: `<!i><b><white>Сет бога ${g.name}`, lore: [`<!i><#8C8C8C>Броня ${g.name} <#5A5A5A>• <#8C8C8C>сет`, `<!i><#FFC66B>✦ ${g.armor} IV`, `<!i><#9A9A9A>• меч: ${g.sword}`, `<!i><white>🛡 <#BDBDBD>Защита <#FFD08A><b>${n.prot}`, "", `<!i><#4A4A4A>────────────────────`, `<!i><#FFD36B>♛ Вершина пути — доспех бога`] };
}
function godItems(id) { const it = window.BL_GOD_ITEMS?.[id]; return it ? it : null; }

// Весь сет бога: 5 слотов (шлем, нагрудник, поножи, ботинки, оружие) + что делает каждая вещь
const GOD_SET_SLOTS = [["helmet", "Шлем", "shield"], ["chest", "Нагрудник", "shield"], ["legs", "Поножи", "shield"], ["boots", "Ботинки", "shield"], ["sword", "Оружие", "sword"]];
// Нарисованный пиксельный город — для городов, у которых ещё нет скриншота (не повторяем чужие фото)
function citySkyline(name, color) {
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) / 4294967296);
  const W = 64, H = 36; let r = "";
  for (let i = 0; i < 9; i++) r += `<rect x="${Math.floor(rnd() * W)}" y="${Math.floor(rnd() * 12)}" width="1" height="1" fill="#fff" opacity=".7"/>`;
  let x = 0;
  while (x < W) {
    const w = 4 + Math.floor(rnd() * 6), bh = 8 + Math.floor(rnd() * 16);
    r += `<rect x="${x}" y="${H - 4 - bh}" width="${w}" height="${bh}" fill="${color}" opacity="${(0.55 + rnd() * 0.35).toFixed(2)}"/>`;
    for (let wy = H - 2 - bh; wy < H - 6; wy += 3) for (let wx = x + 1; wx < x + w - 1; wx += 2) if (rnd() > 0.45) r += `<rect x="${wx}" y="${wy}" width="1" height="1" fill="#ffe9a8"/>`;
    x += w + (rnd() > 0.6 ? 1 : 0);
  }
  r += `<rect x="0" y="${H - 4}" width="${W}" height="4" fill="#1b1f3a"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141833"/><stop offset="1" stop-color="${color}" stop-opacity=".55"/></linearGradient></defs><rect width="${W}" height="${H}" fill="#141833"/><rect width="${W}" height="${H}" fill="url(#g)"/>${r}</svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27")}')`;
}
const cityBg = (c, color, thumb) => c.img ? `url(media/${c.img}${thumb ? "_thumb" : ""}.jpg)` : citySkyline(c.name, color);

function godSetHtml(id) {
  const it = godItems(id);
  if (!it) return `<div class="dl-h">Сет бога</div><div class="god-items">${itemTooltip(godFallbackItem(id), "по данным сайта")}</div>`;
  const parts = GOD_SET_SLOTS.filter(([k]) => it[k]);
  const slotIcon = (k, ico) => it[k].icon ? tx(it[k].icon, "gs-ic", mmPlain(it[k].dn)) : (k === "sword" ? tx("sword", "gs-ic gs-fb") : `<span class="gs-fb">${ic(ico)}</span>`);
  return `<div class="dl-h">Сет бога <small class="dl-sub">${parts.length} ${plural(parts.length, "вещь", "вещи", "вещей")} · нажми на слот</small></div>
    <div class="gset">
      <div class="gset-slots">${parts.map(([k, label, ico], i) => `<button class="gs-slot${i === 0 ? " on" : ""}" data-gs="${k}" data-tip="${esc(label)}: ${esc(mmPlain(it[k].dn))}">${slotIcon(k, ico)}</button>`).join("")}</div>
      <div class="gset-list">${parts.map(([k, label, ico]) => `<div class="gs-item" data-gsi="${k}"><div class="gs-h"><span class="gs-mini">${slotIcon(k, ico)}</span><b>${esc(label)}</b></div>${itemTooltip(it[k])}</div>`).join("")}</div>
    </div>`;
}
// Клик по слоту сета — подсветить и прокрутить к описанию этой вещи
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-gs]"); if (!b) return;
  const box = b.closest(".gset"); if (!box) return;
  box.querySelectorAll(".gs-slot").forEach((x) => x.classList.toggle("on", x === b));
  const item = box.querySelector(`[data-gsi="${b.dataset.gs}"]`);
  if (item) { const dr = item.closest(".drawer"), bar = box.querySelector(".gset-slots"); if (dr) dr.scrollTo({ top: dr.scrollTop + item.getBoundingClientRect().top - dr.getBoundingClientRect().top - (bar ? bar.offsetHeight : 0) - 12, behavior: "smooth" }); else item.scrollIntoView({ behavior: "smooth", block: "nearest" }); item.classList.remove("flash"); void item.offsetWidth; item.classList.add("flash"); }
});

function godSlot(id) {
  const it = godItems(id); const icon = it?.chest?.icon;
  return `<span class="mc-slot">${icon ? tx(icon, "mc-item") : godEmblem(id, "md", true)}</span>`;
}

function godCard(id, i = 0) {
  const g = BL.gods[id]; const n = TREE.nodes[id]; const P = BL.pantheons[g.pan]; const it = godItems(id);
  const gm = it?.chest?.dn.match(/<gradient:([^>]+)>/); const nameHtml = gm ? mmHtml(`<!i><gradient:${gm[1]}><b>${g.name}</b></gradient>`, { color: "#fff", italic: false }) : esc(g.name);
  return `<button class="mc-card gcard pop ${n.side}" data-node="${id}" data-tipgod="${id}" data-pan="${g.pan}" data-side="${n.side}" style="--pc:${P.color};--d:${i * 30}ms">
    <span class="mc-side ${n.side}">${n.side === "weak" ? "жёлтый путь" : "красный путь"}</span>
    ${godSlot(id)}
    <b class="mc-name">${nameHtml}</b>
    <span class="mc-pan">${ic(P.icon)}${esc(P.name)} · ст. ${n.tier}</span>
    <span class="mc-stats"><span class="mcs prot-mc">${ic("shield")}${n.prot}</span>${it?.sword ? `<span class="mcs dmg-mc">${tx("sword", "mcs-ic")}${esc((mmPlain(it.sword.lore.join(" ")).match(/Урон\s*([\d.]+)/) || ["", "?"])[1])}</span>` : ""}${it ? `<span class="mcs ok-mc" data-tip="Предметы уже есть на сервере">✔ в игре</span>` : `<span class="mcs wip-mc" data-tip="Предметов этого бога пока нет в ресурспаке">в работе</span>`}</span>
    <span class="mc-ab"><span><i style="color:#FF7A2E">✦</i> ${esc(g.armor)}</span><span><i style="color:#FFC66B">⚔</i> ${esc(it?.sword ? mmPlain(it.sword.dn) : g.weapon || g.sword)}</span></span>
  </button>`;
}

// Плавающая подсказка предмета при наведении на карточку бога
(() => {
  let box = null;
  document.addEventListener("mouseover", (e) => {
    const c = e.target.closest("[data-tipgod]");
    if (!c) { if (box) box.hidden = true; return; }
    if (!box) { box = document.createElement("div"); box.className = "mct-float"; document.body.appendChild(box); }
    const id = c.dataset.tipgod; const it = godItems(id);
    if (box.dataset.id !== id) { box.innerHTML = itemTooltip(it?.chest || godFallbackItem(id), it ? "" : "по данным сайта"); box.dataset.id = id; }
    box.hidden = false;
  });
  document.addEventListener("mousemove", (e) => {
    if (!box || box.hidden) return;
    const w = box.offsetWidth, h = box.offsetHeight; let x = e.clientX + 18, y = e.clientY - 12;
    if (x + w > innerWidth - 8) x = e.clientX - w - 18; if (y + h > innerHeight - 8) y = innerHeight - h - 8;
    box.style.transform = `translate(${x}px, ${Math.max(8, y)}px)`;
  });
  window.addEventListener("scroll", () => box && (box.hidden = true), { passive: true });
})();

function giftCard(g, i, mini = false) {
  return `<div class="gift ${g.big ? "big" : ""} ${mini ? "mini" : ""} pop" style="--d:${i * 40}ms"><span class="gd">День ${g.day}</span><span class="gi gi-${g.icon}">${{ coin: tx("goldcoin"), star: tx("starcoin"), drop: tx("stardrop"), crown: tx("titul") }[g.icon] || ic(g.icon)}</span><b>${esc(g.title)}</b>${mini ? "" : `<small>${esc(g.sub)}</small>`}</div>`;
}

function rodsHtml() {
  return `<div class="rods">${BL.rods.map((r, i) => `<div class="rod pop" style="--c:${r.color};--d:${i * 50}ms"><span class="rod-n">${i + 1}</span><span class="rod-ic">${tx("s_hook")}</span><b>${esc(r.name)}</b><span class="stars">${r.stars ? "★".repeat(r.stars) : "☆"}</span></div>`).join(`<span class="rod-arr">${ic("arrow")}</span>`)}</div>`;
}

function mcTooltip() {
  return `<div class="mct" aria-label="Пример подсказки предмета">
    <div class="mct-name">Гром броня<span class="an">1</span></div>
    <div class="l gray">Гром броня • Нагрудник<span class="an">2</span></div>
    <div class="l gold">★⯪<span class="an">3</span></div>
    <div class="l gray">Без эффектов<span class="an">4</span></div>
    <div class="l blue">🛡 Защита 8<span class="an">5</span></div>
    <div class="l">&nbsp;</div>
    <div class="l ital">«Над облаками Лайттауна<br>гремит не небо — гремит броня»<span class="an">6</span></div>
    <div class="l dark">────────────</div>
    <div class="l gray">Следующая ступень:<span class="an">7</span></div>
    <div class="l purple">◆ Метеор · Лиановая · Водяная · Снежная</div>
    <div class="mct-note">пример</div>
  </div>`;
}

function protChart() {
  const cols = [["1", 2], ["2", 4], ["3", 6], ["4", 8], ["5", 10], ["6–8", null], ["бог ●", 35, "y"], ["бог ●", 40, "r"]];
  return `<div class="card pchart pop"><div class="pc-h"><b>Максимальная защита по ступеням</b><span class="muted tiny">на ступенях 6–8 растёт быстрее — точные значения смотри в игре</span></div>
    <div class="pc-bars">${cols.map(([t, v, k]) => `<div class="pc-col ${v ? "" : "unk"} ${k || ""}" style="--v:${v || 22}"><span class="pc-v">${v ?? "?"}</span><i></i><span class="pc-t">${t}</span></div>`).join("")}</div></div>`;
}

function bindRoute() {
  const box = $("#routeBox"); if (!box) return;
  box.addEventListener("change", (e) => {
    const k = e.target.dataset.step; if (!k) return;
    const done = loadJson("done", {}); if (e.target.checked) done[k] = 1; else delete done[k];
    save("done", JSON.stringify(done)); box.innerHTML = routePanel();
    if (Object.keys(done).length && $$("#routeBox li").every((li) => li.classList.contains("done"))) toast("Путь пройден — ты бог! 👑", "crown");
  });
  box.addEventListener("click", (e) => { if (e.target.id === "resetGoal") { save("goal", null); save("done", null); pages.tree(); } });
}

/* =====================  Роутер и глобальные мелочи  ===================== */
function go(hash) { if (location.hash !== hash) location.hash = hash; else route(); }
async function route() {
  const name = location.hash.replace(/^#\/?/, "").split("?")[0] || "home";
  const key = { start: "guide", pay: "ranks" }[name] || name;
  $$(".links a, .more-menu a").forEach((a) => a.classList.toggle("active", a.dataset.route === key));
  $("#moreBtn")?.classList.toggle("active", $$(".more-menu a").some((a) => a.dataset.route === key));
  $("#links").classList.remove("open"); $(".more")?.classList.remove("open");
  closeDrawer(); pages._spy = null;
  window.scrollTo(0, 0);
  view.classList.remove("enter"); void view.offsetWidth; view.classList.add("enter");
  await (pages[name] || pages.notfound)();
  document.title = ({ home: "Brawl Legends — Minecraft-сервер в стиле Brawl Stars", tree: "Дерево веток", gods: "Боги", cities: "Города", guide: "Гайд", modes: "Режимы", ranks: "Привилегии", pay: "Оплата", rewards: "Награды", commands: "Команды", faq: "FAQ", news: "Новости", login: "Вход", register: "Регистрация", cabinet: "Кабинет", admin: "Админка" }[name] || "Brawl Legends") + (name === "home" ? "" : " · Brawl Legends");
}
window.addEventListener("hashchange", route);
$("#burger").onclick = () => $("#links").classList.toggle("open");
$("#moreBtn").onclick = (e) => { e.stopPropagation(); $(".more").classList.toggle("open"); };
document.addEventListener("click", (e) => { if (!e.target.closest(".more")) $(".more")?.classList.remove("open"); });
document.addEventListener("click", (e) => { const b = e.target.closest("[data-eye]"); if (!b) return; const inp = $("#" + b.dataset.eye); inp.type = inp.type === "password" ? "text" : "password"; b.classList.toggle("on"); });

// прогресс чтения, кнопка «наверх», тень шапки
const onScroll = () => {
  const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
  $("#progress").style.transform = `scaleX(${p})`;
  $("#toTop").classList.toggle("show", h.scrollTop > 600);
  $(".nav").classList.toggle("scrolled", h.scrollTop > 8);
  pages._spy?.();
};
window.addEventListener("scroll", onScroll, { passive: true });
$("#toTop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
// «/» — поиск по командам
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); if (!location.hash.startsWith("#/commands")) go("#/commands"); setTimeout(() => $("#cq")?.focus(), 60); }
});

// всплывающие подсказки data-tip
(() => {
  const tip = $("#tip");
  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest("[data-tip]"); if (!t) { tip.hidden = true; return; }
    tip.textContent = t.dataset.tip; tip.hidden = false;
    const r = t.getBoundingClientRect(); const w = tip.offsetWidth;
    tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + "px";
    tip.style.top = r.top - tip.offsetHeight - 10 + "px";
  });
  window.addEventListener("scroll", () => (tip.hidden = true), { passive: true });
})();

(async function init() {
  $("#footIp").textContent = SITE.ip; $("#footIp").onclick = copyIp;
  $("#footYear").textContent = new Date().getFullYear();
  if (token) { try { me = await api("/me"); } catch { token = null; save("token", null); } }
  renderNav();
  await route();
  try { const s = await api("/stats"); $("#footStats").innerHTML = `${ic("user")}Аккаунтов на сайте: <b>${s.accounts}</b>`; } catch {}
  const list = await servers(); const st = list[0]?.status;
  $("#navStatus").innerHTML = `<span class="dot ${st?.online ? "on" : "off"}"></span>${st?.online ? `${st.players} онлайн` : "оффлайн"}`;
})();
