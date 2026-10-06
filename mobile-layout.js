(() => {
  const container = document.getElementById('SITE_CONTAINER');
  const masterPage = document.getElementById('masterPage');
  const segments = window.location.pathname.split('/').filter(Boolean);
  const prefix = '../'.repeat(Math.max(0, segments.length - 1));

  function replaceText(element, text) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    if (!node) {
      element.append(document.createTextNode(text));
      return;
    }

    node.nodeValue = text;
    while ((node = walker.nextNode())) {
      node.nodeValue = '';
    }
  }

  function hideElement(element) {
    element.hidden = true;
    element.classList.add('lady-hidden');
  }

  function updateBrandAssets() {
    const logo = document.querySelector('#img_comp-js1gz4x1');
    if (logo) {
      logo.removeAttribute('srcset');
      logo.src = `${prefix}media/lady-events-logo.jpeg`;
      logo.alt = 'Lady Events logo';
    }

    for (const icon of document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')) {
      icon.href = `${prefix}media/lady-events-logo.jpeg`;
      if (icon.rel.includes('icon')) {
        icon.type = 'image/jpeg';
      }
    }
  }

  function updateSocialLinks() {
    for (const link of document.querySelectorAll('a[aria-label]')) {
      if (/facebook/i.test(link.getAttribute('aria-label'))) {
        hideElement(link.closest('li') || link);
      }
    }

    for (const link of document.querySelectorAll('a[aria-label="instagram"]')) {
      link.href = 'https://www.instagram.com/ladyevents.eg?stkn=MTYxbTY0MnRtaDdpaw%3D%3D&utm_source=qr';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    for (const socialBar of document.querySelectorAll('ul[aria-label="Social Bar"]')) {
      if (socialBar.querySelector('.lady-tiktok-link')) {
        continue;
      }

      const item = document.createElement('li');
      item.className = 'lady-tiktok-item';
      const link = document.createElement('a');
      link.className = 'lady-tiktok-link';
      link.href = 'https://www.tiktok.com/@ladyevents.eg?_r=1&_t=ZS-9AL67Mlavcj';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'TikTok');
      link.textContent = 'TikTok';
      item.append(link);
      socialBar.append(item);
    }
  }

  function updateExhibitNavigation() {
    const exhibit = document.querySelector('#SITE_HEADER #comp-jj4guwwv2 [data-testid="linkElement"]');
    if (!exhibit || exhibit.dataset.ladyNavigationReady) {
      return;
    }

    exhibit.dataset.ladyNavigationReady = 'true';
    exhibit.setAttribute('role', 'link');
    exhibit.setAttribute('aria-label', 'Contact Lady Events');
    exhibit.removeAttribute('aria-haspopup');
    exhibit.removeAttribute('aria-expanded');

    const navigateToCategories = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(`${prefix}contact-us.html`);
    };

    exhibit.addEventListener('click', navigateToCategories, true);
    exhibit.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        navigateToCategories(event);
      }
    }, true);
  }

  function updateHeaderEventsNavigation() {
    const list = document.querySelector('#SITE_HEADER nav[aria-label="Site"] ul');
    if (!list || list.querySelector('#lady-events-nav-item')) {
      return;
    }

    const template = list.querySelector('#comp-jj4guwwv3');
    if (!template) {
      return;
    }

    const item = template.cloneNode(true);
    item.id = 'lady-events-nav-item';
    item.dataset.index = '3';
    item.removeAttribute('data-data-id');
    template.dataset.index = '4';
    const link = item.querySelector('a[data-testid="linkElement"]');
    if (!link) {
      return;
    }

    link.href = `${prefix}event-list.html`;
    link.removeAttribute('aria-current');
    const label = link.querySelector('p');
    if (label) {
      label.id = 'lady-events-nav-label';
      replaceText(label, 'EVENTS');
    } else {
      replaceText(link, 'EVENTS');
    }

    const exhibitItem = list.querySelector('#comp-jj4guwwv2');
    if (exhibitItem) {
      exhibitItem.after(item);
    } else {
      template.before(item);
    }
  }

  function updateContactEmail() {
    for (const link of document.querySelectorAll('a[href^="mailto:info@cairofleamarket.com"]')) {
      link.href = 'mailto:ammarlbanna@gmail.com';
      replaceText(link, 'ammarlbanna@gmail.com');
    }
  }

  function removeFoundingCompanyDetails() {
    if (!window.location.pathname.toLowerCase().endsWith('/contact-us.html')) {
      return;
    }

    for (const id of ['comp-jj5l93zo', 'comp-jj5lb23i']) {
      const element = document.getElementById(id);
      if (element) {
        hideElement(element);
      }
    }
  }

  function updateSellerLinks() {
    const contactPage = `${prefix}contact-us.html`;
    const bannerLink = document.querySelector('#comp-mewg9nyt a[href$="book.html"]');
    const startNow = document.querySelector('#comp-mdn96ahs a[href$="book.html"]');

    if (bannerLink) {
      bannerLink.href = contactPage;
      bannerLink.setAttribute('aria-label', 'Contact us about selling at Lady Events');
    }

    if (startNow) {
      startNow.href = contactPage;
      startNow.setAttribute('aria-label', 'Contact us about selling at Lady Events');
    }
  }

  function updateDesignHeight() {
    if (container && masterPage) {
      container.style.setProperty(
        '--lady-design-height',
        `${masterPage.offsetHeight}px`
      );
    }
  }

  function createMobileMenu() {
    if (document.querySelector('.lady-mobile-menu-button')) {
      return;
    }

    const routes = [
      ['Home', 'index.htm'],
      ['Visit', 'visit.html'],
      ['Exhibit', 'contact-us.html'],
      ['Events', 'event-list.html'],
      ['Apply to sell', 'book.html'],
      ['News', 'news.html'],
      ['Contact', 'contact-us.html'],
    ];

    const button = document.createElement('button');
    button.className = 'lady-mobile-menu-button';
    button.type = 'button';
    button.textContent = 'Menu';
    button.setAttribute('aria-label', 'Open site menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'lady-mobile-menu');

    const nav = document.createElement('nav');
    nav.className = 'lady-mobile-menu';
    nav.id = 'lady-mobile-menu';
    nav.setAttribute('aria-label', 'Mobile site');
    nav.hidden = true;

    for (const [label, route] of routes) {
      const link = document.createElement('a');
      link.href = `${prefix}${route}`;
      link.textContent = label;
      nav.append(link);
    }

    button.addEventListener('click', () => {
      nav.hidden = !nav.hidden;
      button.setAttribute('aria-expanded', String(!nav.hidden));
      button.setAttribute(
        'aria-label',
        nav.hidden ? 'Open site menu' : 'Close site menu'
      );
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !nav.hidden) {
        nav.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open site menu');
        button.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.hidden && !nav.contains(event.target) && !button.contains(event.target)) {
        nav.hidden = true;
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open site menu');
      }
    });

    document.body.append(button, nav);
  }

  function updateSharedNavigation() {
    for (const link of document.querySelectorAll('a[href$="news.html"]')) {
      if (link.textContent.trim().toLowerCase() === 'newsletter') {
        replaceText(link, 'NEWS');
      }
    }

    for (const label of document.querySelectorAll('[id*="jj4guwwv3label"]')) {
      replaceText(label, 'NEWS');
    }

    for (const link of document.querySelectorAll('a[href$="account/my-account.html"]')) {
      const item = link.closest('li');
      hideElement(item || link);
    }

    for (const paragraph of document.querySelectorAll('p')) {
      if (paragraph.textContent.trim().toLowerCase().startsWith('tax registration')) {
        hideElement(paragraph);
      }
    }
  }

  function updateHomePage() {
    const path = window.location.pathname.toLowerCase();
    if (path !== '/' && !path.endsWith('/index.htm')) {
      return;
    }

    document.title = 'Lady Events - Where Every Event Tells A Story';

    const normalize = (element) => element.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
    const headings = [...document.querySelectorAll('h1, h2, h3')];
    const logo = document.querySelector('#img_comp-js1gz4x1');
    if (logo) {
      logo.alt = 'Lady Events logo';
    }

    const title = headings.find((element) => normalize(element) === 'lady events');
    if (title) {
      replaceText(title, 'LADY EVENTS');
    }

    const tagline = headings.find((element) => normalize(element) === 'where cairo comes to treasure hunt');
    if (tagline) {
      replaceText(tagline, 'WHERE EVERY EVENT TELLS A STORY');
    }

    const upcomingHeading = headings.find((element) => normalize(element) === 'upcoming events');
    if (upcomingHeading) {
      replaceText(upcomingHeading, 'UPCOMING EVENT');
    }

    const hero = document.querySelector('#comp-mdn9ald9');
    const heroMedia = hero && hero.querySelector('#img_comp-mdn9ald91');
    if (heroMedia && !heroMedia.querySelector('video')) {
      const video = document.createElement('video');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      video.src = `${prefix}media/lady-events-banner.mp4`;
      video.autoplay = !reduceMotion;
      video.controls = reduceMotion;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', 'Lady Events bazaar banner video');
      video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
      heroMedia.replaceChildren(video);
    }

    const sellerSection = document.querySelector('#comp-mdn96ahr');
    const sellerImage = sellerSection && sellerSection.querySelector('img');
    if (sellerSection && sellerImage) {
      sellerSection.classList.add('lady-sell-bazaar');
      sellerImage.removeAttribute('srcset');
      sellerImage.src = `${prefix}media/market-crowd.jpg`;
      sellerImage.alt = 'A lively Cairo Flea Market bazaar';
    }

    const eventWidget = document.querySelector('#wix-events-widget');
    if (eventWidget) {
      eventWidget.classList.add('lady-original-event-hidden');
      if (!document.querySelector('#lady-featured-event')) {
        const featuredEvent = document.createElement('div');
        featuredEvent.id = 'lady-featured-event';
        featuredEvent.className = 'lady-featured-event';
        featuredEvent.innerHTML = `
          <article aria-label="Upcoming event: BAZANOVA">
            <h3>BAZANOVA</h3>
            <p><strong>When:</strong> November 12, 13 &amp; 14, 2026</p>
            <p><strong>Where:</strong> Maxim Mall, New Cairo</p>
            <p><strong>Time:</strong> 11:00 AM - 11:00 PM all 3 days</p>
            <a href="https://maps.app.goo.gl/XsAViZgvozP79aBm6?g_st=iw" target="_blank" rel="noopener noreferrer">Get directions</a>
          </article>`;
        eventWidget.after(featuredEvent);
      }
    }
  }

  function updateVisitPage() {
    if (!window.location.pathname.toLowerCase().endsWith('/visit.html')) {
      return;
    }

    const paragraphs = [...document.querySelectorAll('p')];
    const when = paragraphs.find((paragraph) => paragraph.textContent.trim().startsWith('When:'));
    const where = paragraphs.find((paragraph) => paragraph.textContent.trim().startsWith('Where'));
    const location = paragraphs.find((paragraph) => paragraph.textContent.trim().startsWith('Location:'));
    const time = paragraphs.find((paragraph) => paragraph.textContent.trim().startsWith('Time:'));
    const ticket = paragraphs.find((paragraph) => paragraph.textContent.trim().startsWith('Ticket:'));

    if (when) replaceText(when, 'When: November 12, 13 & 14, 2026');
    if (where) replaceText(where, 'Where: Maxim Mall, New Cairo');
    if (location) {
      const mapLink = location.querySelector('a');
      if (mapLink) {
        mapLink.href = 'https://maps.app.goo.gl/XsAViZgvozP79aBm6?g_st=iw';
        mapLink.target = '_blank';
        mapLink.rel = 'noopener noreferrer';
        replaceText(mapLink, 'Open in Google Maps');
      }
    }
    if (time) replaceText(time, 'Time: 11:00 AM - 11:00 PM all 3 days');
    if (ticket) {
      hideElement(ticket);
    }

    const normalize = (element) => element.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
    const visitingHeading = [...document.querySelectorAll('h2')].find((element) => normalize(element).startsWith('visiting information'));
    if (!visitingHeading) {
      return;
    }
    replaceText(visitingHeading, 'Visiting Information');

    const section = visitingHeading.closest('section');
    if (!section) {
      return;
    }

    const sectionParagraphs = [...section.querySelectorAll('p')];
    const oldIntro = sectionParagraphs.find((paragraph) => paragraph.textContent.includes('held once a month'));
    const oldDescription = sectionParagraphs.find((paragraph) => paragraph.textContent.includes('Spend the day exploring'));
    if (oldIntro) replaceText(oldIntro, 'Get ready for BAZANOVA, coming this November.');
    if (oldDescription) {
      const oldList = section.querySelector('ul');
      const brandSlot = sectionParagraphs.find((paragraph) => !paragraph.textContent.trim());
      if (brandSlot) {
        replaceText(brandSlot, 'We’ve gathered many amazing brands for you, bringing everything you need together in one place. And for this edition, we’re introducing our Food Section, featuring HUMHUM and other amazing food brands.');
      }
      if (oldList) hideElement(oldList);
      replaceText(oldDescription, 'Come spend the day with us, shop, discover, eat, and enjoy a day filled with fun, excitement, and great experiences. See you at BAZANOVA this November.');
    }
  }

  function updateEventDetails() {
    const oldEventSlug = 'cfm-autumn-edition-17-oct-2026-ghurnata-community-space-heliopolis';
    const contactPage = `${prefix}contact-us.html`;
    const eventTitles = document.querySelectorAll('[data-hook="title"], [data-hook="event-title"]');

    for (const title of eventTitles) {
      const eventLink = title.closest('a');
      const isAutumnEvent = title.textContent.includes('CFM Autumn Edition')
        || eventLink?.href.includes(oldEventSlug);
      if (!isAutumnEvent) {
        continue;
      }

      replaceText(title, 'BAZANOVA');
      const eventCard = title.closest('.tB8uhE');
      const shortDate = eventCard?.querySelector('[data-hook="short-date"]');
      const shortLocation = eventCard?.querySelector('[data-hook="short-location"]');
      const eventImage = eventCard?.querySelector('img');
      if (eventImage) eventImage.alt = 'BAZANOVA at Maxim Mall, New Cairo';
      if (shortDate) replaceText(shortDate, 'November 12, 13 & 14, 2026');
      if (shortLocation) replaceText(shortLocation, 'Maxim Mall, New Cairo');
      if (eventCard && !eventCard.querySelector('[data-hook="lady-event-time"]')) {
        const time = document.createElement('div');
        time.dataset.hook = 'lady-event-time';
        time.className = shortDate?.className || '';
        time.textContent = '11:00 AM - 11:00 PM all 3 days';
        shortLocation?.after(time);
      }
    }

    for (const rsvp of document.querySelectorAll('[data-hook="ev-rsvp-button"]')) {
      if (rsvp.href.includes(oldEventSlug)) {
        rsvp.href = contactPage;
        rsvp.removeAttribute('data-anchor');
      }
    }

    const details = document.querySelector('#event-details');
    if (!details) {
      return;
    }

    const title = details.querySelector('[data-hook="event-title"]');
    const shortDate = details.querySelector('[data-hook="event-short-date"]');
    const shortLocation = details.querySelector('[data-hook="event-short-location"]');
    const fullDate = details.querySelector('[data-hook="event-full-date"]');
    const fullLocation = details.querySelector('[data-hook="event-full-location"]');
    if (title) replaceText(title, 'BAZANOVA');
    if (shortDate) replaceText(shortDate, 'November 12, 13 & 14, 2026');
    if (shortLocation) replaceText(shortLocation, 'Maxim Mall, New Cairo');
    if (fullDate) replaceText(fullDate, 'When: November 12, 13 & 14, 2026');
    if (fullLocation) replaceText(fullLocation, 'Where: Maxim Mall, New Cairo');
    if (fullDate && !details.querySelector('[data-hook="lady-event-time"]')) {
      const time = document.createElement('p');
      time.dataset.hook = 'lady-event-time';
      time.className = fullDate.className;
      time.textContent = 'Time: 11:00 AM - 11:00 PM all 3 days';
      (fullLocation || fullDate).after(time);
    }

    const aboutSection = details.querySelector('[data-hook="about-section"]');
    if (aboutSection) hideElement(aboutSection);

    for (const rsvp of details.querySelectorAll('[data-hook="rsvp-button"]')) {
      if (rsvp.dataset.ladyContactReady) continue;
      rsvp.dataset.ladyContactReady = 'true';
      rsvp.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.assign(contactPage);
      }, true);
    }

    document.title = 'BAZANOVA | Lady Events';
    details.setAttribute('aria-label', 'BAZANOVA');
    for (const meta of document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]')) {
      meta.content = 'BAZANOVA | Lady Events';
    }
    for (const meta of document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')) {
      meta.content = 'BAZANOVA, November 12, 13 & 14, 2026 at Maxim Mall, New Cairo. 11:00 AM - 11:00 PM all 3 days.';
    }
  }

  function updateNewsPage() {
    if (!window.location.pathname.toLowerCase().endsWith('/news.html')) {
      return;
    }

    document.title = 'News | Lady Events';
    for (const paragraph of document.querySelectorAll('p')) {
      const text = paragraph.textContent.trim().toLowerCase();
      if (text === 'subscribe in our newsletter') {
        replaceText(paragraph, 'News');
      } else if (text === "so you'll never miss an update") {
        replaceText(paragraph, 'Sign up to receive email reminders about our upcoming events and bazaars.');
      }
    }
  }

  function updateSiteContent() {
    updateBrandAssets();
    updateSharedNavigation();
    updateSocialLinks();
    updateExhibitNavigation();
    updateHeaderEventsNavigation();
    updateContactEmail();
    removeFoundingCompanyDetails();
    updateSellerLinks();
    updateHomePage();
    updateVisitPage();
    updateEventDetails();
    updateNewsPage();
  }

  updateDesignHeight();
  createMobileMenu();
  updateSiteContent();
  window.addEventListener('load', updateSiteContent, { once: true });

  if ('ResizeObserver' in window && masterPage) {
    new ResizeObserver(updateDesignHeight).observe(masterPage);
  }
})();
