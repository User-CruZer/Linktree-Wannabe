const THEME_KEY = "linkhub.theme";

const ICONS = {
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
  tiktok: '<path fill="currentColor" stroke="none" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
  twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1a6 6 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  discord: '<g transform="scale(0.85) translate(1.76 1.76)"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0077-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></g>',
  email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  money: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  arrow: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  chevron: '<polyline points="6 9 12 15 18 9"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
};

const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "github", label: "GitHub" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "discord", label: "Discord" },
  { value: "facebook", label: "Facebook" },
  { value: "music", label: "Spotify" },
  { value: "email", label: "Email" },
  { value: "globe", label: "Website" }
];

const LINK_ICONS = [
  "link",
  "globe",
  "instagram",
  "github",
  "youtube",
  "tiktok",
  "twitter",
  "linkedin",
  "facebook",
  "discord",
  "music",
  "money",
  "list",
  "clipboard",
  "email"
];

const FALLBACK_PROFILE = {
  name: "Your Name",
  bio: "",
  avatar: "",
  theme: "auto",
  socials: [],
  links: []
};

const $ = (id) => document.getElementById(id);

const els = {
  card: $("card"),
  avatar: $("avatar"),
  name: $("name"),
  bio: $("bio"),
  socials: $("socials"),
  links: $("links"),
  shareBtn: $("shareBtn"),
  themeToggle: $("themeToggle"),
  toast: $("toast")
};

let toastTimer = null;

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// Preview images are hidden until hover/tap, so they load after the page instead of
// competing with it. Opening a preview early loads that one image straight away.
function loadImage(img) {
  if (!img || !img.dataset.src) return;
  img.src = img.dataset.src;
  img.removeAttribute("data-src");
}

function loadDeferredImages() {
  els.links.querySelectorAll("img[data-src]").forEach(loadImage);
}

function setOpen(item, open) {
  item.classList.toggle("is-open", open);
  if (open) loadImage(item.querySelector("img[data-src]"));
  if (!item.classList.contains("has-sublinks")) return;
  item.setAttribute("aria-expanded", String(open));
  const subwrap = item.querySelector(".link-sublinks");
  subwrap.setAttribute("aria-hidden", String(!open));
  subwrap.querySelectorAll(".link-sub").forEach((sub) => {
    sub.tabIndex = open ? 0 : -1;
  });
}

function closePreviews(except) {
  els.links.querySelectorAll(".link-item.is-open").forEach((item) => {
    if (except && item === except) return;
    setOpen(item, false);
  });
}

