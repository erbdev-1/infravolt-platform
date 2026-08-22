"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import {
  productFamilyCategoryPresentation,
  productFamilyIcon,
} from "@/modules/application-map/assets";
import type { ApplicationMapPageContent } from "@/modules/application-map/content";
import {
  productFamilySlugFromActions,
  routeApplicationMapActions,
} from "@/modules/application-map/enquiry-routing";
import type { ResolvedApplicationMap } from "@/modules/application-map/resolve";
import type { ProductFamilyId } from "@/modules/application-map/types";

import { ApplicationMapAspectFrame } from "./application-map-aspect-frame";
import { ApplicationHotspot } from "./application-hotspot";
import { ApplicationNavigation, type NavigationItem } from "./application-navigation";
import { ApplicationProductChooser } from "./application-product-chooser";
import { ApplicationProductPanel } from "./application-product-panel";
import {
  ApplicationSceneView,
  type SceneHotspotDescriptor,
} from "./application-scene";
import {
  ApplicationZoneStrip,
  type ZoneThumbnailItem,
} from "./application-zone-strip";
import styles from "./application-map-viewer.module.css";

// Bölge kimliği (zone id) sektöre göre değişir (Data Centre, Healthcare,
// ...); bu bileşen belirli bir sektöre bağlı olmadığı için düz string
// olarak ele alır — map, hangi sektörün ResolvedApplicationMap<TZoneId>'i
// olursa olsun buraya geçirilebilir (TZoneId her zaman string'in alt
// tipidir).
export type ApplicationMapViewerProps = Readonly<{
  map: ResolvedApplicationMap<string>;
  content: ApplicationMapPageContent;
  industryId: string;
  sourcePath: string;
  // "cover" (varsayılan): mevcut Data Centre davranışı — sahne yükseklik
  // tabanlıdır, görsel kırpılarak doldurur, galeri sahnenin ALT KENARINA
  // biner. "contain": görselin tam 16:9 oranı korunur, hiç kırpılmaz,
  // sahne kendi doğal oranına göre boyutlanır, kullanılmayan alan koyu
  // zeminle doldurulur, galeri sahnenin ALTINA (normal akışta, binmeden)
  // yerleşir. Yalnız masaüstünde etkilidir — mobil/tam ekran değişmez.
  overviewImageFit?: "cover" | "contain";
}>;

// Fullscreen desteği tarayıcı ömrü boyunca değişmez; harici bir "store" gibi
// ele alınıp useSyncExternalStore ile okunur. Bu, SSR anlık görüntüsü (her
// zaman false) ile ilk istemci render'ı arasında hydration uyuşmazlığı
// yaratmadan, effect içinde senkron setState çağrısına da gerek bırakmaz.
function subscribeToNothing() {
  return () => undefined;
}

function getFullscreenSupportSnapshot(): boolean {
  return (
    Boolean(document.fullscreenEnabled) &&
    typeof document.documentElement.requestFullscreen === "function"
  );
}

function getFullscreenSupportServerSnapshot(): boolean {
  return false;
}

// İlk-ziyaret ipucu (nabız animasyonu + "Select a system to explore")
// tarayıcı oturumu başına yalnız bir kez gösterilir; kullanıcı herhangi
// bir ürün/hotspot seçtiğinde kalıcı olarak kapanır. Bu değer render
// sırasında senkron setState olmadan okunup güncellenebilsin diye
// (fullscreenSupported ile aynı gerekçeyle) useSyncExternalStore tabanlı
// minik bir modül-seviyesi "store" olarak tutulur.
const ZONE_HINT_SESSION_KEY = "app-map-zone-hint-dismissed";
let hintDismissedCache: boolean | null = null;
const hintDismissedListeners = new Set<() => void>();

function getHintDismissedSnapshot(): boolean {
  if (hintDismissedCache === null) {
    try {
      hintDismissedCache =
        window.sessionStorage.getItem(ZONE_HINT_SESSION_KEY) === "1";
    } catch {
      hintDismissedCache = false;
    }
  }

  return hintDismissedCache;
}

function getHintDismissedServerSnapshot(): boolean {
  return false;
}

