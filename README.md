# Swapnil & Ritu — Wedding Invitation

The first invitation page uses Purvi's original palace background, Ganeshji at the top, “ॐ गणेशाय नमः”, and Swapnil and Ritu's family details from the reference screenshot.

## Preview

Run `npm start` (or `node preview-server.cjs`) and open http://127.0.0.1:4173. No dependencies or build step are required. The page can also be opened directly from `index.html`.

## Personalise

Edit **invitation.config.js** for all client content and theme settings:

- `meta`: page title, description, and language.
- `theme`: colours, fonts, background path, opacity, and entrance animation.
- `sectionOrder`: ordering of implemented website sections.
- `sections.invitation`: Ganeshji image, mantra, invitation wording, couple order, names, parents, and grandparents.

Only the invitation section is implemented in this first stage. Events, their order, venue links, and other sections will be added to this same configuration as the website grows. No wedding dates or venue details have been invented.

Images and fonts are stored in `assets/`, and their paths are controlled through the configuration. No analytics or external scripts are included.

## Asset sources

- Palace artwork: recovered unchanged from the original Purvi & Yash invitation at `https://purviandyashweddinginvite.lovable.app/__l5e/assets-v1/dbffe025-a268-4a9c-8db0-38e363294e16/palace-gate.png`.
- Fonts: Great Vibes and EB Garamond, downloaded from Google Fonts and served locally.
- Ganeshji: generated gold invitation illustration; see `assets/ganeshji-prompt.txt` for the prompt.

Family names were transcribed from the supplied screenshot and remain editable in the configuration.
