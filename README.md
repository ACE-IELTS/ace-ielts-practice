# ACE IELTS Practice

Two free, public IELTS mock-test sites for ACE students:

- **Reading mock test** — original passages, perfect-accuracy auto-grading against the official IELTS Academic Reading raw-score → band conversion table.
- **Writing mock test** — original prompts (Task 1 + Task 2), instant feedback anchored to the IELTS band descriptors, with a teacher-confirmed final band stored in Google Sheets.

Built by Ismail with help from Claude. Hosted on GitHub Pages.

---

## What lives where

```
ace-ielts-practice/
├── README.md                       ← you are here
├── reading/
│   ├── index.html                  ← Reading mock test site
│   └── content.js                  ← 3 passages + 40 questions + answer key
├── writing/
│   ├── index.html                  ← Writing mock test site
│   └── content.js                  ← Task 1 + Task 2 prompts
├── shared/
│   └── band_descriptors.js         ← official IELTS descriptors (used by both sites)
├── backend/
│   ├── Code.gs                     ← Google Apps Script source (paste into Apps Script editor)
│   └── SETUP.md                    ← step-by-step Apps Script + Sheets setup
│                                     (the Sheet is auto-created by initSheet() in Code.gs)
├── DEPLOY_GITHUB_PAGES.md          ← step-by-step hosting guide
└── UPGRADE_PLAN.md                 ← original planning document (for reference)
```

> **Note:** As of this commit only the folder skeleton exists. Each piece will be filled in as we build it, with a checkpoint between every step.

---

## How the pieces fit together

```
                ┌────────────────────────────┐
                │  GitHub repo (this folder) │
                └─────────────┬──────────────┘
                              │ git push
                              ▼
                ┌────────────────────────────┐
                │  GitHub Pages (free host)  │
                │  https://<you>.github.io/  │
                │  ace-ielts-practice/       │
                └─────────────┬──────────────┘
                              │ student opens link
                              ▼
        ┌─────────────────────────────────────┐
        │  Reading or Writing mock test site  │
        │  (single-page HTML, no backend)     │
        └──────────────────┬──────────────────┘
                           │ POST submission on finish
                           ▼
        ┌─────────────────────────────────────┐
        │  Google Apps Script Web App         │
        │  (free, runs in your Google account)│
        └──────────────────┬──────────────────┘
                           │ appendRow
                           ▼
        ┌─────────────────────────────────────┐
        │  Google Sheets workbook (you own)   │
        │  — submissions / band_desc /        │
        │    dashboard tabs                   │
        └──────────────────┬──────────────────┘
                           │ open in browser
                           ▼
                  ┌──────────────────┐
                  │  Teacher reviews │
                  │  / grades        │
                  └──────────────────┘
```

Free at every layer: GitHub Pages, Apps Script, Sheets.

---

## Two important honesty notes

1. **Reading scoring is exact.** Reading answers are objective, so auto-grading hits 100% accuracy if the answer key is correct. The raw-score → band conversion is the public Academic Reading table (39–40 = 9.0 … 4–5 = 2.5).

2. **Writing scoring is an estimate, not an exact band.** IELTS Writing is judged by trained human examiners on four criteria. No automated system — including this one — can match that with perfect accuracy. The site shows a clearly-labeled *computer estimate* alongside descriptor-anchored feedback, and a teacher's confirmed band in the Sheet is the final word.

---

## Build order

1. ✅ Folder structure + this README
2. ⬜ Shared IELTS band descriptors module (`shared/band_descriptors.js`)
3. ⬜ Backend (Apps Script + Sheets template + setup guide)
4. ⬜ Reading content (3 original passages + 40 questions + answer key)
5. ⬜ Reading site (`reading/index.html`)
6. ⬜ Writing content (Task 1 + Task 2 prompts)
7. ⬜ Writing site (`writing/index.html`)
8. ⬜ GitHub Pages deployment guide
9. ⬜ Final review + go live

Each step gets a checkpoint with Ismail before moving on. Nothing in any existing file gets modified without explicit approval.

---

## Existing files (separate project)

The previously-built static practice sites (`index-10.html` through `index-14.html`, currently uploaded to Cowork) are NOT part of this build. They continue to work as-is. This new project lives alongside them.
