/* =========================================================
   HALCYON ESTATES — site data
   Replace the content below with your agency's real listings.
   Images: Unsplash photo IDs (swap for your own photography).
   ========================================================= */

// Photos are stored locally in assets/img as <id>.jpg (1600px) and <id>-sm.jpg (800px).
const IMG = (id, w = 1600) => `assets/img/${id}${w > 1000 ? '' : '-sm'}.jpg`;

const SITE = {
  name: 'Halcyon',
  tagline: 'Estates',
  phone: '+1 (800) 555-0199',
  email: 'hello@halcyon-estates.com',
  address: '1 Meridian Plaza, Marina District',
  hours: 'Mon–Sat · 9:00–19:00',
};

/* ---------- Scroll journey through the flagship tower ---------- */
const JOURNEY = [
  {
    img: '1486406146926-c627a92ad1ab',
    level: null, label: 'Street Level', short: 'ST',
    eyebrow: 'The Halcyon Tower · Marina District',
    title: 'Your life,<br><em>elevated.</em>',
    text: 'Fifty-two storeys of glass, light and quiet luxury. Scroll to rise through every level of the city\'s most anticipated address.',
    cta: true,
  },
  {
    img: '1600585154526-990dced4db0d',
    level: 0, label: 'Ground Floor', short: 'G',
    eyebrow: 'Private Arrival',
    title: 'Arrive like<br>you <em>belong.</em>',
    text: 'A discreet porte-cochère, 24/7 valet and a double-height entrance hall — your evening begins the moment you pull in.',
    facts: [['24/7', 'Valet & concierge'], ['6 m', 'Ceiling height']],
  },
  {
    img: '1514933651103-005eec06c04b',
    level: 12, label: "Residents' Club", short: '12',
    eyebrow: 'Level 12 · The Club',
    title: 'Your private<br><em>members\' club.</em>',
    text: 'A cocktail lounge, cigar room, screening theatre and chef\'s table — reserved exclusively for residents and their guests.',
    facts: [['1,800 m²', 'Club amenities'], ['5', 'Private lounges']],
  },
  {
    img: '1564078516393-cf04bd966897',
    level: 34, label: 'Residence 34B', short: '34',
    eyebrow: 'Level 34 · Three-Bedroom Residence',
    title: 'Room to breathe,<br><em>views to keep.</em>',
    text: 'Floor-to-ceiling glazing, wide-plank oak and a corner living room that frames the skyline from sunrise to midnight.',
    facts: [['245 m²', 'Interior'], ['3.4 m', 'Ceilings']],
  },
  {
    img: '1544984243-ec57ea16fe25',
    level: 48, label: 'Sky Pool', short: '48',
    eyebrow: 'Level 48 · The Sky Deck',
    title: 'Swim among<br><em>the clouds.</em>',
    text: 'A 30-metre infinity pool, cabanas and an outdoor bar suspended 180 metres above the bay.',
    facts: [['30 m', 'Infinity edge'], ['180 m', 'Above the bay']],
  },
  {
    img: '1470723710355-95304d8aece4',
    level: 52, label: 'Sky Level', short: '52',
    eyebrow: 'Level 52 · The Penthouses',
    title: 'Live above<br><em>the ordinary.</em>',
    text: 'Only four penthouses crown the tower. Private viewings are now open by appointment.',
    cta: true, final: true,
  },
];

/* ---------- Tower floor explorer bands ---------- */
const TOWER_BANDS = [
  { id: 'ph',   from: 49, to: 52, name: 'The Penthouses',   type: 'Penthouse', beds: '4–5 bedrooms', size: '480–620 m²', price: 'From $8.9M',  avail: 2,  color: '#c6a467' },
  { id: 'sky',  from: 48, to: 48, name: 'Sky Deck',         type: 'Amenity',   beds: 'Infinity pool · Bar · Cabanas', size: '1,400 m²', price: 'Residents only', avail: null, color: '#5fb3c9' },
  { id: 'sv',   from: 41, to: 47, name: 'Sky Villas',       type: 'Sky Villa', beds: '3–4 bedrooms', size: '290–380 m²', price: 'From $4.2M',  avail: 5,  color: '#a7895a' },
  { id: 'r3',   from: 22, to: 40, name: 'Signature Residences', type: 'Apartment', beds: '3 bedrooms', size: '210–260 m²', price: 'From $2.3M', avail: 14, color: '#8c7a5e' },
  { id: 'r2',   from: 13, to: 21, name: 'City Residences',  type: 'Apartment', beds: '1–2 bedrooms', size: '85–150 m²',  price: 'From $980K', avail: 21, color: '#6f6656' },
  { id: 'club', from: 12, to: 12, name: "Residents' Club",  type: 'Amenity',   beds: 'Lounge · Cinema · Chef\'s table', size: '1,800 m²', price: 'Residents only', avail: null, color: '#b5651d' },
  { id: 'well', from: 4,  to: 11, name: 'Garden Residences', type: 'Apartment', beds: '2–3 bedrooms', size: '140–220 m²', price: 'From $1.4M', avail: 9, color: '#5d6b58' },
  { id: 'pod',  from: 0,  to: 3,  name: 'Podium & Arrival', type: 'Amenity',   beds: 'Lobby · Spa · Fitness · Parking', size: '6,200 m²', price: 'Residents only', avail: null, color: '#3a4656' },
];

