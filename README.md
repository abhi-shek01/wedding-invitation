# Swapnil & Ritu — Wedding Invitation

The first invitation page uses a recreated version of Purvi's palace background in the ivory, peach, champagne, and muted olive watercolour style of the supplied next-page floral image. Ganeshji appears at the top, followed by “ॐ गणेशाय नमः” and Swapnil and Ritu's family details from the reference screenshot.

## Preview

Run `npm start` (or `node preview-server.cjs`) and open http://127.0.0.1:4173. No dependencies or build step are required. The page can also be opened directly from `index.html`.

## Personalise

Edit **invitation.config.js** for all client content and theme settings:

- `meta`: page title, description, and language.
- `theme`: colours, fonts, background path, opacity, and entrance animation.
- `theme.backgroundBlur` and `theme.whiteScreenOpacity`: background blur and the light white overlay. Use `"0px"` and `0` to remove them. Text and Ganeshji stay sharp.
- `sectionOrder`: ordering of implemented website sections.
- `sections.invitation`: Ganeshji image, mantra, invitation wording, couple order, names, parents, and grandparents.

Only the invitation section is implemented in this first stage. Events, their order, venue links, and other sections will be added to this same configuration as the website grows. No wedding dates or venue details have been invented.

Images and fonts are stored in `assets/`, and their paths are controlled through the configuration. No analytics or external scripts are included.

## Asset sources

- Current palace artwork: `assets/palace-gate-warm.png`, recreated with the built-in image tool using the original palace as the edit target and the user's floral image as the style reference. The exact prompt is saved in `assets/palace-gate-warm-prompt.txt`.
- Original palace artwork (preserved): recovered from the original Purvi & Yash invitation at `https://purviandyashweddinginvite.lovable.app/__l5e/assets-v1/dbffe025-a268-4a9c-8db0-38e363294e16/palace-gate.png`.
- Next-page background reference: the user's supplied image is preserved as `assets/next-page-floral-reference.png`; it is not rendered on the first page.
- Fonts: Great Vibes and EB Garamond, downloaded from Google Fonts and served locally.
- Ganeshji: generated gold invitation illustration; see `assets/ganeshji-prompt.txt` for the prompt.

Family names were transcribed from the supplied screenshot and remain editable in the configuration.
