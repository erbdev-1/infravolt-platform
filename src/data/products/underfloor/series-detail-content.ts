import { publicMediaUrl } from "@/modules/storage/asset-url";
import type { MarketCode } from "@/modules/markets/types";

import type { UnderfloorSeriesDetail } from "./series-detail-types";

// Underfloor Cable Trunking Systems — per-series detail page content.
// Every model, order code, stock code, dimension and weight below is
// transcribed as-is from the verified catalogue extraction
// (catalog-source/underfloor-catalog/underfloor-catalog-extraction/data/
// *.csv, all rows flagged "KATALOGDAN DOĞRULANDI" — verified against the
// catalogue). Nothing here is invented; codes are language-neutral and
// therefore identical across markets, only labels/product names differ.

const IMG = publicMediaUrl("products/underfloor/detail");

const COLUMN_LABELS = {
  uk: {
    model: "Model",
    productName: "Product",
    orderCode: "Order Code",
    stockCode: "Stock Code",
    dimensions: "Dimensions",
    weight: "Weight",
    action: "Action",
  },
  ua: {
    model: "Модель",
    productName: "Продукт",
    orderCode: "Код замовлення",
    stockCode: "Код запасу",
    dimensions: "Розміри",
    weight: "Вага",
    action: "Дія",
  },
} as const satisfies Record<MarketCode, UnderfloorSeriesDetail["columnLabels"]>;

