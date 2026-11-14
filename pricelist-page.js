const THEME_KEY = "linkhub.theme";
const ORDER_KEY = "pricelist.order";
const THEME_COLORS = { light: "#f4ecdd", dark: "#0d0b09" };

// i18n.js provides translations; fall back to plain English if it did not load.
const I18N = window.I18N || {
  lang: "en",
  t: (v) => (v && typeof v === "object" ? String(v.en ?? v.id ?? "") : String(v ?? "")),
  base: (v) => (v && typeof v === "object" ? String(v.en ?? v.id ?? "") : String(v ?? "")),
  ui: (key, vars) => (vars && vars.name ? vars.name : key)
};
const { t, base, ui } = I18N;
const STATUS_DEFAULTS = { open: ui("statusOpen"), closed: ui("statusClosed") };

const ICONS = {
  back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  discord: '<g transform="scale(0.85) translate(1.76 1.76)"><path fill="currentColor" stroke="none" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0077-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></g>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
};

const $ = (id) => document.getElementById(id);

// Order builder state. Keys are "Category / Sub-category / Service" so the same
// service name in two categories doesn't clash.
const services = new Map(); // key -> { name, sub, price, unit }
const controls = new Map(); // key -> { row, add, stepper, count }
const selection = new Map(); // key -> quantity
let orderMessage = "";
let toastTimer = null;

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function button(className, label, html) {
  const node = el("button", className);
  node.type = "button";
  node.setAttribute("aria-label", label);
  node.innerHTML = html;
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

function renderNote(target, value) {
  const lines = t(value)
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean);
  lines.forEach((line, index) => {
    if (index > 0) target.appendChild(document.createElement("br"));
    target.appendChild(document.createTextNode(line));
  });
}

function renderStatus() {
  const profile = window.PROFILE || {};
  const status = String(profile.status || "").trim().toLowerCase();
  const target = $("status");
  if (!target || !STATUS_DEFAULTS[status]) return;
  target.className = `status status-${status}`;
  target.textContent = t(profile.statusText).trim() || STATUS_DEFAULTS[status];
  target.hidden = false;
}

function validItems(items) {
  return Array.isArray(items) ? items.filter((item) => item && item.name) : [];
}

// Local paths can contain spaces (e.g. "img/pricelist/My Pic.jpg"), so encode each part.
function imageSrc(value) {
  const raw = String(value || "").trim().replace(/\\/g, "/");
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return "";
  return raw
    .split("/")
    .map((part) => (part === "." || part === ".." ? part : encodeURIComponent(part)))
    .join("/");
}

