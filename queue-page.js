// Queue page: reads the "List Antrian" Google Sheet live and shows who's in the queue.
//
// How the sheet is read (column A only):
//   "Name (service ✅)"  -> finished
//   "Name (service)"     -> still in the queue (shown in sheet order)
//   rows without "( )"   -> notes, not shown
// Pre-orders: a cell saying "Pre Order:" (any column) followed by names below it,
//   e.g. "AdeRacer (PO Matrix 3.8 VIP)", until the first empty cell after them.
//   Pre-orders marked ✅ are treated as done and not shown.
// The sheet must stay shared as "Anyone with the link can view".
// The sheet link itself is set in profile.js (queue.sheet).

const THEME_KEY = "linkhub.theme";
const THEME_COLORS = { light: "#f4ecdd", dark: "#0d0b09" };
const RECENT_COUNT = 8;

const I18N = window.I18N || {
  t: (v) => (v && typeof v === "object" ? String(v.en ?? v.id ?? "") : String(v ?? "")),
  ui: (key) => key
};
const { t, ui } = I18N;

const ICONS = {
  back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  sheet: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
};

const $ = (id) => document.getElementById(id);

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
}

// "https://docs.google.com/spreadsheets/d/<id>/edit?gid=<gid>#gid=<gid>" -> CSV export URL
function csvUrl(sheetUrl) {
  const id = /\/spreadsheets\/d\/([\w-]+)/.exec(sheetUrl);
  if (!id) return "";
  const gid = /[?#&]gid=(\d+)/.exec(sheetUrl);
  return `https://docs.google.com/spreadsheets/d/${id[1]}/gviz/tq?tqx=out:csv${gid ? `&gid=${gid[1]}` : ""}`;
}

// Small CSV reader: handles quoted cells, "" escapes and line breaks inside cells.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

// "Name (service ✅)" -> { name, service, done }
function parseEntry(text) {
  const match = /^(.*?)\s*\((.*)\)\s*(.*)$/.exec(text) || [];
  const clean = (value) => String(value || "").replace(/✅/g, "").replace(/\s+/g, " ").trim();
  return {
    name: clean(match[1]) || clean(text),
    service: [clean(match[2]), clean(match[3])].filter(Boolean).join(" "),
    done: text.includes("✅")
  };
}

function parseEntries(rows) {
  return rows
    .map((row) => String(row[0] || "").trim())
    .filter(Boolean)
    .map((text) => text.replace(/^[-•]\s*/, ""))
    .filter((text) => /\(.+\)/.test(text))
    .map(parseEntry);
}

// Finds the "Pre Order:" heading in any column and reads the cells under it.
function parsePreorders(rows) {
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (!/^\s*pre[\s-]?orders?\s*:?\s*$/i.test(rows[r][c] || "")) continue;
      const list = [];
      for (let below = r + 1; below < rows.length; below++) {
        const text = String(rows[below][c] || "").trim().replace(/^[-•]\s*/, "");
        // Skip blank cells right under the heading; stop at the first gap after the names.
        if (!text) {
          if (list.length) break;
          continue;
        }
        list.push(parseEntry(text));
      }
      return list.filter((entry) => !entry.done);
    }
  }
  return [];
}

function entryRow(entry, position) {
  const row = el("li", "queue-row");
  if (position) row.appendChild(el("span", "queue-pos", String(position)));
  const info = el("div", "price-info");
  info.appendChild(el("span", "price-name", entry.name));
  if (entry.service) info.appendChild(el("span", "price-item-note", entry.service));
  row.appendChild(info);
  if (entry.done) row.appendChild(el("span", "queue-done", "✓"));
  return row;
}

function section(title, rows) {
  const group = el("section", "price-group");
  group.appendChild(el("h2", "price-group-name", title));
  group.appendChild(rows);
  return group;
}

function render(entries, preorders) {
  const active = entries.filter((entry) => !entry.done);
  const done = entries.filter((entry) => entry.done);

  const stats = $("queueStats");
  stats.replaceChildren();
  [
    [active.length, ui("inQueue")],
    [preorders.length, ui("preorders")],
    [done.length, ui("completed")]
  ].forEach(([value, label]) => {
    const stat = el("div", "queue-stat");
    stat.append(el("strong", "", String(value)), el("span", "", label));
    stats.appendChild(stat);
  });
  stats.hidden = false;

  const body = $("queueBody");
  body.replaceChildren();

  const activeList = el("ol", "price-rows queue-list");
  active.forEach((entry, index) => activeList.appendChild(entryRow(entry, index + 1)));
  body.appendChild(
    section(ui("nowInQueue"), active.length ? activeList : el("p", "price-empty", ui("queueEmpty")))
  );

  if (preorders.length) {
    const preList = el("ol", "price-rows queue-list queue-list-pre");
    preorders.forEach((entry, index) => preList.appendChild(entryRow(entry, index + 1)));
    const pre = section(ui("preorderTitle"), preList);
    pre.insertBefore(el("p", "price-group-note", ui("preorderNote")), preList);
    body.appendChild(pre);
  }

  if (done.length) {
    const recentList = el("ul", "price-rows queue-list");
    done
      .slice(-RECENT_COUNT)
      .reverse()
      .forEach((entry) => recentList.appendChild(entryRow(entry)));
    body.appendChild(section(ui("recentlyDone"), recentList));
  }
}

async function load(sheetUrl) {
  const url = csvUrl(sheetUrl);
  try {
    if (!url) throw new Error("Not a Google Sheets link");
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    // A private sheet answers with a Google sign-in page instead of CSV.
    if (/^\s*</.test(text)) throw new Error("Sheet is not public");
    const rows = parseCsv(text);
    render(parseEntries(rows), parsePreorders(rows));
  } catch (error) {
    $("queueBody").replaceChildren(el("p", "empty-state", ui("queueError")));
  }
}

function renderStatus() {
  const profile = window.PROFILE || {};
  const status = String(profile.status || "").trim().toLowerCase();
  const defaults = { open: ui("statusOpen"), closed: ui("statusClosed") };
  if (!defaults[status]) return;
  const target = $("status");
  target.className = `status status-${status}`;
  target.textContent = t(profile.statusText).trim() || defaults[status];
  target.hidden = false;
}

function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.content = THEME_COLORS[theme];
  });
  const toggle = $("themeToggle");
  toggle.innerHTML = icon(theme === "dark" ? "sun" : "moon");
  toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

function init() {
  applyTheme(currentTheme());
  $("themeToggle").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    writeStorage(THEME_KEY, next);
  });
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    if (readStorage(THEME_KEY)) return;
    const configured = window.PROFILE && window.PROFILE.theme;
    if (configured === "light" || configured === "dark") return;
    applyTheme(event.matches ? "light" : "dark");
  });

  $("backBtn").innerHTML = icon("back");
  renderStatus();

  const queue = (window.PROFILE && window.PROFILE.queue) || {};
  const sheetUrl = String(queue.sheet || "").trim();
  if (/^https:\/\//i.test(sheetUrl)) {
    const btn = $("sheetBtn");
    btn.href = sheetUrl;
    btn.innerHTML = icon("sheet");
    btn.appendChild(document.createTextNode(ui("openSheet")));
    btn.hidden = false;
  }
  load(sheetUrl);
}

init();
