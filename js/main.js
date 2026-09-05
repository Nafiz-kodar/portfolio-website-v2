/* ==========================================================================
   main.js — renders the page from data/content.js and wires up interaction.

   You should not normally need to edit this file. To change what the site
   says, edit data/content.js instead.

   Structure:
     utils · icons · dock · hero · about · work · stack · ledgers ·
     contact · footer · interaction · boot
   ========================================================================== */

(function () {
  "use strict";

  if (typeof CONTENT === "undefined") {
    console.error("data/content.js did not load — nothing to render.");
    return;
  }

  /* ---------------------------------------------------------------- utils */

  /** Escape text before putting it in HTML, so an apostrophe or a < in the
   *  content file can never break the page. */
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Only used where the content file is explicitly allowed to contain
   *  formatting tags such as <b> — currently the About paragraphs. */
  function raw(value) {
    return String(value == null ? "" : value);
  }

  function mount(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  }

  function isFilled(arr) {
    return Array.isArray(arr) && arr.length > 0;
  }

  function isExternal(url) {
    return typeof url === "string" && /^https?:/i.test(url);
  }

  /** target/rel pair for a link, so an external link can never be forgotten. */
  function linkAttrs(url) {
    return isExternal(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  function emptyState(title, message) {
    return (
      '<div class="empty reveal"><h3>' +
      esc(title) +
      "</h3><p>" +
      esc(message) +
      "</p></div>"
    );
  }

  /** Two-letter mark for a project with no screenshot. */
  function initialsOf(text) {
    var words = String(text || "")
      .replace(/[^A-Za-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    if (!words.length) return "//";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  /* ---------------------------------------------------------------- icons */

  /* Dock and UI icons. The dock set is traced from the Figma reference kit
     in _design/ (Home 02, 3d Cube Scan, File 05, Frame 52, github, Arrow Up
     Right Contained) so the navigation matches the source design exactly.
     They are inlined rather than linked because _design/ is gitignored. */
  var S =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  var ICONS = {
    home:
      "<svg " +
      S +
      '><path d="M7.5 17.06h9M11.3 3.21 3.5 8.49c-.32.21-.5.56-.5.93v9.87C3 20.23 3.81 21 4.8 21h14.4c.99 0 1.8-.77 1.8-1.71V9.42c0-.37-.19-.72-.5-.93L12.7 3.21a1.2 1.2 0 0 0-1.4 0Z"/></svg>',
    user:
      "<svg " +
      S +
      '><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.2a7.9 7.9 0 0 1 15 0"/></svg>',
    cube:
      "<svg " +
      S +
      '><path d="M2 9V7c0-3 2-5 5-5h10c3 0 5 2 5 5v2M2 15v2c0 3 2 5 5 5h10c3 0 5-2 5-5v-2M6.7 9.26 12 12.33l5.26-3.05M12 17.77v-5.45M10.76 6.29 7.56 8.07c-.72.4-1.32 1.41-1.32 2.24v3.39c0 .83.59 1.84 1.32 2.24l3.2 1.78c.68.38 1.8.38 2.49 0l3.2-1.78c.72-.4 1.32-1.41 1.32-2.24v-3.39c0-.83-.59-1.84-1.32-2.24l-3.2-1.78c-.69-.39-1.81-.39-2.49 0Z"/></svg>',
    file:
      "<svg " +
      S +
      '><path d="M15 2.4V6c0 .66.54 1.2 1.2 1.2h3.6M8.4 7.2h2.4M8.4 10.8h7.2M8.4 14.4h7.2M18 4.2c-.53-.48-1.09-1.05-1.44-1.41a1.2 1.2 0 0 0-.89-.39H6.6A2.4 2.4 0 0 0 4.2 4.8v14.4a2.4 2.4 0 0 0 2.4 2.4h10.8a2.4 2.4 0 0 0 2.4-2.4V6.48c0-.31-.12-.6-.33-.82-.39-.41-1.05-1.08-1.47-1.46Z"/></svg>',
    code:
      '<svg viewBox="0 0 23 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="0.8" y="0.8" width="21.4" height="18.4" rx="3.25"/><path d="M6.88 13.75 10.13 10.5 6.88 7.25"/><path d="M12 13.5h5"/></svg>',
    github:
      "<svg " +
      S +
      '><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    /* The contained arrow-up-right from the kit, as a stroked circle. */
    contact:
      "<svg " +
      S +
      '><circle cx="12" cy="12" r="9"/><path d="M8.7 15.3 15.3 8.7M9.2 9.2h6.1v6.1"/></svg>',
    arrowUpRight:
      "<svg " +
      S +
      '><path d="M7 17 17 7M8.5 7H17v8.5"/></svg>',
    arrowDown:
      "<svg " + S + '><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    download:
      "<svg " +
      S +
      '><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    email:
      "<svg " + S + '><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.4 8.4h3.1V21H3.4zM9.3 8.4h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-6.13c0-1.46-.03-3.34-2.03-3.34-2.04 0-2.35 1.59-2.35 3.23V21H9.3z"/></svg>',
    phone:
      "<svg " +
      S +
      '><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.8a2 2 0 0 1 1.7 2z"/></svg>',
  };

  function icon(name) {
    return ICONS[name] || "";
  }

  /* ----------------------------------------------------------------- dock */

  /* href, icon key and label for each dock button. A dock entry pointing at
     a section that does not exist is skipped, so removing a section from
     index.html cannot leave a dead button behind. */
  var DOCK = [
    { href: "#top", icon: "home", label: "Top", spy: "hero" },
    { href: "#about", icon: "user", label: "About", spy: "about" },
    { href: "#work", icon: "code", label: "Work", spy: "work" },
    { href: "#stack", icon: "cube", label: "Stack", spy: "stack" },
    { href: "#experience", icon: "file", label: "Experience", spy: "experience" },
    { href: "#contact", icon: "contact", label: "Contact", spy: "contact" },
  ];

  function renderDock() {
    var items = DOCK.filter(function (d) {
      return document.getElementById(d.spy);
    }).map(function (d) {
      return (
        '<a class="dock__btn" href="' +
        esc(d.href) +
        '" data-spy="' +
        esc(d.spy) +
        '" aria-label="' +
        esc(d.label) +
        '">' +
        icon(d.icon) +
        '<span class="dock__tip" aria-hidden="true">' +
        esc(d.label) +
        "</span></a>"
      );
    });

    var gh = (CONTENT.socials || []).filter(function (s) {
      return s.icon === "github";
    })[0];

    if (gh) {
      items.push('<span class="dock__sep" aria-hidden="true"></span>');
      items.push(
        '<a class="dock__btn" href="' +
          esc(gh.url) +
          '" aria-label="GitHub profile (opens in a new tab)"' +
          linkAttrs(gh.url) +
          ">" +
          icon("github") +
          '<span class="dock__tip" aria-hidden="true">GitHub</span></a>'
      );
    }

    mount("dock", items.join(""));
  }

  /* ------------------------------------------------------------------ hero */

  function renderHero() {
    var h = CONTENT.hero || {};

    var brand = '<p class="hero__brand">@ ' + esc(h.name) + "</p>";

    var intro = h.intro || h.tagline;
    var introHtml = intro ? '<p class="hero__intro">' + esc(intro) + "</p>" : "";

    var figure = h.photo
      ? '<figure class="hero__figure"><img src="' +
        esc(h.photo) +
        '" alt="' +
        esc(h.photoAlt || h.name) +
        '" width="800" height="800" fetchpriority="high" decoding="async" /></figure>'
      : "";

    /* The marquee is decorative: the same words repeat, so a screen reader
       gets the real heading instead, once. */
    var phrase = h.role || h.name || "";
    var unit =
      "<span>" +
      esc(phrase) +
      '</span><span class="marquee__dot" aria-hidden="true">&bull;</span>';

    var marquee = phrase
      ? '<div class="marquee marquee--hero" aria-hidden="true">' +
        '<div class="marquee__track" data-marquee-unit="' +
        esc(phrase) +
        '">' +
        unit +
        unit +
        "</div></div>"
      : "";

    var scroll =
      '<a class="hero__scroll" href="#about" aria-label="Scroll to the introduction">' +
      '<span class="circle">' +
      icon("arrowDown") +
      "</span></a>";

    mount(
      "hero",
      '<h1 class="visually-hidden">' +
        esc(h.name) +
        (h.role ? " — " + esc(h.role) : "") +
        "</h1>" +
        '<div class="wrap hero__bar">' +
        brand +
        introHtml +
        "</div>" +
        figure +
        scroll +
        marquee
    );
  }

  /* ----------------------------------------------------------------- about */

  /** The big opening statement plus the facts strip. */
  function renderAboutIntro() {
    var h = CONTENT.hero || {};
    var a = CONTENT.about || {};

    var lead = a.lead || h.tagline || "";
    var note = a.note || "";

    var cv = h.resume
      ? '<a class="link-arrow" href="' +
        esc(h.resume) +
        '" download><span>Download CV</span><span class="circle">' +
        icon("download") +
        "</span></a>"
      : "";

    var side =
      note || cv
        ? '<div class="statement__side">' +
          (note ? '<p class="statement__note">' + esc(note) + "</p>" : "") +
          cv +
          "</div>"
        : "";

    var facts = isFilled(h.highlights)
      ? '<div class="facts reveal">' +
        h.highlights
          .map(function (s) {
            return (
              '<div class="fact"><div class="fact__value">' +
              esc(s.value) +
              '</div><div class="fact__label">' +
              esc(s.label) +
              "</div></div>"
            );
          })
          .join("") +
        "</div>"
      : "";

    mount(
      "about-intro",
      '<div class="statement reveal">' +
        '<h2 class="statement__lead" id="about-title">' +
        esc(lead) +
        "</h2>" +
        side +
        "</div>" +
        facts
    );
  }

  function renderAbout() {
    var a = CONTENT.about || {};

    var photo = a.photo
      ? '<div class="about__photo reveal"><img src="' +
        esc(a.photo) +
        '" alt="' +
        esc(a.photoAlt || "") +
        '" width="800" height="1000" loading="lazy" decoding="async" /></div>'
      : "";

    var paragraphs = isFilled(a.paragraphs)
      ? a.paragraphs
          .map(function (p) {
            return "<p>" + raw(p) + "</p>";
          })
          .join("")
      : "";

    var languages = isFilled(CONTENT.languages)
      ? '<div class="languages">' +
        CONTENT.languages
          .map(function (l) {
            return (
              '<div><div class="language__name">' +
              esc(l.name) +
              '</div><div class="language__level">' +
              esc(l.level) +
              "</div></div>"
            );
          })
          .join("") +
        "</div>"
      : "";

    if (!photo && !paragraphs) {
      mount("about-content", "");
      return;
    }

    mount(
      "about-content",
      '<div class="about">' +
        photo +
        '<div class="about__body reveal">' +
        paragraphs +
        languages +
        "</div></div>"
    );
  }

  /* ------------------------------------------------------------------ work */

  function renderWork() {
    if (!isFilled(CONTENT.projects)) {
      mount(
        "work-content",
        emptyState(
          "Projects coming soon",
          "Write-ups are in progress. Meanwhile, code lives on GitHub."
        )
      );
      return;
    }

    var cards = CONTENT.projects
      .map(function (p) {
        /* A project with a screenshot gets the image; one without gets a
           typographic tile so the grid never shows a hole. */
        var media = p.image
          ? '<img src="' +
            esc(p.image) +
            '" alt="' +
            esc(p.imageAlt || p.title) +
            '" loading="lazy" decoding="async" />'
          : '<div class="work-card__tile">' +
            '<span class="work-card__tile-kind">' +
            esc(p.kind || "Project") +
            "</span>" +
            '<span class="work-card__tile-mark">' +
            esc(p.mark || initialsOf(p.title)) +
            "</span></div>";

        var links = isFilled(p.links)
          ? '<div class="work-card__links">' +
            p.links
              .map(function (l) {
                return (
                  '<a class="work-card__link" href="' +
                  esc(l.url) +
                  '"' +
                  linkAttrs(l.url) +
                  ">" +
                  esc(l.label) +
                  icon("arrowUpRight") +
                  "</a>"
                );
              })
              .join("") +
            "</div>"
          : "";

        var tags = isFilled(p.tags)
          ? '<div class="tags">' +
            p.tags
              .map(function (t) {
                return '<span class="tag">' + esc(t) + "</span>";
              })
              .join("") +
            "</div>"
          : "";

        var status = p.status ? '<span class="badge">' + esc(p.status) + "</span>" : "";

        return (
          '<article class="work-card reveal">' +
          '<div class="work-card__media">' +
          media +
          "</div>" +
          '<div class="work-card__head">' +
          '<span class="circle" aria-hidden="true">' +
          icon("arrowUpRight") +
          "</span>" +
          '<h3 class="work-card__title">' +
          esc(p.title) +
          "</h3>" +
          "</div>" +
          '<p class="work-card__blurb">' +
          esc(p.blurb) +
          "</p>" +
          '<div class="work-card__foot">' +
          status +
          links +
          "</div>" +
          tags +
          "</article>"
        );
      })
      .join("");

    mount("work-content", '<div class="work">' + cards + "</div>");
  }

  /* ----------------------------------------------------------------- stack */

  var LEVEL_DOTS = { Basic: 1, Intermediate: 2, Experienced: 3 };

  function dots(level) {
    var on = LEVEL_DOTS[level] || 0;
    if (!on) return "";
    var out = "";
    for (var i = 1; i <= 3; i++) {
      out += '<span class="chip__dot" data-on="' + (i <= on ? "true" : "false") + '"></span>';
    }
    return '<span class="chip__dots" aria-hidden="true">' + out + "</span>";
  }

  function renderStack() {
    if (!isFilled(CONTENT.skills)) {
      mount("stack-content", emptyState("Skills coming soon", ""));
      return;
    }

    var cards = CONTENT.skills
      .map(function (group) {
        var chips = (group.items || [])
          .map(function (s) {
            /* The level is spelled out for assistive tech; sighted users
               get the three dots. */
            var label = s.level ? esc(s.name) + " — " + esc(s.level) : esc(s.name);
            return (
              '<span class="chip" title="' +
              label +
              '"><span class="visually-hidden">' +
              label +
              '</span><span aria-hidden="true">' +
              esc(s.name) +
              "</span>" +
              dots(s.level) +
              "</span>"
            );
          })
          .join("");

        return (
          '<div class="stack-card reveal">' +
          '<div class="stack-card__chips">' +
          chips +
          "</div>" +
          '<h3 class="stack-card__title">' +
          esc(group.group) +
          "</h3>" +
          (group.blurb ? '<p class="stack-card__note">' + esc(group.blurb) + "</p>" : "") +
          "</div>"
        );
      })
      .join("");

    var soft = isFilled(CONTENT.softSkills)
      ? '<div class="stack__soft reveal">' +
        '<p class="caps">Project &amp; team</p>' +
        '<div class="tags">' +
        CONTENT.softSkills
          .map(function (s) {
            return '<span class="tag">' + esc(s) + "</span>";
          })
          .join("") +
        "</div></div>"
      : "";

    mount("stack-content", '<div class="stack__grid">' + cards + "</div>" + soft);
  }

  /* --------------------------------------------------------------- ledgers */

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function renderExperience() {
    if (!isFilled(CONTENT.experience)) {
      mount(
        "experience-content",
        emptyState(
          "Experience is being written up",
          "Roles will be listed here shortly. In the meantime the CV has the full history."
        )
      );
      return;
    }

    var rows = CONTENT.experience
      .map(function (e, i) {
        var meta = [];
        meta.push('<span class="ledger__org">' + esc(e.org) + "</span>");
        if (e.period) meta.push('<span class="ledger__period">' + esc(e.period) + "</span>");
        if (e.current) meta.push('<span class="badge">Current</span>');

        var points = isFilled(e.points)
          ? '<ul class="ledger__points">' +
            e.points
              .map(function (p) {
                return "<li>" + esc(p) + "</li>";
              })
              .join("") +
            "</ul>"
          : "";

        var tags = isFilled(e.tags)
          ? '<div class="tags">' +
            e.tags
              .map(function (t) {
                return '<span class="tag">' + esc(t) + "</span>";
              })
              .join("") +
            "</div>"
          : "";

        return (
          '<article class="ledger__row reveal">' +
          '<div class="ledger__index" aria-hidden="true">' +
          pad(i + 1) +
          "</div>" +
          '<div class="ledger__head">' +
          '<h3 class="ledger__role">' +
          esc(e.role) +
          "</h3>" +
          '<div class="ledger__meta">' +
          meta.join("") +
          "</div>" +
          "</div>" +
          '<div class="ledger__body">' +
          (e.summary ? '<p class="ledger__summary">' + esc(e.summary) + "</p>" : "") +
          points +
          tags +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    mount("experience-content", '<div class="ledger">' + rows + "</div>");
  }

  function renderEducation() {
    var rows = isFilled(CONTENT.education)
      ? CONTENT.education
          .map(function (e, i) {
            var meta = [];
            meta.push('<span class="ledger__org">' + esc(e.org) + "</span>");
            if (e.current) meta.push('<span class="badge">Current</span>');

            var body = [];
            if (e.period) body.push('<span class="ledger__period">' + esc(e.period) + "</span>");
            if (e.note) body.push('<p class="ledger__summary">' + esc(e.note) + "</p>");

            return (
              '<article class="ledger__row reveal">' +
              '<div class="ledger__index" aria-hidden="true">' +
              pad(i + 1) +
              "</div>" +
              '<div class="ledger__head">' +
              '<h3 class="ledger__role">' +
              esc(e.degree) +
              "</h3>" +
              '<div class="ledger__meta">' +
              meta.join("") +
              "</div>" +
              "</div>" +
              '<div class="ledger__body">' +
              body.join("") +
              "</div>" +
              "</article>"
            );
          })
          .join("")
      : "";

    var certs = isFilled(CONTENT.certifications)
      ? '<div class="stack__soft reveal" style="border-top-color: var(--hairline)">' +
        '<p class="caps">Certifications</p><div class="tags">' +
        CONTENT.certifications
          .map(function (c) {
            var text = esc([c.name, c.issuer, c.year].filter(Boolean).join(" · "));
            return c.url
              ? '<a class="tag" href="' + esc(c.url) + '"' + linkAttrs(c.url) + ">" + text + "</a>"
              : '<span class="tag">' + text + "</span>";
          })
          .join("") +
        "</div></div>"
      : "";

    if (!rows) {
      mount("education-content", emptyState("Education coming soon", ""));
      return;
    }

    mount("education-content", '<div class="ledger ledger--edu">' + rows + "</div>" + certs);
  }

  /* --------------------------------------------------------------- contact */

  function renderContact() {
    var c = CONTENT.contact || {};

    var email = (c.channels || []).filter(function (ch) {
      return ch.icon === "email";
    })[0];

    var disc = email
      ? '<a class="disc" href="' + esc(email.url) + '">Get in touch</a>'
      : "";

    var channels = isFilled(c.channels)
      ? '<div class="channels reveal">' +
        c.channels
          .map(function (ch) {
            return (
              '<div class="channel"><p class="channel__label">' +
              esc(ch.label) +
              '</p><a class="channel__value ulink" href="' +
              esc(ch.url) +
              '"' +
              linkAttrs(ch.url) +
              ">" +
              esc(ch.value) +
              "</a></div>"
            );
          })
          .join("") +
        "</div>"
      : "";

    mount(
      "contact-content",
      '<div class="reveal">' +
        '<p class="micro">' +
        esc(c.kicker || "That's all for now.") +
        "</p>" +
        '<h2 class="contact__lead" id="contact-title">' +
        esc(c.lead || "Got a project in mind? Let's talk") +
        "</h2>" +
        (c.blurb ? '<p class="contact__blurb">' + esc(c.blurb) + "</p>" : "") +
        "</div>" +
        '<div class="contact__rule">' +
        disc +
        "</div>" +
        channels
    );
  }

  /* ---------------------------------------------------------------- footer */

  function renderFooter() {
    var f = CONTENT.footer || {};
    var name = (CONTENT.hero && CONTENT.hero.name) || "";

    var links = isFilled(CONTENT.socials)
      ? '<div class="footer__links">' +
        CONTENT.socials
          .map(function (s) {
            return (
              '<a href="' +
              esc(s.url) +
              '"' +
              linkAttrs(s.url) +
              ">" +
              esc(s.label) +
              "</a>"
            );
          })
          .join("") +
        "</div>"
      : "";

    var top = f.tagline
      ? '<div class="footer__top">' +
        '<p class="footer__tagline">' +
        esc(f.tagline) +
        "</p>" +
        '<a href="#top" aria-label="Back to top"><span class="circle">' +
        icon("arrowUpRight") +
        "</span></a></div>"
      : "";

    var wordmark = '<div class="footer__wordmark" aria-hidden="true">' +
      esc(f.wordmark || name) +
      "</div>";

    var note =
      '<p class="footer__note">&copy; <span id="year">' +
      String(new Date().getFullYear()) +
      "</span> " +
      esc(name) +
      ". " +
      esc(f.note || "Built from scratch with HTML, CSS and vanilla JavaScript.") +
      "</p>";

    mount(
      "footer-content",
      top +
        wordmark +
        '<div class="footer__meta">' +
        note +
        '<div style="display:flex;align-items:center;gap:1.25rem">' +
        links +
        '<button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark mode">' +
        '<svg class="theme-toggle__moon" ' +
        S +
        '><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
        '<svg class="theme-toggle__sun" ' +
        S +
        '><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
        "</button></div></div>"
    );
  }

  /* ---------------------------------------------------------- interaction */

  function initTheme() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var explicit = root.getAttribute("data-theme");
      var currentlyDark = explicit
        ? explicit === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = currentlyDark ? "light" : "dark";

      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode — the choice just won't persist */
      }
    });
  }

  /** Grows the marquee until one half is wider than the viewport, so the
   *  -50% loop is seamless at any window size. Without this, a wide monitor
   *  shows a gap where the track ends.
   *
   *  The track is always exactly two identical halves: the animation slides
   *  it by -50%, which lands the second half precisely where the first
   *  started. Keep that invariant if you touch this. */
  function initMarquee() {
    var tracks = document.querySelectorAll(".marquee__track");

    Array.prototype.forEach.call(tracks, function (track) {
      var unit = track.getAttribute("data-marquee-unit");
      if (!unit) return;

      /* One "unit" is the phrase plus its separator, captured from the
         markup so the escaping stays in one place (renderHero). */
      var unitHtml = track.innerHTML.slice(0, track.innerHTML.length / 2);

      var fit = function () {
        var copies = 1;
        var half;

        do {
          half = unitHtml.repeat(copies);
          track.innerHTML = half + half;
          copies++;
          /* The cap stops a runaway loop if widths ever read as zero (the
             element is hidden, or the font failed to load). */
        } while (track.scrollWidth / 2 < window.innerWidth && copies <= 12);
      };

      fit();

      /* Re-measure once webfonts have settled, since the first pass may
         have measured the fallback face. */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(fit).catch(function () {});
      }

      /* And again on resize, throttled to one run per frame. */
      var queued = false;
      window.addEventListener(
        "resize",
        function () {
          if (queued) return;
          queued = true;
          window.requestAnimationFrame(function () {
            queued = false;
            fit();
          });
        },
        { passive: true }
      );
    });
  }

  /** Highlights the dock button for whichever section is on screen. */
  function initScrollSpy() {
    var buttons = {};
    document.querySelectorAll(".dock__btn[data-spy]").forEach(function (b) {
      buttons[b.getAttribute("data-spy")] = b;
    });

    var ids = Object.keys(buttons);
    if (!ids.length || !("IntersectionObserver" in window)) return;

    var visible = {};

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });

        /* Pick the first section in document order that is on screen, so
           two overlapping sections cannot both look active. */
        var active = ids.filter(function (id) {
          return visible[id];
        })[0];

        ids.forEach(function (id) {
          if (id === active) {
            buttons[id].setAttribute("aria-current", "true");
          } else {
            buttons[id].removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px" }
    );

    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /** Fades elements in as they scroll into view. */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------ boot */

  renderDock();
  renderHero();
  renderAboutIntro();
  renderAbout();
  renderWork();
  renderStack();
  renderExperience();
  renderEducation();
  renderContact();
  renderFooter();

  initTheme();
  initMarquee();
  initScrollSpy();
  initReveal();
})();
