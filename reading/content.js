/* ============================================================
   ACE IELTS — Reading Mock Test 1 — content + answer key
   ------------------------------------------------------------
   This file is loaded by reading/index.html and provides the
   full content of one IELTS Academic Reading mock test:

     • 3 passages, each ~800–1000 words, A–G paragraphs.
     • 40 questions across realistic IELTS question types.
     • Answer key used by the site for instant grading.

   All passages are original work, written for ACE.

   To add a new mock test, copy this file to e.g.
   reading/content-2.js and edit the contents, then load it
   from the HTML.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     PASSAGE 1 — The Hidden World of Bees   (easier)
     ---------------------------------------------------------- */

  const PASSAGE_1 = {
    number: 1,
    title: "The Hidden World of Bees",
    blurb:
      "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
    paragraphs: [
      { letter: "A", text:
        "When most people think of bees, they picture a single golden insect buzzing between flowers in a summer garden, or perhaps the familiar striped honeybee that produces the honey we spread on toast. Yet this everyday image hides one of the most remarkable success stories in the natural world. Bees have existed for more than 100 million years, and during that time they have evolved into a group of insects that is essential to almost every land-based ecosystem on Earth. Without them, the food supply of humans and many other species would collapse within a few seasons." },
      { letter: "B", text:
        "The diversity of bees is greater than most people realise. Scientists have so far described over 20,000 species, more than the total number of bird and mammal species combined. They range in size from the Indonesian Megachile pluto, whose females can grow as large as a small bird, to species so tiny that they could pass through the eye of a needle. Most live not in hives but alone, in burrows in the ground, in hollow plant stems or in cracks in old walls. The honeybee, despite being the species most familiar to humans, is unusual: it lives in large, highly organised colonies, while the great majority of bees lead solitary lives." },
      { letter: "C", text:
        "The honeybee colony is one of the most carefully ordered societies in the animal kingdom. Each colony contains a single queen, whose only function is to lay eggs — sometimes more than two thousand a day during peak season. Around her live tens of thousands of female workers, sterile bees who carry out every other task the hive requires: cleaning, feeding the young, building wax combs, guarding the entrance, and flying out in search of nectar and pollen. A small number of male bees, called drones, exist only to mate with new queens. Once the mating season has passed, the workers stop feeding them and drive them out of the hive to die. The cruelty is calculated: the colony cannot afford to keep mouths it does not need through the lean months of winter." },
      { letter: "D", text:
        "Perhaps the most surprising discovery in bee biology was the realisation that worker bees communicate with one another through a kind of dance. The Austrian scientist Karl von Frisch, who won the Nobel Prize for the discovery in 1973, showed that when a foraging bee returns to the hive with news of a good food source, she performs an intricate movement on the vertical surface of the comb. The angle of her dance relative to gravity tells her sisters the direction of the food in relation to the sun; the duration of the dance tells them the distance. Other workers gather around her, observing and even touching her, and then fly out themselves to the location she has indicated. No other invertebrate is known to share information in a comparable way." },
      { letter: "E", text:
        "The economic importance of bees is staggering. About three-quarters of the world's main food crops depend, at least in part, on insect pollination, and bees are by far the most important pollinators. Apples, almonds, blueberries, cucumbers, melons, and dozens of other crops would produce little or no fruit without them. One study commissioned by the United Nations Environment Programme estimated the global value of bee pollination at around 200 billion dollars per year — a figure that does not include the harder-to-measure ecological services they provide, such as supporting wild plant communities and the animals that depend on them." },
      { letter: "F", text:
        "Despite their importance, bees are in trouble. In recent decades, beekeepers across Europe and North America have reported sudden, large-scale die-offs of their colonies. The causes are complex and overlapping. Industrial agriculture has reduced the variety of flowers available, leaving bees with poor nutrition. A class of pesticides known as neonicotinoids has been shown to impair their ability to navigate and to weaken their immune systems. Parasitic mites, particularly Varroa destructor, weaken colonies further by spreading viral diseases. Climate change is shifting the timing of flowering, sometimes leaving bees emerging from winter to find no flowers waiting for them." },
      { letter: "G", text:
        "The response from governments, scientists, and ordinary citizens has been gathering pace. Several European countries have banned or restricted the most damaging neonicotinoid pesticides. Farmers in some regions are being paid to plant strips of wildflowers along the edges of their fields. In cities, rooftop hives have become surprisingly common, and urban honey is now produced from London to Tokyo. None of these measures by themselves will solve the problem, but together they represent the beginnings of a wider recognition that protecting bees is not a luxury but a necessity. The fate of one of the smallest animals on Earth, it turns out, may be tied closely to the fate of humanity itself." },
    ],
    questionGroups: [
      {
        type: "matching_headings",
        range: "1-6",
        instructions:
          "Reading Passage 1 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–G from the list of headings below. Write the correct number, i–ix, in boxes 1–6 on your answer sheet.",
        headings: [
          { num: "i",    text: "Why honey production is declining" },
          { num: "ii",   text: "A diverse and ancient family of insects" },
          { num: "iii",  text: "The rigid hierarchy of a honeybee colony" },
          { num: "iv",   text: "The economic worth of pollination services" },
          { num: "v",    text: "A symbolic language of movement" },
          { num: "vi",   text: "New laws governing pesticide use" },
          { num: "vii",  text: "An animal essential to life on land" },
          { num: "viii", text: "Growing efforts to halt the decline" },
          { num: "ix",   text: "Multiple causes of recent bee deaths" },
        ],
        example: { paragraph: "A", answer: "vii" },
        questions: [
          { number: 1, paragraph: "B" },
          { number: 2, paragraph: "C" },
          { number: 3, paragraph: "D" },
          { number: 4, paragraph: "E" },
          { number: 5, paragraph: "F" },
          { number: 6, paragraph: "G" },
        ],
      },
      {
        type: "true_false_not_given",
        range: "7-10",
        instructions:
          "Do the following statements agree with the information given in Reading Passage 1? In boxes 7–10 on your answer sheet, write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.",
        questions: [
          { number: 7,  statement: "Bees have existed on Earth for over a hundred million years." },
          { number: 8,  statement: "Most bee species live in large colonies similar to honeybees." },
          { number: 9,  statement: "The queen bee lives longer than the worker bees in her colony." },
          { number: 10, statement: "Karl von Frisch received the Nobel Prize for his work on bee communication." },
        ],
      },
      {
        type: "sentence_completion",
        range: "11-13",
        instructions:
          "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
        questions: [
          { number: 11, sentence: "The duration of a worker bee's dance indicates the __________ of the food source." },
          { number: 12, sentence: "A class of pesticides called __________ has been shown to weaken bees' immune systems." },
          { number: 13, sentence: "Bees can also be threatened by __________ that spread viral diseases through their colonies." },
        ],
      },
    ],
  };

  /* ----------------------------------------------------------
     PASSAGE 2 — The Rise and Fall of the Typewriter  (medium)
     ---------------------------------------------------------- */

  const PASSAGE_2 = {
    number: 2,
    title: "The Rise and Fall of the Typewriter",
    blurb:
      "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
    paragraphs: [
      { letter: "A", text:
        "Few inventions of the nineteenth century shaped the working life of so many people for so long as the typewriter. Before its arrival, all correspondence — whether between governments, businesses, or private individuals — had to be written by hand. A senior clerk in a Victorian bank might spend his entire career bent over a desk, copying letters in ink and dusting them with fine sand to dry. The introduction of a machine that could produce neat, uniform pages of text at three or four times the speed of handwriting was nothing short of revolutionary, and within fifty years it had transformed offices, journalism, novels, and even the position of women in the workforce." },
      { letter: "B", text:
        "The typewriter did not appear suddenly. Patents for writing machines stretch back to 1714, when an English engineer named Henry Mill obtained the first known design. Mill's machine, however, was never built, and over the next century and a half dozens of inventors tried and failed to produce a practical device. The breakthrough came in 1868, when an American printer called Christopher Latham Sholes filed a patent for a machine that arranged the keys in alphabetical rows. The design was promising but flawed: when a typist worked quickly, the metal arms holding the letters would jam against each other. Sholes solved the problem by rearranging the keyboard so that letters frequently used together were placed far apart, giving the world the awkward but enduring QWERTY layout still used on computer keyboards today." },
      { letter: "C", text:
        "Sholes lacked the capital to manufacture his machine at scale, and in 1873 he sold the design to E. Remington and Sons, a firearms company looking to diversify after the end of the American Civil War. The first commercial Remington appeared the following year, priced at 125 dollars — a small fortune at a time when a skilled worker earned perhaps two dollars a day. Sales were slow at first. Many potential customers thought the machine impersonal: a letter typed by machine, they argued, was an insult, suggesting that the recipient was not worth the effort of handwriting. Others worried that the printed text resembled a printed book and might be mistaken for an unwanted advertisement. Mark Twain, however, recognised its potential at once. He claimed in his autobiography to have been the first author to deliver a typewritten manuscript to a publisher, sometime in the mid-1870s, although later scholars have shown that he was probably mistaken about the exact date." },
      { letter: "D", text:
        "By the 1890s, prejudice against the machine had given way to enthusiasm. Office work was expanding rapidly, and the typewriter offered something that handwriting could not: a standardised, legible product that could be produced quickly. Just as importantly, it created an entire new category of employment. Operating a typewriter was considered respectable work for an unmarried woman, and large numbers of young women began entering offices for the first time. The change was not entirely liberating — typists were paid less than their male colleagues, and many were dismissed when they married — but it gave many women their first taste of paid employment outside the home, and helped lay the groundwork for the wider changes of the twentieth century." },
      { letter: "E", text:
        "The early decades of the twentieth century saw a wave of refinement. Engineers added shift keys so that the same machine could type both capitals and lower-case letters. Tab stops, ribbon reversal mechanisms, and silent-running mechanisms all followed. By the 1930s, the typewriter was the standard tool of professional writers, journalists, and business correspondents across the developed world. Authors like Ernest Hemingway and Agatha Christie became closely associated with particular models, and entire genres of fiction were shaped by the rhythms of typing. The portable typewriter, light enough to be carried on a train or to a battlefield, accompanied a generation of war correspondents through the conflicts of the twentieth century." },
      { letter: "F", text:
        "The first hint of decline came in the 1960s. IBM had introduced the Selectric, a sophisticated electric typewriter whose typing element — a small metal ball rather than individual key-arms — eliminated the jamming problem and made even faster typing possible. The Selectric dominated the market for nearly two decades, but it was already a transitional device. By the early 1980s, the personal computer with a word-processing program offered something the typewriter could never match: the ability to edit a document before printing it. For many office workers, the move was reluctant. They missed the satisfying click of the keys and the sense of physical accomplishment as a finished page emerged from the carriage. But the economic logic was overwhelming, and within a single decade the machine that had dominated offices for over a century was gone." },
      { letter: "G", text:
        "The typewriter has not vanished entirely. Manual machines remain popular with a small but devoted group of writers who value the discipline of being unable to delete a word once it is typed. Court reporters and certain government offices still use specialised models for legal reasons. In recent years there has even been a modest revival, with younger writers seeking out vintage machines in much the same way that some musicians return to vinyl records. But the typewriter's age as the dominant writing technology is over. It survives now as a cultural object, a museum piece, and a reminder of how completely one technology can reshape an everyday activity." },
    ],
    questionGroups: [
      {
        type: "true_false_not_given",
        range: "14-18",
        instructions:
          "Do the following statements agree with the information given in Reading Passage 2? In boxes 14–18 on your answer sheet, write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.",
        questions: [
          { number: 14, statement: "Christopher Latham Sholes was the first person to design a writing machine." },
          { number: 15, statement: "Sales of the first Remington typewriter were initially slow." },
          { number: 16, statement: "The typewriter became more popular than handwriting within ten years of its release." },
          { number: 17, statement: "Mark Twain's claim about being the first author to use a typewriter has been confirmed by historians." },
          { number: 18, statement: "Female typists in the 1890s earned the same wages as their male colleagues." },
        ],
      },
      {
        type: "multiple_choice",
        range: "19-22",
        instructions:
          "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 19–22 on your answer sheet.",
        questions: [
          {
            number: 19,
            stem: "What was a common objection to typewriters when they first appeared?",
            options: [
              { letter: "A", text: "They were too expensive for businesses." },
              { letter: "B", text: "Their text was harder to read than handwriting." },
              { letter: "C", text: "They felt impersonal and suggested disrespect." },
              { letter: "D", text: "They produced less text per hour than handwriting." },
            ],
          },
          {
            number: 20,
            stem: "According to the passage, the typewriter contributed to women's working lives by",
            options: [
              { letter: "A", text: "making them as well-paid as men." },
              { letter: "B", text: "opening up office employment to large numbers of women for the first time." },
              { letter: "C", text: "guaranteeing them permanent careers as typists." },
              { letter: "D", text: "removing all forms of workplace discrimination." },
            ],
          },
          {
            number: 21,
            stem: "The key innovation of the IBM Selectric was that it",
            options: [
              { letter: "A", text: "used a single rotating metal ball instead of individual key-arms." },
              { letter: "B", text: "was the first typewriter that allowed users to edit text." },
              { letter: "C", text: "was the first typewriter light enough to be portable." },
              { letter: "D", text: "could be connected to a personal computer." },
            ],
          },
          {
            number: 22,
            stem: "What ultimately gave personal computers the advantage over typewriters?",
            options: [
              { letter: "A", text: "They were significantly cheaper to manufacture." },
              { letter: "B", text: "They allowed users to edit a document before printing." },
              { letter: "C", text: "They could type more quickly than even the Selectric." },
              { letter: "D", text: "Office workers preferred their feel and sound." },
            ],
          },
        ],
      },
      {
        type: "summary_completion",
        range: "23-26",
        instructions:
          "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 23–26 on your answer sheet.",
        summary:
          "Although early typewriters faced resistance — some users felt that a printed letter showed a lack of respect — the device gained acceptance through the {{23}}, when offices grew rapidly and the machine became the standard tool of professional work. It opened up office employment to large numbers of {{24}} for the first time, although they were paid less than male colleagues. By the 1930s the typewriter was associated with major authors of both fiction and journalism. The first major challenger appeared in the 1960s with the IBM {{25}}, but the typewriter's true replacement was the personal computer, which from the {{26}} allowed users to edit their work before printing.",
        questions: [
          { number: 23 },
          { number: 24 },
          { number: 25 },
          { number: 26 },
        ],
      },
    ],
  };

  /* ----------------------------------------------------------
     PASSAGE 3 — The Puzzle of Consciousness   (harder)
     ---------------------------------------------------------- */

  const PASSAGE_3 = {
    number: 3,
    title: "The Puzzle of Consciousness",
    blurb:
      "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
    paragraphs: [
      { letter: "A", text:
        "Of all the questions that science has not yet answered, one stands out for its strange refusal to yield: how does the activity of the human brain — three pounds of soft, electrically active tissue — give rise to the rich, private, first-person experience that each of us calls a mind? The philosopher David Chalmers, who has thought about this problem for more than three decades, calls it the 'hard problem' of consciousness. There are many problems concerning the brain that are merely difficult: how it recognises faces, how it makes decisions, how it stores memories. These are, in principle, solvable through patient research. The hard problem is different. Even if we knew everything about the physical operations of the brain, it is not at all clear that we would understand why those operations are accompanied by any experience at all." },
      { letter: "B", text:
        "To see the force of the difficulty, consider the so-called 'philosophical zombie' — a thought experiment widely discussed in the literature. Imagine a creature identical to a human being in every physical respect: the same brain, the same body, behaving exactly as we behave, reporting the same beliefs, walking the same paths, feeling the same heat from the sun. The only difference is that there is no inner experience accompanying any of it. The zombie sees red but has no sensation of redness; it tastes sugar without the experience of sweetness. The point of the thought experiment is not to show that such beings could exist in our world — most philosophers think they could not — but to draw attention to the strangeness of consciousness. If the zombie is even conceivable without contradiction, then experience cannot be a logical consequence of physical processes; something extra is required to explain it." },
      { letter: "C", text:
        "Some philosophers argue that this 'something extra' is an illusion. The Australian philosopher Frank Jackson, in a famous early paper, told the story of a brilliant neuroscientist named Mary who has lived all her life in a black-and-white room. Mary has, however, studied colour vision in extraordinary depth, and she knows everything there is to know about the physical mechanisms by which the brain processes wavelengths of light. The question Jackson asks is this: when Mary leaves her room and sees a ripe tomato for the first time, does she learn something new? The intuitive answer is yes: she learns what red looks like. But if she really knew everything physical about colour vision, and there is something more she learns when she sees red, then experience cannot be reduced to physical information. Defenders of the materialist position have spent forty years trying to argue Mary out of this conclusion, with mixed success." },
      { letter: "D", text:
        "A different approach has come from neuroscience itself. The American researcher Bernard Baars proposed in the 1980s what he called the Global Workspace Theory. According to Baars, the human brain is constantly processing huge amounts of information in parallel, most of it unconsciously. Consciousness, he argued, is what happens when a particular piece of information is broadcast widely across the brain, becoming available to the systems that govern memory, language, attention, and decision-making. Conscious experience, in this view, is not a separate substance added to the physical brain but a particular kind of pattern in its activity — the pattern of widespread, integrated processing." },
      { letter: "E", text:
        "The Italian neuroscientist Giulio Tononi has gone further still. His Integrated Information Theory, developed since the early 2000s, attempts to specify mathematically what it is for any physical system to have an inner experience. The key quantity, which Tononi calls 'phi', measures the extent to which a system's information is integrated rather than separable. A simple system with little integration — a thermostat, say, or a single neuron — has a low phi value and, on this theory, only a vanishingly thin trace of experience. A human brain, with its dense web of interconnections, has an enormous phi value. The theory has the intriguing implication that consciousness, in trace form, may be a far more widespread feature of nature than we usually assume." },
      { letter: "F", text:
        "Both theories have attracted serious criticism. Global Workspace Theory describes what conscious states are correlated with, but says little about why the broadcasting of information should feel like anything from the inside. Integrated Information Theory is mathematically rigorous, but its predictions about which systems are conscious — including the suggestion that very simple physical systems may have rudimentary experiences — strike many critics as bizarre. Both theories have also been accused of changing the subject: of describing the conditions under which consciousness occurs without explaining the fundamental phenomenon itself." },
      { letter: "G", text:
        "Some philosophers have concluded that the hard problem may be unsolvable. The English philosopher Colin McGinn has argued that the human mind is simply not equipped to understand itself in this way, just as a dog cannot understand calculus. We may, in his view, be evolved to think in terms of causes, mechanisms, and material objects, and the relationship between brain and experience may fall outside the categories our minds can grasp. Others find this defeatist. They point out that earlier scientific revolutions, from the structure of the atom to the origin of species, also seemed unsolvable until the right framework appeared. Whether such a framework is waiting to be discovered, or whether consciousness will remain a permanent puzzle, may be the most consequential open question in all of science." },
    ],
    questionGroups: [
      {
        type: "matching_headings",
        range: "27-31",
        instructions:
          "Reading Passage 3 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below. Write the correct number, i–ix, in boxes 27–31 on your answer sheet.",
        headings: [
          { num: "i",    text: "A radical theory linking consciousness to integration" },
          { num: "ii",   text: "Why some thinkers say the problem cannot be solved" },
          { num: "iii",  text: "A thought experiment about an isolated scientist" },
          { num: "iv",   text: "The economic implications of consciousness research" },
          { num: "v",    text: "A creature that behaves like us but feels nothing" },
          { num: "vi",   text: "Common objections to two leading theories" },
          { num: "vii",  text: "The hard problem — and why it is not just difficult" },
          { num: "viii", text: "A brain-wide broadcast as the mark of awareness" },
          { num: "ix",   text: "The history of philosophical materialism" },
        ],
        example: { paragraph: "A", answer: "vii" },
        questions: [
          { number: 27, paragraph: "B" },
          { number: 28, paragraph: "C" },
          { number: 29, paragraph: "D" },
          { number: 30, paragraph: "E" },
          { number: 31, paragraph: "F" },
        ],
      },
      {
        type: "yes_no_not_given",
        range: "32-36",
        instructions:
          "Do the following statements agree with the views of the writer in Reading Passage 3? In boxes 32–36 on your answer sheet, write YES if the statement agrees with the views of the writer, NO if the statement contradicts the views of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.",
        questions: [
          { number: 32, statement: "The hard problem of consciousness will be solved within a few decades." },
          { number: 33, statement: "Most philosophers believe that philosophical zombies could exist in reality." },
          { number: 34, statement: "Frank Jackson's thought experiment was designed to show that experience can be fully reduced to physical information." },
          { number: 35, statement: "Integrated Information Theory makes specific predictions about which physical systems are conscious." },
          { number: 36, statement: "Colin McGinn's pessimism about the hard problem is rejected by some other thinkers." },
        ],
      },
      {
        type: "matching_information",
        range: "37-40",
        instructions:
          "Reading Passage 3 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G, in boxes 37–40 on your answer sheet. NB: You may use any letter more than once.",
        questions: [
          { number: 37, statement: "A description of why most current attempts to explain consciousness fall short." },
          { number: 38, statement: "A theory that combines information from many parallel brain processes into a single conscious experience." },
          { number: 39, statement: "A comparison between consciousness research and earlier scientific revolutions." },
          { number: 40, statement: "A description of an imaginary being identical to a human but lacking inner experience." },
        ],
      },
    ],
  };

  /* ----------------------------------------------------------
     ANSWER KEY
     ----------------------------------------------------------
     For string answers (sentence/summary completion), the
     comparison is case-insensitive and trims whitespace.
     Multiple acceptable answers can be given as an array.
     ---------------------------------------------------------- */

  const ANSWER_KEY = {
    // Passage 1 — matching headings
     1: "ii",
     2: "iii",
     3: "v",
     4: "iv",
     5: "ix",
     6: "viii",
    // Passage 1 — T/F/NG
     7: "TRUE",
     8: "FALSE",
     9: "NOT GIVEN",
    10: "TRUE",
    // Passage 1 — sentence completion
    11: "distance",
    12: "neonicotinoids",
    13: ["parasitic mites", "mites"],

    // Passage 2 — T/F/NG
    14: "FALSE",
    15: "TRUE",
    16: "NOT GIVEN",
    17: "FALSE",
    18: "FALSE",
    // Passage 2 — multiple choice
    19: "C",
    20: "B",
    21: "A",
    22: "B",
    // Passage 2 — summary completion
    23: ["1890s", "the 1890s"],
    24: ["young women", "women"],
    25: "Selectric",
    26: ["early 1980s", "1980s"],

    // Passage 3 — matching headings
    27: "v",
    28: "iii",
    29: "viii",
    30: "i",
    31: "vi",
    // Passage 3 — Y/N/NG
    32: "NOT GIVEN",
    33: "NO",
    34: "NO",
    35: "YES",
    36: "YES",
    // Passage 3 — matching information
    37: "F",
    38: "D",
    39: "G",
    40: "B",
  };

  /* ----------------------------------------------------------
     EXPORT
     ---------------------------------------------------------- */

  window.READING_CONTENT = {
    mockId: "reading-mock-1",
    title: "ACE IELTS Reading Mock Test 1",
    durationMinutes: 60,
    totalQuestions: 40,
    passages: [PASSAGE_1, PASSAGE_2, PASSAGE_3],
    answerKey: ANSWER_KEY,
  };
})();
