# InfraVolt UK — Phase 1 SEO Audit (Read-Only)

**Scope:** `https://infravolt.co.uk`, en-GB, product-led Phase 1 keyword map (Busbar → Cable Management → LED → Earthing & Lightning → Underfloor).
**Method:** Repository evidence only (Next.js App Router source, `src/data/**` content, shared SEO/metadata helpers). No live crawl, no rank/volume/CPC data, nothing invented. Every claim below is traceable to a file path; anything that could not be located is marked **"not found"**.
**Status:** Audit only. No recommendations in this document have been implemented.

---

## 1. Executive Summary

**Strongest areas**
- **Earthing & Lightning Protection** has the cleanest keyword-to-URL match in the whole site: all 8 approved-brief slugs exist exactly as named (`lightning-protection`, `earthing-electrodes-plates`, `conductors-tapes`, `clamps-connectors`, `equipotential-earth-bars`, `exothermic-welding`, `inspection-ground-enhancement`, `static-ex-proof-grounding`), each with a distinct H1/title and (mostly) a cited IEC/EN standard.
- **Busbar** has by far the deepest technical content (full amp/IP/insulation-voltage spec tables per system) and a genuinely strong, already-built data-centre narrative — the `/application-map` data-centre page contains six busbar-specific hotspot write-ups with correct product linking.
- **Cable Management** has consistent standards citation (BS EN 61537 / IEC 61537) across every sub-page and good sibling-to-sibling internal linking.
- **The two "missing page" assumptions in the brief were wrong, in InfraVolt's favour**: `/products/cable-support-systems/heavy-duty-cable-ladders` and `/products/cable-support-systems/emt-imc-rsc-conduit-systems` both exist, are statically generated, and are internally linked — they are just served by a `[slug]` dynamic route rather than a static folder.
- **About page** already carries strong, explicit, repeated GERSAN-manufactures / InfraVolt-distributes language — the brand-defence/trust groundwork the brief asked about is genuinely in place.

**Weakest areas**
- **Underfloor Systems** is the thinnest family site-wide: ~50–80 visible words per sub-page, no standards/certification copy anywhere in the family's own data, and every single product-variant image across all 6 sub-pages falls back to a bare model code as alt text (e.g. `"GYDK-10"`) because `imageAlt` is unset on every row.
- **Zero structured data (JSON-LD) anywhere in the codebase** — confirmed independently by all six research passes plus a direct repo-wide grep. No `Organization`, `WebSite`, `Product`, or `BreadcrumbList` schema exists on any page.
- **No social-share image configured anywhere** — `socialImage` is never passed to the shared `marketPageMetadata()` helper on any audited page, sitewide.
- **Application-map pages carry almost no crawlable static content.** They are `"use client"` interactive widgets; the real application/product copy and the *only* links into `/products/*` pages are gated behind a zone-click → hotspot-click interaction and are absent from the page's default server-rendered HTML. This materially weakens their ability to support "sector + product" long-tail queries (e.g. "data centre busbar") despite the underlying data being rich.
- **`/products/cable-support-systems/heavy-duty-cable-ladders`** and **`emt-imc-rsc-conduit-systems`** use a different title template (missing the `"| Cable Management Systems |"` middle segment) than every other page in the family — a real, fixable inconsistency.

