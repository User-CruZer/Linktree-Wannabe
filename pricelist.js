// ── Pricelist content ───────────────────────────────────────────
// This is the only file you need to edit for the pricelist page.
// Save, then commit + push to GitHub and the page updates.
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
//   image:  optional preview picture. Put the file in img/pricelist/ and write
//           its path, e.g. "img/pricelist/tower.jpg". A full https:// link also works.
//           Leave out or "" for no picture. Visitors tap it to see it full size.
//
// Remember the comma after each line, except it's fine to leave one on the last line.
//
// Example service line (copy this):
//   { name: "Service name", price: "Rp 10.000", note: "Short description", image: "img/pricelist/example.jpg" },
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

window.PRICELIST = {
  title: "Pricelist",
  note: "All prices are in IDR | Contact me on Discord to order",

  groups: [
    {
      name: "Endgame Content",
      note: "Make sure your characters are properly built",
      items: [
        { name: "Tower of Adversity", price: "Free", note: "Full Clear", image: "img/pricelist/Icon_Tower_of_Adversity.webp" },
        { name: "Whimpering Waste", price: "Free", note: "Full Clear", image: "img/pricelist/Icon_Whimpering_Wastes.webp" },
        { name: "Endstate Matrix", price: "Rp 15.000", note: "Title 58K + Cycle Task | Aste Only: Free", image: "img/pricelist/Icon_Endstate_Matrix.webp" },
        // { name: "Endstate Matrix", price: "Free", note: "Aste Only", image: "img/pricelist/Icon_Endstate_Matrix.webp" },

      ]
    },
    {
      name: "Exploration",
      items: [],
      subgroups: [
        {
          name: "Mengzhou",
          image: "img/pricelist/Mengzhou_Emblem.webp",
          items: [
            { name: "Xuanfang Area", price: "Rp 100.000", note: "100% Map Progress", image: "img/pricelist/Xuanfang_Hold.webp" },
            { name: "Simulacrum Nexus Of Mengzhou", price: "Rp 100.000", note: "100% Map Progress", image: "img/pricelist/Simulacrum_Nexus_of_Mengzhou.webp" },
          
          ]
        },
        {
          name: "Roya Frostlands",
          image: "img/pricelist/Roya_Frostlands_Emblem.webp",
          items: [
            { name: "Lahai Roi", price: "Rp 115.000", note: "100% Map Progress", image: "img/pricelist/Startorch_Academy.webp" },
            { name: "Frostland Surface", price: "Rp 80.000", note: "100% Map Progress", image: "img/pricelist/Frostlands_Transit_Port.webp" },
            { name: "Dimmr Plains", price: "Rp 80.000", note: "100% Map Progress", image: "img/pricelist/Sealed_Fissure.webp" },
          
          ]
        },
        // Add another province by copying the block above, e.g.:
        // {
        //   name: "Province name",
        //   image: "img/pricelist/Province_Emblem.webp",
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
        // { name: "Service name", price: "Rp 10.000", note: "", image: "" },
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
        // { name: "Service name", price: "Rp 10.000", note: "", image: "" },
      ]
    },
    {
      name: "Daily/Rawat Akun",
      items: [
        // { name: "Service name", price: "Rp 10.000", note: "", image: "" },
      ]
    }
  ],

  order: { label: "Order on Discord", url: "https://discord.gg/6YjXMjk92d" }
};
