(() => {
  "use strict";

  const LANGUAGES = ["bj", "ne", "en"];
  const STORAGE_KEY = "ska-language-v2";
  const CATEGORY_KEYS = ["general", "membership", "meeting"];
  const labels = {
    bj: {
      example: "प्रकाशित", general: "सामान्य", membership: "सदस्यता", meeting: "बैठक",
      emptyTitle: "अभी कौनो आधिकारिक सूचना प्रकाशित नइखे",
      emptyDescription: "पुष्टि भइल सूचना मिलला पर इहाँ देखावल जाई। नमूना सूचना के आधिकारिक नइखे बतावल जात।",
      emptyCommittee: "कार्यसमिति के आधिकारिक सूची अभी उपलब्ध नइखे",
      emptyCommitteeDescription: "पुष्टि भइल पदाधिकारी सभके नाम आ पद इहाँ प्रकाशित होई।",
      noResults: "रउआ के खोज के हिसाब से कौनो सूचना ना मिलल। दोसर शब्द से खोजीं।",
      draftSaved: "आवेदन के मसौदा रउआ के उपकरण में डाउनलोड हो गेल हए। ई संस्था में जमा नइखे भइल।",
      menuOpen: "मेनु खोलीं", menuClose: "मेनु बन्द करीं",
      application: "सहोडवा कर्मचारी एसोसिएसन\nसदस्यता खातिर रुचि आवेदन — मसौदा मात्र\n\n",
      name: "नाम", phone: "सम्पर्क नम्बर", area: "कार्यालय / इलाका", email: "इमेल",
      notice: "\nई निजी मसौदा मात्र हए। कौनो संस्था में अपने-आप जमा नइखे भइल।",
      printTitle: "सदस्यता आवेदन — मसौदा", dateLabel: "तारीख",
      shareSuccess: "वेबसाइट के लिंक कॉपी हो गेल हए।", shareFallback: "लिंक कॉपी ना हो सकल। ब्राउजर के लिंक शेयर करीं।",
      loadIssue: "सूचना अभी लोड ना हो सकल। पन्ना फेर से खोलीं।"
    },
    ne: {
      example: "प्रकाशित", general: "सामान्य", membership: "सदस्यता", meeting: "बैठक",
      emptyTitle: "अहिलेसम्म आधिकारिक सूचना प्रकाशित गरिएको छैन",
      emptyDescription: "पुष्टि भएका सूचना उपलब्ध भएपछि यहाँ देखाइनेछन्। नमूना सूचनालाई आधिकारिक रूपमा प्रस्तुत गरिँदैन।",
      emptyCommittee: "कार्यसमितिको आधिकारिक सूची उपलब्ध छैन",
      emptyCommitteeDescription: "पुष्टि भएका पदाधिकारीहरूको नाम र पद यहाँ प्रकाशित गरिनेछ।",
      noResults: "खोजसँग मिल्दो सूचना भेटिएन। अर्को शब्द प्रयोग गर्नुहोस्।",
      draftSaved: "आवेदनको प्रारूप तपाईंको उपकरणमा डाउनलोड गरिएको छ। यो संस्थामा पेश गरिएको छैन।",
      menuOpen: "मेनु खोल्नुहोस्", menuClose: "मेनु बन्द गर्नुहोस्",
      application: "सहोडवा कर्मचारी एसोसिएसन\nसदस्यता रुचि आवेदन — प्रारूप मात्र\n\n",
      name: "नाम", phone: "सम्पर्क नम्बर", area: "कार्यालय / क्षेत्र", email: "इमेल",
      notice: "\nयो व्यक्तिगत प्रारूप मात्र हो। कुनै संस्थामा स्वचालित रूपमा पेश गरिएको छैन।",
      printTitle: "सदस्यता आवेदन — प्रारूप", dateLabel: "मिति",
      shareSuccess: "वेबसाइटको लिंक प्रतिलिपि गरियो।", shareFallback: "लिंक प्रतिलिपि गर्न सकिएन। ब्राउजरबाट साझा गर्नुहोस्।",
      loadIssue: "सूचना लोड हुन सकेन। कृपया पृष्ठ पुनः खोल्नुहोस्।"
    },
    en: {
      example: "Published", general: "General", membership: "Membership", meeting: "Meeting",
      emptyTitle: "No official notices have been published yet",
      emptyDescription: "Confirmed announcements will appear here when available. We do not present example notices as official.",
      emptyCommittee: "Official committee directory pending",
      emptyCommitteeDescription: "Only confirmed representative names and roles will be published.",
      noResults: "No notices match your search. Try a different keyword.",
      draftSaved: "Your application draft was downloaded to your device. It has NOT been submitted to the association.",
      menuOpen: "Open navigation", menuClose: "Close navigation",
      application: "Sahodawa Karmachari Association\nMembership interest application — DRAFT ONLY\n\n",
      name: "Name", phone: "Contact number", area: "Office / area", email: "Email",
      notice: "\nThis is only a personal draft. It has not been submitted to any organization.",
      printTitle: "Membership application — draft", dateLabel: "Date",
      shareSuccess: "Website link copied.", shareFallback: "Could not copy the link. Use your browser to share it.",
      loadIssue: "Updates could not be loaded. Please refresh this page."
    }
  };

  const $ = (selector) => document.querySelector(selector);
  const translatable = [...document.querySelectorAll("[data-en][data-ne][data-bj]")];
  const placeholderInputs = [...document.querySelectorAll("[data-placeholder-en]")];
  const langButtons = [...document.querySelectorAll("[data-lang]")];
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const menuButton = $("#menuButton");
  const navLinks = $("#navLinks");
  const noticeList = $("#noticeList");
  const noticeToolbar = $("#noticeToolbar");
  const noticeSearch = $("#noticeSearch");
  const committeeGrid = $("#committeeGrid");

  let language = "bj";
  let activeFilter = "all";
  let notices = [];
  let committee = [];
  let contentProblem = false;

  const persistLanguage = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) { /* optional */ }
  };
  const loadLanguage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.includes(saved) ? saved : "bj";
    } catch (_) { return "bj"; }
  };

  function icon(name) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    el.setAttribute("class", "icon");
    el.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#" + name);
    el.appendChild(use);
    return el;
  }
  function node(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = String(value);
    return el;
  }
  function translated(item) {
    return item && typeof item === "object" ?
      String(item[language] || item.ne || item.en || "") : "";
  }
  function validTranslations(item) {
    return item && LANGUAGES.every(lang => typeof item[lang] === "string" && item[lang].trim());
  }
  function safeLink(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      if (!["https:", "http:"].includes(url.protocol)) return null;
      return url.href;
    } catch (_) { return null; }
  }
  function formatDate(value) {
    // ISO format avoids falsely labeling Gregorian dates as Bikram Sambat dates.
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
  }

  function emptyPanel(title, description, symbol, warning = false) {
    const panel = node("div", "editorial-empty" + (warning ? " is-warning" : ""));
    const emblem = node("span", "empty-symbol");
    emblem.appendChild(icon(symbol));
    const copy = node("div", "empty-copy");
    copy.append(node("h3", "", title), node("p", "", description));
    panel.append(emblem, copy);
    return panel;
  }

  function renderNotices() {
    noticeToolbar.hidden = notices.length === 0;
    noticeList.replaceChildren();
    if (notices.length === 0) {
      noticeList.appendChild(emptyPanel(labels[language].emptyTitle,
        contentProblem ? labels[language].loadIssue : labels[language].emptyDescription, "i-file", contentProblem));
      return;
    }
    const query = noticeSearch.value.trim().toLocaleLowerCase();
    const visible = notices.filter(item => {
      if (activeFilter !== "all" && item.category !== activeFilter) return false;
      const haystack = [
        ...LANGUAGES.map(lang => item.title[lang]),
        ...LANGUAGES.map(lang => item.description[lang]),
        ...LANGUAGES.map(lang => labels[lang][item.category])
      ].join(" ").toLocaleLowerCase();
      return haystack.includes(query);
    });

    if (visible.length === 0) {
      noticeList.appendChild(emptyPanel(labels[language].noResults, "", "i-search"));
      return;
    }
    for (const notice of visible) {
      const article = node("article", "notice-item");
      const tile = node("div", "notice-tile");
      tile.appendChild(icon(notice.category === "meeting" ? "i-calendar" :
        notice.category === "membership" ? "i-users" : "i-file"));

      const details = node("div", "notice-details");
      const meta = node("div", "notice-meta");
      meta.appendChild(node("span", "notice-category", labels[language][notice.category]));
      const date = formatDate(notice.date);
      if (date) {
        const time = node("time", "", date);
        time.setAttribute("datetime", date);
        meta.appendChild(time);
      }
      const heading = node("h3", "", translated(notice.title));
      const excerpt = node("p", "", translated(notice.description));
      details.append(meta, heading, excerpt);

      const href = safeLink(notice.url);
      if (href) {
        const more = node("a", "notice-more", language === "en" ? "View document" : language === "ne" ? "कागजात हेर्नुहोस्" : "कागज देखीं");
        more.href = href;
        more.target = "_blank";
        more.rel = "noopener noreferrer";
        details.appendChild(more);
      }
      const badge = node("span", "notice-status", labels[language].example);
      article.append(tile, details, badge);
      noticeList.appendChild(article);
    }
  }

  function renderCommittee() {
    committeeGrid.replaceChildren();
    if (committee.length === 0) {
      committeeGrid.appendChild(emptyPanel(labels[language].emptyCommittee,
        labels[language].emptyCommitteeDescription, "i-users"));
      return;
    }
    for (const person of committee) {
      const card = node("article", "member-card");
      const portrait = node("div", "member-portrait");
      const photo = safeLink(person.photo);
      if (photo) {
        const img = document.createElement("img");
        img.src = photo;
        img.alt = "";
        img.loading = "lazy";
        img.onerror = () => { img.remove(); portrait.textContent = translated(person.name).trim().slice(0,1) || "स"; };
        portrait.appendChild(img);
      } else {
        portrait.textContent = translated(person.name).trim().slice(0, 1) || "स";
      }
      const copy = node("div", "member-meta");
      copy.append(node("span", "member-role", translated(person.role)),
        node("h3", "", translated(person.name)));
      card.append(portrait, copy);
      committeeGrid.appendChild(card);
    }
  }

  function setLanguage(lang) {
    language = LANGUAGES.includes(lang) ? lang : "bj";
    document.documentElement.lang = language === "bj" ? "vjk" : language;
    for (const el of translatable) {
      const value = el.getAttribute("data-" + language);
      if (value !== null) el.textContent = value;
    }
    for (const input of placeholderInputs) {
      const value = input.getAttribute("data-placeholder-" + language);
      if (value !== null) input.placeholder = value;
    }
    for (const button of langButtons) {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    menuButton.setAttribute("aria-label", labels[language][menuButton.getAttribute("aria-expanded") === "true" ? "menuClose" : "menuOpen"]);
    $("#languageStatus").textContent = language === "bj" ? "बज्जिका भाषा चुनल गेल" :
      language === "ne" ? "नेपाली भाषा चयन गरियो" : "English selected";
    $("#formStatus").textContent = "";
    $("#shareStatus").textContent = "";
    persistLanguage(language);
    renderNotices();
    renderCommittee();
  }

  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", labels[language].menuOpen);
    menuButton.replaceChildren(icon("i-menu"));
  }

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") !== "true";
    navLinks.classList.toggle("is-open", expanded);
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", labels[language][expanded ? "menuClose" : "menuOpen"]);
    menuButton.replaceChildren(icon(expanded ? "i-x" : "i-menu"));
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const sections = [...document.querySelectorAll("main section[id]")];
    const links = [...document.querySelectorAll('.nav-links>a[href^="#"]:not(.btn)')];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const id = visible[0].target.id;
      links.forEach(link => {
        const active = link.getAttribute("href") === "#" + id;
        link.classList.toggle("current", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-110px 0px -55% 0px", threshold: [0, 0.15, 0.4] });
    sections.forEach(section => observer.observe(section));
  }

  filterButtons.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderNotices();
  }));
  noticeSearch.addEventListener("input", renderNotices);
  langButtons.forEach(button => button.addEventListener("click", e => {
    e.preventDefault();
    setLanguage(button.dataset.lang);
  }));

  const membershipForm = $("#membershipForm");
  function memberValues() {
    if (!membershipForm.reportValidity()) return null;
    const form = new FormData(membershipForm);
    return {
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      area: String(form.get("area") || "").trim(),
      email: String(form.get("email") || "").trim()
    };
  }
  function textDraft(values) {
    const t = labels[language];
    return t.application + [
      [t.name, values.name], [t.phone, values.phone],
      [t.area, values.area], [t.email, values.email || "-"]
    ].map(([key, value]) => key + ": " + value).join("\n") + "\n" + t.notice + "\n";
  }
  membershipForm.addEventListener("submit", event => {
    event.preventDefault();
    const values = memberValues();
    if (!values) return;
    const blob = new Blob(["\uFEFF", textDraft(values)], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = "sahodawa-membership-draft.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    $("#formStatus").textContent = labels[language].draftSaved;
  });

  $("#printMemberDraft").addEventListener("click", () => {
    const values = memberValues();
    if (!values) return;
    const t = labels[language];
    const sheet = $("#printSheet");
    sheet.replaceChildren();
    sheet.append(node("h1", "", "सहोडवा कर्मचारी एसोसिएसन"),
      node("h2", "", t.printTitle),
      node("p", "print-date", t.dateLabel + ": " + new Date().toISOString().slice(0, 10)));
    const list = node("dl", "print-details");
    for (const [label, value] of [[t.name, values.name], [t.phone, values.phone],
      [t.area, values.area], [t.email, values.email || "-"]]) {
      list.append(node("dt", "", label), node("dd", "", value));
    }
    sheet.append(list, node("p", "print-note", t.notice.trim()));
    document.body.classList.add("printing-application");
    window.addEventListener("afterprint", () => document.body.classList.remove("printing-application"), { once: true });
    window.print();
  });

  async function copyToClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    const field = node("textarea", "clipboard-fallback");
    field.value = value;
    field.readOnly = true;
    document.body.appendChild(field);
    field.select();
    const okay = typeof document.execCommand === "function" && document.execCommand("copy");
    field.remove();
    return okay;
  }
  $("#shareSite").addEventListener("click", async () => {
    const siteUrl = new URL(window.location.href);
    siteUrl.hash = "";
    siteUrl.search = "";
    const share = { title: document.title, url: siteUrl.href };
    try {
      if (navigator.share) {
        await navigator.share(share);
        return;
      }
      if (!await copyToClipboard(siteUrl.href)) throw new Error("Clipboard unavailable");
      $("#shareStatus").textContent = labels[language].shareSuccess;
    } catch (error) {
      if (error && error.name === "AbortError") return;
      // Try copying when the platform's share sheet rejects the request.
      try {
        if (await copyToClipboard(siteUrl.href)) {
          $("#shareStatus").textContent = labels[language].shareSuccess;
          return;
        }
      } catch (_) { /* unsupported */ }
      $("#shareStatus").textContent = labels[language].shareFallback;
    }
  });

  async function loadContent() {
    try {
      const [noticesResponse, committeeResponse] = await Promise.all([
        fetch(new URL("content/notices.json", document.baseURI), { cache: "no-store" }),
        fetch(new URL("content/committee.json", document.baseURI), { cache: "no-store" })
      ]);
      if (!noticesResponse.ok || !committeeResponse.ok) throw new Error("Content fetch failed");
      const [noticeData, memberData] = await Promise.all([noticesResponse.json(), committeeResponse.json()]);
      notices = Array.isArray(noticeData.notices) ? noticeData.notices.filter(item =>
        item && item.status === "published" && CATEGORY_KEYS.includes(item.category) &&
        validTranslations(item.title) && validTranslations(item.description)
      ).sort((a,b) => String(b.date || "").localeCompare(String(a.date || ""))) : [];
      committee = Array.isArray(memberData.members) ? memberData.members.filter(item =>
        item && item.status === "published" && validTranslations(item.name) && validTranslations(item.role)
      ) : [];
      contentProblem = false;
    } catch (error) {
      // Fail closed: content is never guessed or replaced with invented notices.
      notices = [];
      committee = [];
      contentProblem = true;
      console.warn("Public website content could not be loaded:", error);
    }
    renderNotices();
    renderCommittee();
  }

  $("#year").textContent = String(new Date().getFullYear());
  setLanguage(loadLanguage());
  loadContent();
})();