// "Rp 15.000" -> 15000, "Free" -> 0, anything else -> null (price to confirm).
function parsePrice(value) {
  const text = base(value).trim();
  if (/^(free|gratis)$/i.test(text)) return 0;
  const digits = text.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

function formatRp(amount) {
  return amount === 0 ? ui("free") : `Rp ${amount.toLocaleString("id-ID")}`;
}

// ── Order builder ───────────────────────────────────────────────

function orderControl(key, name, row) {
  const wrap = el("div", "price-order");
  const add = button("order-add", ui("addItem", { name }), icon("plus") + ui("add"));
  const stepper = el("div", "order-stepper");
  const minus = button("order-step", ui("removeOne", { name }), icon("minus"));
  const count = el("span", "order-count");
  count.setAttribute("aria-live", "polite");
  const plus = button("order-step", ui("addOne", { name }), icon("plus"));
  stepper.append(minus, count, plus);
  stepper.hidden = true;
  wrap.append(add, stepper);

  add.addEventListener("click", () => {
    setQty(key, 1);
    plus.focus();
  });
  plus.addEventListener("click", () => setQty(key, (selection.get(key) || 0) + 1));
  minus.addEventListener("click", () => {
    const next = (selection.get(key) || 0) - 1;
    setQty(key, next);
    if (next <= 0) add.focus();
  });

  controls.set(key, { row, add, stepper, count });
  return wrap;
}

function paintControl(key) {
  const control = controls.get(key);
  if (!control) return;
  const qty = selection.get(key) || 0;
  control.add.hidden = qty > 0;
  control.stepper.hidden = qty === 0;
  control.count.textContent = String(qty);
  control.row.classList.toggle("is-selected", qty > 0);
}

function setQty(key, qty) {
  const next = Math.max(0, Math.min(99, qty));
  if (next) selection.set(key, next);
  else selection.delete(key);
  paintControl(key);
  saveOrder();
  updateOrderBar();
}

function saveOrder() {
  writeStorage(ORDER_KEY, JSON.stringify(Object.fromEntries(selection)));
}

function loadOrder() {
  let saved = {};
  try {
    saved = JSON.parse(readStorage(ORDER_KEY) || "{}") || {};
  } catch (error) {}
  Object.entries(saved).forEach(([key, qty]) => {
    // Skip services that were renamed or removed since the visitor's last visit.
    if (services.has(key) && Number(qty) > 0) selection.set(key, Math.min(99, Math.floor(Number(qty))));
  });
  controls.forEach((_, key) => paintControl(key));
}

function orderTotals() {
  let count = 0;
  let total = 0;
  let unknown = false;
  selection.forEach((qty, key) => {
    const service = services.get(key);
    count += qty;
    if (service.unit === null) unknown = true;
    else total += service.unit * qty;
  });
  const totalText = unknown ? `${total ? formatRp(total) + " + " : ""}${ui("toConfirm")}` : formatRp(total);
  return { count, totalText };
}

function updateOrderBar() {
  const { count, totalText } = orderTotals();
  $("orderBar").hidden = count === 0;
  document.body.classList.toggle("has-order-bar", count > 0);
  $("orderCount").textContent = count === 1 ? ui("item") : ui("items", { n: count });
  $("orderTotal").textContent = totalText;
}

function orderText() {
  const lines = [orderMessage || ui("orderHello"), ""];
  selection.forEach((qty, key) => {
    const service = services.get(key);
    const label = service.sub ? `${service.name} (${service.sub})` : service.name;
    const price = service.unit === null ? service.price || ui("toConfirm") : formatRp(service.unit * qty);
    lines.push(`• ${label}${qty > 1 ? ` ×${qty}` : ""}: ${price}`);
  });
  lines.push("", `${ui("total")}: ${orderTotals().totalText}`);
  return lines.join("\n");
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (ok) resolve();
      else reject(new Error("Copy failed"));
    } catch (error) {
      reject(error);
    }
  });
}

function toast(message) {
  const node = $("toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
}

async function copyOrder() {
  try {
    await copyText(orderText());
    toast(ui("orderCopied"));
  } catch (error) {
    toast(ui("orderCopyFailed"));
  }
}

function clearOrder() {
  selection.clear();
  controls.forEach((_, key) => paintControl(key));
  saveOrder();
  updateOrderBar();
  toast(ui("orderCleared"));
}

// ── Page ────────────────────────────────────────────────────────

function renderRows(items, group, sub) {
  const rows = el("ul", "price-rows");
  items.forEach((item) => {
    const row = el("li", "price-row");
    const name = t(item.name);
    const price = t(item.price);

    const src = imageSrc(item.image);
    if (src) {
      const thumb = el("button", "price-thumb");
      thumb.type = "button";
      thumb.setAttribute("aria-label", ui("viewPreview", { name }));
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => thumb.remove());
      thumb.appendChild(img);
      thumb.addEventListener("click", () => openPreview(src, name));
      row.appendChild(thumb);
    }

    const info = el("div", "price-info");
    info.appendChild(el("span", "price-name", name));
    if (item.note) {
      const note = el("span", "price-item-note");
      renderNote(note, item.note);
      info.appendChild(note);
    }

    // Key uses the English text so a picked service survives a language switch.
    const key = [base(group.name), sub ? base(sub.name) : "", base(item.name)].join(" / ");
    services.set(key, { name, sub: sub ? t(sub.name) : "", price, unit: parsePrice(item.price) });

    const side = el("div", "price-side");
    side.append(el("span", "price-value", price), orderControl(key, name, row));
    row.append(info, side);
    rows.appendChild(row);
  });
  return rows;
}

function openPreview(src, name) {
  const dialog = $("preview");
  $("previewImg").src = src;
  $("previewImg").alt = name;
  $("previewCaption").textContent = name;
  dialog.showModal();
}