function openHref(href) {
  if (isExternal(href)) {
    window.open(href, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = href;
  }
}

function icon(name, className = "") {
  const markup = ICONS[name] || ICONS.link;
  const extra = className ? ` ${className}` : "";
  return `<svg class="icon${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${markup}</svg>`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function initialsAvatar(name) {
  const initials =
    (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase() || "?";
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#3a3329"/><stop offset="1" stop-color="#0f0d0a"/>' +
    "</linearGradient></defs>" +
    '<rect width="240" height="240" fill="url(#g)"/>' +
    '<text x="50%" y="50%" dy="0.08em" text-anchor="middle" dominant-baseline="middle" ' +
    'font-family="Space Mono, ui-monospace, monospace" font-size="96" font-weight="700" fill="#f6efe1">' +
    escapeXml(initials) +
    "</text></svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function normalizeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^mailto:/i.test(raw)) return raw;
  if (/^tel:/i.test(raw)) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^\/\//.test(raw)) return "https:" + raw;
  if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(raw)) return "mailto:" + raw;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return "";
  return "https://" + raw;
}

function normalizeMedia(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^data:image\//i.test(raw)) return raw;
  let path = raw.replace(/\\/g, "/");
  if (/^(https?:\/\/|\/|\.{1,2}\/)/i.test(path)) {
    // Encode each path segment if it's a local relative path
    try {
      if (!/^https?:\/\//i.test(path) && !path.startsWith("//")) {
        return path.split('/').map((seg, i) => {
          if (i === 0 && seg === '') return seg;
          if (seg === '.' || seg === '..') return seg;
          return encodeURIComponent(seg);
        }).join('/');
      }
    } catch (e) {}
    return path;
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return "";
  try {
    return path.split('/').map((seg) => seg === '.' || seg === '..' || seg === '' ? seg : encodeURIComponent(seg)).join('/');
  } catch (e) {
    return path;
  }
}

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

function platformLabel(value) {
  const found = SOCIAL_PLATFORMS.find((item) => item.value === value);
  return found ? found.label : "Link";
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
    return true;
  } catch (error) {
    return false;
  }
}

function normalizeProfile(raw) {
  const value = raw && typeof raw === "object" ? raw : {};
  const platforms = new Set(SOCIAL_PLATFORMS.map((item) => item.value));
  const icons = new Set(LINK_ICONS);

  const socials = Array.isArray(value.socials)
    ? value.socials
        .filter((item) => item && item.url)
        .map((item) => {
          const platform = String(item.platform || "globe");
          return {
            platform: platforms.has(platform) ? platform : "globe",
            url: normalizeUrl(item.url)
          };
        })
        .filter((item) => item.url)
    : [];

  const links = Array.isArray(value.links)
    ? value.links
        .filter((item) => item && item.label)
        .map((item) => {
          const iconName = String(item.icon || "link");
          const sublinks = Array.isArray(item.sublinks)
            ? item.sublinks
                .filter((s) => s && s.label && s.url)
                .map((s) => ({
                  label: String(s.label),
                  url: normalizeUrl(s.url)
                }))
                .filter((s) => s.url)
            : [];
          const url = item.url ? normalizeUrl(item.url) : "";
          return {
            label: String(item.label),
            url: url,
            icon: icons.has(iconName) ? iconName : "link",
            image: normalizeMedia(item.image),
            sublinks
          };
        })
        .filter((item) => item.url || (Array.isArray(item.sublinks) && item.sublinks.length))
    : [];

  return {
    name: String(value.name || FALLBACK_PROFILE.name),
    bio: typeof value.bio === "string" ? value.bio : "",
    avatar: typeof value.avatar === "string" ? value.avatar : "",
    theme: value.theme === "light" || value.theme === "dark" ? value.theme : "auto",
    socials,
    links
  };
}

function renderAvatar() {
  els.avatar.onerror = null;
  const fallback = initialsAvatar(profile.name);
  if (profile.avatar) {
    els.avatar.onerror = () => {
      els.avatar.onerror = null;
      els.avatar.src = fallback;
    };
    els.avatar.src = profile.avatar;
  } else {
    els.avatar.src = fallback;
  }
  els.avatar.alt = `${profile.name}'s profile picture`;
}

function renderBio(value) {
  const lines = String(value || "")
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean);

  els.bio.replaceChildren();
  lines.forEach((line, index) => {
    if (index > 0) els.bio.appendChild(document.createElement("br"));
    els.bio.appendChild(document.createTextNode(line));
  });
}

function render() {
  document.title = `${profile.name} — LinkHub`;
  renderAvatar();

  els.name.textContent = profile.name;
  renderBio(profile.bio);

  els.socials.innerHTML = "";
  profile.socials.forEach((social) => {
    const href = normalizeUrl(social.url);
    if (!href) return;
    const link = document.createElement("a");
    link.className = "social-btn";
    link.href = href;
    link.setAttribute("aria-label", platformLabel(social.platform));
    link.title = platformLabel(social.platform);
    if (isExternal(href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.innerHTML = icon(social.platform);
    els.socials.appendChild(link);
  });

  els.links.innerHTML = "";
  if (profile.links.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No links yet. Add them in profile.js.";
    els.links.appendChild(empty);
  }

  profile.links.forEach((item, index) => {
    const href = item.url || "";
    if (!href && !(Array.isArray(item.sublinks) && item.sublinks.length)) return;

    const link = document.createElement("div");
    link.className = "link-item";
    link.style.setProperty("--i", index);

    const hasSublinks = Array.isArray(item.sublinks) && item.sublinks.length > 0;
    link.tabIndex = 0;
    link.setAttribute("role", hasSublinks ? "button" : "link");

    const iconWrap = document.createElement("span");
    iconWrap.className = "link-icon";
    iconWrap.innerHTML = icon(item.icon);

    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = item.label;

    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.innerHTML = icon(hasSublinks ? "chevron" : "arrow");

    const main = document.createElement("div");
    main.className = "link-main";
    main.append(iconWrap, label, arrow);
    link.appendChild(main);

    if (hasSublinks) {
      link.classList.add("has-sublinks");
      link.setAttribute("aria-expanded", "false");
      const subwrap = document.createElement("div");
      subwrap.className = "link-sublinks";
      subwrap.setAttribute("aria-hidden", "true");
      item.sublinks.forEach((s) => {
        const sa = document.createElement("a");
        sa.className = "link-sub";
        const sh = normalizeUrl(s.url);
        sa.href = sh || "#";
        sa.textContent = s.label;
        sa.tabIndex = -1;
        if (isExternal(sh)) {
          sa.target = "_blank";
          sa.rel = "noopener noreferrer";
        }
        sa.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        subwrap.appendChild(sa);
      });
      link.insertBefore(subwrap, link.querySelector('.link-media') || null);
    }

    if (item.image) {
      link.classList.add("has-media");
      const media = document.createElement("span");
      media.className = "link-media";
      const inner = document.createElement("span");
      inner.className = "link-media-inner";
      const image = document.createElement("img");
      image.dataset.src = item.image;
      image.alt = "";
      image.decoding = "async";
      image.addEventListener("error", () => media.remove());
      inner.appendChild(image);
      media.appendChild(inner);
      link.appendChild(media);
      link.addEventListener("pointerenter", () => loadImage(image), { once: true });
      link.addEventListener("focus", () => loadImage(image), { once: true });
    }

    if (hasSublinks) {
      // Tap/click/Enter toggles the sublink row (desktop also reveals it on hover).
      link.addEventListener("click", (event) => {
        if (event.target.closest(".link-sub")) return;
        const open = !link.classList.contains("is-open");
        if (open) closePreviews(link);
        setOpen(link, open);
      });
    } else if (item.image) {
      // Touch: first tap previews the image, second tap opens the link.
      link.addEventListener("click", () => {
        if (!canHover() && !link.classList.contains("is-open")) {
          closePreviews(link);
          setOpen(link, true);
          return;
        }
        setOpen(link, false);
        openHref(href);
      });
    } else {
      link.addEventListener("click", () => openHref(href));
    }

    link.addEventListener("keydown", (event) => {
      if (event.target !== link) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        link.click();
      }
    });

    els.links.appendChild(link);
  });

  els.shareBtn.innerHTML = icon("share") + "Share";
}

// Center the card vertically using its collapsed height. Done in JS (not CSS centering)
// so that opening a preview grows the card downward instead of re-centering it,
// which would move the link out from under the cursor/finger.
function centerCard() {
  if (els.links.querySelector(".link-item.is-open, .link-item:hover")) return;
  const free = window.innerHeight - els.card.offsetHeight;
  document.documentElement.style.setProperty("--center-top", `${Math.max(0, Math.floor(free / 2))}px`);
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function updateThemeButton() {
  const theme = currentTheme();
  els.themeToggle.innerHTML = icon(theme === "dark" ? "sun" : "moon");
  els.themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeButton();
}

function initTheme() {
  const saved = readStorage(THEME_KEY);
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const configured =
    profile.theme === "light" || profile.theme === "dark"
      ? profile.theme
      : prefersLight
        ? "light"
        : "dark";
  applyTheme(saved === "light" || saved === "dark" ? saved : configured);
}

function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  writeStorage(THEME_KEY, next);
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

async function sharePage() {
  const url = window.location.href.split("#")[0];

  // Phones and tablets: open the built-in share sheet. Desktop: copy the link.
  if (navigator.share && !canHover()) {
    try {
      await navigator.share({ title: document.title, text: profile.name, url });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await copyText(url);
    toast("Link copied to clipboard");
  } catch (error) {
    toast("Could not copy the link");
  }
}

function init() {
  initTheme();
  render();

  centerCard();
  document.fonts?.ready.then(centerCard);
  // Only recenter when the width changes (rotation, window resize) — not when the
  // mobile address bar slides in/out while scrolling, which would make the card jump.
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    centerCard();
  });

  els.themeToggle.addEventListener("click", toggleTheme);
  els.shareBtn.addEventListener("click", sharePage);

  if (document.readyState === "complete") {
    loadDeferredImages();
  } else {
    window.addEventListener("load", loadDeferredImages, { once: true });
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".link-item")) closePreviews();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePreviews();
  });
}

const profile = normalizeProfile(window.PROFILE || FALLBACK_PROFILE);

init();
