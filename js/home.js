/* =========================================================
   HALCYON ESTATES — Home page: scroll journey, tower
   explorer, featured listings, testimonials
   ========================================================= */
(() => {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const smooth = (t) => t * t * (3 - 2 * t);

  /* ================= SCROLL JOURNEY ================= */
  const journey = $('.journey');
  if (journey) {
    const N = JOURNEY.length;
    journey.style.setProperty('--scenes', N);
    const scenesEl = $('.journey__scenes', journey);
    const copyEl = $('.journey__copy', journey);
    const stopsEl = $('.rail__stops', journey);
    const stepsEl = $('.hud__steps', journey);

    scenesEl.innerHTML = JOURNEY.map((s, i) => `
      <div class="scene"><img src="${IMG(s.img, 2200)}" alt="${s.label}" ${i < 2 ? 'data-preload' : 'loading="eager"'} ${i === 0 ? 'fetchpriority="high"' : ''}></div>`).join('');

    copyEl.innerHTML = JOURNEY.map((s, i) => {
      const Tag = i === 0 ? 'h1' : 'h2';
      return `<div class="scene-copy" data-i="${i}">
        <span class="line"><span class="eyebrow">${s.eyebrow}</span></span>
        ${s.title.split('<br>').map((l) => `<span class="line"><${Tag === 'h1' ? 'span' : 'span'} class="t">${l}</span></span>`).join('')}
        <span class="line"><p>${s.text}</p></span>
        ${s.facts ? `<span class="line"><span class="facts">${s.facts.map(([a, b]) => `<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</span></span>` : ''}
        ${s.cta ? `<span class="line"><span class="ctas">
            <button class="btn" data-book>${s.final ? 'Book a private viewing' : 'Book a viewing'} ${icon('arrow')}</button>
            <a class="btn btn--ghost" href="${s.final ? 'properties.html' : '#tower'}">${s.final ? 'Explore residences' : 'Explore the tower'}</a>
          </span></span>` : ''}
      </div>`;
    }).join('');
    // Wrap title lines into a semantic heading per scene
    $$('.scene-copy', copyEl).forEach((sc, i) => {
      const lines = $$('.t', sc).map((t) => t.parentElement);
      const h = document.createElement(i === 0 ? 'h1' : 'h2');
      lines[0].before(h);
      lines.forEach((l) => h.appendChild(l));
    });

    stopsEl.innerHTML = JOURNEY.map((s, i) => `
      <li style="bottom:${(i / (N - 1)) * 100}%"><button data-goto="${i}" aria-label="Go to ${s.label}">
        <span class="lbl">${s.label}</span><span class="num">${s.short}</span></button></li>`).join('');
    stepsEl.innerHTML = JOURNEY.map((s) => `<span>${s.short === 'ST' ? 'Street' : s.short === 'G' ? 'Ground' : 'L' + s.short}</span>`).join('');

    const scenes = $$('.scene', scenesEl);
    const copies = $$('.scene-copy', copyEl);
    const stops = $$('li', stopsEl);
    const fill = $('.rail__fill', journey), knob = $('.rail__knob', journey);
    const bar = $('.hud__bar span', journey);
    const lvlSmall = $('.hud__level small', journey), lvlStrong = $('.hud__level strong', journey);
    const hint = $('.scroll-hint', journey);

    const SPAN = N - 0.5; // last scene gets a little hold at the end
    let active = -1, ready = false, lastKey = '';

    const setActive = (k) => {
      if (k === active) return;
      const prev = copies[active];
      if (prev) { prev.classList.remove('is-active'); prev.classList.add('is-leaving'); setTimeout(() => prev.classList.remove('is-leaving'), 650); }
      active = k;
      copies[k].classList.add('is-active');
      stops.forEach((s, i) => s.classList.toggle('is-active', i === k));
    };

    const levelText = (i, tt) => {
      const a = JOURNEY[i], b = JOURNEY[Math.min(i + 1, N - 1)];
      const resting = (s) => s.level === null ? 'Street' : s.level === 0 ? 'Ground' : `Level <b>${String(s.level).padStart(2, '0')}</b>`;
      if (tt < 0.02) return [a.label, resting(a)];
      const from = a.level ?? 0, to = b.level ?? 0;
      const n = Math.round(from + (to - from) * ease(tt));
      const lbl = tt > .5 ? b.label : a.label;
      if (to === 0) return [lbl, 'Ground'];
      return [lbl, n === 0 ? 'Ground' : `Level <b>${String(n).padStart(2, '0')}</b>`];
    };

    const update = () => {
      const total = journey.offsetHeight - innerHeight;
      const p = total > 0 ? clamp(-journey.getBoundingClientRect().top / total) : 0;
      const seg = Math.min(p * SPAN, N - 1);
      const i = Math.min(Math.floor(seg), N - 1);
      const t = i === N - 1 ? 0 : seg - i;
      const tt = smooth(clamp((t - 0.38) / 0.62));
      const drift = clamp(t / 0.38);

      scenes.forEach((el, k) => {
        let o = 0, s = 1;
        if (k === i) { o = 1 - tt; s = 1 + 0.05 * drift + 0.5 * ease(tt); }
        else if (k === i + 1) { o = tt; s = 1.22 - 0.22 * ease(tt); }
        el.style.opacity = o.toFixed(3);
        el.style.transform = `scale(${s.toFixed(4)})`;
        el.style.visibility = o > 0.001 ? 'visible' : 'hidden';
      });

      const prog = seg / (N - 1);
      fill.style.height = prog * 100 + '%';
      knob.style.bottom = prog * 100 + '%';
      bar.style.width = prog * 100 + '%';
      hint.style.opacity = p > 0.015 ? 0 : 1;

      const [sm, st] = levelText(i, tt);
      const key = sm + st;
      if (key !== lastKey) { lvlSmall.textContent = sm; lvlStrong.innerHTML = st; lastKey = key; }

      if (ready) setActive(tt > 0.5 ? Math.min(i + 1, N - 1) : i);
    };

    let lastY = -1;
    const loop = () => {
      if (window.scrollY !== lastY || journey._dirty) { lastY = window.scrollY; journey._dirty = false; update(); }
      requestAnimationFrame(loop);
    };
    addEventListener('resize', () => { journey._dirty = true; });
    update();
    requestAnimationFrame(loop);

    const start = () => { ready = true; journey._dirty = true; };
    if ($('.preloader')) addEventListener('halcyon:loaded', start, { once: true }); else start();

    // Jump to a level
    stopsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-goto]'); if (!b) return;
      const k = +b.dataset.goto;
      const total = journey.offsetHeight - innerHeight;
      scrollToY(journey.offsetTop + (k / SPAN) * total + 2);
    });

    // Time-of-day mood
    $$('.hud__time button', journey).forEach((b) => b.addEventListener('click', () => {
      journey.dataset.time = b.dataset.time;
      $$('.hud__time button', journey).forEach((x) => x.classList.toggle('is-active', x === b));
    }));
  }

  /* ================= TOWER EXPLORER ================= */
  const svg = $('.tower__svg');
  if (svg) {
    const FLOORS = 53, FH = 10, GAP = 1.6, BASE = 640;
    const yOf = (f) => BASE - (f + 1) * (FH + GAP);
    const bandOf = (f) => TOWER_BANDS.find((b) => f >= b.from && f <= b.to);
    let html = `
      <defs>
        <linearGradient id="glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".10"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>
      </defs>
      <line x1="150" y1="${yOf(52) - 46}" x2="150" y2="${yOf(52)}" stroke="#c6a467" stroke-width="1.2"/>
      <circle cx="150" cy="${yOf(52) - 48}" r="2.5" fill="#e2c793"/>`;
    for (let f = 0; f < FLOORS; f++) {
      const b = bandOf(f);
      let x = 80, w = 140;
      if (f <= 3) { x = 40; w = 220; }
      else if (f >= 49) { x = 92 + (f - 49) * 4; w = 116 - (f - 49) * 8; }
      html += `<rect class="floor" data-band="${b.id}" data-floor="${f}" x="${x}" y="${yOf(f)}" width="${w}" height="${FH}" rx="1"/>`;
    }
    html += `<rect x="80" y="${yOf(48)}" width="140" height="${yOf(4) - yOf(48) + FH}" fill="url(#glass)" pointer-events="none"/>`;
    for (let x = 100; x < 220; x += 20) html += `<line x1="${x}" y1="${yOf(48)}" x2="${x}" y2="${yOf(4) + FH}" stroke="#0b121c" stroke-opacity=".35" stroke-width="1" pointer-events="none"/>`;
    html += `<line x1="0" y1="${BASE}" x2="300" y2="${BASE}" stroke="rgba(255,255,255,.25)"/>`;
    TOWER_BANDS.forEach((b) => {
      const y = (yOf(b.to) + yOf(b.from) + FH) / 2;
      html += `<g class="tick" data-band="${b.id}" pointer-events="none"><line x1="266" y1="${y}" x2="282" y2="${y}" stroke="rgba(255,255,255,.35)"/><text x="288" y="${y + 3.5}" font-size="10" fill="rgba(255,255,255,.55)" font-family="Manrope, sans-serif" letter-spacing="1.5">${b.from === b.to ? 'L' + b.to : 'L' + b.from + '–' + b.to}</text></g>`;
    });
    svg.innerHTML = html;
    svg.setAttribute('viewBox', `0 ${yOf(52) - 60} 340 ${BASE - yOf(52) + 70}`);

    const panel = $('.tower__panel');
    const list = $('.tower__list');
    list.innerHTML = TOWER_BANDS.map((b) => `<li data-band="${b.id}"><button><span>${b.name}</span><span>${b.from === b.to ? 'Level ' + b.to : 'L' + b.from + '–' + b.to}</span></button></li>`).join('');

    const select = (id) => {
      const b = TOWER_BANDS.find((x) => x.id === id);
      $$('.floor', svg).forEach((r) => {
        const on = r.dataset.band === id;
        r.style.fill = on ? '#c6a467' : TOWER_BANDS.find((x) => x.id === r.dataset.band).color;
        r.style.opacity = on ? 1 : .38;
      });
      $$('.tick text', svg).forEach((t) => t.setAttribute('fill', t.parentElement.dataset.band === id ? '#e2c793' : 'rgba(255,255,255,.45)'));
      $$('li', list).forEach((li) => li.classList.toggle('is-active', li.dataset.band === id));
      const residential = b.avail !== null;
      panel.innerHTML = `<div class="swap">
        <span class="tag">${b.type}</span>
        <h3>${b.name}</h3>
        <div class="levels">${b.from === b.to ? 'Level ' + b.to : `Levels ${b.from} – ${b.to}`}</div>
        <dl>
          <div><dt>${residential ? 'Layouts' : 'Features'}</dt><dd>${b.beds}</dd></div>
          <div><dt>${residential ? 'Interior' : 'Area'}</dt><dd>${b.size}</dd></div>
          <div><dt>${residential ? 'Pricing' : 'Access'}</dt><dd>${b.price}</dd></div>
          <div><dt>Availability</dt><dd>${residential ? `${b.avail} residences` : 'All residents'}</dd></div>
        </dl>
        ${residential
          ? `<button class="btn btn--block" data-book="${b.name} · The Halcyon Tower">Enquire about ${b.name.split(' ').slice(-1)[0].toLowerCase()} ${icon('arrow')}</button>`
          : `<a class="btn btn--ghost btn--block" href="#amenities">Discover amenities</a>`}
      </div>`;
    };
    svg.addEventListener('click', (e) => { const r = e.target.closest('.floor'); if (r) select(r.dataset.band); });
    svg.addEventListener('mouseover', (e) => { const r = e.target.closest('.floor'); if (r && matchMedia('(hover:hover)').matches) select(r.dataset.band); });
    list.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) select(li.dataset.band); });
    select('r3');
  }

  /* ================= FEATURED LISTINGS ================= */
  const feat = $('[data-featured]');
  if (feat) {
    const ids = ['halcyon-sky-penthouse', 'marina-bay-villa', 'residence-34b', 'white-cube-residence', 'azure-pool-villa', 'cliffside-modern'];
    feat.innerHTML = ids.map((id, i) => cardHTML(PROPERTIES.find((p) => p.id === id), i)).join('');
    observeReveals(feat);
  }

  /* ================= AGENTS ================= */
  const ag = $('[data-agents]');
  if (ag) {
    ag.innerHTML = AGENTS.map((a, i) => `
      <article class="agent" data-reveal style="transition-delay:${i * 90}ms">
        <div class="agent__media"><img src="${IMG(a.img, 700, 880)}" alt="${a.name}" loading="lazy"></div>
        <h3>${a.name}</h3><p>${a.role}</p>
        <div class="agent__links">
          <a href="tel:${a.phone.replace(/[^+\d]/g, '')}" aria-label="Call ${a.name}">${icon('phone')}</a>
          <a href="mailto:${a.email}" aria-label="Email ${a.name}">${icon('mail')}</a>
          <a href="#" aria-label="${a.name} on LinkedIn">${icon('linkedin')}</a>
        </div>
      </article>`).join('');
    observeReveals(ag);
  }

  /* ================= TESTIMONIALS ================= */
  const q = $('[data-quotes]');
  if (q) {
    q.innerHTML = TESTIMONIALS.map((t, i) => `
      <figure class="quote ${i === 0 ? 'is-active' : ''}">
        <blockquote>${t.quote}</blockquote>
        <figcaption><img src="${IMG(t.img, 120, 120)}" alt="" loading="lazy"><div><strong>${t.name}</strong><span>${t.role}</span></div></figcaption>
      </figure>`).join('');
    const nav = $('.quotes__nav');
    nav.innerHTML = TESTIMONIALS.map((_, i) => `<button aria-label="Testimonial ${i + 1}" class="${i === 0 ? 'is-active' : ''}"></button>`).join('');
    let qi = 0;
    const show = (k) => {
      qi = k;
      $$('.quote', q).forEach((el, i) => el.classList.toggle('is-active', i === k));
      $$('button', nav).forEach((el, i) => el.classList.toggle('is-active', i === k));
    };
    nav.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { show([...nav.children].indexOf(b)); restart(); } });
    let timer; const restart = () => { clearInterval(timer); timer = setInterval(() => show((qi + 1) % TESTIMONIALS.length), 7000); };
    restart();
  }
})();
