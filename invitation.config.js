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
  experience: {
    pageWidth: "600px",
    smoothScroll: true,
    sectionTransitions: true,
    nextPageLabel: "Reveal our date",
    petals: {
      enabled: true,
      count: 20,
      colours: ["#d6ab93", "#c6ab76", "#a6ac91"],
      deepColours: ["#a75f51", "#967443", "#687557"],
      deepOpacity: 0.68,
      opacity: 0.42,
      durationSeconds: 19,
    },
    birds: {
      enabled: true,
      count: 4,
      colour: "#826d54",
      opacity: 0.55,
      durationSeconds: 24,
    },
  },
  sectionOrder: ["invitation", "saveTheDate"],
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
    saveTheDate: {
      enabled: true,
      background: "assets/save-the-date-background.png",
      backgroundPosition: "center center",
      // Keep the floral artwork clear. Readability comes from the card itself.
      backgroundOpacity: 1,
      backgroundBlur: "0px",
      whiteScreenOpacity: 0,
      textWashOpacity: 0,
      layout: {
        topPadding: "clamp(44px, 14cqi, 84px)",
        logoSize: "clamp(100px, 30cqi, 132px)",
        logoGap: "clamp(22px, 6cqi, 36px)",
      },
      monogram: {
        image: "assets/tr-monogram-refined.png",
        alt: "T R gold botanical wedding monogram",
        initials: ["T", "R"],
        floating: true,
        floatDurationSeconds: 7,
      },
      scratch: {
        heading: "Scratch to reveal our special day",
        coverLabel: "SCRATCH TO REVEAL",
        coverSubtitle: "our special day",
        revealButton: "Or tap to reveal",
        revealThreshold: 0.38,
        brushSize: 28,
        coverColours: ["#f4e9d5", "#e5d0ab", "#f1e2c9"],
        coverTextColour: "#735139",
        coverSubtitleColour: "#735139",
      },
      wedding: {
        // Countdown target: start of 21 November, in Kolkata (IST).
        dateTime: "2026-11-21T00:00:00+05:30",
        timeZone: "Asia/Kolkata",
        locale: "en-IN",
        ordinalDay: true,
        label: "SAVE THE DATE",
        location: "KOLKATA",
      },
      countdown: {
        heading: "THE COUNTDOWN BEGINS",
        labels: ["Days", "Hours", "Minutes", "Seconds"],
        footer: "Until our forever begins",
        completeMessage: "Our special day is here!",
      },
    },
  },
};