**Top 10 highest-value changes** (detailed in §9; ranked by evidence strength × effort)
1. Add a static, always-visible internal link block from each `/application-map/*` page to its supported `/products/*` pages (currently zero static product links exist on any of the 8 application-map pages).
2. Resolve the "cable tray" cannibalisation: 5 live URLs (`cable-trays-trunking`, `heavy-duty-cable-trays`, `normal-type-cable-trays`, `aluminium-cable-trays`, `wire-mesh-systems`) all use "Cable Tray(s)" as the title/H1 head noun.
3. Add descriptive `imageAlt` to every underfloor-systems product-variant row (currently 100% fall back to bare model codes).
4. Decide and implement one preferred URL for "lighting busbar" between `/products/busbar/gl-lighting-busbar` and `/products/busbar/gnl-lighting-busbar` (both currently target the same head term).
5. Fix the `[slug]`-route title template for `heavy-duty-cable-ladders` / `emt-imc-rsc-conduit-systems` to match the sitewide `"{Product} | Cable Management Systems | InfraVolt"` pattern.
6. Work the exact target keyword phrases ("high power busbar", "cast resin busbar", "raised floor trunking") into H1/H2 copy on their respective pages — none currently contain the literal brief-approved phrase, only close variants (system names).
7. Add a resolved standards citation to the two earthing categories currently missing one (`exothermic-welding`, `inspection-ground-enhancement`) — or confirm none applies and note that explicitly.
8. Add genuine "rising main" / vertical-riser language to `/products/busbar/ggd-medium-power-busbar` (currently the best-fit candidate but the phrase itself isn't on-page).
9. Correct the `/application-map/transport-infrastructure` naming/scope mismatch — its title, H1 and all copy are scoped to "Airport" only, not general transport infrastructure.
10. Site-wide: add `Organization`/`WebSite` JSON-LD (homepage) and `BreadcrumbList` JSON-LD (product pages) — zero structured data exists anywhere today.

**Key cannibalisation risks:** "cable tray" (5 URLs), "lighting busbar" (2 URLs, GL vs GNL), and a softer "data centre" application-copy overlap across the busbar catalog page, GS, GR, GGD, and `/application-map`. Full detail in §7.

**Technical SEO risks:** see §8 — headline items are the sitewide absence of structured data, and `/admin`, `/auth`, `/portal` route groups having no page-level `noindex` of their own (they inherit the global indexing toggle with no override), which matters now that indexing is enabled in production.

**Confidence / evidence limitations:**
- All CURRENT STATE claims are sourced from repository code and data files, not a live crawl — production may differ if env vars or a deploy have diverged from this checkout.
- Word counts are approximate (eyeballed from source, not a rendered/tokenised count).
- Trailing-slash behaviour could not be conclusively determined from static code (`next.config.ts` sets no explicit `trailingSlash`) — this needs a live check, not a code read.
- No search volume, keyword difficulty, CPC, or ranking data is used or implied anywhere in this document.
- LED SKU-level pages (e.g. individual downlight/panel model pages) were intentionally **not** audited in this pass — only category-index pages, per the brief's own keyword map, which targets category URLs, not individual SKUs.

---

## 2. Priority Scorecard

Scored 1 (weak) – 5 (strong), evidence-based, not aspirational.

| Family | Metadata | Heading alignment | Content depth | Commercial intent | Internal linking | Technical SEO | Cannibalisation risk* | Readiness to rank |
|---|---|---|---|---|---|---|---|---|
| Busbar | 4 | 3 | 5 | 4 | 3 | 3 | 3 | 4 |
| Cable Management | 3 | 3 | 4 | 4 | 4 | 3 | 2 | 4 |
| LED Systems | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 3 |
| Earthing & Lightning | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 4 |
| Underfloor | 3 | 3 | 2 | 3 | 3 | 3 | 4 | 2 |

*Cannibalisation-risk column is scored so that **5 = low risk**, consistent with the other "higher is better" columns.

Notes behind the scores:
- **Busbar heading alignment (3):** H1s are system names ("GS Super Compact", "GR Cast Resin Busbar") which are close to but not identical to the brief's exact primary keywords ("high power busbar", "cast resin busbar"). Content depth is a 5 — full multi-column spec tables (400–6300 A ranges, Icw/Ipk, resistance/reactance) exist for every audited system.
- **Cable Management cannibalisation (2 → lowest/highest-risk score):** five live URLs share "Cable Tray(s)" as the literal title/H1 head noun (§7).
- **LED cannibalisation (4):** themes are topically distinct (industrial vs. car park vs. hazardous vs. emergency vs. linear); the one real content risk is the "Exproof" naming carrying an implicit certification claim with zero standard cited anywhere in the repo.
- **Earthing (4/4 across most columns):** the most evenly strong family — clean 1:1 slug match, distinct H1s, consistent standards citation on 6 of 8 categories. Content depth capped at 3 because most sub-pages are ~70–240 words of prose plus a data table, with applications copy living only on the hub.
- **Underfloor (weakest across the board):** content depth of 2 reflects ~50–80 words per sub-page, no standards citation anywhere in the family's data, and systematically missing image alt text.

---

## 3. Master URL-to-Keyword Map

"Keep/adjust/major rewrite" reflects the gap between current on-page copy and the brief's assigned keyword — not a design or content instruction to execute now.

| Priority | URL | Existing page purpose | Proposed primary keyword | Secondary keywords | Search intent | Keep/Adjust/Major rewrite | Cannibalisation risk | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | `/products/busbar` | Busbar family catalogue hub | busbar trunking systems | busbar systems; electrical busbar systems; busbar trunking | Commercial/category | Keep, minor metadata tightening | Low | Title/H1 already close ("Busbar Systems"); "busbar trunking systems" not verbatim in title. |
| 1 | `/products/busbar/gs-super-compact` | GS series detail (400–6300 A) | high power busbar | power distribution busbar; high current busbar; compact busbar trunking | Commercial/transactional | Adjust | Low | H1 is "GS Super Compact" — none of the 4 target phrases appear verbatim; content (400–6300A, high-current framing) strongly supports the keyword, copy just doesn't say it yet. |
| 1 | `/products/busbar/gr-cast-resin` | GR series detail (IP68) | cast resin busbar | IP68 busbar; resin busbar trunking; busbar for harsh environments | Commercial/transactional | Adjust | Low | Title is "GR Cast Resin Busbar" — close match to primary keyword; "IP68 busbar" and "harsh environments" concepts present in copy but not as exact phrases. |
| 1 | `/products/busbar/ggd-medium-power-busbar` (candidate) | GGD series detail | rising main busbar | busbar rising main; vertical busbar distribution | Commercial | Adjust | Low | Best existing candidate (per `/application-map` data-centre "Electrical Riser" hotspot explicitly calling GGD a "vertical riser run"), but the phrase "rising main" is not on the GGD product page itself. |
| 1 | `/products/busbar/gl-lighting-busbar` (candidate, preferred) | GL series detail (40–100 A) | lighting busbar | lighting busbar trunking; lighting distribution busbar | Commercial | Keep as preferred, adjust | **Medium — see §7** | Broader current range (40–100 A) and explicit "industrial and commercial lighting distribution" framing make it the natural head-term owner over GNL. |
| 1 | `/products/busbar/gnl-lighting-busbar` (candidate, secondary) | GNL series detail (25/40 A) | — (secondary intent) | raised-floor lighting busbar; low-current lighting circuits | Commercial | Keep, differentiate | **Medium — see §7** | Narrower 25/40 A range and "raised-floor supply points" framing is a natural secondary angle once GL takes the head term. |
| 1 | `/application-map` (candidate) | Data-centre interactive application map | data centre busbar | data centre power distribution busbar; data centre busbar trunking | Informational→Commercial | Major rewrite (structural, not just copy) | Low (unique page) | Strongest *data* match in the repo (6 busbar hotspots, correct product linking) but content/links are client-interaction-gated — see §8 Critical/High findings. |
| 2 | `/products/cable-support-systems` | Cable management hub | cable containment systems | cable management systems; cable support systems | Commercial/category | Keep | Medium | Title is "Cable Management Systems" — "cable containment systems" not verbatim. |
| 2 | `/products/cable-support-systems/cable-trays-trunking` | Cable tray/trunking macro hub | cable tray systems | galvanised cable tray; cable tray | Commercial | Keep, **preferred URL for "cable tray"** | **High — see §7** | Recommend this be the designated preferred URL for the bare "cable tray" / "cable tray systems" query. |
| 2 | `/products/cable-support-systems/cable-ladders` | Cable ladder macro hub | cable ladder systems | industrial cable ladder; cable ladder | Commercial | Keep | Low | Clean, distinct from cable-tray cluster. |
| 2 | `/products/cable-support-systems/heavy-duty-cable-ladders` | Heavy-duty ladder detail (H=70–200mm) | heavy duty cable ladder | HDG cable ladder; industrial cable ladder; heavy duty cable support | Commercial | Adjust (title template + phrase) | Low | **Exists** (via `[slug]` route) — brief's premise that it's missing is incorrect; needs title-template fix (§8) and the literal phrase "heavy duty cable ladder" isn't in its current title ("Heavy Duty Type Cable Ladders"). |
| 2 | `/products/cable-support-systems/wire-mesh-systems` | Wire-mesh tray detail | wire mesh cable tray | cable basket; wire basket tray; wire mesh cable basket | Commercial | Adjust | Medium | Page's own title/H1 says "Wire-Mesh **Cable Trays**" but the hub's nav card labels it "Wire-Mesh **Systems**" — internal label mismatch; "cable basket"/"wire basket tray" not present anywhere. |
| 2 | `/products/cable-support-systems/heavy-duty-cable-trays` | Heavy-duty tray detail | (audit opportunity) | — | Commercial | Keep | **High — see §7** | Shares "Cable Tray(s)" head noun with 4 other URLs. |
| 2 | `/products/cable-support-systems/normal-type-cable-trays` | Standard tray detail | (audit opportunity) | — | Commercial | Keep | **High — see §7** | Same cluster. |
| 2 | `/products/cable-support-systems/aluminium-cable-trays` | Aluminium tray detail | (audit opportunity) | — | Commercial | Keep | **High — see §7** | Same cluster. |
| 2 | `/products/cable-support-systems/conduit-pipe-systems` | Conduit/pipe macro hub | (audit opportunity) | — | Commercial | Keep | Low | Distinct term family. |
| 2 | `/products/cable-support-systems/emt-imc-rsc-conduit-systems` | EMT/IMC/RSC detail | (audit opportunity) | — | Commercial | Adjust (title template) | Low | **Exists** — same title-template fix needed as heavy-duty-cable-ladders. |
| 2 | `/products/cable-support-systems/support-hanging-systems` | Support/hanging macro hub | (audit opportunity) | — | Commercial | Keep | Low | — |
| 3 | `/products/led-systems/industrial-high-bay-lighting` | Industrial/high-bay LED category | industrial LED lighting | industrial lighting systems; LED high bay lighting; industrial high bay lighting | Commercial | Keep | Low | Also the confirmed best page for "warehouse LED lighting" / "factory LED lighting" (§ below). |
| 3 | `/products/led-systems/industrial-high-bay-lighting` (secondary intent) | (same page) | warehouse LED lighting / factory LED lighting | warehouse lighting systems; logistics warehouse lighting; factory lighting systems; production facility lighting | Commercial | Keep | Low | Metadata, hero copy, and application cards already name factories/warehouses explicitly with real 35–250W/IP20–66 data. |
| 3 | `/products/led-systems/parking-waterproof-lighting` | Car park/waterproof LED category | car park LED lighting | underground car park lighting; waterproof industrial lighting | Commercial | Keep | Low | `LED-BUS Etange Carpark` named series, IP65, "Car Parks"/"Multi-Storey Parking" applications already present. |
| 3 | `/products/led-systems/outdoor-infrastructure-lighting` (candidate) | Outdoor/infra LED category | LED street lighting / industrial flood lighting / tunnel lighting systems | road tunnel lighting; LED tunnel lighting; LED floodlights | Commercial | Keep | Low | Three named series already fit: `GER-LED Street Lighting Systems`, `GER-LED Projector/Floodlight`, `GSL-TUNEL Lighting Systems` (IK16/IP65). |
| 3 | `/products/led-systems/special-hazardous-environment-lighting` (candidate) | Hazardous-area LED category | hazardous area LED lighting | ATEX LED lighting; explosion proof LED lighting | Commercial | **Do not target yet** | Low | "Exproof" series name implies the claim; **zero ATEX/IECEx standard is cited anywhere in the repo** — requires manufacturer validation before targeting. |
| 3 | `/products/led-systems/emergency-guidance-lighting` (candidate) | Emergency/exit LED category | emergency lighting systems | LED emergency lighting; LED exit signs; twin spot emergency lighting; emergency bulkhead lighting | Commercial | Keep, minor content add | Low | `ARL`/`MAL Exit Sign Series` and `EML Twin-Spot Emergency Lighting` are exact-match series names; bulkhead coverage is thinner (one grouped 15W family only). |
| 3 | `/products/led-systems/linear-trunking-lighting` (candidate) | Linear/trunking LED category | linear LED lighting systems | LED trunking lighting; continuous row LED lighting | Commercial | Adjust | Low | `MULTILINE 45` genuinely supports the claim, but all application copy is office/retail — no industrial continuous-row use-case shown yet. |
| 4 | `/products/earthing-and-lightning-protection` | Earthing/LP family hub | earthing materials | earthing products; earthing and lightning protection | Commercial/category | Keep | Low | — |
| 4 | `/products/earthing-and-lightning-protection/earthing-electrodes-plates` | Electrodes/plates detail | copper bonded earth rods | earth rods; copper earth rods; earthing electrodes | Commercial | Adjust | Low | Copy uses "Copper-bonded Steel" (material label) and "Copper covered" (SKU field) — the exact phrase "copper bonded earth rods" is not present verbatim in title/H1/meta. |
| 4 | `/products/earthing-and-lightning-protection/equipotential-earth-bars` | Earth bars detail | earth bars | equipotential earth bars; earthing bars | Commercial | Keep | Low | Title/H1 already say "Equipotential Earth Bars" — strong match. |
| 4 | `/products/earthing-and-lightning-protection/exothermic-welding` | Exothermic welding detail | exothermic welding | exothermic welding system; earthing weld system | Commercial | Keep | Low | Exact-match title/H1; no standards citation on this one category (flagged §8). |
| 4 | `/products/earthing-and-lightning-protection/lightning-protection` | Lightning protection detail | lightning protection products | lightning protection components | Commercial (product-supply, not service) | Keep | Low | Confirmed product-supply-focused framing throughout — matches the brief's explicit instruction not to force service/contractor intent. |
| 5 | `/products/underfloor-systems` | Underfloor family hub | underfloor trunking systems | underfloor cable management; underfloor cable management systems | Commercial/category | Keep, minor metadata tightening | Low | Title is "Underfloor Cable Trunking Systems" — close but not verbatim to "underfloor trunking systems". |
| 5 | `/products/underfloor-systems/raised-floor-trunking` | Raised-floor trunking detail | raised floor trunking | raised floor cable management | Commercial | Adjust | Low | Title/H1 use hyphenated "**Raised-Floor** Trunking" (model-prefixed "GYDK Raised-Floor Trunking") rather than a clean unhyphenated match; thinnest page in the family (~60–80 words). |

---

## 4. Current → Recommended Metadata Matrix

Recommendations are directional (what should change and why), not final copy — final copy requires the user's sign-off and, where noted, GERSAN validation. All recommended text below is illustrative and uses only claims already evidenced in the repository; nothing invents a rating, standard, or certification not already found in source.

| URL | Current title | Recommended title | Current H1 | Recommended H1 | Current meta description | Recommended meta description | Reason |
|---|---|---|---|---|---|---|---|
| `/products/busbar` | "Busbar systems for UK projects \| InfraVolt" | "Busbar Trunking Systems \| InfraVolt UK" | "Busbar Systems" | Keep (brand-consistent, close enough) | "Explore Gersan lighting, power-distribution, compact and cast-resin busbar systems with technical project support from InfraVolt." | Work in "busbar trunking systems" verbatim once, keep rest | Brief's primary keyword is "busbar trunking systems"; current title uses "busbar systems for UK projects", missing "trunking". |
| `/products/busbar/gs-super-compact` | "GS Super Compact \| InfraVolt" | "GS Super Compact — High Power Busbar (400–6300 A) \| InfraVolt" | "GS Super Compact" | "GS Super Compact High Power Busbar" (or keep H1, add "High Power Busbar" as a subheading/eyebrow) | "Compact high-current busbar system for major infrastructure, transformer and switchboard connections." | Add "high power busbar" phrase naturally, keep rest | Brief's exact primary keyword "high power busbar" is not present anywhere on the page today; the 400–6300 A range already supports the claim. |
| `/products/busbar/gr-cast-resin` | "GR Cast Resin Busbar \| InfraVolt" | Keep — already close | "GR Cast Resin Busbar" | Keep | "IP68 cast-resin insulated busbar system developed for humid, saline and demanding operating environments." | Add literal "IP68 busbar" / "harsh environments" phrasing once | Title/H1 already near-exact match to primary keyword; description could tighten to include a secondary phrase verbatim. |
| `/products/cable-support-systems` | "Cable Management Systems \| InfraVolt" | "Cable Containment & Management Systems \| InfraVolt" | "Cable Management Systems" | "Cable Containment Systems" (or dual-phrase) | "Engineered cable trays, ladders, trunking, support profiles, conduit systems and fixing accessories for safe, efficient and coordinated cable routing across industrial, commercial and infrastructure projects." | Keep — already thorough and accurate | Brief's primary keyword is "cable containment systems"; current title/H1 use "cable management systems" (brief's own secondary term) only. |
| `/products/cable-support-systems/cable-trays-trunking` | "Cable Trays & Trunking \| Cable Management Systems \| InfraVolt" | Keep | "Cable Trays & Trunking" | Keep | "Perforated, strengthened, heavy-duty and trunking systems for power, control and data cable routing." | Add "cable tray systems" verbatim once | Good match already; needs to explicitly claim ownership of the bare "cable tray systems" phrase given the cannibalisation risk in §7. |
| `/products/cable-support-systems/heavy-duty-cable-ladders` | "Heavy Duty Type Cable Ladders (H = 70–200 mm) \| InfraVolt" | "Heavy Duty Cable Ladder Systems \| Cable Management Systems \| InfraVolt" | "Heavy Duty Type Cable Ladders" | "Heavy Duty Cable Ladders" | "Heavy-duty ladder construction for demanding industrial cable loads, h=70 to h=200 mm edge heights, with a full range of bends, tees, crossings, riser elements and covers in the same system." | Add "HDG cable ladder" / "heavy duty cable support" once | Brings this page's title template in line with every other cable-management page (currently the only pages missing the "\| Cable Management Systems \|" middle segment); "heavy duty cable ladder" (brief's exact phrase) isn't verbatim today. |
| `/products/cable-support-systems/wire-mesh-systems` | "Wire-Mesh Cable Trays \| Cable Management Systems \| InfraVolt" | Keep title | "Wire-Mesh Cable Trays" | Keep | "Open wire-mesh cable-tray systems for ventilated, lightweight and flexible cable routing, available in multiple tray heights and widths with matching jointing and support accessories." | Add "cable basket" / "wire basket tray" once | Brief's secondary keywords "cable basket"/"wire basket tray" are absent; also fix the hub nav-card label ("Wire-Mesh Systems") to match this page's own title ("Wire-Mesh Cable Trays") — currently inconsistent. |
| `/products/led-systems/industrial-high-bay-lighting` | "Industrial & High-Bay Lighting \| LED Systems \| LEDBUS by Gersan \| InfraVolt" | Keep | "Industrial & High-Bay Lighting" | Keep | "LEDBUS Industrial & High-Bay Lighting — six catalogue product series for factories, warehouses, hangars and logistics facilities, 35–250 W, IP20 to IP66." | Keep — already names warehouse/factory explicitly with real specs | No change needed; this page is already the strongest metadata match found in the whole audit. |
| `/products/led-systems/parking-waterproof-lighting` | "Parking & Waterproof Lighting \| LED Systems \| LEDBUS by Gersan \| InfraVolt" | Keep | "Parking & Waterproof Lighting" | Keep | "Parking & Waterproof Lighting — LED-BUS Etange Carpark, StepDIM Waterproof and Etanj PC linear luminaires for car parks and demanding service environments, 11–70 W, IP65." | Keep | Already strong; "car park LED lighting" primary keyword well supported by named series + specs. |
| `/products/led-systems/special-hazardous-environment-lighting` | "Special & Hazardous Environment Lighting \| LED Systems \| InfraVolt" | **Do not retitle toward ATEX/explosion-proof terms yet** | "Special & Hazardous Environment Lighting" | Keep | "Four real GERSAN lighting families for hazardous industrial areas, greenhouses, textile inspection and automotive paint control." | Keep until certification data is validated | See §10 — "Exproof" naming implies a certification claim with no standard cited anywhere in source; do not add "ATEX"/"explosion proof" to metadata until GERSAN confirms the applicable standard/zone rating. |
| `/products/earthing-and-lightning-protection/earthing-electrodes-plates` | "Earthing Electrodes & Plates \| InfraVolt" | "Earthing Electrodes & Copper Bonded Earth Rods \| InfraVolt" | "Earthing Electrodes & Plates" | Keep, add subheading | "Copper-bonded, copper and galvanized electrode and plate solutions designed to dissipate fault and lightning currents safely into the ground." | Add "copper bonded earth rods" / "earth rods" verbatim once | Brief's exact primary keyword "copper bonded earth rods" is not present anywhere; the underlying SKU data ("Copper covered", "Copper-bonded Steel") already substantiates the claim. |
| `/products/earthing-and-lightning-protection/lightning-protection` | "Lightning Protection \| InfraVolt" | "Lightning Protection Products \| InfraVolt" | "Lightning Protection" | Keep | "Air termination rods, active lightning rods, mounting bases and down-conductor fixing components for complete rooftop capture systems." | Keep — already product-focused, matches brief's instruction not to force service intent | Minor title tightening only; content/positioning is already correct per the brief's explicit "do not force contractor/service intent" instruction. |
| `/products/underfloor-systems` | "Underfloor Cable Trunking Systems \| InfraVolt" | Keep, minor tightening | "Underfloor Cable Trunking Systems" | Keep | "Underfloor Cable Trunking Systems — GDK junction boxes, GDKF socket & data accessories, GDK cable trays, GYDK raised-floor trunking and GOR aluminium trunking for flexible underfloor service distribution." | Keep | Already close to primary keyword "underfloor trunking systems"; no material change needed. |
| `/products/underfloor-systems/raised-floor-trunking` | "GYDK Raised-Floor Trunking \| InfraVolt" | "Raised Floor Trunking (GYDK) \| InfraVolt" | "GYDK Raised-Floor Trunking" | "Raised Floor Trunking" (keep GYDK as a subheading/model reference) | "In-cavity floor trunking and matching covers in five widths and three heights, for raised-access floor cable routing." | Add unhyphenated "raised floor trunking" / "raised floor cable management" verbatim once | Current title leads with the model code and hyphenates the phrase; brief's exact primary keyword is unhyphenated "raised floor trunking" — reordering surfaces the plain-English phrase first while keeping the model code for brand/spec recognition. |

