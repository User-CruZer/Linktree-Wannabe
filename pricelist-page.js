const THEME_KEY = "linkhub.theme";
const THEME_COLORS = { light: "#f4ecdd", dark: "#0d0b09" };

const ICONS = {
  back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  discord: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
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
  if (text) node.textContent = text;
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
  const lines = String(value || "")
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean);
  lines.forEach((line, index) => {
    if (index > 0) target.appendChild(document.createElement("br"));
    target.appendChild(document.createTextNode(line));
  });
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

function renderRows(items) {
  const rows = el("ul", "price-rows");
  items.forEach((item) => {
    const row = el("li", "price-row");
    const name = String(item.name);

    const src = imageSrc(item.image);
    if (src) {
      const thumb = el("button", "price-thumb");
      thumb.type = "button";
      thumb.setAttribute("aria-label", `View preview of ${name}`);
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
    row.append(info, el("span", "price-value", String(item.price || "")));
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
  const title = String(data.title || "Pricelist");
  $("priceTitle").textContent = title;
  renderNote($("priceNote"), data.note);

  const list = $("priceGroups");
  const groups = Array.isArray(data.groups) ? data.groups.filter((group) => group && group.name) : [];

  groups.forEach((group, index) => {
    const section = el("section", "price-group");
    section.style.setProperty("--i", index);
    section.appendChild(el("h2", "price-group-name", String(group.name)));
    if (group.note) section.appendChild(el("p", "price-group-note", String(group.note)));

    const items = validItems(group.items);
    const subgroups = Array.isArray(group.subgroups)
      ? group.subgroups.filter((sub) => sub && sub.name)
      : [];

    if (items.length) section.appendChild(renderRows(items));
    else if (!subgroups.length) section.appendChild(el("p", "price-empty", "Coming soon"));

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
      heading.appendChild(document.createTextNode(String(sub.name)));
      subsection.appendChild(heading);
      if (sub.note) subsection.appendChild(el("p", "price-group-note", String(sub.note)));
      const subItems = validItems(sub.items);
      subsection.appendChild(subItems.length ? renderRows(subItems) : el("p", "price-empty", "Coming soon"));
      section.appendChild(subsection);
    });

    list.appendChild(section);
  });

  if (!list.children.length) {
    list.appendChild(el("p", "empty-state", "No prices yet. Add them in pricelist.js."));
  }

  const order = data.order;
  if (order && /^https?:\/\//i.test(String(order.url || ""))) {
    const btn = $("orderBtn");
    btn.href = order.url;
    btn.innerHTML = icon("discord");
    btn.appendChild(document.createTextNode(String(order.label || "Order")));
    btn.hidden = false;
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
  render(window.PRICELIST || {});
}

init();
