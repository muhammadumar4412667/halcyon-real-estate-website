# Halcyon Estates: luxury real estate website

A multi-page real estate agency website. The home page is a scroll-driven journey that rises through a 52-storey tower (street, then arrival, then club, then residence, then sky pool, then penthouse).

## Pages
| File | What it is |
|---|---|
| `index.html` | Scroll journey hero, intro and stats, interactive tower floor explorer, featured listings, amenities, testimonials, CTA |
| `properties.html` | Listings with Buy/Rent tabs, search, type, bedroom, price and area filters, sorting, and a grid/list view |
| `property.html?id=…` | Property detail: gallery and lightbox, key facts, features, generated floor plan, mortgage calculator, agent enquiry form, similar homes |
| `about.html` | Story, values, timeline, team, press |
| `contact.html` | Contact form, offices, stylised map, FAQ |

Shared on every page: header and full-screen menu, footer, a **Book a viewing** modal with a day/time picker, a shortlist (saved in the browser), and toasts.

## Run it
Any static server works. From this folder:

```powershell
python -m http.server 8000
```

Then open http://localhost:8000. You can also upload the folder as-is to Netlify, Vercel, GitHub Pages or any web host.

## Customise
- **Agency details, listings, agents, testimonials, tower levels:** all in `js/data.js`.
- **Colours and fonts:** CSS variables at the top of `css/style.css`.
- **Photos:** stored in `assets/img` (`<id>.jpg` at 1600px and `<id>-sm.jpg` at 800px; they are Unsplash stock photos). To use your own photography, add your files there and reference them by name in `js/data.js` and the HTML.
- **Forms:** they validate and show a confirmation, but they don't send anything yet. Connect them to Formspree, your CRM or your backend in the `submit` handler in `js/main.js`.

## Tech
Plain HTML, CSS and JavaScript, with no build step. Smooth scrolling uses [Lenis](https://github.com/darkroomengineering/lenis) from a CDN; if it fails to load, the site falls back to native scrolling. Fonts are Cormorant Garamond and Manrope from Google Fonts.
