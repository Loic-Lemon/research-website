# Design Log

Keep dated entries and their snapshots when the design changes, so earlier choices remain available.

## 2026-10-24 — Background And Homepage Introduction

**Status:** Applied to the site. The Lora + Lato typography direction remains saved as a separate preview.

- Renamed Timeline to **Background** in the main and page-not-found navigation. Existing `?section=timeline` links continue to work.
- Shortened the homepage introduction to: “I'm Loic, a PhD student in the School of Computer Science and Informatics at Cardiff University + AGILE Lab, under the supervision of Dr Nick Pham.”
- Moved the original full biography, including BSc honours/dissertation award, MPhil research/viva outcome and current PhD supervision, to the top of Background, above Education and Experience.
- Removed the repeated opening introduction from Background, which now starts with the BSc details.
- Applied the existing theme accent to the homepage introduction's bold text: PhD student, Cardiff University and AGILE Lab.
- Kept the original biography formatting, links and decorative motion. The earlier snapshots below remain intact.

## 2026-10-23 — Lora + Lato

**Status:** Preferred direction, approved for reference. The live site has not been changed to use it.

**Brief:** A professional research website that feels warm, casual, fun and readable. Keep Title Case headings and the existing decorative motion. Use consistent typography within individual highlights, publications, projects, timeline entries and awards.

### Saved references

- [Frozen Lora + Lato preview](design-snapshots/2026-10-23-lora-lato/lora-lato.html). Open this file in a browser; it defaults to the preferred pairing and shows the highlights first. Choose Start for the full homepage. Content, images, styles and demo interactions are embedded; Google Fonts needs an internet connection.
- [Current site styling baseline](design-snapshots/2026-10-23-lora-lato/current-site-styles.zip). Contains the 27 style-bearing app/component files, Tailwind config and formatted biography source as they existed before applying this direction, including working-tree edits.
- [Snapshot manifest](design-snapshots/2026-10-23-lora-lato/manifest.json). Records the capture time, Git base commit and SHA-256 hashes of the archived source and frozen preview.

The snapshot files are separate from the evolving experiments in `work/typography-demo/`.

### Preferred typography

Use **Lora** for the name and section headings. Use **Lato** for navigation, body text and every part of an individual entry, including its title, description and metadata.

| Role | Font | Size / line height | Weight |
| --- | --- | --- | --- |
| Name | Lora | 34px / 1.16; 30px at widths up to 600px | 400 |
| Section heading | Lora | 24px / 1.25 | 500 |
| Item title | Lato | 16px / 1.5 | 700 |
| Item description | Lato | 16px / 1.625 | 400 |
| Metadata: dates, categories, authors | Lato | 14px / 1.5 | 400 |
| Intro and research prose | Lato | 17px / 1.65 | 400 |
| Main navigation | Lato | 15px; upright | 400; active link emphasised |
| Captions | Lato | 14px / 1.5; italic | 400 |
| Pronunciation | Lato | 13px; italic | 400 |

Font stacks: `Lora, Georgia, serif` and `Lato, Arial, sans-serif`. The preview requests Lora 400/500, Lato 400/700 and Lato italic 400.

### Consistency rules

- Keep headings capitalised as **My Research** and **Recent Highlights**. Use normal letter spacing, with no uppercase transform on these headings.
- Within each entry, keep the same Lato family. Title and description share the same size; weight establishes the title. Dates and other metadata share one smaller, quieter treatment.
- Apply those item roles across highlights, research projects, publications, timeline entries and awards. Publication authors use the metadata style.
- Keep metadata upright, at regular weight, without decorative tracking or accent-blue dates.
- Keep descriptions close to the title's text colour: foreground at 90% opacity. Use the muted colour for metadata.
- Keep navigation upright. Make supporting labels and links readable rather than faint.
- Reduce scattered bold emphasis in the biography; retain emphasis for the opening role and linked lab name.
- Use a subtle section rule, 8px below the heading and 24px before the following content.

### Colour and layout

Retain the existing two-column desktop layout, responsive mobile layout and warm page background.

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#fffcf8` | `#16181c` |
| Foreground | `#0f0f0f` | `#e8ebf0` |
| Muted text | `#41414b` | `#a8aeb8` |
| Border | `#e5e5e5` | `#343942` |
| Accent | `#194bd2` | `#8cb0e0` |

Keep blue for links and navigation states. Preserve image rounding, portrait shadows and existing site content.

### Motion and personality

**Do not remove the decorative motion.** Preserve the portrait ink effect, crossfade, pulse and shimmer; moving link arrows; page transitions; image preview transitions; animated menu; and existing award effects. Keep emojis and icons. Preserve the existing reduced-motion behaviour.

The frozen preview retains the portrait effect and the relevant hover styles. It is a typography prototype: project detail pages and every original application interaction are not reproduced. Use the baseline source archive as the reference for the site's complete motion implementation.

### Baseline before adoption

The current application still imports Geist, Geist Mono, Noto Serif and PT Serif. Body and navigation use Geist. The serif stack starts with `ui-serif`, followed by PT Serif, Noto Serif and Georgia, so the rendered serif can vary by platform.

The current site uses uppercase, tracked, bold serif section headings; italic desktop navigation; and separate size/weight/colour treatments for dates, item titles and descriptions. The Lora + Lato preview replaces those typography rules while retaining the site's personality and motion.

### Returning to this version

To revisit **Lora + Lato**, open the frozen preview and use the rules above with the preview's embedded CSS as the exact visual reference. The demo defaults to `variant=lora`; `page=start` shows the full homepage.

To return to the **earlier site styling**, compare the relevant files in `current-site-styles.zip` with the working tree and reapply the styling differences. The archive contains complete source files, so preserve later content and logic changes when restoring styles. It is a styling source snapshot, not a complete project backup.

When choosing another direction, append a new dated entry and create a new snapshot directory. Keep this entry and its saved files intact.
