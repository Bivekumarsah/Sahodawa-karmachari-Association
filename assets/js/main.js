(() => {
  "use strict";

  const notices = [
    {
      id: "notice-board",
      category: "general",
      title: { ne: "आधिकारिक सूचना यहाँ प्रकाशित गरिनेछ", en: "Official announcements will appear here" },
      description: { ne: "संस्थाबाट पुष्टि भएका सूचनाहरू प्राप्त भएपछि यस पृष्ठमा प्रकाशन गरिनेछ।", en: "Verified announcements from the association will be published in this section." }
    },
    {
      id: "membership-info",
      category: "membership",
      title: { ne: "सदस्यता प्रक्रिया सम्बन्धी जानकारी", en: "Membership process information" },
      description: { ne: "सदस्यताका योग्यता, शुल्क र प्रक्रिया पुष्टि हुन बाँकी छन्।", en: "Membership eligibility, fees and the application process are yet to be confirmed." }
    },
    {
      id: "meeting-info",
      category: "meeting",
      title: { ne: "बैठक तथा कार्यक्रम जानकारी", en: "Meeting and event information" },
      description: { ne: "आधिकारिक बैठक तथा कार्यक्रमका विवरण उपलब्ध भएपछि अद्यावधिक गरिनेछ।", en: "Meeting and event details will be added when official information is available." }
    }
  ];

  const labels = {
    ne: {
      example: "नमूना — आधिकारिक होइन",
      general: "साधारण",
      membership: "सदस्यता",
      meeting: "बैठक",
      noResults: "मिल्दो सूचना भेटिएन। अर्को शब्द प्रयोग गर्नुहोस्।",
      draftSaved: "आवेदनको प्रारूप तपाईंको उपकरणमा डाउनलोड गरिएको छ। यो संस्थामा पेश गरिएको छैन।",
      menuOpen: "मेनु खोल्नुहोस्",
      menuClose: "मेनु बन्द गर्नुहोस्",
      application: "सहोडवा कर्मचारी एसोसिएसन\nसदस्यता रुचि आवेदन — प्रारूप मात्र\n\n",
      name: "नाम",
      phone: "सम्पर्क नम्बर",
      area: "कार्यालय / क्षेत्र",
      email: "इमेल",
      notice: "\nयो व्यक्तिगत प्रारूप मात्र हो। कुनै संस्थामा स्वचालित रूपमा पेश गरिएको छैन।"
    },
    en: {
      example: "EXAMPLE — NOT OFFICIAL",
      general: "General",
      membership: "Membership",
      meeting: "Meeting",
      noResults: "No matching notices. Try another keyword.",
      draftSaved: "Your application draft has been downloaded to your device. It has NOT been submitted to the association.",
      menuOpen: "Open navigation",
      menuClose: "Close navigation",
      application: "Sahodawa Karmachari Association\nMembership interest application — DRAFT ONLY\n\n",
      name: "Name",
      phone: "Contact number",
      area: "Office / area",
      email: "Email",
      notice: "\nThis is only a personal draft. It has not been submitted to any organization."
    }
  };

  const translatable = Array.from(document.querySelectorAll("[data-en]"));
  for (const element of translatable) {
    element.dataset.ne = element.textContent;
  }
  const placeholderInputs = Array.from(document.querySelectorAll("[data-placeholder-en]"));
  for (const input of placeholderInputs) {
    input.dataset.placeholderNe = input.placeholder;
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const searchInput = document.getElementById("noticeSearch");
  const noticeList = document.getElementById("noticeList");
  const langButtons = Array.from(document.querySelectorAll("[data-lang]"));
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  let activeFilter = "all";
  let language = "ne";

  const persistLanguage = (value) => {
    try { localStorage.setItem("ska-language", value); } catch (_) { /* storage optional */ }
  };
  const loadLanguage = () => {
    try { return localStorage.getItem("ska-language") === "en" ? "en" : "ne"; }
    catch (_) { return "ne"; }
  };

  const createIcon = (id) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  };

  const addText = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  };

  const renderNotices = () => {
    const query = (searchInput.value || "").trim().toLocaleLowerCase();
    noticeList.replaceChildren();
    const filtered = notices.filter((notice) => {
      if (activeFilter !== "all" && notice.category !== activeFilter) return false;
      const searchable = [notice.title.ne, notice.title.en, notice.description.ne, notice.description.en, labels.ne[notice.category], labels.en[notice.category]].join(" ").toLocaleLowerCase();
      return searchable.includes(query);
    });

    if (filtered.length === 0) {
      noticeList.appendChild(addText("p", "notice-empty", labels[language].noResults));
      return;
    }

    for (const notice of filtered) {
      const article = document.createElement("article");
      article.className = "notice-item";
      const symbol = document.createElement("div");
      symbol.className = "notice-tile";
      symbol.appendChild(createIcon(notice.category === "meeting" ? "i-calendar" : notice.category === "membership" ? "i-users" : "i-file"));

      const content = document.createElement("div");
      const meta = document.createElement("div");
      meta.className = "notice-meta";
      meta.appendChild(addText("span", "notice-category", labels[language][notice.category]));
      meta.appendChild(addText("span", "", "•"));
      meta.appendChild(addText("span", "", labels[language].example));
      content.appendChild(meta);
      content.appendChild(addText("h3", "", notice.title[language]));
      content.appendChild(addText("p", "", notice.description[language]));

      const status = addText("span", "notice-status", labels[language].example);
      article.append(symbol, content, status);
      noticeList.appendChild(article);
    }
  };

  const setLanguage = (lang) => {
    language = lang === "en" ? "en" : "ne";
    document.documentElement.lang = language;
    for (const element of translatable) {
      element.textContent = language === "en" ? element.dataset.en : element.dataset.ne;
    }
    for (const input of placeholderInputs) {
      input.placeholder = language === "en" ? input.dataset.placeholderEn : input.dataset.placeholderNe;
    }
    for (const button of langButtons) {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    menuButton.setAttribute("aria-label", labels[language][menuButton.getAttribute("aria-expanded") === "true" ? "menuClose" : "menuOpen"]);
    persistLanguage(language);
    renderNotices();
  };

  const closeMenu = () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", labels[language].menuOpen);
    menuButton.replaceChildren(createIcon("i-menu"));
  };

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") !== "true";
    navLinks.classList.toggle("is-open", expanded);
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", labels[language][expanded ? "menuClose" : "menuOpen"]);
    menuButton.replaceChildren(createIcon(expanded ? "i-x" : "i-menu"));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && navLinks.classList.contains("is-open")) closeMenu();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderNotices();
    });
  });
  searchInput.addEventListener("input", renderNotices);
  langButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));

  const membershipForm = document.getElementById("membershipForm");
  membershipForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!membershipForm.reportValidity()) return;

    const form = new FormData(membershipForm);
    const current = labels[language];
    const fields = [
      [current.name, form.get("name")],
      [current.phone, form.get("phone")],
      [current.area, form.get("area")],
      [current.email, form.get("email") || "-"]
    ];
    const draft = current.application + fields.map(([key, value]) => key + ": " + String(value).trim()).join("\n") + "\n" + current.notice + "\n";
    const blob = new Blob(["\uFEFF", draft], { type: "text/plain;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "sahodawa-membership-draft.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    document.getElementById("formStatus").textContent = current.draftSaved;
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
  setLanguage(loadLanguage());
})();
