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

  const renderers = { invitation: renderInvitation };
  for (const key of config.sectionOrder) {
    const section = config.sections[key];
    if (section?.enabled && renderers[key]) root.append(renderers[key](section));
  }
})();
