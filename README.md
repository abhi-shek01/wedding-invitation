# Roli & Tushar — Wedding Invitation

A floral Radha–Krishna cover opens the three invitation pages: Welcome, Save the Date and Events. A decorative R | T wreath sits high above the italic `#foreverRoShar` hashtag. A bright peacock feather starts large at the top right, shrinks along a smooth S-shaped flight and rests diagonally on the matching R | T wreath seal. The larger seal becomes tappable after landing. The magic message then changes to an envelope icon beside “Tap to open” in one centred row; the icon and text pulse together beneath the seal. Both the seal and the cue open Welcome with a gentle expansion and crossfade. Direct section links remain usable. Keyboard users can open the ready seal with Enter or Space; reduced-motion preferences place the feather immediately and skip the opening transition.

The first invitation page uses a Prinsep Ghat riverside watercolour background in ivory, peach, champagne and muted sage to match the other Kolkata pages. Flowers frame the edges, with the pavilion and a wooden boat near the bottom and an open ivory centre for the text. Ganeshji appears at the top, followed by “॥ ॐ श्री गणेशाय नमः ॥” and Roli and Tushar's family details, with the bride listed first.

## Preview

Run `npm start` (or `node preview-server.cjs`) and open http://127.0.0.1:4173. No dependencies or build step are required. The page can also be opened directly from `index.html`.

## Personalise

Edit **invitation.config.js** for all client content and theme settings:

- `meta`: page title, description, and language.
- `theme`: colours, fonts, background path, opacity, and entrance animation.
- `theme.backgroundBlur` and `theme.whiteScreenOpacity`: background blur and the light white overlay. Use `"0px"` and `0` to remove them. Text and Ganeshji stay sharp.
- `sectionOrder`: ordering of implemented website sections.
- `experience`: shared page width, smooth scrolling, section entrance animations, the next-page link, and floating petal colours, count, opacity, and speed. All pages share a portrait canvas on desktop and fill the available width on mobile. Petals ignore pointer input, pause in background tabs, and are hidden when reduced motion is preferred.
- `experience.nextPageColour` and `nextPagePulse`: maroon navigation prompts with a gentle pulse. With `nextPageHideAfterVisit` enabled, a prompt stays visible until its destination is reached, and reappears when scrolling back to its source page. Scrolling within the current page does not dismiss it.
- `experience.syncPageHash` keeps the URL tag aligned with the visible section while scrolling. `coverOnRefresh` returns a refreshed invitation to its cover; fresh direct section links still work.
- `experience.audio`: the supplied looping wedding track, enabled by default from the cover, volume and fixed bottom-right toggle settings. One shared player continues across sections; tapping the button pauses/resumes it without restarting the track. If the browser blocks audible autoplay, it starts on the first interaction while music is enabled. Turning it off prevents subsequent page interactions from restarting it. The preview server serves MP3 files with byte ranges for mobile playback.
- `experience.petals.deepColours` and `deepOpacity`: deeper petals mixed with the light palette. `experience.birds` controls the flying birds. Each effect's `sections` list limits it to Welcome (`invitation`) and Save the Date (`saveTheDate`). Layers are contained within those pages, so the cover and Events have no floating petals or birds. `sections.saveTheDate.monogram.floating` and `floatDurationSeconds` control the logo's gentle motion. All decorative motion respects reduced-motion preferences.
- `sections.saveTheDate.wedding.ordinalDay`: adds English date suffixes such as “21st”. On mobile, the revealed card and countdown sit above the landmarks, with the closing line placed at the bottom of the artwork.
- `sections.invitation`: Ganeshji image, mantra, invitation wording, couple order, names, parents, and grandparents.
- `sections.cover`: cover artwork, decorative R | T logo, hashtag/font/style, feather asset, seal logo, waiting/ready hints, envelope folds and opening duration. `featherLandingMilliseconds` controls the drift duration; `featherFlight` sets the starting size, final size (`landingScale`), angle and cubic curves. The smaller landed feather sits behind the opaque seal so its stem is tucked underneath. `layout` controls the top logo, hashtag size and envelope seal size/position. Disable it with `enabled: false`; all invitation sections still follow `sectionOrder`.

- `sections.saveTheDate`: second-page background, monogram, headings, scratch-card settings, wedding date/time/timezone, and countdown labels. Set `monogram.image` to a local asset path to use the final logo. `hashtag` inherits the cover's text and font, with configurable italic style, size and gaps above/below; it sits centred between the logo and scratch card.
- `sections.saveTheDate.celebration`: enables a brief wedding petal shower when the date is revealed, and controls its particle count, duration and colours. Scratching and tapping trigger the same cascade of scattered blush and peach rose petals with a few champagne glints. It ignores pointer input, removes itself after finishing and respects reduced-motion preferences. Birds flap both wings together and follow varied rising and dipping paths in both directions.

