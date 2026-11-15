# Sahodawa Karmachari Association

Official website project for **Sahodawa Karmachari Association** (सहोडवा कर्मचारी एसोसिएसन).

A bilingual, responsive, accessible static association portal hosted with GitHub Pages.

## Features
- **Bajjika-first (बज्जिका)** with Nepali and English language options (Bajjika is the default on a fresh visit)
- About, mission, values, committee, notices, initiatives, membership and contact sections
- Searchable/filterable notice board powered by `assets/js/main.js`
- Private, browser-only membership application draft export (no server data collection)
- Responsive navigation, accessible controls and SEO metadata
- Automatic GitHub Pages deployment workflow

## Content management
Edit `index.html` for organization details and translations (`data-bj`, `data-ne`, `data-en`). Edit `assets/js/main.js` for announcement translations in `bj`, `ne` and `en`, and `assets/css/style.css` for styling.

### Language notes
- The page opens in **Bajjika** for a first-time visitor; selecting Nepali or English is remembered for that browser.
- Bajjika is rendered in Devanagari and uses the language code `vjk`.
- The Bajjika translation is an initial editorial draft. **Please review with speakers from the Sahodawa area before officially publishing**, because local usage and formal vocabulary vary.
- The official Nepali name is **सहोडवा कर्मचारी एसोसिएसन**.

**Important:** Names, contact details and all notices currently use clearly marked placeholder content. Confirm actual association information before publicly announcing the website as official. This project is not presented as a government web portal.

## Publishing
Go to **Settings > Pages > Build and deployment > Source > GitHub Actions**. Pushing to the `main` branch triggers `.github/workflows/deploy.yml`. Expected URL once GitHub Pages is enabled:
https://bivekumarsah.github.io/Sahodawa-karmachari-Association/

## Local development
Open `index.html` in your browser, or run a local static server such as:
```bash
python3 -m http.server 8000
```

No database or build tools are required.
