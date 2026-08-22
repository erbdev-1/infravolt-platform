"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  EnquiryAddedConfirmation,
  EnquiryToolbarSummary,
} from "@/components/public/enquiry/enquiry-feedback";
import type { EarthingHubContent, EarthingProductVariant } from "@/data/products/earthing-lightning/types";
import { addEnquiryItem, removeEnquiryItem, useEnquiryItems } from "@/modules/enquiry/store";
import { earthingEnquiryItem } from "@/modules/enquiry/item-builders";
import type { MarketCode } from "@/modules/markets/types";

import { buildVariantCsv, downloadCsv } from "./earthing-variant-csv";
import { slugifyFamilyName } from "./earthing-family-slug";
import { IconCheck, IconChevronDown, IconClose, IconCopy, IconDownload, IconSearch } from "./earthing-icons";
import styles from "./earthing-category-detail-page.module.css";

// Each family is a plain <button>-triggered panel — no <details>, no Link,
// no route of any kind. `expandedFamilies` (keyed by the same slug used for
// the #hash target and the panel id) is the single source of truth for
// what's open; nothing else decides it. A family's table only exists in the
// DOM while its slug is in that set, which is what keeps a 479-row category
// from rendering rows it was never asked to show.

type FamilyGroup = Readonly<{
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
        slug: slugifyFamilyName(group.familyName),
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

  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering = normalizedQuery !== "" || activeMaterial !== null;

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

  function toggleEnquiry(variant: EarthingProductVariant, familyName: string) {
    const item = earthingEnquiryItem(
      categorySlug,
      slugifyFamilyName(familyName),
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

        {hasCurrentPageEnquiryItem ? (
          <EnquiryToolbarSummary count={enquiryItems.length} market={market} />
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
        <div aria-label={labels.variantsMaterialFilterLabel} className={styles.materialChips} role="group">
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
              {material}
              <span className={styles.chipCount}>{materialCounts.get(material) ?? 0}</span>
            </button>
          ))}
        </div>
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
                            {group.visible.map(({ variant }) => {
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
                                  <td data-label={labels.variantsColumnMaterial}>{variant.material ?? "—"}</td>
                                  <td data-label={labels.variantsColumnDimensions}>{variant.dimensions ?? "—"}</td>
                                  <td data-label={labels.variantsColumnWeight}>{variant.weight ?? "—"}</td>
                                  <td data-label={labels.variantsColumnAction}>
                                    <button
                                      aria-pressed={inEnquiry}
                                      className={inEnquiry ? styles.variantEnquiredButton : styles.variantEnquiryButton}
                                      onClick={() => toggleEnquiry(variant, group.familyName)}
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
    </section>
  );
}
