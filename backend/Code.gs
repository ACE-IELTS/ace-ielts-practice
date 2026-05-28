/* ============================================================
   ACE IELTS — Google Apps Script backend
   ------------------------------------------------------------
   What this file does:

     1. Receives POSTed submissions from the Reading and
        Writing mock-test sites (running on GitHub Pages).
     2. Validates a shared secret, then appends one row to
        the appropriate Sheet tab.
     3. Provides initSheet() — a one-time setup function you
        run from the Apps Script editor to create all tabs,
        headers, and the band-descriptor reference table.
     4. Provides a tiny GET handler so you can confirm the
        endpoint is live by visiting the URL in a browser.

   How to use it:
     See backend/SETUP.md for step-by-step instructions.

   What you need to change before deploying:
     • SHEET_ID         — paste the ID of your Google Sheet
     • SHARED_SECRET    — pick any random string; paste the
                          same string into the HTML configs
                          on each mock-test site.
   ============================================================ */

/* ----------------------------------------------------------
   CONFIG — edit these two values, save, then run initSheet().
   ---------------------------------------------------------- */

const SHEET_ID      = 'PASTE_YOUR_SHEET_ID_HERE';
const SHARED_SECRET = 'CHANGE_ME_to_a_random_string';

/* ----------------------------------------------------------
   TAB NAMES (do not change unless you also change the HTML
   sites — they reference these names indirectly via the API).
   ---------------------------------------------------------- */

const TAB_READING       = 'reading_submissions';
const TAB_WRITING       = 'writing_submissions';
const TAB_DESCRIPTORS   = 'band_descriptors';
const TAB_DASHBOARD     = 'dashboard';

/* ----------------------------------------------------------
   COLUMN ORDER for each submission type.
   The HTML sites send JSON with these exact keys.
   ---------------------------------------------------------- */

const COLUMNS_READING = [
  'submitted_at_iso',
  'submitted_at_local',
  'student_name',
  'student_id',
  'site_id',
  'mock_test_id',
  'duration_seconds',
  'submitted_early',
  'raw_score',
  'band',
  'passage1_correct',
  'passage1_total',
  'passage2_correct',
  'passage2_total',
  'passage3_correct',
  'passage3_total',
  'question_results_json',   // {q1: true/false, q2: true/false, ...}
  'answers_json',            // {q1: "...", q2: "...", ...}
];

const COLUMNS_WRITING = [
  // Identity
  'submitted_at_iso',
  'submitted_at_local',
  'student_name',
  'student_id',
  'site_id',
  'mock_test_id',
  'task_number',
  // Prompt
  'prompt_id',
  'prompt_type',
  'prompt_preview_150',
  // Essay + timing
  'essay_text',
  'word_count',
  'target_word_count',
  'met_target',
  'time_on_task_seconds',
  'total_elapsed_seconds',
  // Auto-suggest (from analyseEssay heuristics)
  'auto_band_task',
  'auto_band_cc',
  'auto_band_lr',
  'auto_band_gra',
  'auto_band_overall',
  'auto_unassessable',
  'auto_reason',
  'auto_strengths',
  'auto_weaknesses',
  'auto_tips',
  // Teacher confirms (filled in later by teacher in the Sheet)
  'teacher_band_task',
  'teacher_band_cc',
  'teacher_band_lr',
  'teacher_band_gra',
  'teacher_band_overall',
  'teacher_comments',
  'teacher_marked_by',
  'teacher_marked_at',
];

/* ============================================================
   HTTP HANDLERS
   ============================================================ */

