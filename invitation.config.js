// Edit this file to personalise the invitation. Image paths are relative to index.html.
// The order of sectionOrder controls the page sections; more sections can be added later.
window.INVITATION_CONFIG = {
  meta: {
    title: "Roli & Tushar — Wedding Invitation",
    description: "With the blessings of our families, we invite you to celebrate the wedding of Roli and Tushar.",
    language: "en",
  },
  theme: {
    paper: "#faf3e9",
    ink: "#49372b",
    accent: "#735139",
    gold: "#b59659",
    bodyFont: '"EB Garamond", Georgia, serif',
    nameFont: '"Great Vibes", cursive',
    background: "assets/palace-gate-warm.png",
    backgroundPosition: "center bottom",
    backgroundOpacity: 0.85,
    backgroundBlur: "1.5px",
    whiteScreenOpacity: 0.2,
    // A warm ivory wash keeps the family details readable over the palace artwork.
    textWashOpacity: 0.84,
    entranceAnimation: true,
  },
  sectionOrder: ["invitation"],
  sections: {
    invitation: {
      enabled: true,
      ganesh: {
        image: "assets/ganeshji.png",
        alt: "Lord Ganesha blessing the wedding",
      },
      blessing: "॥ ॐ श्री गणेशाय नमः ॥",
      blessingLanguage: "hi",
      introduction: "We request the honor of your gracious presence on the auspicious occasion of the wedding celebration of",
      // Swap these keys to change the order of the couple.
      personOrder: ["bride", "groom"],
      connector: "weds",
      people: {
        groom: {
          name: "Tushar",
          parents: "S/o Mrs. Madhu & Mr. Omm Prakash Saraogi",
          grandparents: "Grandson of Late Mrs. Sarda Devi & Late Mr. Murari Lal Saraogi",
        },
        bride: {
          name: "Roli",
          parents: "D/o Mrs. Nikita & Mr. Vikash Agarwal",
          grandparents: "Granddaughter of Late Mrs. Bimla & Late Mr. RadheShyam Agarwal",
        },
      },
    },
  },
};
