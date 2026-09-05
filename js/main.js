/* ==========================================================================
   main.js — renders the page from data/content.js and wires up interaction.

   You should not normally need to edit this file. To change what the site
   says, edit data/content.js instead.
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
      .replace(/"/g, "&quot;");
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

  function emptyState(title, message) {
    return (
      '<div class="empty reveal"><h3>' +
      esc(title) +
      "</h3><p>" +
      esc(message) +
      "</p></div>"
    );
  }

  /* ---------------------------------------------------------------- icons */

  var ICONS = {
    email:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    linkedin:
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.4 8.4h3.1V21H3.4zM9.3 8.4h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-6.13c0-1.46-.03-3.34-2.03-3.34-2.04 0-2.35 1.59-2.35 3.23V21H9.3z"/></svg>',
    github:
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49l-.01-1.71c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2z"/></svg>',
    phone:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.8a2 2 0 0 1 1.7 2z"/></svg>',
    pin:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    download:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    arrow:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  };

  function icon(name) {
    return ICONS[name] || "";
  }

  /* ------------------------------------------------------------------ hero */

  function renderHero() {
    var h = CONTENT.hero || {};

    var highlights = isFilled(h.highlights)
      ? '<div class="stats reveal">' +
        h.highlights
          .map(function (s) {
            return (
              '<div class="stat"><div class="stat__value">' +
              esc(s.value) +
              '</div><div class="stat__label">' +
              esc(s.label) +
              "</div></div>"
            );
          })
          .join("") +
        "</div>"
      : "";

    var socials = isFilled(CONTENT.socials)
      ? '<div class="hero__socials">' +
        CONTENT.socials
          .map(function (s) {
            return (
              '<a class="icon-btn" href="' +
              esc(s.url) +
              '" aria-label="' +
              esc(s.label) +
              '"' +
              (s.url && s.url.indexOf("http") === 0
                ? ' target="_blank" rel="noopener noreferrer"'
                : "") +
              ">" +
              icon(s.icon) +
              "</a>"
            );
          })
          .join("") +
        "</div>"
      : "";

    var location = h.location
      ? '<p class="hero__location">' + icon("pin") + esc(h.location) + "</p>"
      : "";

    var resume = h.resume
      ? '<a class="btn btn--primary" href="' +
        esc(h.resume) +
        '" download>' +
        icon("download") +
        "Download CV</a>"
      : "";

    var photo = h.photo
      ? '<div class="hero__photo reveal"><img src="' +
        esc(h.photo) +
        '" alt="' +
        esc(h.photoAlt || h.name) +
        '" width="800" height="800" fetchpriority="high" /></div>'
      : "";

    mount(
      "hero",
      '<div class="hero__grid">' +
        '<div class="hero__text reveal">' +
        '<p class="hero__greeting">' +
        esc(h.greeting || "Hello, I'm") +
        "</p>" +
        '<h1 class="hero__name">' +
        esc(h.name) +
        "</h1>" +
        '<p class="hero__role">' +
        esc(h.role) +
        "</p>" +
        '<p class="hero__tagline">' +
        esc(h.tagline) +
        "</p>" +
        location +
        '<div class="hero__actions">' +
        resume +
        '<a class="btn btn--ghost" href="#contact">Get in touch</a>' +
        "</div>" +
        socials +
        "</div>" +
        photo +
        "</div>" +
        highlights
    );
  }

  /* ----------------------------------------------------------------- about */

  function renderAbout() {
    var a = CONTENT.about || {};

    var photo = a.photo
      ? '<div class="about__photo reveal"><img src="' +
        esc(a.photo) +
        '" alt="' +
        esc(a.photoAlt || "") +
        '" width="800" height="1000" loading="lazy" /></div>'
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
              "<div><div class=\"language__name\">" +
              esc(l.name) +
              '</div><div class="language__level">' +
              esc(l.level) +
              "</div></div>"
            );
          })
          .join("") +
        "</div>"
      : "";

    mount(
      "about-content",
      '<div class="about__grid">' +
        photo +
        '<div class="about__body reveal">' +
        paragraphs +
        languages +
        "</div>" +
        "</div>"
    );
  }

  /* ---------------------------------------------------------------- skills */

  var LEVEL_VALUE = { Basic: 35, Intermediate: 65, Experienced: 90 };

  function renderSkills() {
    if (!isFilled(CONTENT.skills)) {
      mount("skills-content", emptyState("Skills coming soon", ""));
      return;
    }

    var groups = CONTENT.skills
      .map(function (group) {
        var items = (group.items || [])
          .map(function (s) {
            var pct = LEVEL_VALUE[s.level] || 50;
            return (
              '<div class="skill">' +
              '<div class="skill__row"><span class="skill__name">' +
              esc(s.name) +
              '</span><span class="skill__level">' +
              esc(s.level) +
              "</span></div>" +
              '<div class="meter"><div class="meter__fill" data-value="' +
              pct +
              '" style="--value:0%"></div></div>' +
              "</div>"
            );
          })
          .join("");

        return (
          '<div class="card skill-group reveal"><h3 class="skill-group__title">' +
          esc(group.group) +
          "</h3>" +
          items +
          "</div>"
        );
      })
      .join("");

    var soft = isFilled(CONTENT.softSkills)
      ? '<div class="soft-skills reveal"><p class="soft-skills__label">Project &amp; team</p><div class="tags">' +
        CONTENT.softSkills
          .map(function (s) {
            return '<span class="tag">' + esc(s) + "</span>";
          })
          .join("") +
        "</div></div>"
      : "";

    mount("skills-content", '<div class="skills__grid">' + groups + "</div>" + soft);
  }

  /* ------------------------------------------------------------ experience */

  function renderExperience() {
    if (!isFilled(CONTENT.experience)) {
      mount(
        "experience-content",
        emptyState(
          "Experience is being written up",
          "Roles and internships will be listed here shortly. In the meantime the CV has the full history."
        )
      );
      return;
    }

    var entries = CONTENT.experience
      .map(function (e) {
        var period = e.period
          ? '<span class="entry__period">' + esc(e.period) + "</span>"
          : "";
        var badge = e.current ? '<span class="badge">Current</span>' : "";
        var summary = e.summary
          ? '<p class="entry__summary">' + esc(e.summary) + "</p>"
          : "";
        var points = isFilled(e.points)
          ? '<ul class="entry__points">' +
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
          '<article class="card entry reveal">' +
          '<div class="entry__head"><h3 class="entry__role">' +
          esc(e.role) +
          "</h3>" +
          badge +
          period +
          "</div>" +
          '<p class="entry__org">' +
          esc(e.org) +
          "</p>" +
          summary +
          points +
          tags +
          "</article>"
        );
      })
      .join("");

    mount("experience-content", '<div class="timeline">' + entries + "</div>");
  }

  /* -------------------------------------------------------------- projects */

  function renderProjects() {
    if (!isFilled(CONTENT.projects)) {
      mount(
        "projects-content",
        emptyState(
          "Projects coming soon",
          "Write-ups are in progress. Meanwhile, code lives on GitHub."
        )
      );
      return;
    }

    var cards = CONTENT.projects
      .map(function (p) {
        var media = p.image
          ? '<div class="project__media"><img src="' +
            esc(p.image) +
            '" alt="' +
            esc(p.title) +
            '" loading="lazy" /></div>'
          : "";

        var meta = [];
        if (p.kind) meta.push('<span class="project__kind">' + esc(p.kind) + "</span>");
        if (p.status) meta.push('<span class="badge">' + esc(p.status) + "</span>");
        var metaHtml = meta.length
          ? '<div class="project__meta">' + meta.join("") + "</div>"
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

        var links = isFilled(p.links)
          ? '<div class="project__footer">' +
            p.links
              .map(function (l) {
                return (
                  '<a class="project__link" href="' +
                  esc(l.url) +
                  '" target="_blank" rel="noopener noreferrer">' +
                  esc(l.label) +
                  icon("arrow") +
                  "</a>"
                );
              })
              .join("") +
            "</div>"
          : "";

        return (
          '<article class="card project reveal">' +
          media +
          '<div class="project__body">' +
          metaHtml +
          '<h3 class="project__title">' +
          esc(p.title) +
          "</h3>" +
          '<p class="project__blurb">' +
          esc(p.blurb) +
          "</p>" +
          tags +
          links +
          "</div></article>"
        );
      })
      .join("");

    mount("projects-content", '<div class="projects__grid">' + cards + "</div>");
  }

  /* ------------------------------------------------------------- education */

  function renderEducation() {
    var items = isFilled(CONTENT.education)
      ? CONTENT.education
          .map(function (e) {
            return (
              '<div class="card edu reveal">' +
              '<h3 class="edu__degree">' +
              esc(e.degree) +
              "</h3>" +
              (e.current ? '<span class="badge">Current</span>' : "") +
              (e.note ? '<span class="edu__note">' + esc(e.note) + "</span>" : "") +
              (e.period ? '<span class="edu__period">' + esc(e.period) + "</span>" : "") +
              '<p class="edu__org">' +
              esc(e.org) +
              "</p>" +
              "</div>"
            );
          })
          .join("")
      : "";

    var certs = isFilled(CONTENT.certifications)
      ? '<div class="certs reveal"><p class="soft-skills__label">Certifications</p>' +
        CONTENT.certifications
          .map(function (c) {
            var name = c.url
              ? '<a href="' +
                esc(c.url) +
                '" target="_blank" rel="noopener noreferrer">' +
                esc(c.name) +
                "</a>"
              : esc(c.name);
            return (
              '<div class="cert"><span>' +
              name +
              '</span><span class="edu__note">' +
              esc([c.issuer, c.year].filter(Boolean).join(" · ")) +
              "</span></div>"
            );
          })
          .join("") +
        "</div>"
      : "";

    mount("education-content", '<div class="education">' + items + "</div>" + certs);
  }

  /* --------------------------------------------------------------- contact */

  function renderContact() {
    var c = CONTENT.contact || {};
    var blurb = document.getElementById("contact-blurb");
    if (blurb) blurb.textContent = c.blurb || "";

    var cards = isFilled(c.channels)
      ? c.channels
          .map(function (ch) {
            var external = ch.url && ch.url.indexOf("http") === 0;
            return (
              '<a class="card contact-card reveal" href="' +
              esc(ch.url) +
              '"' +
              (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
              '><span class="contact-card__icon">' +
              icon(ch.icon) +
              "</span><span>" +
              '<span class="contact-card__label">' +
              esc(ch.label) +
              "</span><br />" +
              '<span class="contact-card__value">' +
              esc(ch.value) +
              "</span></span></a>"
            );
          })
          .join("")
      : "";

    mount("contact-content", '<div class="contact__grid">' + cards + "</div>");

    var footer = isFilled(CONTENT.socials)
      ? CONTENT.socials
          .map(function (s) {
            return (
              '<a class="icon-btn" href="' +
              esc(s.url) +
              '" aria-label="' +
              esc(s.label) +
              '"' +
              (s.url && s.url.indexOf("http") === 0
                ? ' target="_blank" rel="noopener noreferrer"'
                : "") +
              ">" +
              icon(s.icon) +
              "</a>"
            );
          })
          .join("")
      : "";
    mount("footer-socials", footer);
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

  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    var nav = document.getElementById("nav");

    if (toggle && links) {
      // Single place that owns the menu state, so the label, the
      // aria-expanded flag and the visual state can never disagree.
      var setMenu = function (open) {
        links.setAttribute("data-open", String(open));
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };

      toggle.addEventListener("click", function () {
        setMenu(links.getAttribute("data-open") !== "true");
      });

      // Close the mobile menu after tapping a link
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
      });

      // Escape closes it and returns focus to the button
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && links.getAttribute("data-open") === "true") {
          setMenu(false);
          toggle.focus();
        }
      });
    }

    if (nav) {
      var onScroll = function () {
        nav.setAttribute("data-scrolled", String(window.scrollY > 8));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /** Highlights the nav link for whichever section is currently on screen. */
  function initScrollSpy() {
    var sections = Array.prototype.slice.call(
      document.querySelectorAll("main section[id]")
    );
    var links = {};
    document.querySelectorAll(".nav__link").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });

    if (!("IntersectionObserver" in window) || !sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = links[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            Object.keys(links).forEach(function (k) {
              links[k].removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /** Fades elements in as they scroll into view, and fills the skill meters. */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      fillMeters();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".meter__fill").forEach(function (m) {
            m.style.setProperty("--value", m.dataset.value + "%");
          });
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  function fillMeters() {
    document.querySelectorAll(".meter__fill").forEach(function (m) {
      m.style.setProperty("--value", m.dataset.value + "%");
    });
  }

  /* ------------------------------------------------------------------ boot */

  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderEducation();
  renderContact();

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  initTheme();
  initNav();
  initScrollSpy();
  initReveal();
})();
