"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { productFamilyIcon } from "@/modules/application-map/assets";
import type { ApplicationMapPageContent } from "@/modules/application-map/content";
import type { ResolvedDataCentreApplicationMap } from "@/modules/application-map/resolve";
import type { ProductFamilyId, ZoneId } from "@/modules/application-map/types";

import { ApplicationHotspot } from "./application-hotspot";
import { ApplicationNavigation, type NavigationItem } from "./application-navigation";
import { ApplicationProductPanel } from "./application-product-panel";
import {
  ApplicationSceneView,
  type SceneHotspotDescriptor,
} from "./application-scene";
import {
  ApplicationZoneStrip,
  type ZoneThumbnailItem,
} from "./application-zone-strip";
import styles from "./data-centre-application-map.module.css";

type DataCentreApplicationMapProps = Readonly<{
  map: ResolvedDataCentreApplicationMap;
  content: ApplicationMapPageContent;
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

export function DataCentreApplicationMap({
  map,
  content,
}: DataCentreApplicationMapProps) {
  const [activeZoneId, setActiveZoneId] = useState<ZoneId | null>(null);
  const [activeProductFamilyId, setActiveProductFamilyId] =
    useState<ProductFamilyId | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const activeHotspot =
    activeZone && activeProductFamilyId
      ? (activeZone.hotspots.find(
          (hotspot) => hotspot.productFamilyId === activeProductFamilyId,
        ) ?? null)
      : null;

  const activeProductFamily = activeProductFamilyId
    ? (familyById.get(activeProductFamilyId) ?? null)
    : null;

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

  function selectZone(zoneId: ZoneId) {
    setActiveZoneId(zoneId);
    setActiveProductFamilyId(null);
  }

  function backToOverview() {
    setActiveZoneId(null);
    setActiveProductFamilyId(null);
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

    if (document.fullscreenElement) {
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

    if (zoneById.has(id as ZoneId)) {
      selectZone(id as ZoneId);
      scrollStageIntoView();
    }
  }

  function handleSceneHotspotSelect(id: string) {
    if (activeZone) {
      const hotspot = activeZone.hotspots.find((item) => item.id === id);

      if (hotspot) {
        setActiveProductFamilyId(hotspot.productFamilyId);
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
      setActiveProductFamilyId(id as ProductFamilyId);
      markZoneHintSeen();
    }
  }

  function closePanel() {
    setActiveProductFamilyId(null);
  }

  // Reset View, fullscreen modundan bilerek çıkmaz; yalnız sahneyi ve
  // seçimleri overview durumuna döndürür.
  function resetView() {
    backToOverview();
  }

  async function toggleFullscreen() {
    if (!fullscreenSupported || !containerRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await containerRef.current.requestFullscreen();
  }

  const restoreFocusId = `app-map-nav-${activeProductFamilyId ?? ""}`;

  // Başlık ve breadcrumb seçili sahneye göre dinamik: overview'da sektör adı,
  // bir bölge seçiliyken o bölgenin adı birincil satır olur (bkz. "DATA
  // CENTRE / APPLICATION MAP" → "MAIN ELECTRICAL ROOM / APPLICATION MAP").
  const headingPrimary = activeZone ? activeZone.name : content.headingSector;
  const breadcrumb = activeZone
    ? `${content.headingSector} / ${activeZone.name}`
    : null;

  return (
    <div className={styles.page} ref={containerRef}>
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
            <span>{headingPrimary}</span>
            {activeZone ? null : (
              <>
                {" "}
                <span>{content.headingSuffix}</span>
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

                {fullscreenSupported ? (
                  <button
                    className={styles.sceneControlButton}
                    onClick={toggleFullscreen}
                    type="button"
                  >
                    {isFullscreen
                      ? content.exitFullscreenLabel
                      : content.fullscreenLabel}
                  </button>
                ) : null}
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
                <div className={styles.zoneStage}>
                  <ApplicationSceneView
                    activeHotspotId={activeHotspot?.id ?? null}
                    hotspots={sceneHotspots}
                    image={activeZone.image}
                    imageAlt={activeZone.imageAlt}
                    onHotspotSelect={handleSceneHotspotSelect}
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

                {activeProductFamily && activeHotspot ? (
                  <ApplicationProductPanel
                    actions={activeProductFamily.actions}
                    applicationPoints={activeProductFamily.applicationPoints}
                    benefits={activeProductFamily.benefits}
                    icon={productFamilyIcon(activeProductFamily.id)}
                    image={activeProductFamily.image}
                    imageAlt={activeProductFamily.imageAlt}
                    labels={content.panel}
                    name={activeProductFamily.name}
                    number={activeProductFamily.number}
                    onClose={closePanel}
                    restoreFocusId={restoreFocusId}
                    usedHereFor={activeHotspot.usedHereFor}
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
          /* .overviewStageGroup: masaüstü/yatayda konum:relative referans
             kutusu (sceneControls/gallerySection üzerine mutlak biner);
             dikey mobilde (15. bölüm) ikisi de normal akışa döner —
             sceneControls .stageVisual'ın ÜSTÜNDE, gallerySection ise
             ALTINDA ayrı satırlar olur, artık görseli kaplamazlar. */
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

              {fullscreenSupported ? (
                <button
                  className={styles.sceneControlButton}
                  onClick={toggleFullscreen}
                  type="button"
                >
                  {isFullscreen
                    ? content.exitFullscreenLabel
                    : content.fullscreenLabel}
                </button>
              ) : null}
            </div>

            {/* .stageVisual, arka plan fotoğrafı, okunabilirlik overlay'i
               ve overview hotspot katmanının bindirildiği TEK sınırlı
               sahne kutusudur. Yüksekliği sabit bir clamp() ile
               belirlenir. */}
            <div className={styles.stageVisual}>
              <div className={styles.backgroundLayer}>
                <Image
                  alt={map.overview.imageAlt}
                  className={styles.backgroundImage}
                  fill
                  priority
                  sizes="100vw"
                  src={map.overview.image}
                />
              </div>

              <div className={styles.readabilityScrim} />

              {/* Overview modunda ayrı bir ön-plan görseli yok; hotspot'lar
                  doğrudan arka plan katmanıyla aynı sınırlar üzerine biner. */}
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

            <div className={styles.gallerySection}>
              <ApplicationZoneStrip
                items={zoneStripItems}
                label={content.zoneNavigationLabel}
                nextLabel={content.zoneNextLabel}
                onSelect={handleZoneStripSelect}
                previousLabel={content.zonePreviousLabel}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
