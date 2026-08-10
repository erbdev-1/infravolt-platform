import type { CableSizeVariant } from "../types";

// Real GATFC / GACC size variants from the Gersan catalogue
// (aluminyum-kablo-kelepcesi-product-data.csv, 61 rows) — this series has no
// order or stock code at all (every row's verification_note states "Sipariş
// ve stok kodları katalogda bulunamadı"), so it renders as a size-selection
// table (CableSizeVariantTable) instead of the standard order-code schedule
// — see aluminiumCableCleatsContentForMarket in
// accessories-fixings-detail-content.ts. `type` disambiguates the four real
// catalogue subseries (GATFC Tek Civatalı / GATFC (SP) Tek Civatalı / GACC
// Çift Civatalı / GATFC (SP) Trefoil Tip — see aluminyum-kablo-kelepcesi-
// report.md section 4) since `model` alone repeats "GATFC (SP)" across two
// of them. `dimensions` keeps every lettered catalogue value (B/C/D/E/F/G/H)
// after the clamping range (already shown separately as `range`).
export const ALUMINIUM_CABLE_CLEATS_SIZE_VARIANTS: readonly CableSizeVariant[] = [
  { model: "GATFC", type: "Single Bolt Fixing", range: "24–25 mm", dimensions: "B=94; D=38; C(single fixing)=75; C(double fixing)=128; E(double fixing)=102", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "25–27 mm", dimensions: "B=97; D=38; C(single fixing)=75; C(double fixing)=128; E(double fixing)=102", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "27–28 mm", dimensions: "B=100; D=38; C(single fixing)=75; C(double fixing)=128; E(double fixing)=102", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "28–30 mm", dimensions: "B=103; D=38; C(single fixing)=76; C(double fixing)=130; E(double fixing)=104", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "30–32 mm", dimensions: "B=105; D=38; C(single fixing)=79; C(double fixing)=133; E(double fixing)=107", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "32–34 mm", dimensions: "B=106; D=38; C(single fixing)=83; C(double fixing)=135; E(double fixing)=109", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "34–35 mm", dimensions: "B=109; D=38; C(single fixing)=86; C(double fixing)=137; E(double fixing)=110", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "35–36 mm", dimensions: "B=113; D=38; C(single fixing)=89; C(double fixing)=138; E(double fixing)=113", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "36–38 mm", dimensions: "B=116; D=38; C(single fixing)=92; C(double fixing)=140; E(double fixing)=114", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "38–40 mm", dimensions: "B=119; D=38; C(single fixing)=95; C(double fixing)=145; E(double fixing)=118", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "40–41 mm", dimensions: "B=122; D=38; C(single fixing)=99; C(double fixing)=147; E(double fixing)=121", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "41–43 mm", dimensions: "B=124; D=38; C(single fixing)=105; C(double fixing)=149; E(double fixing)=123", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "43–44 mm", dimensions: "B=127; D=38; C(single fixing)=108; C(double fixing)=150; E(double fixing)=124", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "44–46 mm", dimensions: "B=130; D=38; C(single fixing)=112; C(double fixing)=154; E(double fixing)=128", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "46–48 mm", dimensions: "B=133; D=38; C(single fixing)=114; C(double fixing)=156; E(double fixing)=129", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "48–49 mm", dimensions: "B=137; D=38; C(single fixing)=118; C(double fixing)=159; E(double fixing)=133", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "49–51 mm", dimensions: "B=140; D=38; C(single fixing)=121; C(double fixing)=165; E(double fixing)=135", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "51–53 mm", dimensions: "B=143; D=38; C(single fixing)=124; C(double fixing)=165; E(double fixing)=137", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "53–54 mm", dimensions: "B=146; D=38; C(single fixing)=127; C(double fixing)=172; E(double fixing)=141", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "54–55.5 mm", dimensions: "B=155; D=44; C(single fixing)=133; C(double fixing)=183; E(double fixing)=152", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "55.5–57 mm", dimensions: "B=158; D=44; C(single fixing)=137; C(double fixing)=187; E(double fixing)=155", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "57–59 mm", dimensions: "B=160; D=44; C(single fixing)=141; C(double fixing)=189; E(double fixing)=157", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "59–60 mm", dimensions: "B=163; D=44; C(single fixing)=145; C(double fixing)=191; E(double fixing)=160", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "60–62 mm", dimensions: "B=165; D=44; C(single fixing)=148; C(double fixing)=194; E(double fixing)=162", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "62–63.5 mm", dimensions: "B=168; D=44; C(single fixing)=152; C(double fixing)=196; E(double fixing)=165", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "63.5–65 mm", dimensions: "B=172; D=44; C(single fixing)=156; C(double fixing)=199; E(double fixing)=168", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "65–66.5 mm", dimensions: "B=176; D=44; C(single fixing)=160; C(double fixing)=202; E(double fixing)=170", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "66.5–68 mm", dimensions: "B=178; D=44; C(single fixing)=164; C(double fixing)=205; E(double fixing)=173", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "68–70 mm", dimensions: "B=181; D=44; C(single fixing)=168; C(double fixing)=208; E(double fixing)=176", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "70–71.5 mm", dimensions: "B=187; D=44; C(single fixing)=171; C(double fixing)=215; E(double fixing)=183", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "71.5–73 mm", dimensions: "B=190; D=44; C(single fixing)=175; C(double fixing)=217; E(double fixing)=186", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "73–74.5 mm", dimensions: "B=193; D=44; C(single fixing)=179; C(double fixing)=220; E(double fixing)=188", material: "Aluminium" },
  { model: "GATFC", type: "Single Bolt Fixing", range: "74.5–76 mm", dimensions: "B=197; D=44; C(single fixing)=183; C(double fixing)=222; E(double fixing)=191", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "10–13 mm", dimensions: "B=6.50; C=3; D=5; E=6.30; F=40; G=46.80; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "13–16 mm", dimensions: "B=9; C=3; D=6.50; E=8.30; F=40; G=46.80; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "16–19 mm", dimensions: "B=10; C=3.5; D=8.30; E=9.30; F=12; G=46.80; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "19–22 mm", dimensions: "B=11.30; C=3.5; D=11; E=9.70; F=16; G=46.80; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "22–25 mm", dimensions: "B=12.70; C=4.25; D=12.50; E=11.30; F=50; G=46.80; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "25–32 mm", dimensions: "B=16.30; C=4.25; D=16.20; E=12.50; F=56; G=46.80; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "32–38 mm", dimensions: "B=19.60; C=6; D=16; E=19.30; F=62; G=47.00; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "38–44 mm", dimensions: "B=23; C=6; D=19; E=22.30; F=69; G=47.00; H=7.50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Single Bolt Fixing", range: "44–51 mm", dimensions: "B=26; C=6.20; D=22; E=25.30; F=75; G=47.00; H=7.50", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "40–50 mm", dimensions: "B=50.20; C=20.20; D=4; E=30; F=84.50; G=110; H=45", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "48–55 mm", dimensions: "B=55.50; C=24.30; D=4; E=30.50; F=84.50; G=110; H=45", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "57–64 mm", dimensions: "B=64.40; C=28.80; D=4; E=37.80; F=94; G=122; H=48", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "64–70 mm", dimensions: "B=70.50; C=32.20; D=4; E=40; F=98; G=124; H=46", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "70–76 mm", dimensions: "B=76.50; C=35.20; D=4; E=44.80; F=110.70; G=136; H=48", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "76–83 mm", dimensions: "B=83.50; C=38.20; D=4; E=48; F=117.70; G=143; H=52", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "83–89 mm", dimensions: "B=89.50; C=41; D=4; E=48.80; F=124.20; G=149.20; H=60", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "89–95 mm", dimensions: "B=95.50; C=44.80; D=4; E=52.80; F=130.50; G=158.20; H=59", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "95–101 mm", dimensions: "B=101.50; C=47.80; D=4; E=55.80; F=126.10; G=154; H=65", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "115–125 mm", dimensions: "B=125.50; C=58; D=4; E=63.50; F=150; G=175; H=85", material: "Aluminium" },
  { model: "GACC", type: "Double Bolt Fixing", range: "125–135 mm", dimensions: "B=136.10; C=62.80; D=4; E=70.20; F=166; G=194; H=85", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "15–30 mm", dimensions: "B=108; C=80; D=45; E=30", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "30–45 mm", dimensions: "B=151; C=120; D=66; E=30", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "45–60 mm", dimensions: "B=184; C=151; D=85; E=40", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "60–75 mm", dimensions: "B=226; C=193; D=114; E=40", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "75–90 mm", dimensions: "B=267; C=235; D=142; E=40", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "90–107 mm", dimensions: "B=319; C=282; D=171; E=50", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "107–129 mm", dimensions: "B=390; C=352; D=203; E=57", material: "Aluminium" },
  { model: "GATFC (SP)", type: "Trefoil Type", range: "129–155 mm", dimensions: "B=455; C=397; D=244; E=57", material: "Aluminium" },
];