/**
 * Receives a POST from a mock-test site.
 * Expects JSON body with:
 *   { secret: SHARED_SECRET,
 *     submission_type: "reading" | "writing",
 *     ...the per-type columns above }
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ ok: false, error: 'no_body' }, 400);
    }
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHARED_SECRET) {
      return _json({ ok: false, error: 'unauthorized' }, 401);
    }

    const type = String(data.submission_type || '').toLowerCase();
    if (type === 'reading') {
      _appendRow(TAB_READING, COLUMNS_READING, data);
    } else if (type === 'writing') {
      _appendRow(TAB_WRITING, COLUMNS_WRITING, data);
    } else {
      return _json({ ok: false, error: 'unknown_submission_type' }, 400);
    }

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) }, 500);
  }
}

/** Health check — visit the deployed URL in a browser. */
function doGet() {
  const html =
    '<html><body style="font-family:system-ui;padding:24px;max-width:520px">' +
    '<h1 style="margin:0 0 12px;font-size:18px">ACE IELTS backend is live</h1>' +
    '<p>This endpoint accepts POST submissions from the Reading and Writing mock-test sites.</p>' +
    '<p>If you see this page, the deployment is working.</p>' +
    '</body></html>';
  return HtmlService.createHtmlOutput(html);
}

/* ============================================================
   ONE-TIME SETUP
   Run this once from the Apps Script editor (button at top).
   It creates all four tabs and populates headers + descriptors.
   ============================================================ */

function initSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  // Reading + Writing tabs — headers only
  _ensureTabWithHeaders(ss, TAB_READING, COLUMNS_READING);
  _ensureTabWithHeaders(ss, TAB_WRITING, COLUMNS_WRITING);

  // Band descriptors reference tab
  _ensureTabWithHeaders(ss, TAB_DESCRIPTORS,
    ['task', 'criterion', 'band', 'summary', 'key_indicators']);
  _populateBandDescriptors(ss);

  // Dashboard tab with summary formulas
  _ensureTabWithHeaders(ss, TAB_DASHBOARD, ['metric', 'value']);
  _populateDashboard(ss);

  // If the default "Sheet1" still exists and is empty, remove it
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(sheet1);
  }

  SpreadsheetApp.getActive(); // forces a flush
  Logger.log('initSheet complete.');
}

/* ============================================================
   INTERNAL HELPERS
   ============================================================ */

function _appendRow(tabName, columns, data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(tabName);
  if (!sheet) throw new Error('Missing tab: ' + tabName);
  const row = columns.map(function (k) {
    const v = data[k];
    if (v === undefined || v === null) return '';
    return v;
  });
  sheet.appendRow(row);
}

function _ensureTabWithHeaders(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  // Only write headers if the tab is empty
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f1f3f4');
  }
}

function _populateBandDescriptors(ss) {
  const sheet = ss.getSheetByName(TAB_DESCRIPTORS);
  if (sheet.getLastRow() > 1) return; // already populated

  const rows = _BAND_DESCRIPTOR_ROWS();
  sheet.getRange(2, 1, rows.length, 5).setValues(rows);
  sheet.autoResizeColumn(1);
  sheet.autoResizeColumn(2);
  sheet.autoResizeColumn(3);
  sheet.setColumnWidth(4, 420);
  sheet.setColumnWidth(5, 380);
}

function _populateDashboard(ss) {
  const sheet = ss.getSheetByName(TAB_DASHBOARD);
  if (sheet.getLastRow() > 1) return;

  const rows = [
    ['Total Reading submissions',    '=COUNTA(' + TAB_READING + '!A2:A)'],
    ['Total Writing submissions',    '=COUNTA(' + TAB_WRITING + '!A2:A)'],
    ['Writing tasks awaiting grade', '=COUNTIFS(' + TAB_WRITING + '!A2:A,"<>",' + TAB_WRITING + '!AE2:AE,"")'],
    ['',                              ''],
    ['Most recent Reading attempt',  '=IFERROR(INDEX(' + TAB_READING + '!B:B, COUNTA(' + TAB_READING + '!A:A)), "—")'],
    ['Most recent Writing attempt',  '=IFERROR(INDEX(' + TAB_WRITING + '!B:B, COUNTA(' + TAB_WRITING + '!A:A)), "—")'],
    ['',                              ''],
    ['Avg Reading band (last 50)',   '=IFERROR(ROUND(AVERAGE(QUERY(' + TAB_READING + "!J:J, \"select J where J is not null order by J desc limit 50 offset 0\", 0)),1), \"—\")"],
  ];
  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  sheet.setColumnWidth(1, 320);
  sheet.setColumnWidth(2, 240);
}

