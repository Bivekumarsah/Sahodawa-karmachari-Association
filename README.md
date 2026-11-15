# Sahodawa Karmachari Association

Official website project for **Sahodawa Karmachari Association** (सहोडवा कर्मचारी एसोसिएसन).

A bilingual, responsive, accessible static association portal hosted with GitHub Pages.

## Features
- Nepali-first with English language toggle
- About, mission, values, committee, notices, initiatives, membership and contact sections
- Searchable/filterable notice board powered by `assets/js/main.js`
- Private, browser-only membership application draft export (no server data collection)
- Responsive navigation, accessible controls and SEO metadata
- Automatic GitHub Pages deployment workflow

## Content management
Edit `index.html` for organization details, `assets/js/main.js` for announcements, and `assets/css/style.css` for styling.

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
