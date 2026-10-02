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

  const formatDate = (date, locale, timeZone, ordinalDay = true, format = {}) => {
    const parts = new Intl.DateTimeFormat(locale, {
      day: "numeric", month: format.month || "long", year: "numeric", timeZone,
    }).formatToParts(date);
    const rules = new Intl.PluralRules(locale, { type: "ordinal" });
    const suffixes = { one: "st", two: "nd", few: "rd", other: "th" };
    const values = parts.map((part) => ({
      ...part,
      value: part.type === "day" && ordinalDay && locale.startsWith("en")
        ? part.value + suffixes[rules.select(Number(part.value))] : part.value,
    }));
    if (format.commaBeforeYear) {
      const value = (type) => values.find((part) => part.type === type).value;
      return `${value("day")} ${value("month")}, ${value("year")}`;
    }
    return values.map((part) => part.value).join("");
  };

  const renderCover = (section) => {
    const cover = document.createElement("section");
    cover.id = "cover";
    cover.className = "cover-page";
    cover.classList.toggle("has-seal-pulse", section.sealPulse?.enabled === true);
    cover.style.setProperty("--seal-pulse-duration", `${Math.max(1.5, section.sealPulse?.durationSeconds || 3.2)}s`);
    cover.style.setProperty("--seal-pulse-scale", Math.max(1, Math.min(1.06, section.sealPulse?.scale || 1.025)));
    cover.setAttribute("aria-labelledby", "cover-heading");
    cover.style.setProperty("--cover-image-position", section.backgroundPosition || "center bottom");
    cover.style.setProperty("--cover-top-padding", section.layout?.topPadding || "12svh");
    cover.style.setProperty("--cover-logo-size", section.layout?.logoSize || "140px");
    cover.style.setProperty("--cover-hashtag-size", section.layout?.hashtagSize || "26px");
    cover.style.setProperty("--cover-hashtag-font", section.hashtagFont || "Georgia, serif");
    cover.style.setProperty("--cover-hashtag-style", section.hashtagFontStyle || "italic");
    cover.style.setProperty("--feather-landing-angle", `${section.featherFlight?.landingAngle ?? 35}deg`);
    cover.style.setProperty("--feather-landing-scale", Math.max(0.4, Math.min(1.5, section.featherFlight?.landingScale ?? 1)));
    cover.style.setProperty("--cover-seal-size", section.layout?.sealSize || "84px");
    cover.style.setProperty("--cover-seal-logo-scale", section.layout?.sealLogoScale ?? 1.22);
    cover.style.setProperty("--cover-seal-bottom", section.layout?.sealBottom || "5svh");
    cover.style.setProperty("--cover-opening-duration", `${section.openingDurationMilliseconds || 850}ms`);
    root.style.setProperty("--cover-opening-duration", `${section.openingDurationMilliseconds || 850}ms`);
    const artwork = document.createElement("img");
    artwork.className = "cover-artwork";
    artwork.src = section.background;
    artwork.alt = section.imageAlt || "";
    artwork.fetchPriority = "high";
    const content = document.createElement("div");
    content.className = "cover-content";
    const heading = text("h1", "visually-hidden", section.heading);
    heading.id = "cover-heading";
    const logo = document.createElement("img");
    logo.className = "cover-monogram";
    logo.src = section.logo;
    logo.alt = section.logoAlt || "";
    content.append(heading, logo, text("p", "cover-hashtag", section.hashtag));
    const seal = document.createElement("button");
    seal.className = "cover-seal";
    seal.type = "button";
    seal.disabled = true;
    seal.setAttribute("aria-label", section.openLabel);
    const feather = document.createElement("img");
    feather.className = "cover-feather";
    feather.src = section.feather;
    feather.alt = "";
    const sealLogo = document.createElement("img");
    sealLogo.className = "cover-seal-logo";
    sealLogo.src = section.sealLogo || section.logo;
    sealLogo.alt = "";
    seal.append(sealLogo, feather);
    const hint = text("p", "cover-hint", section.waitingHint || section.hint);
    hint.id = "cover-opening-hint";
    hint.setAttribute("role", "status");
    seal.setAttribute("aria-describedby", hint.id);
    cover.append(artwork);
    if (section.envelopeFolds) {
      const folds = document.createElement("div");
      folds.className = "cover-folds";
      folds.setAttribute("aria-hidden", "true");
      folds.append(text("span", "cover-fold cover-fold-left", ""),
        text("span", "cover-fold cover-fold-right", ""), text("span", "cover-fold cover-fold-bottom", ""));
      cover.append(folds);
    }
    cover.append(content, seal, hint);
    return cover;
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
    if (section.hashtag?.enabled) {
      const coverSettings = config.sections.cover || {};
      const hashtag = text("p", "save-date-hashtag", section.hashtag.text ?? coverSettings.hashtag);
      hashtag.style.setProperty("--hashtag-font", section.hashtag.font ?? coverSettings.hashtagFont ?? "Georgia, serif");
      hashtag.style.setProperty("--hashtag-style", section.hashtag.style ?? coverSettings.hashtagFontStyle ?? "italic");
      hashtag.style.setProperty("--hashtag-size", section.hashtag.size ?? coverSettings.layout?.hashtagSize ?? "20px");
      hashtag.style.setProperty("--hashtag-gap-above", section.hashtag.gapAbove || "4px");
      hashtag.style.setProperty("--hashtag-gap-below", section.hashtag.gapBelow || "20px");
      page.classList.add("has-hashtag");
      content.append(hashtag);
    }
    const instructions = text("h2", "visually-hidden", section.scratch.heading);
    instructions.id = "save-date-heading";
    content.append(instructions);
    const card = document.createElement("div");
    card.className = "scratch-card";
    const dateReveal = document.createElement("div");
    dateReveal.className = "date-reveal";
    dateReveal.setAttribute("aria-hidden", "true");
    const target = Date.parse(section.wedding.dateTime);
    const dateLabel = formatDate(new Date(target), section.wedding.locale, section.wedding.timeZone, section.wedding.ordinalDay);
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
    const celebrate = () => {
      const settings = section.celebration;
      if (!settings?.enabled || !settings.colours?.length ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches || !Element.prototype.animate) return;
      const layer = document.createElement("div");
      layer.className = "reveal-celebration";
      layer.setAttribute("aria-hidden", "true");
      const pageRect = page.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const count = Math.min(80, Math.max(0, Math.round(settings.count || 36)));
      const duration = Math.min(4500, Math.max(1000, settings.durationMilliseconds || 4200));
      page.append(layer);
      const animations = [];
      for (let index = 0; index < count; index++) {
        // Scatter the starting points for an airy shower rather than two piles.
        const direction = index % 2 ? -1 : 1;
        const drift = direction * (12 + index % 5 * 6);
        const turn = direction * (35 + index % 5 * 18);
        const piece = document.createElement("span");
        piece.className = "celebration-piece";
        piece.style.left = `${cardRect.left - pageRect.left + cardRect.width * (0.08 + ((index * 37) % 101) / 100 * 0.84)}px`;
        piece.style.top = `${cardRect.top - pageRect.top - 58 + index % 4 * 12}px`;
        piece.style.setProperty("--celebration-colour", settings.colours[index % settings.colours.length]);
        piece.style.setProperty("--celebration-size", `${8 + index % 3 * 2}px`);
        if (index % 6 === 0) piece.classList.add("is-glint");
        else if (index % 3 === 0) piece.classList.add("is-soft-petal");
        layer.append(piece);
        const animation = piece.animate([
          { transform: `translate(-50%, -50%) rotate(${-turn}deg) rotateY(15deg)`, opacity: 0, offset: 0 },
          { transform: `translate(${drift * 0.3}px, 18px) rotate(${turn * 0.15}deg) rotateY(40deg)`, opacity: 0.9, offset: 0.15 },
          { transform: `translate(${drift}px, 72px) rotate(${turn}deg) rotateY(-25deg)`, opacity: 0.9, offset: 0.48 },
          { transform: `translate(${-drift * 0.3}px, 130px) rotate(${turn * 1.4}deg) rotateY(45deg)`, opacity: 0.7, offset: 0.78 },
          { transform: `translate(${drift * 0.6}px, ${175 + index % 3 * 15}px) rotate(${turn * 1.7}deg) rotateY(-15deg)`, opacity: 0, offset: 1 },
        ], { duration: duration + index % 4 * 110, delay: 180 + index % 8 * 70, easing: "linear", fill: "both" });
        animations.push(animation.finished);
      }
      Promise.allSettled(animations).then(() => layer.remove());
    };
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
      celebrate();
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

  const renderEvents = (section) => {
    const icon = (kind) => {
      const namespace = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(namespace, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "1.5");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS(namespace, "path");
      path.setAttribute("d", {
        calendar: "M7 3v4m10-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z",
        clock: "M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        directions: "m12 2 10 10-10 10L2 12 10 2Zm-5 12v-4h9m-3-3 3 3-3 3",
      }[kind]);
      svg.append(path);
      return svg;
    };
    const page = document.createElement("section");
    page.id = "events";
    page.className = "invitation-page events-page";
    page.setAttribute("aria-labelledby", "events-heading");
    for (const [key, property] of Object.entries(themeProperties)) {
      if (section[key] !== undefined) page.style.setProperty(property, section[key]);
    }
    const backdrop = document.createElement("div");
    backdrop.className = "events-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    const background = document.createElement("img");
    background.className = "invitation-background";
    background.src = section.background;
    background.alt = "";
    background.loading = "lazy";
    backdrop.append(background);
    page.append(backdrop);

    const content = document.createElement("div");
    content.className = "events-content";
    const header = document.createElement("header");
    header.className = "events-header";
    const heading = text("h2", "events-heading", section.heading);
    heading.id = "events-heading";
    header.append(heading, ornament());
    if (section.timeNote) header.append(text("p", "events-time-note", section.timeNote));
    content.append(header);
    const clock = new Intl.DateTimeFormat(section.locale, {
      hour: "numeric", minute: "2-digit", hour12: true, timeZone: section.timeZone,
    });
    const cards = document.createElement("div");
    cards.className = "event-list";
    content.append(cards);
    section.eventOrder.forEach((key) => {
      const event = section.items[key];
      if (!event || event.enabled === false) return;
      const venue = section.venues[event.venue];
      const start = new Date(event.dateTime);
      const dateLabel = formatDate(start, section.locale, section.timeZone, true, section.dateFormat);
      const card = document.createElement("article");
      card.className = "event-card";
      card.dataset.event = key;
      card.setAttribute("aria-labelledby", `event-${key}-title`);
      const visual = document.createElement("div");
      visual.className = "event-visual";
      if (event.image) {
        const frame = document.createElement("div");
        frame.className = "event-image-frame";
        const picture = document.createElement("img");
        picture.src = event.image;
        picture.alt = event.imageAlt || "";
        picture.width = 1080;
        picture.height = 1350;
        picture.loading = "lazy";
        picture.decoding = "async";
        picture.style.objectPosition = event.imagePosition || "center 65%";
        picture.style.objectFit = event.imageFit || "cover";
        frame.append(picture);
        visual.append(frame);
      }
      const details = document.createElement("div");
      details.className = "event-details";
      const top = document.createElement("div");
      top.className = "event-top";
      const title = text("h3", "event-title", event.title);
      if (event.title.length > 28) title.classList.add("event-title-long");
      title.id = `event-${key}-title`;
      const description = document.createElement("div");
      description.className = "event-description";
      description.append(title);
      const schedule = document.createElement("div");
      schedule.className = "event-schedule";
      const dateRow = document.createElement("div");
      dateRow.className = "event-schedule-row";
      const date = text("time", "event-date", dateLabel);
      date.dateTime = event.dateTime;
      dateRow.append(icon("calendar"), date);
      const timeRow = document.createElement("div");
      timeRow.className = "event-schedule-row";
      const time = text("time", "event-time", clock.format(start).toUpperCase().replace(":00", "") + (event.onwards ? ` ${section.onwardsLabel}` : ""));
      time.dateTime = event.dateTime;
      timeRow.append(icon("clock"), time);
      schedule.append(dateRow, timeRow);
      top.append(description, schedule);
      details.append(top);
      if (venue) {
        const location = document.createElement("div");
        location.className = "event-location-row";
        const address = document.createElement("div");
        address.className = "event-address-bar";
        address.append(text("p", "event-venue", venue.name), text("p", "event-address", venue.address));
        location.append(address);
        try {
          const mapUrl = new URL(venue.mapUrl);
          if (["https:", "http:"].includes(mapUrl.protocol)) {
            const link = document.createElement("a");
            link.className = "event-map-link";
            link.href = mapUrl.href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.setAttribute("aria-label", `${section.mapLabel}: ${venue.name}, ${event.ceremony}`);
            link.append(icon("directions"), text("span", "", section.mapLabel));
            location.append(link);
          }
        } catch { /* Invalid optional map links are omitted. */ }
        details.append(location);
      }
      card.append(visual, details);
      cards.append(card);
    });
    const previous = config.sectionOrder.slice(0, config.sectionOrder.indexOf("events")).reverse()
      .find((key) => config.sections[key]?.enabled && ["invitation", "saveTheDate"].includes(key));
    if (previous && section.backLinkLabel) {
      const link = text("a", "events-back-link", section.backLinkLabel);
      link.href = previous === "saveTheDate" ? "#save-the-date" : "#welcome";
      content.append(ornament(), link);
    }
    page.append(content);
    return page;
  };

  const renderers = { cover: renderCover, invitation: renderInvitation, saveTheDate: renderSaveTheDate, events: renderEvents };
  for (const key of config.sectionOrder) {
    const section = config.sections[key];
    if (section?.enabled && renderers[key]) {
      const page = renderers[key](section);
      page.dataset.section = key;
      root.append(page);
    }
  }

  const pages = [...root.querySelectorAll(".invitation-page")];
  pages.forEach((page, index) => {
    const next = pages[index + 1];
    const key = page.dataset.section;
    const label = config.sections[key]?.nextPageLabel ?? experience.nextPageLabel;
    if (!next || !label) return;
    const link = text("a", "next-page-link", label);
    link.style.setProperty("--next-page-bottom", config.sections[key]?.nextPageBottom || "26px");
    link.href = `#${next.id}`;
    link.append(text("span", "next-page-arrow", "↓"));
    page.classList.add("has-next-page");
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
    }, { threshold: 0.02 });
    pages.forEach((page) => {
      page.classList.add("motion-ready");
      const content = page.querySelector(".invitation-content, .save-date-content, .events-content");
      [...content.children].filter((child) => !child.classList.contains("visually-hidden") && !child.hidden)
        .forEach((child, index) => child.style.setProperty("--arrival-delay", `${index * 85}ms`));
      entranceObserver.observe(page);
    });
    root.querySelectorAll(".event-card").forEach((element) => {
      element.classList.add("motion-ready");
      entranceObserver.observe(element);
    });
  }

  const mountMotionLayer = (layer, settings) => {
    const sections = settings.sections || ["invitation", "saveTheDate"];
    pages.filter((page) => sections.includes(page.dataset.section))
      .forEach((page) => page.append(layer.cloneNode(true)));
  };
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
    mountMotionLayer(layer, petalSettings);
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
      bird.style.setProperty("--bird-rise", `${index % 2 ? 65 + index * 8 : -75 - index * 8}px`);
      bird.style.setProperty("--bird-dip", `${index % 2 ? -60 - index * 6 : 45 + index * 6}px`);
      bird.style.setProperty("--bird-bank", `${index % 2 ? -10 : 10}deg`);
      bird.style.setProperty("--wing-duration", `${600 + index % 3 * 90}ms`);
      const silhouette = document.createElementNS(svgNamespace, "svg");
      silhouette.setAttribute("viewBox", "0 0 48 28");
      for (const [side, shape] of [["left", "M24 18 Q12 3 2 8 Q14 9 24 21Z"], ["right", "M24 18 Q36 3 46 8 Q34 9 24 21Z"]]) {
        const wing = document.createElementNS(svgNamespace, "path");
        wing.setAttribute("d", shape);
        wing.setAttribute("class", `bird-wing bird-wing-${side}`);
        silhouette.append(wing);
      }
      const body = document.createElementNS(svgNamespace, "path");
      body.setAttribute("d", "M24 14 C21 16 22 21 24 24 L21 27 L24 26 L27 27 L24 24 C26 21 27 16 24 14Z");
      silhouette.append(body);
      bird.append(silhouette);
      layer.append(bird);
    }
    mountMotionLayer(layer, birdSettings);
  }
  const updateMotion = () => {
    document.body.classList.toggle("motion-paused", document.hidden);
    if (reducedMotion.matches) {
      entranceObserver?.disconnect();
      root.querySelectorAll(".motion-ready").forEach((element) => element.classList.add("is-visible"));
    }
  };
  document.addEventListener("visibilitychange", updateMotion);
  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();

  const cover = root.querySelector(".cover-page");
  if (cover) {
    const showCover = pages.length > 0 && (!location.hash || location.hash === "#cover");
    cover.hidden = !showCover;
    if (showCover) {
      document.body.classList.add("cover-is-closed");
      pages.forEach((page) => {
        page.inert = true;
        page.setAttribute("aria-hidden", "true");
      });
      let opening = false;
      let landed = false;
      let landingAnimation;
      const seal = cover.querySelector(".cover-seal");
      const feather = cover.querySelector(".cover-feather");
      const finishLanding = () => {
        if (opening || cover.hidden || landed) return;
        landed = true;
        cover.classList.add("feather-has-landed");
        seal.disabled = false;
        cover.querySelector(".cover-hint").textContent = config.sections.cover.hint || "";
      };
      const landFeather = async () => {
        await Promise.allSettled([feather.decode(), cover.querySelector(".cover-artwork").decode()]);
        if (opening || cover.hidden || landed) return;
        if (reducedMotion.matches || !feather.animate) {
          finishLanding();
          return;
        }
        cover.classList.add("feather-is-arriving");
        const height = cover.clientHeight;
        const width = cover.clientWidth;
        const flight = config.sections.cover.featherFlight;
        const startScale = Math.max(1, Math.min(4, flight.startScale ?? 2.7));
        const landingScale = Number(cover.style.getPropertyValue("--feather-landing-scale"));
        const angle = flight.landingAngle ?? 35;
        const pose = (x, y, rotation, scale = 1) =>
          `translate(${width * x}px, ${height * y}px) rotate(${rotation}deg) scale(${scale})`;
        const curves = flight.path;
        const frames = Array.from({ length: 91 }, (_, index) => {
          const progress = index / 90;
          const segment = Math.min(curves.length - 1, Math.floor(progress * curves.length));
          const t = progress * curves.length - segment;
          const [a, b, c, d] = curves[segment];
          const coordinate = (axis) => (1 - t) ** 3 * a[axis]
            + 3 * (1 - t) ** 2 * t * b[axis] + 3 * (1 - t) * t ** 2 * c[axis] + t ** 3 * d[axis];
          return {
            transform: pose(coordinate(0), coordinate(1), -20 + (angle + 20) * progress
              + Math.sin(progress * Math.PI * 2) * 18, startScale + (landingScale - startScale) * progress),
            opacity: Math.min(1, progress * 12),
            offset: progress,
          };
        });
        landingAnimation = feather.animate(frames, {
          duration: Math.max(0, Math.min(8000, config.sections.cover.featherLandingMilliseconds ?? 3600)),
          easing: "ease-in-out",
          fill: "both",
        });
        await landingAnimation.finished.catch(() => {});
        finishLanding();
        landingAnimation.cancel();
      };
      reducedMotion.addEventListener("change", () => {
        if (reducedMotion.matches) {
          landingAnimation?.cancel();
          finishLanding();
        }
      });
      landFeather();
      const openCover = async (immediate = false, destination = pages[0]) => {
        if (opening || cover.hidden || (!immediate && !landed)) return;
        opening = true;
        landingAnimation?.cancel();
        seal.disabled = true;
        cover.classList.add("is-opening");
        document.body.classList.add("cover-is-opening");
        const duration = Math.max(0, Math.min(1500, config.sections.cover.openingDurationMilliseconds || 850));
        if (!immediate && !reducedMotion.matches && cover.animate) {
          const fade = cover.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "forwards",
          });
          await fade.finished.catch(() => {});
        }
        cover.hidden = true;
        document.body.classList.remove("cover-is-closed");
        document.body.classList.remove("cover-is-opening");
        pages.forEach((page) => {
          page.inert = false;
          page.removeAttribute("aria-hidden");
        });
        destination.scrollIntoView({ behavior: "instant", block: "start" });
        destination.tabIndex = -1;
        destination.focus({ preventScroll: true });
        history.replaceState(null, "", `#${destination.id}`);
      };
      seal.addEventListener("click", () => openCover());
      window.addEventListener("hashchange", () => {
        const destination = pages.find((page) => `#${page.id}` === location.hash);
        if (destination) openCover(true, destination);
      });
    }
  }
})();
