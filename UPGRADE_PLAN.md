# IELTS Writing Sites — Data + Feedback Upgrade Plan

**Status:** Draft for Ismail's review. Nothing in your existing site files gets edited until you approve.
**Last updated:** 2026-05-27

---

## What you have today

Four single-page HTML apps, ~5,000 lines each, sharing a template:

| File | Site | Scoring mode |
|---|---|---|
| `index-10.html` | GEP 11A Writing Practice | Rubric self-assessment, /16 (need 8/16 per task to pass) |
| `index-11.html` | GEP 11B Writing Practice | Rubric self-assessment, /16 (need 8/16 per task to pass) |
| `index-12.html` | GEP 12 Writing Practice | No formal score — teacher gives feedback |
| `index-14.html` | IELTS Writing Mock Test | Auto-analysis on a 3–9 band scale via `analyseEssay()` |

The Mock Test already computes a **per-criterion band** (Task Achievement / Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) plus strengths/weaknesses/tips — exactly the "auto-suggest" we agreed on. The GEP 11A/11B sites use a simpler /4 rubric per criterion; we can either map that into the same band model or keep it separate.

**Already in place** that helps us:
- Name + Student ID input on welcome screen.
- Per-task word counts, time on task, total elapsed time captured in a `state` object.
- Auto-save to `localStorage` every 3 seconds (full snapshot).
- Single, clean submission entry point: `submitTest()` in the mock test (line 3828).
- Word doc download with all the right fields already.

**Missing**:
- Any network call. No data leaves the browser today.
- No teacher-facing view of submissions.
- The IELTS band descriptors aren't formally embedded — `analyseEssay()` outputs a number, but doesn't tell the student "Band 6 means X, Band 7 means Y".

---

## Proposed architecture (one paragraph)

Each HTML site **POSTs the submission** to a single **Google Apps Script Web App URL** when the student finishes. The Apps Script appends a row to a shared **Google Sheets workbook** you own. The Sheet has a `submissions` tab (one row per task attempt), a `band_descriptors` tab (reference rubric the teacher can lookup while grading), and a `dashboard` tab with QUERY formulas for per-class views. Teachers fill in **confirmed band scores + comments** in dedicated columns of the `submissions` tab. The auto-suggest from the existing `analyseEssay()` lands in separate columns so teachers can see the heuristic estimate alongside the essay. No hosting, no auth backend, no monthly bill.

```
Student browser            Google Apps Script           Google Sheets
┌─────────────────┐        ┌─────────────────┐          ┌─────────────────┐
│  HTML site      │ POST   │  doPost(e)      │ append   │  submissions    │
│  (existing)     │ ─────► │  validates JSON │ ───────► │  band_descript… │
│  on submit()    │  JSON  │  appends row    │   row    │  dashboard      │
└─────────────────┘        └─────────────────┘          └─────────────────┘
                                                               ▲
                                                               │ open in
                                                        ┌──────┴──────┐
                                                        │   Teacher   │
                                                        │ fills band  │
                                                        │ + comments  │
                                                        └─────────────┘
```

---

## Sheets workbook layout

One workbook you own, shared with teachers as you onboard them.

### Tab 1 — `submissions`

One row per **task attempt** (so a student doing both Task 1 and Task 2 produces two rows). One flat table is easier to filter than nested structures.

| Column group | Columns |
|---|---|
| **Identity** | `submitted_at_iso`, `submitted_at_local`, `student_name`, `student_id`, `site_id`, `level`, `task_number` |
| **Prompt** | `prompt_id`, `prompt_type`, `prompt_preview_150` |
| **Essay** | `essay_text`, `word_count`, `target_word_count`, `met_target` |
| **Timing** | `time_on_task_seconds`, `total_elapsed_seconds`, `submitted_early` (bool) |
| **Auto-suggest (from `analyseEssay`)** | `auto_band_task`, `auto_band_cc`, `auto_band_lr`, `auto_band_gra`, `auto_band_overall`, `auto_unassessable`, `auto_reason`, `auto_strengths`, `auto_weaknesses`, `auto_tips` |
| **GEP /4 rubric (11A/11B only)** | `gep_rubric_task`, `gep_rubric_cc`, `gep_rubric_lr`, `gep_rubric_gra`, `gep_rubric_total_16` |
| **Teacher confirms** | `teacher_band_task`, `teacher_band_cc`, `teacher_band_lr`, `teacher_band_gra`, `teacher_band_overall`, `teacher_comments`, `teacher_marked_by`, `teacher_marked_at` |

