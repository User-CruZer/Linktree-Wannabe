// ── Languages (English / Bahasa Indonesia) ──────────────────────
// Loaded in <head> on every page, right after profile.js.
//
// Any text in profile.js, pricelist.js or faq.js can be either:
//   "Same text in both languages"
//   { en: "English text", id: "Teks bahasa Indonesia" }
// If one language is missing, the other one is shown instead.
//
// The words built into the pages (buttons, messages) are in STRINGS below.

(function () {
  var KEY = "linkhub.lang";
  var LANGS = ["en", "id"];

  var STRINGS = {
    en: {
      langLabel: "Bahasa Indonesia",
      back: "Back to profile",
      share: "Share",
      linkCopied: "Link copied to clipboard",
      linkCopyFailed: "Could not copy the link",
      noLinks: "No links yet. Add them in profile.js.",
      statusOpen: "Open for orders",
      statusClosed: "Currently full",
      // Pricelist
      add: "Add",
      addItem: "Add {name} to order",
      addOne: "Add one more {name}",
      removeOne: "Remove one {name}",
      items: "{n} items",
      item: "1 item",
      free: "Free",
      toConfirm: "price to confirm",
      copyOrder: "Copy order",
      clear: "Clear",
      orderCopied: "Order copied — paste it on Discord",
      orderCopyFailed: "Could not copy the order",
      orderCleared: "Order cleared",
      orderHello: "Hi! I'd like to order:",
      total: "Total",
      comingSoon: "Coming soon",
      noPrices: "No prices yet. Add them in pricelist.js.",
      viewPreview: "View preview of {name}",
      yourOrder: "Your order",
      readFaq: "Read the FAQ & Terms before ordering",
      dmHint: "Can't message me? Join my Discord server first",
      // FAQ
      noFaq: "No questions yet. Add them in faq.js.",
      seePricelist: "See the pricelist",
      // Queue
      queueTitle: "Queue",
      queueNote: "Live from my order sheet",
      inQueue: "In queue",
      completed: "Completed",
      nowInQueue: "Now in queue",
      recentlyDone: "Recently completed",
      queueEmpty: "Nobody in the queue right now — order now and you're next!",
      loading: "Loading…",
      queueError: "Couldn't load the queue right now. You can still open the sheet below.",
      openSheet: "Open the full sheet"
    },
    id: {
      langLabel: "English",
      back: "Kembali ke profil",
      share: "Bagikan",
      linkCopied: "Link disalin",
      linkCopyFailed: "Gagal menyalin link",
      noLinks: "Belum ada link. Tambahkan di profile.js.",
      statusOpen: "Open order",
      statusClosed: "Sedang penuh",
      add: "Tambah",
      addItem: "Tambahkan {name} ke orderan",
      addOne: "Tambah satu {name}",
      removeOne: "Kurangi satu {name}",
      items: "{n} item",
      item: "1 item",
      free: "Gratis",
      toConfirm: "harga dikonfirmasi",
      copyOrder: "Salin orderan",
      clear: "Hapus",
      orderCopied: "Orderan disalin — tempel di Discord",
      orderCopyFailed: "Gagal menyalin orderan",
      orderCleared: "Orderan dihapus",
      orderHello: "Halo! Saya mau order:",
      total: "Total",
      comingSoon: "Segera hadir",
      noPrices: "Belum ada harga. Tambahkan di pricelist.js.",
      viewPreview: "Lihat gambar {name}",
      yourOrder: "Orderan kamu",
      readFaq: "Baca FAQ & Ketentuan sebelum order",
      dmHint: "Tidak bisa kirim pesan? Join server Discord dulu",
      noFaq: "Belum ada pertanyaan. Tambahkan di faq.js.",
      seePricelist: "Lihat pricelist",
      queueTitle: "Antrian",
      queueNote: "Langsung dari sheet orderan saya",
      inQueue: "Dalam antrian",
      completed: "Selesai",
      nowInQueue: "Antrian sekarang",
      recentlyDone: "Baru selesai",
      queueEmpty: "Antrian sedang kosong — order sekarang langsung dikerjakan!",
      loading: "Memuat…",
      queueError: "Antrian gagal dimuat. Kamu tetap bisa buka sheet-nya di bawah.",
      openSheet: "Buka sheet lengkap"
    }
  };

  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (error) {
      return null;
    }
  }

  function detect() {
    var saved = read();
    if (LANGS.indexOf(saved) !== -1) return saved;
    var configured = window.PROFILE && window.PROFILE.language;
    if (LANGS.indexOf(configured) !== -1) return configured;
    var browser = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return /^(id|ms)\b/i.test(browser) ? "id" : "en";
  }

  var lang = detect();
  document.documentElement.lang = lang;

  function isBilingual(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  // Pick the visitor's language from "text" or { en, id }.
  function t(value) {
    if (isBilingual(value)) {
      var picked = value[lang] != null && value[lang] !== "" ? value[lang] : value.en != null ? value.en : value.id;
      return picked == null ? "" : String(picked);
    }
    return value == null ? "" : String(value);
  }

  // Same text in every language — used as an ID (e.g. remembering a picked service
  // even after the visitor switches language).
  function base(value) {
    if (isBilingual(value)) return String(value.en != null ? value.en : value.id != null ? value.id : "");
    return value == null ? "" : String(value);
  }

  function ui(key, vars) {
    var text = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (name) {
        text = text.split("{" + name + "}").join(String(vars[name]));
      });
    }
    return text;
  }

  function setLang(next) {
    try {
      localStorage.setItem(KEY, next);
    } catch (error) {}
    location.reload();
  }

  // Fill in fixed page text marked with data-i18n="key" (or data-i18n-label for aria-label).
  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = ui(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (node) {
      var text = ui(node.getAttribute("data-i18n-label"));
      node.setAttribute("aria-label", text);
      node.title = text;
    });
  }

  function mountToggle() {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "lang-toggle";
    button.setAttribute("aria-label", ui("langLabel"));
    button.title = ui("langLabel");
    LANGS.forEach(function (code) {
      var part = document.createElement("span");
      part.textContent = code.toUpperCase();
      if (code === lang) part.className = "is-current";
      button.appendChild(part);
    });
    button.addEventListener("click", function () {
      setLang(lang === "en" ? "id" : "en");
    });
    document.body.appendChild(button);
  }

  window.I18N = { lang: lang, t: t, base: base, ui: ui };

  document.addEventListener("DOMContentLoaded", function () {
    applyStatic();
    mountToggle();
  });
})();
