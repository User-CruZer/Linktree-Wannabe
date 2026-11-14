const THEME_KEY = "linkhub.theme";
const THEME_COLORS = { light: "#f4ecdd", dark: "#0d0b09" };

// i18n.js provides translations; fall back to plain English if it did not load.
const I18N = window.I18N || {
  t: (v) => (v && typeof v === "object" ? String(v.en ?? v.id ?? "") : String(v ?? "")),
  ui: (key) => key
};
const { t, ui } = I18N;

const ICONS = {
  back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  chevron: '<polyline points="6 9 12 15 18 9"/>',
  discord: '<g transform="scale(0.85) translate(1.76 1.76)"><path fill="currentColor" stroke="none" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0077-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></g>',
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

function renderLines(target, value) {
  t(value)
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line, index) => {
      if (index > 0) target.appendChild(document.createElement("br"));
      target.appendChild(document.createTextNode(line));
    });
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

function render(data) {
  $("faqTitle").textContent = t(data.title) || "FAQ";
  renderLines($("faqNote"), data.note);

  const list = $("faqSections");
  const sections = Array.isArray(data.sections) ? data.sections.filter((s) => s && s.name) : [];

  sections.forEach((section, index) => {
    const items = Array.isArray(section.items) ? section.items.filter((item) => item && item.q) : [];
    if (!items.length) return;

    const group = el("section", "price-group");
    group.style.setProperty("--i", index);
    group.appendChild(el("h2", "price-group-name", t(section.name)));

    items.forEach((item) => {
      // <details> gives tap-to-open, keyboard support and screen-reader state for free.
      const details = el("details", "faq-item");
      const summary = el("summary", "faq-q");
      summary.appendChild(el("span", "", t(item.q)));
      summary.insertAdjacentHTML("beforeend", icon("chevron"));
      const answer = el("p", "faq-a");
      renderLines(answer, item.a);
      details.append(summary, answer);
      group.appendChild(details);
    });

    list.appendChild(group);
  });

  if (!list.children.length) {
    list.appendChild(el("p", "empty-state", ui("noFaq")));
  }

  const contact = data.contact;
  if (contact && /^https?:\/\//i.test(String(contact.url || ""))) {
    const btn = $("contactBtn");
    btn.href = contact.url;
    btn.innerHTML = icon("discord");
    btn.appendChild(document.createTextNode(t(contact.label) || "Contact me"));
    btn.hidden = false;

    // Discord only allows DMs between people who share a server or are friends,
    // so offer the server as a first step.
    if (/^https?:\/\//i.test(String(contact.server || ""))) {
      const link = el("a", "", ui("dmHint"));
      link.href = contact.server;
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

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    if (readStorage(THEME_KEY)) return;
    const configured = window.PROFILE && window.PROFILE.theme;
    if (configured === "light" || configured === "dark") return;
    applyTheme(event.matches ? "light" : "dark");
  });

  $("backBtn").innerHTML = icon("back");
  render(window.FAQ || {});
}

init();