const content: Record<MarketCode, Record<string, UnderfloorSeriesDetail>> = {
  uk: {
    "underfloor-junction-boxes": {
      slug: "underfloor-junction-boxes",
      columnLabels: COLUMN_LABELS.uk,
      groups: [
        {
          name: "GDK",
          id: "gdk",
          variants: [
            { model: "GDK-01", productName: "Underfloor junction box", orderCode: "GDK-01", stockCode: "101506070BLS0", weight: "4.060 kg/unit", image: `${IMG}/junction-boxes/gdk-01-open.webp` },
            { model: "GDK-02", productName: "Socket case", orderCode: "GDK-02", stockCode: "101500020PLS0", weight: "1.100 kg/unit", image: `${IMG}/junction-boxes/gdk-02-open.webp` },
            { model: "GDK-03", productName: "Junction box without socket", orderCode: "GDK-03", stockCode: "1015000309141", weight: "3.930 kg/unit", image: `${IMG}/junction-boxes/gdk-03-exploded.webp` },
            { model: "GDK-07", productName: "Junction box for high-floor", orderCode: "GDK-07", stockCode: "101500700BOY0", weight: "6.200 kg/unit", image: `${IMG}/junction-boxes/gdk-07-open.webp` },
          ],
        },
        {
          name: "GDK-Y",
          id: "gdk-y",
          variants: [
            { model: "GDK-31-Y", productName: "Underfloor junction box", orderCode: "GDK-31-Y", stockCode: "101500310PLS1", dimensions: "400×400 mm; opening 280×280 mm; h≈69 mm", weight: "5.580 kg/unit", image: `${IMG}/junction-boxes/gdk-31-y-open.webp` },
            { model: "GDK-32-Y", productName: "Socket case", orderCode: "GDK-32-Y", stockCode: "101500320PLS1", weight: "2.110 kg/unit", image: `${IMG}/junction-boxes/gdk-32-y-open.webp` },
            { model: "GDK-33-Y", productName: "Junction box without socket", orderCode: "GDK-33-Y", stockCode: "101500330PLS0", weight: "4.680 kg/unit", image: `${IMG}/junction-boxes/gdk-33-y-exploded.webp` },
            { model: "GDK-34-Y", productName: "Granite-type junction box", orderCode: "GDK-34-Y", stockCode: "101500340PLS1", weight: "5.580 kg/unit", image: `${IMG}/junction-boxes/gdk-34-y-open.webp` },
            { model: "GDK-35-Y", productName: "Double underfloor junction box", orderCode: "GDK-35-Y", stockCode: "101500350PLS1", weight: "10.270 kg/unit", image: `${IMG}/junction-boxes/gdk-35-y-open.webp` },
          ],
        },
        {
          name: "British System (ING)",
          id: "british-system-ing",
          variants: [
            { model: "GDK-31 ING", productName: "Junction box — British system", orderCode: "GDK-31 ING", stockCode: "1015ING310PLS1", weight: "5.580 kg/unit", image: `${IMG}/junction-boxes/gdk-31-ing-open.webp` },
            { model: "GDK-32 ING", productName: "Socket case — British system", orderCode: "GDK-32 ING", stockCode: "1015ING320PLS1", weight: "2.160 kg/unit", image: `${IMG}/junction-boxes/gdk-32-ing-open.webp` },
            { model: "GDK-34 ING", productName: "Granite-type junction box — British system", orderCode: "GDK-34 ING", stockCode: "1015ING340PLS1", weight: "5.580 kg/unit", image: `${IMG}/junction-boxes/gdk-34-ing-open.webp` },
            { model: "GDK-35 ING", productName: "Double underfloor junction box — British system", orderCode: "GDK-35 ING", stockCode: "1015ING350PLS1", weight: "10.270 kg/unit", image: `${IMG}/junction-boxes/gdk-35-ing-open.webp` },
          ],
        },
        {
          name: "GDK / GDKB Accessories",
          id: "gdk-gdkb-accessories",
          variants: [
            { model: "GDK-06", productName: "Special junction box for marble floor", orderCode: "GDK-06", stockCode: "1015000609141", weight: "4.020 kg/unit", image: `${IMG}/junction-boxes/gdk-06-open.webp` },
            { model: "GDK-011", productName: "Double underfloor junction box", orderCode: "GDK-011", stockCode: "1015001109141", weight: "8.000 kg/unit", image: `${IMG}/junction-boxes/gdk-011-open.webp` },
            { model: "GDKB-18", productName: "Crossing for underfloor cable trays", orderCode: "GDKB-18", stockCode: "1015011809140", weight: "0.900 kg/unit", image: `${IMG}/tray-accessories/gdkb-crossing-family.webp` },
            { model: "GDKB-24", productName: "Crossing for underfloor cable trays", orderCode: "GDKB-24", stockCode: "1015012409140", weight: "1.100 kg/unit", image: `${IMG}/tray-accessories/gdkb-crossing-family.webp` },
            { model: "GDKB-30", productName: "Crossing for underfloor cable trays", orderCode: "GDKB-30", stockCode: "1015013009140", weight: "1.250 kg/unit", image: `${IMG}/tray-accessories/gdkb-crossing-family.webp` },
            { model: "GALFK-1", productName: "Aluminium flange and cover", orderCode: "GALFK-1", stockCode: "10150GALFAL0", weight: "0.700 kg/unit", image: `${IMG}/tray-accessories/galfk-1-flange-cover.webp` },
          ],
        },
      ],
    },
    "socket-data-accessories": {
      slug: "socket-data-accessories",
      columnLabels: COLUMN_LABELS.uk,
      groups: [
        {
          name: "Junction Box Sockets",
          id: "junction-box-sockets",
          variants: [
            { model: "GDKF-401", productName: "UPS socket", orderCode: "GDKF-401", stockCode: "101504010PLS0", weight: "0.034 kg/unit", image: `${IMG}/socket-accessories/gdkf-401.webp` },
            { model: "GDKF-402", productName: "Socket with earthing", orderCode: "GDKF-402", stockCode: "101504020PLS0", weight: "0.032 kg/unit", image: `${IMG}/socket-accessories/gdkf-402.webp` },
            { model: "GDKF-603", productName: "Data socket (RJ-45)", orderCode: "GDKF-603", stockCode: "101506030BKL0", weight: "0.011 kg/unit", image: `${IMG}/socket-accessories/gdkf-603.webp` },
            { model: "GDKF-604", productName: "Telephone socket (RJ-11)", orderCode: "GDKF-604", stockCode: "101506040BKL0", weight: "0.011 kg/unit", image: `${IMG}/socket-accessories/gdkf-604.webp` },
            { model: "GDKF-605", productName: "Blank cover", orderCode: "GDKF-605", stockCode: "101506050BKL0", weight: "0.005 kg/unit", image: `${IMG}/socket-accessories/gdkf-605.webp` },
            { model: "GDKF-607", productName: "Connection plate for two sockets", orderCode: "GDKF-607", stockCode: "101506070BLS0", weight: "0.063 kg/unit", image: `${IMG}/socket-accessories/gdkf-607.webp` },
            { model: "GDKF-609", productName: "Access box basement", orderCode: "GDKF-609", stockCode: "101506090PLS0", weight: "0.315 kg/unit", image: `${IMG}/socket-accessories/gdkf-609.webp` },
            { model: "GDKF-610", productName: "Access box side plate", orderCode: "GDKF-610", stockCode: "101506100PLS0", weight: "0.170 kg/unit", image: `${IMG}/socket-accessories/gdkf-610.webp` },
            { model: "GDKF-508", productName: "UPS, 13A, BS socket plate", orderCode: "GDKF-508", stockCode: "1015ABP11BY01", weight: "0.205 kg/unit", image: `${IMG}/socket-accessories/gdkf-508.webp` },
            { model: "GDKF-509", productName: "13A BS socket, 2 gang", orderCode: "GDKF-509", stockCode: "101505090BKL0", weight: "0.215 kg/unit", image: `${IMG}/socket-accessories/gdkf-509.webp` },
            { model: "GDKF-510", productName: "13A BS socket, non-standard 2 gang", orderCode: "GDKF-510", stockCode: "101505100BKL0", weight: "0.220 kg/unit", image: `${IMG}/socket-accessories/gdkf-510.webp` },
            { model: "GDKF-501", productName: "UPS socket", orderCode: "GDKF-501", stockCode: "101505010BKL0", weight: "0.034 kg/unit", image: `${IMG}/socket-accessories/gdkf-501-front.webp` },
            { model: "GDKF-502", productName: "Socket with earthing", orderCode: "GDKF-502", stockCode: "101505020BKL0", weight: "0.032 kg/unit", image: `${IMG}/socket-accessories/gdkf-502-front.webp` },
            { model: "GDKF-503", productName: "Jack plate", orderCode: "GDKF-503", stockCode: "101505030PLS0", weight: "0.006 kg/unit", image: `${IMG}/socket-accessories/gdkf-503-front.webp` },
            { model: "GDKF-504", productName: "Telephone socket (RJ12)", orderCode: "GDKF-504", stockCode: "101505040PLS0", weight: "0.006 kg/unit", image: `${IMG}/socket-accessories/gdkf-504-front.webp` },
            { model: "GDKF-505", productName: "Data socket (RJ45)", orderCode: "GDKF-505", stockCode: "101505050PLS0", weight: "0.006 kg/unit", image: `${IMG}/socket-accessories/gdkf-505-front.webp` },
          ],
        },
      ],
    },
    "underfloor-cable-trays": {
      slug: "underfloor-cable-trays",
      columnLabels: COLUMN_LABELS.uk,
      groups: [
        {
          name: "Solid",
          id: "solid",
          variants: [
            { model: "GDK-18", productName: "Underfloor cable tray without holes", orderCode: "GDK-18", stockCode: "1015018018220", dimensions: "180×30 mm; L=3000 mm; 1–1 mm thick", weight: "3.550 kg/m", image: `${IMG}/underfloor-cable-trays/gdk-18.webp` },
            { model: "GDK-24", productName: "Underfloor cable tray without holes", orderCode: "GDK-24", stockCode: "1015024018220", dimensions: "240×30 mm; L=3000 mm; 1–1 mm thick", weight: "5.550 kg/m", image: `${IMG}/underfloor-cable-trays/gdk-24.webp` },
            { model: "GDK-30", productName: "Underfloor cable tray without holes", orderCode: "GDK-30", stockCode: "1015030018220", dimensions: "300×30 mm; L=3000 mm; 1–1.2 mm thick", weight: "8.820 kg/m", image: `${IMG}/underfloor-cable-trays/gdk-30.webp` },
          ],
        },
        {
          name: "Perforated",
          id: "perforated",
          variants: [
            { model: "GDK-18-B", productName: "Underfloor cable tray with holes", orderCode: "GDK-18-B", stockCode: "1015B18018220", dimensions: "180×30 mm; L=3000 mm; 1–1 mm thick", weight: "3.550 kg/m", image: `${IMG}/underfloor-cable-trays/gdk-18-b.webp` },
            { model: "GDK-24-B", productName: "Underfloor cable tray with holes", orderCode: "GDK-24-B", stockCode: "1015030018220", dimensions: "240×30 mm; L=3000 mm; 1–1 mm thick", weight: "5.550 kg/m", image: `${IMG}/underfloor-cable-trays/gdk-24-b.webp` },
            { model: "GDK-30-B", productName: "Underfloor cable tray with holes", orderCode: "GDK-30-B", stockCode: "1015B30018220", dimensions: "300×30 mm; L=3000 mm; 1–1.2 mm thick", weight: "8.820 kg/m", image: `${IMG}/underfloor-cable-trays/gdk-30-b.webp` },
          ],
        },
      ],
    },
    "raised-floor-trunking": {
      slug: "raised-floor-trunking",
      columnLabels: COLUMN_LABELS.uk,
      groups: [
        {
          name: "GYDK Trunking (50 / 60 / 100 mm cavity)",
          id: "gydk-trunking",
          variants: [
            { model: "GYDK-10", productName: "In-cavity floor trunking", orderCode: "GYDK-10", stockCode: "1015001018220", dimensions: "A=100 mm; h=50 mm; L=3000 mm", weight: "1.700 kg/m" },
            { model: "GYDK-20", productName: "In-cavity floor trunking", orderCode: "GYDK-20", stockCode: "1015002028220", dimensions: "A=200 mm; h=50 mm; L=3000 mm", weight: "3.750 kg/m" },
            { model: "GYDK-30", productName: "In-cavity floor trunking", orderCode: "GYDK-30", stockCode: "1015003028220", dimensions: "A=300 mm; h=50 mm; L=3000 mm", weight: "5.100 kg/m" },
            { model: "GYDK-40", productName: "In-cavity floor trunking", orderCode: "GYDK-40", stockCode: "1015004028220", dimensions: "A=400 mm; h=50 mm; L=3000 mm", weight: "6.400 kg/m" },
            { model: "GYDK-50", productName: "In-cavity floor trunking", orderCode: "GYDK-50", stockCode: "1015005028220", dimensions: "A=500 mm; h=50 mm; L=3000 mm", weight: "7.700 kg/m" },
            { model: "GYDK-B10", productName: "In-cavity floor trunking", orderCode: "GYDK-B10", stockCode: "10150B1018220", dimensions: "A=100 mm; h=60 mm; L=3000 mm", weight: "1.800 kg/m" },
            { model: "GYDK-B20", productName: "In-cavity floor trunking", orderCode: "GYDK-B20", stockCode: "10150B2028220", dimensions: "A=200 mm; h=60 mm; L=3000 mm", weight: "4.000 kg/m" },
            { model: "GYDK-B30", productName: "In-cavity floor trunking", orderCode: "GYDK-B30", stockCode: "10150B3028220", dimensions: "A=300 mm; h=60 mm; L=3000 mm", weight: "5.350 kg/m" },
            { model: "GYDK-B40", productName: "In-cavity floor trunking", orderCode: "GYDK-B40", stockCode: "10150B4028220", dimensions: "A=400 mm; h=60 mm; L=3000 mm", weight: "6.650 kg/m" },
            { model: "GYDK-B50", productName: "In-cavity floor trunking", orderCode: "GYDK-B50", stockCode: "10150B5028220", dimensions: "A=500 mm; h=60 mm; L=3000 mm", weight: "8.000 kg/m" },
            { model: "GYDK-C10", productName: "In-cavity floor trunking", orderCode: "GYDK-C10", stockCode: "10150C1018220", dimensions: "A=100 mm; h=100 mm; L=3000 mm", weight: "2.550 kg/m" },
            { model: "GYDK-C20", productName: "In-cavity floor trunking", orderCode: "GYDK-C20", stockCode: "10150C2028220", dimensions: "A=200 mm; h=100 mm; L=3000 mm", weight: "5.100 kg/m" },
            { model: "GYDK-C30", productName: "In-cavity floor trunking", orderCode: "GYDK-C30", stockCode: "10150C3028220", dimensions: "A=300 mm; h=100 mm; L=3000 mm", weight: "6.400 kg/m" },
            { model: "GYDK-C40", productName: "In-cavity floor trunking", orderCode: "GYDK-C40", stockCode: "10150C4028220", dimensions: "A=400 mm; h=100 mm; L=3000 mm", weight: "7.750 kg/m" },
            { model: "GYDK-C50", productName: "In-cavity floor trunking", orderCode: "GYDK-C50", stockCode: "10150C5028220", dimensions: "A=500 mm; h=100 mm; L=3000 mm", weight: "9.000 kg/m" },
          ],
        },
        {
          name: "GYDK Cover",
          id: "gydk-cover",
          variants: [
            { model: "GYDK-10K", productName: "In-cavity floor trunking cover", orderCode: "GYDK-10K", stockCode: "1015C1K18220", dimensions: "A=100 mm; h=9 mm; L=3000 mm", weight: "1.000 kg/m" },
            { model: "GYDK-20K", productName: "In-cavity floor trunking cover", orderCode: "GYDK-20K", stockCode: "1015C2K18220", dimensions: "A=200 mm; h=9 mm; L=3000 mm", weight: "1.700 kg/m" },
            { model: "GYDK-30K", productName: "In-cavity floor trunking cover", orderCode: "GYDK-30K", stockCode: "1015C3K18220", dimensions: "A=300 mm; h=9 mm; L=3000 mm", weight: "2.650 kg/m" },
            { model: "GYDK-40K", productName: "In-cavity floor trunking cover", orderCode: "GYDK-40K", stockCode: "1015C4K28220", dimensions: "A=400 mm; h=9 mm; L=3000 mm", weight: "5.200 kg/m" },
            { model: "GYDK-50K", productName: "In-cavity floor trunking cover", orderCode: "GYDK-50K", stockCode: "1015C5K28220", dimensions: "A=500 mm; h=9 mm; L=3000 mm", weight: "6.500 kg/m" },
          ],
        },
      ],
    },
    "aluminium-trunking": {
      slug: "aluminium-trunking",
      columnLabels: COLUMN_LABELS.uk,
      groups: [
        {
          name: "GOR",
          id: "gor",
          variants: [
            { model: "GOR-01", productName: "Aluminium trunking, single compartment", orderCode: "GOR-01", stockCode: "101700212AL1", dimensions: "60×55 mm", weight: "0.970 kg/m", image: `${IMG}/aluminium-trunking/gor-01-front.webp` },
            { model: "GOR-02", productName: "Aluminium trunking, double compartment", orderCode: "GOR-02", stockCode: "101700202AL1", dimensions: "120×55 mm", weight: "1.720 kg/m", image: `${IMG}/aluminium-trunking/gor-02-front.webp` },
            { model: "GOR-03", productName: "Aluminium trunking, back-to-back (two faces)", orderCode: "GOR-03", stockCode: "101700192AL1", dimensions: "120×60 mm", weight: "1.670 kg/m", image: `${IMG}/aluminium-trunking/gor-03-front.webp` },
            { model: "GOR-09", productName: "Aluminium trunking cover", orderCode: "GOR-09", stockCode: "101700012AL1", weight: "0.250 kg/m", image: `${IMG}/aluminium-trunking/gor-09-front.webp` },
          ],
        },
        {
          name: "GOR Accessories",
          id: "gor-accessories",
          variants: [
            { model: "GOR-07", productName: "Aluminium vertical bend", orderCode: "GOR-07", stockCode: "101700052AL1", dimensions: "60×55 mm", weight: "0.430 kg/unit", image: `${IMG}/aluminium-trunking/gor-07-front.webp` },
            { model: "GOR-08", productName: "Aluminium horizontal bend", orderCode: "GOR-08", stockCode: "101700042AL1", dimensions: "120×55 mm", weight: "0.770 kg/unit", image: `${IMG}/aluminium-trunking/gor-08-front.webp` },
            { model: "GOR-11", productName: "Polycarbonate end cap", orderCode: "GOR-11", stockCode: "101700032AL1", dimensions: "60×55 mm", weight: "0.009 kg/unit", image: `${IMG}/aluminium-trunking/gor-11-front.webp` },
          ],
        },
        {
          name: "GOR / GDKF Accessories",
          id: "gor-gdkf-accessories",
          variants: [
            { model: "GDKF-401", productName: "UPS socket", orderCode: "GDKF-401", stockCode: "101504010PLS0", weight: "0.034 kg/unit", image: `${IMG}/socket-accessories/gdkf-401-front.webp` },
            { model: "GDKF-402", productName: "Socket with earthing", orderCode: "GDKF-402", stockCode: "101504020PLS0", weight: "0.032 kg/unit", image: `${IMG}/socket-accessories/gdkf-402-front.webp` },
            { model: "GDKF-403", productName: "Switch", orderCode: "GDKF-403", stockCode: "101504030PLS0", weight: "0.035 kg/unit", image: `${IMG}/socket-accessories/gdkf-403-front.webp` },
            { model: "GDKF-603", productName: "Data socket", orderCode: "GDKF-603", stockCode: "101506030PKL0", weight: "0.011 kg/unit", image: `${IMG}/socket-accessories/gdkf-603-front.webp` },
            { model: "GDKF-604", productName: "Telephone socket", orderCode: "GDKF-604", stockCode: "101506040BKL0", weight: "0.011 kg/unit", image: `${IMG}/socket-accessories/gdkf-604-front.webp` },
            { model: "GOR-10", productName: "Steel mounting plate", orderCode: "GOR-10", stockCode: "101700022AL1", weight: "0.027 kg/unit", image: `${IMG}/aluminium-trunking/gor-10-front.webp` },
          ],
        },
      ],
    },
    "tray-accessories": {
      slug: "tray-accessories",
      columnLabels: COLUMN_LABELS.uk,
      groups: [
        {
          name: "Joining Strap (GDKE)",
          id: "joining-strap-gdke",
          variants: [
            { model: "GDKE-18", productName: "Joining strap", orderCode: "GDKE-18", stockCode: "1015E18008220", weight: "0.270 kg/unit", image: `${IMG}/tray-accessories/gdke-family-front.webp` },
            { model: "GDKE-24", productName: "Joining strap", orderCode: "GDKE-24", stockCode: "1015E24008220", weight: "0.330 kg/unit", image: `${IMG}/tray-accessories/gdke-family-front.webp` },
            { model: "GDKE-30", productName: "Joining strap", orderCode: "GDKE-30", stockCode: "1015E30008220", weight: "0.400 kg/unit", image: `${IMG}/tray-accessories/gdke-family-front.webp` },
          ],
        },
        {
          name: "End Cap (GDKS)",
          id: "end-cap-gdks",
          variants: [
            { model: "GDKS-18", productName: "End cap", orderCode: "GDKS-18", stockCode: "1015S18008220", weight: "0.360 kg/unit", image: `${IMG}/tray-accessories/gdks-family-front.webp` },
            { model: "GDKS-24", productName: "End cap", orderCode: "GDKS-24", stockCode: "1015S24008220", weight: "0.450 kg/unit", image: `${IMG}/tray-accessories/gdks-family-front.webp` },
            { model: "GDKS-30", productName: "End cap", orderCode: "GDKS-30", stockCode: "1015S30008220", weight: "0.540 kg/unit", image: `${IMG}/tray-accessories/gdks-family-front.webp` },
          ],
        },
        {
          name: "90° Riser (GDKD)",
          id: "riser-gdkd",
          variants: [
            { model: "GDKD-18", productName: "90° riser", orderCode: "GDKD-18", stockCode: "1015G18008220", weight: "1.480 kg/unit", image: `${IMG}/tray-accessories/gdkd-family-front.webp` },
            { model: "GDKD-24", productName: "90° riser", orderCode: "GDKD-24", stockCode: "1015G24008220", weight: "1.990 kg/unit", image: `${IMG}/tray-accessories/gdkd-family-front.webp` },
            { model: "GDKD-30", productName: "90° riser", orderCode: "GDKD-30", stockCode: "1015G30008220", weight: "2.340 kg/unit", image: `${IMG}/tray-accessories/gdkd-family-front.webp` },
            { model: "GDKD-18A", productName: "90° riser", orderCode: "GDKD-18A", stockCode: "1015G18A28220", weight: "4.540 kg/unit", image: `${IMG}/tray-accessories/gdkd-a-family-front.webp` },
            { model: "GDKD-24A", productName: "90° riser", orderCode: "GDKD-24A", stockCode: "1015G24A28220", weight: "4.740 kg/unit", image: `${IMG}/tray-accessories/gdkd-a-family-front.webp` },
          ],
        },
      ],
    },
  },
  ua: {
    "underfloor-junction-boxes": {
      slug: "underfloor-junction-boxes",
      columnLabels: COLUMN_LABELS.ua,
      groups: [
        {
          name: "GDK",
          id: "gdk",
          variants: [
            { model: "GDK-01", productName: "Підпідлогова розподільна коробка", orderCode: "GDK-01", stockCode: "101506070BLS0", weight: "4.060 кг/шт", image: `${IMG}/junction-boxes/gdk-01-open.webp` },
            { model: "GDK-02", productName: "Розетковий вкладиш", orderCode: "GDK-02", stockCode: "101500020PLS0", weight: "1.100 кг/шт", image: `${IMG}/junction-boxes/gdk-02-open.webp` },
            { model: "GDK-03", productName: "Розподільна коробка без розетки", orderCode: "GDK-03", stockCode: "1015000309141", weight: "3.930 кг/шт", image: `${IMG}/junction-boxes/gdk-03-exploded.webp` },
            { model: "GDK-07", productName: "Коробка для підвищеної підлоги", orderCode: "GDK-07", stockCode: "101500700BOY0", weight: "6.200 кг/шт", image: `${IMG}/junction-boxes/gdk-07-open.webp` },
          ],
        },
        {
          name: "GDK-Y",
          id: "gdk-y",
          variants: [
            { model: "GDK-31-Y", productName: "Підпідлогова розподільна коробка", orderCode: "GDK-31-Y", stockCode: "101500310PLS1", dimensions: "400×400 мм; отвір 280×280 мм; h≈69 мм", weight: "5.580 кг/шт", image: `${IMG}/junction-boxes/gdk-31-y-open.webp` },
            { model: "GDK-32-Y", productName: "Розетковий вкладиш", orderCode: "GDK-32-Y", stockCode: "101500320PLS1", weight: "2.110 кг/шт", image: `${IMG}/junction-boxes/gdk-32-y-open.webp` },
            { model: "GDK-33-Y", productName: "Розподільна коробка без розетки", orderCode: "GDK-33-Y", stockCode: "101500330PLS0", weight: "4.680 кг/шт", image: `${IMG}/junction-boxes/gdk-33-y-exploded.webp` },
            { model: "GDK-34-Y", productName: "Розподільна коробка гранітного типу", orderCode: "GDK-34-Y", stockCode: "101500340PLS1", weight: "5.580 кг/шт", image: `${IMG}/junction-boxes/gdk-34-y-open.webp` },
            { model: "GDK-35-Y", productName: "Здвоєна підпідлогова розподільна коробка", orderCode: "GDK-35-Y", stockCode: "101500350PLS1", weight: "10.270 кг/шт", image: `${IMG}/junction-boxes/gdk-35-y-open.webp` },
          ],
        },
        {
          name: "Британська система (ING)",
          id: "british-system-ing",
          variants: [
            { model: "GDK-31 ING", productName: "Розподільна коробка — британська система", orderCode: "GDK-31 ING", stockCode: "1015ING310PLS1", weight: "5.580 кг/шт", image: `${IMG}/junction-boxes/gdk-31-ing-open.webp` },
            { model: "GDK-32 ING", productName: "Розетковий вкладиш — британська система", orderCode: "GDK-32 ING", stockCode: "1015ING320PLS1", weight: "2.160 кг/шт", image: `${IMG}/junction-boxes/gdk-32-ing-open.webp` },
            { model: "GDK-34 ING", productName: "Розподільна коробка гранітного типу — британська система", orderCode: "GDK-34 ING", stockCode: "1015ING340PLS1", weight: "5.580 кг/шт", image: `${IMG}/junction-boxes/gdk-34-ing-open.webp` },
            { model: "GDK-35 ING", productName: "Здвоєна підпідлогова розподільна коробка — британська система", orderCode: "GDK-35 ING", stockCode: "1015ING350PLS1", weight: "10.270 кг/шт", image: `${IMG}/junction-boxes/gdk-35-ing-open.webp` },
          ],
        },
        {
          name: "Аксесуари GDK / GDKB",
          id: "gdk-gdkb-accessories",
          variants: [
            { model: "GDK-06", productName: "Спеціальна коробка для мармурової підлоги", orderCode: "GDK-06", stockCode: "1015000609141", weight: "4.020 кг/шт", image: `${IMG}/junction-boxes/gdk-06-open.webp` },
            { model: "GDK-011", productName: "Здвоєна підпідлогова розподільна коробка", orderCode: "GDK-011", stockCode: "1015001109141", weight: "8.000 кг/шт", image: `${IMG}/junction-boxes/gdk-011-open.webp` },
            { model: "GDKB-18", productName: "З'єднання-перехрестя для підпідлогових лотків", orderCode: "GDKB-18", stockCode: "1015011809140", weight: "0.900 кг/шт", image: `${IMG}/tray-accessories/gdkb-crossing-family.webp` },
            { model: "GDKB-24", productName: "З'єднання-перехрестя для підпідлогових лотків", orderCode: "GDKB-24", stockCode: "1015012409140", weight: "1.100 кг/шт", image: `${IMG}/tray-accessories/gdkb-crossing-family.webp` },
            { model: "GDKB-30", productName: "З'єднання-перехрестя для підпідлогових лотків", orderCode: "GDKB-30", stockCode: "1015013009140", weight: "1.250 кг/шт", image: `${IMG}/tray-accessories/gdkb-crossing-family.webp` },
            { model: "GALFK-1", productName: "Алюмінієвий фланець і кришка", orderCode: "GALFK-1", stockCode: "10150GALFAL0", weight: "0.700 кг/шт", image: `${IMG}/tray-accessories/galfk-1-flange-cover.webp` },
          ],
        },
      ],
    },
    "socket-data-accessories": {
      slug: "socket-data-accessories",
      columnLabels: COLUMN_LABELS.ua,
      groups: [
        {
          name: "Розетки для розподільних коробок",
          id: "junction-box-sockets",
          variants: [
            { model: "GDKF-401", productName: "Розетка UPS", orderCode: "GDKF-401", stockCode: "101504010PLS0", weight: "0.034 кг/шт", image: `${IMG}/socket-accessories/gdkf-401.webp` },
            { model: "GDKF-402", productName: "Розетка із заземленням", orderCode: "GDKF-402", stockCode: "101504020PLS0", weight: "0.032 кг/шт", image: `${IMG}/socket-accessories/gdkf-402.webp` },
            { model: "GDKF-603", productName: "Розетка даних (RJ-45)", orderCode: "GDKF-603", stockCode: "101506030BKL0", weight: "0.011 кг/шт", image: `${IMG}/socket-accessories/gdkf-603.webp` },
            { model: "GDKF-604", productName: "Телефонна розетка (RJ-11)", orderCode: "GDKF-604", stockCode: "101506040BKL0", weight: "0.011 кг/шт", image: `${IMG}/socket-accessories/gdkf-604.webp` },
            { model: "GDKF-605", productName: "Заглушка", orderCode: "GDKF-605", stockCode: "101506050BKL0", weight: "0.005 кг/шт", image: `${IMG}/socket-accessories/gdkf-605.webp` },
            { model: "GDKF-607", productName: "З'єднувальна пластина для двох розеток", orderCode: "GDKF-607", stockCode: "101506070BLS0", weight: "0.063 кг/шт", image: `${IMG}/socket-accessories/gdkf-607.webp` },
            { model: "GDKF-609", productName: "Основа монтажної коробки", orderCode: "GDKF-609", stockCode: "101506090PLS0", weight: "0.315 кг/шт", image: `${IMG}/socket-accessories/gdkf-609.webp` },
            { model: "GDKF-610", productName: "Бокова панель монтажної коробки", orderCode: "GDKF-610", stockCode: "101506100PLS0", weight: "0.170 кг/шт", image: `${IMG}/socket-accessories/gdkf-610.webp` },
            { model: "GDKF-508", productName: "Панель UPS, 13A, BS", orderCode: "GDKF-508", stockCode: "1015ABP11BY01", weight: "0.205 кг/шт", image: `${IMG}/socket-accessories/gdkf-508.webp` },
            { model: "GDKF-509", productName: "Розетка 13A BS, здвоєна", orderCode: "GDKF-509", stockCode: "101505090BKL0", weight: "0.215 кг/шт", image: `${IMG}/socket-accessories/gdkf-509.webp` },
            { model: "GDKF-510", productName: "Розетка 13A BS, здвоєна нестандартна", orderCode: "GDKF-510", stockCode: "101505100BKL0", weight: "0.220 кг/шт", image: `${IMG}/socket-accessories/gdkf-510.webp` },
            { model: "GDKF-501", productName: "Розетка UPS", orderCode: "GDKF-501", stockCode: "101505010BKL0", weight: "0.034 кг/шт", image: `${IMG}/socket-accessories/gdkf-501-front.webp` },
            { model: "GDKF-502", productName: "Розетка із заземленням", orderCode: "GDKF-502", stockCode: "101505020BKL0", weight: "0.032 кг/шт", image: `${IMG}/socket-accessories/gdkf-502-front.webp` },
            { model: "GDKF-503", productName: "Розетка Jack", orderCode: "GDKF-503", stockCode: "101505030PLS0", weight: "0.006 кг/шт", image: `${IMG}/socket-accessories/gdkf-503-front.webp` },
            { model: "GDKF-504", productName: "Телефонна розетка (RJ12)", orderCode: "GDKF-504", stockCode: "101505040PLS0", weight: "0.006 кг/шт", image: `${IMG}/socket-accessories/gdkf-504-front.webp` },
            { model: "GDKF-505", productName: "Розетка даних (RJ45)", orderCode: "GDKF-505", stockCode: "101505050PLS0", weight: "0.006 кг/шт", image: `${IMG}/socket-accessories/gdkf-505-front.webp` },
          ],
        },
      ],
    },
    "underfloor-cable-trays": {
      slug: "underfloor-cable-trays",
      columnLabels: COLUMN_LABELS.ua,
      groups: [
        {
          name: "Суцільний",
          id: "solid",
          variants: [
            { model: "GDK-18", productName: "Підпідлоговий лоток без отворів", orderCode: "GDK-18", stockCode: "1015018018220", dimensions: "180×30 мм; L=3000 мм; товщина 1–1 мм", weight: "3.550 кг/м", image: `${IMG}/underfloor-cable-trays/gdk-18.webp` },
            { model: "GDK-24", productName: "Підпідлоговий лоток без отворів", orderCode: "GDK-24", stockCode: "1015024018220", dimensions: "240×30 мм; L=3000 мм; товщина 1–1 мм", weight: "5.550 кг/м", image: `${IMG}/underfloor-cable-trays/gdk-24.webp` },
            { model: "GDK-30", productName: "Підпідлоговий лоток без отворів", orderCode: "GDK-30", stockCode: "1015030018220", dimensions: "300×30 мм; L=3000 мм; товщина 1–1.2 мм", weight: "8.820 кг/м", image: `${IMG}/underfloor-cable-trays/gdk-30.webp` },
          ],
        },
        {
          name: "Перфорований",
          id: "perforated",
          variants: [
            { model: "GDK-18-B", productName: "Перфорований підпідлоговий лоток", orderCode: "GDK-18-B", stockCode: "1015B18018220", dimensions: "180×30 мм; L=3000 мм; товщина 1–1 мм", weight: "3.550 кг/м", image: `${IMG}/underfloor-cable-trays/gdk-18-b.webp` },
            { model: "GDK-24-B", productName: "Перфорований підпідлоговий лоток", orderCode: "GDK-24-B", stockCode: "1015030018220", dimensions: "240×30 мм; L=3000 мм; товщина 1–1 мм", weight: "5.550 кг/м", image: `${IMG}/underfloor-cable-trays/gdk-24-b.webp` },
            { model: "GDK-30-B", productName: "Перфорований підпідлоговий лоток", orderCode: "GDK-30-B", stockCode: "1015B30018220", dimensions: "300×30 мм; L=3000 мм; товщина 1–1.2 мм", weight: "8.820 кг/м", image: `${IMG}/underfloor-cable-trays/gdk-30-b.webp` },
          ],
        },
      ],
    },
    "raised-floor-trunking": {
      slug: "raised-floor-trunking",
      columnLabels: COLUMN_LABELS.ua,
      groups: [
        {
          name: "Канал GYDK (порожнина 50 / 60 / 100 мм)",
          id: "gydk-trunking",
          variants: [
            { model: "GYDK-10", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-10", stockCode: "1015001018220", dimensions: "A=100 мм; h=50 мм; L=3000 мм", weight: "1.700 кг/м" },
            { model: "GYDK-20", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-20", stockCode: "1015002028220", dimensions: "A=200 мм; h=50 мм; L=3000 мм", weight: "3.750 кг/м" },
            { model: "GYDK-30", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-30", stockCode: "1015003028220", dimensions: "A=300 мм; h=50 мм; L=3000 мм", weight: "5.100 кг/м" },
            { model: "GYDK-40", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-40", stockCode: "1015004028220", dimensions: "A=400 мм; h=50 мм; L=3000 мм", weight: "6.400 кг/м" },
            { model: "GYDK-50", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-50", stockCode: "1015005028220", dimensions: "A=500 мм; h=50 мм; L=3000 мм", weight: "7.700 кг/м" },
            { model: "GYDK-B10", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-B10", stockCode: "10150B1018220", dimensions: "A=100 мм; h=60 мм; L=3000 мм", weight: "1.800 кг/м" },
            { model: "GYDK-B20", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-B20", stockCode: "10150B2028220", dimensions: "A=200 мм; h=60 мм; L=3000 мм", weight: "4.000 кг/м" },
            { model: "GYDK-B30", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-B30", stockCode: "10150B3028220", dimensions: "A=300 мм; h=60 мм; L=3000 мм", weight: "5.350 кг/м" },
            { model: "GYDK-B40", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-B40", stockCode: "10150B4028220", dimensions: "A=400 мм; h=60 мм; L=3000 мм", weight: "6.650 кг/м" },
            { model: "GYDK-B50", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-B50", stockCode: "10150B5028220", dimensions: "A=500 мм; h=60 мм; L=3000 мм", weight: "8.000 кг/м" },
            { model: "GYDK-C10", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-C10", stockCode: "10150C1018220", dimensions: "A=100 мм; h=100 мм; L=3000 мм", weight: "2.550 кг/м" },
            { model: "GYDK-C20", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-C20", stockCode: "10150C2028220", dimensions: "A=200 мм; h=100 мм; L=3000 мм", weight: "5.100 кг/м" },
            { model: "GYDK-C30", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-C30", stockCode: "10150C3028220", dimensions: "A=300 мм; h=100 мм; L=3000 мм", weight: "6.400 кг/м" },
            { model: "GYDK-C40", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-C40", stockCode: "10150C4028220", dimensions: "A=400 мм; h=100 мм; L=3000 мм", weight: "7.750 кг/м" },
            { model: "GYDK-C50", productName: "Заглиблений канал для підвищеної підлоги", orderCode: "GYDK-C50", stockCode: "10150C5028220", dimensions: "A=500 мм; h=100 мм; L=3000 мм", weight: "9.000 кг/м" },
          ],
        },
        {
          name: "Кришка GYDK",
          id: "gydk-cover",
          variants: [
            { model: "GYDK-10K", productName: "Кришка заглибленого каналу", orderCode: "GYDK-10K", stockCode: "1015C1K18220", dimensions: "A=100 мм; h=9 мм; L=3000 мм", weight: "1.000 кг/м" },
            { model: "GYDK-20K", productName: "Кришка заглибленого каналу", orderCode: "GYDK-20K", stockCode: "1015C2K18220", dimensions: "A=200 мм; h=9 мм; L=3000 мм", weight: "1.700 кг/м" },
            { model: "GYDK-30K", productName: "Кришка заглибленого каналу", orderCode: "GYDK-30K", stockCode: "1015C3K18220", dimensions: "A=300 мм; h=9 мм; L=3000 мм", weight: "2.650 кг/м" },
            { model: "GYDK-40K", productName: "Кришка заглибленого каналу", orderCode: "GYDK-40K", stockCode: "1015C4K28220", dimensions: "A=400 мм; h=9 мм; L=3000 мм", weight: "5.200 кг/м" },
            { model: "GYDK-50K", productName: "Кришка заглибленого каналу", orderCode: "GYDK-50K", stockCode: "1015C5K28220", dimensions: "A=500 мм; h=9 мм; L=3000 мм", weight: "6.500 кг/м" },
          ],
        },
      ],
    },
    "aluminium-trunking": {
      slug: "aluminium-trunking",
      columnLabels: COLUMN_LABELS.ua,
      groups: [
        {
          name: "GOR",
          id: "gor",
          variants: [
            { model: "GOR-01", productName: "Алюмінієвий канал, одновідсіковий", orderCode: "GOR-01", stockCode: "101700212AL1", dimensions: "60×55 мм", weight: "0.970 кг/м", image: `${IMG}/aluminium-trunking/gor-01-front.webp` },
            { model: "GOR-02", productName: "Алюмінієвий канал, двовідсіковий", orderCode: "GOR-02", stockCode: "101700202AL1", dimensions: "120×55 мм", weight: "1.720 кг/м", image: `${IMG}/aluminium-trunking/gor-02-front.webp` },
            { model: "GOR-03", productName: "Алюмінієвий канал, спина до спини (двосторонній)", orderCode: "GOR-03", stockCode: "101700192AL1", dimensions: "120×60 мм", weight: "1.670 кг/м", image: `${IMG}/aluminium-trunking/gor-03-front.webp` },
            { model: "GOR-09", productName: "Кришка алюмінієвого каналу", orderCode: "GOR-09", stockCode: "101700012AL1", weight: "0.250 кг/м", image: `${IMG}/aluminium-trunking/gor-09-front.webp` },
          ],
        },
        {
          name: "Аксесуари GOR",
          id: "gor-accessories",
          variants: [
            { model: "GOR-07", productName: "Алюмінієвий вертикальний поворот", orderCode: "GOR-07", stockCode: "101700052AL1", dimensions: "60×55 мм", weight: "0.430 кг/шт", image: `${IMG}/aluminium-trunking/gor-07-front.webp` },
            { model: "GOR-08", productName: "Алюмінієвий горизонтальний поворот", orderCode: "GOR-08", stockCode: "101700042AL1", dimensions: "120×55 мм", weight: "0.770 кг/шт", image: `${IMG}/aluminium-trunking/gor-08-front.webp` },
            { model: "GOR-11", productName: "Полікарбонатна заглушка", orderCode: "GOR-11", stockCode: "101700032AL1", dimensions: "60×55 мм", weight: "0.009 кг/шт", image: `${IMG}/aluminium-trunking/gor-11-front.webp` },
          ],
        },
        {
          name: "Аксесуари GOR / GDKF",
          id: "gor-gdkf-accessories",
          variants: [
            { model: "GDKF-401", productName: "Розетка UPS", orderCode: "GDKF-401", stockCode: "101504010PLS0", weight: "0.034 кг/шт", image: `${IMG}/socket-accessories/gdkf-401-front.webp` },
            { model: "GDKF-402", productName: "Розетка із заземленням", orderCode: "GDKF-402", stockCode: "101504020PLS0", weight: "0.032 кг/шт", image: `${IMG}/socket-accessories/gdkf-402-front.webp` },
            { model: "GDKF-403", productName: "Вимикач", orderCode: "GDKF-403", stockCode: "101504030PLS0", weight: "0.035 кг/шт", image: `${IMG}/socket-accessories/gdkf-403-front.webp` },
            { model: "GDKF-603", productName: "Розетка даних", orderCode: "GDKF-603", stockCode: "101506030PKL0", weight: "0.011 кг/шт", image: `${IMG}/socket-accessories/gdkf-603-front.webp` },
            { model: "GDKF-604", productName: "Телефонна розетка", orderCode: "GDKF-604", stockCode: "101506040BKL0", weight: "0.011 кг/шт", image: `${IMG}/socket-accessories/gdkf-604-front.webp` },
            { model: "GOR-10", productName: "Сталева монтажна пластина", orderCode: "GOR-10", stockCode: "101700022AL1", weight: "0.027 кг/шт", image: `${IMG}/aluminium-trunking/gor-10-front.webp` },
          ],
        },
      ],
    },
    "tray-accessories": {
      slug: "tray-accessories",
      columnLabels: COLUMN_LABELS.ua,
      groups: [
        {
          name: "Елемент з'єднання (GDKE)",
          id: "joining-strap-gdke",
          variants: [
            { model: "GDKE-18", productName: "Елемент з'єднання", orderCode: "GDKE-18", stockCode: "1015E18008220", weight: "0.270 кг/шт", image: `${IMG}/tray-accessories/gdke-family-front.webp` },
            { model: "GDKE-24", productName: "Елемент з'єднання", orderCode: "GDKE-24", stockCode: "1015E24008220", weight: "0.330 кг/шт", image: `${IMG}/tray-accessories/gdke-family-front.webp` },
            { model: "GDKE-30", productName: "Елемент з'єднання", orderCode: "GDKE-30", stockCode: "1015E30008220", weight: "0.400 кг/шт", image: `${IMG}/tray-accessories/gdke-family-front.webp` },
          ],
        },
        {
          name: "Заглушка (GDKS)",
          id: "end-cap-gdks",
          variants: [
            { model: "GDKS-18", productName: "Заглушка", orderCode: "GDKS-18", stockCode: "1015S18008220", weight: "0.360 кг/шт", image: `${IMG}/tray-accessories/gdks-family-front.webp` },
            { model: "GDKS-24", productName: "Заглушка", orderCode: "GDKS-24", stockCode: "1015S24008220", weight: "0.450 кг/шт", image: `${IMG}/tray-accessories/gdks-family-front.webp` },
            { model: "GDKS-30", productName: "Заглушка", orderCode: "GDKS-30", stockCode: "1015S30008220", weight: "0.540 кг/шт", image: `${IMG}/tray-accessories/gdks-family-front.webp` },
          ],
        },
        {
          name: "Поворот 90° (GDKD)",
          id: "riser-gdkd",
          variants: [
            { model: "GDKD-18", productName: "Поворот 90°", orderCode: "GDKD-18", stockCode: "1015G18008220", weight: "1.480 кг/шт", image: `${IMG}/tray-accessories/gdkd-family-front.webp` },
            { model: "GDKD-24", productName: "Поворот 90°", orderCode: "GDKD-24", stockCode: "1015G24008220", weight: "1.990 кг/шт", image: `${IMG}/tray-accessories/gdkd-family-front.webp` },
            { model: "GDKD-30", productName: "Поворот 90°", orderCode: "GDKD-30", stockCode: "1015G30008220", weight: "2.340 кг/шт", image: `${IMG}/tray-accessories/gdkd-family-front.webp` },
            { model: "GDKD-18A", productName: "Поворот 90°", orderCode: "GDKD-18A", stockCode: "1015G18A28220", weight: "4.540 кг/шт", image: `${IMG}/tray-accessories/gdkd-a-family-front.webp` },
            { model: "GDKD-24A", productName: "Поворот 90°", orderCode: "GDKD-24A", stockCode: "1015G24A28220", weight: "4.740 кг/шт", image: `${IMG}/tray-accessories/gdkd-a-family-front.webp` },
          ],
        },
      ],
    },
  },
};

export function underfloorSeriesDetailForMarket(
  slug: string,
  market: MarketCode,
): UnderfloorSeriesDetail | undefined {
  return content[market][slug];
}
