/* ============================================================
   ACE IELTS — Writing Mock Test — content bank
   ------------------------------------------------------------
   Six Task 1 prompts (line graph / bar chart / pie chart /
   table / process diagram / map) and six Task 2 prompts
   (opinion / discussion / advantages-disadvantages /
   problem-solution / two-part / agree-disagree).

   On each test start the site picks one Task 1 and one Task 2
   at random. The choice is persisted in localStorage so a
   refresh doesn't reshuffle them.

   All visuals are original SVGs designed to match the site's
   typography and palette.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Shared SVG header / footer helpers — kept inline below
     for readability. Every visual uses viewBox 0 0 640 380
     so they render at identical size in the prompt panel.
     ---------------------------------------------------------- */

  /* ============================================================
     TASK 1 BANK
     ============================================================ */

  // ----- 1A. Line graph — museum visitors 2018-2024 -----------
  const TASK_1A = {
    id: "line_museum_visitors",
    type: "Line graph",
    minWords: 150,
    suggestedMinutes: 20,
    description:
      "The line graph below shows the annual number of visitors to three museums in a UK city between 2018 and 2024.",
    task:
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    visualSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
      '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="12"/>' +
      '<text x="320" y="28" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#0f172a">Annual visitors to three museums (2018&#8211;2024)</text>' +
      '<text x="320" y="46" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#94a3b8">Numbers given in thousands</text>' +
      '<g font-family="Inter,system-ui,sans-serif" font-size="10" fill="#94a3b8">' +
        '<line x1="70" y1="320" x2="610" y2="320" stroke="#cbd5e1" stroke-width="1"/>' +
        '<line x1="70" y1="277" x2="610" y2="277" stroke="#f1f5f9"/><line x1="70" y1="234" x2="610" y2="234" stroke="#f1f5f9"/><line x1="70" y1="191" x2="610" y2="191" stroke="#f1f5f9"/><line x1="70" y1="148" x2="610" y2="148" stroke="#f1f5f9"/><line x1="70" y1="105" x2="610" y2="105" stroke="#f1f5f9"/><line x1="70" y1="62" x2="610" y2="62" stroke="#f1f5f9"/>' +
        '<text x="62" y="324" text-anchor="end">0</text><text x="62" y="281" text-anchor="end">50</text><text x="62" y="238" text-anchor="end">100</text><text x="62" y="195" text-anchor="end">150</text><text x="62" y="152" text-anchor="end">200</text><text x="62" y="109" text-anchor="end">250</text><text x="62" y="66" text-anchor="end">300</text>' +
      '</g>' +
      '<line x1="70" y1="320" x2="70" y2="60" stroke="#cbd5e1"/>' +
      '<g font-family="Inter,system-ui,sans-serif" font-size="11" fill="#475569">' +
        '<text x="100" y="340" text-anchor="middle">2018</text><text x="175" y="340" text-anchor="middle">2019</text><text x="250" y="340" text-anchor="middle">2020</text><text x="325" y="340" text-anchor="middle">2021</text><text x="400" y="340" text-anchor="middle">2022</text><text x="475" y="340" text-anchor="middle">2023</text><text x="550" y="340" text-anchor="middle">2024</text>' +
      '</g>' +
      '<polyline fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="100,147 175,112 250,268 325,207 400,134 475,103 550,86"/>' +
      '<polyline fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="100,242 175,233 250,294 325,259 400,225 475,207 550,190"/>' +
      '<polyline fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="100,251 175,255 250,298 325,285 400,259 475,247 550,238"/>' +
      '<g fill="#4f46e5"><circle cx="100" cy="147" r="3"/><circle cx="175" cy="112" r="3"/><circle cx="250" cy="268" r="3"/><circle cx="325" cy="207" r="3"/><circle cx="400" cy="134" r="3"/><circle cx="475" cy="103" r="3"/><circle cx="550" cy="86" r="3"/></g>' +
      '<g fill="#d97706"><circle cx="100" cy="242" r="3"/><circle cx="175" cy="233" r="3"/><circle cx="250" cy="294" r="3"/><circle cx="325" cy="259" r="3"/><circle cx="400" cy="225" r="3"/><circle cx="475" cy="207" r="3"/><circle cx="550" cy="190" r="3"/></g>' +
      '<g fill="#059669"><circle cx="100" cy="251" r="3"/><circle cx="175" cy="255" r="3"/><circle cx="250" cy="298" r="3"/><circle cx="325" cy="285" r="3"/><circle cx="400" cy="259" r="3"/><circle cx="475" cy="247" r="3"/><circle cx="550" cy="238" r="3"/></g>' +
      '<g font-family="Inter,system-ui,sans-serif" font-size="11" fill="#0f172a">' +
        '<rect x="78" y="358" width="18" height="3" fill="#4f46e5"/><text x="100" y="362">Natural History Museum</text>' +
        '<rect x="260" y="358" width="18" height="3" fill="#d97706"/><text x="282" y="362">City Art Gallery</text>' +
        '<rect x="410" y="358" width="18" height="3" fill="#059669"/><text x="432" y="362">Maritime Museum</text>' +
      '</g>' +
      '</svg>',
    keyFeatures: [
      { tag: "drop_2020", keywords: ["2020","drop","decline","fell","decrease","pandemic"] },
      { tag: "recovery", keywords: ["recover","rebound","rose","increase","growth","climb"] },
      { tag: "natural_history_top", keywords: ["natural history","highest","top","most"] },
    ],
  };

  // ----- 1B. Bar chart — average hours of TV per day ----------
  const TASK_1B = {
    id: "bar_tv_hours",
    type: "Bar chart",
    minWords: 150,
    suggestedMinutes: 20,
    description:
      "The bar chart below shows the average number of hours per day that people in three age groups in the UK spent watching television in 2024, separately for weekdays and weekends.",
    task:
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    visualSvg: (function () {
      // Bar geometry — group of two bars per age band
      // x-base 100, 280, 460 — width 60 each, 8px gap
      // y-base 320, max-height -> value (out of 5 hours) * 50
      const bars = [
        { x: 100, h: 2.0 * 50, color: "#4f46e5", label: "Weekdays" },
        { x: 168, h: 3.5 * 50, color: "#0ea5e9", label: "Weekends" },
        { x: 280, h: 2.5 * 50, color: "#4f46e5" },
        { x: 348, h: 3.8 * 50, color: "#0ea5e9" },
        { x: 460, h: 3.5 * 50, color: "#4f46e5" },
        { x: 528, h: 4.5 * 50, color: "#0ea5e9" },
      ];
      const barsSvg = bars.map(b => {
        const y = 320 - b.h;
        return '<rect x="' + b.x + '" y="' + y + '" width="60" height="' + b.h + '" rx="4" fill="' + b.color + '"/>' +
               '<text x="' + (b.x + 30) + '" y="' + (y - 6) + '" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="600" fill="#0f172a">' + (b.h / 50).toFixed(1) + '</text>';
      }).join("");
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
        '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="12"/>' +
        '<text x="320" y="28" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#0f172a">Average daily hours of TV watched (UK, 2024)</text>' +
        '<text x="320" y="46" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#94a3b8">By age group, weekdays vs weekends</text>' +
        // gridlines
        '<g font-family="Inter,system-ui,sans-serif" font-size="10" fill="#94a3b8">' +
          '<line x1="80" y1="320" x2="620" y2="320" stroke="#cbd5e1"/>' +
          '<line x1="80" y1="270" x2="620" y2="270" stroke="#f1f5f9"/><line x1="80" y1="220" x2="620" y2="220" stroke="#f1f5f9"/><line x1="80" y1="170" x2="620" y2="170" stroke="#f1f5f9"/><line x1="80" y1="120" x2="620" y2="120" stroke="#f1f5f9"/><line x1="80" y1="70" x2="620" y2="70" stroke="#f1f5f9"/>' +
          '<text x="72" y="324" text-anchor="end">0</text><text x="72" y="274" text-anchor="end">1</text><text x="72" y="224" text-anchor="end">2</text><text x="72" y="174" text-anchor="end">3</text><text x="72" y="124" text-anchor="end">4</text><text x="72" y="74" text-anchor="end">5</text>' +
          '<text x="40" y="195" text-anchor="middle" transform="rotate(-90 40 195)" fill="#475569" font-size="11">Hours per day</text>' +
        '</g>' +
        '<line x1="80" y1="60" x2="80" y2="320" stroke="#cbd5e1"/>' +
        barsSvg +
        // x labels
        '<g font-family="Inter,system-ui,sans-serif" font-size="12" font-weight="600" fill="#0f172a">' +
          '<text x="164" y="345" text-anchor="middle">18&#8211;29</text>' +
          '<text x="344" y="345" text-anchor="middle">30&#8211;49</text>' +
          '<text x="524" y="345" text-anchor="middle">50+</text>' +
        '</g>' +
        // legend
        '<g font-family="Inter,system-ui,sans-serif" font-size="11" fill="#0f172a">' +
          '<rect x="200" y="358" width="14" height="10" rx="2" fill="#4f46e5"/><text x="220" y="368">Weekdays</text>' +
          '<rect x="350" y="358" width="14" height="10" rx="2" fill="#0ea5e9"/><text x="370" y="368">Weekends</text>' +
        '</g>' +
      '</svg>';
    })(),
    keyFeatures: [
      { tag: "older_higher", keywords: ["older","50","highest","more"] },
      { tag: "weekend_higher", keywords: ["weekend","higher","more","greater"] },
    ],
  };

  // ----- 1C. Pie charts — household spending 1990 vs 2020 -----
  const TASK_1C = {
    id: "pie_household_spending",
    type: "Pie charts",
    minWords: 150,
    suggestedMinutes: 20,
    description:
      "The two pie charts below show how a typical British household spent its monthly income in 1990 and in 2020.",
    task:
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    visualSvg: (function () {
      // Two donut charts
      const slices1990 = [
        { label: "Food",       pct: 28, color: "#4f46e5" },
        { label: "Housing",    pct: 22, color: "#0ea5e9" },
        { label: "Transport",  pct: 14, color: "#d97706" },
        { label: "Leisure",    pct: 11, color: "#059669" },
        { label: "Healthcare", pct:  9, color: "#dc2626" },
        { label: "Other",      pct: 16, color: "#94a3b8" },
      ];
      const slices2020 = [
        { label: "Food",       pct: 17, color: "#4f46e5" },
        { label: "Housing",    pct: 34, color: "#0ea5e9" },
        { label: "Transport",  pct: 12, color: "#d97706" },
        { label: "Leisure",    pct: 15, color: "#059669" },
        { label: "Healthcare", pct: 14, color: "#dc2626" },
        { label: "Other",      pct:  8, color: "#94a3b8" },
      ];
      function pie(cx, cy, r, slices, year) {
        let acc = 0;
        let parts = "";
        slices.forEach(s => {
          const a0 = acc * 0.01 * 2 * Math.PI - Math.PI / 2;
          const a1 = (acc + s.pct) * 0.01 * 2 * Math.PI - Math.PI / 2;
          const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
          const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
          const large = s.pct > 50 ? 1 : 0;
          parts += '<path d="M ' + cx + ' ' + cy + ' L ' + x0.toFixed(2) + ' ' + y0.toFixed(2) +
            ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' Z" fill="' + s.color + '" stroke="#fff" stroke-width="2"/>';
          // inline percentage label inside slice
          const mid = (a0 + a1) / 2;
          const lr = r * 0.62;
          const lx = cx + lr * Math.cos(mid);
          const ly = cy + lr * Math.sin(mid);
          if (s.pct >= 8) {
            parts += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700" fill="#fff">' + s.pct + '%</text>';
          }
          acc += s.pct;
        });
        parts += '<text x="' + cx + '" y="' + (cy + r + 22) + '" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="13" font-weight="700" fill="#0f172a">' + year + '</text>';
        return parts;
      }
      let legend = "";
      slices1990.forEach((s, i) => {
        const x = 80 + (i % 3) * 170;
        const y = 350 + Math.floor(i / 3) * 15;
        legend += '<rect x="' + x + '" y="' + (y - 8) + '" width="12" height="9" rx="2" fill="' + s.color + '"/>' +
                  '<text x="' + (x + 18) + '" y="' + y + '" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#0f172a">' + s.label + '</text>';
      });
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
        '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="12"/>' +
        '<text x="320" y="28" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#0f172a">British household monthly spending</text>' +
        '<text x="320" y="46" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#94a3b8">Percentage of income by category</text>' +
        pie(180, 190, 95, slices1990, "1990") +
        pie(460, 190, 95, slices2020, "2020") +
        legend +
      '</svg>';
    })(),
    keyFeatures: [
      { tag: "food_decreased", keywords: ["food","decreased","decline","less","fell"] },
      { tag: "housing_increased", keywords: ["housing","increased","rose","more","greater"] },
    ],
  };

  // ----- 1D. Table — smartphone ownership by country ----------
  const TASK_1D = {
    id: "table_smartphone_ownership",
    type: "Table",
    minWords: 150,
    suggestedMinutes: 20,
    description:
      "The table below shows the percentage of adults who owned a smartphone in four countries in 2005, 2010, 2015, 2020 and 2024.",
    task:
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    visualSvg: (function () {
      const headers = ["Country", "2005", "2010", "2015", "2020", "2024"];
      const rows = [
        ["United Kingdom",  "8%",  "36%", "72%", "85%", "92%"],
        ["Japan",           "12%", "42%", "78%", "87%", "93%"],
        ["South Africa",    "3%",  "18%", "48%", "74%", "82%"],
        ["Brazil",          "4%",  "22%", "56%", "78%", "85%"],
      ];
      const cellW = 88;
      const cellH = 38;
      const startX = 30;
      const startY = 90;
      let svg = "";
      // header row
      headers.forEach((h, i) => {
        svg += '<rect x="' + (startX + i * cellW) + '" y="' + startY + '" width="' + cellW + '" height="' + cellH + '" fill="#4f46e5"/>' +
               '<text x="' + (startX + i * cellW + cellW / 2) + '" y="' + (startY + cellH / 2 + 4) + '" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="12" font-weight="700" fill="#ffffff">' + h + '</text>';
      });
      // data rows
      rows.forEach((row, ri) => {
        const y = startY + (ri + 1) * cellH;
        row.forEach((cell, ci) => {
          const x = startX + ci * cellW;
          const fill = ri % 2 === 0 ? "#ffffff" : "#f8fafc";
          svg += '<rect x="' + x + '" y="' + y + '" width="' + cellW + '" height="' + cellH + '" fill="' + fill + '" stroke="#e2e8f0"/>';
          const fontWeight = ci === 0 ? "700" : "500";
          const color = ci === 0 ? "#0f172a" : "#475569";
          const align = ci === 0 ? "start" : "middle";
          const tx = ci === 0 ? (x + 12) : (x + cellW / 2);
          svg += '<text x="' + tx + '" y="' + (y + cellH / 2 + 4) + '" text-anchor="' + align + '" font-family="Inter,system-ui,sans-serif" font-size="13" font-weight="' + fontWeight + '" fill="' + color + '">' + cell + '</text>';
        });
      });
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
        '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="12"/>' +
        '<text x="320" y="32" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#0f172a">Smartphone ownership in four countries</text>' +
        '<text x="320" y="52" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#94a3b8">Percentage of adult population, 2005&#8211;2024</text>' +
        svg +
      '</svg>';
    })(),
    keyFeatures: [
      { tag: "all_increased", keywords: ["increase","rose","grew","growth"] },
      { tag: "japan_highest", keywords: ["japan","highest","top","most"] },
    ],
  };

  // ----- 1E. Process diagram — how honey is produced ----------
  const TASK_1E = {
    id: "process_honey_production",
    type: "Process diagram",
    minWords: 150,
    suggestedMinutes: 20,
    description:
      "The diagram below illustrates the process by which honey is produced by bees and prepared for human consumption.",
    task:
      "Summarise the information by selecting and reporting the main features.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    visualSvg: (function () {
      // 6 boxes connected by arrows
      const steps = [
        { x:  40, y:  90, w: 130, h: 60, title: "1. Visit flower",      sub: "Bee collects nectar" },
        { x: 210, y:  90, w: 130, h: 60, title: "2. Return to hive",    sub: "Carrying nectar" },
        { x: 380, y:  90, w: 130, h: 60, title: "3. Pass to workers",   sub: "Mouth-to-mouth" },
        { x: 380, y: 220, w: 130, h: 60, title: "4. Stored in cells",   sub: "Honeycomb" },
        { x: 210, y: 220, w: 130, h: 60, title: "5. Wings fan nectar",  sub: "Water evaporates" },
        { x:  40, y: 220, w: 130, h: 60, title: "6. Cell sealed",       sub: "With beeswax cap" },
      ];
      let parts = "";
      steps.forEach(s => {
        parts += '<rect x="' + s.x + '" y="' + s.y + '" width="' + s.w + '" height="' + s.h + '" rx="10" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.5"/>' +
                 '<text x="' + (s.x + s.w / 2) + '" y="' + (s.y + 24) + '" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="12" font-weight="700" fill="#3730a3">' + s.title + '</text>' +
                 '<text x="' + (s.x + s.w / 2) + '" y="' + (s.y + 42) + '" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#475569">' + s.sub + '</text>';
      });
      // arrows
      const arrowMarker = '<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5"/></marker></defs>';
      const arrows = [
        // 1 → 2
        { x1: 170, y1: 120, x2: 210, y2: 120 },
        // 2 → 3
        { x1: 340, y1: 120, x2: 380, y2: 120 },
        // 3 → 4 (down)
        { x1: 445, y1: 150, x2: 445, y2: 220 },
        // 4 → 5 (left)
        { x1: 380, y1: 250, x2: 340, y2: 250 },
        // 5 → 6 (left)
        { x1: 210, y1: 250, x2: 170, y2: 250 },
      ];
      arrows.forEach(a => {
        parts += '<line x1="' + a.x1 + '" y1="' + a.y1 + '" x2="' + a.x2 + '" y2="' + a.y2 + '" stroke="#4f46e5" stroke-width="2" marker-end="url(#arr)"/>';
      });
      // arrow from 6 to honey jar (output)
      parts += '<line x1="105" y1="280" x2="105" y2="325" stroke="#4f46e5" stroke-width="2" marker-end="url(#arr)"/>';
      parts += '<text x="105" y="358" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="12" font-weight="700" fill="#0f172a">Honey ready for harvest</text>';
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
        '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="12"/>' +
        '<text x="320" y="32" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#0f172a">How honey is produced by bees</text>' +
        '<text x="320" y="52" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#94a3b8">From flower to finished honey</text>' +
        arrowMarker + parts +
      '</svg>';
    })(),
    keyFeatures: [
      { tag: "stages_named", keywords: ["stage","step","first","second","then","next","finally"] },
      { tag: "passive_voice", keywords: ["is collected","is passed","is stored","is sealed","is fanned"] },
    ],
  };

  // ----- 1F. Map — town park, 2010 vs 2025 --------------------
  const TASK_1F = {
    id: "map_park_redesign",
    type: "Map",
    minWords: 150,
    suggestedMinutes: 20,
    description:
      "The two maps below show the layout of Cherry Park in 2010 and after its redevelopment in 2025.",
    task:
      "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    timeNote: "You should spend about 20 minutes on this task.",
    wordNote: "Write at least 150 words.",
    visualSvg: (function () {
      // Two side-by-side maps, each ~270 wide
      function map2010() {
        return '<rect x="30" y="80" width="270" height="240" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" rx="8"/>' +
          // path
          '<path d="M 60 110 Q 165 200 270 290" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none" stroke-dasharray="3 3"/>' +
          // playground
          '<rect x="55" y="240" width="60" height="55" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>' +
          '<text x="85" y="271" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="9" font-weight="600" fill="#92400e">Playground</text>' +
          // open field
          '<ellipse cx="200" cy="170" rx="60" ry="30" fill="#dcfce7" stroke="#22c55e" stroke-width="1.2"/>' +
          '<text x="200" y="174" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="600" fill="#166534">Open field</text>' +
          // title
          '<text x="165" y="100" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="13" font-weight="700" fill="#0f172a">2010</text>';
      }
      function map2025() {
        return '<rect x="340" y="80" width="270" height="240" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" rx="8"/>' +
          // multi paths
          '<path d="M 370 110 Q 475 145 580 130" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none"/>' +
          '<path d="M 360 200 Q 475 230 590 210" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none"/>' +
          '<path d="M 475 110 Q 475 200 475 295" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none"/>' +
          // larger playground
          '<rect x="358" y="240" width="80" height="65" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>' +
          '<text x="398" y="276" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="9" font-weight="600" fill="#92400e">Playground</text>' +
          // café
          '<rect x="500" y="105" width="55" height="35" rx="4" fill="#fce7f3" stroke="#db2777" stroke-width="1.2"/>' +
          '<text x="527" y="126" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="9" font-weight="600" fill="#9d174d">Café</text>' +
          // pond
          '<circle cx="535" cy="265" r="32" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.2"/>' +
          '<text x="535" y="269" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="600" fill="#1e3a8a">Pond</text>' +
          // title
          '<text x="475" y="100" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="13" font-weight="700" fill="#0f172a">2025</text>';
      }
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="100%" preserveAspectRatio="xMidYMid meet" style="max-width:640px;display:block">' +
        '<rect x="0" y="0" width="640" height="380" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="12"/>' +
        '<text x="320" y="32" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#0f172a">Cherry Park — layout before and after redevelopment</text>' +
        '<text x="320" y="52" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#94a3b8">Town map, simplified scale</text>' +
        map2010() +
        map2025() +
        // small legend
        '<g font-family="Inter,system-ui,sans-serif" font-size="10" fill="#475569">' +
          '<text x="30" y="355">— Pathways</text><text x="170" y="355">— New since 2010</text>' +
        '</g>' +
      '</svg>';
    })(),
    keyFeatures: [
      { tag: "compass_directions", keywords: ["north","south","east","west","corner"] },
      { tag: "passive_change", keywords: ["was","were","added","removed","replaced","built","converted"] },
    ],
  };

  /* ============================================================
     TASK 2 BANK
     ============================================================ */

  const TASK_2A = {
    id: "voluntary_work_compulsory",
    promptType: "Opinion essay",
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
    promptKeywords: ["voluntary","volunteer","community","compulsory","mandatory","young adults","youth","government","service","society"],
  };

  const TASK_2B = {
    id: "language_learning_young",
    promptType: "Discussion essay",
    minWords: 250,
    suggestedMinutes: 40,
    prompt:
      "Some people believe that children should start learning a foreign language as early as possible in primary school, while others argue that children should first master their own language before starting another.",
    question:
      "Discuss both views and give your own opinion.",
    examplesNote:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    timeNote: "You should spend about 40 minutes on this task.",
    wordNote: "Write at least 250 words.",
    promptKeywords: ["language","children","primary school","foreign","mother tongue","bilingual","education","learning"],
  };

  const TASK_2C = {
    id: "work_from_home",
    promptType: "Advantages and disadvantages",
    minWords: 250,
    suggestedMinutes: 40,
    prompt:
      "An increasing number of employees now work from home instead of commuting to a traditional office.",
    question:
      "Do the advantages of working from home outweigh the disadvantages?",
    examplesNote:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    timeNote: "You should spend about 40 minutes on this task.",
    wordNote: "Write at least 250 words.",
    promptKeywords: ["work","home","remote","office","commute","employees","productivity","balance","isolation"],
  };

  const TASK_2D = {
    id: "city_traffic_problem",
    promptType: "Problem and solution",
    minWords: 250,
    suggestedMinutes: 40,
    prompt:
      "Traffic congestion in major cities is becoming a serious problem, with average journey times increasing every year.",
    question:
      "What are the main causes of urban traffic congestion, and what measures could governments and citizens take to reduce it?",
    examplesNote:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    timeNote: "You should spend about 40 minutes on this task.",
    wordNote: "Write at least 250 words.",
    promptKeywords: ["traffic","congestion","city","urban","public transport","cars","commute","pollution","government"],
  };

  const TASK_2E = {
    id: "processed_food",
    promptType: "Two-part question",
    minWords: 250,
    suggestedMinutes: 40,
    prompt:
      "In many countries, processed and pre-packaged foods have become cheaper and more widely available than fresh, home-cooked meals.",
    question:
      "Why is this happening? What effects does this have on family life and on public health?",
    examplesNote:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    timeNote: "You should spend about 40 minutes on this task.",
    wordNote: "Write at least 250 words.",
    promptKeywords: ["processed food","fast food","home-cooked","health","obesity","family","supermarket","cooking","convenience"],
  };

  const TASK_2F = {
    id: "university_career_training",
    promptType: "Agree or disagree",
    minWords: 250,
    suggestedMinutes: 40,
    prompt:
      "Some people argue that universities should focus on training students for specific careers, while others believe that universities should provide a broad academic education that develops critical thinking.",
    question:
      "To what extent do you agree or disagree with the view that universities should prioritise career-specific training?",
    examplesNote:
      "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    timeNote: "You should spend about 40 minutes on this task.",
    wordNote: "Write at least 250 words.",
    promptKeywords: ["university","career","academic","education","training","critical thinking","employment","graduate","skills"],
  };

  /* ----------------------------------------------------------
     EXPORT
     ---------------------------------------------------------- */
  window.WRITING_CONTENT = {
    mockId: "writing-mock-bank-1",
    title: "ACE IELTS Writing Mock Test",
    durationMinutes: 60,
    task1Bank: [TASK_1A, TASK_1B, TASK_1C, TASK_1D, TASK_1E, TASK_1F],
    task2Bank: [TASK_2A, TASK_2B, TASK_2C, TASK_2D, TASK_2E, TASK_2F],
    // tasks: populated at runtime by the site (random pick from each bank).
  };
})();
