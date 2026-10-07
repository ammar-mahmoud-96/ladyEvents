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
      let link = socialBar.querySelector('.lady-tiktok-link');
      if (!link) {
        const item = document.createElement('li');
        item.className = 'lady-tiktok-item';
        link = document.createElement('a');
        link.className = 'lady-tiktok-link';
        item.append(link);
        socialBar.append(item);
      }

      link.href = 'https://www.tiktok.com/@ladyevents.eg?_r=1&_t=ZS-9AL67Mlavcj';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'TikTok');
      link.replaceChildren();
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('width', '22');
      icon.setAttribute('height', '22');
      icon.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'currentColor');
      path.setAttribute('d', 'M16.6 5.8a4.6 4.6 0 0 1-1-2.8h-3.2v12a2.5 2.5 0 1 1-2.5-2.5c.4 0 .8.1 1.2.3V9.5a5.7 5.7 0 1 0 4.5 5.5V8.8a7.8 7.8 0 0 0 4.4 1.4V7a4.7 4.7 0 0 1-3.4-1.2Z');
      icon.append(path);
      link.append(icon);
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

  function createHeaderNavigation() {
    const header = document.getElementById('SITE_HEADER');
    if (!header || header.querySelector('.lady-header-nav')) {
      return;
    }

    const nav = document.createElement('nav');
    nav.className = 'lady-header-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    const routes = [
      ['Home', 'index.htm'],
      ['Visit', 'visit.html'],
      ['Exhibit', 'contact-us.html'],
      ['Events', 'event-list.html'],
      ['News', 'news.html'],
    ];

    for (const [label, route] of routes) {
      const link = document.createElement('a');
      link.href = `${prefix}${route}`;
      link.textContent = label;
      nav.append(link);
    }

    const headerContent = header.querySelector('.XgJ1FR');
    const logo = header.querySelector('#comp-js1gz4x1');
    if (headerContent && logo?.parentElement === headerContent.querySelector('[data-mesh-id="SITE_HEADERinlineContent-gridContainer"]')) {
      logo.after(nav);
    } else if (headerContent) {
      headerContent.append(nav);
    } else {
      header.append(nav);
    }
  }

  function observeHeaderNavigation() {
    const header = document.getElementById('SITE_HEADER');
    if (!header || header.dataset.ladyNavigationObserver) {
      return;
    }

    header.dataset.ladyNavigationObserver = 'true';
    new MutationObserver(createHeaderNavigation).observe(header, { childList: true, subtree: true });
  }

  function updateContactEmail() {
    for (const link of document.querySelectorAll('a[href^="mailto:info@cairofleamarket.com"]')) {
      link.href = 'mailto:ammarlbanna@gmail.com';
      replaceText(link, 'ammarlbanna@gmail.com');
    }
  }

  function updateContactPage() {
    if (!window.location.pathname.toLowerCase().endsWith('/contact-us.html')) {
      return;
    }

    const phone = document.querySelector('#comp-jizvjq0c1');
    if (phone) {
      const whatsapp = document.createElement('a');
      whatsapp.className = 'lady-whatsapp-contact';
      whatsapp.href = 'https://wa.me/201000850203';
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener noreferrer';
      whatsapp.setAttribute('aria-label', 'Message Lady Events on WhatsApp at +20 100 085 0203');
      whatsapp.title = 'Message Lady Events on WhatsApp';
      whatsapp.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.45 15.07L2 22l5.1-1.55A9.9 9.9 0 1 0 12.04 2Zm0 18.05a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.03.92.94-2.95-.2-.31a8.1 8.1 0 1 1 6.72 3.65Zm4.45-6.07c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg>';
      const socialBar = document.querySelector('#comp-jizvjq0c4 ul[aria-label="Social Bar"]');
      if (socialBar) {
        let item = socialBar.querySelector('.lady-whatsapp-item');
        if (!item) {
          item = document.createElement('li');
          item.className = 'lady-whatsapp-item';
          socialBar.append(item);
        }
        item.replaceChildren(whatsapp);
        phone.hidden = true;
      } else {
        phone.replaceChildren(whatsapp);
      }
    }

    const email = document.querySelector('#comp-jizvjq0c2 a[href^="mailto:"]');
    if (email) {
      email.href = 'mailto:royalfestival.eg@gmail.com';
      replaceText(email, 'royalfestival.eg@gmail.com');
    }

    const form = document.querySelector('#comp-kgam3qw4');
    if (!form || form.dataset.ladyMailReady) {
      return;
    }

    form.dataset.ladyMailReady = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const value = (selector) => form.querySelector(selector)?.value.trim() || '';
      const name = value('input[name="name-*"]');
      const senderEmail = value('input[name="email"]');
      const phoneNumber = value('input[name="phone"]');
      const address = value('input[name="address"]');
      const subject = value('input[name="subject"]') || 'Contact from Lady Events website';
      const message = value('textarea');
      const body = [
        `Name: ${name}`,
        `Email: ${senderEmail}`,
        `Phone: ${phoneNumber}`,
        `Address: ${address}`,
        '',
        message,
      ].join('\n');
      window.location.assign(
        `mailto:royalfestival.eg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      );
    }, true);
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
      ['Sell at Lady Events', 'contact-us.html'],
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

  function updateFooterExhibitNavigation() {
    const footer = document.getElementById('SITE_FOOTER');
    const nav = footer?.querySelector('nav[aria-label="Site"]');
    if (!footer) {
      return;
    }

    if (nav) {
      const item = [...nav.querySelectorAll('li')].find((candidate) => {
        const label = candidate.querySelector('[data-testid^="linkElement"]');
        return label?.textContent.trim().toLowerCase() === 'exhibit';
      });
      const trigger = item?.querySelector('[data-testid^="linkElement"]');
      if (trigger && (trigger.tagName !== 'A' || !trigger.href.endsWith('/contact-us.html'))) {
        const link = document.createElement('a');
        link.className = trigger.className;
        link.dataset.testid = trigger.dataset.testid || 'lady-footer-exhibit-link';
        link.href = `${prefix}contact-us.html`;
        link.textContent = 'EXHIBIT';
        link.setAttribute('aria-label', 'Contact Lady Events');
        trigger.replaceWith(link);
      }

      const submenu = item?.querySelector('ul');
      if (submenu) {
        hideElement(submenu);
      }
    }

    if (!footer.querySelector('.lady-powered-by')) {
      const copyright = [...footer.querySelectorAll('p')].find((paragraph) =>
        paragraph.textContent.trim().startsWith('©')
      );
      const attribution = document.createElement('a');
      attribution.className = 'lady-powered-by';
      attribution.href = 'https://egyptcode.online/';
      attribution.target = '_blank';
      attribution.rel = 'noopener noreferrer';
      attribution.textContent = 'Powered by Egypt Code';
      attribution.setAttribute('aria-label', 'Powered by Egypt Code (opens in a new tab)');
      if (copyright) {
        copyright.parentElement.classList.add('lady-footer-credits');
        copyright.after(attribution);
      } else {
        footer.append(attribution);
      }
    }

    if (!footer.dataset.ladyExhibitObserver) {
      footer.dataset.ladyExhibitObserver = 'true';
      new MutationObserver(updateFooterExhibitNavigation).observe(footer, {
        childList: true,
        subtree: true,
      });
    }
  }

  function updateSharedNavigation() {
    updateFooterExhibitNavigation();

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
    for (const link of document.querySelectorAll('main a[aria-label="EXHIBIT"], main a')) {
      if (link.getAttribute('aria-label')?.toLowerCase() === 'exhibit'
        || link.textContent.trim().toLowerCase() === 'exhibit') {
        link.href = `${prefix}contact-us.html`;
      }
    }

    const heroMedia = hero && hero.querySelector('#img_comp-mdn9ald91');
    if (heroMedia && !heroMedia.querySelector('video')) {
      const video = document.createElement('video');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      video.src = `${prefix}media/lady-events-banner.mp4?v=20261007b`;
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
    createHeaderNavigation();
    observeHeaderNavigation();
    updateContactEmail();
    updateContactPage();
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
