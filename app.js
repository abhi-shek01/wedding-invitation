(() => {
  "use strict";

  const config = window.INVITATION_CONFIG;
  const root = document.getElementById("invitation");
  if (!config || !root) return;

  const text = (tag, className, value) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value || "";
    return element;
  };

  const updateMeta = (selector, value) => {
    document.querySelector(selector)?.setAttribute("content", value || "");
  };
  document.title = config.meta.title;
  document.documentElement.lang = config.meta.language || "en";
  updateMeta('meta[name="description"]', config.meta.description);
  updateMeta('meta[property="og:title"]', config.meta.title);
  updateMeta('meta[property="og:description"]', config.meta.description);
  updateMeta('meta[name="theme-color"]', config.theme.paper);

  const themeProperties = {
    paper: "--paper",
    ink: "--ink",
    accent: "--accent",
    gold: "--gold",
    bodyFont: "--body-font",
    nameFont: "--name-font",
    backgroundPosition: "--background-position",
    backgroundOpacity: "--background-opacity",
    backgroundBlur: "--background-blur",
    whiteScreenOpacity: "--white-screen-opacity",
    textWashOpacity: "--text-wash-opacity",
  };
  for (const [key, property] of Object.entries(themeProperties)) {
    if (config.theme[key] !== undefined) {
      document.documentElement.style.setProperty(property, config.theme[key]);
    }
  }
  document.body.classList.toggle("animate-entrance", config.theme.entranceAnimation);
  const experience = config.experience || {};
  document.documentElement.style.setProperty("--page-width", experience.pageWidth || "600px");
  document.documentElement.classList.toggle("smooth-scroll", experience.smoothScroll === true);

  const ornament = () => {
    const divider = text("div", "ornament", "✧");
    divider.setAttribute("aria-hidden", "true");
    return divider;
  };

  const renderInvitation = (section) => {
    const page = document.createElement("section");
    page.id = "welcome";
    page.className = "invitation-page";
    page.setAttribute("aria-labelledby", "couple-names");

    const background = document.createElement("img");
    background.className = "invitation-background";
    background.src = config.theme.background;
    background.alt = "";
    background.setAttribute("aria-hidden", "true");
    background.fetchPriority = "high";
    page.append(background);

    const content = document.createElement("div");
    content.className = "invitation-content";
    if (section.ganesh?.image) {
      const ganesh = document.createElement("img");
      ganesh.className = "ganeshji";
      ganesh.src = section.ganesh.image;
      ganesh.alt = section.ganesh.alt || "Lord Ganesha";
      ganesh.width = 100;
      ganesh.height = 100;
      content.append(ganesh);
    }
    const blessing = text("p", "blessing", section.blessing);
    blessing.lang = section.blessingLanguage || "hi";
    content.append(blessing, ornament());

    const orderedPeople = section.personOrder.map((key) => section.people[key]).filter(Boolean);
    const heading = text("h1", "visually-hidden", orderedPeople.map((person) => person.name).join(" & "));
    heading.id = "couple-names";
    content.append(heading, text("p", "introduction", section.introduction));

    const couple = document.createElement("div");
    couple.className = "couple";
    orderedPeople.forEach((person, index) => {
      if (index > 0) couple.append(text("p", "connector", section.connector));
      const personBlock = document.createElement("div");
      personBlock.className = "person";
      personBlock.append(text("h2", "person-name", person.name));
      if (person.parents) personBlock.append(text("p", "parents", person.parents));
      if (person.grandparents) personBlock.append(text("p", "grandparents", person.grandparents));
      couple.append(personBlock);
    });
    content.append(couple, ornament());
    page.append(content);
    return page;
  };

  const renderSaveTheDate = (section) => {
    const page = document.createElement("section");
    page.id = "save-the-date";
    page.className = "invitation-page save-date-page";
    page.setAttribute("aria-labelledby", "save-date-heading");
    page.style.setProperty("--save-date-top-padding", section.layout.topPadding);
    page.style.setProperty("--save-date-logo-size", section.layout.logoSize);
    page.style.setProperty("--save-date-logo-gap", section.layout.logoGap);
    for (const [key, property] of Object.entries(themeProperties)) {
      if (section[key] !== undefined) page.style.setProperty(property, section[key]);
    }
    const background = document.createElement("img");
    background.className = "invitation-background";
    background.src = section.background;
    background.alt = "";
    background.loading = "lazy";
    page.append(background);

    const content = document.createElement("div");
    content.className = "save-date-content";
    const monogram = document.createElement("div");
    monogram.className = "monogram";
    monogram.classList.toggle("is-floating", section.monogram.floating === true);
    monogram.style.setProperty("--logo-float-duration", `${section.monogram.floatDurationSeconds || 7}s`);
    if (section.monogram.image) {
      const logo = document.createElement("img");
      logo.src = section.monogram.image;
      logo.alt = section.monogram.alt;
      monogram.append(logo);
      monogram.classList.add("has-logo");
    } else {
      monogram.setAttribute("role", "img");
      monogram.setAttribute("aria-label", section.monogram.alt);
      monogram.append(
        text("span", "monogram-initial", section.monogram.initials[0]),
        text("span", "monogram-ampersand", "&"),
        text("span", "monogram-initial", section.monogram.initials[1]),
      );
    }
    content.append(monogram);
    const instructions = text("h2", "visually-hidden", section.scratch.heading);
    instructions.id = "save-date-heading";
    content.append(instructions);
    const card = document.createElement("div");
    card.className = "scratch-card";
    const dateReveal = document.createElement("div");
    dateReveal.className = "date-reveal";
    dateReveal.setAttribute("aria-hidden", "true");
    const target = Date.parse(section.wedding.dateTime);
    const dateParts = new Intl.DateTimeFormat(section.wedding.locale, {
      day: "numeric", month: "long", year: "numeric", timeZone: section.wedding.timeZone,
    }).formatToParts(new Date(target));
    const ordinalRules = new Intl.PluralRules(section.wedding.locale, { type: "ordinal" });
    const ordinalSuffixes = { one: "st", two: "nd", few: "rd", other: "th" };
    const dateLabel = dateParts.map((part) => {
      if (part.type !== "day" || !section.wedding.ordinalDay || !section.wedding.locale.startsWith("en")) return part.value;
      return part.value + ordinalSuffixes[ordinalRules.select(Number(part.value))];
    }).join("");
    dateReveal.append(text("p", "date-label", section.wedding.label),
      text("p", "wedding-date", dateLabel), text("p", "date-location", section.wedding.location));
    const canvas = document.createElement("canvas");
    canvas.className = "scratch-cover";
    canvas.setAttribute("aria-hidden", "true");
    card.append(dateReveal, canvas);
    const revealButton = text("button", "reveal-button", section.scratch.revealButton);
    revealButton.type = "button";
    revealButton.setAttribute("aria-describedby", "save-date-heading");
    const status = text("p", "visually-hidden", "");
    status.setAttribute("role", "status");

    const countdown = document.createElement("div");
    countdown.className = "countdown";
    countdown.hidden = true;
    countdown.append(text("p", "countdown-heading", section.countdown.heading));
    const grid = document.createElement("div");
    grid.className = "countdown-grid";
    grid.setAttribute("role", "timer");
    grid.setAttribute("aria-live", "off");
    const values = section.countdown.labels.map((label) => {
      const unit = document.createElement("div");
      unit.className = "countdown-unit";
      const value = text("span", "countdown-value", "00");
      unit.append(value, text("span", "countdown-label", label));
      grid.append(unit);
      return value;
    });
    const countdownFooter = text("p", "countdown-footer", section.countdown.footer);
    countdownFooter.hidden = true;
    countdown.append(grid);
    content.append(card, revealButton, status, countdown);
    page.append(content, countdownFooter);

    let revealed = false;
    let timer;
    const tick = () => {
      const remaining = Math.max(0, target - Date.now());
      const parts = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24,
        Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
      values.forEach((value, index) => { value.textContent = String(parts[index]).padStart(2, "0"); });
      if (remaining === 0) {
        countdownFooter.textContent = section.countdown.completeMessage;
        clearInterval(timer);
      }
      return remaining;
    };
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      card.classList.add("is-revealed");
      page.classList.add("date-is-revealed");
      canvas.style.pointerEvents = "none";
      dateReveal.removeAttribute("aria-hidden");
      countdown.hidden = false;
      countdownFooter.hidden = false;
      // Preserve keyboard focus when using the alternative reveal control.
      if (document.activeElement === revealButton) {
        dateReveal.tabIndex = -1;
        dateReveal.focus({ preventScroll: true });
      }
      revealButton.hidden = true;
      status.textContent = `${dateLabel}, ${section.wedding.location}. The countdown has begun.`;
      if (tick() > 0) timer = setInterval(tick, 1000);
    };
    revealButton.addEventListener("click", reveal);

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      // The accessible reveal button also works when canvas is unavailable.
      canvas.classList.add("canvas-unavailable");
      return page;
    }
    let activePointer = null;
    let previous = null;
    const strokes = [];
    const eraseStroke = (from, to) => {
      const { width, height } = card.getBoundingClientRect();
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = section.scratch.brushSize * 2;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(from.x * width, from.y * height);
      context.lineTo(to.x * width, to.y * height);
      context.stroke();
      context.beginPath();
      context.arc(to.x * width, to.y * height, section.scratch.brushSize, 0, Math.PI * 2);
      context.fill();
    };
    const paintCover = () => {
      if (revealed) return;
      const { width, height } = card.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const gradient = context.createLinearGradient(0, 0, width, height);
      section.scratch.coverColours.forEach((colour, index, colours) => {
        gradient.addColorStop(index / (colours.length - 1), colour);
      });
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.fillStyle = section.scratch.coverTextColour;
      // Sparse gold specks give the scratch coating the reference's starry finish.
      for (let index = 0; index < 38; index++) {
        const x = ((index * 73 + 19) % 307) / 307 * width;
        const y = ((index * 37 + 11) % 139) / 139 * height;
        if (y > height * 0.31 && y < height * 0.72) continue;
        context.globalAlpha = 0.35 + (index % 4) * 0.13;
        context.beginPath();
        context.arc(x, y, index % 3 === 0 ? 1.6 : 0.9, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `500 ${width < 280 ? 15 : 17}px ${config.theme.bodyFont}`;
      context.fillText(`✦  ${section.scratch.coverLabel}  ✦`, width / 2, height * 0.43);
      context.fillStyle = section.scratch.coverSubtitleColour;
      context.font = `italic 16px ${config.theme.bodyFont}`;
      context.fillText(section.scratch.coverSubtitle, width / 2, height * 0.63);
      strokes.forEach(([from, to]) => eraseStroke(from, to));
    };
    const point = (event) => {
      const rect = card.getBoundingClientRect();
      return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
    };
    const checkCoverage = () => {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const step = Math.max(4, Math.round((window.devicePixelRatio || 1) * 5));
      let erased = 0;
      let samples = 0;
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          if (pixels[(y * canvas.width + x) * 4 + 3] < 100) erased++;
          samples++;
        }
      }
      if (samples && erased / samples >= section.scratch.revealThreshold) reveal();
    };
    canvas.addEventListener("pointerdown", (event) => {
      if (revealed || !event.isPrimary || event.button !== 0) return;
      event.preventDefault();
      activePointer = event.pointerId;
      canvas.setPointerCapture(activePointer);
      previous = point(event);
      strokes.push([previous, previous]);
      eraseStroke(previous, previous);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (event.pointerId !== activePointer || revealed) return;
      event.preventDefault();
      const next = point(event);
      strokes.push([previous, next]);
      eraseStroke(previous, next);
      previous = next;
    });
    const finishStroke = (event) => {
      if (event.pointerId !== activePointer) return;
      activePointer = null;
      previous = null;
      checkCoverage();
    };
    canvas.addEventListener("pointerup", finishStroke);
    canvas.addEventListener("pointercancel", finishStroke);
    const observer = new ResizeObserver(paintCover);
    observer.observe(card);
    document.fonts.ready.then(paintCover);
    return page;
  };

  const renderers = { invitation: renderInvitation, saveTheDate: renderSaveTheDate };
  for (const key of config.sectionOrder) {
    const section = config.sections[key];
    if (section?.enabled && renderers[key]) root.append(renderers[key](section));
  }

  const pages = [...root.querySelectorAll(".invitation-page")];
  pages.forEach((page, index) => {
    const next = pages[index + 1];
    if (!next || !experience.nextPageLabel) return;
    const link = text("a", "next-page-link", experience.nextPageLabel);
    link.href = `#${next.id}`;
    link.append(text("span", "next-page-arrow", "↓"));
    page.append(link);
    link.addEventListener("click", (event) => {
      // Native anchor navigation retains the section URL and keyboard access.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      next.tabIndex = -1;
      next.focus({ preventScroll: true });
    });
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let entranceObserver;
  if (experience.sectionTransitions && config.theme.entranceAnimation && !reducedMotion.matches && "IntersectionObserver" in window) {
    entranceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entranceObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    pages.forEach((page) => {
      page.classList.add("motion-ready");
      const content = page.querySelector(".invitation-content, .save-date-content");
      [...content.children].filter((child) => !child.classList.contains("visually-hidden") && !child.hidden)
        .forEach((child, index) => child.style.setProperty("--arrival-delay", `${index * 85}ms`));
      entranceObserver.observe(page);
    });
  }

  const petalSettings = experience.petals;
  if (petalSettings?.enabled && petalSettings.colours?.length) {
    const layer = document.createElement("div");
    layer.className = "petal-layer";
    layer.setAttribute("aria-hidden", "true");
    const count = Math.min(32, Math.max(0, Math.round(petalSettings.count)));
    for (let index = 0; index < count; index++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      const duration = petalSettings.durationSeconds + index % 7;
      const deep = index % 3 === 0 && petalSettings.deepColours?.length;
      const palette = deep ? petalSettings.deepColours : petalSettings.colours;
      petal.style.setProperty("--petal-colour", palette[Math.floor(index / 3) % palette.length]);
      petal.style.setProperty("--petal-opacity", deep ? petalSettings.deepOpacity : petalSettings.opacity);
      petal.style.setProperty("--petal-duration", `${duration}s`);
      petal.style.setProperty("--petal-delay", `${-((index * 7 + 3) % duration)}s`);
      petal.style.setProperty("--petal-drift", `${(index % 2 ? -1 : 1) * (25 + index % 5 * 12)}px`);
      petal.style.setProperty("--petal-size", `${7 + index % 4 * 2}px`);
      petal.style.left = `${3 + index * 91 / Math.max(1, count - 1)}%`;
      layer.append(petal);
    }
    document.body.append(layer);
  }
  const birdSettings = experience.birds;
  if (birdSettings?.enabled) {
    const layer = document.createElement("div");
    layer.className = "bird-layer";
    layer.setAttribute("aria-hidden", "true");
    layer.style.setProperty("--bird-colour", birdSettings.colour);
    layer.style.setProperty("--bird-opacity", birdSettings.opacity);
    const svgNamespace = "http://www.w3.org/2000/svg";
    const count = Math.min(8, Math.max(0, Math.round(birdSettings.count)));
    for (let index = 0; index < count; index++) {
      const bird = document.createElement("span");
      bird.className = `bird${index % 2 ? " bird-reverse" : ""}`;
      bird.style.top = `${15 + index * 13}%`;
      bird.style.setProperty("--bird-duration", `${birdSettings.durationSeconds + index * 3}s`);
      bird.style.setProperty("--bird-delay", `${-(index * 8 + 4)}s`);
      bird.style.setProperty("--bird-rise", `${index % 2 ? 25 : -35}px`);
      const silhouette = document.createElementNS(svgNamespace, "svg");
      silhouette.setAttribute("viewBox", "0 0 48 28");
      for (const [side, shape] of [["left", "M24 18 Q12 3 2 8 Q14 9 24 21Z"], ["right", "M24 18 Q36 3 46 8 Q34 9 24 21Z"]]) {
        const wing = document.createElementNS(svgNamespace, "path");
        wing.setAttribute("d", shape);
        wing.setAttribute("class", `bird-wing bird-wing-${side}`);
        silhouette.append(wing);
      }
      bird.append(silhouette);
      layer.append(bird);
    }
    document.body.append(layer);
  }
  const updateMotion = () => {
    document.body.classList.toggle("motion-paused", document.hidden);
    if (reducedMotion.matches) {
      entranceObserver?.disconnect();
      pages.forEach((page) => page.classList.add("is-visible"));
    }
  };
  document.addEventListener("visibilitychange", updateMotion);
  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();
})();
