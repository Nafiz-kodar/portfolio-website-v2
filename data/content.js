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
 *  Source of truth: assets/docs/nafiz_resume(main).docx
 *  When you update the resume, update this file to match.
 */

const CONTENT = {
  /* --------------------------------------------------------------------
   * SITE META — browser tab, Google results, link previews
   * ------------------------------------------------------------------ */
  meta: {
    siteUrl: "https://nafizahmednafi.netlify.app",
    title: "Nafiz Ahmed Nafi — Data Engineering & NLP",
    // Keep under ~155 characters: this is the grey text under your Google
    // result and the subtitle on LinkedIn link previews.
    description:
      "CSE student at BRAC University working in data engineering and NLP. Network & Vision sub-team lead on BRACU Mongol Tori, 7th worldwide at URC 2026.",
    ogImage: "assets/img/og-cover.jpg",
  },

  /* --------------------------------------------------------------------
   * HERO — the first thing a recruiter sees
   * ------------------------------------------------------------------ */
  hero: {
    greeting: "Hello, I'm",
    name: "Nafiz Ahmed Nafi",
    role: "Data Engineering & NLP",
    tagline:
      "Computer Science and Engineering student at BRAC University. I build the plumbing behind machine learning — telemetry pipelines, resilient RF links and video streaming for a competition Mars rover — and research how language models leak the boilerplate they are trained on.",
    location: "Dhaka, Bangladesh",
    photo: "assets/img/profile.webp",
    photoAlt: "Portrait of Nafiz Ahmed Nafi",
    resume: "assets/docs/nafiz_resume(main).docx",
    // Small facts shown under the intro. 2–4 works best.
    highlights: [
      { value: "7th", label: "worldwide, URC 2026" },
      { value: "2nd", label: "South Asia, URC 2026" },
      { value: "4", label: "university teams led" },
    ],
  },

  /* --------------------------------------------------------------------
   * ABOUT
   * ------------------------------------------------------------------ */
  about: {
    photo: "assets/img/about.webp",
    photoAlt: "Nafiz Ahmed Nafi",
    // Each string is its own paragraph. <b>bold</b> is allowed.
    paragraphs: [
      "I'm a Computer Science and Engineering student specialising in <b>data engineering</b> and <b>NLP</b>, with a working background in <b>computer networking</b> and <b>RF communication</b>. Most of what I know came from having to make systems stay up in a field, under a competition clock.",
      "I contributed to BRAC University's Mars Rover team, <b>BRACU Mongol Tori</b>, which placed <b>7th worldwide and 2nd in South Asia</b> at the University Rover Challenge 2026. I'm currently <b>Sub-Team Lead for Network & Vision</b>, where I built a 5.8&nbsp;GHz mesh with a failsafe configuration, video streaming pipelines in <b>FFmpeg</b> and <b>GStreamer</b>, and the rover's telemetry systems.",
      "Alongside that I lead and mentor: managing international teams, coordinating across sub-teams with Kanban, teaching ICT to students at under-resourced schools, and running workshops and contests for the university computer club. I care about delivering on schedule and leaving things documented enough for the next person.",
    ],
  },

  /* --------------------------------------------------------------------
   * SKILLS
   * level: "Experienced" | "Intermediate" | "Basic"  (drives the meter)
   * ------------------------------------------------------------------ */
  skills: [
    {
      group: "Programming & Data",
      items: [
        { name: "Python", level: "Experienced" },
        { name: "MySQL", level: "Intermediate" },
        { name: "Bash", level: "Intermediate" },
        { name: "Tableau", level: "Intermediate" },
      ],
    },
    {
      group: "Systems & Streaming",
      items: [
        { name: "Linux", level: "Experienced" },
        { name: "FFmpeg", level: "Experienced" },
        { name: "GStreamer", level: "Intermediate" },
        { name: "Git", level: "Intermediate" },
      ],
    },
    {
      group: "Networking & RF",
      items: [
        { name: "Multi-link RF (433 MHz – 5.8 GHz)", level: "Experienced" },
        { name: "Mesh & failsafe configuration", level: "Experienced" },
        { name: "Telemetry systems", level: "Intermediate" },
      ],
    },
  ],

  // Shown as simple pills — no proficiency meter.
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
   * the dates; the card renders fine without one.
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
   *     links: [{ label: "GitHub", url: "https://..." }],   // OPTIONAL
   *     featured: true,                            // OPTIONAL, wider card
   *   },
   * ------------------------------------------------------------------ */
  projects: [
    {
      title: "Quantifying Boilerplate Leakage in Privacy Policy Classification",
      kind: "Independent research",
      status: "Ongoing",
      blurb:
        "Measuring how much boilerplate language leaks between training and test splits when classifying privacy policies, using a corpus of policies from Bangladesh — and what that inflated overlap does to reported model accuracy.",
      tags: ["NLP", "Python", "Dataset analysis"],
      featured: true,
    },
    {
      title: "Backdoor Detection in Deep Neural Networks",
      kind: "Independent research",
      status: "Ongoing",
      blurb:
        "Investigating trigger-independent backdoor detection through neuron-activation and weight analysis, evaluated against the TrojAI and BackdoorBench datasets.",
      tags: ["Deep learning", "Model security", "TrojAI", "BackdoorBench"],
      featured: true,
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
   * CONTACT & SOCIAL
   * icon: "email" | "linkedin" | "github" | "phone"
   * ------------------------------------------------------------------ */
  contact: {
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

  socials: [
    { icon: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/nafiz-ahmed-nafi" },
    { icon: "github", label: "GitHub", url: "https://github.com/Nafiz-kodar" },
    { icon: "email", label: "Email", url: "mailto:nafizahmednafi@gmail.com" },
  ],
};
