# SAYAGA STUDIOS — Website Design Prompt

## 1. The One-Line Direction

> Design and build the website for **Sayaga Studios**, a business systems and AI engineering company — not a software agency, not an "AI startup." The site should feel like it belongs to a company that studies businesses before it touches a keyboard: **quiet confidence, editorial restraint, and precision**. Visually, it should sit closer to **fromanother.love, Palantir, Linear, and Stripe** than to a typical dev-shop template — cinematic scroll, oversized type, numbered sections, generous negative space — but coded for a company that runs on rigor, not mood.

The feeling in the first 10 seconds should be:
**"These people understand businesses deeply, and they engineer the systems that make them run better."**
Not: "We build AI apps."

---

## 2. Aesthetic References — What to Borrow, From Where

Two references, two different jobs. **fromanother.love** shapes the narrative sections (hero, philosophy, story). **obys.agency** shapes the proof section (case studies) — because Obys' entire homepage is built on one idea worth stealing outright: *let the work fill the screen and speak for itself, arranged with total structural confidence.*

### From fromanother.love

Study `fromanother.love` for **structure and motion**, not literal content. Specifically borrow:

- **A brief intro sequence on first visit** before the hero reveals itself — see §7a "The System Boots" for Sayaga Studios' own take on this (not a plain percentage counter).
- **Numbered section labels** running down the page like a table of contents made visible — `01 / About`, `02 / What We Do`, `03 / Work`, etc. — small, letter-spaced, positioned in the margin, so the page reads like a dossier, not a landing page.
- **One oversized editorial headline** in the hero that mixes weights/sizes on the same line (e.g. large light serif or condensed sans for most of the sentence, one word bolded or in a contrasting style) rather than a generic "Hero title + subtitle + CTA button" block.
- **Full-bleed horizontal image/logo strips** that marquee slowly on scroll — used here for client/partner logos and case-study thumbnails.
- **Section transitions that feel cinematic**: content doesn't just appear, it enters — mask reveals, slight vertical drift, staggered word-by-word or line-by-line reveal on headlines, smooth easing (nothing bouncy).
- **A footer that behaves like a closing statement**, not a sitemap dump — a large closing line ("Let's build something that runs itself." or similar), then contact details laid out like a letterhead.

What **not** to borrow: fromanother's moodiness/party energy, saturated color grading, and "creative collective" looseness. Sayaga Studios is **operational, not artistic** — the motion language should feel engineered and deliberate, like a systems diagram animating into place, not a film reel.

### From obys.agency

Study `obys.agency` for **how to present proof of work with zero fluff**. Specifically borrow:

- **No hero copy gate before the work** — Obys essentially opens straight into its portfolio grid, scattered across the viewport at different depths, moving at different speeds as you scroll (a true parallax masonry, not a static CSS grid). It reads as "we have nothing to prove with words — look at what we've shipped." Sayaga Studios should use this exact confidence for its **case-study grid**: tiles of different sizes, offset vertically, drifting at slightly different scroll speeds, so the grid feels alive rather than gridded.
- **Category tags that appear only on hover/focus** — each project tile is clean (image + name only) until interaction reveals metadata (Obys shows industry + service, e.g. "Architecture, Furniture / Creative Direction, Web Design"). For Sayaga Studios, hover reveals: *industry + system type* (e.g. "Logistics / Workflow Automation + Internal Dashboard").
- **A live, running index number per tile** (`02`, `04`, `07`...) that isn't sequential-looking but numbered like a catalog — reinforces "this is a body of engineered work," not a blog feed.
- **A view-mode toggle** — Obys lets you switch the grid between "Vertical / Horizontal / Grid." Sayaga Studios can offer a lighter version of this on the case-study index: toggle between *Grid* and *List* (list view shows one case study per row with client, industry, system built, and result metric — good for executives scanning fast).
- **A minimal, almost invisible nav** — Obys' nav is just `Work / About / Contact` plus a live local-time clock ticking in the corner (`CET 00:00 AM`). Steal the **live clock** detail specifically: a small ticking timestamp in the footer or nav (e.g. client's local time zone, or Sayaga Studios' HQ time) — it's a tiny detail that reads as "a company that operates in real time," which is exactly on-brand for an operations company.
- **The closing statement in the footer is plain-spoken, almost dry** ("The studio is shaped by people who care deeply about design and the process behind...") — no hype. Sayaga Studios' footer copy should match that restraint rather than escalate into a sales pitch.

