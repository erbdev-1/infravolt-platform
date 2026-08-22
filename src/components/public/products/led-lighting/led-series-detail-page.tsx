import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { LedSeriesDetailContent } from "@/data/products/led-lighting/types";

import {
  IconAdjustableAngle,
  IconAircraftMaintenance,
  IconApplications,
  IconAutomation,
  IconBiogas,
  IconBusbarConnect,
  IconConnector,
  IconControlCasambi,
  IconControlDali,
  IconControlDimmer,
  IconControlEmergency,
  IconControlPlc,
  IconControlSensor,
  IconControlSignal,
  IconControlTouchDim,
  IconCornerBody,
  IconElectricalModule,
  IconFactory,
  IconHangar,
  IconHighCeiling,
  IconImagePending,
  IconLayers,
  IconMining,
  IconMountingOptions,
  IconMultiStorey,
  IconMultiLens,
  IconOptics,
  IconPetrochemical,
  IconParking,
  IconPort,
  IconPrison,
  IconSmartCamera,
  IconSmartEnvironment,
  IconSmartFault,
  IconSmartMotion,
  IconSmartNetwork,
  IconSmartPlc,
  IconSmartPowerDim,
  IconSmartScenario,
  IconSmartCity,
  IconSmartWireless,
  IconStandardBody,
  IconSurfaceMount,
  IconSuspension,
  IconTunnel,
  IconWallMount,
  IconWarehouse,
  IconStreetLight,
} from "./led-icons";
import { LedSeriesModelsTable } from "./led-series-models-table";
import styles from "./led-series-detail-page.module.css";
import { LedTechnicalAssetVariants } from "./led-technical-asset-variants";
import { LedTechnicalInfoCards } from "./led-technical-info-cards";

const MOUNTING_ICONS = {
  "busbar-connect": IconBusbarConnect,
  suspension: IconSuspension,
  "mounting-options": IconMountingOptions,
  "wall-mount": IconWallMount,
} as const;

const MOUNTING_CONFIGURATION_ICONS = {
  suspended: IconSuspension,
  "surface-mount": IconSurfaceMount,
  "standard-body": IconStandardBody,
  "corner-body": IconCornerBody,
} as const;

const SERVICEABILITY_ICONS = {
  connector: IconConnector,
  "led-module": IconLayers,
  "driver-module": IconElectricalModule,
  "adjustable-angle": IconAdjustableAngle,
} as const;

const CONTROL_ICONS = {
  "control-plc": IconControlPlc,
  "control-dali": IconControlDali,
  "control-dimmer": IconControlDimmer,
  "control-signal": IconControlSignal,
  "control-emergency": IconControlEmergency,
  "control-sensor": IconControlSensor,
  "control-touch-dim": IconControlTouchDim,
  "control-casambi": IconControlCasambi,
} as const;

const SMART_INTEGRATION_ICONS = {
  plc: IconSmartPlc,
  camera: IconSmartCamera,
  wireless: IconSmartWireless,
  network: IconSmartNetwork,
  "power-dim": IconSmartPowerDim,
  environment: IconSmartEnvironment,
  "motion-daylight": IconSmartMotion,
  "fault-monitoring": IconSmartFault,
  "scenario-control": IconSmartScenario,
} as const;

const OPTICAL_OPTION_ICONS = {
  "multi-lens": IconMultiLens,
  "beam-angle": IconOptics,
} as const;

const APPLICATION_ICONS = {
  hangar: IconHangar,
  warehouse: IconWarehouse,
  port: IconPort,
  "aircraft-maintenance": IconAircraftMaintenance,
  "industrial-facility": IconFactory,
  petrochemical: IconPetrochemical,
  mining: IconMining,
  "high-ceiling": IconHighCeiling,
  tunnel: IconTunnel,
  prison: IconPrison,
  biogas: IconBiogas,
  "busbar-distribution": IconBusbarConnect,
  "lighting-control": IconAutomation,
  "network-monitoring": IconSmartNetwork,
  street: IconStreetLight,
  airport: IconHangar,
  motorway: IconStreetLight,
  parks: IconSmartEnvironment,
  residential: IconApplications,
  "shopping-centre": IconApplications,
  "public-square": IconSmartCity,
  parking: IconParking,
  office: IconApplications,
  retail: IconApplications,
  education: IconApplications,
  corridor: IconMultiStorey,
} as const;

