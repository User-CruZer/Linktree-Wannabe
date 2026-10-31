// ── Page content ────────────────────────────────────────────────
// Edit this file, save, then commit + push to GitHub. That's it.
//
// title:    Text shown on the browser tab. Leave "" to just show your name.
//           Also update <title> and og:title in index.html so link previews match.
// bio:      Use " | " to split the bio into separate lines.
// avatar:   "" shows your initials, or use a path like "assets/avatar.jpg"
// theme:    "auto", "light", or "dark"
// platform: instagram, github, youtube, tiktok, discord, facebook, music, email, globe
// icon:     link, globe, instagram, github, youtube, tiktok, twitter, linkedin,
//           facebook, discord, music, money, list, clipboard, email
//
// Links can also show an image or GIF below the label:
// image:    "assets/portfolio.gif" (a file in this repo) or a full URL.
//           Leave it as "" and the button stays compact, exactly as before.
//           Hover on desktop or tap once on mobile to reveal it.

window.PROFILE = {
  name: "Cruzer",
  title: "Cruzer | Piloting Service",
  bio: "Piloting Service Available At IDR Price | Interested On My Service? Contact Me On Discord | Thank You For Visiting My Profile",
  avatar: "img/Profile picture.jpg",
  theme: "auto",

  socials: [
    // { platform: "instagram", url: "https://instagram.com" },
    { platform: "youtube", url: "https://www.youtube.com/@Sicruzer" },
    { platform: "github", url: "https://github.com/User-CruZer" }
  ],

  links: [
    { label: "Support Link", url: "", icon: "money", image: "img/Donation IMG.png", sublinks: [
      { label: "Sociabuzz", url: "https://sociabuzz.com/jekcrauzer/support" },
      { label: "Tako", url: "https://tako.id/Cruzer" }
    ] },
    { label: "List Antrian", url: "https://docs.google.com/spreadsheets/d/1-rViTa75Ez1KdCwlcxwf4slda2AzfjB2T91LLVloi_o/edit?gid=763581085#gid=763581085", icon: "clipboard", image: "img/Full ikhlas IMG.jpg" },
    { label: "Pricelist", url: "pricelist.html", icon: "money", image: "" },
    { label: "Discord Server", url: "https://discord.gg/6YjXMjk92d", icon: "discord", image: "img/GIF fRover.gif" },
    { label: "Tiktok jekcrauzer", url: "https://www.tiktok.com/@jekcrauzer", icon: "tiktok", image: "" },
    // Add another link by uncommenting and editing this line:
    // { label: "New link", url: "https://example.com", icon: "link", image: "" }
  ]
};
