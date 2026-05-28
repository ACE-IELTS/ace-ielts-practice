/* ============================================================
   ACE IELTS — Shared band descriptor module
   ------------------------------------------------------------
   Source of truth for both the Reading and Writing mock sites.

   What's in this file:
     1. IELTS Writing band descriptors (Task 1 + Task 2),
        bands 4–9, all four criteria.
        Paraphrased from the official public descriptors
        published by Cambridge / IDP / British Council.
     2. IELTS Academic Reading raw-score → band conversion table.
     3. Helper functions:
          bandFromRawReading(raw)
          descriptorFor(taskNumber, criterion, band)
          nextBandUp(taskNumber, criterion, band)

   This file is referenced by both reading/index.html and
   writing/index.html via:
       <script src="../shared/band_descriptors.js"></script>

   Exposes three globals on `window`:
       IELTS_BAND_DESCRIPTORS
       IELTS_READING_CONVERSION
       IELTS_HELPERS
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. WRITING BAND DESCRIPTORS
     ----------------------------------------------------------
     Structure:
       IELTS_BAND_DESCRIPTORS[taskKey][criterion][band] = {
         summary:    short prose paragraph (1–3 sentences)
         indicators: 2–4 concrete observable behaviours
       }
       taskKey   ∈ "task1" | "task2"
       criterion ∈ exact criterion name string
       band      ∈ 4 | 5 | 6 | 7 | 8 | 9   (integer keys)
     Bands 1–3 are omitted: they describe responses that are
     barely attempted and aren't useful for GEP-level feedback.
     ---------------------------------------------------------- */

  const TASK1_TA = {
    9: {
      summary:
        "Fully satisfies all the requirements of the task. Clearly presents a fully developed response.",
      indicators: [
        "Every part of the task is covered",
        "Overview is precise, sophisticated, and immediately clear",
        "All key features highlighted with supporting detail",
      ],
    },
    8: {
      summary:
        "Covers all requirements of the task sufficiently. Presents, highlights and illustrates key features clearly and appropriately.",
      indicators: [
        "All requirements of the task addressed",
        "Clear overview of trends, differences, or stages",
        "Key features illustrated with appropriate data",
      ],
    },
    7: {
      summary:
        "Covers the requirements of the task. Presents a clear overview of main trends, differences or stages. Clearly presents and highlights key features, but could be more fully extended.",
      indicators: [
        "All task requirements addressed",
        "Clear overview present",
        "Key features highlighted but extension could be deeper",
      ],
    },
    6: {
      summary:
        "Addresses the requirements of the task. Presents an overview with information appropriately selected. Presents and adequately highlights key features but details may be irrelevant, inappropriate or inaccurate.",
      indicators: [
        "Task requirements addressed",
        "Overview present but may lack precision",
        "Some inaccurate or irrelevant detail",
      ],
    },
    5: {
      summary:
        "Generally addresses the task; the format may be inappropriate in places. Recounts detail mechanically with no clear overview. Inadequately covers key features; there may be a tendency to focus on details.",
      indicators: [
        "Task partly addressed",
        "No clear overview, or overview is mechanical",
        "Focus on details rather than key features",
      ],
    },
    4: {
      summary:
        "Attempts to address the task but does not cover all key features; format may be inappropriate. May confuse key features with detail; parts may be unclear, irrelevant, repetitive or inaccurate.",
      indicators: [
        "Several key features missing",
        "No overview, or overview is confused",
        "Detail confused with main features",
      ],
    },
  };

  const TASK2_TR = {
    9: {
      summary:
        "Fully addresses all parts of the task. Presents a fully developed position in answer to the question with relevant, fully extended and well-supported ideas.",
      indicators: [
        "All parts of the prompt covered",
        "Position is clear and fully developed throughout",
        "Ideas extended with relevant, specific support",
      ],
    },
    8: {
      summary:
        "Sufficiently addresses all parts of the task. Presents a well-developed response with relevant, extended and supported ideas.",
      indicators: [
        "All parts of the prompt covered",
        "Well-developed position",
        "Ideas relevant and extended with support",
      ],
    },
    7: {
      summary:
        "Addresses all parts of the task. Presents a clear position throughout. Presents, extends and supports main ideas, but there may be a tendency to over-generalize or supporting ideas may lack focus.",
      indicators: [
        "All parts of the prompt covered",
        "Clear position throughout",
        "Main ideas supported, occasional overgeneralization",
      ],
    },
    6: {
      summary:
        "Addresses all parts of the task although some parts may be more fully covered than others. Presents a relevant position although conclusions may become unclear or repetitive. Presents relevant main ideas but some may be inadequately developed.",
      indicators: [
        "All parts of the prompt addressed but unevenly",
        "Position relevant but conclusion may be weak",
        "Some main ideas underdeveloped",
      ],
    },
    5: {
      summary:
        "Addresses the task only partially. Expresses a position but the development is not always clear and there may be no conclusions drawn. Presents some main ideas but these are limited and not sufficiently developed; there may be irrelevant detail.",
      indicators: [
        "Task only partially addressed",
        "Position present but not fully developed",
        "Limited ideas, some irrelevant detail",
      ],
    },
    4: {
      summary:
        "Responds to the task only in a minimal way or the answer is tangential; the format may be inappropriate. Presents a position but this is unclear. Some main ideas are difficult to identify and may be repetitive, irrelevant or not well supported.",
      indicators: [
        "Task barely addressed or answered tangentially",
        "Position unclear",
        "Main ideas hard to identify",
      ],
    },
  };

  const COHERENCE_COHESION = {
    9: {
      summary:
        "Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.",
      indicators: [
        "Cohesive devices used so smoothly they're invisible",
        "Paragraphing is precise and purposeful",
      ],
    },
    8: {
      summary:
        "Sequences information and ideas logically. Manages all aspects of cohesion well. Uses paragraphing sufficiently and appropriately.",
      indicators: [
        "Logical sequencing throughout",
        "Cohesion well managed",
        "Good paragraphing",
      ],
    },
    7: {
      summary:
        "Logically organises information and ideas; there is clear progression throughout. Uses a range of cohesive devices appropriately although there may be some under- or over-use.",
      indicators: [
        "Clear progression of ideas",
        "Range of linking words used",
        "Some under- or over-use of cohesive devices",
      ],
    },
    6: {
      summary:
        "Arranges information and ideas coherently and there is a clear overall progression. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical. May not always use referencing clearly or appropriately.",
      indicators: [
        "Clear overall progression",
        "Cohesive devices sometimes mechanical",
        "Referencing (this, it, they) not always clear",
      ],
    },
    5: {
      summary:
        "Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or over-use of cohesive devices. May be repetitive because of lack of referencing and substitution.",
      indicators: [
        "Organisation present but progression unclear",
        "Cohesive devices over-used or misused",
        "Repetition due to weak referencing",
      ],
    },
    4: {
      summary:
        "Presents information and ideas but these are not arranged coherently and there is no clear progression in the response. Uses some basic cohesive devices but these may be inaccurate or repetitive. May not write in paragraphs or paragraphing may be confusing.",
      indicators: [
        "No clear progression",
        "Basic linking words used inaccurately",
        "Paragraphing weak or absent",
      ],
    },
  };

  const LEXICAL_RESOURCE = {
    9: {
      summary:
        "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'.",
      indicators: [
        "Very wide vocabulary",
        "Sophisticated and natural lexical control",
        "Errors are extremely rare slips",
      ],
    },
    8: {
      summary:
        "Uses a wide range of vocabulary fluently and flexibly to convey precise meanings. Skilfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation. Produces rare errors in spelling and/or word formation.",
      indicators: [
        "Wide, fluent vocabulary",
        "Uncommon words used skilfully",
        "Rare spelling or word-formation errors",
      ],
    },
    7: {
      summary:
        "Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation. May produce occasional errors in word choice, spelling and/or word formation.",
      indicators: [
        "Range allows flexibility and precision",
        "Less common words used with awareness of style",
        "Occasional word-choice or spelling errors",
      ],
    },
    6: {
      summary:
        "Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation, but they do not impede communication.",
      indicators: [
        "Adequate range for the task",
        "Less common vocabulary attempted, sometimes inaccurate",
        "Spelling errors don't prevent understanding",
      ],
    },
    5: {
      summary:
        "Uses a limited range of vocabulary, but this is minimally adequate for the task. May make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader.",
      indicators: [
        "Limited but minimally adequate range",
        "Noticeable spelling or word-formation errors",
        "Some reader strain",
      ],
    },
    4: {
      summary:
        "Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task. Has limited control of word formation and/or spelling; errors may cause strain for the reader.",
      indicators: [
        "Only basic vocabulary, often repeated",
        "Vocabulary sometimes inappropriate",
        "Spelling errors strain the reader",
      ],
    },
  };

  const GRAMMATICAL_RANGE_ACCURACY = {
    9: {
      summary:
        "Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'.",
      indicators: [
        "Wide range of structures",
        "Full flexibility and accuracy",
        "Errors are rare slips",
      ],
    },
    8: {
      summary:
        "Uses a wide range of structures. The majority of sentences are error-free. Makes only very occasional errors or inappropriacies.",
      indicators: [
        "Wide range of sentence structures",
        "Most sentences error-free",
        "Very occasional errors only",
      ],
    },
    7: {
      summary:
        "Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.",
      indicators: [
        "Variety of complex structures",
        "Frequent error-free sentences",
        "A few grammar or punctuation errors",
      ],
    },
    6: {
      summary:
        "Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.",
      indicators: [
        "Mix of simple and complex sentences",
        "Some grammar or punctuation errors",
        "Errors rarely block meaning",
      ],
    },
    5: {
      summary:
        "Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple sentences. May make frequent grammatical errors and punctuation may be faulty; errors can cause some difficulty for the reader.",
      indicators: [
        "Limited range of structures",
        "Complex sentences less accurate than simple ones",
        "Frequent grammar errors cause some difficulty",
      ],
    },
    4: {
      summary:
        "Uses only a very limited range of structures with only rare use of subordinate clauses. Some structures are accurate but errors predominate, and punctuation is often faulty.",
      indicators: [
        "Very limited range of structures",
        "Subordinate clauses rare",
        "Errors predominate; punctuation often faulty",
      ],
    },
  };

  const IELTS_BAND_DESCRIPTORS = {
    task1: {
      "Task Achievement": TASK1_TA,
      "Coherence and Cohesion": COHERENCE_COHESION,
      "Lexical Resource": LEXICAL_RESOURCE,
      "Grammatical Range and Accuracy": GRAMMATICAL_RANGE_ACCURACY,
    },
    task2: {
      "Task Response": TASK2_TR,
      "Coherence and Cohesion": COHERENCE_COHESION,
      "Lexical Resource": LEXICAL_RESOURCE,
      "Grammatical Range and Accuracy": GRAMMATICAL_RANGE_ACCURACY,
    },
  };

  /* ----------------------------------------------------------
     2. ACADEMIC READING RAW → BAND CONVERSION TABLE
     ----------------------------------------------------------
     Source: the standard public IELTS Academic Reading
     conversion table. Inclusive ranges.

     Note: IELTS does NOT publish an exact authoritative table
     per test (each test is slightly statistically adjusted),
     but the values below match what is widely published as the
     reference / typical conversion and are what Cambridge IELTS
     practice books use. Good enough for practice scoring.

     Range is 0–40 raw → 0.0–9.0 band, in 0.5-band steps.
     ---------------------------------------------------------- */

  const IELTS_READING_CONVERSION = {
    academic: [
      { rawMin: 39, rawMax: 40, band: 9.0 },
      { rawMin: 37, rawMax: 38, band: 8.5 },
      { rawMin: 35, rawMax: 36, band: 8.0 },
      { rawMin: 33, rawMax: 34, band: 7.5 },
      { rawMin: 30, rawMax: 32, band: 7.0 },
      { rawMin: 27, rawMax: 29, band: 6.5 },
      { rawMin: 23, rawMax: 26, band: 6.0 },
      { rawMin: 19, rawMax: 22, band: 5.5 },
      { rawMin: 15, rawMax: 18, band: 5.0 },
      { rawMin: 13, rawMax: 14, band: 4.5 },
      { rawMin: 10, rawMax: 12, band: 4.0 },
      { rawMin: 8,  rawMax: 9,  band: 3.5 },
      { rawMin: 6,  rawMax: 7,  band: 3.0 },
      { rawMin: 4,  rawMax: 5,  band: 2.5 },
      { rawMin: 3,  rawMax: 3,  band: 2.0 },
      { rawMin: 2,  rawMax: 2,  band: 1.5 },
      { rawMin: 1,  rawMax: 1,  band: 1.0 },
      { rawMin: 0,  rawMax: 0,  band: 0.0 },
    ],
  };

  /* ----------------------------------------------------------
     3. HELPER FUNCTIONS
     ---------------------------------------------------------- */

  /**
   * Convert a raw Reading score (0–40) into the IELTS band.
   * @param {number} raw       Number of correct answers (0–40).
   * @param {string} [type]    "academic" — only academic supported here.
   * @returns {number|null}    Band 0.0–9.0, or null if raw is invalid.
   */
  function bandFromRawReading(raw, type) {
    type = type || "academic";
    const table = IELTS_READING_CONVERSION[type];
    if (!table) return null;
    if (typeof raw !== "number" || isNaN(raw)) return null;
    if (raw < 0 || raw > 40) return null;
    for (const row of table) {
      if (raw >= row.rawMin && raw <= row.rawMax) return row.band;
    }
    return null;
  }

  /**
   * Look up the descriptor for a specific task/criterion/band.
   * If the exact integer band isn't in the table (e.g. 6.5),
   * we floor to the nearest integer band (6.5 → 6).
   * @param {number} taskNumber 1 or 2.
   * @param {string} criterion  Exact criterion name (case-sensitive).
   * @param {number} band       Band score, integer or half-band.
   * @returns {object|null}     { summary, indicators } or null.
   */
  function descriptorFor(taskNumber, criterion, band) {
    const taskKey = taskNumber === 1 ? "task1" : taskNumber === 2 ? "task2" : null;
    if (!taskKey) return null;
    const taskBlock = IELTS_BAND_DESCRIPTORS[taskKey];
    if (!taskBlock || !taskBlock[criterion]) return null;
    const intBand = Math.max(4, Math.min(9, Math.floor(band)));
    return taskBlock[criterion][intBand] || null;
  }

  /**
   * Return the descriptor for the band immediately above the given one,
   * so we can show students what they need to do to reach the next band.
   * @param {number} taskNumber 1 or 2.
   * @param {string} criterion  Exact criterion name.
   * @param {number} band       Current band.
   * @returns {object|null}     { band, summary, indicators } or null.
   */
  function nextBandUp(taskNumber, criterion, band) {
    const intBand = Math.max(4, Math.min(9, Math.floor(band)));
    const next = intBand + 1;
    if (next > 9) return null;
    const d = descriptorFor(taskNumber, criterion, next);
    if (!d) return null;
    return Object.assign({ band: next }, d);
  }

  /**
   * Compute overall IELTS Writing band from the four criterion bands.
   * IELTS convention: arithmetic mean, then round to nearest 0.5.
   * (Specifically: x.25 rounds up to x.5; x.75 rounds up to x+1.)
   * @param {object} crits  { "Task Achievement": 6, "Coherence...": 6.5, ... }
   * @returns {number|null} Overall band, or null if any criterion missing.
   */
  function overallWritingBand(crits) {
    const values = Object.values(crits || {}).filter(
      (v) => typeof v === "number" && !isNaN(v)
    );
    if (values.length !== 4) return null;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    // Round to nearest 0.5, with .25 and .75 rounding UP per IELTS rule.
    const doubled = mean * 2;
    const rounded = Math.round(doubled + 0.0001); // tiny epsilon for the .25/.75 rule
    return rounded / 2;
  }

  /* ----------------------------------------------------------
     EXPORTS
     ---------------------------------------------------------- */

  window.IELTS_BAND_DESCRIPTORS = IELTS_BAND_DESCRIPTORS;
  window.IELTS_READING_CONVERSION = IELTS_READING_CONVERSION;
  window.IELTS_HELPERS = {
    bandFromRawReading: bandFromRawReading,
    descriptorFor: descriptorFor,
    nextBandUp: nextBandUp,
    overallWritingBand: overallWritingBand,
  };

  /* ----------------------------------------------------------
     OPTIONAL: light self-check (only logs to console)
     ---------------------------------------------------------- */
  if (typeof console !== "undefined" && console.assert) {
    console.assert(bandFromRawReading(40) === 9.0,  "Reading: 40 → 9.0");
    console.assert(bandFromRawReading(30) === 7.0,  "Reading: 30 → 7.0");
    console.assert(bandFromRawReading(23) === 6.0,  "Reading: 23 → 6.0");
    console.assert(bandFromRawReading(0)  === 0.0,  "Reading: 0 → 0.0");
    console.assert(bandFromRawReading(-1) === null, "Reading: -1 → null");
    console.assert(
      descriptorFor(1, "Task Achievement", 7) &&
      descriptorFor(1, "Task Achievement", 7).summary.length > 0,
      "Descriptor T1 TA band 7 exists"
    );
    console.assert(
      descriptorFor(2, "Task Response", 6) &&
      descriptorFor(2, "Task Response", 6).summary.length > 0,
      "Descriptor T2 TR band 6 exists"
    );
    console.assert(
      overallWritingBand({
        "Task Achievement": 6, "Coherence and Cohesion": 6,
        "Lexical Resource": 7, "Grammatical Range and Accuracy": 6,
      }) === 6.5,
      "Overall: (6+6+7+6)/4 = 6.25 → rounds up to 6.5 per IELTS rule"
    );
  }
})();