The second page keeps the Adele & Alven floral background fully visible without a page-wide wash or blur. A simple R | T gold wreath logo sits beneath the floral curve, followed by a clear gap and a champagne scratch card revealing 21 November 2026, Kolkata. Logo size and spacing are adjustable in `sections.saveTheDate.layout`. The countdown appears and starts updating only after scratching or using the keyboard-accessible reveal button. Its target is midnight IST at the start of the wedding date, pending a ceremony time. All pages can be reordered or hidden from the same configuration.

The third page uses `sections.events`: `eventOrder` controls the six card positions, `items` holds each event's name, ceremony, date/time, image and optional image framing (`imageFit` / `imagePosition`), and `venues` holds reusable venue names, full addresses and map links. Each card uses rows on mobile and desktop: a full-width illustration first, followed by a single-line event title on the left with calendar/date and clock/time on the right. Common ceremony labels are omitted. Event titles use the same Great Vibes script font as the former labels. Cards have a narrower desktop width and shorter 4:3 image frames; image cropping defaults to cover at center 65% and can be adjusted per event through imageFit and imagePosition. The address and directions button remain side by side below; there is no add-to-calendar button. Cards have matching heights, and the directions button never creates a separate row. The smaller “Celebrations” heading has no timezone note unless `timeNote` is filled in. The background stays at a natural portrait scale as the longer schedule scrolls, and cards enter gently as they become visible.

Sangeet is set to 6 PM onwards on 20 November 2026, interpreting the supplied “6m onwards” text. The event titles are “Ek Shaam Shyam Ke Naam”, “Biro Bhaat Bharan Ne Aayo”, “Shaam-e-Sangeet”, “Rang Chada Haldi Ka”, “Band Baja Baraat” and “Saat Phere, Saat Vachan”; all titles remain editable. Venue addresses were checked against the supplied Google Maps destinations on 3 October 2026. The wedding destination is 12, Hungerford Street, Mullick Bazar, Park Street area, Kolkata 700017.

Radhe Palace's map link was updated to `https://maps.app.goo.gl/WfWGf5iBt5UEnim66` and Hungerford Street's to `https://maps.app.goo.gl/jrHQdyr3SJ93KFRVA` as supplied by the client. Each venue's shared link applies to both of its event cards.

Images and fonts are stored in `assets/`, and their paths are controlled through the configuration. No analytics or external scripts are included.

## Asset sources

- Envelope feather: `assets/peacock-feather-client.png`, copied unchanged from the client's selected transparent PNG, supplies both the flight and landed feather. The earlier generated versions remain preserved as `assets/peacock-feather.png` and `assets/peacock-feather-bright.png`. The envelope seal uses the same `rt-monogram-refined.png` wreath as the top logo.
- Cover artwork: `assets/radha-krishna-cover.png`, created with the built-in image tool using the supplied Radha–Krishna image as visual inspiration. The prompt is saved in `assets/radha-krishna-cover-prompt.txt`. Its layout follows the user's Adele cover video, with the envelope folds and text rendered separately.

- Current first-page artwork: `assets/prinsep-ghat-warm-v2.png`, generated and refined with the built-in image tool to depict Prinsep Ghat and the Hooghly in the invitation suite's floral watercolour palette. The riverside scene sits beneath the text. The prompts are saved in `assets/prinsep-ghat-warm-prompt.txt`.
- Previous warm palace artwork (preserved): `assets/palace-gate-warm.png`; its prompt is saved in `assets/palace-gate-warm-prompt.txt`.
- Original palace artwork (preserved): recovered from the original Purvi & Yash invitation at `https://purviandyashweddinginvite.lovable.app/__l5e/assets-v1/dbffe025-a268-4a9c-8db0-38e363294e16/palace-gate.png`.
- Next-page background reference: the user's supplied image is preserved as `assets/next-page-floral-reference.png`; it is not rendered on the first page.
- Second-page background: copied unchanged from the user's specified Adele & Alven file into `assets/save-the-date-background.png`.
- Events background: Adele & Alven's `bg2-CVkM9Qpf.png`, copied unchanged into `assets/events-background.png` for its matching ivory, peach, sage and Kolkata artwork.
- Event card illustrations: Purvi & Yash's `1.jpg` through `6.jpg`, copied unchanged into `assets/events/`. The Bhajan Sandhya and Bhaat use temporary celebration illustrations from that set, pending client-specific artwork.
- Second-page logo: the selected simple R | T gold botanical wreath, created with the built-in image tool from the user's references and saved as `assets/rt-monogram-refined.png`. The initials are ordered R | T. The built-in image tool edits the original artwork and matches its champagne gold; `theme.monogramFilter` applies the shared colour calibration to the cover, seal and save-the-date logo. The prompt is saved in `assets/rt-monogram-refined-prompt.txt`. The earlier floral version is preserved as `assets/tr-monogram.png`.
- Fonts: Great Vibes and EB Garamond, downloaded from Google Fonts and served locally.
- Ganeshji: generated gold invitation illustration; see `assets/ganeshji-prompt.txt` for the prompt.

Family names were supplied by the client and remain editable in the configuration.
- Music: `assets/audio/wedding-music.mp3`, copied unchanged from the supplied `ReelAudio-16763.mp3`.
