"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  EnquiryAddedConfirmation,
  EnquiryToolbarSummary,
} from "@/components/public/enquiry/enquiry-feedback";
import type { EarthingHubContent, EarthingProductVariant } from "@/data/products/earthing-lightning/types";
import { addEnquiryItem, removeEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import { earthingEnquiryItem } from "@/modules/enquiry/item-builders";
import type { MarketCode } from "@/modules/markets/types";

import { buildVariantCsv, downloadCsv } from "./earthing-variant-csv";
import { IconCheck, IconChevronDown, IconClose, IconCopy, IconDownload, IconSearch } from "./earthing-icons";
import styles from "./earthing-category-detail-page.module.css";

// Each family is a plain <button>-triggered panel — no <details>, no Link,
// no route of any kind. `expandedFamilies` (keyed by the same slug used for
// the #hash target and the panel id) is the single source of truth for
// what's open; nothing else decides it. A family's table only exists in the
// DOM while its slug is in that set, which is what keeps a 479-row category
// from rendering rows it was never asked to show.

type FamilyGroup = Readonly<{
  /** Stable, locale-independent id (see LocalizedEarthingProductFamily.id)
   * — this is what actually identifies the family everywhere in this
   * component (panel id, #hash target, expandedFamilies key). familyName
   * is display-only. */
  familyId: string;
  familyName: string;
  variants: readonly EarthingProductVariant[];
  image?: string;
  imageAlt?: string;
}>;

type CategoryDetailLabels = EarthingHubContent["categoryDetail"];

type VariantTableProps = Readonly<{
  groups: readonly FamilyGroup[];
  labels: CategoryDetailLabels;
  /** First applicable-standards value already shown in this category's
   * TechnicalSnapshotStrip — reused as-is for the metadata line, never
   * fabricated. Absent for categories with no "shield" snapshot item. */
  standardLabel?: string;
  categorySlug: string;
  categoryName: string;
  market: MarketCode;
}>;

function buildHaystack(variant: EarthingProductVariant): string {
  return [variant.model, variant.name, variant.orderCode, variant.stockCode, variant.material, variant.dimensions, variant.weight]
    .filter((part): part is string => Boolean(part))
    .join(" ")
    .toLowerCase();
}

// Display-only cleanup — never touches the underlying value used for
// filter matching/equality, only how a material string is *shown* (chip
// label, table cell). Collapses stray double-spaces and normalises the
// "A; B" separator some catalogue rows use to "A, B" for readability.
// Distinct raw values (e.g. "AL" vs "Aluminium", "Cu" vs "Copper") are
// deliberately left unmerged — see the final report for why.
function formatMaterialLabel(material: string): string {
  return material.trim().replace(/\s+/g, " ").replace(/\s*;\s*/g, ", ");
}

export function EarthingVariantTable({
  groups,
  labels,
  standardLabel,
  categorySlug,
  categoryName,
  market,
}: VariantTableProps) {
  const sourceRoute = `/products/earthing-and-lightning-protection/${categorySlug}`;
  const enquiryItems = useEnquiryItems();
  const enquiryItemIds = useMemo(() => new Set(enquiryItems.map((item) => item.id)), [enquiryItems]);
  const hasCurrentPageEnquiryItem = enquiryItems.some(
    (item) => item.system === "earthing-lightning" && item.sourceRoute === sourceRoute,
  );

  const totalCount = useMemo(
    () => groups.reduce((sum, group) => sum + group.variants.length, 0),
    [groups],
  );

  // Family identity is always this slug — used for the panel id, the
  // #hash target, and the expandedFamilies key. One value, never re-derived
  // differently in different places.
  const slugGroups = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        slug: group.familyId,
        variants: group.variants.map((variant) => ({ variant, haystack: buildHaystack(variant) })),
      })),
    [groups],
  );

  const materials = useMemo(() => {
    const set = new Set<string>();
    for (const group of groups) {
      for (const variant of group.variants) {
        if (variant.material) set.add(variant.material);
      }
    }
    return Array.from(set).sort();
  }, [groups]);

  const [query, setQuery] = useState("");
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(() => new Set());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Readonly<{ id: string; title: string }> | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseButtonRef = useRef<HTMLButtonElement>(null);

  // Expanding a family used to dump every record at once — a 66-code
  // family alone produced a ~23,000px page. Each panel now renders only
  // this many rows, with a "Show more" control revealing the rest in the
  // same-size batches. Keyed by family slug, reset whenever the active
  // search/filter changes so a fresh query never inherits a previous
  // panel's expanded-to-200 state.
  const RESULTS_BATCH_SIZE = 10;
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  function visibleCountFor(slug: string) {
    return visibleCounts[slug] ?? RESULTS_BATCH_SIZE;
  }

  function showMore(slug: string) {
    setVisibleCounts((prev) => ({ ...prev, [slug]: visibleCountFor(slug) + RESULTS_BATCH_SIZE }));
  }

  // Mobile filter drawer: lock page scroll while open, close on Escape,
  // and return focus to the trigger button on close — the drawer itself
  // is only ever mounted while open (see JSX below), so focus is placed
  // on its close button as soon as it exists.
  useEffect(() => {
    if (!isFilterDrawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsFilterDrawerOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterDrawerOpen]);

  function closeFilterDrawer() {
    setIsFilterDrawerOpen(false);
    filtersButtonRef.current?.focus();
  }

  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering = normalizedQuery !== "" || activeMaterial !== null;

  useEffect(() => {
    setVisibleCounts({});
  }, [normalizedQuery, activeMaterial]);

  function toggleFamily(slug: string) {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  // Family cards ("Product families in this category") link to a plain
  // "#slug" anchor — a real <a>, not next/link — so the browser's native
  // same-page scroll always applies with zero JS involved and there is
  // nothing here that could ever navigate away. This effect only adds what
  // native anchors can't do on their own: expanding the matching panel and
  // a brief highlight so the destination is obvious.
  useEffect(() => {
    const validSlugs = new Set(slugGroups.map((group) => group.slug));

    function openFromHash() {
      const hash = window.location.hash.slice(1);
      if (!hash || !validSlugs.has(hash)) return;

      setExpandedFamilies((prev) => (prev.has(hash) ? prev : new Set(prev).add(hash)));

      const target = document.getElementById(hash);
      if (!target) return;

      target.classList.add(styles.variantGroupHighlight);
      window.setTimeout(() => {
        target.classList.remove(styles.variantGroupHighlight);
      }, 1600);
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [slugGroups]);

  function handleCopy(stockCode: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    navigator.clipboard
      .writeText(stockCode)
      .then(() => {
        setCopiedCode(stockCode);
        window.setTimeout(() => {
          setCopiedCode((current) => (current === stockCode ? null : current));
        }, 1500);
      })
      .catch(() => {
        // Clipboard permission denied or unavailable — non-critical
        // enhancement, fail silently.
      });
  }

  function toggleEnquiry(variant: EarthingProductVariant, familyId: string, familyName: string) {
    // familyId must be the same stable id earthingEnquiryItem is built with
    // everywhere else in this component (see the inEnquiry check below) —
    // otherwise the id used to add an item and the id used to check whether
    // it's already added can disagree, which is exactly what happened when
    // this re-derived its own slug from the (market-translated) familyName.
    const item = earthingEnquiryItem(
      categorySlug,
      familyId,
      familyName || categoryName,
      variant,
      sourceRoute,
    );
    const { id } = item;

    if (enquiryItemIds.has(id)) {
      removeEnquiryItem(id);
      setConfirmation((current) => (current?.id === id ? null : current));
      return;
    }

    addEnquiryItem(item);
    setConfirmation({ id, title: `${variant.model} · ${variant.stockCode}` });
  }

  // One search pass (query only) drives the material chip counts, so every
  // chip reflects "how many results if I also picked this material" rather
  // than collapsing to zero once a material is already active.
  const searchOnlyVariants =
    normalizedQuery === ""
      ? slugGroups.flatMap((group) => group.variants.map(({ variant }) => variant))
      : slugGroups.flatMap((group) =>
          group.variants.filter(({ haystack }) => haystack.includes(normalizedQuery)).map(({ variant }) => variant),
        );

  const allCount = searchOnlyVariants.length;
  const materialCounts = new Map<string, number>();
  for (const variant of searchOnlyVariants) {
    if (!variant.material) continue;
    materialCounts.set(variant.material, (materialCounts.get(variant.material) ?? 0) + 1);
  }

  const filteredGroups = slugGroups.map((group) => ({
    ...group,
    visible: group.variants.filter(
      ({ variant, haystack }) =>
        (normalizedQuery === "" || haystack.includes(normalizedQuery)) &&
        (activeMaterial === null || variant.material === activeMaterial),
    ),
  }));

  const filteredTotal = filteredGroups.reduce((sum, group) => sum + group.visible.length, 0);
  const hasAnyMatch = filteredGroups.some((group) => group.visible.length > 0);

  // While filtering, matching families are auto-exposed — merged into
  // expandedFamilies (never removed), so a manual close made mid-search
  // isn't immediately fought, but the next keystroke that still matches
  // will surface it again. Adjusted during render (React's documented
  // pattern for syncing state to a derived value) rather than in an
  // effect, so there's no extra render with a stale collapsed panel.
  let visibleExpanded = expandedFamilies;
  if (isFiltering) {
    const toReveal = filteredGroups
      .filter((group) => group.visible.length > 0 && !expandedFamilies.has(group.slug))
      .map((group) => group.slug);

    if (toReveal.length > 0) {
      const next = new Set(expandedFamilies);
      for (const slug of toReveal) next.add(slug);
      visibleExpanded = next;
      setExpandedFamilies(next);
    }
  }

  const csvHeaders = {
    family: labels.variantsColumnFamily,
    model: labels.variantsColumnModel,
    name: labels.variantsColumnDescription,
    stockCode: labels.variantsColumnStockCode,
    material: labels.variantsColumnMaterial,
    dimensions: labels.variantsColumnDimensions,
    weight: labels.variantsColumnWeight,
  };

  function handleDownloadFiltered() {
    const records = filteredGroups.flatMap((group) =>
      group.visible.map(({ variant }) => ({ familyName: group.familyName, variant })),
    );
    downloadCsv(`${categorySlug}-order-codes-filtered.csv`, buildVariantCsv(records, csvHeaders));
  }

  function handleDownloadAll() {
    const records = groups.flatMap((group) =>
      group.variants.map((variant) => ({ familyName: group.familyName, variant })),
    );
    downloadCsv(`${categorySlug}-order-codes-all.csv`, buildVariantCsv(records, csvHeaders));
  }

  // Rendered twice: inline (tablet/desktop, always visible — see
  // .materialChips) and inside the mobile filter drawer (see .drawerChips).
  // Same state, same buttons, two CSS-gated placements — never two
  // independent copies of the filter logic.
  const materialChipButtons = (
    <>
      <button
        aria-pressed={activeMaterial === null}
        className={activeMaterial === null ? styles.chipActive : styles.chip}
        onClick={() => setActiveMaterial(null)}
        type="button"
      >
        {labels.variantsAllMaterials}
        <span className={styles.chipCount}>{allCount}</span>
      </button>

      {materials.map((material) => (
        <button
          aria-pressed={activeMaterial === material}
          className={activeMaterial === material ? styles.chipActive : styles.chip}
          key={material}
          onClick={() => setActiveMaterial((current) => (current === material ? null : material))}
          type="button"
        >
          {formatMaterialLabel(material)}
          <span className={styles.chipCount}>{materialCounts.get(material) ?? 0}</span>
        </button>
      ))}
    </>
  );

  return (
    <section className={styles.variants}>
      <div className={styles.familiesHeading}>
        <h2>{labels.variantsHeading}</h2>
        <div className={styles.variantsMeta}>
          <span>
            {totalCount} {labels.variantsMetaCodesLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {groups.length} {labels.variantsMetaFamiliesLabel}
          </span>
          {standardLabel ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{standardLabel}</span>
            </>
          ) : null}
        </div>
        <p>{labels.variantsIntroduction}</p>
      </div>

      <div className={styles.variantsToolbar}>
        <div className={styles.searchField}>
          <IconSearch aria-hidden="true" className={styles.searchIcon} />
          <input
            aria-label={labels.variantsSearchLabel}
            className={styles.searchInput}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.variantsSearchPlaceholder}
            type="text"
            value={query}
          />
          {query ? (
            <button
              aria-label={labels.variantsClearSearchAction}
              className={styles.searchClear}
              onClick={() => setQuery("")}
              type="button"
            >
              <IconClose aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {materials.length > 1 ? (
          <button
            aria-haspopup="dialog"
            className={styles.filtersButton}
            onClick={() => setIsFilterDrawerOpen(true)}
            ref={filtersButtonRef}
            type="button"
          >
            {labels.variantsFiltersButtonLabel}
            {activeMaterial ? <span className={styles.filtersButtonCount}>1</span> : null}
          </button>
        ) : null}

        {hasCurrentPageEnquiryItem ? (
          <div className={styles.enquirySummaryWrap}>
            <EnquiryToolbarSummary count={enquiryItems.length} market={market} />
          </div>
        ) : null}

        <div className={styles.csvActions}>
          <button
            aria-label={`${labels.variantsDownloadCsvAction} (${filteredTotal} ${labels.variantsCountSuffix})`}
            className={styles.csvButton}
            disabled={filteredTotal === 0}
            onClick={handleDownloadFiltered}
            type="button"
          >
            <IconDownload aria-hidden="true" className={styles.csvButtonIcon} />
            {labels.variantsDownloadCsvAction}
          </button>

          {isFiltering ? (
            <button
              aria-label={`${labels.variantsDownloadAllCsvAction} (${totalCount} ${labels.variantsCountSuffix})`}
              className={styles.csvButtonSecondary}
              onClick={handleDownloadAll}
              type="button"
            >
              {labels.variantsDownloadAllCsvAction}
            </button>
          ) : null}
        </div>
      </div>

      {materials.length > 1 ? (
        <>
          {/* Tablet/desktop only (see .materialChips) — the full wall stays
              inline and visible, nothing changes above the mobile
              breakpoint. */}
          <div aria-label={labels.variantsMaterialFilterLabel} className={styles.materialChips} role="group">
            {materialChipButtons}
          </div>

          {/* Mobile only — the wall is hidden (see .filtersButton above)
              and replaced by this single active-filter chip, so the
              current filter stays visible without the full chip list
              occupying the screen. */}
          {activeMaterial ? (
            <div className={styles.selectedFiltersRow}>
              <button
                aria-label={`${labels.variantsFiltersRemoveAction}: ${formatMaterialLabel(activeMaterial)}`}
                className={styles.selectedChip}
                onClick={() => setActiveMaterial(null)}
                type="button"
              >
                {formatMaterialLabel(activeMaterial)}
                <IconClose aria-hidden="true" className={styles.selectedChipIcon} />
              </button>
            </div>
          ) : null}
        </>
      ) : null}

      {isFiltering ? (
        <p aria-live="polite" className={styles.variantsResultsLine}>
          {labels.variantsShowingLabel} {filteredTotal} {labels.variantsOfLabel} {totalCount}{" "}
          {labels.variantsCountSuffix}
        </p>
      ) : null}

      <div className={styles.variantTableWrapper}>
        {!hasAnyMatch && isFiltering ? <p className={styles.variantsEmpty}>{labels.variantsNoResults}</p> : null}

        {filteredGroups.map((group) => {
          if (isFiltering && group.visible.length === 0) return null;

          const isExpanded = visibleExpanded.has(group.slug);
          const panelId = `order-code-panel-${group.slug}`;
          const triggerId = `order-code-trigger-${group.slug}`;
          const countLabel = isFiltering
            ? `${group.visible.length} ${labels.variantsMatchingCountSuffix}`
            : `${group.variants.length} ${labels.variantsCountSuffix}`;

          if (group.variants.length === 0 && process.env.NODE_ENV !== "production") {
            // Should be unreachable — the parent page filters out
            // record-less families before they ever reach this component.
            // Surfacing this loudly in dev catches a family-name/slug
            // mismatch immediately instead of a silently empty panel.
            console.warn(
              `EarthingVariantTable: "${group.familyName}" (slug "${group.slug}") has no records — check that its data key matches the family name exactly.`,
            );
          }

          return (
            <div className={styles.variantGroup} id={group.slug} key={group.slug}>
              <button
                aria-controls={panelId}
                aria-expanded={isExpanded}
                className={styles.variantGroupSummary}
                id={triggerId}
                onClick={() => toggleFamily(group.slug)}
                type="button"
              >
                <span className={styles.variantGroupIdentity}>
                  <span aria-hidden={group.image ? undefined : true} className={styles.variantGroupImage}>
                    {group.image ? (
                      <Image alt={group.imageAlt ?? group.familyName} fill sizes="56px" src={group.image} />
                    ) : null}
                  </span>
                  <span className={styles.variantGroupName}>{group.familyName}</span>
                </span>

                <span className={styles.variantGroupMeta}>
                  <span className={styles.variantGroupCount}>{countLabel}</span>
                  <IconChevronDown aria-hidden="true" className={styles.variantGroupChevron} />
                </span>
              </button>

              <div
                aria-labelledby={triggerId}
                className={styles.variantGroupPanel}
                data-expanded={isExpanded}
                id={panelId}
                role="region"
              >
                <div className={styles.variantGroupPanelInner}>
  {isExpanded ? (
                    group.variants.length === 0 ? (
                      <p className={styles.variantsEmpty}>{labels.variantsNoRecordsForFamily}</p>
                    ) : (
                      <>
                      <div className={styles.variantTableScroll}>
                        <table className={styles.variantTable}>
                          <thead>
                            <tr>
                              <th scope="col">{labels.variantsColumnModel}</th>
                              <th scope="col">{labels.variantsColumnStockCode}</th>
                              <th scope="col">{labels.variantsColumnMaterial}</th>
                              <th scope="col">{labels.variantsColumnDimensions}</th>
                              <th scope="col">{labels.variantsColumnWeight}</th>
                              <th scope="col">{labels.variantsColumnAction}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.visible.slice(0, visibleCountFor(group.slug)).map(({ variant }) => {
                              const inEnquiry = enquiryItemIds.has(
                                earthingEnquiryItem(
                                  categorySlug,
                                  group.slug,
                                  group.familyName || categoryName,
                                  variant,
                                  sourceRoute,
                                ).id,
                              );
                              const isCopied = copiedCode === variant.stockCode;

                              return (
                                <tr key={`${group.slug}-${variant.model}-${variant.stockCode}`}>
                                  <td data-label={labels.variantsColumnModel}>
                                    <strong>{variant.model}</strong>
                                    {variant.name !== variant.model ? (
                                      <span className={styles.variantSecondaryLine}>{variant.name}</span>
                                    ) : null}
                                  </td>
                                  <td data-label={labels.variantsColumnStockCode}>
                                    <span className={styles.stockCodeCell}>
                                      <span>{variant.stockCode}</span>
                                      <button
                                        aria-label={
                                          isCopied ? labels.variantsCopiedLabel : labels.variantsCopyStockCodeAction
                                        }
                                        className={styles.copyButton}
                                        onClick={() => handleCopy(variant.stockCode)}
                                        type="button"
                                      >
                                        {isCopied ? (
                                          <IconCheck aria-hidden="true" className={styles.copyIcon} />
                                        ) : (
                                          <IconCopy aria-hidden="true" className={styles.copyIcon} />
                                        )}
                                      </button>
                                    </span>
                                  </td>
                                  <td data-label={labels.variantsColumnMaterial}>
                                    {variant.material ? formatMaterialLabel(variant.material) : "—"}
                                  </td>
                                  <td data-label={labels.variantsColumnDimensions}>{variant.dimensions ?? "—"}</td>
                                  <td data-label={labels.variantsColumnWeight}>{variant.weight ?? "—"}</td>
                                  <td data-label={labels.variantsColumnAction}>
                                    <button
                                      aria-pressed={inEnquiry}
                                      className={inEnquiry ? styles.variantEnquiredButton : styles.variantEnquiryButton}
                                      onClick={() => toggleEnquiry(variant, group.slug, group.familyName)}
                                      type="button"
                                    >
                                      {inEnquiry ? labels.enquiryRemoveAction : labels.enquiryAddAction}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {group.visible.length > visibleCountFor(group.slug) ? (
                        <button
                          className={styles.showMoreButton}
                          onClick={() => showMore(group.slug)}
                          type="button"
                        >
                          {labels.variantsShowMoreAction} ({group.visible.length - visibleCountFor(group.slug)})
                        </button>
                      ) : null}
                      </>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {confirmation ? (
        <EnquiryAddedConfirmation
          count={enquiryItems.length}
          itemLabel={confirmation.title}
          market={market}
          onContinue={() => setConfirmation(null)}
        />
      ) : null}

      {/* Mobile-only filter drawer — mounted only while open (nothing to
          tab into or land on with a screen reader when closed). Never
          rendered at tablet/desktop widths in practice since .filtersButton
          (its only trigger) is CSS-hidden there. */}
      {isFilterDrawerOpen ? (
        <div className={styles.filterDrawerOverlay} onClick={closeFilterDrawer}>
          <div
            aria-labelledby="earthing-filter-drawer-title"
            aria-modal="true"
            className={styles.filterDrawer}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className={styles.filterDrawerHeader}>
              <h3 id="earthing-filter-drawer-title">{labels.variantsFiltersDrawerTitle}</h3>
              <button
                aria-label={labels.variantsFiltersCloseAction}
                className={styles.filterDrawerClose}
                onClick={closeFilterDrawer}
                ref={drawerCloseButtonRef}
                type="button"
              >
                <IconClose aria-hidden="true" />
              </button>
            </div>

            <div aria-label={labels.variantsMaterialFilterLabel} className={styles.drawerChips} role="group">
              {materialChipButtons}
            </div>

            <div className={styles.filterDrawerActions}>
              <button
                className={styles.filterDrawerClearAction}
                disabled={activeMaterial === null}
                onClick={() => setActiveMaterial(null)}
                type="button"
              >
                {labels.variantsFiltersClearAllAction}
              </button>

              <button className={styles.filterDrawerShowAction} onClick={closeFilterDrawer} type="button">
                {labels.variantsFiltersShowResultsAction} {filteredTotal} {labels.variantsCountSuffix}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