function _json(obj, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ============================================================
   BAND DESCRIPTOR REFERENCE DATA
   Same content as shared/band_descriptors.js, in tabular form
   for the band_descriptors tab so teachers can look it up
   while grading.
   ============================================================ */

function _BAND_DESCRIPTOR_ROWS() {
  // [task, criterion, band, summary, indicators_joined]
  return [
    // ----- TASK 1 — Task Achievement -----
    ['Task 1','Task Achievement',9,'Fully satisfies all the requirements of the task. Clearly presents a fully developed response.','Every part of the task is covered; overview is precise and immediately clear; all key features highlighted with supporting detail'],
    ['Task 1','Task Achievement',8,'Covers all requirements of the task sufficiently. Presents, highlights and illustrates key features clearly and appropriately.','All requirements addressed; clear overview of trends/differences/stages; key features illustrated with appropriate data'],
    ['Task 1','Task Achievement',7,'Covers the requirements of the task. Presents a clear overview of main trends, differences or stages. Clearly presents and highlights key features, but could be more fully extended.','All task requirements addressed; clear overview present; key features highlighted but extension could be deeper'],
    ['Task 1','Task Achievement',6,'Addresses the requirements of the task. Presents an overview with information appropriately selected. Presents and adequately highlights key features but details may be irrelevant, inappropriate or inaccurate.','Task requirements addressed; overview present but may lack precision; some inaccurate or irrelevant detail'],
    ['Task 1','Task Achievement',5,'Generally addresses the task; the format may be inappropriate in places. Recounts detail mechanically with no clear overview. Inadequately covers key features; there may be a tendency to focus on details.','Task partly addressed; no clear overview, or overview is mechanical; focus on details rather than key features'],
    ['Task 1','Task Achievement',4,'Attempts to address the task but does not cover all key features; format may be inappropriate. May confuse key features with detail; parts may be unclear, irrelevant, repetitive or inaccurate.','Several key features missing; no overview, or overview is confused; detail confused with main features'],

    // ----- TASK 2 — Task Response -----
    ['Task 2','Task Response',9,'Fully addresses all parts of the task. Presents a fully developed position in answer to the question with relevant, fully extended and well-supported ideas.','All parts of the prompt covered; position is clear and fully developed throughout; ideas extended with relevant, specific support'],
    ['Task 2','Task Response',8,'Sufficiently addresses all parts of the task. Presents a well-developed response with relevant, extended and supported ideas.','All parts of the prompt covered; well-developed position; ideas relevant and extended with support'],
    ['Task 2','Task Response',7,'Addresses all parts of the task. Presents a clear position throughout. Presents, extends and supports main ideas, but there may be a tendency to over-generalize or supporting ideas may lack focus.','All parts of the prompt covered; clear position throughout; main ideas supported, occasional overgeneralization'],
    ['Task 2','Task Response',6,'Addresses all parts of the task although some parts may be more fully covered than others. Presents a relevant position although conclusions may become unclear or repetitive. Presents relevant main ideas but some may be inadequately developed.','All parts of the prompt addressed but unevenly; position relevant but conclusion may be weak; some main ideas underdeveloped'],
    ['Task 2','Task Response',5,'Addresses the task only partially. Expresses a position but the development is not always clear and there may be no conclusions drawn. Presents some main ideas but these are limited and not sufficiently developed.','Task only partially addressed; position present but not fully developed; limited ideas, some irrelevant detail'],
    ['Task 2','Task Response',4,'Responds to the task only in a minimal way or the answer is tangential; the format may be inappropriate. Presents a position but this is unclear. Some main ideas are difficult to identify and may be repetitive, irrelevant or not well supported.','Task barely addressed or answered tangentially; position unclear; main ideas hard to identify'],

    // ----- Coherence and Cohesion (same for both tasks) -----
    ['Both','Coherence and Cohesion',9,'Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.','Cohesive devices used so smoothly they are invisible; paragraphing is precise and purposeful'],
    ['Both','Coherence and Cohesion',8,'Sequences information and ideas logically. Manages all aspects of cohesion well. Uses paragraphing sufficiently and appropriately.','Logical sequencing throughout; cohesion well managed; good paragraphing'],
    ['Both','Coherence and Cohesion',7,'Logically organises information and ideas; there is clear progression throughout. Uses a range of cohesive devices appropriately although there may be some under- or over-use.','Clear progression of ideas; range of linking words used; some under- or over-use of cohesive devices'],
    ['Both','Coherence and Cohesion',6,'Arranges information and ideas coherently and there is a clear overall progression. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical. May not always use referencing clearly.','Clear overall progression; cohesive devices sometimes mechanical; referencing not always clear'],
    ['Both','Coherence and Cohesion',5,'Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or over-use of cohesive devices. May be repetitive because of lack of referencing and substitution.','Organisation present but progression unclear; cohesive devices over-used or misused; repetition due to weak referencing'],
    ['Both','Coherence and Cohesion',4,'Presents information and ideas but these are not arranged coherently and there is no clear progression in the response. Uses some basic cohesive devices but these may be inaccurate or repetitive. May not write in paragraphs or paragraphing may be confusing.','No clear progression; basic linking words used inaccurately; paragraphing weak or absent'],

    // ----- Lexical Resource -----
    ['Both','Lexical Resource',9,'Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as slips.','Very wide vocabulary; sophisticated and natural lexical control; errors are extremely rare slips'],
    ['Both','Lexical Resource',8,'Uses a wide range of vocabulary fluently and flexibly to convey precise meanings. Skilfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation. Produces rare errors in spelling and/or word formation.','Wide, fluent vocabulary; uncommon words used skilfully; rare spelling or word-formation errors'],
    ['Both','Lexical Resource',7,'Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation. May produce occasional errors in word choice, spelling and/or word formation.','Range allows flexibility and precision; less common words used with awareness of style; occasional word-choice or spelling errors'],
    ['Both','Lexical Resource',6,'Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation, but they do not impede communication.','Adequate range; less common vocabulary attempted, sometimes inaccurate; spelling errors do not block understanding'],
    ['Both','Lexical Resource',5,'Uses a limited range of vocabulary, but this is minimally adequate for the task. May make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.','Limited but minimally adequate range; noticeable spelling or word-formation errors; some reader strain'],
    ['Both','Lexical Resource',4,'Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task. Has limited control of word formation and/or spelling; errors may cause strain for the reader.','Only basic vocabulary, often repeated; vocabulary sometimes inappropriate; spelling errors strain the reader'],

    // ----- Grammatical Range and Accuracy -----
    ['Both','Grammatical Range and Accuracy',9,'Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as slips.','Wide range of structures; full flexibility and accuracy; errors are rare slips'],
    ['Both','Grammatical Range and Accuracy',8,'Uses a wide range of structures. The majority of sentences are error-free. Makes only very occasional errors or inappropriacies.','Wide range of sentence structures; most sentences error-free; very occasional errors only'],
    ['Both','Grammatical Range and Accuracy',7,'Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.','Variety of complex structures; frequent error-free sentences; a few grammar or punctuation errors'],
    ['Both','Grammatical Range and Accuracy',6,'Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.','Mix of simple and complex sentences; some grammar or punctuation errors; errors rarely block meaning'],
    ['Both','Grammatical Range and Accuracy',5,'Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple sentences. May make frequent grammatical errors and punctuation may be faulty; errors can cause some difficulty for the reader.','Limited range of structures; complex sentences less accurate than simple ones; frequent grammar errors cause some difficulty'],
    ['Both','Grammatical Range and Accuracy',4,'Uses only a very limited range of structures with only rare use of subordinate clauses. Some structures are accurate but errors predominate, and punctuation is often faulty.','Very limited range of structures; subordinate clauses rare; errors predominate; punctuation often faulty'],
  ];
}
