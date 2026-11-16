// ── Pricelist content ───────────────────────────────────────────
// This is the only file you need to edit for the pricelist page.
// Save, then commit + push to GitHub and the page updates.
//
// LANGUAGES: any text can be one string (same in both languages) or
//   { en: "English text", id: "Teks bahasa Indonesia" }  — see i18n.js.
//
// ADD a service:    copy an example line below, paste it inside a category's
//                   items: [ ... ] and change the text between the quotes.
// EDIT a service:   change the text between the quotes.
// REMOVE a service: delete its whole line. To hide it for a while instead,
//                   put // at the start of the line.
// ADD a category:   copy a whole { name: ..., items: [ ... ] } block.
//                   A category (or sub-category) can also have note: "..." under
//                   its name, shown as small text below the category title.
//
// Service fields:
//   name:   required, e.g. "Tower of Adversity"
//   price:  required, e.g. "Rp 25.000"
//   note:   optional small text under the name. Leave out or "" for none.
//           Use " | " to split it into separate lines.
//   image:  optional preview picture. Put the file in the category's folder inside
//           img/pricelist/ and write its path, e.g.
//           "img/pricelist/endgame-content/tower.jpg". A full https:// link also works.
//           Folders: endgame-content, exploration, event, quest, daily-account-care.
//           Exploration has one folder per province, e.g. exploration/mengzhou/.
//           (Add a new folder when you add a new category.)
//           Leave out or "" for no picture. Visitors tap it to see it full size.
//   start:  optional. When a limited event begins, e.g. "2026-11-20 10:00".
//           Before then it shows "Starts in 3d 4h" (people can still pre-order).
//   end:    optional. When it ends, e.g. "2026-12-08 03:59".
//           While running it shows "Ends in 2d 5h", and a live 05:12:09 clock in
//           the last 24 hours. After the end it disappears from the page by itself.
//           Date only ("2026-12-08") is fine too: start = 00:00, end = 23:59.
//           Times are in WIB (see timezone at the bottom). Leave "" for none.
//           A sub-category or category can have start/end too — every service
//           inside it then uses those dates (unless it has its own).
//
// Remember the comma after each line, except it's fine to leave one on the last line.
//
// Example service line (copy this):
//   { name: "Service name", price: "Rp 10.000", note: "Short description", image: "img/pricelist/quest/example.jpg" },
//
// A category can also have sub-categories (like Permanent Event inside Event,
// or each province inside Exploration):
//   subgroups: [ { name: "Sub-category name", items: [ ...services... ] } ]
// A sub-category can have image: "..." too, shown small next to its name
// (e.g. a province emblem).
//
// ADD a province:   copy a whole { name: "Mengzhou", ... } block inside Exploration's
//                   subgroups: [ ... ] and change the name, emblem and cities.
// ADD a city:       add a service line inside that province's items: [ ... ].
//
// note (top of page): use " | " to split it into separate lines.
// order: the button at the bottom. Leave url as "" to hide it.
//   url:    where it goes — your Discord profile, so customers can DM you.
//   server: optional. Shows "Can't message me? Join my Discord server first"
//           under the button (Discord only allows DMs between people who share
//           a server or are friends). Leave "" to hide it.
//
// Order builder: visitors tap "Add" on services, see the total, and press
// "Copy order" to get a ready-made message to paste on Discord.
//   orderMessage: the first line of that copied message.
//   Prices are read from the price text: "Rp 15.000" counts as 15000, "Free"
//   counts as 0, anything else (e.g. "Ask me") shows as "price to confirm".

// Shared note used by several Daily / Account Care services below.
const INCLUDES = {
  en: "Includes 4 Endgame Content + Build/Pre-Farm Character on request",
  id: "Termasuk 4 Konten Endgame + Request Build/Pre-Farm Karakter"
};