The teacher columns start empty. Once a teacher fills them, a formula in `teacher_band_overall` averages and rounds to nearest 0.5 (IELTS convention) automatically.

### Tab 2 — `band_descriptors`

Reference table teachers can sit beside the submissions tab while grading. Five columns: `task_type`, `criterion`, `band`, `descriptor`, `key_indicators`. Populated with the official public IELTS Writing band descriptors for bands 4–9 (the relevant range for your students).

### Tab 3 — `dashboard`

Read-only views built from `=QUERY(submissions!A:Z, ...)`:
- **By class/level** — average band per criterion, completion count, average word count.
- **By student** — pick a student ID, see all their attempts chronologically with band trend.
- **Needs grading** — submissions where `teacher_band_overall` is empty, sorted by submission time.

---

## IELTS Band Descriptor module

A new JS file, `band_descriptors.js`, that lives alongside the HTML and gets `<script src>`-included. It exports a single global, `IELTS_BAND_DESCRIPTORS`, structured like:

```js
window.IELTS_BAND_DESCRIPTORS = {
  task1: {
    "Task Achievement": {
      9: { summary: "Fully satisfies all requirements...", indicators: [...] },
      8: { ... },
      7: { ... },
      6: { ... },
      5: { ... },
      4: { ... }
    },
    "Coherence and Cohesion": { ... },
    "Lexical Resource": { ... },
    "Grammatical Range and Accuracy": { ... }
  },
  task2: {
    "Task Response": { ... },
    "Coherence and Cohesion": { ... },
    "Lexical Resource": { ... },
    "Grammatical Range and Accuracy": { ... }
  }
};
```

Sourced from the official public IELTS Writing Task 1 & Task 2 band descriptors (Cambridge/IDP/British Council, freely reproducible for educational use).

**Where it shows up on the page:**
1. On the **results screen**, under each auto-suggested band, render the band's descriptor so the student can see *why* that band and what the next band up requires.
2. The same module is exported once as JSON and pasted into the `band_descriptors` tab of the Sheet for teacher lookup.

This is the upgrade that makes feedback "clear, precise, accurate" — every number is anchored to a sentence the student and teacher can both point at.

---

## Apps Script (the backend, ~40 lines)

A single `Code.gs` file inside a Google Apps Script project bound to your workbook:

