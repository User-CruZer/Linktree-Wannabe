// ── Page content ────────────────────────────────────────────────
// Edit this file, save, then commit + push to GitHub. That's it.
//
// LANGUAGES: any text can be one string (same in both languages) or
//   { en: "English text", id: "Teks bahasa Indonesia" }.
//   Visitors switch with the EN / ID button at the top. Leave a language out
//   and the other one is shown instead.
// language: which language first-time visitors see:
//           "auto" (Indonesian phones/browsers get ID, everyone else EN), "en" or "id".
//
// title:    Text shown on the browser tab. Leave "" to just show your name.
//           Also update <title> and og:title in index.html so link previews match.
// bio:      Use " | " to split the bio into separate lines.
// avatar:   "" shows your initials, or use a path like "assets/avatar.jpg"
// theme:    "auto", "light", or "dark"
// status:   "open", "closed", or "" to hide the badge under your name (also shown
//           on the pricelist and queue pages).
// statusText: what the badge says, e.g. "Open — 2 slots left" or "Full until Friday".
//           Leave "" for the default ("Open for orders" / "Currently full").
// platform: instagram, github, youtube, tiktok, discord, facebook, music, email, globe
// icon:     link, globe, instagram, github, youtube, tiktok, twitter, linkedin,
//           facebook, discord, music, money, list, clipboard, email
//
// Links can also show an image or GIF below the label:
// image:    "assets/portfolio.gif" (a file in this repo) or a full URL.
//           Leave it as "" and the button stays compact, exactly as before.
//           Hover on desktop or tap once on mobile to reveal it.
//
// queue.sheet: the Google Sheet the Queue page reads. It must be shared as
//           "Anyone with the link can view".

window.PROFILE = {
  name: "Cruzer",
  title: { en: "Cruzer | Piloting Service", id: "Cruzer | Jasa Joki" },
  bio: {
    en: "Piloting Service Available At IDR Price | Interested In My Service? Contact Me On Discord | Thank You For Visiting My Profile",
    id: "Jasa Joki Tersedia Dengan Harga IDR | Tertarik Dengan Jasa Saya? Hubungi Saya Di Discord | Terima Kasih Sudah Mampir"
  },
  avatar: "img/Profile picture.jpg",
  theme: "auto",
  language: "auto",
  status: "open",
  statusText: "",

  socials: [
    // { platform: "instagram", url: "https://instagram.com" },
    { platform: "youtube", url: "https://www.youtube.com/@Sicruzer" },
    { platform: "github", url: "https://github.com/User-CruZer" }
  ],

  links: [
    { label: { en: "Support Link", id: "Link Dukungan" }, url: "", icon: "money", image: "img/Donation IMG.png", sublinks: [
      { label: "Sociabuzz", url: "https://sociabuzz.com/jekcrauzer/support" },
      { label: "Tako", url: "https://tako.id/Cruzer" }
    ] },
    { label: { en: "Queue", id: "List Antrian" }, url: "queue.html", icon: "clipboard", image: "img/Full ikhlas IMG.jpg" },
    { label: "Pricelist", url: "pricelist.html", icon: "money", image: "" },
    { label: { en: "FAQ & Terms", id: "FAQ & Ketentuan" }, url: "faq.html", icon: "list", image: "" },
    { label: "Discord Server", url: "https://discord.gg/6YjXMjk92d", icon: "discord", image: "img/GIF fRover.gif" },
    { label: "TikTok jekcrauzer", url: "https://www.tiktok.com/@jekcrauzer", icon: "tiktok", image: "" },
    // Add another link by uncommenting and editing this line:
    // { label: "New link", url: "https://example.com", icon: "link", image: "" }
  ],

  queue: {
    sheet: "https://docs.google.com/spreadsheets/d/1-rViTa75Ez1KdCwlcxwf4slda2AzfjB2T91LLVloi_o/edit?gid=763581085#gid=763581085"
  }
};