window.PRICELIST = {
  title: "Pricelist",
  note: { en: "All prices are in IDR | Contact me on Discord to order", id: "Semua harga dalam IDR | Hubungi saya di Discord untuk order" },

  groups: [
    {
      name: "Endgame Content",
      note: { en: "Make sure your characters are properly built", id: "Pastikan karakter kamu sudah di-build dengan baik" },
      items: [
        { name: "Tower of Adversity", price: "Free", note: "Full Clear", image: "img/pricelist/endgame-content/Icon_Tower_of_Adversity.webp" },
        { name: "Whimpering Wastes", price: "Free", note: "Full Clear", image: "img/pricelist/endgame-content/Icon_Whimpering_Wastes.webp" },
        { name: "Endstate Matrix", price: "Rp 15.000", note: "Title 58K + Cycle Task | Aste Only: Free", image: "img/pricelist/endgame-content/Icon_Endstate_Matrix.webp" },
        // { name: "Endstate Matrix", price: "Free", note: "Aste Only", image: "img/pricelist/endgame-content/Icon_Endstate_Matrix.webp" },

      ]
    },
    {
      name: { en: "Exploration", id: "Eksplorasi" },
      note: { en: "All prices are for 100% map progress", id: "Semua harga untuk progres map 100%" },
      items: [],
      subgroups: [
        {
          name: "Mengzhou",
          image: "img/pricelist/exploration/mengzhou/Mengzhou_Emblem.webp",
          items: [
            { name: "Xuanfang Area", price: "Rp 100.000", note: "", image: "img/pricelist/exploration/mengzhou/Xuanfang_Hold.webp" },
            { name: "Simulacrum Nexus Of Mengzhou", price: "Rp 100.000", note: "", image: "img/pricelist/exploration/mengzhou/Simulacrum_Nexus_of_Mengzhou.webp" },
          
          ]
        },
        {
          name: "Roya Frostlands",
          image: "img/pricelist/exploration/roya-frostlands/Roya_Frostlands_Emblem.webp",
          items: [
            { name: "Lahai Roi", price: "Rp 115.000", note: "", image: "img/pricelist/exploration/roya-frostlands/Startorch_Academy.webp" },
            { name: "Frostland Surface", price: "Rp 80.000", note: "", image: "img/pricelist/exploration/roya-frostlands/Frostlands_Transit_Port.webp" },
            { name: "Dimmr Plains", price: "Rp 80.000", note: "", image: "img/pricelist/exploration/roya-frostlands/Sealed_Fissure.webp" },
          
          ]
        },
        {
          name: "Rinascita",
          image: "img/pricelist/exploration/rinascita/Rinascita_Emblem.webp",
          items: [
            { name: "Ragunna", price: "Rp 275.000", note: "", image: "img/pricelist/exploration/rinascita/Rinascita.webp" },
            { name: "Septimont", price: "Rp 100.000", note: "", image: "img/pricelist/exploration/rinascita/Capitoline_hill.webp" },
          
          ]
        },
        {
          name: "Black Shores",
          image: "img/pricelist/exploration/black-shores/The_Black_Shores_Emblem.webp",
          items: [
            { name: "The Black Shores", price: "Rp 50.000", note: "", image: "img/pricelist/exploration/black-shores/Black_Shores_Archipelago.webp" },
          
          ]
        },
        {
          name: "Jinzhou",
          image: "img/pricelist/exploration/jinzhou/Huanglong_Emblem.webp",
          items: [
            { name: "Jinzhou Area", price: "Rp 300.000", note: "", image: "img/pricelist/exploration/jinzhou/Jinzhou.webp" },
          
          ]
        },
        // Add another province by copying the block above, e.g.:
        // {
        //   name: "Province name",
        //   image: "img/pricelist/exploration/province-name/Province_Emblem.webp",
        //   items: [
        //     { name: "City name", price: "Rp 10.000", note: "", image: "" },
        //   ]
        // },
      ]
    },
    {
      name: "Event",
      items: [
        // Limited-time events go here.
        { name: "Unwritten Dreams Leisure Event", price: "Rp 30.000", note: {en : "Only Include Limited Time Rewards", id: "Hanya Termasuk Hadiah Waktu Terbatas"}, image: "img/pricelist/event/second-coming-of-solaris-unwritten-dreams.avif",
          start: "2026-11-12", end: "2026-12-21 11:59" },
        { name: "Turnabout Leisure Event", price: "Rp 15.000", note: {en : "", id: ""}, image: "img/pricelist/event/lahai-roi-blocks-turnabout.avif",
          start: "2026-11-19 04:00", end: "2026-12-03 03:59" },
        { name: "Lollo Campagin: Groundwork", price: "Rp 15.000", note: {en : "", id: ""}, image: "img/pricelist/event/lollo-campaign-groundwork.avif",
          start: "2026-12-03 10:00", end: "2026-12-17 03:59" },
        { name: "Dreamfield Odyssey", price: "Rp 15.000", note: {en : "", id: ""}, image: "img/pricelist/event/dreamfield-odyssey-combat-event.avif",
          start: "2026-12-03 10:00", end: "2026-12-21 03:59" },
      ],
      subgroups: [
        {
          name: "Permanent Event",
          items: [
            // { name: "Service name", price: "Rp 10.000", note: "", image: "" },
          ]
        }
      ]
    },
    {
      name: "Quest",
      items: [
        { name: "Main Quests", price: "Rp 15.000", note: "Per Chapter", image: "img/pricelist/quest/Icon_Main_Quests.webp" },
        { name: "Side Quests", price: "Rp 5.000", note: { en: "Per 3 Quests", id: "Per 3 Quest" }, image: "img/pricelist/quest/Icon_Side_Quests.webp" },
        { name: "Exploration Quests", price: "Rp 10.000", note: { en: "Per Quest, Tales Quest counts as an exploration quest", id: "Per Quest, Tales Quest dihitung sebagai exploration quest" }, image: "img/pricelist/quest/Icon_Exploration_Quests.webp" },
      ]
    },
    {
      name: { en: "Daily / Account Care", id: "Daily / Rawat Akun" },
      items: [
        { name: { en: "Daily Login 7 Days", id: "Daily Login 7 Hari" }, price: "Rp 15.000", note: { en: "Includes 4 Endgame Content + Waveplate on request", id: "Termasuk 4 Konten Endgame + Request Waveplate" }, image: "" },
        { name: { en: "Daily Login 30 Days", id: "Daily Login 30 Hari" }, price: "Rp 50.000", note: INCLUDES, image: "" },
        { name: { en: "Account Care 42 Days + Limited Event + New Main Story Quest", id: "Rakun 42 Hari + Event Limited + Main Story Quest Baru" }, price: "Rp 150.000", note: INCLUDES, image: "" },
        { name: { en: "Account Care 42 Days + Limited Event + New Main Story Quest + Explore New Areas", id: "Rakun 42 Hari + Event Limited + Main Story Quest Baru + Explore Area Baru" }, price: "Rp 250.000", note: INCLUDES, image: "" },
      ]
    }
  ],

  order: {
    label: { en: "DM me on Discord", id: "DM Ke Discord" },
    url: "https://discord.com/users/716269644301729873",
    server: "https://discord.gg/6YjXMjk92d"
  },
  orderMessage: { en: "Hi Cruzer, I'd like to order:", id: "Halo Cruzer, saya mau order:" },

  // Timezone for start/end dates above. "+07:00" = WIB, "+08:00" = WITA, "+09:00" = WIT.
  // Visitors anywhere in the world still see the correct countdown.
  timezone: "+07:00"
};
