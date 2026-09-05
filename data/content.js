/**
 * ============================================================================
 *  SITE CONTENT — this is the only file you need to edit to update the site.
 * ============================================================================
 *
 *  Everything on the page is rendered from the object below. To add a project
 *  or a role, add an item to the matching array and refresh the browser. You
 *  do not need to touch index.html, the CSS, or main.js.
 *
 *  Rules of thumb:
 *    - Keep the quotes and the commas. A missing comma breaks the page.
 *    - Empty arrays are fine. A section with no items shows a tidy
 *      placeholder instead of an empty gap.
 *    - Anything marked OPTIONAL can be deleted entirely.
 *
 *  A NOTE ON LENGTH. The design sets several of these strings very large —
 *  `about.lead`, `contact.lead` and `footer.tagline` are display type. Keep
 *  them short (a line or two). The long-form writing belongs in
 *  `about.paragraphs` and the project blurbs.
 *
 *  Source of truth: assets/docs/nafiz-ahmed-nafi-cv.pdf
 *  When you update the CV, update this file to match.
 */

const CONTENT = {
  /* --------------------------------------------------------------------
   * NOTE ON SEO
   * The page title, Google description and LinkedIn/Twitter link-preview
   * tags are NOT here — they live in the <head> of index.html, because
   * social crawlers do not run JavaScript and have to read them straight
   * from the HTML. There is a clearly marked block at the top of that file.
   * ------------------------------------------------------------------ */

  /* --------------------------------------------------------------------
   * HERO — the grey full-bleed opening panel.
   *   role     runs as the oversized scrolling headline. Keep it SHORT;
   *            it is set at up to 15rem.
   *   intro    the small right-aligned paragraph in the top bar. OPTIONAL —
   *            falls back to `tagline`.
   * ------------------------------------------------------------------ */
  hero: {
    name: "Nafiz Ahmed Nafi",
    role: "Data Engineering & NLP",
    intro:
      "Computer Science and Engineering student at BRAC University, working on data pipelines, network systems and the language models that run on top of them.",
    tagline:
      "Computer Science and Engineering student at BRAC University. I build the plumbing behind machine learning — telemetry pipelines, resilient RF links and video streaming for a competition Mars rover — and research how language models leak the boilerplate they are trained on.",
    location: "Dhaka, Bangladesh",
    photo: "assets/img/profile.webp",
    photoAlt: "Portrait of Nafiz Ahmed Nafi",
    resume: "assets/docs/nafiz-ahmed-nafi-cv.pdf",
    // Small facts shown under the opening statement. 2–4 works best.
    highlights: [
      { value: "7th", label: "worldwide, URC 2026" },
      { value: "2nd", label: "South Asia, URC 2026" },
      { value: "4", label: "university teams led" },
    ],
  },

  /* --------------------------------------------------------------------
   * ABOUT
   *   lead        the large opening statement. Two lines at most.
   *   note        the small right-hand paragraph beside it. OPTIONAL.
   *   paragraphs  the long-form bio. Each string is its own paragraph,
   *               and <b>bold</b> is allowed here.
   * ------------------------------------------------------------------ */
  about: {
    lead: "I build the plumbing behind machine learning — the pipelines, the links and the telemetry that have to stay up in a field.",
    note:
      "Data engineering and NLP, with a working background in computer networking and RF communication. Most of what I know came from keeping systems running under a competition clock.",
    photo: "assets/img/about.webp",
    photoAlt: "Nafiz Ahmed Nafi",
    paragraphs: [
      "I'm a Computer Science and Engineering student specialising in <b>data engineering</b> and <b>NLP</b>, with a working background in <b>computer networking</b> and <b>RF communication</b>. Most of what I know came from having to make systems stay up in a field, under a competition clock.",
      "I contributed to BRAC University's Mars Rover team, <b>BRACU Mongol Tori</b>, which placed <b>7th worldwide and 2nd in South Asia</b> at the University Rover Challenge 2026. I'm currently <b>Sub-Team Lead for Network &amp; Vision</b>, where I built a 5.8&nbsp;GHz mesh with a failsafe configuration, video streaming pipelines in <b>FFmpeg</b> and <b>GStreamer</b>, and the rover's telemetry systems.",
      "Alongside that I lead and mentor: managing international teams, coordinating across sub-teams with Kanban, teaching ICT to students at under-resourced schools, and running workshops and contests for the university computer club. I care about delivering on schedule and leaving things documented enough for the next person.",
    ],
  },

  /* --------------------------------------------------------------------
   * SKILLS — rendered as the dark cards.
   *   group  the card heading
   *   blurb  one sentence under it. OPTIONAL, but the cards look thin
   *          without one.
   *   level  "Experienced" | "Intermediate" | "Basic"
   *          Drives the three dots beside each item; anything else shows
   *          no dots. The level is also read out to screen readers.
   * ------------------------------------------------------------------ */
  skills: [
    {
      group: "Programming & Data",
      blurb:
        "Turning messy sources into something queryable, and building the dashboards that sit on top of them.",
      items: [
        { name: "Python", level: "Experienced" },
        { name: "MySQL", level: "Intermediate" },
        { name: "Bash", level: "Intermediate" },
        { name: "Tableau", level: "Intermediate" },
      ],
    },
    {
      group: "Systems & Streaming",
      blurb:
        "Getting video and telemetry off a moving rover and onto a base-station screen without dropping frames.",
      items: [
        { name: "Linux", level: "Experienced" },
        { name: "FFmpeg", level: "Experienced" },
        { name: "GStreamer", level: "Intermediate" },
        { name: "Git", level: "Intermediate" },
      ],
    },
    {
      group: "Networking & RF",
      blurb:
        "Multi-band links that stay up when one of them doesn't — mesh topology, failover, and the field testing behind both.",
      items: [
        { name: "Multi-link RF (433 MHz – 5.8 GHz)", level: "Experienced" },
        { name: "Mesh & failsafe configuration", level: "Experienced" },
        { name: "Telemetry systems", level: "Intermediate" },
      ],
    },
  ],

  // Shown as plain tags under the cards — no proficiency dots.
  softSkills: [
    "Kanban task tracking",
    "Jira",
    "Cross-team coordination",
    "Mentoring",
    "Workshop delivery",
    "Fundraising",
  ],

  languages: [
    { name: "English", level: "Fluent" },
    { name: "Bengali", level: "Native" },
  ],

  /* --------------------------------------------------------------------
   * EXPERIENCE — newest first.
   *
   * Add a `period` (e.g. "Jan 2025 — Present") to any entry once you know
   * the dates; the row renders fine without one.
   * ------------------------------------------------------------------ */
  experience: [
    {
      role: "Network & Vision Sub-Team Lead",
      org: "BRACU Mongol Tori — Mars Rover Team",
      current: true,
      summary: "Responsible for the rover's communication and vision systems.",
      points: [
        "Designed a resilient multi-link RF communication system (433 MHz, 900 MHz, 2.4 GHz, 5.8 GHz) for rover-to-base-station connectivity.",
        "Built a 5.8 GHz mesh setup with failsafe configuration to survive link loss during field runs.",
        "Managed sub-team workflows and project timelines using Kanban to keep delivery on schedule.",
      ],
      tags: ["RF", "Mesh networking", "Team lead"],
    },
    {
      role: "Contributor",
      org: "BRACU Mongol Tori — Mars Rover Team",
      summary:
        "Team placed 7th worldwide and 2nd in South Asia at the University Rover Challenge 2026.",
      points: [
        "Developed a Python-based telemetry dashboard for centralised monitoring of rover systems.",
        "Designed and implemented the rover's video-streaming architecture using FFmpeg and GStreamer.",
        "Built the mesh and failback setup within competition design restrictions.",
      ],
      tags: ["Python", "FFmpeg", "GStreamer", "Telemetry"],
    },
    {
      role: "Team Manager",
      org: "BRACU Alter — Rescue Rover Team",
      points: [
        "Managed end-to-end project execution, team coordination and fundraising.",
      ],
      tags: ["Project management", "Fundraising"],
    },
    {
      role: "ICT Teacher",
      org: "BRACU Srijon — BRAC-Certified Teaching Initiative",
      points: [
        "Delivered ICT workshops and hands-on computer skills training to secondary school students at under-resourced schools.",
      ],
      tags: ["Teaching", "Workshop delivery"],
    },
    {
      role: "Senior Executive",
      org: "BRAC University Computer Club",
      points: [
        "Organised technical workshops, an intra-university hackathon and a competitive programming contest.",
        "Mentored student teams through the planning and execution of hands-on technical projects across the development lifecycle.",
      ],
      tags: ["Mentoring", "Event organisation"],
    },
  ],

  /* --------------------------------------------------------------------
   * PROJECTS & RESEARCH
   *
   * To add one:
   *   {
   *     title: "Project name",
   *     status: "Ongoing",                        // OPTIONAL badge
   *     kind: "Independent research",             // OPTIONAL small label
   *     blurb: "What the question was, what you did, what you found.",
   *     tags: ["Python", "PyTorch"],
   *     image: "assets/img/projects/name.webp",   // OPTIONAL, 16:10 works best
   *     imageAlt: "What the screenshot shows",    // OPTIONAL but do write it
   *     mark: "PP",                               // OPTIONAL 2-char fallback
   *     links: [{ label: "GitHub", url: "https://..." }],   // OPTIONAL
   *   },
   *
   * With no `image`, the card draws a typographic tile using `mark` (or the
   * title's initials) — so a project without a screenshot still looks
   * deliberate. Add the screenshot when you have one.
   * ------------------------------------------------------------------ */
  projects: [
    {
      title: "Quantifying Boilerplate Leakage in Privacy Policy Classification",
      kind: "Independent research",
      status: "Ongoing",
      mark: "PP",
      blurb:
        "Measuring how much boilerplate language leaks between training and test splits when classifying privacy policies, using a corpus of policies from Bangladesh — and what that inflated overlap does to reported model accuracy.",
      tags: ["NLP", "Python", "Dataset analysis"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Nafiz-kodar/PRIVACY_POLICY_PAPER",
        },
        {
          label: "Live demo",
          url: "https://privacy-policy-leakage-aware-classifier.vercel.app",
        },
      ],
    },
    {
      title: "Backdoor Detection in Deep Neural Networks",
      kind: "Independent research",
      status: "Ongoing",
      mark: "BD",
      blurb:
        "Investigating trigger-independent backdoor detection through neuron-activation and weight analysis, evaluated against the TrojAI and BackdoorBench datasets.",
      tags: ["Deep learning", "Model security", "TrojAI", "BackdoorBench"],
    },
  ],

  /* --------------------------------------------------------------------
   * EDUCATION
   * ------------------------------------------------------------------ */
  education: [
    {
      degree: "BSc in Computer Science and Engineering",
      org: "BRAC University",
      period: "Oct 2023 — Apr 2027 (expected)",
      note: "CGPA 3.5 (expected)",
      current: true,
    },
    {
      degree: "HSC (Science)",
      org: "St. Joseph Higher Secondary School",
      period: "2022",
      note: "GPA 5.00",
    },
    {
      degree: "SSC (Science)",
      org: "Shaheed Police Smrity College",
      period: "2020",
      note: "GPA 5.00",
    },
  ],

  /* --------------------------------------------------------------------
   * CERTIFICATIONS — OPTIONAL. Leave [] until you have some.
   *   { name: "...", issuer: "...", year: "2025", url: "https://..." }
   * ------------------------------------------------------------------ */
  certifications: [],

  /* --------------------------------------------------------------------
   * CONTACT
   *   kicker  the small monospace line above the heading
   *   lead    the large heading. Keep it to a few words.
   *   The blue "Get in touch" disc links to whichever channel has
   *   icon: "email", so keep one.
   * ------------------------------------------------------------------ */
  contact: {
    kicker: "That's all for now.",
    lead: "Got something to build? Let's talk",
    blurb:
      "I'm open to internships and roles in data engineering, NLP and network systems, and glad to talk about research collaboration. Email reaches me fastest.",
    channels: [
      {
        icon: "email",
        label: "Email",
        value: "nafizahmednafi@gmail.com",
        url: "mailto:nafizahmednafi@gmail.com",
      },
      {
        icon: "linkedin",
        label: "LinkedIn",
        value: "in/nafiz-ahmed-nafi",
        url: "https://linkedin.com/in/nafiz-ahmed-nafi",
      },
      {
        icon: "github",
        label: "GitHub",
        value: "Nafiz-kodar",
        url: "https://github.com/Nafiz-kodar",
      },
    ],
  },

  /* --------------------------------------------------------------------
   * FOOTER
   *   wordmark  set enormous and allowed to run off the right edge, so a
   *             long value is fine — it is decorative and hidden from
   *             screen readers. Defaults to hero.name.
   * ------------------------------------------------------------------ */
  footer: {
    tagline: "Building the plumbing behind the models.",
    wordmark: "Nafiz Ahmed Nafi",
    note: "Built from scratch with HTML, CSS and vanilla JavaScript.",
  },

  socials: [
    { icon: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/nafiz-ahmed-nafi" },
    { icon: "github", label: "GitHub", url: "https://github.com/Nafiz-kodar" },
    { icon: "email", label: "Email", url: "mailto:nafizahmednafi@gmail.com" },
  ],
};