What **not** to borrow: Obys has literally no explanatory text on the homepage — that works for a portfolio-first design studio but would undersell Sayaga Studios' actual differentiator (the *discovery-before-build* methodology). Keep fromanother's narrative sections intact; just inject Obys' grid confidence into the proof section.

---

## 3. Navigation

Keep it almost invisible, Obys-style: wordmark left, three links right — `Work / About / Contact` — no dropdowns, no mega-menu. On scroll, the nav can shrink to just the wordmark + a hamburger, or stay fixed but fade to near-transparent until hovered. No sticky "Book a call" button screaming from the corner — the CTA lives in the hero and footer, not chasing the user down the page.

---

## 4. Brand Identity

**Name:** Sayaga Studios
**Category:** Business Systems & AI Engineering
**Positioning line:** *"We study businesses before we build software."*
**Tagline options** (pick one for hero, use others as section pull-quotes):
- "We don't sell AI. We solve operational problems."
- "Business understanding comes first. Technology is the medium."
- "Systems that make businesses run faster, smarter, and more predictably."

**Tone of voice:** Declarative, short sentences, confident understatement. Lots of one-line paragraphs used as rhythm (mirrors the source material's own style — short punchy negations: "We're not selling AI. We're not selling websites."). No exclamation points. No "revolutionary," "cutting-edge," "game-changing."

---

## 5. Visual System

### Palette — "Royal, not corporate"
A dark, editorial base with a single warm metallic accent — think ink and brass, not navy-and-blue-gradient SaaS.

| Role | Color | Notes |
|---|---|---|
| Base / background | `#0B0C0E` near-black charcoal | primary canvas |
| Secondary surface | `#141519` | cards, panels |
| Primary text | `#F4F2EC` warm off-white | not pure white — feels printed, not screen-lit |
| Muted text | `#8B8D93` | captions, section numbers, metadata |
| Accent (royal) | `#C9A24B` muted brass/gold | used sparingly — underlines, section numerals, hover states, one word per headline |
| Hairline / borders | `rgba(244,242,236,0.08)` | thin 1px dividers, never heavy boxes |
| Optional light mode | `#F7F5F0` bg / `#0B0C0E` text | offer as a toggle if scope allows, mirrored motion language |

Rule: **one accent color, used like punctuation** — never more than one accented element per screen. This is what keeps it "royal" instead of "startup gradient."

### Typography
- **Display / headline face:** a high-contrast serif or condensed grotesk with editorial gravity — e.g. *Söhne Breit / GT Super / Canela / Reckless Neue* class of typeface. Big, tight leading, tight tracking on large sizes.
- **Body / UI face:** a clean neutral grotesk — e.g. *Inter, Neue Montreal, Suisse Int'l*. Generous line-height (1.6+) for body copy, wide letter-spacing (0.08–0.12em) on labels/eyebrows and section numbers.
- Headlines mix weights: majority in a light/regular weight, **one phrase bolded or accent-colored** per headline to create a focal point (e.g. "We study businesses **before** we build software.")
- Numerals (section index, stats) get their own monospaced or tabular-figure treatment — small, brass-colored, letter-spaced.

### Layout & Grid
- 12-column grid, wide gutters, generous outer margins (min 6–8vw on desktop).
- Sections are tall — allow content to breathe with 100–150vh of scroll per major section rather than cramming.
- Left margin reserved for the running numbered index (`01`, `02`...) that highlights/fills as the user scrolls past each section — a persistent spine down the page.
- Asymmetric compositions: text block offset against whitespace, not centered-everything.

### Motion & Transitions
- Smooth-scroll library (Lenis or equivalent) for inertial, weighted scrolling.
- Preloader: percentage counter (0→100), thin horizontal progress hairline, brass accent, then a vertical wipe or fade-scale into the hero.
- Headline reveals: lines/words fade + rise (8–16px translateY, 400–600ms, ease-out) staggered ~40ms apart.
- Section numerals in the spine: dim by default, animate to full opacity + brass color when their section is in viewport.
- Image/logo marquees: slow, linear, infinite scroll, pause on hover.
- Micro-interactions: underline draws left-to-right on link hover; buttons get a 1px brass border that expands from center; cursor can optionally have a small trailing dot/label ("View," "Read") on hover over cards — subtle, not gimmicky.
- No parallax gimmicks, no confetti, no bounce easing anywhere. Every transition should look like it was engineered, not decorated.

---

## 6. Site Structure & Section-by-Section Content

Use the numbered-spine pattern throughout. Content below is drawn directly from Sayaga Studios' positioning — adapt copy length to fit the editorial layout (short lines, lots of whitespace) rather than pasting paragraphs verbatim.

### `00` — Preloader
Percentage count-up, wordmark centered, brass hairline progress bar.

### `01` — Hero
- Eyebrow label: "Business Systems & AI Engineering"
- Oversized editorial headline, word-staggered reveal:
  *"We study businesses **before** we build software."*
- One supporting line beneath, muted color: "We don't sell AI. We don't sell websites. We solve operational problems."
- Minimal CTA: a single understated link/button — "Start a conversation →"
- Faint animated line/diagram in the background (a workflow line drawing itself) rather than a stock hero image.

### `02` — Philosophy
Short manifesto block, large line-height, staggered reveal, one paragraph at a time as user scrolls (pinned section with copy swapping):
- "Technology should never come first."
- "Every company is different. Every bottleneck is different."
- "We don't recommend AI because it's trendy. We recommend what creates measurable impact."

### `03` — What We Actually Do (the process spine)
Present as a vertical numbered sequence (mirrors fromanother's "01 Direction / 02 Digital / 03 Offline" pattern), each with a short description, revealed on scroll:
1. **Business Discovery** — goals, teams, workflows, bottlenecks, KPIs.
2. **Workflow Mapping** — visualize the client's real operating flow (use an animated flow-diagram: Sales → Qualification → Proposal → Approval → Delivery → Support → Renewal).
3. **Bottleneck Analysis** — the friction points named plainly (slow onboarding, manual reporting, spreadsheet dependency, approval delays).
4. **Solution Design** — AI agents, internal platforms, dashboards, automation, CRM/ERP integrations.
5. **Build** — production systems, not prototypes.
6. **Deploy** — integrations, permissions, security, training, monitoring.
7. **Continuous Improvement** — usage, feedback, new bottlenecks.

Consider rendering step 2's workflow as a live animated SVG diagram (line drawing connecting nodes) — this is the single moment on the page where "systems thinking" becomes visible, not just claimed.

### `04` — What We Build
Grid of capability cards (AI Systems / Automation / Custom Software / Integrations), minimal — icon or numeral, title, 1-line description. Hover state: brass underline + card lifts 2–4px, no shadow drama.

### `05` — Featured Work / Case Studies (Obys-mode section)
This is the section where the site changes register — from editorial storytelling to raw proof. Break the vertical spine rhythm here and go full-bleed:

- A **scattered parallax masonry grid** of case-study tiles, varying sizes (some tall, some wide, some square), drifting at slightly different scroll speeds so the grid feels dimensional, not flat.
- Each tile: image only, clean, no text overlay by default. On hover (desktop) / tap (mobile): project name fades in, plus a two-line tag pair — *Industry* / *System Built* (e.g. "Logistics · Workflow Automation, Internal Dashboard") — mirroring Obys' hover-reveal metadata pattern.
- A small **catalog-style index number** per tile (non-sequential styling, e.g. `04`, `11`, `23`) in the corner, brass-colored, tiny.
- A **Grid / List toggle** above the section: Grid is the default scattered masonry; List collapses into rows — client, industry, system built, one result metric — for executives who want to scan fast rather than browse visually.
- No marquee needed here — this section earns its full-bleed real estate through the parallax scatter itself rather than a scrolling strip.

### `06` — Industries
Understated list/marquee of sectors served (Manufacturing, Logistics, Finance, Healthcare, Retail, etc.) — treat as a horizontal ticking strip or a quiet typographic grid, not icon cards.

### `07` — Our Difference (pull-quote section)
Full-width statement, centered, large type, on a contrasting (lighter or inverted) panel to break rhythm:
*"Most companies ask, 'What do you want us to build?' We ask, 'Why does this problem exist in the first place?'"*

### `08` — Partner Network
For consultants, agencies, fractional COOs, VCs, etc. Present as a clean 4-step horizontal process (Identify → Discovery → Build → Everyone wins) plus a short benefits list (white-label delivery, revenue share, long-term collaboration).

### `09` — They Trust Us
Logo strip marquee (client/partner logos), same treatment as fromanother's brand wall — grayscale logos, full opacity on hover only.

### `10` — Closing CTA / Footer
Large closing editorial line, own full screen:
*"Let's build the system that runs your business — before your competitors do."*
Beneath: contact email treated typographically large, office/location details laid out like a letterhead (label + value pairs), a small **live ticking local-time clock** (Obys detail — quietly signals "we operate in real time"), social links understated, and one dry, plain-spoken closing paragraph (no hype, Obys-style) instead of a second sales pitch. Copyright line small and muted.

---

## 7. Technical Notes for the Build

- Stack: Next.js (App Router) + Tailwind for utility styling + Framer Motion for scroll-triggered reveals + Lenis for smooth scroll.
- All motion should respect `prefers-reduced-motion`.
- Mobile: collapse the numbered spine into a slim top progress indicator; keep headline staggering but shorten reveal distances; marquees remain but slow further.
- Performance: lazy-load case-study imagery, keep the preloader skippable/short (cap at ~1.5s even if assets aren't fully loaded) so it never feels like a gate.
- Keep every screen to **one accent-color moment** — this single rule does more than any component library to keep the site feeling "royal" instead of "generic dark-mode SaaS."

---

## 7a. Intro Animation — "The System Boots" (unique preloader concept)

fromanother.love's loader is a simple percentage count-up. Steal the *feeling* — a brief, controlled moment before the site reveals itself — but give Sayaga Studios its own mechanic, one that dramatizes the brand idea ("we study businesses, then we build the system") instead of just showing a number.

**Concept: the page assembles like a system coming online, not like a page loading.**

Sequence (aim for 2.2–3.0s total, skippable after 1.5s or on any keypress/click):

1. **0.0s** — Screen is the base charcoal (`#0B0C0E`), completely empty except a single thin brass hairline positioned dead-center, 1px tall, 0% width.
2. **0.0–0.6s** — The hairline extends left-to-right to about 40% width, silently — no numbers yet. This reads as "a line being drawn," not a progress bar.
3. **0.6–1.2s** — Small nodes (2–3px brass dots) appear at intervals along the line, one at a time, each with a soft pop-in (scale 0→1, 120ms). As each node appears, a thin vertical tick drops from it and a tiny monospace label fades in above — cycle through real fragments of the methodology, fast, almost subliminal: `DISCOVER` → `MAP` → `BUILD` → `DEPLOY`. Each word holds ~150ms then is replaced by the next (not stacked — this is a single label position cycling, like a status readout).
4. **1.2–1.6s** — The line completes to 100% width and the final label locks on **`SAYAGA STUDIOS`** in the display typeface, brass, centered on the line, slightly larger than the status words were.
5. **1.6–2.2s** — The entire line + wordmark scales down slightly and drifts to where the nav logo will sit (or simply fades if a repositioning animation is too complex to ship well), while the background begins a soft radial fade from charcoal to the hero section underneath. The hero headline begins its word-stagger reveal *before* the loader has fully finished fading — the two motions should overlap by ~300ms so the transition feels continuous, not like two separate events stitched together.

**Why this is different from fromanother's:** theirs communicates "content is loading" (a percentage). This one communicates "a system is assembling itself, step by step" — which is the actual product Sayaga Studios sells. It's a 3-second demonstration of the brand thesis before a single word of copy is read.

**Variant if you want it even more minimal:** drop the word-cycling entirely and keep only the line-drawing + node-pop + wordmark-lock. Still distinct from a percentage counter, much cheaper to build, and arguably more "classy" — fewer moving parts reads as more confident.

**Build notes:**
- Implement with GSAP timeline or Framer Motion `useAnimation` sequencing — avoid CSS-only if you want the label-cycling to feel precise.
- Respect `prefers-reduced-motion`: on that setting, skip straight to a 400ms opacity fade, no line/node choreography.
- Cache with a session flag so returning visitors within the same session don't see the full sequence again — show only the 400ms fade variant on subsequent page loads.
- Keep the color strictly to charcoal + brass + off-white — no gradient, no glow/blur effects on the line. The classiness comes from restraint: one thin line, precise timing, nothing decorative.

---

## 7b. Reveal Mechanic — "Rounding Squares" (offmenu.design layer)

offmenu.design opens with content that arrives as tight, small rounded-corner shapes — pills/squircles — which then expand and relax their corner radius as they grow into full panels/cards, so the whole page feels like it's unfolding out of soft geometric seeds rather than sliding or fading in. Borrow that **corner-radius morph** as the mechanic that carries you *out* of the "System Boots" line sequence and *into* the hero and section content — a second, distinct layer on top of what you already have, not a replacement.

**How it works, adapted for Sayaga Studios:**

1. Right as the brass line/wordmark from §7a locks and begins fading (~1.6s mark), the hero content — headline block, hero visual, nav items — is *already present* in the DOM but clipped inside small rounded shapes: tight squircles (border-radius ~40–50% of their own size), scaled down to ~20–30% of final size, centered roughly where each element will land.
2. Each shape **expands to its true size while its border-radius eases down** from squircle (soft, almost circular) to the site's standard card radius (a crisp 6–10px) — corner-radius and scale animate on the *same* timeline so the shape visibly "relaxes" from round to rectangular as it grows, not two separate steps.
3. Stagger by element: hero headline lines first, hero visual second (~80–120ms delay), nav items last, trailing in from the top almost like they're locking into a frame. Easing should be a confident `cubic-bezier(0.22, 1, 0.36, 1)` — fast out, gentle settle — no bounce, no overshoot.
4. Apply this same mechanic later, more subtly, to **case-study tiles in the Obys-mode grid (§6, section `05`)** as they enter the viewport on scroll — each tile pops in as a small squircle and relaxes into its final rectangular crop. This ties the homepage's opening move to its proof section, so the motion vocabulary feels authored rather than borrowed piecemeal.

**Why combine it with §7a instead of picking one:** the brass line sequence establishes the *idea* (a system assembling); the rounding-squares mechanic establishes the *texture* (soft, confident, premium) that the rest of the site's motion will live in — especially useful the scroll-triggered reveals in the proof section, which otherwise risk feeling repetitive if every tile just fades and rises.

**Build notes:**
- CSS `border-radius` + `transform: scale()` animated together via Framer Motion `variants` or GSAP, timed against the same master timeline as §7a rather than firing independently.
- Keep the squircle "seed" state genuinely small (not just a rounded version of the final size) — the visual drama comes from the size change, not just the corner softening.
- Same `prefers-reduced-motion` fallback as §7a: skip straight to final state, no morph.

---

## 7c. Imagery Direction — "Too Aesthetic to Be Generic"

The site's imagery needs to carry as much brand weight as the typography — flat stock photos will undo everything the motion and type system are doing. Direction:

- **Case-study/hero visuals:** dark, editorial, high-contrast photography — the kind that reads as shot for a design annual, not licensed from a stock library. Think moody architectural interiors, dramatic single-light-source compositions, brutalist or minimalist spaces with strong negative space for text to sit over. (Reference mood: search "moody minimalist architecture editorial photography" or "dark modern office interior editorial photography" for the right register — dim, warm-toned, one dominant light source, lots of shadow.)
- **Never** use bright, evenly-lit corporate stock photos (people pointing at whiteboards, handshakes, laptop-in-cafe shots) — this is the single fastest way to make the site feel like every other agency.
- **Section `03` workflow diagram:** should be a custom-drawn animated line diagram, not a photo — keep it graphic, not photographic, so it doesn't compete with the case-study imagery.
- **Section `05` case-study tiles:** real client work screenshots/photography, color-graded to sit within the site's charcoal/brass palette even if the original work is more colorful — a subtle duotone or desaturation pass on hover-off state keeps the grid cohesive; full color can reveal on hover.
- **Team/office imagery (if used at all):** one or two shots max, same dark-editorial treatment as case studies — never a generic "team high-fiving" photo.
- **Texture accents:** if you want a background texture anywhere (footer, section dividers), keep it subtle — fine grain/noise over charcoal, or a very faint brass-toned abstract render — never a loud gradient mesh.

---

## 8. What to Explicitly Avoid

- Stock photography of people in blazers shaking hands.
- Gradient-mesh hero backgrounds, glassmorphism cards, neon glow buttons — the current "AI startup" visual cliché.
- Testimonial carousels with 5-star icons.
- Dense feature-grid sections with 12+ icon cards — Sayaga Studios earns trust through clarity and restraint, not volume of claims.
- Anything that reads as "we build chatbots." The site should never use the word "chatbot."
- Don't let the Obys-style case-study grid sprawl across the whole homepage the way it does on obys.agency — there, it *is* the homepage; here, it's one act in a four-act structure (hero → philosophy → process → proof → close). Keep it to one full-bleed section, not the entire page.

---

## 10. Type Scale, Spacing & Responsive System

### Type Scale

| Name | Desktop Size | Mobile Size | Weight / Style | Notes |
|---|---|---|---|---|
| Display XL | `5.5rem` (`88px`) | `3.5rem` (`56px`) | Regular/Light Serif, tight leading | Hero headlines |
| Display L | `4.25rem` (`68px`) | `2.75rem` (`44px`) | Regular/Light Serif | Major section headers |
| Display M | `3.25rem` (`52px`) | `2.25rem` (`36px`) | Regular/Light Serif | Small section headers |
| Heading | `1.75rem` (`28px`) | `1.5rem` (`24px`) | Medium Sans | Component/Card titles |
| Body L | `1.25rem` (`20px`) | `1.15rem` (`18px`) | Light Sans, leading 1.6 | Introductory copy |
| Body | `1.0rem` (`16px`) | `0.95rem` (`15px`) | Regular Sans, leading 1.6 | Standard copy |
| Caption / Label | `0.8rem` (`12.8px`) | `0.75rem` (`12px`) | Mono or wide Sans | Metadata, categories |
| Micro | `0.65rem` (`10.4px`) | `0.65rem` (`10.4px`) | Mono, uppercase, wide | Ticking clock, minor stats |

### Spacing Scale

Based on an 8px base unit grid.

| Variable | Value | Notes |
|---|---|---|
| `space-xxs` | `4px` | Tiny borders, node dot offsets |
| `space-xs` | `8px` | Catalog index positions |
| `space-sm` | `16px` | Tag grid gutters, inline labels |
| `space-md` | `24px` | Card content padding, minor gaps |
| `space-lg` | `48px` | Section margins, header spacing |
| `space-xl` | `96px` | Large spacing between content groups |
| `space-xxl` | `144px` | Full section dividers |

### Breakpoints

- Mobile: `<640px` (or standard `sm`)
- Tablet: `640px` to `1024px` (or standard `md`)
- Desktop: `1024px` to `1440px` (or standard `lg`/`xl`)
- Wide: `>1440px` (or standard `2xl`)

---

## 11. Component States, Forms, Accessibility & SEO

### Component States

- **Standard Buttons**: expanding 1px brass borders, starting from center.
- **Link Hover**: draw thin underline left-to-right.
- **Form Fields**: label floats upwards slightly on focus, border turns brass.

### Forms

- Business path fields: Name, Company, Current Workflow Friction, Scoping Budget.
- Partner path fields: Name, Focus Area (Design/Fractional Ops/VC), Proposal for Collaboration.

### Accessibility

- Focus Trapping: Full-screen menu traps Tab key, closes on Escape, restores focus to menu button trigger.
- Color Contrast: captions must exceed 4.5:1 ratio over charcoal background.
- Live Clock: exclude from screen-reader announcement updates (`aria-live="off"`) so users aren't interrupted by clock ticks.

### SEO

- Homepage Title: `Sayaga Studios — We study businesses before we build software.`
- Case study metadata, structured schema.
