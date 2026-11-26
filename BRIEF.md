# Mahmoud Ramadan — Portfolio Website · Build Brief

> **For Claude Code.** This brief is the single source of truth for building Mahmoud's portfolio website. Everything here was decided with Mahmoud over a long planning session. Build from it. Don't invent facts, numbers, titles or dates. Where something is missing, it is marked **`TODO`**. Leave it visibly marked in dev builds and hide it in production until Mahmoud fills it.
>
> All assets are in `./assets/` (see §13).

---

## 0. Ground rules for the build

1. **Design quality is the #1 priority.** Style, typography, colors and smooth, satisfying motion matter more than anything else (§4 and §5). Take your time on them.
2. **Honesty rules are not optional.** Read §12 before writing or changing any copy.
3. **All copy is in English**, written in "lite English" (around B2 level): short sentences, simple words. It should read like a real person wrote it, not polished marketing copy. First person ("I"). No buzzwords: avoid *leverage, synergy, passionate, results-driven, cutting-edge, unlock, elevate*.
4. **The case copy in §9 is a draft** based on what Mahmoud told me. Keep the facts exactly as written. Mahmoud will edit the wording himself, so keep all copy in content files (Markdown), never hard-coded in components.
5. **Ask Mahmoud** before changing any fact, number, title, date or the case order.

---

## 1. Goal & audience

- **What it is:** Mahmoud's new portfolio. It replaces his old PDF portfolio (`assets/reference/old-portfolio.pdf`).
- **Who it's for:** HR and hiring managers at companies he applies to. They open it from LinkedIn or a job application, **mostly on mobile**, and spend 1–2 minutes.
- **Goal:** In 10 seconds they should know who he is and what he does. In 2 minutes they should have seen proof (numbers + real work) and know how to contact him or download his CV.
- **Language:** English only. Arabic work samples appear as images with an "Arabic content" label.
- **Hosting:** GitHub Pages (static site).

---

## 2. Positioning

| | |
|---|---|
| **Name** | Mahmoud Ramadan *(use this spelling everywhere; the old PDF said "Mahmod Ramdan")* |
| **Title** | Digital Marketing Specialist |
| **Hero line** | **From the brief to the dashboard, I handle the full marketing cycle.** |
| **Sub-line** | Digital Marketing Specialist · 6+ years · Egypt & UAE |
| **Core strength** | End-to-end marketer: he runs the whole cycle hands-on (research → positioning → content → media buying → analysis & scaling), plus client and team handling. |
| **Hidden niches** (use in filters/tags, not in the hero) | **EdTech** (Learn It, Creativa, Big O, MEC Academy, programming tutor) and **B2B** (E-Spaces, AppLogica, Space Minders, concrete-company proposals). |

### The cycle ("How I work"), used site-wide

| # | Stage | One-line description (draft) |
|---|---|---|
| 1 | Research & Analysis | Market, audience and competitor research before any plan. |
| 2 | Positioning & Pricing | What we say, to whom, and at what price. |
| 3 | Content Strategy | Content pillars, angles, plans and calendars. |
| 4 | Media Buying | Media plans and full-funnel Meta campaigns. |
| 5 | Analysis & Scaling | Read the dashboards, cut what doesn't work, scale what does. |
| 6 | Client & Team | A clear brief in, clear tasks out. Fewer edits, faster delivery. |

These 6 stages are used three ways: the **How I Work** section on Home, the **stages strip** on every case page (stages used in that case are lit), and the **filters** on the Work page.

---

## 3. Tech

- **Framework:** Astro (static output) + TypeScript. Content in **Astro content collections**: one Markdown file per case in `src/content/cases/`. Site-wide data (timeline, proof bar, brands, contact) goes in `src/data/*.json` or `.ts`.
- **Styling:** plain CSS with design tokens (CSS custom properties). No UI kit.
- **Motion:** GSAP + ScrollTrigger, and Lenis for smooth scroll. Astro View Transitions for page transitions. (Details in §5.)
- **Deploy:** GitHub Pages via the official Astro GitHub Action. Set `site`/`base` correctly. If the repo is not `<user>.github.io`, `base` must be the repo name.
- **Contact:** no backend. Use `mailto:` and a `wa.me` WhatsApp link.
- **Images:** convert all PNG/JPG to WebP or AVIF at build time (Astro `<Image>`). Lazy-load everything below the fold. Always set width/height (no layout shift).
- **SEO/social:** proper `<title>`/meta description per page, Open Graph image (use `assets/brand/portrait-square.jpg` with name and title), favicon (initials "MR" in the accent color).

---

## 4. Design system

**Direction:** build on Mahmoud's existing identity from his PDF portfolio. That means dark background, huge condensed uppercase headings, clean Poppins body text, a black-and-white portrait and thin outlined "pill" labels. Add **one** accent color. The feel should be editorial, confident and premium: a magazine, not a SaaS landing page.

Open `assets/reference/old-portfolio.pdf` and study it before you start.

### 4.1 Colors (tokens)

