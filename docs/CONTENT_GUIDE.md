# Publishing content safely

This is a **static GitHub Pages website**. There is no backend or hidden administration panel. Only people with repository write access can publish records by changing the JSON files on `main`.

## Notices

Edit `content/notices.json` and add entries in its `notices` array:

```json
{
  "notices": [
    {
      "id": "announcement-001",
      "status": "published",
      "category": "meeting",
      "date": "2026-11-16",
      "title": {
        "bj": "इहाँ पुष्टि भइल बज्जिका शीर्षक",
        "ne": "यहाँ पुष्टि भएको नेपाली शीर्षक",
        "en": "Verified English heading"
      },
      "description": {
        "bj": "बज्जिका में जानकारी",
        "ne": "नेपालीमा जानकारी",
        "en": "English information"
      },
      "url": "documents/notice-001.pdf"
    }
  ]
}
```

- Valid categories: `general`, `membership`, `meeting`.
- `status` must be `published` to appear. Other statuses, including `draft`, are not displayed.
- Use Gregorian ISO dates `YYYY-MM-DD`, not unmarked BS dates.
- `url` is optional. Upload the real, approved document into `documents/` before linking to it. JavaScript/data URLs are refused.
- Include all three language fields (`bj`, `ne`, `en`). Use a speaker to review Bajika wording.
- Never invent an official notice, date, or document. The site intentionally shows an honest empty state until approved notices exist.

## Executive committee

Edit `content/committee.json`:

```json
{
  "members": [
    {
      "id": "committee-001",
      "status": "published",
      "name": {
        "bj": "सत्यापित सदस्य के नाम",
        "ne": "प्रमाणित सदस्यको नाम",
        "en": "Verified member name"
      },
      "role": {
        "bj": "अध्यक्ष",
        "ne": "अध्यक्ष",
        "en": "President"
      },
      "photo": "assets/img/committee/verified-person.jpg"
    }
  ]
}
```

- Entries are examples of format **only**, not real personnel. The actual checked-in committee file remains empty until officially approved.
- `photo` is optional; when missing the site shows an initial, not a fake portrait.
- Obtain permission to publish members' names and photographs and use only confirmed roles.

## Official contact details

Edit the `#contact` area in `index.html` after the association approves its public address, email and office hours. Do not publish private phone numbers without consent.

## Membership

The membership form is **local only**. It can download a UTF-8 text draft or open the browser print dialog (for paper or Save as PDF). It does not collect, submit or store visitor personal data on a server. Do not advertise it as online membership submission unless a real backend with explicit privacy controls is added and tested.

## How to publish

1. Prepare verified information and translations.
2. Update the appropriate content JSON file and attach any approved document or photo.
3. Review on a development branch and run the automated tests.
4. Merge changes to `main`, which publishes through GitHub Pages.

## Quality assurance

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

The Playwright tests launch a local HTTP server and verify the language switcher, data loading, notice filtering, draft download, print behavior, FAQ, sharing and 360px mobile layout. GitHub Actions runs the tests on the configured branches.
