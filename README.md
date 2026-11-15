# सहोडवा कर्मचारी एसोसिएसन
## Sahodawa Karmachari Association

A premium, responsive community-association website, designed for visitors in **Bajjika (बज्जिका) by default**, with Nepali and English available from the language selector. Hosted on GitHub Pages.

> **Status:** The visual identity is a proposed design. Official committee, notice and contact information have not yet been supplied or verified. This website is **not a government portal**.

### What works

- Three-language switching with a visitor's preference remembered in their browser
- Mobile navigation, focus indicators, skip navigation, and contextual active-section highlighting
- Notice board with category filters, full-text search and document links **when officially approved notice records are published**
- Data-driven executive committee cards **only for officially verified profiles**
- Private membership interest form: **Download draft** and **Print / Save as PDF** (both local; no personal data sent to a server)
- Website sharing (native share sheet where supported, clipboard fallback)
- FAQ accordion and accessible status feedback
- Responsive, no fake membership statistics, and no fictional committee portraits

### Architecture

Static HTML, CSS and modern JavaScript. No external framework or runtime, no authentication, no database and no build step for deployment.

```
index.html                      Main trilingual website
assets/css/style.css            Design system and responsive styles
assets/js/main.js               Language switching and interactive features
assets/img/favicon.svg          Provisional graphic mark
content/notices.json            Published announcements (currently empty)
content/committee.json          Verified people directory (currently empty)
docs/CONTENT_GUIDE.md           Content publication instructions
tests/languages.spec.js         Playwright browser regression tests
.github/workflows/              GitHub Pages publishing and QA
```

### Content editing

Read **[the publishing guide](docs/CONTENT_GUIDE.md)** before changing notices, membership instructions or official names. The Bajjika copy is a starting draft and should be reviewed by speakers from the Sahodawa area before formal publication.

### Run locally

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`. A local HTTP server is required for the JSON content files; opening `index.html` as a `file://` URL does not reliably allow content loading.

### Browser tests

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

### Publishing

GitHub Pages deploys automatically from `main` through `.github/workflows/deploy.yml`. Live website (once Pages is enabled):

https://bivekumarsah.github.io/Sahodawa-karmachari-Association/

### Functional limits

GitHub Pages cannot safely store membership submissions or provide user logins by itself. The membership tool generates a downloadable/printable *draft*, not an online application submitted to the association. For authenticated admin editing, event registration, or online submissions, add a secure backend in a future phase.
