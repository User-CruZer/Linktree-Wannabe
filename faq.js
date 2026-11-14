// ── FAQ content ─────────────────────────────────────────────────
// This is the only file you need to edit for the FAQ page.
// Save, then commit + push to GitHub and the page updates.
//
// ⚠ These answers are a DRAFT. Read every one and change it to match how you
//   actually work before you publish — visitors will treat them as your rules.
//
// LANGUAGES: any text can be one string (same in both languages) or
//   { en: "English text", id: "Teks bahasa Indonesia" }  — see i18n.js.
//
// ADD a question:    copy a { q: ..., a: ... } block into a section's items.
// REMOVE a question: delete its block, or put // at the start of its lines.
// ADD a section:     copy a whole { name: ..., items: [ ... ] } block.
//
//   q: the question (always visible)
//   a: the answer (shown when the visitor taps the question).
//      Use " | " to split it into separate lines.
//
// note (top of page): use " | " to split it into separate lines.
// contact: the button at the bottom. Leave url as "" to hide it.
//   server: optional "join my server first" link under it (see pricelist.js).

window.FAQ = {
  title: { en: "FAQ & Terms", id: "FAQ & Ketentuan" },
  note: {
    en: "Please read this before ordering | Still unsure? Ask me on Discord",
    id: "Mohon dibaca sebelum order | Masih bingung? Tanya saya di Discord"
  },

  sections: [
    {
      name: { en: "Before ordering", id: "Sebelum order" },
      items: [
        {
          q: { en: "How does piloting work?", id: "Gimana cara kerja joki?" },
          a: {
            en: "You order on Discord, then I log in to your account and finish the services you ordered. You don't need to be online while I play.",
            id: "Kamu order lewat Discord, lalu saya login ke akun kamu dan mengerjakan jasa yang kamu order. Kamu tidak perlu online selama saya main."
          }
        },
        {
          q: { en: "What do I need to send?", id: "Apa saja yang perlu saya kirim?" },
          a: {
            en: "Your login details, sent privately in Discord DMs only. Never post them in a public channel.",
            id: "Data login akun kamu, dikirim lewat DM Discord saja. Jangan pernah kirim di channel publik."
          }
        },
        {
          q: { en: "Is my account safe?", id: "Apakah akun saya aman?" },
          a: {
            en: "I only do what you ordered. I never change your password, email or linked accounts, and I don't spend Astrite or buy anything unless you ask me to.",
            id: "Saya hanya mengerjakan yang kamu order. Saya tidak pernah mengganti password, email atau akun yang terhubung, dan tidak memakai Astrite atau membeli apa pun kecuali kamu minta."
          }
        },
        {
          q: { en: "Can I play while you're working on my account?", id: "Boleh saya main selama akun dikerjakan?" },
          a: {
            en: "Please don't log in during the order. Logging in at the same time kicks me out and pauses the work. | If you need to play, tell me first and I'll stop.",
            id: "Mohon jangan login selama order berjalan. Login bersamaan akan membuat saya ter-kick dan pengerjaan tertunda. | Kalau mau main, kabari saya dulu dan saya akan berhenti."
          }
        },
      ]
    },
    {
      name: { en: "Payment", id: "Pembayaran" },
      items: [
        {
          q: { en: "How do I pay?", id: "Bagaimana cara bayarnya?" },
          a: {
            en: "I'll send the payment details when you order on Discord.",
            id: "Detail pembayaran akan saya kirim saat kamu order di Discord."
          }
        },
        {
          q: { en: "Are the prices fixed?", id: "Apakah harganya tetap?" },
          a: {
            en: "All prices are in IDR. Prices can change after game updates, but the price we agree on Discord when you order is the one you pay.",
            id: "Semua harga dalam IDR. Harga bisa berubah setelah update game, tapi harga yang disepakati di Discord saat kamu order adalah harga yang kamu bayar."
          }
        },
      ]
    },
    {
      name: { en: "During the order", id: "Selama pengerjaan" },
      items: [
        {
          q: { en: "How long does it take?", id: "Berapa lama pengerjaannya?" },
          a: {
            en: "It depends on the service and how many orders are ahead of you. You can see the current queue on the Queue page.",
            id: "Tergantung jasanya dan berapa banyak orderan sebelum kamu. Antrian terbaru bisa dilihat di halaman List Antrian."
          }
        },
        {
          q: { en: "Can I check the progress?", id: "Bisa cek progresnya?" },
          a: {
            en: "Yes, message me on Discord any time and I'll tell you where I'm at.",
            id: "Bisa, chat saya di Discord kapan saja dan saya kabari progresnya."
          }
        },
      ]
    },
    {
      name: { en: "Cancelling", id: "Pembatalan" },
      items: [
        {
          q: { en: "Can I cancel my order?", id: "Bisa batalkan orderan?" },
          a: {
            en: "Message me on Discord as soon as possible. Cancellations and refunds are handled case by case, depending on how much work is already done.",
            id: "Chat saya di Discord secepatnya. Pembatalan dan refund ditangani per kasus, tergantung seberapa banyak yang sudah dikerjakan."
          }
        },
      ]
    }
  ],

  contact: {
    label: { en: "Ask me on Discord", id: "Tanyakan di Discord" },
    url: "https://discord.com/users/716269644301729873",
    server: "https://discord.gg/6YjXMjk92d"
  }
};
