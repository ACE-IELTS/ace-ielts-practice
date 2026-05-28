# Backend setup — Google Sheets + Apps Script

This guide walks through setting up the Google Sheet and Apps Script that catch submissions from your two mock-test sites.

You'll do this once. It takes about 10 minutes.

When you're done, you'll have:
- A Google Sheet with four tabs ready to receive data.
- A live Apps Script Web App URL that the HTML sites POST to.
- A `SHARED_SECRET` string used to keep random strangers out.

**Everything in this guide is free.** No paid Google Workspace plan needed — just a normal Google account.

---

## What you need before you start

1. A Google account (any free Gmail address works).
2. The file `backend/Code.gs` from this folder.
3. About 10 minutes.

> If you'd like to use a school/ACE Google account so other teachers can co-own the Sheet, sign into that account in your browser first.

---

## Step 1 — Create the Google Sheet

1. Go to **https://sheets.google.com** and click **+ Blank** to create a new spreadsheet.
2. At the top, click the words **"Untitled spreadsheet"** and rename it to something like **ACE IELTS — Submissions**.
3. Look at the URL in your browser's address bar. It looks like:
   ```
   https://docs.google.com/spreadsheets/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT/edit
                                        └──────── this part is the Sheet ID ────────┘
   ```
4. **Copy the Sheet ID** — the long string between `/d/` and `/edit`. Save it somewhere temporary (sticky note, scratch doc); you'll paste it into the script in a moment.

---

## Step 2 — Open the Apps Script editor

1. With the Sheet still open, click **Extensions** in the menu bar.
2. Click **Apps Script**. A new tab opens with a code editor.
3. You'll see a default file called `Code.gs` containing a stub `function myFunction()`. **Delete everything** in that file.

---

## Step 3 — Paste in the backend code

1. Open `backend/Code.gs` from this project folder in any text editor.
2. **Copy the entire contents.**
3. Paste it into the Apps Script editor, replacing the empty file.

---

## Step 4 — Configure the two constants at the top

At the top of the pasted code you'll see two lines:

```js
const SHEET_ID      = 'PASTE_YOUR_SHEET_ID_HERE';
const SHARED_SECRET = 'CHANGE_ME_to_a_random_string';
```

Edit them:

- **`SHEET_ID`** — paste the Sheet ID you copied in Step 1.
- **`SHARED_SECRET`** — pick any random string. Suggestion: open a terminal and run `openssl rand -hex 16`, or just type any 20+ random characters. This string acts as a soft password — the HTML sites send it with every submission so the script can reject random spam. **Save this string** — you'll paste the same value into each HTML site's config later.

Save the file: press **Ctrl+S** (Windows/Linux) or **Cmd+S** (Mac). Apps Script prompts you to give the project a name — call it **ACE IELTS Backend**.

---

## Step 5 — Run `initSheet()` once

This populates your Sheet with the four tabs.

1. At the top of the Apps Script editor, find the **function dropdown** (says "Select function" or shows a function name).
2. Choose **`initSheet`** from the dropdown.
3. Click **▶ Run**.

The first time you run any Apps Script, Google asks you to authorize it:

- You'll see "**Authorization required**" → click **Review permissions**.
- Pick your Google account.
- You may see "**Google hasn't verified this app**" — this is normal for personal Apps Scripts. Click **Advanced** → **Go to ACE IELTS Backend (unsafe)**. (It's safe — it's your own code.)
- Click **Allow** to grant access to your Sheets.

After authorization the script runs. You should see "Execution completed" in the bottom panel.

**Verify it worked:** switch back to the Sheet tab in your browser. You should now see four tabs at the bottom:
- `reading_submissions`
- `writing_submissions`
- `band_descriptors` (already populated with 30 rows of descriptor reference content)
- `dashboard`

If you see only one tab still called "Sheet1", run `initSheet` again or check that `SHEET_ID` matches the Sheet you're looking at.

