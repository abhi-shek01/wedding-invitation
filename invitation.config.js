// Edit this file to personalise the invitation. Image paths are relative to index.html.
// The order of sectionOrder controls the page sections; more sections can be added later.
window.INVITATION_CONFIG = {
  meta: {
    title: "Swapnil & Ritu — Wedding Invitation",
    description: "With the blessings of our families, we invite you to celebrate the wedding of Swapnil and Ritu.",
    language: "en",
  },
  theme: {
    paper: "#fffaf2",
    ink: "#573b35",
    burgundy: "#a9193e",
    gold: "#b08b49",
    bodyFont: '"EB Garamond", Georgia, serif',
    nameFont: '"Great Vibes", cursive',
    background: "assets/palace-gate.png",
    backgroundPosition: "center bottom",
    backgroundOpacity: 0.6,
    // A light wash keeps the family details readable over the original palace artwork.
    textWashOpacity: 0.76,
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
      blessing: "ॐ गणेशाय नमः",
      blessingLanguage: "hi",
      introduction: "We request the honor of your gracious presence on the auspicious occasion of the wedding celebration of",
      // Move bride before groom here to change the order of the couple.
      personOrder: ["groom", "bride"],
      connector: "weds",
      people: {
        groom: {
          name: "Swapnil",
          parents: "S/o Mr. Srinivas Gudimalla & Mrs. Sunitha Gudimalla",
          grandparents: "Grandson of Late Mr. Ramulu & Mrs. Gour Bai",
        },
        bride: {
          name: "Ritu",
          parents: "D/o Mr. Manoj Kumar Pathak & Mrs. Bachchi Devi",
          grandparents: "Granddaughter of Mr. Shosakan Pathak & Late Mrs. Prabha Devi",
        },
      },
    },
  },
};
