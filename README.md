# Roli & Tushar — Wedding Invitation

The first invitation page uses a recreated version of Purvi's palace background in the ivory, peach, champagne, and muted olive watercolour style of the supplied next-page floral image. Ganeshji appears at the top, followed by “ॐ गणेशाय नमः” and Roli and Tushar's family details.

## Preview

Run `npm start` (or `node preview-server.cjs`) and open http://127.0.0.1:4173. No dependencies or build step are required. The page can also be opened directly from `index.html`.

## Personalise

Edit **invitation.config.js** for all client content and theme settings:

- `meta`: page title, description, and language.
- `theme`: colours, fonts, background path, opacity, and entrance animation.
- `theme.backgroundBlur` and `theme.whiteScreenOpacity`: background blur and the light white overlay. Use `"0px"` and `0` to remove them. Text and Ganeshji stay sharp.
- `sectionOrder`: ordering of implemented website sections.
- `experience`: shared page width, smooth scrolling, section entrance animations, the next-page link, and floating petal colours, count, opacity, and speed. Both pages share a portrait canvas on desktop and fill the available width on mobile. Petals ignore pointer input, pause in background tabs, and are hidden when reduced motion is preferred.
- `experience.petals.deepColours` and `deepOpacity`: deeper petals mixed with the light palette. `experience.birds` controls the small birds flying across both pages. `sections.saveTheDate.monogram.floating` and `floatDurationSeconds` control the logo's gentle motion. All decorative motion respects reduced-motion preferences.
- `sections.saveTheDate.wedding.ordinalDay`: adds English date suffixes such as “21st”. On mobile, the revealed card and countdown sit above the landmarks, with the closing line placed at the bottom of the artwork.
- `sections.invitation`: Ganeshji image, mantra, invitation wording, couple order, names, parents, and grandparents.

- `sections.saveTheDate`: second-page background, monogram, headings, scratch-card settings, wedding date/time/timezone, and countdown labels. Set `monogram.image` to a local asset path to use the final logo.

The second page keeps the Adele & Alven floral background fully visible without a page-wide wash or blur. A simple T R gold wreath logo sits beneath the floral curve, followed by a clear gap and a champagne scratch card revealing 21 November 2026, Kolkata. Logo size and spacing are adjustable in `sections.saveTheDate.layout`. The countdown appears and starts updating only after scratching or using the keyboard-accessible reveal button. Its target is midnight IST at the start of the wedding date, pending a ceremony time. Both pages can be reordered or hidden from the same configuration.

Events, their order, venue links, and other sections will be added to this same configuration as the website grows.

Images and fonts are stored in `assets/`, and their paths are controlled through the configuration. No analytics or external scripts are included.

## Asset sources

- Current palace artwork: `assets/palace-gate-warm.png`, recreated with the built-in image tool using the original palace as the edit target and the user's floral image as the style reference. The exact prompt is saved in `assets/palace-gate-warm-prompt.txt`.
- Original palace artwork (preserved): recovered from the original Purvi & Yash invitation at `https://purviandyashweddinginvite.lovable.app/__l5e/assets-v1/dbffe025-a268-4a9c-8db0-38e363294e16/palace-gate.png`.
- Next-page background reference: the user's supplied image is preserved as `assets/next-page-floral-reference.png`; it is not rendered on the first page.
- Second-page background: copied unchanged from the user's specified Adele & Alven file into `assets/save-the-date-background.png`.
- Second-page logo: the selected simple T R gold botanical wreath, created with the built-in image tool from the user's references and saved as `assets/tr-monogram-refined.png`. The initials are retained pending the client's details; the prompt is saved in `assets/tr-monogram-refined-prompt.txt`. The earlier floral version is preserved as `assets/tr-monogram.png`.
- Fonts: Great Vibes and EB Garamond, downloaded from Google Fonts and served locally.
- Ganeshji: generated gold invitation illustration; see `assets/ganeshji-prompt.txt` for the prompt.

Family names were transcribed from the supplied screenshot and remain editable in the configuration.