function render(data) {
  const title = t(data.title) || "Pricelist";
  $("priceTitle").textContent = title;
  renderNote($("priceNote"), data.note);
  orderMessage = t(data.orderMessage).trim();

  const list = $("priceGroups");
  const groups = Array.isArray(data.groups) ? data.groups.filter((group) => group && group.name) : [];

  // Jump buttons at the top, one per category.
  const jump = $("priceJump");
  if (groups.length > 1) {
    groups.forEach((group, index) => {
      const chip = el("a", "price-jump-chip", t(group.name));
      chip.href = `#cat-${index}`;
      jump.appendChild(chip);
    });
    jump.hidden = false;
  }

  groups.forEach((group, index) => {
    const section = el("section", "price-group");
    section.id = `cat-${index}`;
    section.style.setProperty("--i", index);
    section.appendChild(el("h2", "price-group-name", t(group.name)));
    if (group.note) section.appendChild(el("p", "price-group-note", t(group.note)));

    const items = validItems(group.items);
    const subgroups = Array.isArray(group.subgroups)
      ? group.subgroups.filter((sub) => sub && sub.name)
      : [];

    if (items.length) section.appendChild(renderRows(items, group));
    else if (!subgroups.length) section.appendChild(el("p", "price-empty", ui("comingSoon")));

    subgroups.forEach((sub) => {
      const subsection = el("div", "price-subgroup");
      const heading = el("h3", "price-subgroup-name");
      const subSrc = imageSrc(sub.image);
      if (subSrc) {
        const emblem = document.createElement("img");
        emblem.className = "price-subgroup-img";
        emblem.src = subSrc;
        emblem.alt = "";
        emblem.loading = "lazy";
        emblem.decoding = "async";
        emblem.addEventListener("error", () => emblem.remove());
        heading.appendChild(emblem);
      }
      heading.appendChild(document.createTextNode(t(sub.name)));
      subsection.appendChild(heading);
      if (sub.note) subsection.appendChild(el("p", "price-group-note", t(sub.note)));
      const subItems = validItems(sub.items);
      subsection.appendChild(
        subItems.length ? renderRows(subItems, group, sub) : el("p", "price-empty", ui("comingSoon"))
      );
      section.appendChild(subsection);
    });

    list.appendChild(section);
  });

  if (!list.children.length) {
    list.appendChild(el("p", "empty-state", ui("noPrices")));
  }

  const order = data.order;
  if (order && /^https?:\/\//i.test(String(order.url || ""))) {
    const btn = $("orderBtn");
    btn.href = order.url;
    btn.innerHTML = icon("discord");
    btn.appendChild(document.createTextNode(t(order.label) || "Order"));
    btn.hidden = false;

    // Discord only allows DMs between people who share a server or are friends,
    // so offer the server as a first step.
    if (/^https?:\/\//i.test(String(order.server || ""))) {
      const link = el("a", "", ui("dmHint"));
      link.href = order.server;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const hint = el("p", "page-links");
      hint.appendChild(link);
      btn.closest("footer").after(hint);
    }
  }
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

  // Follow the system theme live until the visitor picks one with the toggle.
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    if (readStorage(THEME_KEY)) return;
    const configured = window.PROFILE && window.PROFILE.theme;
    if (configured === "light" || configured === "dark") return;
    applyTheme(event.matches ? "light" : "dark");
  });

  // Tap anywhere on the preview to close it (Escape also closes it).
  $("preview").addEventListener("click", () => $("preview").close());

  $("backBtn").innerHTML = icon("back");
  renderStatus();

  // If a cached old pricelist.html (without the order bar) meets this script,
  // show the list without the order builder rather than breaking the page.
  const orderReady = $("orderBar") && $("orderCopy") && $("orderClear") && $("toast");
  if (!orderReady) document.body.classList.add("no-order");
  else {
    $("orderCopy").innerHTML = icon("copy") + ui("copyOrder");
    $("orderCopy").addEventListener("click", copyOrder);
    $("orderClear").addEventListener("click", clearOrder);
  }

  render(window.PRICELIST || {});
  if (orderReady) {
    loadOrder();
    updateOrderBar();
  }
}

init();