```css
:root {
  --bg:          #0A0A0B;  /* near-black, matches the portrait's background so the photo blends in */
  --bg-elev:     #141518;  /* cards, panels */
  --surface:     #1C1E22;  /* hover states, inputs */
  --line:        rgba(255,255,255,.12);  /* borders, dividers, pill outlines */
  --text:        #F2F2EF;  /* main text (warm off-white, not pure white) */
  --text-muted:  #9EA0A6;
  --accent:      #C8F04B;  /* acid lime, chosen accent */
  --accent-ink:  #0A0A0B;  /* text on accent */
}
```

- **Accent usage is strict:** only for big result numbers, lit stages, active filters, links on hover, the scroll-progress bar and the primary button. Never for large background areas. Never for body text.
- **Alternative accent** (swap the token only if Mahmoud asks): electric blue `#3D7BFF`.
- **Never use orange** as the accent. It reads as Xiaomi's brand color.
- **Background texture:** like the PDF (`assets/brand/bg-texture-reference.png`), use a very soft radial light glow (white at 3–5% opacity, top-left) plus a subtle film-grain/noise overlay (SVG `feTurbulence` or a tiny tiled PNG, ~4% opacity). It must stay subtle.

### 4.2 Typography

| Role | Font | Notes |
|---|---|---|
| **Display** (hero name, section titles, big words) | **Anton** (Google Fonts, free) | The PDF used *Extenda 40 Hecto*, a commercial font. Anton is the closest free match. If Mahmoud buys an Extenda web license, swap it in. Always UPPERCASE, line-height 0.88–0.95, letter-spacing −0.5%. |
| **Body & UI** | **Poppins** 300 / 400 / 500 / 600 | Same as the PDF. |
| **Big numbers** (results, proof bar) | Anton, with `font-variant-numeric: tabular-nums` | Tabular figures stop count-up animations from jittering. |

Type scale (fluid):

```css
--fs-mega: clamp(72px, 15vw, 240px);  /* hero name, giant section words */
--fs-h1:   clamp(44px, 7vw, 104px);
--fs-h2:   clamp(32px, 4.6vw, 60px);
--fs-h3:   clamp(22px, 2.4vw, 30px);
--fs-body: clamp(16px, 1.15vw, 18px);  /* line-height 1.65 */
--fs-small: 14px;
```

Self-host the fonts (subset, `font-display: swap`, preload the display font).

### 4.3 Layout

- 12-column grid, max content width 1280px, gutters 24px (16px on mobile).
- Big vertical rhythm: section spacing `clamp(96px, 12vw, 180px)`.
- Design **mobile-first** and test at 375px before desktop.

### 4.4 Signature components

1. **Outline pills:** 999px radius, 1.5px `--line` border, Poppins 500, small caps or uppercase. Used for dates, roles, tags and stages, exactly like the date pills in the PDF. A lit stage pill gets an accent fill and `--accent-ink` text.
2. **Giant words:** section titles set in `--fs-mega`, sometimes cropped by the viewport edge, like "EXPERIENCE" and "CONTACT ME" in the PDF.
3. **Hero composition:** the black-and-white portrait (`portrait-hero-tall.jpg`) on the right or center. Its edges fade into `--bg` with a CSS `mask-image` gradient (bottom and sides), so there is no visible photo box. The name "MAHMOUD RAMADAN" in `--fs-mega` sits **in front of** the lower part of the photo, overlapping it (editorial cover style). The hero line goes under it, then the sub-line and 2 buttons. On mobile, stack: photo → name overlapping its bottom → line → buttons.
4. **Case cards:** image or logo area plus company name, a one-line headline result, stage pills and an industry tag. Rounded 16px corners, `--bg-elev` background, 1px `--line` border.
5. **Stat cards:** a big Anton number in accent, a label in muted Poppins and a small "before → after / timeframe" line.
6. **Buttons:** primary has an accent fill; secondary has a 1.5px outline. Both are pill-shaped.

---

## 5. Motion spec (smooth and satisfying)

**Principles:** Motion should feel calm, confident and premium. Things *ease out* as they arrive, never bounce. Every animation helps reading or rewards attention, and none blocks content. Only animate `transform` and `opacity`, to hold 60fps on a mid-range Android phone.

### 5.1 Tokens

```css
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);   /* default for entrances */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* for scrubbed/looping motion */
--dur-fast: 200ms;   /* hovers */
--dur-base: 650ms;   /* reveals */
--dur-slow: 950ms;   /* hero, big titles */
--stagger: 70ms;
```

### 5.2 Global

- **Smooth scroll:** Lenis (`lerp: 0.1`, `smoothWheel: true`). Synced with GSAP ScrollTrigger. Disabled on touch devices: native scroll feels better there.
- **Default reveal:** elements fade in and move up 24px, `--dur-base`, `--ease-out`, start when the element top reaches 85% of the viewport, run once. Children stagger by `--stagger`.
- **Giant titles:** line-by-line mask reveal. Each line slides up from `yPercent: 100` inside an `overflow: hidden` wrapper, `--dur-slow`, with a stagger of 80ms.
- **Page transitions:** Astro View Transitions. A case card's image or logo morphs into the case page header (shared element via `transition:name`). Everything else cross-fades in 300ms.
- **Scroll progress bar:** a 2px accent bar at the top on case pages.