---

## Step 6 — Deploy as a Web App

This turns the Apps Script into a URL that the HTML sites can POST to.

1. In the Apps Script editor, click the blue **Deploy** button (top right) → **New deployment**.
2. Next to **Select type** click the gear icon ⚙ → choose **Web app**.
3. Fill in:
   - **Description**: `ACE IELTS submissions endpoint`
   - **Execute as**: **Me** (your account)
   - **Who has access**: **Anyone**
     - This is required so unauthenticated students browsing the public site can POST. The `SHARED_SECRET` keeps strangers from successfully submitting.
4. Click **Deploy**.
5. If prompted, authorize again (same flow as Step 5).
6. You'll see a "Deployment successfully updated" dialog with a **Web app URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb…/exec
   ```
7. **Copy this URL.** Save it next to the `SHARED_SECRET`. You'll paste both into each HTML site's config.

---

## Step 7 — Verify the deployment is live

1. Paste the Web app URL into a new browser tab and press Enter.
2. You should see a small page that says:
   > **ACE IELTS backend is live**
   > This endpoint accepts POST submissions from the Reading and Writing mock-test sites.
   > If you see this page, the deployment is working.

If you see an error or a Google sign-in prompt, the deployment access setting is wrong — go back to Step 6 and confirm "Who has access" is set to **Anyone**.

---

## You're done. What's next

You now have:
- A Google Sheet at the URL `https://docs.google.com/spreadsheets/d/<your-sheet-id>/edit`
- An Apps Script Web App URL at `https://script.google.com/macros/s/<id>/exec`
- A `SHARED_SECRET` string

When we wire up the Reading and Writing HTML sites, we'll paste those two strings into a small config block at the top of each `index.html`. After that, every student submission appends a row to the appropriate tab of your Sheet.

---

## Common gotchas

**"Authorization required" loop** — make sure you click Advanced → "Go to … (unsafe)". Google is just warning you the app isn't verified by Google's review process; it doesn't mean the app is dangerous (it's your own code).

**Posts succeed but no rows appear** — the most common cause is `SHEET_ID` doesn't match the actual Sheet, so the script writes to the wrong place (or fails silently). Double-check by visiting `https://docs.google.com/spreadsheets/d/<your-SHEET_ID>/edit` and confirming you land on the right Sheet.

**Want to rotate `SHARED_SECRET`?** Change it in `Code.gs`, save, redeploy (Deploy → Manage deployments → ✏️ Edit → New version → Deploy), then update the value in each HTML site's config. The Web app URL stays the same.

**Want to give another teacher access to the Sheet?** Open the Sheet, click **Share** (top right), enter their email. They'll be able to view all submissions and (if you give them Editor permission) fill in teacher band scores and comments.

**Want to give another teacher edit access to the Apps Script?** Apps Script projects can be shared the same way as Sheets — File → Move → put it in a Shared Drive, or share the script project directly.

---

## What lives in each tab

**`reading_submissions`** — one row per Reading mock attempt. Columns include student name + ID, raw score, calculated band, per-passage breakdown, and JSON blobs of the student's actual answers (useful for analysis or appeals).

**`writing_submissions`** — one row per Writing task attempt (so doing both tasks creates two rows). Columns include the essay text, word count, auto-suggested band from the heuristic engine, and empty teacher columns waiting to be filled in.

**`band_descriptors`** — read-only reference table. The official IELTS Writing band descriptors paraphrased for quick lookup while grading. Don't edit this.

**`dashboard`** — a few summary cells: total submissions per site, latest attempt timestamps, count of writing tasks waiting to be graded, recent average Reading band. Add your own QUERY formulas to this tab as you discover what you want to track.

---

## Cost recap

Google Sheets: free.
Google Apps Script: free (up to 90 minutes of script execution per day, which is enough for thousands of submissions).
GitHub Pages hosting (covered later): free.

Total ongoing cost: **0 / month**.