// The shared LED product-series-detail template — every future series
// page (LDBE, LDBSE, LDB-FL, GER-LED Industrial, GER-LED High Ceiling)
// renders through this exact component, only `content`/`seriesSlug`/
// `categoryHref` change. Do not fork this into a page-specific component.
export function LedSeriesDetailPage({
  content,
  seriesSlug,
  categoryHref,
  configurationSelector,
}: Readonly<{
  content: LedSeriesDetailContent;
  seriesSlug: string;
  categoryHref: string;
  configurationSelector?: ReactNode;
}>) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          alt={content.heroBackgroundImageAlt}
          className={styles.heroBackground}
          fill
          priority
          sizes="100vw"
          src={content.heroBackgroundImage}
        />
        <div className={styles.heroScrim} />

        <div className={styles.heroForeground}>
          <Image
            alt={content.heroImageAlt}
            fill
            priority
            sizes="(min-width: 1100px) 48vw, 90vw"
            src={content.heroImage}
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>

        <div className={styles.heroTop}>
          <Link className={styles.backButton} href={categoryHref}>
            <span aria-hidden="true">←</span>
            {content.backToCategoryLabel}
          </Link>

          <div className={styles.breadcrumbs}>
            <Link href="/">{content.breadcrumbs.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products/led-systems">{content.breadcrumbs.ledSystems}</Link>
            <span aria-hidden="true">/</span>
            <Link href={categoryHref}>{content.breadcrumbs.category}</Link>
            <span aria-hidden="true">/</span>
            <span>{content.breadcrumbs.current}</span>
          </div>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{content.hero.eyebrow}</p>
          <p className={styles.heroCategory}>{content.hero.category}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroDescription}>{content.hero.description}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href={`/uk-support?request=technical-pack&product=${seriesSlug}`}>
              {content.hero.primaryAction}
              <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.secondaryButton} href={`/uk-support?request=technical-pack&product=${seriesSlug}`}>
              {content.hero.secondaryAction}
            </Link>
          </div>
        </div>
      </section>

      {configurationSelector}

      <LedTechnicalInfoCards
        assurance={content.technicalAssurance}
        cards={content.technicalInformation}
        heading={content.technicalInformationHeading}
      />

      {content.sourceNote ? (
        <p className={styles.sourceNote}>{content.sourceNote}</p>
      ) : null}

      {content.keyCapabilities && content.keyCapabilities.length > 0 ? (
        <section className={styles.serviceability}>
          <div className={styles.sectionHeading}>
            <h2>{content.keyCapabilitiesHeading}</h2>
            {content.keyCapabilitiesIntroduction ? <p>{content.keyCapabilitiesIntroduction}</p> : null}
          </div>

          <div className={styles.serviceabilityGrid}>
            {content.keyCapabilities.map((item) => {
              const ItemIcon = SMART_INTEGRATION_ICONS[item.icon];

              return (
                <article className={styles.serviceabilityCard} key={item.title}>
                  <span aria-hidden="true" className={styles.serviceabilityIconBadge}>
                    <ItemIcon className={styles.serviceabilityIcon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {content.mountingConfigurations && content.mountingConfigurations.length > 0 ? (
        <section className={styles.mountingConfigurations}>
          <div className={styles.sectionHeading}>
            <h2>{content.mountingConfigurationsHeading}</h2>
          </div>

          <div className={styles.mountingConfigurationsGrid}>
            {content.mountingConfigurations.map((config) => {
              const ConfigIcon = MOUNTING_CONFIGURATION_ICONS[config.icon];

              return (
                <article className={styles.mountingConfigurationCard} key={config.title}>
                  <div className={styles.mountingConfigurationVisual}>
                    <Image alt={config.imageAlt} fill sizes="(min-width: 900px) 45vw, 100vw" src={config.image} style={{ objectFit: "contain" }} />
                  </div>
                  <div className={styles.mountingConfigurationBody}>
                    <span aria-hidden="true" className={styles.mountingConfigurationIconBadge}>
                      <ConfigIcon className={styles.mountingConfigurationIcon} />
                    </span>
                    <h3>{config.title}</h3>
                    <p>{config.description}</p>
                    <ul className={styles.mountingConfigurationFacts}>
                      {config.facts.map((fact) => (
                        <li key={fact}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className={styles.models} id="models">
        <div className={styles.sectionHeading}>
          <h2>{content.modelsHeading}</h2>
          <p>{content.modelsIntroduction}</p>
        </div>

        {content.componentSchedule ? (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{content.componentSchedule.codeColumnLabel}</th>
                  <th scope="col">{content.componentSchedule.componentColumnLabel}</th>
                  <th scope="col">{content.componentSchedule.categoryColumnLabel}</th>
                </tr>
              </thead>
              <tbody>
                {content.componentSchedule.items.map((item) => (
                  <tr key={item.code}>
                    <td data-label={content.componentSchedule?.codeColumnLabel}>
                      <strong>{item.code}</strong>
                    </td>
                    <td data-label={content.componentSchedule?.componentColumnLabel}>
                      <span className={styles.componentCell}>
                        {item.image ? (
                          <span className={styles.componentThumbnail}>
                            <Image alt={item.imageAlt ?? ""} fill sizes="64px" src={item.image} style={{ objectFit: "contain" }} />
                          </span>
                        ) : null}
                        <span>{item.description}</span>
                      </span>
                    </td>
                    <td data-label={content.componentSchedule?.categoryColumnLabel}>{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : content.models && content.modelsColumns && content.modelsFilters ? (
          <LedSeriesModelsTable
            columns={content.modelsColumns}
            filters={content.modelsFilters}
            key={`${seriesSlug}-${content.hero.eyebrow}`}
            models={content.models}
            seriesSlug={seriesSlug}
            seriesTitle={content.hero.title}
            sourceRoute={`${categoryHref}/${seriesSlug}`}
          />
        ) : null}

        {content.modelsNote ? <p className={styles.modelsNote}>{content.modelsNote}</p> : null}
      </section>

      {content.familyTechnicalSection ? (
        <section className={styles.familyTechnical}>
          <div className={styles.sectionHeading}>
            <h2>{content.familyTechnicalSection.heading}</h2>
            <p>{content.familyTechnicalSection.introduction}</p>
          </div>

          <div className={content.familyTechnicalSection.assets.length > 0 ? styles.familyTechnicalLayout : styles.familyTechnicalLayoutSingle}>
            <dl
              className={`${styles.familyTechnicalSettings} ${styles.familyTechnicalSettingsCompact} ${content.familyTechnicalSection.settings.length === 1 ? styles.familyTechnicalSettingsSingle : ""}`}
            >
              {content.familyTechnicalSection.settings.map((setting) => (
                <div className={styles.familyTechnicalSetting} key={setting.label}>
                  <dt>{setting.label}</dt>
                  <dd>
                    <strong>{setting.value}</strong>
                    <span>{setting.description}</span>
                  </dd>
                </div>
              ))}
            </dl>

            {content.familyTechnicalSection.assets.length > 0 ? (
              <div className={styles.familyTechnicalAssets}>
                {content.familyTechnicalSection.assets.map((asset) => (
                  <article className={styles.familyTechnicalAsset} key={asset.title}>
                    <h3>{asset.title}</h3>
                    <div className={styles.familyTechnicalAssetImage}>
                      <Image alt={asset.imageAlt} fill sizes="(min-width: 900px) 25vw, 100vw" src={asset.image} style={{ objectFit: "contain" }} />
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {content.serviceabilityItems && content.serviceabilityItems.length > 0 ? (
        <section className={`${styles.serviceability} ${styles.serviceabilityAfterModels}`}>
          <div className={styles.sectionHeading}>
            <h2>{content.serviceabilityHeading}</h2>
            {content.serviceabilityIntroduction ? <p>{content.serviceabilityIntroduction}</p> : null}
          </div>

          <div className={styles.serviceabilityGrid}>
            {content.serviceabilityItems.map((item) => {
              const ItemIcon = SERVICEABILITY_ICONS[item.icon];

              return (
                <article className={styles.serviceabilityCard} key={item.title}>
                  <span aria-hidden="true" className={styles.serviceabilityIconBadge}>
                    <ItemIcon className={styles.serviceabilityIcon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {content.mountingOptions && content.mountingOptions.length > 0 ? (
        <section className={styles.mounting}>
          <div className={styles.sectionHeading}>
            <h2>{content.mountingHeading}</h2>
          </div>

          <div className={styles.mountingGrid}>
            {content.mountingOptions.map((option) => {
              const OptionIcon = MOUNTING_ICONS[option.icon];

              return (
                <article className={styles.mountingCard} key={option.title}>
                  <span aria-hidden="true" className={styles.mountingIconBadge}>
                    <OptionIcon className={styles.mountingIcon} />
                  </span>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </article>
              );
            })}
          </div>

          {content.assemblyGallery ? (
            <div className={styles.assemblyGallery}>
              <h3>{content.assemblyGallery.heading}</h3>
              <p>{content.assemblyGallery.note}</p>

              <div className={styles.assemblyGalleryGrid}>
                {content.assemblyGallery.images.map((asset) => (
                  <div className={styles.assemblyGalleryItem} key={asset.image}>
                    <Image alt={asset.imageAlt} fill sizes="(min-width: 900px) 16vw, 30vw" src={asset.image} style={{ objectFit: "contain" }} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {content.controlOptions.length > 0 || content.opticalOptionItems || content.smartIntegrationItems ? (
      <section className={styles.controls}>
        <div className={styles.sectionHeading}>
          <h2>{content.controlsHeading}</h2>
          <p>{content.controlsIntroduction}</p>
        </div>

        {content.opticalOptionItems || content.smartIntegrationItems ? (
          <div className={styles.controlsGroup}>
            {content.controlsGroupLabel ? <h3 className={styles.controlsGroupLabel}>{content.controlsGroupLabel}</h3> : null}
            <div className={styles.controlsRow}>
              {content.controlOptions.map((option) => {
                const OptionIcon = CONTROL_ICONS[option.icon];

                return (
                  <span className={styles.controlChip} key={option.label}>
                    <OptionIcon className={styles.controlChipIcon} />
                    {option.label}
                    {option.secondaryLabel ? <span className={styles.controlChipSecondary}>{option.secondaryLabel}</span> : null}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.controlsRow}>
            {content.controlOptions.map((option) => {
              const OptionIcon = CONTROL_ICONS[option.icon];

              return (
                <span className={styles.controlChip} key={option.label}>
                  <OptionIcon className={styles.controlChipIcon} />
                  {option.label}
                  {option.secondaryLabel ? <span className={styles.controlChipSecondary}>{option.secondaryLabel}</span> : null}
                </span>
              );
            })}
          </div>
        )}

        {content.opticalOptionItems ? (
          <div className={styles.controlsGroup}>
            {content.opticsGroupLabel ? <h3 className={styles.controlsGroupLabel}>{content.opticsGroupLabel}</h3> : null}
            <div className={styles.controlsRow}>
              {content.opticalOptionItems.map((option) => {
                const OptionIcon = OPTICAL_OPTION_ICONS[option.icon];

                return (
                  <span className={styles.controlChip} key={option.label}>
                    <OptionIcon className={styles.controlChipIcon} />
                    {option.label}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}

        {content.opticalOptionsHeading && content.opticalOptions ? (
          <div className={styles.opticalOptions}>
            <h3>{content.opticalOptionsHeading}</h3>
            <ul>
              {content.opticalOptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {content.smartIntegrationItems && content.smartIntegrationItems.length > 0 ? (
          <div className={styles.controlsGroup}>
            {content.smartIntegrationHeading ? <h3 className={styles.controlsGroupLabel}>{content.smartIntegrationHeading}</h3> : null}
            {content.smartIntegrationIntroduction ? <p className={styles.smartIntegrationIntroduction}>{content.smartIntegrationIntroduction}</p> : null}
            <div className={styles.controlsRow}>
              {content.smartIntegrationItems.map((item) => {
                const ItemIcon = SMART_INTEGRATION_ICONS[item.icon];

                return (
                  <span className={styles.controlChip} key={item.label}>
                    <ItemIcon className={styles.controlChipIcon} />
                    {item.label}
                    {item.secondaryLabel ? <span className={styles.controlChipSecondary}>{item.secondaryLabel}</span> : null}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>
      ) : null}

      {content.photometricHeading && content.technicalAssets && content.dimensionNote ? (
        <section className={styles.photometric}>
          <div className={styles.sectionHeading}>
            <h2>{content.photometricHeading}</h2>
          </div>

          {content.technicalAssetVariants && content.technicalAssetVariants.length > 0 ? (
            <LedTechnicalAssetVariants defaultVariantId={content.technicalAssetVariantsDefaultId} variants={content.technicalAssetVariants} />
          ) : (
            <div className={styles.photometricGrid}>
              {content.technicalAssets.map((asset) => (
                <div className={styles.photometricCard} key={asset.title}>
                  <h3>{asset.title}</h3>
                  <div className={styles.photometricImage}>
                    <Image alt={asset.imageAlt} fill sizes="(min-width: 900px) 45vw, 100vw" src={asset.image} style={{ objectFit: "contain" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className={styles.dimensionNote}>{content.dimensionNote}</p>
        </section>
      ) : null}

      <section className={styles.applications}>
        <div className={styles.sectionHeading}>
          <h2>{content.applicationsHeading}</h2>
        </div>

        {content.applicationCardsAlways || content.applications.some((application) => application.image) ? (
          <div className={styles.applicationsGrid}>
            {content.applications.map((application) => {
              const ApplicationIcon = APPLICATION_ICONS[application.icon];

              return (
                <div className={styles.applicationCard} key={application.title}>
                  <div className={styles.applicationCardMedia}>
                    {application.image ? (
                      <Image alt={application.imageAlt ?? application.title} fill sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw" src={application.image} style={{ objectFit: "cover" }} />
                    ) : (
                      <div className={styles.applicationCardMediaEmpty}>
                        <IconImagePending aria-hidden="true" className={styles.applicationCardMediaEmptyIcon} />
                      </div>
                    )}
                  </div>
                  <div className={styles.applicationCardBody}>
                    <div className={styles.applicationCardHeading}>
                      <ApplicationIcon aria-hidden="true" className={styles.applicationCardIcon} />
                      <span className={styles.applicationCardTitle}>{application.title}</span>
                    </div>
                    {application.description ? <p className={styles.applicationCardDescription}>{application.description}</p> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`${styles.applicationsLayout} ${content.compactApplicationsRow ? styles.applicationsLayoutCompact : ""}`}>
            {content.applicationImage ? (
              <div className={styles.applicationsVisual}>
                <Image alt={content.applicationImageAlt ?? content.applicationsHeading} fill sizes="(min-width: 900px) 50vw, 100vw" src={content.applicationImage} style={{ objectFit: "cover" }} />
              </div>
            ) : null}

            <div className={`${styles.applicationsList} ${content.compactApplicationsRow ? styles.applicationsListCompact : ""}`}>
              {content.applications.map((application) => {
                const ApplicationIcon = APPLICATION_ICONS[application.icon];

                return (
                  <span className={styles.applicationItem} key={application.title}>
                    <ApplicationIcon className={styles.applicationItemIcon} />
                    {application.title}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className={styles.siblings}>
        <div className={styles.sectionHeading}>
          <h2>{content.siblingFamiliesHeading}</h2>
        </div>

        <div className={styles.siblingsGrid}>
          {content.siblingFamilies.map((family) => {
            const cardBody = (
              <>
                <span className={styles.siblingTitle}>{family.name}</span>
                <span className={styles.siblingSubtitle}>{family.subtitle}</span>
                {family.isCurrent ? (
                  <span className={styles.siblingCurrentBadge}>{content.currentFamilyBadgeLabel}</span>
                ) : family.href ? (
                  <span className={styles.siblingFooter}>
                    {content.siblingViewSeriesLabel}
                    <span aria-hidden="true">→</span>
                  </span>
                ) : null}
              </>
            );

            if (family.isCurrent) {
              return (
                <div className={`${styles.siblingCard} ${styles.siblingCardCurrent}`} key={family.slug}>
                  {cardBody}
                </div>
              );
            }

            return family.href ? (
              <Link className={styles.siblingCard} href={family.href} key={family.slug}>
                {cardBody}
              </Link>
            ) : (
              <div className={styles.siblingCard} key={family.slug}>
                {cardBody}
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.supportCta}>
        <div className={styles.supportCtaContent}>
          <h2>{content.supportCta.title}</h2>
          <p>{content.supportCta.description}</p>

          <Link className={styles.supportCtaAction} href={`/uk-support?request=technical-question&product=${seriesSlug}`}>
            {content.supportCta.action}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
