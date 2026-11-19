/* Property detail page */
(() => {
  const id = new URLSearchParams(location.search).get('id');
  const p = PROPERTIES.find((x) => x.id === id) || PROPERTIES[0];
  const agent = AGENTS.find((a) => a.id === p.agent) || AGENTS[0];
  const P = (k) => $(`[data-p="${k}"]`);
  const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

  document.title = `${p.title} — ${p.location} | Halcyon Estates`;
  P('crumb').textContent = p.title;
  P('title').textContent = p.title;
  P('location').textContent = p.location;
  P('status').textContent = p.status === 'rent' ? 'Monthly rent' : 'Guide price';
  P('price').innerHTML = fmtPrice(p);
  P('tags').innerHTML = `<span class="pill ${p.status === 'rent' ? 'pill--dark' : ''}">${p.status === 'rent' ? 'To rent' : 'For sale'}</span>${p.tag ? `<span class="pill pill--gold">${p.tag}</span>` : ''}<span class="pill pill--dark">${p.type}</span>`;

  /* Gallery */
  const g = p.gallery.slice(0, 5);
  P('gallery').innerHTML = g.map((img, i) => `
    <button data-lb="${i}" aria-label="Open photo ${i + 1}">
      <img src="${IMG(img, i === 0 ? 1600 : 800)}" alt="${p.title} photo ${i + 1}" ${i ? 'loading="lazy"' : ''}>
      ${i === g.length - 1 ? `<span class="gallery__more">${icon('expand')}&nbsp; View all ${p.gallery.length} photos</span>` : ''}
    </button>`).join('');
  P('gallery').addEventListener('click', (e) => { const b = e.target.closest('[data-lb]'); if (b) openLightbox(p.gallery, +b.dataset.lb); });

  /* Key facts */
  P('facts').innerHTML = [
    ['bed', p.beds, 'Bedrooms'], ['bath', p.baths, 'Bathrooms'], ['area', p.size + ' m²', 'Interior'],
    ['car', p.parking, 'Parking'], ['calendar', p.year, 'Completed'],
  ].map(([i, v, l]) => `<div>${icon(i)}<strong>${v}</strong><span>${l}</span></div>`).join('');

  /* Description */
  P('desc').innerHTML = `
    <p style="font-family:var(--serif);font-size:26px;line-height:1.35;color:var(--text)">${p.summary}</p>
    <p>Set in ${p.area}, this ${p.type.toLowerCase()} offers ${p.size} m² of beautifully considered living space across ${p.beds} bedrooms and ${p.baths} bathrooms. Generous proportions, natural materials and an abundance of light define every room, while thoughtful storage and premium systems make day-to-day living effortless.</p>
    <p>Principal reception spaces flow onto outdoor terraces, ideal for entertaining. The primary suite is a calm retreat with a dressing room and spa-inspired bathroom, and secondary bedrooms are each served by their own en-suite or adjacent bathroom. ${p.status === 'rent' ? 'Available for long-term lease with flexible move-in dates.' : 'Offered with vacant possession and full documentation available on request.'}</p>`;

  P('features').innerHTML = p.features.map((f) => `<li>${icon('check')}${f}</li>`).join('');

  /* Floor plan (schematic, generated from bedroom count) */
  const plan = () => {
    const beds = Math.min(p.beds, 5);
    const W = 800, H = 440;
    const rooms = [];
    rooms.push({ x: 20, y: 20, w: 380, h: 250, n: 'Living & Dining', s: Math.round(p.size * .28) });
    rooms.push({ x: 400, y: 20, w: 180, h: 160, n: 'Kitchen', s: Math.round(p.size * .09) });
    rooms.push({ x: 580, y: 20, w: 200, h: 220, n: 'Primary Suite', s: Math.round(p.size * .14) });
    rooms.push({ x: 400, y: 180, w: 180, h: 90, n: 'Entry', s: Math.round(p.size * .04) });
    rooms.push({ x: 580, y: 240, w: 200, h: 100, n: 'Primary Bath', s: Math.round(p.size * .05) });
    const bw = 560 / Math.max(beds - 1, 1);
    for (let i = 0; i < beds - 1; i++) rooms.push({ x: 20 + i * bw, y: 270, w: bw, h: 150, n: `Bedroom ${i + 2}`, s: Math.round(p.size * .07) });
    rooms.push({ x: 580, y: 340, w: 200, h: 80, n: 'Terrace', s: Math.round(p.size * .06), terrace: true });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Schematic floor plan">
      ${rooms.map((r) => `
        <g>
          <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.terrace ? 'rgba(198,164,103,.15)' : '#fff'}" stroke="#101a28" stroke-width="${r.terrace ? 1 : 3}" ${r.terrace ? 'stroke-dasharray="6 5"' : ''}/>
          <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 - 4}" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="${r.w < 150 ? 15 : 19}" fill="#101a28">${r.n}</text>
          <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 16}" text-anchor="middle" font-family="Manrope, sans-serif" font-size="11" letter-spacing="1.5" fill="#a8864b">${r.s} M²</text>
        </g>`).join('')}
      <path d="M404 270 a 30 30 0 0 1 30 -30" fill="none" stroke="#a8864b" stroke-width="1.2"/>
      <g transform="translate(760 395)"><circle r="14" fill="none" stroke="#a8864b"/><path d="M0 -10 L4 4 L0 1 L-4 4Z" fill="#a8864b"/><text y="-18" text-anchor="middle" font-size="10" fill="#a8864b" font-family="Manrope">N</text></g>
    </svg>
    <p class="form-note" style="margin:16px 0 0">Schematic for illustration. Full architectural plans available from your advisor.</p>`;
  };
  P('plan').innerHTML = plan();

  /* Mortgage calculator */
  const wrap = P('calc-wrap');
  if (p.status === 'rent') {
    wrap.remove();
  } else {
    const ins = Object.fromEntries($$('[data-in]', wrap).map((el) => [el.dataset.in, el]));
    ins.price.min = Math.round(p.price * .5 / 10000) * 10000;
    ins.price.max = Math.round(p.price * 1.5 / 10000) * 10000;
    ins.price.value = p.price;
    const calc = () => {
      const price = +ins.price.value, down = +ins.down.value, rate = +ins.rate.value, years = +ins.years.value;
      const loan = price * (1 - down / 100), r = rate / 100 / 12, n = years * 12;
      const m = r ? loan * r / (1 - Math.pow(1 + r, -n)) : loan / n;
      const totalInt = m * n - loan;
      $('[data-out="price"]', wrap).textContent = money(price);
      $('[data-out="down"]', wrap).textContent = `${down}% · ${money(price * down / 100)}`;
      $('[data-out="rate"]', wrap).textContent = rate.toFixed(1) + '%';
      $('[data-out="years"]', wrap).textContent = years + ' years';
      $('[data-out="monthly"]', wrap).textContent = money(m);
      const pp = loan / (loan + totalInt) * 100;
      $('[data-bar="principal"]', wrap).style.width = pp + '%';
      $('[data-bar="interest"]', wrap).style.width = (100 - pp) + '%';
    };
    Object.values(ins).forEach((el) => el.addEventListener('input', calc));
    calc();
  }

  /* Agent + enquiry */
  P('agent').innerHTML = `
    <div class="agent-card__head">
      <img src="${IMG(agent.img, 160, 160)}" alt="${agent.name}">
      <div><h3>${agent.name}</h3><p>${agent.role}</p></div>
    </div>
    <form class="form" data-form="enquiry" novalidate>
      <div class="input"><input id="e-name" name="name" placeholder=" " required><label for="e-name">Full name</label></div>
      <div class="input"><input id="e-email" name="email" type="email" placeholder=" " required><label for="e-email">Email</label></div>
      <div class="input"><input id="e-phone" name="phone" type="tel" placeholder=" "><label for="e-phone">Phone (optional)</label></div>
      <div class="input"><textarea id="e-msg" name="message" placeholder=" ">I'd like more information about ${p.title}.</textarea><label for="e-msg">Message</label></div>
      <input type="hidden" name="property" value="${p.title}">
      <button class="btn btn--block btn--dark" type="submit">Send enquiry ${icon('arrow')}</button>
    </form>
    <button class="btn btn--block" style="margin-top:10px" data-book="${p.title}">${icon('calendar')} Book a viewing</button>
    <div class="agent-card__actions">
      <a class="btn btn--ghost btn--sm" href="tel:${agent.phone.replace(/[^+\d]/g, '')}">${icon('phone')} Call</a>
      <button class="btn btn--ghost btn--sm card__fav-btn ${isFav(p.id) ? 'is-on' : ''}" data-fav="${p.id}">${icon('heart')} Save</button>
    </div>`;

  /* Similar */
  const similar = PROPERTIES.filter((x) => x.id !== p.id)
    .map((x) => ({ x, score: (x.type === p.type ? 2 : 0) + (x.status === p.status ? 1 : 0) + (x.area === p.area ? 1 : 0) }))
    .sort((a, b) => b.score - a.score).slice(0, 3).map((o) => o.x);
  P('similar').innerHTML = similar.map((x, i) => cardHTML(x, i)).join('');
  observeReveals(P('similar'));
})();