### 5.3 Hero load sequence (~1.6s total, content readable from ~0.6s)

1. 0.0s: background glow and grain fade in (400ms).
2. 0.1s: portrait fades in and settles from `scale 1.04` to `1`, `y 12px` to `0` (1.2s, `--ease-out`).
3. 0.25s: name lines rise through a mask (`--dur-slow`, stagger 80ms).
4. 0.6s: hero line reveals word by word (stagger 25ms per word).
5. 0.9s: sub-line and buttons fade up.
6. 1.3s: a small "scroll" cue fades in and gently loops.

On scroll, the portrait drifts slightly slower than the page (parallax 8–10%, desktop only).

### 5.4 Per section

- **Proof bar numbers:** count up from 0 over 1.2s with `--ease-out` when visible. Keep symbols and suffixes ("EGP", "M+", "K+", "%") static so they don't flicker.
- **How I Work:** the 6 stages light up one after another (accent fill sweeps left to right inside each pill, stagger 120ms) as the section enters.
- **Featured cards:** on hover (desktop), the card lifts `translateY(-6px)`, the image scales to 1.04 over 600ms, the border turns accent, and an arrow slides in. Optional: a small "View case" cursor bubble that follows the pointer over cards (desktop only, eased follow).
- **Experience timeline:** the vertical line *draws* as you scroll (scrubbed `scaleY` from 0 to 1, origin top). Items reveal as the line reaches them.
- **Brands strip:** infinite marquee, slow (~40s loop), pauses on hover. Logos are grayscale at 60% opacity and go to full color on hover.
- **Case pages:** the header appears with the morph transition. Result numbers count up. The stages strip lights up. Work-sample images fade and settle as they scroll in.

### 5.5 Don'ts

- No bounce or elastic easing. No spinning. No typewriter effect for long text.
- No intro or loading screen that hides content for more than about 0.6s.
- No scroll-jacking or horizontal-scroll traps. No parallax on body text.
- No autoplay sound.

### 5.6 Reduced motion (`prefers-reduced-motion: reduce`)

Turn off Lenis, parallax, count-ups (show final numbers), the marquee (static grid) and the line-draw. Keep only simple 200ms fades.

### 5.7 Performance budget

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- LCP under 2.5s on 4G. The hero portrait is the LCP element, so preload it and serve it as AVIF/WebP.
- JS: lazy-init GSAP and ScrollTrigger and keep the total small.

---

## 6. Sitemap & navigation

```
/                      Home (all main sections)
/work                  All cases + filters
/work/<slug>           One page per case (9 cases)
/lab                   Research & strategy work (Xenah)
/cv.pdf                Downloadable CV  (TODO: updated CV, see §14)
```

- **Nav (sticky, minimal):** `Work · How I work · Experience · Contact`, plus a **Download CV** pill button. Logo/home: "MR" or the full name.
- On mobile: a full-screen menu with giant Anton links that reveal with stagger.
- **No separate About page.** About is a section on Home.
- **Work filters:** two filter rows. **Stage** (the 6 stages) and **Industry** (`EdTech`, `B2B`, `Retail & F&B`, `Consumer Tech`). Cards animate in and out with a smooth layout transition (FLIP).

---

## 7. Home page: sections in order

1. **Hero:** see §4.4.3. Buttons: **View my work** (scrolls to Featured) and **Download CV**.
2. **Proof bar:** 5 stats, count-up. Each stat clicks through to its case.
   - `EGP 1.2M+`: sales in 3 months, MEC Academy *(TODO: confirm "total sales" vs "from ads", see §14)*
   - `10K+`: followers, built from zero, organic: Creativa
   - `1 → 8`: from first social hire to a team of 8: E-Spaces
   - `7`: UAE clients: Ali Alkhajeh Marketing
   - `500+`: messages per shift, 100% response rate: Xiaomi
3. **Featured Work:** 4 big cards: MEC Academy, Programming Tutor, Creativa, E-Spaces. Link: "See all work →".
4. **How I Work:** the 6-stage cycle (§2).
5. **Experience:** the two-track timeline (§10).
6. **About:** 3–4 lines. Draft:
   > I started in tech: 3 years at the Faculty of Computers & AI, Cairo University. Then I moved to Commerce to study marketing. That mix still shapes how I work. I can talk to tech people, and I can sell to everyone else. I started as a student intern at Xiaomi. Today I plan and run full marketing cycles for academies, agencies and B2B brands in Egypt and the UAE.