```js
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_TAB = 'submissions';
const SHARED_SECRET = 'rotate-me-occasionally';  // simple defense-in-depth

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SHARED_SECRET) {
      return _json({ ok: false, error: 'unauthorized' });
    }
    const sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName(SHEET_TAB);

    const row = COLUMN_ORDER.map(k => data[k] ?? '');
    sheet.appendRow(row);
    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

const COLUMN_ORDER = [
  'submitted_at_iso','submitted_at_local',
  'student_name','student_id','site_id','level','task_number',
  'prompt_id','prompt_type','prompt_preview_150',
  'essay_text','word_count','target_word_count','met_target',
  'time_on_task_seconds','total_elapsed_seconds','submitted_early',
  'auto_band_task','auto_band_cc','auto_band_lr','auto_band_gra','auto_band_overall',
  'auto_unassessable','auto_reason','auto_strengths','auto_weaknesses','auto_tips',
  'gep_rubric_task','gep_rubric_cc','gep_rubric_lr','gep_rubric_gra','gep_rubric_total_16',
  'teacher_band_task','teacher_band_cc','teacher_band_lr','teacher_band_gra',
  'teacher_band_overall','teacher_comments','teacher_marked_by','teacher_marked_at',
];

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deployed as a **Web App** with "Execute as: Me" and "Who has access: Anyone" so student browsers can POST without needing to log into Google.

The `SHARED_SECRET` is baked into each HTML site and gives a soft layer of protection against random spam — not real auth, but enough to filter out drive-by junk.

---

## What changes in your HTML sites (additive only)

For each site, **two small additions**:

### 1. Near the top of the `<script>` block, a config object

```js
const ACE_CONFIG = {
  SHEETS_ENDPOINT: 'https://script.google.com/macros/s/AKfyc.../exec',
  SHARED_SECRET: 'rotate-me-occasionally',
  SITE_ID: 'ielts-mock-writing',   // changes per file
  LEVEL: 'Mock',                    // 11A | 11B | 12 | Mock
};
```

### 2. At the end of `submitTest()`, a fire-and-forget POST

```js
function postSubmissionsToSheets() {
  if (!ACE_CONFIG.SHEETS_ENDPOINT) return;
  for (const taskNum of [1, 2]) {
    const payload = buildSubmissionPayload(taskNum);
    if (!payload) continue;
    fetch(ACE_CONFIG.SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    }).catch(err => console.warn('Sheets POST failed', err));
  }
}
```

Plus a `buildSubmissionPayload(taskNum)` helper (~50 lines) that pulls fields out of the existing `state` object and `state.analysis` and maps them to the column names above. **No existing function is modified.** No existing logic changes. If the network call fails or the endpoint is empty, the site behaves exactly as it does today.

### 3. (Optional, same release) Band descriptor display on results screen

Add a small new section on the results screen that, for each criterion, shows the auto-suggested band's descriptor sourced from `IELTS_BAND_DESCRIPTORS`. This is pure rendering — no logic change.

---

## Files this would create vs. modify

**Create (new files, in your workspace folder):**
- `band_descriptors.js` — the descriptor module.
- `apps_script/Code.gs` — the Apps Script source (you'd paste this into a new Apps Script project in your Google account).
- `apps_script/README.md` — step-by-step setup: create Sheet, create Apps Script, deploy as Web App, copy URL, paste into HTML config.
- `sheets_template.xlsx` — a blank workbook with the three tabs and column headers pre-filled, ready to import to Sheets.

**Modify (your existing HTML files — only if and when you approve):**
- `index-10.html` (GEP 11A) — add config + post hook + descriptor display.
- `index-11.html` (GEP 11B) — same.
- `index-12.html` (GEP 12) — same.
- `index-14.html` (Mock) — same.

For each file, I will produce the diff (the exact lines being added) **and show it to you first**. Nothing gets written into your originals until you say "go".

---

## Rollout sequence I'd suggest

1. **You approve the plan.**
2. I create the four new files above in your workspace folder (`band_descriptors.js`, `Code.gs`, the setup README, the Sheet template).
3. You create the Sheet + Apps Script in your Google account following the README, paste the Web App URL back to me.
4. I produce the patched version of **one** HTML file (let's start with the Mock Test — it's the richest) as a *new file* alongside your original, so you can diff it and try it side-by-side.
5. You test it: type a name + ID, write a short essay, finish — and confirm a row appears in your Sheet.
6. Once you're happy, we apply the same additive pattern to the other three sites.
7. We add the band descriptor display.
8. We populate the `band_descriptors` tab and build the `dashboard` tab.

At every step the existing sites keep working exactly as they do today. We can stop at any step.

---

## Open questions before I build anything

1. **Should the GEP 11A/11B sites also get the auto-band (3–9) on top of their existing /16 rubric**, or stay on /16 only and just persist the rubric numbers? My recommendation: persist both. The /16 is what students see; the /9 auto-suggest gives teachers a parallel signal.
2. **One shared workbook for all four sites, or one workbook per site?** My recommendation: one shared workbook with a `level` column. Easier to grade across classes and to spot trends.
3. **Should students see their auto-suggested band**, or only see it after the teacher confirms? My recommendation: show it, but label it clearly as "Computer-estimated — your teacher's score is final."
4. **Privacy:** comfortable storing student full names + IDs + essay text in a Google Sheet you control? If not, we can hash the student ID before storage.

---

## Things we explicitly do **not** automate

Per your standing preferences:
- No scheduled tasks, no cron jobs.
- No auto-emailing of results.
- No auto-grading that bypasses the teacher.
- No modifications to your existing files without you seeing the diff and approving it.
