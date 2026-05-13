# Wedding Website — Design & Build Brief

## Project Overview

A custom wedding website for **Ryan & Katie**, marrying **2nd July 2027 at St Audries Park, Somerset**. The site is a full guest experience — story, photos, all logistical information, and an RSVP form. It needs to feel cohesive with the wedding's overall styling: black tie, moody jewel-toned florals, candlelit elegance.

The site will be a custom build deployed to Netlify, Vercel, or GitHub Pages.

---

## Aesthetic Direction

**Mood**: Editorial, romantic, candlelit, opulent. Think dark academia meets modern editorial wedding magazine. Sophisticated and dramatic, but warm — not cold or sterile. The palette is moody and jewel-toned rather than pastel or rustic.

**Reference points**: High-end editorial wedding photography, Vogue editorial layouts, dark romantic film stills, candlelit interiors.

### Colour Palette

Pulled directly from the bridal bouquet:

- **Deep burgundy / aubergine** (`#4A1A2C` ish) — primary dark
- **Rich magenta / fuchsia** (`#A8326B` ish) — accent
- **Soft dusty blush pink** (`#D4A5A5` ish) — soft accent
- **Plum / deep purple** (`#5B2A4A` ish) — supporting
- **Cream / off-white** (`#F4EDE4` ish) — background / breathing room
- **Charcoal / near-black** (`#1A1416` ish) — text and structural

Use cream or near-black as the dominant background. Burgundy and magenta should feel like accents, not flood-fills. Avoid bright pure white — lean cream.

### Typography

- **Headers**: High-contrast serif. Suggested options: *Cormorant Garamond*, *Playfair Display*, *Didot*, *Bodoni Moda*. The thin/thick contrast is important — it should feel editorial.
- **Body**: Clean modern sans-serif. Suggested: *Inter*, *Lora* (if going serif throughout), *Manrope*, or *DM Sans*.
- **Optional accent**: A light italic serif for pull quotes, captions, or section dividers.

Generous letter-spacing on headers. Generous line-height on body. Type should breathe.

### Imagery Style

- Rich, saturated, slightly moody photography
- Avoid bright, airy, or pastel imagery
- Botanical references can include calla lilies, peonies, tulips in the bouquet palette
- Plenty of whitespace (cream space) around imagery — don't crowd

---

## Site Structure

Single-page scroll with anchored navigation is preferred, with a sticky minimal nav bar at the top. Each section should feel distinct but cohesive.

### Sections (in order)

1. **Hero**
   - Couple's names in large editorial serif
   - Wedding date: 2nd July 2027
   - Venue: St Audries Park, Somerset
   - Optional: countdown timer (days until wedding)
   - Optional: subtle scroll cue

2. **Schedule / Order of the Day**
   - Vertical timeline format
   - Times, event names, brief descriptions
   - (Placeholder times to be filled in later)

3. **Venue & Travel Information**
   - About St Audries Park (brief)
   - Address and postcode
   - Embedded map (Google Maps embed or static styled map)
   - Travel notes: nearest train stations, driving directions, parking info, taxi recommendations

4. **Accommodation**
   - On-site accommodation at St Audries Park
   - Nearby alternatives (with rough price tiers / distance)
   - Booking advice

5. **Dress Code**
   - Black tie
   - Brief note on expectations (tuxedos / black tie for men, formal long/cocktail for women)
   - Optional: a mood-board style strip of imagery

6. **FAQs**
   - Accordion / expandable format
   - Cover: children, dietary requirements, gifts, weather/outdoor portions, photography, timings, transport

7. **RSVP**
   - Form embedded or linked
   - Fields: name(s), attending yes/no, meal choices (2 options per course), dietary requirements, song requests, message to the couple
   - Form submission options below — see "Technical Requirements"

### Sections explicitly NOT included

- Our story / how we met
- Photo gallery
- Gift list / registry

(Note: these may be added later — design the site so additional sections could slot in without breaking the aesthetic.)

---

## Access Control (Gating)

The site should be **password-protected** with a single shared password printed on physical wedding invitations.

**Implementation approach**:
- Simple client-side password gate on first visit
- Once entered correctly, store a token in localStorage so guests don't re-enter on return visits
- Acceptable that this is not high-security (it's a wedding website, not a bank) — the goal is keeping it out of search engines and casual visitors, not defending against motivated attackers
- The password gate should match the site aesthetic, not look like a generic login form — treat it as part of the experience

Also include a `<meta name="robots" content="noindex, nofollow">` tag and a `robots.txt` disallowing all crawlers.

---

## Technical Requirements

- **Framework**: React (or plain HTML/CSS/JS if simpler — designer's call). Should be deployable as a static site.
- **Responsive**: Must look excellent on mobile — many guests will view on phones. Mobile-first considerations especially for the RSVP form and schedule.
- **Performance**: Optimised images, fast load times, smooth scroll
- **Accessibility**: Reasonable contrast (mind the dark palette), semantic HTML, keyboard navigation
- **RSVP form submissions**: Use a serverless form handler — recommend Netlify Forms (if hosting on Netlify), Formspree, or Google Forms embed as fallback. Form data should be delivered to a specified email address.
- **No backend database** — keep it static

---

## Interactive / Optional Touches

Open to designer suggestions, but possibilities:

- Subtle scroll-triggered animations (fade-ins, parallax — used sparingly)
- Animated section dividers (botanical motifs that draw on scroll)
- Hover states with depth (subtle, editorial — not flashy)
- A small floral motif used as a recurring visual signature

Avoid: video backgrounds, autoplaying music, heavy animations, anything that delays load.

---

## Tone of Voice

Warm, personal, slightly formal — matches the black-tie aesthetic but written like real people, not a Victorian etiquette manual. Examples:

- ❌ "Mr & Mrs ___ request the honour of your presence..."
- ❌ "Hey guys! Can't wait to party!"
- ✅ "We're so glad you're celebrating with us. Here's everything you need to know."

---

## Deliverables

1. Full site code (single page with anchored sections)
2. Password gate component
3. Working RSVP form wired to a form handler
4. Deployment-ready (clear instructions for Netlify/Vercel/GitHub Pages)
5. Easy-to-edit content — text and images should be straightforward to swap out as plans firm up

---

## Out of Scope

- Photography (placeholders fine — real photos added later)
- Final copy for FAQs / schedule (placeholders fine)
- Backend / database
- Email automation
- Guest list management
