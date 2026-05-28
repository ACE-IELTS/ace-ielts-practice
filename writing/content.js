/* ============================================================
   ACE IELTS — Writing Mock Test 1 — content
   ------------------------------------------------------------
   Two original prompts in IELTS Academic Writing format:

     Task 1 — describe visual information (line graph here).
              Minimum 150 words. Suggested time: 20 minutes.
     Task 2 — write a discursive essay.
              Minimum 250 words. Suggested time: 40 minutes.

   To add a new mock test, copy this file to e.g.
   writing/content-2.js and edit the prompts inside.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     TASK 1 — Academic chart-description task
     ---------------------------------------------------------- */

  const TASK_1 = {
    id: "museum_visitors_2018_2024",
    type: "Line graph",
    minWords: 150,
    suggestedMinutes: 20,
    // Rubric pieces — rendered as separate paragraphs in the correct IELTS order.
    description:
      "The line graph below shows the annual number of visitors to three museums in a UK city between 2018 and 2024.",
    task:
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    // The visual is an inline SVG so the site works offline.
    // Render the SVG as-is into the page; it scales responsively.
    visualSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
      // background card
      '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e5ea" stroke-width="1" rx="8"/>' +
      // title
      '<text x="320" y="28" text-anchor="middle" font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="14" font-weight="600" fill="#1f2329">Annual visitors to three museums (2018&#8211;2024)</text>' +
      '<text x="320" y="46" text-anchor="middle" font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="11" fill="#7a838f">Numbers given in thousands</text>' +
      // y-axis gridlines + labels (0 to 300 in steps of 50)
      '<g font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="10" fill="#7a838f">' +
        '<line x1="70" y1="320" x2="610" y2="320" stroke="#c5cee0" stroke-width="1"/>' +
        '<line x1="70" y1="277" x2="610" y2="277" stroke="#eef0f4" stroke-width="1"/>' +
        '<line x1="70" y1="234" x2="610" y2="234" stroke="#eef0f4" stroke-width="1"/>' +
        '<line x1="70" y1="191" x2="610" y2="191" stroke="#eef0f4" stroke-width="1"/>' +
        '<line x1="70" y1="148" x2="610" y2="148" stroke="#eef0f4" stroke-width="1"/>' +
        '<line x1="70" y1="105" x2="610" y2="105" stroke="#eef0f4" stroke-width="1"/>' +
        '<line x1="70" y1="62"  x2="610" y2="62"  stroke="#eef0f4" stroke-width="1"/>' +
        '<text x="62" y="324" text-anchor="end">0</text>' +
        '<text x="62" y="281" text-anchor="end">50</text>' +
        '<text x="62" y="238" text-anchor="end">100</text>' +
        '<text x="62" y="195" text-anchor="end">150</text>' +
        '<text x="62" y="152" text-anchor="end">200</text>' +
        '<text x="62" y="109" text-anchor="end">250</text>' +
        '<text x="62" y="66"  text-anchor="end">300</text>' +
      '</g>' +
      // x-axis
      '<line x1="70" y1="320" x2="70" y2="60" stroke="#c5cee0" stroke-width="1"/>' +
      '<g font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="11" fill="#4a5260">' +
        '<text x="100" y="340" text-anchor="middle">2018</text>' +
        '<text x="175" y="340" text-anchor="middle">2019</text>' +
        '<text x="250" y="340" text-anchor="middle">2020</text>' +
        '<text x="325" y="340" text-anchor="middle">2021</text>' +
        '<text x="400" y="340" text-anchor="middle">2022</text>' +
        '<text x="475" y="340" text-anchor="middle">2023</text>' +
        '<text x="550" y="340" text-anchor="middle">2024</text>' +
      '</g>' +
      // Data lines.
      // Coordinate mapping: y(visitors) = 320 - (visitors/300 * 260)
      // Years map: 2018→100, 2019→175, 2020→250, 2021→325, 2022→400, 2023→475, 2024→550
      // Natural History Museum: 200, 240, 60, 130, 215, 250, 270  (top line)
      '<polyline fill="none" stroke="#1e4f9c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"' +
        ' points="100,147 175,112 250,268 325,207 400,134 475,103 550,86"/>' +
      // City Art Gallery: 90, 100, 30, 70, 110, 130, 150  (middle line)
      '<polyline fill="none" stroke="#c47a00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"' +
        ' points="100,242 175,233 250,294 325,259 400,225 475,207 550,190"/>' +
      // Maritime Museum: 80, 75, 25, 40, 70, 85, 95  (bottom line)
      '<polyline fill="none" stroke="#1d7a3c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"' +
        ' points="100,251 175,255 250,298 325,285 400,259 475,247 550,238"/>' +
      // Point markers
      '<g fill="#1e4f9c">' +
        '<circle cx="100" cy="147" r="3"/><circle cx="175" cy="112" r="3"/><circle cx="250" cy="268" r="3"/>' +
        '<circle cx="325" cy="207" r="3"/><circle cx="400" cy="134" r="3"/><circle cx="475" cy="103" r="3"/>' +
        '<circle cx="550" cy="86" r="3"/></g>' +
      '<g fill="#c47a00">' +
        '<circle cx="100" cy="242" r="3"/><circle cx="175" cy="233" r="3"/><circle cx="250" cy="294" r="3"/>' +
        '<circle cx="325" cy="259" r="3"/><circle cx="400" cy="225" r="3"/><circle cx="475" cy="207" r="3"/>' +
        '<circle cx="550" cy="190" r="3"/></g>' +
      '<g fill="#1d7a3c">' +
        '<circle cx="100" cy="251" r="3"/><circle cx="175" cy="255" r="3"/><circle cx="250" cy="298" r="3"/>' +
        '<circle cx="325" cy="285" r="3"/><circle cx="400" cy="259" r="3"/><circle cx="475" cy="247" r="3"/>' +
        '<circle cx="550" cy="238" r="3"/></g>' +
      // Legend
      '<g font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="11" fill="#1f2329">' +
        '<rect x="78"  y="358" width="18" height="3" fill="#1e4f9c"/>' +
        '<text x="100" y="362">Natural History Museum</text>' +
        '<rect x="260" y="358" width="18" height="3" fill="#c47a00"/>' +
        '<text x="282" y="362">City Art Gallery</text>' +
        '<rect x="410" y="358" width="18" height="3" fill="#1d7a3c"/>' +
        '<text x="432" y="362">Maritime Museum</text>' +
      '</g>' +
      '</svg>',
    // Underlying data — used for the auto-feedback engine so it can
    // check whether the student has mentioned a few key features
    // (e.g. did they identify the 2020 drop? did they compare the
    // top vs bottom line?). Not displayed to the student.
    keyFeatures: [
      { tag: "all_dropped_2020",      keywords: ["2020", "drop", "decline", "fall", "fell", "decrease", "plunge", "covid", "pandemic"] },
      { tag: "natural_history_highest", keywords: ["natural history", "highest", "most", "top", "leading"] },
      { tag: "all_recovered",         keywords: ["recover", "rebound", "rose", "increase", "growth", "climb", "return"] },
      { tag: "overall_growth",        keywords: ["overall", "by 2024", "by the end", "total"] },
    ],
  };

  /* ----------------------------------------------------------
     TASK 2 — Discursive essay
     ---------------------------------------------------------- */

  const TASK_2 = {
    id: "voluntary_work_compulsory",
    promptType: "Discussion essay",
    minWords: 250,
    suggestedMinutes: 40,
    prompt:
      "Some people believe that governments should require all young adults to spend one year doing voluntary work for their community before starting university or full-time employment.",
    question:
      "Discuss the possible advantages and disadvantages of making voluntary work compulsory for young adults, and give your own opinion.",
    examplesNote:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    timeNote: "You should spend about 40 minutes on this task.",
    wordNote: "Write at least 250 words.",
    // Topic keywords used by the auto-feedback engine to check
    // whether the essay actually addresses the prompt.
    promptKeywords: [
      "voluntary", "volunteer", "community", "compulsory", "mandatory",
      "young adults", "youth", "government", "service", "obligation",
      "society", "skills", "experience",
    ],
  };

  /* ----------------------------------------------------------
     EXPORT
     ---------------------------------------------------------- */

  window.WRITING_CONTENT = {
    mockId: "writing-mock-1",
    title: "ACE IELTS Writing Mock Test 1",
    durationMinutes: 60,
    tasks: [TASK_1, TASK_2],
  };
})();
