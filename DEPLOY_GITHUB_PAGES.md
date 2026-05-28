# Deploying to GitHub Pages

This guide gets your two mock-test sites live on the public web — for free.

You'll do this once. After it's set up, future updates just need a `git push` and the site redeploys automatically in 30 seconds.

By the end you'll have two public URLs you can paste into Google Classroom:

```
Reading: https://<your-github-username>.github.io/ace-ielts-practice/reading/
Writing: https://<your-github-username>.github.io/ace-ielts-practice/writing/
```

---

## Before you start — checklist

- [ ] GitHub account (you said you already have one)
- [ ] Google Apps Script set up per `backend/SETUP.md` and you have:
      - the Apps Script Web App URL
      - the `SHARED_SECRET` string you chose
- [ ] About 15 minutes

If you have NOT done the Apps Script setup yet, you can skip ahead and do it later — the sites will still deploy fine. They just won't save submissions to Sheets until you wire it up.

---

## Step 1 — Paste your endpoint and secret into the sites

Each site has a config block at the top of the `<script>` section. You need to fill in two values in each file.

**Files to edit:**
- `reading/index.html`
- `writing/index.html`

In each one, find this block (it's near line 670 of `reading/index.html` and near line 540 of `writing/index.html`):

```js
const ACE_CONFIG = {
  SHEETS_ENDPOINT: "",            // paste deployed Apps Script Web App URL here
  SHARED_SECRET:   "",            // paste the same SHARED_SECRET from Code.gs here
  SITE_ID:         "ielts-reading-mock",    // or "ielts-writing-mock"
  MOCK_TEST_ID:    "reading-mock-1",        // or "writing-mock-1"
};
```

Fill in the two empty strings with your real values. Don't change `SITE_ID` or `MOCK_TEST_ID`.

**Save both files.**

If you haven't done the Apps Script setup yet, leave both strings empty — the sites work fine without persistence (you just won't get data in Sheets).

---

## Step 2 — Create a public GitHub repository

1. Go to **https://github.com/new** (signed in to your account).
2. **Repository name:** `ace-ielts-practice`
3. **Description:** `IELTS Reading and Writing mock-test sites for ACE students` (optional)
4. **Visibility:** **Public** (required for free GitHub Pages hosting)
5. Do NOT check "Add a README file" or "Add .gitignore" — we'll create those locally
6. Click **Create repository**

GitHub shows you a "Quick setup" page with a URL like `https://github.com/<your-username>/ace-ielts-practice.git`. Keep this tab open.

---

## Step 3 — Push your project folder to GitHub

You can do this two ways:

### Option A — Through Cowork (easiest, no terminal needed)

In Cowork, tell me your GitHub username and I'll initialize the repo, commit the files, and push them. You'll be prompted to authorize the push via a browser pop-up the first time.

### Option B — Manually from the macOS Terminal

If you'd rather do it yourself, open Terminal and run these in order (replace `<USER>` with your GitHub username):

```bash
# Move into the project folder
cd ~/Documents/Claude/Projects/"Building websites and app"

# Initialise as a git repo
git init -b main

# Track everything
git add .

# First commit
git commit -m "Initial commit: Reading + Writing IELTS mock sites"

# Link to your GitHub repo
git remote add origin https://github.com/<USER>/ace-ielts-practice.git

# Push
git push -u origin main
```

If git asks for credentials, use your GitHub username and a **personal access token** (not your password). Generate one at https://github.com/settings/tokens (classic, scope: `repo`).

---

## Step 4 — Turn on GitHub Pages

1. On your GitHub repo page, click **Settings** (top right of the repo tabs).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**:
   - **Source**: choose **Deploy from a branch**.
   - **Branch**: choose `main`, folder `/ (root)`, click **Save**.
4. GitHub shows a banner: *"Your site is live at https://<your-username>.github.io/ace-ielts-practice/"*.
   - First deploy takes 30–90 seconds.
   - Refresh the page if the green checkmark hasn't appeared yet.

---

## Step 5 — Test the live URLs

Open these in a private/incognito window (so you're not signed into anything):

```
https://<your-username>.github.io/ace-ielts-practice/reading/
https://<your-username>.github.io/ace-ielts-practice/writing/
```

You should see the **ACE IELTS** welcome screen on each. Try typing a name + ACE ID and starting a test. If the Apps Script endpoint is configured, finish a quick test and check that a row appears in your Sheet's `reading_submissions` or `writing_submissions` tab.

If the URL shows 404 for a minute or two, that's normal — Pages is still building. Refresh.

---

## How to push updates later

Whenever you change any file (add a new mock test, fix a typo, change a question), GitHub Pages re-deploys after one push:

```bash
cd ~/Documents/Claude/Projects/"Building websites and app"
git add .
git commit -m "Describe what you changed"
git push
```

Live URL updates within a minute.

If you're working from Cowork or Claude Code, just say "push the latest changes" and I (or Claude Code) will handle the three commands.

---

## Installing Claude Code (optional)

You said earlier you wanted to use Claude Code as well. Here's how to install it after the site is live:

### Prerequisites

You need **Node.js** (version 18 or higher). To check if you have it:

```bash
node --version
```

If you see `v18.x.x` or higher you're good. If not, install Node from https://nodejs.org/ (LTS version).

### Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Then run it from your project folder:

```bash
cd ~/Documents/Claude/Projects/"Building websites and app"
claude
```

The first time you run it, it'll ask you to sign in with your Anthropic account.

After that you can ask Claude to make changes, push to GitHub, etc., directly from the terminal — same project, same files, just a different way to talk to Claude.

---

## Common issues

**The site loads but shows "Configuration error" instead of the welcome screen.** Means `content.js` didn't load. Check that `reading/content.js` and `writing/content.js` are in the repo and the paths in the HTML are correct.

**Submissions don't appear in the Sheet.** Most common cause: `SHEETS_ENDPOINT` or `SHARED_SECRET` is still empty in `index.html`. Open the live site, view source, and check the `ACE_CONFIG` block — both strings should be filled in.

**GitHub Pages site returns 404 long after pushing.** Settings → Pages should show a green checkmark and your URL. If it doesn't, the branch / folder source might be set wrong. Re-check Step 4.

**"Push rejected" when I run `git push`.** Usually means you didn't set the remote (Step 3, "git remote add origin …") or your token doesn't have `repo` scope.

**The site loads on desktop but breaks on mobile.** Both sites are responsive; if you see a real layout bug, tell me which screen + which device.

---

## Adding a second mock test

The architecture supports as many mock tests as you want. To add e.g. a second Reading mock:

1. Copy `reading/content.js` to `reading/content-2.js`.
2. Replace the passages, questions, and answers with the new test's content.
3. Decide whether you want:
   - A **separate URL** for the second test (`reading/test-2/index.html` — copy `index.html` there and change the `<script src="content.js">` to `content-2.js`), or
   - A **dropdown** on the welcome screen letting the student pick which test to take (more code change).

I can help with either when you're ready.

---

## What stays free

| Service | Free tier limit | What you'd hit it at |
|---|---|---|
| GitHub Pages | 100 GB bandwidth / month, 10 builds / hour | Roughly 50,000 student site loads per month |
| Apps Script | 90 minutes of script run-time per day | Thousands of submissions per day |
| Google Sheets | Up to 10 million cells per workbook | Years of submissions |

You won't be paying for any of this.