function subscribeToHintDismissed(callback: () => void): () => void {
  hintDismissedListeners.add(callback);

  return () => {
    hintDismissedListeners.delete(callback);
  };
}

function markZoneHintSeen() {
  if (hintDismissedCache === true) {
    return;
  }

  hintDismissedCache = true;

  try {
    window.sessionStorage.setItem(ZONE_HINT_SESSION_KEY, "1");
  } catch {
    // sessionStorage kullanılamıyorsa (gizli mod vb.) yalnız bellek içi
    // durum kullanılır; işlevsellik bozulmaz, sadece kalıcılık kaybolur.
  }

  for (const listener of hintDismissedListeners) {
    listener();
  }
}

export function ApplicationMapViewer({
  map,
  content,
  industryId,
  sourcePath,
  overviewImageFit = "cover",
}: ApplicationMapViewerProps) {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [activeProductFamilyId, setActiveProductFamilyId] =
    useState<ProductFamilyId | null>(null);
  // Aile seçimi (activeProductFamilyId) TEK BAŞINA hangi somut ürünün
  // gösterileceğini belirlemeye yetmez: bir zone'da aynı aileye (ör.
  // "busbar") ait BİRDEN FAZLA hotspot olabilir (ör. GGD + GNL). Bu yüzden
  // gösterilecek hotspot ayrı bir state ile, id üzerinden takip edilir.
  // Sol seçiciden tıklanıp o ailede birden fazla hotspot varsa bu null
  // kalır ve seçim listesi (ApplicationProductChooser) gösterilir.
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [mapAspectRatio, setMapAspectRatio] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Native Fullscreen API tarayıcı/ortam sınırlamalarıyla mevcut olsa bile
  // reddedebilir (iOS Safari en yaygın örnek: document.fullscreenEnabled
  // sıkça false, requestFullscreen ya yok ya da promise reject ediyor). Bu
  // durumda mobil/tablette (bkz. CSS .pageCssFullscreen, <=768px) sabit
  // konumlu bir "sahte tam ekran" moduna düşülür — aynı :fullscreen
  // düzenini taklit eder, yalnız tarayıcı API'siyle değil position:fixed
  // ile ekranı kaplar.
  const [cssFallbackActive, setCssFallbackActive] = useState(false);
  const scrollPositionRef = useRef(0);
  const bodyScrollLockRef = useRef<{
    bodyOverflow: string;
    bodyPosition: string;
    bodyTop: string;
    bodyWidth: string;
    htmlOverflow: string;
  } | null>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const mobileOverlayWasOpenRef = useRef(false);

  const hintDismissed = useSyncExternalStore(
    subscribeToHintDismissed,
    getHintDismissedSnapshot,
    getHintDismissedServerSnapshot,
  );

  const fullscreenSupported = useSyncExternalStore(
    subscribeToNothing,
    getFullscreenSupportSnapshot,
    getFullscreenSupportServerSnapshot,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Kullanıcı CSS fallback tam ekran açıkken sayfadan ayrılırsa (route
  // değişimi vb.) body kilidi component ile birlikte kaybolmasın diye
  // güvenlik amaçlı geri alınır.
  useEffect(() => {
    return () => {
      const savedStyles = bodyScrollLockRef.current;

      if (savedStyles) {
        document.body.style.overflow = savedStyles.bodyOverflow;
        document.body.style.position = savedStyles.bodyPosition;
        document.body.style.top = savedStyles.bodyTop;
        document.body.style.width = savedStyles.bodyWidth;
        document.documentElement.style.overflow = savedStyles.htmlOverflow;
        bodyScrollLockRef.current = null;
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cssFallbackActive) {
      return;
    }

    function handleOverlayKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      const savedStyles = bodyScrollLockRef.current;

      setCssFallbackActive(false);
      setIsFullscreen(false);

      if (savedStyles) {
        document.body.style.overflow = savedStyles.bodyOverflow;
        document.body.style.position = savedStyles.bodyPosition;
        document.body.style.top = savedStyles.bodyTop;
        document.body.style.width = savedStyles.bodyWidth;
        document.documentElement.style.overflow = savedStyles.htmlOverflow;
        bodyScrollLockRef.current = null;
        window.scrollTo(0, scrollPositionRef.current);
      }
    }

    window.addEventListener("keydown", handleOverlayKeyDown);

    return () => {
      window.removeEventListener("keydown", handleOverlayKeyDown);
    };
  }, [cssFallbackActive]);

  useEffect(() => {
    if (cssFallbackActive) {
      mobileOverlayWasOpenRef.current = true;
    } else if (!mobileOverlayWasOpenRef.current) {
      return;
    } else {
      mobileOverlayWasOpenRef.current = false;
    }

    const frame = window.requestAnimationFrame(() => {
      fullscreenButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [cssFallbackActive]);

  const familyById = new Map(
    map.productFamilies.map((family) => [family.id, family] as const),
  );
  const zoneById = new Map(map.zones.map((zone) => [zone.id, zone] as const));

  const activeZone = activeZoneId ? (zoneById.get(activeZoneId) ?? null) : null;

  const visibleProductFamilies = activeZone
    ? map.productFamilies.filter((family) =>
        activeZone.approvedProductFamilyIds.includes(family.id),
      )
    : map.productFamilies;

  const matchingHotspotsForFamily =
    activeZone && activeProductFamilyId
      ? activeZone.hotspots.filter(
          (hotspot) => hotspot.productFamilyId === activeProductFamilyId,
        )
      : [];

  const activeHotspot = activeHotspotId
    ? (matchingHotspotsForFamily.find(
        (hotspot) => hotspot.id === activeHotspotId,
      ) ?? null)
    : matchingHotspotsForFamily.length === 1
      ? matchingHotspotsForFamily[0]!
      : null;

  const activeProductFamily = activeProductFamilyId
    ? (familyById.get(activeProductFamilyId) ?? null)
    : null;

  const activeProductCategory = activeProductFamily
    ? productFamilyCategoryPresentation(activeProductFamily.id)
    : undefined;

  const baseProductActions =
    activeHotspot && activeProductFamily
      ? (activeHotspot.actions ?? activeProductFamily.actions)
      : [];

  const visibleProductActions =
    activeProductFamily && activeHotspot && activeZone
      ? routeApplicationMapActions(
          activeProductCategory
            ? [
                {
                  label: content.panel.exploreSystemLabel.replace(
                    "{system}",
                    activeProductFamily.name,
                  ),
                  href: activeProductCategory.href,
                  type: "page",
                },
                ...baseProductActions,
              ]
            : baseProductActions,
          {
            industry: industryId,
            industryLabel: content.headingSector,
            zone: activeZone.id,
            zoneLabel: activeZone.name,
            hotspot: activeHotspot.id,
            system: activeProductFamily.id,
            source: sourcePath,
            family: productFamilySlugFromActions(
              baseProductActions,
              activeProductFamily.id,
            ),
            label:
              activeHotspot.name &&
              activeHotspot.name !== activeProductFamily.name
                ? activeHotspot.name
                : undefined,
          },
        )
      : [];

  // Aynı ailede birden fazla hotspot var ama henüz hiçbiri seçilmediyse
  // (sol seçiciden yeni tıklandı), tam ürün paneli yerine seçim listesi
  // gösterilir.
  const showProductChooser =
    Boolean(activeProductFamily) &&
    !activeHotspot &&
    matchingHotspotsForFamily.length > 1;

  // İlk-ziyaret ipucu: bölgede henüz ürün seçilmemiş ve ipucu bu oturumda
  // kapatılmamışsa, o bölgenin ilk uygun ürün ailesi ve ona karşılık gelen
  // hotspot "nabız" alır — tıklanabilirliği işaret eder, seçili durumla
  // (kırmızı dolgu) karıştırılmaması için ayrı, daha yumuşak bir görsel
  // kullanır (bkz. .navItemPulse / .hotspotPulse).
  const showZoneHint =
    Boolean(activeZone) && !hintDismissed && !activeProductFamilyId;
  const firstAvailableProductFamilyId = showZoneHint
    ? (visibleProductFamilies[0]?.id ?? null)
    : null;

  const sceneHotspots: readonly SceneHotspotDescriptor[] = activeZone
    ? activeZone.hotspots.map((hotspot) => ({
        id: hotspot.id,
        number: familyById.get(hotspot.productFamilyId)?.number ?? 0,
        label: hotspot.label,
        x: hotspot.x,
        y: hotspot.y,
        pulse: hotspot.productFamilyId === firstAvailableProductFamilyId,
      }))
    : map.overview.hotspots.map((hotspot) => ({
        id: hotspot.id,
        number: zoneById.get(hotspot.zoneId)?.number ?? 0,
        label: hotspot.label,
        x: hotspot.x,
        y: hotspot.y,
      }));

  const navItems: readonly NavigationItem[] = visibleProductFamilies.map(
    (family) => ({
      id: family.id,
      number: family.number,
      name: family.name,
      icon: productFamilyIcon(family.id),
      active: family.id === activeProductFamilyId,
      pulse: family.id === firstAvailableProductFamilyId,
    }),
  );

  const zoneStripItems: readonly ZoneThumbnailItem[] = [
    {
      id: "overview",
      name: content.overviewThumbnailLabel,
      image: map.overview.image,
      imageAlt: map.overview.imageAlt,
      active: activeZoneId === null,
    },
    ...map.zones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      image: zone.image,
      imageAlt: zone.imageAlt,
      active: zone.id === activeZoneId,
    })),
  ];

  function selectZone(zoneId: string) {
    setActiveZoneId(zoneId);
    setActiveProductFamilyId(null);
    setActiveHotspotId(null);
  }

  function backToOverview() {
    setActiveZoneId(null);
    setActiveProductFamilyId(null);
    setActiveHotspotId(null);
  }

  // Bir galeri kartı (bölge veya "Overview") seçildiğinde sahneyi görünür
  // alana kaydırır — ürün/hotspot seçiminde bilerek TETİKLENMEZ (kullanıcı
  // zaten sahneye bakıyorken paneli açmak sayfayı sıçratmamalı).
  function scrollStageIntoView() {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    const stage = containerRef.current;

    if (!stage) {
      return;
    }

    if (document.fullscreenElement || cssFallbackActive) {
      // Tam ekranda kaydırılan document değil, tam ekran elemanının
      // kendisidir (.page:fullscreen'in overflow-y:auto'su).
      stage.scrollTo({ behavior, top: 0 });
      return;
    }

    // Site header sticky (position:sticky; top:0) olduğu için sahnenin
    // tepesi onun ARKASINDA kalmasın diye gerçek render edilmiş yüksekliği
    // kadar bir ofset düşülür. Sabit bir CSS değişkeni yerine gerçek
    // elemandan ölçülür — header yüksekliği ekran genişliğine göre değişir.
    const headerHeight =
      document.querySelector(".site-header")?.getBoundingClientRect()
        .height ?? 0;
    const targetTop =
      stage.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ behavior, top: Math.max(targetTop, 0) });
  }

  function handleZoneStripSelect(id: string) {
    if (id === "overview") {
      backToOverview();
      scrollStageIntoView();
      return;
    }

    if (zoneById.has(id)) {
      selectZone(id);
      scrollStageIntoView();
    }
  }

  function handleSceneHotspotSelect(id: string) {
    if (activeZone) {
      const hotspot = activeZone.hotspots.find((item) => item.id === id);

      if (hotspot) {
        // Bir hotspot'a doğrudan tıklamak, o ailede başka hotspot da olsa,
        // her zaman TAM OLARAK o somut ürünü açar (seçim listesi atlanır).
        setActiveProductFamilyId(hotspot.productFamilyId);
        setActiveHotspotId(hotspot.id);
        markZoneHintSeen();
      }

      return;
    }

    const overviewHotspot = map.overview.hotspots.find(
      (item) => item.id === id,
    );

    if (overviewHotspot) {
      selectZone(overviewHotspot.zoneId);
    }
  }

  function handleNavigationSelect(id: string) {
    if (!activeZone) {
      return;
    }

    const isApproved = activeZone.approvedProductFamilyIds.includes(
      id as ProductFamilyId,
    );

    if (isApproved) {
      const matches = activeZone.hotspots.filter(
        (hotspot) => hotspot.productFamilyId === id,
      );

      setActiveProductFamilyId(id as ProductFamilyId);
      // Bu ailede tek hotspot varsa doğrudan onu aç; birden fazlaysa
      // seçim listesi gösterilsin diye null bırak (bkz. showProductChooser).
      setActiveHotspotId(matches.length === 1 ? matches[0]!.id : null);
      markZoneHintSeen();
    }
  }

  function handleProductChoose(hotspotId: string) {
    setActiveHotspotId(hotspotId);
    markZoneHintSeen();
  }

  function closePanel() {
    setActiveProductFamilyId(null);
    setActiveHotspotId(null);
  }

  // Reset View, fullscreen modundan bilerek çıkmaz; yalnız sahneyi ve
  // seçimleri overview durumuna döndürür.
  function resetView() {
    backToOverview();
  }

  // Yalnız CSS fallback modunda gerekli: gerçek Fullscreen API zaten
  // arkadaki sayfanın scroll'unu engelliyor (fullscreen elemanı kendi
  // scroll konteyneri olur), position:fixed ile taklit edilen modda ise
  // bunu elle yapmak gerekir. Scroll konumu kaydedilip çıkışta geri
  // yüklenir — sayfa başa sıçramaz.
  function lockBodyScroll() {
    if (bodyScrollLockRef.current) {
      return;
    }

    scrollPositionRef.current = window.scrollY;
    bodyScrollLockRef.current = {
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
      htmlOverflow: document.documentElement.style.overflow,
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
  }

  function unlockBodyScroll() {
    const savedStyles = bodyScrollLockRef.current;

    if (!savedStyles) {
      return;
    }

    document.body.style.overflow = savedStyles.bodyOverflow;
    document.body.style.position = savedStyles.bodyPosition;
    document.body.style.top = savedStyles.bodyTop;
    document.body.style.width = savedStyles.bodyWidth;
    document.documentElement.style.overflow = savedStyles.htmlOverflow;
    bodyScrollLockRef.current = null;
    window.scrollTo(0, scrollPositionRef.current);
  }

  function enterCssFallbackFullscreen() {
    setCssFallbackActive(true);
    setIsFullscreen(true);
    lockBodyScroll();
  }

  function exitCssFallbackFullscreen() {
    setCssFallbackActive(false);
    setIsFullscreen(false);
    unlockBodyScroll();
  }

  async function toggleFullscreen() {
    if (cssFallbackActive) {
      exitCssFallbackFullscreen();
      return;
    }

    // Mobile and responsive tablet use the fixed portal overlay as their
    // primary fullscreen path. This avoids browser fullscreen restrictions
    // and escapes every page-level stacking, overflow and width constraint.
    if (window.matchMedia("(max-width: 768px)").matches) {
      enterCssFallbackFullscreen();
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (fullscreenSupported && containerRef.current) {
      try {
        await containerRef.current.requestFullscreen();
        return;
      } catch {
        // Tarayıcı desteği "var" görünse de istek reddedilebilir (izin
        // politikası, iframe kısıtlaması, kullanıcı jesti kaybı vb.) —
        // bu durumda aşağıdaki CSS fallback'e düşülür.
      }
    }

    enterCssFallbackFullscreen();
  }

  const restoreFocusId = `app-map-nav-${activeProductFamilyId ?? ""}`;

  // Başlık ve breadcrumb seçili sahneye göre dinamik: overview'da sektör adı,
  // bir bölge seçiliyken o bölgenin adı birincil satır olur (bkz. "DATA
  // CENTRE / APPLICATION MAP" → "MAIN ELECTRICAL ROOM / APPLICATION MAP").
  const headingPrimary = activeZone ? activeZone.name : content.headingSector;
  const breadcrumb = activeZone
    ? `${content.headingSector} / ${activeZone.name}`
    : null;

  const applicationMap = (
    <div
      aria-label={cssFallbackActive ? headingPrimary : undefined}
      aria-modal={cssFallbackActive ? true : undefined}
      className={
        cssFallbackActive
          ? `${styles.page} ${styles.pageCssFullscreen}`
          : styles.page
      }
      ref={containerRef}
      role={cssFallbackActive ? "dialog" : undefined}
    >
      <div className={styles.experience}>
        {/* .contextPanel .stageVisual'ın KARDEŞİdir (çocuğu değil): masaüstünde
            .experience'a göre mutlak konumlanıp fotoğrafın üzerine biner,
            dar ekranlarda ise normal akışa dönüp sahneden ÖNCE render edilir.
            Bunun nedeni .stageVisual'ın overflow:hidden + sabit yükseklikli
            olması — içine konseydi, mobildeki değişken yükseklikli metin
            taşarsa kırpılırdı. Kardeş olduğu için bu risk yok. */}
        <div className={styles.contextPanel}>
          {activeZone ? (
            <button
              aria-label={content.backToOverviewLabel}
              className={styles.backControl}
              onClick={backToOverview}
              type="button"
            >
              <span aria-hidden="true">←</span>
              {content.backShortLabel}
            </button>
          ) : (
            <Link
              aria-label={content.backToMapsLabel}
              className={styles.backControl}
              href="/"
            >
              <span aria-hidden="true">←</span>
              {content.backShortLabel}
            </Link>
          )}

          {breadcrumb ? <p className={styles.breadcrumb}>{breadcrumb}</p> : null}

          <h1 className={styles.heading}>
            {activeZone ? (
              <span>{headingPrimary}</span>
            ) : (
              <>
                <span>{content.overviewHeadingPrimary}</span>{" "}
                <span>{content.overviewHeadingSecondary}</span>
              </>
            )}
          </h1>
          <p className={styles.introduction}>{content.introduction}</p>

          {showZoneHint ? (
            <p className={styles.zoneHint}>{content.zoneHintLabel}</p>
          ) : null}

          <div className={styles.navOverlay}>
            <ApplicationNavigation
              interactive={Boolean(activeZone)}
              items={navItems}
              label={content.productNavigationLabel}
              onSelect={handleNavigationSelect}
            />
          </div>
        </div>

        {activeZone ? (
          <>
            {/* .zoneStageGroup: masaüstü/yatayda konum:relative bir referans
                kutusu (sceneControls üzerine mutlak biner); dikey mobilde
                (15. bölüm) sceneControls normal akışa dönüp GÖRSELİN
                ÜSTÜNDE ayrı bir satır olur — artık görselin üzerine
                binmiyor. */}
            <div className={styles.zoneStageGroup}>
              <div className={styles.sceneControls}>
                <button
                  className={styles.sceneControlButton}
                  onClick={resetView}
                  type="button"
                >
                  {content.resetViewLabel}
                </button>

                <button
                  className={styles.sceneControlButton}
                  onClick={toggleFullscreen}
                  ref={fullscreenButtonRef}
                  type="button"
                >
                  {isFullscreen
                    ? content.exitFullscreenLabel
                    : content.fullscreenLabel}
                </button>
              </div>

              {/* Bölge modu: overview'ın bulanık "atmosfer" arka planı
                  kullanılmaz — gerçek 16:9 oranlı bir sahne içinde tam
                  görsel (object-fit:contain, kırpma yok). Panel, aynı
                  grid hücresini paylaşıp sağa hizalanarak üzerine biner
                  (negatif margin hesabı gerekmez — sahnenin yüksekliği
                  artık sabit bir CSS değişkenine değil, doğal
                  aspect-ratio'ya bağlı). Panel sahneden uzunsa grid satırı
                  büyür, sayfa normal şekilde kayar; sahnenin kendi boyutu
                  etkilenmez. */}
              <div className={styles.zoneStageRow}>
                <ApplicationMapAspectFrame
                  active={cssFallbackActive}
                  aspectRatio={mapAspectRatio}
                >
                  <div className={styles.zoneStage}>
                    <ApplicationSceneView
                      activeHotspotId={activeHotspot?.id ?? null}
                      hotspots={sceneHotspots}
                      image={activeZone.image}
                      imageAlt={activeZone.imageAlt}
                      onHotspotSelect={handleSceneHotspotSelect}
                      onImageAspectRatioChange={setMapAspectRatio}
                      priority
                    />

                    {isFullscreen ? (
                      <Link
                        aria-label={content.brandMarkLabel}
                        className={styles.brandMark}
                        href="/"
                      >
                        <Image
                          alt=""
                          aria-hidden="true"
                          height={235}
                          src="/assets/brand/infravolt-wordmark-transparent.webp"
                          width={1040}
                        />
                      </Link>
                    ) : null}
                  </div>
                </ApplicationMapAspectFrame>

                {activeProductFamily && activeHotspot ? (
                  <ApplicationProductPanel
                    actions={visibleProductActions}
                    applicationPoints={
                      activeHotspot.applicationPoints ??
                      activeProductFamily.applicationPoints
                    }
                    benefits={
                      activeHotspot.benefits ?? activeProductFamily.benefits
                    }
                    icon={productFamilyIcon(activeProductFamily.id)}
                    image={
                      activeProductCategory?.image ??
                      activeHotspot.image ??
                      activeProductFamily.image
                    }
                    imageAlt={
                      activeProductCategory
                        ? activeProductFamily.name
                        : (activeHotspot.imageAlt ??
                          activeProductFamily.imageAlt)
                    }
                    imagePresentation={
                      activeProductCategory ? "category" : "product"
                    }
                    labels={content.panel}
                    name={activeHotspot.name ?? activeProductFamily.name}
                    number={activeProductFamily.number}
                    onClose={closePanel}
                    restoreFocusId={restoreFocusId}
                    usedHereFor={activeHotspot.usedHereFor}
                  />
                ) : null}

                {activeProductFamily && showProductChooser ? (
                  <ApplicationProductChooser
                    choices={matchingHotspotsForFamily.map((hotspot) => ({
                      id: hotspot.id,
                      name: hotspot.name ?? activeProductFamily.name,
                      usedHereFor: hotspot.usedHereFor,
                    }))}
                    chooseProductHeading={content.panel.chooseProductHeading}
                    closeLabel={content.panel.closeLabel}
                    familyName={activeProductFamily.name}
                    number={activeProductFamily.number}
                    onChoose={handleProductChoose}
                    onClose={closePanel}
                    restoreFocusId={restoreFocusId}
                  />
                ) : null}
              </div>
            </div>

            {/* Galeri sahnenin üzerine binmiyor; görselin ALTINDA, normal
                akışta, kendi bölümü olarak yer alıyor. */}
            <div className={styles.zoneGallerySection}>
              <ApplicationZoneStrip
                items={zoneStripItems}
                label={content.zoneNavigationLabel}
                nextLabel={content.zoneNextLabel}
                onSelect={handleZoneStripSelect}
                previousLabel={content.zonePreviousLabel}
              />
            </div>
          </>
        ) : (
          <>
            {/* .overviewStageGroup: masaüstü/yatayda konum:relative referans
               kutusu (sceneControls, ve "cover" modunda gallerySection de,
               üzerine mutlak biner); dikey mobilde (15. bölüm) sceneControls
               normal akışa döner. "contain" modunda (bkz. overviewImageFit
               prop'u) galeri bu grubun DIŞINA, ayrı bir bölüme taşınır —
               görselin üzerine binmeden, altına yerleşir. */}
            <div className={styles.overviewStageGroup}>
              <div className={styles.sceneControls}>
                <button
                  className={styles.sceneControlButton}
                  disabled={!activeProductFamilyId}
                  onClick={resetView}
                  type="button"
                >
                  {content.resetViewLabel}
                </button>

                <button
                  className={styles.sceneControlButton}
                  onClick={toggleFullscreen}
                  ref={fullscreenButtonRef}
                  type="button"
                >
                  {isFullscreen
                    ? content.exitFullscreenLabel
                    : content.fullscreenLabel}
                </button>
              </div>

              {/* .stageVisual, arka plan fotoğrafı, okunabilirlik overlay'i
                 ve overview hotspot katmanının bindirildiği TEK sınırlı
                 sahne kutusudur. "cover" modunda yüksekliği sabit bir
                 clamp() ile belirlenir (mevcut Data Centre davranışı);
                 "contain" modunda kendi doğal 16:9 oranına göre boyutlanır
                 (bkz. .stageVisualContain), görsel hiç kırpılmaz. */}
              <ApplicationMapAspectFrame
                active={cssFallbackActive}
                aspectRatio={mapAspectRatio}
              >
                <div
                  className={
                    overviewImageFit === "contain"
                      ? `${styles.stageVisual} ${styles.stageVisualContain}`
                      : styles.stageVisual
                  }
                >
                <div className={styles.backgroundLayer}>
                  <Image
                    alt={map.overview.imageAlt}
                    className={
                      overviewImageFit === "contain"
                        ? `${styles.backgroundImage} ${styles.backgroundImageContain}`
                        : styles.backgroundImage
                    }
                    fill
                    onLoad={(event) => {
                      const { naturalHeight, naturalWidth } =
                        event.currentTarget;

                      if (naturalHeight > 0 && naturalWidth > 0) {
                        setMapAspectRatio(naturalWidth / naturalHeight);
                      }
                    }}
                    priority
                    sizes="100vw"
                    src={map.overview.image}
                  />
                </div>

                <div className={styles.readabilityScrim} />

                {/* Overview modunda ayrı bir ön-plan görseli yok; hotspot'lar
                    doğrudan arka plan katmanıyla aynı sınırlar üzerine biner.
                    Numaranın yanında bölge adı da görünür etiket olarak
                    gösterilir (ör. "1 Main Electrical Room") — kullanıcı
                    hangi numaranın hangi oda olduğunu tıklamadan görebilsin. */}
                <div className={styles.overviewHotspots}>
                  {sceneHotspots.map((hotspot) => (
                    <ApplicationHotspot
                      active={false}
                      id={`app-map-hotspot-${hotspot.id}`}
                      key={hotspot.id}
                      label={hotspot.label}
                      number={hotspot.number}
                      onSelect={() => handleSceneHotspotSelect(hotspot.id)}
                      x={hotspot.x}
                      y={hotspot.y}
                    />
                  ))}

                  {sceneHotspots.map((hotspot) => (
                    <span
                      aria-hidden="true"
                      className={styles.hotspotLabel}
                      key={`${hotspot.id}-label`}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    >
                      {hotspot.label}
                    </span>
                  ))}
                </div>

                {/* Marka logosu yalnız gerçek tam ekran modunda görünür;
                    global header görünürken burada tekrar göstermek
                    yinelenmiş marka izlenimi yaratır. */}
                  {isFullscreen ? (
                    <Link
                      aria-label={content.brandMarkLabel}
                      className={styles.brandMark}
                      href="/"
                    >
                      <Image
                        alt=""
                        aria-hidden="true"
                        height={235}
                        src="/assets/brand/infravolt-wordmark-transparent.webp"
                        width={1040}
                      />
                    </Link>
                  ) : null}
                </div>
              </ApplicationMapAspectFrame>

              {overviewImageFit === "cover" ? (
                <div className={styles.gallerySection}>
                  <ApplicationZoneStrip
                    items={zoneStripItems}
                    label={content.zoneNavigationLabel}
                    nextLabel={content.zoneNextLabel}
                    onSelect={handleZoneStripSelect}
                    previousLabel={content.zonePreviousLabel}
                  />
                </div>
              ) : null}
            </div>

            {overviewImageFit === "contain" ? (
              <div className={styles.zoneGallerySection}>
                <ApplicationZoneStrip
                  items={zoneStripItems}
                  label={content.zoneNavigationLabel}
                  nextLabel={content.zoneNextLabel}
                  onSelect={handleZoneStripSelect}
                  previousLabel={content.zonePreviousLabel}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );

  if (cssFallbackActive && typeof document !== "undefined") {
    return createPortal(applicationMap, document.body);
  }

  return applicationMap;
}