7. **Brands I've worked with:** logo marquee (§11). Each logo links to the brand's page.
8. **Testimonials:** **hidden until at least 2 exist** (TODO, see §14).
9. **Contact:** a giant "LET'S TALK" title. Email, WhatsApp, LinkedIn, Download CV.
   - Email: `mahmodrf25@gmail.com`
   - Phone/WhatsApp: `+20 11 249 41 148` → `https://wa.me/201124941148`
   - LinkedIn: `https://www.linkedin.com/in/mahmod-ramdan/`
   - Location: Giza, Egypt

---

## 8. Case page template

Every case page uses this structure (all labels in English):

1. **Header:** company name (**clickable**, opens the company's page in a new tab, links in §11; plain text if no link) · role · type pill (Full-time / Freelance / Part-time) · dates pill · industry tag · logo.
2. **Headline result:** one big sentence with the strongest result.
3. **Stages strip:** the 6 stage pills. The ones used in this case are lit.
4. **Context:** 2–3 lines on the situation when he joined.
5. **Challenge:** the real problem.
6. **Key insight:** a highlighted callout box with the one idea or decision that changed things.
7. **What I did:** bullets. Keep "did it myself" separate from "led / coordinated".
8. **Results:** stat cards. Every number gets context (before → after, timeframe).
9. **Work samples:** images **shown as they are** (they are NOT linked to the original posts). Captions under each. Dashboards get their date range in the caption. Arabic samples get an "Arabic content" pill.
10. **What I learned:** 1–2 lines, **Featured cases only**.
11. **Next case →:** a big link to the next case, with the morph transition.

**Variants:**
- **Research / Strategy case** (Xenah): Results becomes **"What went live"**, and Key insight is the main section.
- **Confidential case** (Ali Alkhajeh): Work samples becomes **"How I work"** (the method, no client content), plus the note: *"Client work is confidential under agency policy."*

---

## 9. Case content (drafts)

Create one Markdown file per case with this frontmatter:

```yaml
slug: mec-academy
company: MEC Academy
companyUrl: https://www.facebook.com/mecacademyegy
logo: /assets/logos/mec-academy.png
role: Media Buyer
roleNote: "In practice: I led the full marketing function."
type: Part-time
dates: "May 2026 – Dec 2026"
industry: [EdTech]
stages: [research, positioning, content, media, analysis, client]
featured: true
order: 1
```

### 9.1 MEC Academy (Featured #1)

- **Company:** MEC Academy · https://www.facebook.com/mecacademyegy
- **Role:** Media Buyer · Part-time · May 2026 – Dec 2026 *(TODO: the old CV says Mar 2026; Mahmoud said May 2026, so use May unless he corrects it)*
- **roleNote:** In practice: I led the full marketing function.
- **Industry:** EdTech · **Stages:** all 6

**Headline:** From near-closure to EGP 1.2M+ in sales in 3 months.

**Context:** MEC Academy has taught tech since around 2021. In late 2025, the business dropped hard. It got so small that the company was close to shutting down.

**Challenge:** I joined as a freelance media buyer. But I saw quickly that ads alone would not fix it. The base was broken: the brand had lost its presence, there was no video, and there was no real link with the student community.

**Key insight:** Before spending more on ads, bring the brand back. The academy had a strong name in its best days, so I built on that nostalgia and put the brand back in front of its community.

**What I did:**
- Rebuilt the marketing funnel from zero, from awareness to messages and leads.
- Brought back the brand name and the feeling of its strong days.
- Put the academy back on the ground: big events in the field, flyers and brochures, and partnerships with student families at programming faculties.
- Set the content direction and started video content (there was none before).
- Ran Meta ads across the full funnel: reach, video views, engagement, messages and lead forms.

**Results:**
- **EGP 1.2M+** in sales in the last 3 months *(TODO: total sales or ads only?)*
- **~5%** conversion rate within 3 months *(TODO: define, e.g. messages → enrollments)*
- **Ad budget: EGP 45K → 150K+/month.** It doubled in the first 2 months, because the results justified it.
- *(TODO: monthly sales before he joined. This is the most important missing number.)*

**Work samples:** `cases/mec-academy/mec-ads-1.png` … `mec-ads-4.png`. Meta Ads Manager screenshots with campaign names and spend blurred. Caption each with its date range *(TODO: date range per screenshot)*. Suggested caption line: "Full-funnel Meta campaigns: reach, ThruPlay, engagement, messages and lead forms."

**What I learned:** Ads can't fix a broken base. Fix the brand and the funnel first, then scale.

**Closing line:** I left the business with a stable base, ready to scale further.

### 9.2 Programming & AI Tutor (Featured #2)

- **Company:** *Not named.* Display as "Programming & AI Tutor · New Egyptian Baccalaureate". No link, no name anywhere (including file names and alt text).
- **Role:** Marketing (Freelance) · *(TODO: dates, 2026)*
- **Industry:** EdTech · **Stages:** research, positioning, content, client

**Headline:** An unknown teacher, a late start, a crowded market → 10+ students in one month.

**Context:** A computer science graduate wanted to start teaching the new "Programming & AI" subject in Egypt's new high-school system (the Baccalaureate).

**Challenge:** Three problems at once. Nobody knew him as a high-school teacher. He was starting late. And the market was already full of teachers giving the same subject.

**Key insight:** The student studies, but the parent pays. Parents usually hold the buying power, so the content had to win the parents' trust too, not only the students'.

**What I did:**
- Built the launch plan and the content plan.
- Built his personal brand with a lot of reels.
- Set the content ideas and the creative direction, and spoke to parents as well as students.
- Pushed his presence in his local area.
- **Handover:** built a full content system so he could run it without me. It covers funnel goals, 6 content buckets, a weekly rhythm, writing templates, a team workflow and KPIs for each format.
- *(TODO: Mahmoud to confirm which items he did hands-on vs. advised.)*

**Results:**
- **10+ students** on his platform within one month *(TODO: which month after launch)*
- The local push brought **private (offline) lesson requests**. He now teaches offline too.

**Work samples** (all tagged "Arabic content"):
- `cases/programming-tutor/content-system-funnel-and-buckets.png`: "Funnel goals and content buckets"
- `cases/programming-tutor/content-system-writing-templates.png`: "Writing templates for reels and posts"
- `cases/programming-tutor/content-system-team-workflow.png`: "Weekly workflow for the content team"
- Above the samples: "A content system I built so he could run it without me."

**What I learned:** Know who pays, not only who uses. That one shift changes the whole message.

### 9.3 Creativa Hub Zagazig (Featured #3)

- **Company:** Creativa Hub Zagazig · https://www.facebook.com/profile.php?id=61565826658164
- **Header note:** E-Spaces × Ministry of Communications (MCIT) partnership. Part of my E-Spaces role.
- **Role:** Senior Social Media Specialist · Dec 2024 – Jan 2026
- **Industry:** EdTech · **Stages:** content, media, analysis, client

**Headline:** A new government-backed tech hub: from zero to 10K+ followers in under a year, mostly organic.

**Context:** Creativa is a national program by Egypt's Ministry of Communications. E-Spaces ran the hub in Zagazig. The page started from zero.

**Challenge:** Fill diplomas, courses and hackathons with university students, with a very small ad budget, while meeting monthly targets with a government partner.

**What I did:**
- Planned and wrote all the content, and managed the page.
- Handled communication with the ministry and the hub to hit monthly targets.
- Ran the campaigns: Career Sprint, the Creativa Zagazig hackathon, track launches and trainer intros.

**Key insight:** *(TODO, optional: what made the content work? Leave the section out if Mahmoud doesn't add one.)*

**Results:**
- **10K+ followers** from zero in under a year, mostly organic, with very limited ad spend
- **12+ training programs** delivered
- **1,500+ students** attended, in Zagazig
- High organic reach. The page **re-posted my Career Sprint posts** in 2026, after I left, because of their reach.

**Work samples:**
- `cases/creativa/creativa-hackathon.png`: "Hackathon launch, 342 reactions"
- `cases/creativa/creativa-web-dev-track.png`: "Web Development track"
- `cases/creativa/creativa-trainer-intro.png`: "Trainer intro"
- `cases/creativa/creativa-career-sprint-1.png` and `-2.png`: "Career Sprint campaign. Created by me, re-posted by the page in 2026 due to high reach."
- (Comments are already removed from these screenshots. Don't use other versions.)

**What I learned:** Good content can grow a page without a big budget, if every post answers a real student question.  *(draft; Mahmoud to confirm or edit)*

### 9.4 E-Spaces & CoCafe (Featured #4)

- **Company:** E-Spaces · https://www.facebook.com/espaces.eg · Sub-brand: CoCafe · https://www.facebook.com/profile.php?id=61585976124025
- **Role:** Social Media Specialist (2022 – Sep 2023) → Social Media Manager (Jul 2024 – Jan 2026) · Full-time
- **Note:** Sep 2023 – Jul 2024 was military service.
- **Industry:** B2B · **Stages:** research, content, client (+ media coordination)

**Headline:** First hire on a new social team → leading a team of 8.

**Context:** E-Spaces sells workspaces to SMEs and startups, a small B2B niche. When I joined, they were just building a social media team, and the company had 4 branches.

**Challenge:** Build social media from scratch, with just me and one graphic designer, and write content that makes business owners take action.

**Key insight:** Business owners are not one audience. Every ad and post started from persona research, so the copy spoke to each owner's real situation.

**What I did:**
- Wrote all the content and the dark-ads copy.
- Researched the different personas to write copy that actually sells.
- Managed all social media, plus side projects under E-Spaces (CoCafe, Creativa).
- Worked as social media specialist and account manager, splitting tasks across the team.
- Joined sales and media-buying meetings, and prepared and attended shoots.

**Results:**
- **Team: 1 → ~8 people**
- **Promoted** to Social Media Manager (2024)
- **Scaled the social media function as the company grew from 4 to 17+ branches** *(keep this exact framing; see §12)*
- *(TODO: one business number, such as leads per month, cost per lead or bookings.)*

**Work samples:**
- `cases/e-spaces/cocafe-working-coffee-lovers.png`: "CoCafe: 'Working coffee lovers'"
- `cases/e-spaces/espaces-reel-thumbnail.png`: "E-Spaces reel"
- *(TODO: 4–5 more posts from the E-Spaces and CoCafe pages.)*

**What I learned:** In B2B, a clear message for one persona beats a clever message for everyone.  *(draft)*

### 9.5 Ali Alkhajeh Marketing (All Work, confidential variant)

- **Company:** Ali Alkhajeh Marketing (no link; the agency has no social page)
- **Role:** Senior Social Media Specialist → Marketing Coordinator · Full-time · Jan 2026 – Present *(use "Marketing Coordinator" unless his contract says "Senior")*
- **Industry:** Agency (UAE clients) · **Stages:** research, positioning, content, client

**Headline:** Strategy, research and client work for 7 UAE brands, plus proposals that helped win major tenders.

**What I did:**
- Joined as Senior Social Media Specialist and was promoted to Marketing Coordinator.
- Talked directly to clients and prepared agreements.
- Built marketing strategies, case studies, and market and competitor research.
- Worked directly with **7 UAE clients**: law firms, a restaurant, fashion, cosmetics, a services company and a cafe.
- In Egypt: prepared the proposals and the company profile for **one of Egypt's leading concrete manufacturers**. They used them in major tenders, and they won.

**How I work** (method, no client content): Research → Audience → Positioning → Channels → Content pillars → KPIs. Show it as a clean horizontal flow with one line per step.

**Note:** "Client work is confidential under agency policy."

**Client logos** (§11): Fatima Alhammadi, YANA, MAI Boutique, Ali Alkhajeh (law firm).

**Testimonial:** *(TODO: from his manager or the agency owner. This case needs it most.)*

### 9.6 Big O Solutions (All Work)

- **Company:** Big O Solutions · https://www.facebook.com/BIGOsolutionss
- **Role:** Senior Social Media Specialist · Freelance · Dec 2025 – Present
- **Industry:** EdTech · **Stages:** content, media, analysis
- **Angle:** content and video production (MEC is the turnaround and numbers case, so the two don't repeat each other).

**Headline:** Video-first content for a tech academy: reels reaching up to 63K views on a page of 1.4K followers.

**What I did:**
- Content strategy, content writing and scripts for talking-head reels with several instructors.
- Media buying on Meta.
- Angles that answer students' real fears and objections:
  - Fear of starting: "Never written a line of code? We start with you from here."
  - Price objection: "Can't pay for the whole diploma? Book with EGP 1,000 and pay the rest in installments."
  - Outcome, not course: "Build a dashboard from scratch. Don't just watch others do it."

**Results:**
- Reels up to **63K, 31K and 30K views** on Facebook and **36.9K** on Instagram, on a page of **1.4K followers** *(TODO: which reels were organic and which were promoted. Until confirmed, write "organic + paid". Don't call them organic.)*
- **ThruPlay** at EGP 0.05 · **Landing page view** at EGP 1.27 · **Messages** at EGP 8.97–20.20

**Work samples:** `cases/big-o/bigo-ads.png` (blurred dashboard), `bigo-facebook-reels-views.png`, `bigo-instagram-reels-views-1.png`, `-2.png`, `bigo-facebook-page.png`.

### 9.7 Xiaomi Egypt & POCO Egypt (All Work)

- **Company:** Xiaomi Egypt · https://www.facebook.com/XiaomiEgypt · POCO Egypt (no link)
- **Role:** Intern (Mi Fans community) → Junior Social Media Specialist & Community Manager → Social Media Specialist · Full-time · Remote · *(TODO: start 2019 or 2020? Default to 2020)* – Feb 2025
- **Industry:** Consumer Tech · **Stages:** content, analysis, client (community)

**Headline:** From student intern to one of the most senior people on the social media team.

**Story (progression):**
- Joined through Xiaomi's student internship in the Mi Fans community.
- Proved myself with my ideas and joined the social media team at HQ as Junior Social Media Specialist & Community Manager.
- Handled page moderation and customers for sales, retail and maintenance.
- Took over page management: publishing, performance reports, competitor tracking, and analysis of competitor products and their market presence.
- From around 2022: wrote part of the content calendar (for specific products), and wrote Arabic how-to guides and feature explainers.
- Kept working through military service. Social Media Specialist until Feb 2025.

**Results:**
- **500+ messages per shift**
- **100% response rate in under 15 minutes**

**Rules:** No internal report, no Xiaomi page metrics. *(TODO: post or guide samples, if Mahmoud finds them.)*

### 9.8 B2B Tech Content: AppLogica + Space Minders (All Work)

- **Companies:** AppLogica Middle East (no link) · Space Minders Software · https://www.facebook.com/profile.php?id=61565210413562
- **Roles:** AppLogica: Product Content Creator · Freelance · Jul 2024 · Space Minders: Social Media Specialist · Freelance · Sep 2024 – Feb 2025
- **Industry:** B2B · **Stages:** research, content

**Headline:** Writing for software buyers: company profiles, brochures and product content for two software houses.

**AppLogica:** A UAE software house with an office in Egypt. I wrote their company profile and product brochures. The hard part was the terminology, so I researched a lot until I understood how they need to sound. The work was accepted with very small edits, and the team was very happy with it. *(TODO: did he also write SEO articles, as the old CV says? Samples?)*

**Space Minders:** An Egyptian software house. I was their content creator and wrote English content for their products: an AI delivery-time system, AI shipping-cost management, the Nebras education platform (separate posts for admins/teachers and for parents/students), and e-commerce inventory tools. I also researched the platforms and events where they should show their work, like Clutch and a major tech summit in Egypt.

**Work samples:** `cases/b2b-tech-content/space-minders-post-1.png` … `-5.png`. Lead with post 1 (AI delivery times), post 2 (Nebras admins) and post 4 (Nebras parents).

### 9.9 Sofra Foods (All Work)

- **Company:** Sofra Foods · https://www.facebook.com/profile.php?id=61584309598625
- **Role:** Media Buyer · Freelance · *(TODO: dates)*
- **Industry:** Retail & F&B · **Stages:** media, analysis

**Headline:** Cheap messages, real orders: Meta messaging campaigns for a food shop in Giza.

**Results:**
- **~EGP 5.8 average cost per message** across 5 messaging campaigns (1,468 conversations), from EGP 5.14 to 7.10
- **~5% of messages became orders**
- **Delivery rate reached 70%** in peak season (cash on delivery)
- *(TODO: average order value; delivery rate before he started.)*

**Work sample:** `cases/sofra-foods/sofra-foods-ads.png` (campaign names blurred).

### 9.10 Lab: Xenah Cosmetics (`/lab`)

- **Company:** Xenah Cosmetics · https://xenah.pages.dev/
- **Type:** Research & strategy · Freelance · *(TODO: dates)*
- **Stages:** research, positioning, content

**Title:** Research and positioning for a value cosmetics outlet.

**Draft:** Research and case studies for an outlet brand that sells cosmetics at very good prices. I built the plan from what the research showed, together with the brand's direction and identity. The plan was executed.

**Key insight:** *(TODO: what did the research show that changed the plan?)* · **What went live:** *(TODO: screenshots of posts that came from the plan)*

---

## 10. Experience timeline (two tracks)

Render two parallel tracks on desktop and two stacked groups on mobile. Each item shows role, company, dates and a type pill. Items link to their case where one exists.

**Full-time**
| Dates | Role | Company |
|---|---|---|
| Jan 2026 – Present | Senior Social Media Specialist → Marketing Coordinator | Ali Alkhajeh Marketing |
| Jul 2024 – Jan 2026 | Social Media Manager | E-Spaces & CoCafe (incl. Creativa Hub Zagazig project) |
| Sep 2023 – Jul 2024 | Military Service | — |
| 2022 – Sep 2023 | Social Media Specialist | E-Spaces |
| 2020* – Feb 2025 | Intern → Junior SMS & Community Manager → Social Media Specialist · Remote | Xiaomi Egypt & POCO Egypt |

**Freelance & Part-time**
| Dates | Role | Company | Type |
|---|---|---|---|
| May 2026 – Dec 2026 | Media Buyer | MEC Academy | Part-time |
| Dec 2025 – Present | Senior Social Media Specialist | Big O Solutions | Freelance |
| Sep 2024 – Feb 2025 | Social Media Specialist | Space Minders Software | Freelance |
| Jul 2024 | Product Content Creator | AppLogica Middle East | Freelance |
| Feb 2023 – Aug 2023 | Content Creator | Learn It (https://www.facebook.com/Learnitksa) | Part-time |

*TODO: Xiaomi start year (2019 vs 2020) and the exact military service dates. Learn It is timeline-only (no case page): "Content for programming and networking courses."*

Education under the timeline: **Cairo University: Faculty of Commerce, Marketing & Business Administration** (studied 3 years at the Faculty of Computers & AI first).

---

## 11. Brands & links

**Brands I've worked with** (marquee on Home; each logo links out):

| Logo file | Link |
|---|---|
| `logos/xiaomi.png` | https://www.facebook.com/XiaomiEgypt |
| `logos/poco.png` | — (no link) |
| `logos/e-spaces.png` | https://www.facebook.com/espaces.eg |
| `logos/cocafe.png` | https://www.facebook.com/profile.php?id=61585976124025 |
| `logos/creativa.png` | https://www.facebook.com/profile.php?id=61565826658164 |
| `logos/mec-academy.png` | https://www.facebook.com/mecacademyegy |
| `logos/applogica.png` | — |
| `logos/ali-alkhajeh-marketing.png` | — |
| Big O Solutions *(TODO: logo file)* | https://www.facebook.com/BIGOsolutionss |

**Agency clients** (on the Ali Alkhajeh case; can also appear in the marquee):

| Logo file | Link |
|---|---|
| `logos/fatima-alhammadi.png` | https://www.instagram.com/fatimalhammadi_interior/ |
| `logos/yana.png` | https://www.instagram.com/yanarestaurants/ |
| `logos/mai-boutique.png` | https://www.instagram.com/bymai.ae/ |
| Ali Alkhajeh law firm *(TODO: logo file, e.g. from the Instagram profile)* | https://www.instagram.com/alialkhajehae/ |

**Do not use** the Alanoud Albreik logo (removed).

Logos have transparent backgrounds and some are white. Normalize them in the marquee: same visual height, grayscale at 60% opacity, full color on hover.

---

## 12. Honesty & confidentiality rules (must follow)

1. **No invented numbers or facts.** Only what's in this brief. Missing means TODO.
2. **Titles = official titles.** MEC shows "Media Buyer", with the roleNote explaining the real scope.
3. **E-Spaces:** "Scaled the social media function *as the company grew* from 4 to 17+ branches." Never imply he caused the branch expansion.
4. **MEC:** don't mention internal or management problems. Present the budget growth as earned by results. Present the 1.2M as total sales unless confirmed as ads-only.
5. **Big O:** don't call the high-view reels "organic" until confirmed.
6. **Ali Alkhajeh:** no strategies, no client details beyond names and logos, no mention of deals that didn't close or of agency pricing.
7. **Concrete company and programming tutor:** never named.
8. **Xiaomi:** the internal report is never published, and no Xiaomi page metrics are shown as his results.
9. Work-sample images are used as provided. Don't re-crop or re-edit them, and never use un-blurred versions.

---

## 13. Assets manifest

```
assets/
  brand/
    portrait-hero-tall.jpg      Hero (704×1300). New B&W studio portrait, watermark removed, tone-matched to --bg
    portrait-4x5.jpg            About section / cards (704×880)
    portrait-square.jpg         OG image / avatar (704×704)
    portrait-full.jpg           Full uncropped (704×1495)
    bg-texture-reference.png    Background feel reference from the old PDF (not for direct use)
  logos/                        Transparent PNGs from the old portfolio (see §11)
  cases/
    mec-academy/                mec-ads-1..4.png       (blurred Ads Manager)
    big-o/                      bigo-ads.png (blurred), reels-views screenshots, facebook page
    creativa/                   5 Facebook post screenshots (comments removed)
    e-spaces/                   cocafe-working-coffee-lovers.png, espaces-reel-thumbnail.png
    programming-tutor/          3 pages of the content system (Arabic)
    b2b-tech-content/           space-minders-post-1..5.png
    sofra-foods/                sofra-foods-ads.png    (blurred)
  reference/
    old-portfolio.pdf           Visual identity reference (study it)
    cv-current-OUTDATED.pdf     Old CV. Wrong titles and dates. Do NOT publish.
```

**Portrait note:** the source is 704px wide. That's fine for mobile, but it may look soft as a large desktop hero on retina screens. Ask Mahmoud for the original high-resolution file if he has it.

---

## 14. Open TODOs (for Mahmoud)

| # | Item | Where |
|---|---|---|
| 1 | Monthly sales **before** he joined MEC | MEC results |
| 2 | Is the 1.2M total sales or ads-only? How is the 5% conversion measured? | MEC |
| 3 | Date range of each MEC screenshot | MEC samples |
| 4 | Which Big O reels were organic vs promoted | Big O |
| 5 | Programming tutor: dates, which month the 10+ students came, hands-on vs advised | Tutor |
| 6 | E-Spaces: one business number + 4–5 post screenshots | E-Spaces |
| 7 | Creativa: page Insights screenshot (optional key insight) | Creativa |
| 8 | Sofra: average order value, delivery rate before, dates | Sofra |
| 9 | Xenah: key insight, what went live, dates | Lab |
| 10 | AppLogica: SEO articles? samples? | B2B Tech |
| 11 | Xiaomi start year (2019/2020), military dates, any samples | Timeline, Xiaomi |
| 12 | Testimonials: Ali Alkhajeh manager, AppLogica | Home, Ali Alkhajeh |
| 13 | Logos: Big O, Ali Alkhajeh law firm | Brands |
| 14 | **Updated CV PDF** matching this brief's titles and dates | /cv.pdf |
| 15 | Higher-resolution portrait (optional) | Hero |

---

## 15. QA checklist before launch

- [ ] Looks right at 375px, 768px, 1280px and 1920px. Nothing overflows horizontally on mobile.
- [ ] All motion runs at 60fps on a mid-range phone. `prefers-reduced-motion` is respected.
- [ ] Lighthouse mobile scores meet §5.7.
- [ ] Every image has meaningful alt text (no teacher or concrete-company names).
- [ ] All external links open in a new tab with `rel="noopener"`.
- [ ] No TODO text is visible in production.
- [ ] Every number on the site matches §9 exactly.
- [ ] Keyboard navigation and focus states are visible (accent outline). Color contrast is AA.
- [ ] Deployed and working on GitHub Pages, including case-page routes and the CV download.