*Every page not listed above (the remaining LED, earthing, and cable-management "audit opportunity" pages) was found to already carry a distinct, non-templated, market-aware title/H1 pair with no material gap against its assigned keyword — see §3 for the complete per-URL list.*

---

## 5. Content Gap Matrix

| URL | What exists | What's missing | Recommended additions |
|---|---|---|---|
| `/products/busbar/gs-super-compact` | Full spec table (400–6300 A, Icw/Ipk, Ue/Ui, resistance/reactance) for GSA/GSC; 6 applications incl. data centres; component list; G-BUS cross-sell | No IEC/BS busbar-system standard cited (only `EN 13601` copper-material grade); `applicationsHeading` field ("Where GS is used") defined in data but never rendered as an H2 | Cite the applicable busbar-system standard (**requires manufacturer validation** — e.g. IEC 61439-6 if applicable, not currently in source); render the existing `applicationsHeading` field as a live H2 (data already exists, just not wired to the component) |
| `/products/busbar/gr-cast-resin` | Full GR-A/GR-C spec tables, 5 applications, component list | Same standards gap as GS; no cross-link to GS/GGD/GL/GNL siblings | Cite applicable standard (**requires manufacturer validation**); add a "related busbar systems" cross-link block |
| `/products/busbar` (hub) | Fact strip (25–6300 A, IP50–68), 6 application cards, product grid | No literal "busbar trunking systems" phrase in title | Work exact phrase into title/description (§4) |
| `/products/cable-support-systems/*` (all 9 audited pages) | Consistent `BS EN 61537` / `IEC 61537` citation; material list; breadcrumbs; sibling cross-links | No `socialImage`/OG image anywhere in the family; spelling inconsistency "Hot-Dip Galvanized" (US) vs. one file's "galvanised" (GB) | Standardise spelling to British "galvanised" sitewide for this family (a house-style fix, not a claims issue); add an OG image per macro group |
| `/products/led-systems/special-hazardous-environment-lighting` | 4 named series incl. "GERSAN Exproof LED Lighting Systems"; IP65/IP66 family-specific ratings | **No ATEX/IECEx certification standard or zone rating cited anywhere in the repository** despite the "Exproof" naming implying one | Label explicitly "requires manufacturer validation" before any ATEX/explosion-proof keyword targeting; do not publish a certification claim until GERSAN supplies the applicable EN 60079 zone/cert data (note: `static-ex-proof-grounding`, a *different* earthing category, does already cite EN 60079-0/-1/-31 — that citation cannot be borrowed for the LED family) |
| `/products/led-systems/linear-trunking-lighting` | `MULTILINE 45` named system, IP54, F/L configs | All application copy is office/retail-oriented; no industrial continuous-row use-case shown | Add an industrial/warehouse continuous-row application example if genuinely supported by the catalogue (**requires product-team/GERSAN confirmation** of installation context) |
| `/products/led-systems/emergency-guidance-lighting` | 7 named series incl. `EML Twin-Spot`, `ARL`/`MAL Exit Sign Series` | "Emergency bulkhead lighting" covered by only one grouped 15W family; no BS 5266/EN 1838 standard quoted | Cite the applicable emergency-lighting standard (**requires manufacturer validation** — no BS 5266/EN 1838 reference found anywhere in source) |
| `/products/earthing-and-lightning-protection/exothermic-welding` | Named "Thermoveld" family, technical snapshot (connection scope, applications) | No standards code — only 2 of 8 earthing categories (this one and `inspection-ground-enhancement`) lack one; also an internal spelling inconsistency ("Thermoveld" in H3/data vs. "thermoweld" in image alt/filenames) | Add applicable standard if one exists (**requires manufacturer validation**); reconcile "Thermoveld"/"thermoweld" spelling |
| `/products/earthing-and-lightning-protection/inspection-ground-enhancement` | 3 named families (ground enhancement material, earthing pits, pipe clamps) | No standards code cited | Add applicable standard if one exists (**requires manufacturer validation**) |
| `/products/underfloor-systems/*` (all 6 sub-pages) | Full order-code/dimension/weight tables per model | No standards/certification copy anywhere in the family; no applications copy on any sub-page (only on the hub); every variant-row image alt text falls back to the bare model code | Add descriptive `imageAlt` per variant row (mechanical fix, no new claims needed — model/material data already exists in the same row); add applicable load-rating/standard if one exists (**requires manufacturer validation** — none found in current data) |
| `/application-map/*` (all 8 pages) | Rich per-zone application/product copy in the underlying data files (900–1600 lines each) | That copy — and the only links to `/products/*` pages — is gated behind client-side zone/hotspot interaction and absent from the page's default server-rendered HTML | Surface at least a static summary list (zone name + one-line description + link to the matching product page) outside the interactive widget, so crawlers and non-JS users see real content and real links without needing to click through |
| `/application-map/transport-infrastructure` | Full "Airport" content set (4 zones, 6 product families represented) | Title/H1/all copy say "Airport", not "Transport Infrastructure" — the URL and the brief's category name don't match the actual page content | Either rename the route to reflect its real airport-only scope, or broaden the content to genuinely cover transport infrastructure (rail/metro/port/road) — **architecture decision, needs user approval**, see §10 |
| Homepage | `content.manufacturer` and `content.capabilities` blocks are fully authored in `content.ts` (including further GERSAN-manufacturer disclosure language) | Neither block is rendered by `HomePageView` — dead content | Confirm with the team whether these blocks were meant to ship; if so, wire them in (**needs user/product confirmation**, not assumed here) |

