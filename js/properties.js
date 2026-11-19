/* Listings page — filtering, sorting, view toggle */
(() => {
  const form = $('[data-filters]');
  const out = $('[data-results]');
  const countOut = $('[data-count-out]');
  const priceSel = $('#f-price');
  const sortSel = $('#f-sort');
  const areasEl = $('[data-areas]');

  const params = new URLSearchParams(location.search);
  const state = {
    status: params.get('status') || 'all',
    q: params.get('q') || '',
    type: params.get('type') || '',
    beds: +(params.get('beds') || 0),
    price: 0,
    area: '',
    sort: 'featured',
    view: 'grid',
  };
  try { state.view = localStorage.getItem('halcyon:view') || 'grid'; } catch {}

  const PRICE_OPTS = {
    sale: [[0, 'Any price'], [1500000, '$1.5M'], [3000000, '$3M'], [6000000, '$6M'], [10000000, '$10M']],
    rent: [[0, 'Any price'], [8000, '$8K / mo'], [15000, '$15K / mo'], [25000, '$25K / mo']],
  };
  const fillPrice = () => {
    const opts = state.status === 'rent' ? PRICE_OPTS.rent : state.status === 'sale' ? PRICE_OPTS.sale : [[0, 'Any price']];
    priceSel.innerHTML = opts.map(([v, l]) => `<option value="${v}">${l}</option>`).join('');
    priceSel.disabled = state.status === 'all';
    state.price = 0;
  };

  const areas = [...new Set(PROPERTIES.map((p) => p.area))];
  areasEl.innerHTML = `<button class="chip is-active" data-area="">All areas</button>` + areas.map((a) => `<button class="chip" data-area="${a}">${a}</button>`).join('');

  const render = () => {
    const q = state.q.trim().toLowerCase();
    let list = PROPERTIES.filter((p) =>
      (state.status === 'all' || p.status === state.status) &&
      (!state.type || p.type === state.type) &&
      p.beds >= state.beds &&
      (!state.price || p.price <= state.price) &&
      (!state.area || p.area === state.area) &&
      (!q || [p.title, p.location, p.area, p.type, p.summary].join(' ').toLowerCase().includes(q))
    );
    const sorters = {
      'price-desc': (a, b) => b.price - a.price,
      'price-asc': (a, b) => a.price - b.price,
      'size-desc': (a, b) => b.size - a.size,
      'new': (a, b) => b.year - a.year,
    };
    if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);

    countOut.textContent = list.length;
    out.classList.toggle('is-list', state.view === 'list');
    out.innerHTML = list.length
      ? list.map((p, i) => cardHTML(p, i)).join('')
      : `<div class="empty"><h3 class="h3">No homes match those filters.</h3><p>Try widening your search — or <a href="contact.html" class="link-arrow">ask us to search off-market</a></p></div>`;
    observeReveals(out);

    const u = new URLSearchParams();
    if (state.status !== 'all') u.set('status', state.status);
    if (state.type) u.set('type', state.type);
    if (state.q) u.set('q', state.q);
    if (state.beds) u.set('beds', state.beds);
    history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
  };

  // sync controls with state
  $$('[data-status]', form).forEach((b) => b.classList.toggle('is-active', b.dataset.status === state.status));
  $('#f-q').value = state.q;
  $('#f-type').value = state.type;
  $('#f-beds').value = String(state.beds);
  $$('[data-view]').forEach((b) => b.classList.toggle('is-active', b.dataset.view === state.view));
  fillPrice();

  form.addEventListener('click', (e) => {
    const b = e.target.closest('[data-status]'); if (!b) return;
    state.status = b.dataset.status;
    $$('[data-status]', form).forEach((x) => x.classList.toggle('is-active', x === b));
    fillPrice(); render();
  });
  let t;
  $('#f-q').addEventListener('input', (e) => { state.q = e.target.value; clearTimeout(t); t = setTimeout(render, 220); });
  $('#f-type').addEventListener('change', (e) => { state.type = e.target.value; render(); });
  $('#f-beds').addEventListener('change', (e) => { state.beds = +e.target.value; render(); });
  priceSel.addEventListener('change', (e) => { state.price = +e.target.value; render(); });
  sortSel.addEventListener('change', (e) => { state.sort = e.target.value; render(); });
  $('[data-search]').addEventListener('click', () => { render(); scrollToY(out.getBoundingClientRect().top + scrollY - 140); });
  areasEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-area]'); if (!b) return;
    state.area = b.dataset.area;
    $$('.chip', areasEl).forEach((x) => x.classList.toggle('is-active', x === b));
    render();
  });
  $$('[data-view]').forEach((b) => b.addEventListener('click', () => {
    state.view = b.dataset.view;
    try { localStorage.setItem('halcyon:view', state.view); } catch {}
    $$('[data-view]').forEach((x) => x.classList.toggle('is-active', x === b));
    render();
  }));

  render();
})();