/* ---------- Agents ---------- */
const AGENTS = [
  { id: 'sophia', name: 'Sophia Laurent',  role: 'Director of Sales',        img: '1494790108377-be9c29b29330', phone: '+1 (800) 555-0141', email: 'sophia@halcyon-estates.com', sold: '$420M+', langs: 'English, French' },
  { id: 'james',  name: 'James Whitmore',  role: 'Senior Partner',           img: '1507003211169-0a1dd7228f2d', phone: '+1 (800) 555-0142', email: 'james@halcyon-estates.com',  sold: '$610M+', langs: 'English' },
  { id: 'amara',  name: 'Amara Okafor',    role: 'Head of Luxury Rentals',   img: '1573496359142-b8d87734a5a2', phone: '+1 (800) 555-0143', email: 'amara@halcyon-estates.com',  sold: '$180M+', langs: 'English, Yoruba' },
  { id: 'daniel', name: 'Daniel Reyes',    role: 'Investment Advisor',       img: '1500648767791-00dcc994a43e', phone: '+1 (800) 555-0144', email: 'daniel@halcyon-estates.com', sold: '$290M+', langs: 'English, Spanish' },
];

/* ---------- Listings ---------- */
const PROPERTIES = [
  {
    id: 'halcyon-sky-penthouse', title: 'Halcyon Sky Penthouse', location: 'Halcyon Tower · Level 52', area: 'Marina District',
    type: 'Penthouse', status: 'sale', price: 8950000, beds: 4, baths: 5, size: 520, parking: 3, year: 2026, tag: 'Exclusive',
    img: '1564078516393-cf04bd966897',
    gallery: ['1564078516393-cf04bd966897', '1616594039964-ae9021a400a0', '1600489000022-c2086d79f9d4', '1544984243-ec57ea16fe25', '1552321554-5fefe8c9ef14'],
    agent: 'sophia',
    summary: 'A full-floor penthouse crowning the Halcyon Tower with 360° views, private lift lobby and a wraparound sky terrace.',
    features: ['Private lift lobby', '360° wraparound terrace', 'Chef\'s kitchen with Gaggenau suite', 'Primary suite with spa bathroom', 'Climate-controlled wine room', 'Smart-home automation', 'Three secure parking bays', 'Access to Sky Deck & Residents\' Club'],
  },
  {
    id: 'marina-bay-villa', title: 'Marina Bay Villa', location: 'Palm Crescent', area: 'Palm Crescent',
    type: 'Villa', status: 'sale', price: 5400000, beds: 5, baths: 6, size: 640, parking: 4, year: 2023, tag: 'New',
    img: '1613490493576-7fde63acd811',
    gallery: ['1613490493576-7fde63acd811', '1600607687939-ce8a6c25118c', '1600210492486-724fe5c67fb0', '1631049307264-da0ec9d70304', '1600566752355-35792bedcfea'],
    agent: 'james',
    summary: 'A sculptural waterfront villa with a 20-metre pool, cantilevered terraces and direct access to the marina promenade.',
    features: ['20 m heated pool', 'Private marina berth', 'Home cinema', 'Guest pavilion', 'Landscaped gardens', 'Staff quarters', 'Solar & battery storage', 'Four-car garage'],
  },
  {
    id: 'residence-34b', title: 'Signature Residence 34B', location: 'Halcyon Tower · Level 34', area: 'Marina District',
    type: 'Apartment', status: 'sale', price: 2350000, beds: 3, baths: 3, size: 245, parking: 2, year: 2026, tag: 'Off-plan',
    img: '1503174971373-b1f69850bded',
    gallery: ['1503174971373-b1f69850bded', '1618221195710-dd6b41faaea6', '1600489000022-c2086d79f9d4', '1540518614846-7eded433c457', '1552321554-5fefe8c9ef14'],
    agent: 'sophia',
    summary: 'A corner residence with floor-to-ceiling glazing, oak floors and skyline views from every principal room.',
    features: ['Corner living room', 'Floor-to-ceiling glazing', 'Integrated Miele appliances', 'Walk-in wardrobe', 'Two parking bays', 'Residents\' Club membership', '24/7 concierge', 'Sky Deck access'],
  },
  {
    id: 'cliffside-modern', title: 'Cliffside Modern House', location: 'Westridge Hills', area: 'Westridge Hills',
    type: 'Villa', status: 'sale', price: 3780000, beds: 4, baths: 4, size: 410, parking: 2, year: 2021, tag: null,
    img: '1600585154340-be6161a56a0c',
    gallery: ['1600585154340-be6161a56a0c', '1600210491892-03d54c0aaf87', '1600585154084-4e5fe7c39198', '1600121848594-d8644e57abab', '1600566752355-35792bedcfea'],
    agent: 'james',
    summary: 'Architect-designed home wrapped around a mature oak, with glass walls opening to a level lawn and valley views.',
    features: ['Architect-designed', 'Mature landscaped garden', 'Open-plan kitchen & dining', 'Home office', 'Underfloor heating', 'EV charging', 'Wine cellar', 'Gated entrance'],
  },
  {
    id: 'linden-townhouse', title: 'Linden Garden Townhouse', location: 'Old Town', area: 'Old Town',
    type: 'Townhouse', status: 'sale', price: 1450000, beds: 3, baths: 2, size: 190, parking: 1, year: 2019, tag: null,
    img: '1567496898669-ee935f5f647a',
    gallery: ['1567496898669-ee935f5f647a', '1600210492486-724fe5c67fb0', '1507089947368-19c1da9775ae', '1631049307264-da0ec9d70304'],
    agent: 'daniel',
    summary: 'A light-filled townhouse on a leafy street, moments from Old Town\'s cafés, schools and riverside park.',
    features: ['Private rear garden', 'Roof terrace', 'Renovated kitchen', 'Period details', 'Garage', 'Walk to schools & transit'],
  },
  {
    id: 'skyline-loft-21a', title: 'Skyline Loft 21A', location: 'Financial District', area: 'Financial District',
    type: 'Apartment', status: 'rent', price: 9800, beds: 2, baths: 2, size: 140, parking: 1, year: 2022, tag: 'Furnished',
    img: '1600121848594-d8644e57abab',
    gallery: ['1600121848594-d8644e57abab', '1600489000022-c2086d79f9d4', '1617806118233-18e1de247200', '1540518614846-7eded433c457'],
    agent: 'amara',
    summary: 'A fully furnished loft with soaring windows, designer furniture and a five-minute walk to the Exchange.',
    features: ['Fully furnished', 'Concierge', 'Gym & pool', 'Bills package available', 'Pet friendly', 'Flexible 6–24 month lease'],
  },
  {
    id: 'azure-pool-villa', title: 'Azure Pool Villa', location: 'Palm Crescent', area: 'Palm Crescent',
    type: 'Villa', status: 'rent', price: 24000, beds: 6, baths: 7, size: 780, parking: 4, year: 2022, tag: 'Exclusive',
    img: '1512917774080-9991f1c4c750',
    gallery: ['1512917774080-9991f1c4c750', '1600607687939-ce8a6c25118c', '1616594039964-ae9021a400a0', '1584132967334-10e028bd69f7'],
    agent: 'amara',
    summary: 'An entertainer\'s villa with a resort-style pool, outdoor kitchen and housekeeping included.',
    features: ['Resort-style pool', 'Outdoor kitchen', 'Housekeeping included', 'Gym', 'Cinema room', 'Smart security'],
  },
  {
    id: 'harbour-view-apartment', title: 'Harbour View Apartment', location: 'Marina District', area: 'Marina District',
    type: 'Apartment', status: 'sale', price: 1180000, beds: 2, baths: 2, size: 118, parking: 1, year: 2020, tag: null,
    img: '1545324418-cc1a3fa10c00',
    gallery: ['1545324418-cc1a3fa10c00', '1618221195710-dd6b41faaea6', '1507089947368-19c1da9775ae', '1617806118233-18e1de247200'],
    agent: 'daniel',
    summary: 'A bright two-bedroom with a deep balcony overlooking the harbour — an ideal first home or rental investment.',
    features: ['Harbour views', 'Deep balcony', '6.1% gross rental yield', 'Pool & gym', 'Secure parking', 'Walk to marina'],
  },
  {
    id: 'evergreen-manor', title: 'Evergreen Manor', location: 'Northbrook Estate', area: 'Northbrook',
    type: 'Villa', status: 'sale', price: 12500000, beds: 7, baths: 9, size: 1250, parking: 6, year: 2018, tag: 'Signature',
    img: '1505843513577-22bb7d21e455',
    gallery: ['1505843513577-22bb7d21e455', '1600607687939-ce8a6c25118c', '1616594039964-ae9021a400a0', '1600489000022-c2086d79f9d4', '1552321554-5fefe8c9ef14'],
    agent: 'james',
    summary: 'A landmark estate on four acres of manicured grounds with a ballroom, spa wing and guest cottage.',
    features: ['Four acres of grounds', 'Ballroom', 'Spa wing with indoor pool', 'Guest cottage', 'Tennis court', 'Six-car garage'],
  },
  {
    id: 'white-cube-residence', title: 'The White Cube Residence', location: 'Westridge Hills', area: 'Westridge Hills',
    type: 'Villa', status: 'sale', price: 2990000, beds: 4, baths: 4, size: 360, parking: 2, year: 2024, tag: 'New',
    img: '1600596542815-ffad4c1539a9',
    gallery: ['1600596542815-ffad4c1539a9', '1600210491892-03d54c0aaf87', '1618221195710-dd6b41faaea6', '1600566752355-35792bedcfea'],
    agent: 'sophia',
    summary: 'Crisp minimalist architecture with a rooftop lounge, plunge pool and sweeping sunset views.',
    features: ['Rooftop lounge', 'Plunge pool', 'Minimalist design', 'Smart home', 'Double garage', 'Solar roof'],
  },
  {
    id: 'sky-villa-45', title: 'Sky Villa 45', location: 'Halcyon Tower · Level 45', area: 'Marina District',
    type: 'Penthouse', status: 'rent', price: 18500, beds: 3, baths: 4, size: 310, parking: 2, year: 2026, tag: 'Coming soon',
    img: '1618221195710-dd6b41faaea6',
    gallery: ['1618221195710-dd6b41faaea6', '1616594039964-ae9021a400a0', '1600489000022-c2086d79f9d4', '1544984243-ec57ea16fe25'],
    agent: 'amara',
    summary: 'A double-aspect sky villa just below the Sky Deck, offered fully serviced on long-term lease.',
    features: ['Double-aspect views', 'Fully serviced', 'Private terrace', 'Sky Deck access', 'Residents\' Club', 'Two parking bays'],
  },
  {
    id: 'courtyard-house', title: 'The Courtyard House', location: 'Old Town', area: 'Old Town',
    type: 'Townhouse', status: 'rent', price: 6200, beds: 3, baths: 3, size: 210, parking: 1, year: 2020, tag: null,
    img: '1600566753190-17f0baa2a6c3',
    gallery: ['1600566753190-17f0baa2a6c3', '1600210492486-724fe5c67fb0', '1507089947368-19c1da9775ae', '1540518614846-7eded433c457'],
    agent: 'daniel',
    summary: 'A contemporary home arranged around a private courtyard garden, in a quiet street near the river.',
    features: ['Private courtyard', 'Open-plan living', 'Study', 'Garage', 'Near riverside park', 'Unfurnished'],
  },
];

const TESTIMONIALS = [
  { quote: 'From the first viewing to handing over the keys, Halcyon made a complicated purchase feel effortless. They knew every building in the district.', name: 'Elena & Marc Duval', role: 'Purchased a Sky Villa', img: '1438761681033-6461ffad8d80' },
  { quote: 'They found us a tenant in nine days at above asking rent — and the reporting since has been impeccable.', name: 'Richard Okoye', role: 'Portfolio landlord', img: '1472099645785-5658abf4ff4e' },
  { quote: 'Discreet, honest and genuinely well connected. We bought off-market before the property was ever listed.', name: 'Priya Raman', role: 'Purchased in Westridge Hills', img: '1580489944761-15a19d654956' },
];

/* ---------- helpers ---------- */
const fmtPrice = (p) => {
  const money = (n) => '$' + n.toLocaleString('en-US');
  return p.status === 'rent' ? `${money(p.price)}<small> / month</small>` : money(p.price);
};
const fmtPriceShort = (p) => {
  if (p.status === 'rent') return '$' + (p.price / 1000).toFixed(1).replace('.0', '') + 'K/mo';
  return p.price >= 1e6 ? '$' + (p.price / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M' : '$' + Math.round(p.price / 1000) + 'K';
};
