/* =========================================================
   HALCYON ESTATES — shared UI (header, footer, menu, modal,
   reveals, counters, favourites, forms)
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  window.$ = $; window.$$ = $$;

  /* ---------- Icon sprite ---------- */
  const ICONS = {
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    bed: '<path d="M3 18V7M3 13h18v5M21 18v-5a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10" r="1.6"/>',
    bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 3.6-1.2M6 19l-1 2M18 19l1 2"/>',
    area: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2"/><circle cx="7.5" cy="13" r=".8"/><circle cx="16.5" cy="13" r=".8"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 6l9 7 9-7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    heart: '<path d="M12 20s-7.5-4.6-9.2-9.4A4.9 4.9 0 0 1 12 6.5a4.9 4.9 0 0 1 9.2 4.1C19.5 15.4 12 20 12 20z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sunset: '<path d="M17 18a5 5 0 0 0-10 0M12 3v6M4.2 10.2l1.4 1.4M2 18h2M20 18h2M18.4 11.6l1.4-1.4M23 22H1M8 6l4-3 4 3"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    home: '<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-6h4v6"/>',
    pool: '<path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8M8 12h8"/>',
    gym: '<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>',
    spa: '<path d="M12 20c-4 0-8-3-8-8 3 0 6 1.5 8 4 2-2.5 5-4 8-4 0 5-4 8-8 8zM12 16c-1.5-2-1.5-6 0-10 1.5 4 1.5 8 0 10z"/>',
    concierge: '<path d="M4 17h16M5 17a7 7 0 0 1 14 0M12 8V6M10 6h4M3 20h18"/>',
    wine: '<path d="M8 3h8l-.5 6a3.5 3.5 0 0 1-7 0zM12 12.5V20M8.5 20h7"/>',
    leaf: '<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15zM5 19l7-7"/>',
    building: '<path d="M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    quote: '<path d="M5 18c2-1 4-3.5 4-7H5V6h5v5c0 4-2 7-5 7zM14 18c2-1 4-3.5 4-7h-4V6h5v5c0 4-2 7-5 7z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    expand: '<path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
    linkedin: '<path d="M4 9h3.5v11H4zM5.7 4.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h3.3v1.6c.5-.9 1.7-1.9 3.6-1.9 3.7 0 4.1 2.4 4.1 5.5V20h-3.5v-5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H10z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9v6l5-3z"/>',
    whatsapp: '<path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-1.8-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-1.8z"/>',
  };
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('')}</svg>`;
  document.body.insertAdjacentHTML('afterbegin', sprite);
  const icon = (n, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  window.icon = icon;

  const page = document.body.dataset.page || '';

  /* ---------- Header ---------- */
  const navItems = [
    ['index.html', 'Home', 'home'],
    ['properties.html', 'Properties', 'properties'],
    ['index.html#tower', 'The Tower', 'tower'],
    ['index.html#amenities', 'Amenities', 'amenities'],
    ['about.html', 'About', 'about'],
    ['contact.html', 'Contact', 'contact'],
  ];
  const header = $('[data-include="header"]');
  if (header) {
    header.outerHTML = `
    <header class="site-header" id="header">
      <div class="wrap">
        <div class="utility">
          <a href="tel:${SITE.phone.replace(/[^+\d]/g, '')}">${icon('phone')} ${SITE.phone}</a>
          <a href="mailto:${SITE.email}">${icon('mail')} ${SITE.email}</a>
          <a href="contact.html">${icon('pin')} Visit our gallery</a>
        </div>
        <nav class="nav" aria-label="Primary">
          <a href="index.html" class="brand" aria-label="${SITE.name} ${SITE.tagline} home">
            <span class="brand__name">${SITE.name}</span><span class="brand__sub">${SITE.tagline}</span>
          </a>
          <ul class="nav__links">
            ${navItems.slice(1).map(([h, l, k]) => `<li><a href="${h}" class="${k === page ? 'is-active' : ''}">${l}</a></li>`).join('')}
          </ul>
          <div class="nav__actions">
            <button class="btn btn--sm" data-book>Book a viewing</button>
            <button class="burger" aria-label="Open menu" data-menu-open><span></span></button>
          </div>
        </nav>
      </div>
    </header>
    <div class="menu" id="menu" aria-hidden="true">
      <button class="menu__close" aria-label="Close menu" data-menu-close>${icon('close')}</button>
      <div class="menu__nav">
        <ol>${navItems.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ol>
      </div>
      <aside class="menu__aside">
        <img src="${IMG('1600607687939-ce8a6c25118c', 1200)}" alt="" loading="lazy">
        <div class="menu__contact">
          <strong>Private viewings, by appointment.</strong>
          <a href="tel:${SITE.phone.replace(/[^+\d]/g, '')}">${SITE.phone}</a>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
          <span>${SITE.address}</span>
        </div>
      </aside>
    </div>`;
  }

  /* ---------- Footer ---------- */
  const footer = $('[data-include="footer"]');
  if (footer) {
    footer.outerHTML = `
    <footer class="site-footer on-dark">
      <div class="wrap">
        <div class="footer__top">
          <div class="footer__brand">
            <a href="index.html" class="brand"><span class="brand__name">${SITE.name}</span><span class="brand__sub">${SITE.tagline}</span></a>
            <p>An independent agency for exceptional homes — buying, selling, renting and investing in the city's finest addresses since 2004.</p>
            <div class="socials">
              <a href="#" aria-label="Instagram">${icon('instagram')}</a>
              <a href="#" aria-label="LinkedIn">${icon('linkedin')}</a>
              <a href="#" aria-label="YouTube">${icon('youtube')}</a>
              <a href="#" aria-label="WhatsApp">${icon('whatsapp')}</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="properties.html?status=sale">Homes for sale</a></li>
              <li><a href="properties.html?status=rent">Homes to rent</a></li>
              <li><a href="properties.html?type=Penthouse">Penthouses</a></li>
              <li><a href="index.html#tower">The Halcyon Tower</a></li>
              <li><a href="properties.html?type=Villa">Villas</a></li>
            </ul>
          </div>
          <div>
            <h4>Agency</h4>
            <ul>
              <li><a href="about.html">Our story</a></li>
              <li><a href="about.html#team">Our people</a></li>
              <li><a href="contact.html">Valuation request</a></li>
              <li><a href="contact.html#faq">FAQ</a></li>
              <li><a href="contact.html">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4>Private list</h4>
            <p style="margin:0 0 18px">Off-market homes and launch previews, sent before they reach the portals.</p>
            <form class="newsletter" data-newsletter>
              <label class="sr-only" for="nl-email">Email address</label>
              <input id="nl-email" type="email" placeholder="Your email address" required>
              <button aria-label="Subscribe">${icon('arrow')}</button>
            </form>
            <p style="margin:26px 0 0;font-size:13px">${SITE.address}<br>${SITE.hours}</p>
          </div>
        </div>
        <div class="footer__big" aria-hidden="true">${SITE.name}</div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} ${SITE.name} ${SITE.tagline}. All rights reserved.</span>
          <nav><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></nav>
        </div>
      </div>
    </footer>
    <button class="fab" aria-label="Book a viewing" data-book>${icon('calendar')}</button>
    <div class="toast" role="status" aria-live="polite">${icon('check')}<span></span></div>`;
  }

  /* ---------- Booking modal ---------- */
  document.body.insertAdjacentHTML('beforeend', `
  <div class="modal" id="book-modal" role="dialog" aria-modal="true" aria-labelledby="book-title">
    <div class="modal__backdrop" data-modal-close></div>
    <div class="modal__dialog">
      <button class="modal__close" aria-label="Close" data-modal-close>${icon('close')}</button>
      <div class="modal__media">
        <img src="${IMG('1564078516393-cf04bd966897', 900)}" alt="" loading="lazy">
        <div><span class="eyebrow light">Private Viewing</span><h3 data-book-prop>The Halcyon Tower</h3><p>Our sales gallery is open by appointment, seven days a week. Virtual tours available worldwide.</p></div>
      </div>
      <div class="modal__body">
        <h3 id="book-title">Book a viewing</h3>
        <p>Choose a time that suits you — a specialist will confirm within the hour.</p>
        <form class="form" data-form="booking" novalidate>
          <div class="picker-label">Select a day</div>
          <div class="days" data-days></div>
          <div class="picker-label">Select a time</div>
          <div class="slots" data-slots></div>
          <div class="form form--2">
            <div class="input"><input id="b-name" name="name" placeholder=" " required><label for="b-name">Full name</label></div>
            <div class="input"><input id="b-phone" name="phone" type="tel" placeholder=" " required><label for="b-phone">Phone</label></div>
            <div class="input full"><input id="b-email" name="email" type="email" placeholder=" " required><label for="b-email">Email</label></div>
            <div class="input input--select full">
              <select id="b-type" name="type"><option>In-person viewing</option><option>Virtual video tour</option><option>Sales gallery visit</option></select>
              <label for="b-type">Viewing type</label>
            </div>
          </div>
          <input type="hidden" name="property" data-book-input>
          <button class="btn btn--block" type="submit">Request appointment ${icon('arrow')}</button>
          <p class="form-note">By submitting you agree to be contacted about this enquiry. We never share your details.</p>
        </form>
      </div>
    </div>
  </div>
  <div class="lightbox" id="lightbox" aria-hidden="true">
    <img alt="">
    <button class="lightbox__close" aria-label="Close" data-lb-close>${icon('close')}</button>
    <button class="lightbox__prev" aria-label="Previous" data-lb-prev>${icon('arrow')}</button>
    <button class="lightbox__next" aria-label="Next" data-lb-next>${icon('arrow')}</button>
    <div class="lightbox__count"></div>
  </div>`);

  /* ---------- Smooth scroll (Lenis, optional) ---------- */
  let lenis = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  window.lenis = lenis;
  const scrollToY = (y) => lenis ? lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y, behavior: 'smooth' });
  window.scrollToY = scrollToY;
  const lockScroll = (on) => { document.documentElement.style.overflow = on ? 'hidden' : ''; if (lenis) on ? lenis.stop() : lenis.start(); };

  // in-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const t = document.querySelector(url.hash);
    if (!t) return;
    e.preventDefault();
    closeMenu();
    scrollToY(t.getBoundingClientRect().top + window.scrollY - 60);
    history.replaceState(null, '', url.hash);
  });

  /* ---------- Header behaviour ---------- */
  const hdr = $('#header');
  const fab = $('.fab');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const journey = $('.journey');
    const solidAt = journey ? journey.offsetTop + journey.offsetHeight - 90 : 60;
    hdr?.classList.toggle('is-solid', y > solidAt);
    hdr?.classList.toggle('is-hidden', y > lastY && y > solidAt + 300 && !$('#menu.is-open'));
    fab?.classList.toggle('is-on', y > (journey ? solidAt : 600));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu ---------- */
  const menu = $('#menu');
  const openMenu = () => { menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false'); lockScroll(true); };
  function closeMenu() { if (!menu?.classList.contains('is-open')) return; menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); lockScroll(false); }
  $$('[data-menu-open]').forEach((b) => b.addEventListener('click', openMenu));
  $$('[data-menu-close]').forEach((b) => b.addEventListener('click', closeMenu));
  $$('#menu a').forEach((a) => a.addEventListener('click', closeMenu));

  /* ---------- Toast ---------- */
  const toast = (msg) => {
    const t = $('.toast'); if (!t) return;
    t.querySelector('span').textContent = msg;
    t.classList.add('is-on');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('is-on'), 3200);
  };
  window.toast = toast;

  /* ---------- Booking modal logic ---------- */
  const modal = $('#book-modal');
  const daysEl = $('[data-days]', modal);
  const slotsEl = $('[data-slots]', modal);
  const SLOTS = ['10:00', '11:00', '12:00', '13:30', '15:00', '16:00', '17:30', '19:00'];
  const buildPicker = () => {
    const now = new Date();
    daysEl.innerHTML = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now); d.setDate(now.getDate() + i + 1);
      const wd = d.toLocaleDateString('en-US', { weekday: 'short' });
      const mo = d.toLocaleDateString('en-US', { month: 'short' });
      return `<button type="button" data-day="${d.toISOString().slice(0, 10)}" class="${i === 0 ? 'is-active' : ''}"><small>${wd}</small><b>${d.getDate()}</b><small>${mo}</small></button>`;
    }).join('');
    renderSlots(0);
  };
  const renderSlots = (seed) => {
    slotsEl.innerHTML = SLOTS.map((s, i) => `<button type="button" data-slot="${s}" ${((i * 7 + seed * 3) % 5 === 0) ? 'disabled' : ''}>${s}</button>`).join('');
    const first = $('button:not(:disabled)', slotsEl); first?.classList.add('is-active');
  };
  daysEl.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', daysEl).forEach((x) => x.classList.toggle('is-active', x === b));
    renderSlots([...daysEl.children].indexOf(b));
  });
  slotsEl.addEventListener('click', (e) => {
    const b = e.target.closest('button:not(:disabled)'); if (!b) return;
    $$('button', slotsEl).forEach((x) => x.classList.toggle('is-active', x === b));
  });
  const openBook = (prop) => {
    buildPicker();
    $('[data-book-prop]', modal).textContent = prop || 'The Halcyon Tower';
    $('[data-book-input]', modal).value = prop || 'General';
    const form = $('form', modal);
    if (form.dataset.done) { form.reset(); delete form.dataset.done; }
    modal.classList.add('is-open'); lockScroll(true);
    setTimeout(() => $('#b-name')?.focus({ preventScroll: true }), 400);
  };
  const closeBook = () => { modal.classList.remove('is-open'); lockScroll(false); };
  window.openBook = openBook;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-book]');
    if (b) { e.preventDefault(); closeMenu(); openBook(b.dataset.book || ''); }
  });
  $$('[data-modal-close]', modal).forEach((b) => b.addEventListener('click', closeBook));

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox');
  let lbList = [], lbIdx = 0;
  const lbShow = () => { $('img', lb).src = IMG(lbList[lbIdx], 2000); $('.lightbox__count', lb).textContent = `${lbIdx + 1} / ${lbList.length}`; };
  window.openLightbox = (list, i = 0) => { lbList = list; lbIdx = i; lbShow(); lb.classList.add('is-open'); lockScroll(true); };
  const lbClose = () => { lb.classList.remove('is-open'); lockScroll(false); };
  $('[data-lb-close]', lb).addEventListener('click', lbClose);
  $('[data-lb-prev]', lb).addEventListener('click', () => { lbIdx = (lbIdx - 1 + lbList.length) % lbList.length; lbShow(); });
  $('[data-lb-next]', lb).addEventListener('click', () => { lbIdx = (lbIdx + 1) % lbList.length; lbShow(); });
  lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMenu(); if (modal.classList.contains('is-open')) closeBook(); if (lb.classList.contains('is-open')) lbClose(); }
    if (lb.classList.contains('is-open')) {
      if (e.key === 'ArrowRight') $('[data-lb-next]', lb).click();
      if (e.key === 'ArrowLeft') $('[data-lb-prev]', lb).click();
    }
  });

  /* ---------- Forms (front-end validation + success state) ---------- */
  // NOTE: connect these to your backend / Formspree / CRM by replacing the handler body.
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.matches('[data-newsletter]')) {
      e.preventDefault();
      toast('You\'re on the private list. Welcome.');
      form.reset();
      return;
    }
    if (!form.matches('[data-form]')) return;
    e.preventDefault();
    let ok = true;
    $$('[required]', form).forEach((f) => {
      const valid = f.type === 'email' ? /^\S+@\S+\.\S+$/.test(f.value) : f.type === 'checkbox' ? f.checked : f.value.trim().length > 1;
      f.closest('.input')?.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { toast('Please complete the highlighted fields.'); return; }
    const data = Object.fromEntries(new FormData(form));
    const day = $('[data-day].is-active', form)?.dataset.day;
    const slot = $('[data-slot].is-active', form)?.dataset.slot;
    const when = day ? new Date(day + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + (slot ? ` at ${slot}` : '') : '';
    const first = (data.name || '').trim().split(' ')[0] || 'there';
    form.dataset.done = '1';
    const original = form.innerHTML;
    form.innerHTML = `<div class="form-success">
      <div class="tick">${icon('check')}</div>
      <h3>Thank you, ${first.replace(/</g, '')}.</h3>
      <p>${when ? `Your viewing is pencilled in for <strong>${when}</strong>. ` : ''}A Halcyon specialist will be in touch within the hour to confirm.</p>
      <button type="button" class="link-arrow" data-reset>Send another request ${icon('arrow')}</button>
    </div>`;
    $('[data-reset]', form).addEventListener('click', () => { form.innerHTML = original; delete form.dataset.done; if (form.closest('#book-modal')) buildPicker(); });
  });
  document.addEventListener('input', (e) => e.target.closest('.input')?.classList.remove('is-invalid'));

  /* ---------- Favourites ---------- */
  const FKEY = 'halcyon:favs';
  const getFavs = () => { try { return JSON.parse(localStorage.getItem(FKEY)) || []; } catch { return []; } };
  const setFavs = (v) => { try { localStorage.setItem(FKEY, JSON.stringify(v)); } catch {} };
  window.isFav = (id) => getFavs().includes(id);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fav]'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const id = b.dataset.fav; let f = getFavs();
    const on = !f.includes(id);
    f = on ? [...f, id] : f.filter((x) => x !== id);
    setFavs(f);
    $$(`[data-fav="${id}"]`).forEach((x) => x.classList.toggle('is-on', on));
    toast(on ? 'Saved to your shortlist' : 'Removed from your shortlist');
  });

  /* ---------- Property card renderer ---------- */
  window.cardHTML = (p, i = 0) => `
    <a class="card" href="property.html?id=${p.id}" data-reveal style="transition-delay:${(i % 3) * 90}ms">
      <div class="card__media">
        <img src="${IMG(p.img, 900)}" alt="${p.title}" loading="lazy">
        <div class="card__tags">
          <span class="pill ${p.status === 'rent' ? 'pill--dark' : ''}">${p.status === 'rent' ? 'To rent' : 'For sale'}</span>
          ${p.tag ? `<span class="pill pill--gold">${p.tag}</span>` : ''}
        </div>
        <button class="card__fav ${window.isFav(p.id) ? 'is-on' : ''}" data-fav="${p.id}" aria-label="Save ${p.title}">${icon('heart')}</button>
        <div class="card__price">${fmtPrice(p)}</div>
      </div>
      <div class="card__body">
        <div class="card__loc">${icon('pin')} ${p.location}</div>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__summary">${p.summary}</p>
        <div class="specs">
          <span>${icon('bed')} ${p.beds} Beds</span>
          <span>${icon('bath')} ${p.baths} Baths</span>
          <span>${icon('area')} ${p.size} m²</span>
        </div>
      </div>
    </a>`;

  /* ---------- Reveal on scroll ---------- */
  const splitWords = (el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span'); s.className = 'w';
            s.innerHTML = `<span style="--i:${i++}">${w}</span>`;
            frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  };
  $$('.split-words').forEach(splitWords);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  const pending = new Set();
  window.observeReveals = (root = document) => $$('[data-reveal], [data-reveal-img], .split-words', root).forEach((el) => {
    if (el.classList.contains('is-in')) return;
    pending.add(el); io.observe(el);
  });
  // Fallback alongside IntersectionObserver: reveal anything that is on screen OR already scrolled past,
  // so content never stays hidden (fast flings, in-app browsers, full-page screenshot tools).
  const sweep = () => {
    const limit = innerHeight * 0.98;
    pending.forEach((el) => {
      if (el.classList.contains('is-in')) { pending.delete(el); return; }
      if (el.getBoundingClientRect().top < limit) { el.classList.add('is-in'); pending.delete(el); io.unobserve(el); }
    });
  };
  let sweepQueued = false;
  const queueSweep = () => { if (sweepQueued) return; sweepQueued = true; setTimeout(() => { sweepQueued = false; sweep(); }, 120); };
  addEventListener('scroll', queueSweep, { passive: true });
  addEventListener('resize', queueSweep);
  addEventListener('load', () => setTimeout(sweep, 300));
  setTimeout(sweep, 500);
  window.observeReveals();

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target; cio.unobserve(el);
      const end = parseFloat(el.dataset.count); const dec = (el.dataset.count.split('.')[1] || '').length;
      const t0 = performance.now(); const dur = 2000;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 4);
        el.textContent = (end * e).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => cio.observe(el));

  /* ---------- Parallax images ---------- */
  const px = $$('[data-parallax]');
  if (px.length && !reduced) {
    const tick = () => {
      const vh = innerHeight;
      px.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const k = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${k * -(parseFloat(el.dataset.parallax) || 8)}%, 0)`;
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Retry images that fail to load (network hiccups) ---------- */
  document.addEventListener('error', (e) => {
    const im = e.target;
    if (im.tagName !== 'IMG' || im.dataset.retried) return;
    im.dataset.retried = '1';
    setTimeout(() => { im.src = im.src + (im.src.includes('?') ? '&' : '?') + 'retry=1'; }, 800);
  }, true);

  /* ---------- Preloader ---------- */
  const pre = $('.preloader');
  if (pre) document.addEventListener('DOMContentLoaded', () => {
    const bar = $('.preloader__bar span', pre), cnt = $('.preloader__count', pre);
    const imgs = $$('img[data-preload]');
    let done = 0; const total = Math.max(imgs.length, 1);
    let shown = 0;
    const finish = () => { if (pre.classList.contains('is-done')) return; bar.style.width = '100%'; cnt.textContent = '100'; setTimeout(() => { pre.classList.add('is-done'); document.body.classList.add('is-loaded'); window.dispatchEvent(new Event('halcyon:loaded')); }, 350); };
    const upd = () => { const pct = Math.round((done / total) * 100); shown = Math.max(shown, pct); bar.style.width = shown + '%'; cnt.textContent = String(shown).padStart(2, '0'); if (done >= total) finish(); };
    imgs.forEach((im) => { if (im.complete) { done++; } else { im.addEventListener('load', () => { done++; upd(); }); im.addEventListener('error', () => { done++; upd(); }); } });
    upd();
    setTimeout(finish, 4500); // never block longer than this
  });
  else {
    document.body.classList.add('is-loaded');
  }
})();