---

## 6. Internal Linking Plan

Every recommendation below is anchored to a confirmed current state (either "this link already exists, keep it" or "this link is confirmed absent, add it") — nothing here assumes a link that wasn't checked.

| Source page | Target page | Suggested anchor text | Status |
|---|---|---|---|
| `/application-map` (data centre) | `/products/busbar/ggd-medium-power-busbar` | "GGD Medium Power busbar riser systems" | **Add** — currently only reachable after clicking through the interactive widget; no static link exists today. |
| `/application-map` (data centre) | `/products/busbar/gs-super-compact` | "GS Super Compact busbar for transformer connections" | **Add** — same gap. |
| `/application-map` (data centre) | `/products/busbar/gr-cast-resin` | "GR Cast Resin busbar for cooling plant rooms" | **Add** — same gap. |
| `/application-map` (data centre) | `/products/busbar/gnl-lighting-busbar` | "GNL lighting busbar for aisle LED lines" | **Add** — same gap. |
| `/application-map/commercial-building` … `/application-map/education-public-sector` (7 sector pages) | matching `/products/*` pages per that sector's `approvedProductFamilyIds` | sector-specific ("Cable management for [sector] cable routing", etc.) | **Add** — same structural gap applies to all 8 application-map pages, not just data centre. |
| `/products/busbar/gs-super-compact` | `/products/busbar/gr-cast-resin`, `/gl-lighting-busbar`, `/ggd-medium-power-busbar` | "Related busbar systems" | **Add** — confirmed GS currently links to no sibling busbar series at all. |
| `/products/busbar/gr-cast-resin` | `/products/busbar/gs-super-compact`, `/ggd-medium-power-busbar` | "Related busbar systems" | **Add** — same gap, confirmed by evidence. |
| `/products/busbar/gs-super-compact` "Data centres" application card | `/application-map` | "See GS Super Compact in a full data centre application map" | **Add** — currently one-directional (application-map links to busbar, busbar doesn't link back). |
| `/products/cable-support-systems/cable-trays-trunking` | `heavy-duty-cable-trays`, `normal-type-cable-trays`, `aluminium-cable-trays`, `cable-tray-clamping-lid`, `pregalvanized-trunking-system`, `marine-lighting-fixture-cable-trays` | series names (existing card labels) | **Keep** — confirmed already present and correct. |
| `/products/cable-support-systems/cable-ladders` | `cable-ladder-c-profile-rung`, `heavy-duty-cable-ladders`, `gcmc-concave-convex-ladder`, `gmie-cable-ladders` | series names | **Keep** — confirmed already present, including the "missing" heavy-duty-cable-ladders link. |
| `/products/underfloor-systems/raised-floor-trunking` | other 5 underfloor series | "Related Series" | **Keep** — confirmed already present. |
| `/products/earthing-and-lightning-protection` (hub) | all 8 category pages | category card names | **Keep** — confirmed already present, consistent breadcrumb + PDF-catalogue pattern. |
| Homepage product cards | `/products/busbar`, `/products/cable-support-systems`, `/products/earthing-and-lightning-protection`, `/products/underfloor-systems`, `/products/led-systems` | existing card titles | **Keep** — confirmed present, one link per family. |
| Homepage industry cards | `/application-map` + 7 sector sub-pages | existing card titles | **Keep** — confirmed present. |

**Not verified this pass:** internal links from `/resources` and `/references` into specific product pages were not audited (out of the brief's named scope for this task) — flagged in §10 as an area for a future pass, not claimed here either way.

---

## 7. Cannibalisation Map

| Keyword | Competing URLs | Preferred URL | Secondary intent for non-preferred page(s) |
|---|---|---|---|
| "cable tray" / "cable tray systems" | `/products/cable-support-systems/cable-trays-trunking` (hub), `/heavy-duty-cable-trays`, `/normal-type-cable-trays`, `/aluminium-cable-trays`, `/wire-mesh-systems` | **`/products/cable-support-systems/cable-trays-trunking`** — matches the brief's own primary/secondary keyword assignment for this URL | `heavy-duty-cable-trays` → "heavy duty cable tray" (already has this modifier); `normal-type-cable-trays` → "normal type cable tray"; `aluminium-cable-trays` → "aluminium cable tray"; `wire-mesh-systems` → "wire mesh cable tray" / "cable basket" (brief-assigned). All four already carry a differentiating modifier — the risk is specifically for the *un-modified* "cable tray" query, which no single page currently claims explicitly. |
| "lighting busbar" | `/products/busbar/gl-lighting-busbar`, `/products/busbar/gnl-lighting-busbar` | **`/products/busbar/gl-lighting-busbar`** — broader 40–100 A range and explicit "industrial and commercial lighting distribution" framing | `gnl-lighting-busbar` → narrower 25/40 A "raised-floor supply point" / low-current lighting-circuit angle (already distinct in its own hero copy: "energising lighting circuits and raised-floor supply points"). |
| "data centre" (as an application, not a URL-level keyword) | `/products/busbar` (hub applications list), `/products/busbar/gs-super-compact`, `/gr-cast-resin`, `/ggd-medium-power-busbar`, `/application-map` | **`/application-map`** for the specific long-tail "data centre busbar" — but see §8/§10, this page's content is currently client-interaction-gated and needs a structural fix before it can reliably rank for that phrase. Product pages keep "data centres" as one of several listed applications, not a page-defining term. | No change needed to the individual busbar product pages' application lists — this is expected, healthy topical overlap, not literal title/H1 duplication. |
| "cable management systems" / "cable containment systems" | `/products/cable-support-systems` (hub only) | `/products/cable-support-systems` | No competing URL found — single-owner, no action needed beyond the metadata tightening in §4. |
| "earthing" (as a shared root across the family) | `/products/earthing-and-lightning-protection` (hub) + all 8 category pages | Hub owns the bare "earthing" query; each category page owns its own distinct compound term (e.g. "equipotential earth bars", "exothermic welding") | Low risk — confirmed each category name is specific enough to avoid direct duplication; only the shared root term is common, which is expected and healthy for a category-hub structure. |

---

## 8. Technical SEO Findings

**Critical**

1. **Zero structured data (JSON-LD) anywhere in the codebase.** A repo-wide grep for `application/ld+json`, `schema.org`, `JsonLd`, and `StructuredData` across all of `src/` returned zero matches, independently confirmed by all six research passes plus a direct check. No `Organization`, `WebSite`, `Product`, or `BreadcrumbList` schema exists on the homepage, any product page, or any application-map page.
2. **`/admin`, `/auth`, and `/portal` route groups carry no page-level `noindex`.** The root layout (`src/app/layout.tsx:15`) sets `metadata.robots = isSiteIndexingEnabled() ? undefined : { index: false, follow: false }` — a single global switch. `src/app/robots.ts` returns a blanket `{ userAgent: "*", allow: "/" }` when indexing is enabled, with no `disallow` for any path. None of `src/app/(admin)/admin/layout.tsx`, `src/app/(auth)/layout.tsx`, or `src/app/(portal)/portal/layout.tsx` (confirmed by direct read and a repo-wide `grep -rl "robots"` across all three route groups, zero matches) override this. **Practical effect now that indexing is enabled in production:** these utility routes are not excluded from the sitemap XML (they were never in `PUBLIC_ROUTE_PATHS` to begin with), but they are also not blocked from crawling/indexing by either robots.txt or a meta-robots tag — if a URL under `/admin`, `/auth`, or `/portal` is ever linked from anywhere or otherwise discovered, nothing in the current code stops it being indexed. This is exactly the "potentially indexable utility/admin/auth page" risk the brief asked to check for, and it is real.

**High**

3. **"Cable tray" cannibalisation** — 5 live, indexable URLs share "Cable Tray(s)" as the literal head noun in both title and H1 with no page explicitly claiming the un-modified query. Full detail in §7.
4. **No social-share image configured anywhere.** Every audited `generateMetadata()` call (busbar, cable management, LED, earthing, underfloor, homepage, about, application-map — all confirmed individually) calls the shared `marketPageMetadata()` helper without a `socialImage` argument, so `openGraph.images` is `undefined` and every Twitter card sitewide falls back to `"summary"` instead of `"summary_large_image"`. This is sitewide, not a single-page issue.
5. **Application-map pages' product copy and product links are gated behind client-side interaction.** `ApplicationMapViewer` is a `"use client"` component; the zone/hotspot-specific `usedHereFor`/`applicationPoints`/`benefits` copy and the only `<Link>`s to `/products/*` pages mount into the DOM only after a user clicks a zone and then a hotspot. The page's default server-rendered markup contains only the H1, one intro sentence, zone names, and 6 generic (identically-worded across every sector) product-family labels — with the sole link being `Link href="/"`. This significantly limits these pages' ability to pass internal-link signal to product pages or to independently rank for "sector + product" long-tail terms.

**Medium**

6. **Title-template inconsistency** between static cable-management routes (`"{Product} | Cable Management Systems | InfraVolt"`) and the two `[slug]`-dynamic-route pages (`"{Product} (${Qualifier}) | InfraVolt"` — missing the middle segment): affects `heavy-duty-cable-ladders` and `emt-imc-rsc-conduit-systems` specifically.
7. **Internal label mismatch**: the cable-support-systems hub's own nav card calls one page "Wire-Mesh **Systems**" while that page's own title/H1 say "Wire-Mesh **Cable Trays**" — an internal inconsistency between two pieces of InfraVolt's own code, not a claim about external search behaviour.
8. **Spelling inconsistency** for a UK/en-GB-targeted site: "Hot-Dip Galvanized" (American spelling) is used pervasively (2,900+ occurrences per the research pass) across cable-management data files, while one file (`wire-mesh-content.ts`) uniquely uses British "galvanised".
9. **`/application-map/transport-infrastructure` naming/scope mismatch** — every visible string (title, H1, zone-nav label) says "Airport", not "Transport Infrastructure", despite the URL slug and the brief's 8-category list both saying "transport infrastructure". No rail/metro/port/road content exists anywhere in this route's data.
10. **Underfloor-systems variant image alt text is systematically weak.** `imageAlt` is unset on every single variant row across all 6 sub-pages' data files, so rendered alt text always falls back to the bare model code (e.g. `"GYDK-10"`) rather than descriptive text.
11. **Busbar's `applicationsHeading` field is dead data.** Every series data file (`gs.ts`, `gr.ts`, `ggd.ts`, etc.) defines an `applicationsHeading` string (e.g. `"Where GS is used"`) that is never rendered by `BusbarApplicationsSection` — a ready-made, keyword-relevant H2 sitting unused.

**Low**

12. Two of the eight earthing categories (`exothermic-welding`, `inspection-ground-enhancement`) have no standards/certification citation in their technical snapshot, unlike the other six.
13. Two dead/orphaned files in the busbar route tree (`busbar-catalog-page.tsx` — an unused duplicate; `busbar-category-hero.tsx` — empty, zero references) carry no live SEO surface but are code-hygiene debt.
14. Internal spelling inconsistency "Thermoveld" (rendered family/H3 name) vs. "thermoweld" (image alt text and asset filenames) on the exothermic-welding page.
15. Homepage's authored `content.manufacturer` and `content.capabilities` copy blocks (including further GERSAN-manufacturer disclosure language) exist in `content.ts` but are never rendered by `HomePageView` — authored content that never reaches the live page.

**Confirmed healthy / no action needed**
- **Canonical/hreflang mechanism**: a single shared helper (`marketPageMetadata()` in `src/modules/seo/market-metadata.ts`) is used by every audited page with no per-page override found anywhere — canonical always resolves to `siteUrls[market] + pathname`, and `alternates.languages` always emits both `en-GB` (UK) and `uk-UA` (UA) regardless of which market is being rendered. This is the single code path that "wins" for every page audited; no conflicting static/dynamic metadata was found anywhere.
- **UK/UA separation**: distinct `NEXT_PUBLIC_SITE_URL_UK` / `NEXT_PUBLIC_SITE_URL_UA` env vars feed the market resolver (`src/modules/markets/server.ts`); mechanism confirmed correct from source, though the live production values themselves are Vercel env vars not present in this repository and were not independently verified beyond the mechanism.
- **www → apex canonicalisation**: `src/proxy.ts` issues a 308 redirect from `www.infravolt.co.uk` to the apex domain via the market resolver's `redirectToCanonical` alias mechanism — a deliberate, well-implemented pattern, not a risk.
- **Sitemap coverage**: `src/app/sitemap.ts` builds its entries directly from `PUBLIC_ROUTE_PATHS` (`src/modules/seo/public-route-manifest.ts`, 147 total paths) and returns `[]` when indexing is disabled. All Phase 1 target/audit URLs confirmed present in this list, including both "missing page" URLs (`heavy-duty-cable-ladders`, `emt-imc-rsc-conduit-systems`) and all 8 earthing / 6 underfloor slugs.
- **Site indexing gate**: `src/config/site-indexing.ts` fails closed unless `SITE_INDEXING_ENABLED === "true"` AND `VERCEL_ENV === "production"` — Preview/staging environments cannot accidentally become indexable even if the flag is copied there. Not altered, not recommended to alter.
- **Trailing slash / apex assumptions**: `next.config.ts` sets no explicit `trailingSlash` option — Next.js default behaviour applies. This could not be conclusively verified from static source alone and would need a live check; not claiming a specific behaviour here.

---

## 9. Phase 1 Implementation Order

Ordering reflects evidence strength (how close the page already is to its target) and structural blockers (fix the platform-level issue before polishing the page it affects), not effort alone.

**A. Busbar**
1. `/products/busbar/gs-super-compact` — work "high power busbar" into on-page copy (strongest content, most literal metadata gap).
2. `/products/busbar/gr-cast-resin` — minor tightening only, already close.
3. `/products/busbar` (hub) — work "busbar trunking systems" verbatim into title/description.
4. Resolve GL vs. GNL "lighting busbar" preferred-URL decision (§7) before touching either page's copy.
5. `/products/busbar/ggd-medium-power-busbar` — add "rising main"/vertical-riser language.
6. `/application-map` (data centre) — structural fix first (§8 Critical/High #5), then copy can follow.

**B. Cable Management**
1. Fix the `heavy-duty-cable-ladders` / `emt-imc-rsc-conduit-systems` title template (quick, mechanical, unblocks their other keyword work).
2. Resolve the 5-way "cable tray" cannibalisation decision (§7) — designate `cable-trays-trunking` as preferred, before editing any of the other four pages' metadata.
3. `/products/cable-support-systems/wire-mesh-systems` — fix the hub-label mismatch, add "cable basket"/"wire basket tray".
4. `/products/cable-support-systems` (hub) — work "cable containment systems" into title/H1.
5. Standardise "galvanized"/"galvanised" spelling across the family (house-style, low urgency, batch with other copy edits).

**C. LED**
1. `/products/led-systems/industrial-high-bay-lighting` — no material gap; treat as the reference pattern for the rest of the family.
2. `/products/led-systems/parking-waterproof-lighting` — same, no material gap.
3. `/products/led-systems/outdoor-infrastructure-lighting` — already supports street/flood/tunnel intent; light metadata polish only.
4. `/products/led-systems/emergency-guidance-lighting` — strong for exit-sign/twin-spot; needs content investment on bulkhead sub-theme before targeting that specifically.
5. `/products/led-systems/linear-trunking-lighting` — needs an industrial continuous-row use-case example before broadening beyond office/retail framing.
6. `/products/led-systems/special-hazardous-environment-lighting` — **hold** until GERSAN validates the ATEX/certification claim implied by "Exproof" naming (§10).

**D. Earthing & Lightning**
1. `/products/earthing-and-lightning-protection` (hub) and `/lightning-protection`, `/equipotential-earth-bars` — already the strongest keyword-to-URL matches in the family, treat as reference pattern.
2. `/products/earthing-and-lightning-protection/earthing-electrodes-plates` — work "copper bonded earth rods" into title/H1.
3. `/products/earthing-and-lightning-protection/exothermic-welding` — fix "Thermoveld"/"thermoweld" spelling; flag standards gap for manufacturer input.
4. `/products/earthing-and-lightning-protection/inspection-ground-enhancement` — same standards-gap flag.
5. Remaining audit-opportunity slugs (`conductors-tapes`, `clamps-connectors`, `static-ex-proof-grounding`) — no material gaps found; lowest priority within this family.

**E. Underfloor**
1. Add descriptive `imageAlt` across all 6 sub-pages' variant tables — the single highest-leverage, lowest-risk fix in this family (mechanical, no new claims, fixes a confirmed 100%-affected gap).
2. `/products/underfloor-systems/raised-floor-trunking` — reorder title/H1 to lead with the unhyphenated "Raised Floor Trunking" phrase.
3. `/products/underfloor-systems` (hub) — minor metadata tightening only.
4. Content-depth investment across all 6 sub-pages (applications copy, standards citation) — largest lift in the whole audit, sequence after the mechanical fixes above.

---

## 10. DO NOT CHANGE YET

Items below require explicit user approval, GERSAN/manufacturer validation, or an architecture decision — none are implemented in this audit and none should be treated as pre-approved.

- **ATEX / explosion-proof / IECEx certification claims** for `/products/led-systems/special-hazardous-environment-lighting` — the "Exproof" series naming implies a certification that is not cited anywhere in the current data. Do not add "ATEX LED lighting" or "explosion proof LED lighting" to metadata or copy until GERSAN supplies the applicable EN 60079 zone/certificate data.
- **Busbar-system-level standards** (e.g. a possible IEC 61439-6 citation) for GS/GR/GGD — only a copper-material grade standard (`EN 13601`) was found; no system-level standard is currently cited anywhere in the busbar data. Requires manufacturer validation before publishing.
- **Emergency-lighting standard** (e.g. BS 5266 / EN 1838) for `/products/led-systems/emergency-guidance-lighting` — not currently cited anywhere in source; requires manufacturer validation.
- **Standards citation** for `exothermic-welding` and `inspection-ground-enhancement` (earthing family) — confirm whether an applicable standard exists before adding one.
- **`/application-map/transport-infrastructure` scope decision** — whether to rename the route to reflect its actual airport-only content, or genuinely broaden the content to cover rail/metro/port/road. This is a content-architecture decision, not a copy edit, and needs explicit user direction; no redirect or route change is proposed or implied here.
- **Application-map structural rework** (§8 Critical/High #5, §6) — adding a static, always-visible summary/link block outside the interactive widget is a component-level change, not a copy edit; needs design/engineering sign-off before implementation.
- **GL vs. GNL "lighting busbar" preferred-URL decision** (§7) — a recommendation is given, but which URL formally "owns" the keyword is a product-positioning call for the user, not something to execute unilaterally.
- **5-way "cable tray" cannibalisation decision** (§7) — same: a preferred-URL recommendation is given, execution needs sign-off.
- **Homepage `content.manufacturer`/`content.capabilities` blocks** — confirm with the team whether this authored-but-unrendered content was intentionally cut or is a bug before deciding whether to wire it in.
- **Any schema/JSON-LD addition** (§8 Critical #1) — explicitly listed in the brief as "audit but do not change"; flagged here as a finding only, no markup proposed for implementation in this pass.
- **British-spelling standardisation** ("galvanised" vs "galvanized") across cable-management data — a house-style decision for the content owner, not assumed here.

---

## Evidence & Methodology Notes

- Every "not found" statement above reflects a repository-wide or directory-scoped grep/read that returned zero matches at the time of this audit — re-verify before treating any "not found" as still accurate if this audit is read significantly later.
- No search volume, keyword difficulty, CPC, or current Google ranking data was used, inferred, or implied anywhere in this document, per the task's evidence rules.
- This audit did not perform a live crawl, did not render any page in a browser, and did not inspect production HTTP responses — all findings are static-source-code and static-data-file evidence only.
