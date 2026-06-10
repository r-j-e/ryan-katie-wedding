// Quiet, imagery-led wedding site. Single column, generous whitespace,
// cream throughout, restrained type. No ornament — no roman numerals,
// page numbers, "fig" captions, running heads, multi-column layouts.

// ============================================================
// NAMES — matches the printed Canva invite:
//   Amoresa script capitals + Cinzel caps body.
//   Default order: Katie & Ryan (her first, as on the invite).
//   stacked=true   → Katie / & / Ryan (the invite's vertical lockup)
//   stacked=false  → Katie & Ryan in one line (used in nav/footer)
// ============================================================
const Names = ({ stacked = false, size = 'inherit', color }) => {
  if (stacked) {
    return (
      <span className="script-name stacked" style={{ fontSize: size, color }}>
        <span className="line"><span className="script">K</span><span className="caps">atie</span></span>
        <span className="line ampline"><span className="script amp">&amp;</span></span>
        <span className="line"><span className="script">R</span><span className="caps">yan</span></span>
      </span>);

  }
  return (
    <span className="script-name" style={{ fontSize: size, color }}>
      <span className="script">K</span><span className="caps">atie</span>
      <span className="script amp">&amp;</span>
      <span className="script">R</span><span className="caps">yan</span>
    </span>);

};


// ============================================================
// NAMES, HANDWRITTEN — hero-only animated version of the lockup.
// Real Amoresa/Cinzel glyph outlines revealed by mask strokes that
// trace each letter's pen path (skeleton-derived centerlines), so the
// names look hand-inked on load. Generated offline from the fonts —
// regenerate rather than hand-edit. Static lockup: <Names />.
// Writing runs ~0.55s..2.1s; reduced-motion shows instantly.
// ============================================================
const NAMES_WRITTEN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10.0 -187.0 1156.7 252.6" role="img" aria-label="Katie and Ryan" style="display:block;width:100%;height:auto"><style>@keyframes hwpen{to{stroke-dashoffset:0}}@keyframes hwcatch{from{opacity:0}to{opacity:1}}.hw-pen{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round}.hw-catch{opacity:0}.hw-p0{stroke-dasharray:541;stroke-dashoffset:541;animation:hwpen 131ms linear 550ms both}.hw-p1{stroke-dasharray:255;stroke-dashoffset:255;animation:hwpen 62ms linear 689ms both}.hw-p2{stroke-dasharray:128;stroke-dashoffset:128;animation:hwpen 31ms linear 759ms both}.hw-p3{stroke-dasharray:205;stroke-dashoffset:205;animation:hwpen 50ms linear 798ms both}.hw-p4{stroke-dasharray:33;stroke-dashoffset:33;animation:hwpen 8ms linear 870ms both}.hw-p5{stroke-dasharray:42;stroke-dashoffset:42;animation:hwpen 10ms linear 886ms both}.hw-p6{stroke-dasharray:40;stroke-dashoffset:40;animation:hwpen 9ms linear 903ms both}.hw-p7{stroke-dasharray:28;stroke-dashoffset:28;animation:hwpen 6ms linear 921ms both}.hw-p8{stroke-dasharray:28;stroke-dashoffset:28;animation:hwpen 6ms linear 935ms both}.hw-p9{stroke-dasharray:66;stroke-dashoffset:66;animation:hwpen 16ms linear 964ms both}.hw-p10{stroke-dasharray:33;stroke-dashoffset:33;animation:hwpen 8ms linear 988ms both}.hw-p11{stroke-dasharray:30;stroke-dashoffset:30;animation:hwpen 7ms linear 1003ms both}.hw-p12{stroke-dasharray:66;stroke-dashoffset:66;animation:hwpen 16ms linear 1033ms both}.hw-p13{stroke-dasharray:47;stroke-dashoffset:47;animation:hwpen 11ms linear 1072ms both}.hw-p14{stroke-dasharray:66;stroke-dashoffset:66;animation:hwpen 16ms linear 1090ms both}.hw-p15{stroke-dasharray:34;stroke-dashoffset:34;animation:hwpen 8ms linear 1114ms both}.hw-p16{stroke-dasharray:26;stroke-dashoffset:26;animation:hwpen 6ms linear 1130ms both}.hw-p17{stroke-dasharray:116;stroke-dashoffset:116;animation:hwpen 28ms linear 1209ms both}.hw-p18{stroke-dasharray:74;stroke-dashoffset:74;animation:hwpen 17ms linear 1245ms both}.hw-p19{stroke-dasharray:168;stroke-dashoffset:168;animation:hwpen 41ms linear 1270ms both}.hw-p20{stroke-dasharray:141;stroke-dashoffset:141;animation:hwpen 34ms linear 1319ms both}.hw-p21{stroke-dasharray:133;stroke-dashoffset:133;animation:hwpen 32ms linear 1360ms both}.hw-p22{stroke-dasharray:446;stroke-dashoffset:446;animation:hwpen 108ms linear 1465ms both}.hw-p23{stroke-dasharray:360;stroke-dashoffset:360;animation:hwpen 87ms linear 1582ms both}.hw-p24{stroke-dasharray:182;stroke-dashoffset:182;animation:hwpen 44ms linear 1677ms both}.hw-p25{stroke-dasharray:194;stroke-dashoffset:194;animation:hwpen 47ms linear 1729ms both}.hw-p26{stroke-dasharray:42;stroke-dashoffset:42;animation:hwpen 10ms linear 1799ms both}.hw-p27{stroke-dasharray:57;stroke-dashoffset:57;animation:hwpen 13ms linear 1816ms both}.hw-p28{stroke-dasharray:18;stroke-dashoffset:18;animation:hwpen 4ms linear 1838ms both}.hw-p29{stroke-dasharray:31;stroke-dashoffset:31;animation:hwpen 7ms linear 1850ms both}.hw-p30{stroke-dasharray:33;stroke-dashoffset:33;animation:hwpen 8ms linear 1880ms both}.hw-p31{stroke-dasharray:42;stroke-dashoffset:42;animation:hwpen 10ms linear 1895ms both}.hw-p32{stroke-dasharray:40;stroke-dashoffset:40;animation:hwpen 9ms linear 1913ms both}.hw-p33{stroke-dasharray:28;stroke-dashoffset:28;animation:hwpen 6ms linear 1930ms both}.hw-p34{stroke-dasharray:28;stroke-dashoffset:28;animation:hwpen 6ms linear 1945ms both}.hw-p35{stroke-dasharray:60;stroke-dashoffset:60;animation:hwpen 14ms linear 1974ms both}.hw-p36{stroke-dasharray:75;stroke-dashoffset:75;animation:hwpen 18ms linear 1996ms both}.hw-p37{stroke-dasharray:60;stroke-dashoffset:60;animation:hwpen 14ms linear 2022ms both}.hw-c0{animation:hwcatch 120ms linear 847ms both}.hw-c1{animation:hwcatch 120ms linear 941ms both}.hw-c2{animation:hwcatch 120ms linear 1010ms both}.hw-c3{animation:hwcatch 120ms linear 1049ms both}.hw-c4{animation:hwcatch 120ms linear 1136ms both}.hw-c5{animation:hwcatch 120ms linear 1392ms both}.hw-c6{animation:hwcatch 120ms linear 1776ms both}.hw-c7{animation:hwcatch 120ms linear 1857ms both}.hw-c8{animation:hwcatch 120ms linear 1951ms both}.hw-c9{animation:hwcatch 120ms linear 2036ms both}@media (prefers-reduced-motion:reduce){.hw-pen{animation:none;stroke-dasharray:none;stroke-dashoffset:0}.hw-catch{animation:none;opacity:1}}</style><defs><linearGradient id="hwgrad" gradientUnits="userSpaceOnUse" x1="-10" y1="-187" x2="1146" y2="65"><stop offset="0" stop-color="#4A1A2C"/><stop offset="1" stop-color="#A8326B"/></linearGradient><path id="hwg0" d="M312.4 24.9Q313.3 25.3 313.3 26.6Q313.3 27.7 312.9 28Q304.1 40.5 289.9 48Q275.7 55.5 258.8 55.5Q246.7 55.5 234.5 52.1Q222.3 48.7 213.4 44Q204.4 39.4 194.6 32.2Q184.8 25 179.3 19.8Q173.7 14.7 166.5 7.6Q159.2 0.4 157.1 -1.4Q153 -5.6 147.9 -9.1Q138.2 -15.9 128.1 -15.9L125.9 -15.7Q115.9 0 107.5 10.8Q99 21.6 91.8 28Q84.6 34.4 78.6 37.6Q72.5 40.8 66 42Q61.3 43.2 56.3 43.2Q49.6 43.2 44.6 41.5Q39.6 39.7 37.2 37.5Q34.9 35.2 33.5 32.2Q32.1 29.1 31.9 27.6Q31.7 26 31.7 24.5Q31.7 23.6 32.4 22.9Q33.1 22.2 33.9 22.2Q34.8 22.2 35.4 22.9Q36.1 23.6 36.1 24.5Q36.1 24.9 36.1 25.5Q36.2 26.2 36.7 27.7Q37.2 29.2 38 30.7Q38.8 32.1 40.5 33.7Q42.2 35.3 44.4 36.4Q48.4 38.4 53.6 38.4Q56.6 38.4 60 37.4Q67.1 35.5 74.5 29.2Q81.9 22.9 93.7 7.1Q105.4 -8.7 121.6 -35.4Q127.1 -44.5 131.2 -52Q134.9 -57.8 136.3 -60Q146.9 -78.9 153.9 -98.1Q161 -117.3 161 -132.3Q161 -139 159.4 -144.4Q157.7 -149.7 154.2 -154Q150.7 -158.3 144.8 -160.7Q138.9 -163.2 130.7 -163.6H128.6Q116.1 -163.6 101.3 -157.3Q86.5 -150.9 70.8 -138.2Q55 -125.4 42 -108.3Q33.2 -96.2 28 -87.3Q22.2 -77.5 16.2 -59.3L15.9 -58.1Q12 -46.2 12 -36.4Q12 -26.8 15.5 -21.4Q18.9 -15.9 23.4 -14.7Q27.6 -13.5 31.9 -13.5Q39 -13.5 45.2 -16.7Q51.4 -20 59.1 -26.6Q68.5 -34.5 76.2 -45.7Q83.8 -56.9 88.9 -68.8Q91.1 -74 92.6 -80.1Q94.2 -86.1 94.6 -89.6L95 -93.1Q95 -99.2 100.1 -99.2Q103.7 -99 103.7 -94.7Q103.7 -93.3 103.2 -91.5Q101.5 -84.9 98.2 -77Q94.8 -69 92.3 -64.4L89.8 -59.8Q78 -36.6 62 -23.1Q44.4 -8.7 28.2 -8.7H27.1Q26.5 -8.7 25.1 -8.8Q23.8 -8.9 23.4 -8.9Q9.1 -10.2 3.7 -21.2Q0 -28.5 0 -39.2V-40.6Q0 -41.4 0.1 -42.7Q0.3 -44 0.9 -48.4Q1.6 -52.8 2.6 -57.4Q3.7 -62 5.9 -68.8Q8 -75.6 10.8 -82.2Q13.6 -88.9 18.1 -96.9Q22.6 -104.8 28 -112.2Q33.4 -119.6 41.1 -127.6Q48.7 -135.6 57.6 -142.6Q75.5 -156.5 93.2 -163.5Q110.9 -170.5 126.2 -170.5Q145.2 -170.5 157.1 -160.4Q168.9 -150.3 170 -132.3Q170.5 -128.3 170.5 -123.9Q170.5 -109.7 164.7 -91.3Q158.9 -72.8 147.5 -52Q147.1 -51 142.6 -43.3Q138.1 -35.6 136.1 -32.6Q133 -27.1 128.8 -20.5Q145.8 -23.4 156.5 -35.8Q167.3 -48.3 199.3 -99.5Q200 -100.6 200.4 -101.2Q219.8 -132.3 242.3 -150.2Q264.8 -168.2 285.9 -168.2Q301.7 -168.2 308.4 -161Q313.2 -156.2 313.4 -147.9Q313.4 -147.8 313.3 -147.5Q313.3 -147.2 313.3 -147.1Q313 -145.5 311.9 -144.5Q310.8 -143.5 309.1 -143.5Q307.8 -143.7 306.9 -145.1Q306.1 -146.4 306.1 -148.3Q306.4 -149.5 306.4 -151.2Q306.4 -158.9 299.2 -161.8Q294.7 -163.5 289.2 -163.5Q286.4 -163.5 283.6 -163.1Q280.7 -162.7 279.2 -162.3L277.7 -161.8Q272.7 -160.1 268 -157.7Q263.3 -155.3 256.3 -149.7Q249.3 -144.2 242 -136.4Q234.8 -128.6 225.1 -115.5Q215.3 -102.5 204.7 -85.5Q190.2 -62 179 -48.3Q167.7 -34.5 158.3 -27.9Q148.8 -21.2 137.6 -18.4Q155 -15.8 179 3.8Q188.8 11.8 194.7 16.3Q200.6 20.8 208.5 26Q216.4 31.2 222.9 34Q229.3 36.8 237.3 39.2Q245.4 41.5 254.5 42.6Q259.8 43.1 264.8 43.1Q279.3 43.1 291.3 38.5Q303.3 33.8 309.4 25.4Q310.3 24.5 311.3 24.5Q311.7 24.5 312.4 24.9Z"/><path id="hwg1" d="M35.9 -71.4 65.5 -0.6H57L33.9 -61.9ZM14.4 -7.3Q13.7 -5.3 14.2 -3.9Q14.7 -2.5 15.9 -1.8Q17 -1 18.2 -1H19.1V0H-1V-1Q-1 -1 -0.6 -1Q-0.1 -1 -0.1 -1Q2.2 -1 4.7 -2.5Q7.1 -3.9 8.7 -7.3ZM35.9 -71.4 36.8 -64.4 11.7 -0.3H5.7L31.3 -61.1Q31.3 -61.1 31.9 -62.4Q32.4 -63.6 33.1 -65.4Q33.9 -67.2 34.5 -68.9Q35 -70.6 35 -71.4ZM50 -27.3V-24.3H18.7V-27.3ZM54.5 -7.3H62.7Q64.2 -3.9 66.7 -2.5Q69.2 -1 71.5 -1Q71.5 -1 71.9 -1Q72.3 -1 72.3 -1V0H49.8V-1H50.7Q52.6 -1 54.1 -2.6Q55.6 -4.3 54.5 -7.3Z"/><path id="hwg2" d="M34.2 -69.7V0H27.7V-69.7ZM59.9 -70.1V-67.1H2V-70.1ZM59.9 -67.4V-59.3L58.9 -59.4V-61.1Q58.9 -63.6 57.2 -65.3Q55.4 -67 53 -67.1V-67.4ZM59.9 -71.9V-69L47.7 -70.1Q49.9 -70.1 52.4 -70.4Q54.8 -70.7 56.9 -71.1Q59 -71.5 59.9 -71.9ZM28 -7.3V0H20V-1Q20 -1 20.6 -1Q21.3 -1 21.3 -1Q23.9 -1 25.8 -2.9Q27.6 -4.7 27.7 -7.3ZM33.9 -7.3H34.2Q34.3 -4.7 36.2 -2.9Q38 -1 40.6 -1Q40.6 -1 41.2 -1Q41.9 -1 41.9 -1V0H33.9ZM8.9 -67.4V-67.1Q6.4 -67 4.7 -65.3Q3 -63.6 3 -61.1V-59.4L2 -59.3V-67.4ZM2 -71.9Q3 -71.5 5.1 -71.1Q7.1 -70.7 9.6 -70.4Q12.1 -70.1 14.2 -70.1L2 -69Z"/><path id="hwg3" d="M20.2 -70V0H13.7V-70ZM14 -7.3V0H6V-1Q6 -1 6.7 -1Q7.3 -1 7.3 -1Q9.9 -1 11.8 -2.9Q13.6 -4.7 13.7 -7.3ZM14 -62.7H13.7Q13.6 -65.3 11.8 -67.2Q9.9 -69 7.3 -69Q7.3 -69 6.7 -69Q6 -69 6 -69V-70H14ZM19.9 -7.3H20.2Q20.3 -4.7 22.1 -2.9Q24 -1 26.6 -1Q26.6 -1 27.2 -1Q27.8 -1 27.9 -1V0H19.9ZM19.9 -62.7V-70H27.9V-69Q27.8 -69 27.2 -69Q26.6 -69 26.6 -69Q24 -69 22.1 -67.2Q20.3 -65.3 20.2 -62.7Z"/><path id="hwg4" d="M20.2 -70V0H13.7V-70ZM47.2 -3.1V0H19.9V-3.1ZM42.9 -36V-33H19.9V-36ZM47.2 -70V-66.9H19.9V-70ZM53.3 -16.2 47.5 0H30.9L34.5 -3.1Q39.8 -3.1 43.2 -4.8Q46.5 -6.4 48.6 -9.4Q50.7 -12.4 52.3 -16.2ZM42.9 -33.2V-26.6H41.9V-28.1Q41.9 -30.1 40.5 -31.6Q39.1 -33 37.1 -33V-33.2ZM42.9 -42.4V-35.8H37.1V-36Q39.1 -36.1 40.5 -37.5Q41.9 -39 41.9 -41V-42.4ZM47.2 -67.2V-59.2H46.2V-61Q46.2 -63.4 44.5 -65.2Q42.8 -66.9 40.3 -67V-67.2ZM47.2 -71.8V-68.9L35 -70Q37.2 -70 39.7 -70.3Q42.1 -70.6 44.2 -71Q46.3 -71.4 47.2 -71.8ZM14 -7.3V0H6V-1Q6 -1 6.7 -1Q7.3 -1 7.3 -1Q9.9 -1 11.8 -2.9Q13.6 -4.7 13.7 -7.3ZM14 -62.7H13.7Q13.7 -65.3 11.8 -67.2Q9.9 -69 7.3 -69Q7.3 -69 6.7 -69Q6.1 -69 6.1 -69L6 -70H14Z"/><path id="hwg5" d="M156.3 -90.3Q157.8 -87.2 157.8 -83Q157.8 -79.6 157 -76.3Q153.9 -66.1 144.8 -61Q135.7 -55.8 124.6 -55.6Q142.3 -47.1 142.3 -26.9Q142.3 -20.3 139.6 -13.6Q137 -6.8 131.1 -0.6Q125.3 5.6 117.2 8.7Q110.5 11.5 98.7 11.5Q98.1 11.5 96.9 11.5Q95.6 11.4 95 11.4Q89.4 10.9 82.7 9.2Q76 7.4 71.4 4.5Q65.7 0.9 61.3 -4Q59.8 -1.7 58.1 0.5Q56.3 2.6 53.2 5.4Q50.1 8.2 46.5 10.3Q43 12.5 37.8 14.1Q32.6 15.8 26.7 16.2Q25 16.5 23.1 16.5Q15.3 16.5 9.4 14Q3.5 11.5 0.1 7.3Q-3.3 3.2 -5 -1.8Q-6.7 -6.8 -6.7 -12.4Q-6.7 -12.9 -6.6 -13.8Q-6.5 -14.8 -6.5 -15.2Q-5.9 -22.6 -2.6 -29.7Q0.8 -36.7 5.5 -42.3Q10.3 -47.9 17.3 -53.6Q24.4 -59.3 30.9 -63.4Q37.3 -67.6 45.7 -72.3Q46.9 -79.6 49.4 -85.9Q51.9 -92.2 54.3 -96.1Q56.8 -100.1 60.1 -103.5Q63.3 -107 65.1 -108.3Q66.9 -109.7 69 -111.1Q75 -115.2 82.8 -115.2Q87.4 -115.2 89.8 -113.7Q93.7 -111.7 94.3 -107.1Q94.7 -106.4 94.7 -105.9Q94.7 -101.9 92.7 -98Q90.7 -94.2 87.8 -91.1Q84.9 -88 79.6 -84.3Q74.3 -80.7 69.9 -78.1Q65.5 -75.5 58.4 -71.6Q57.8 -63.6 57.8 -57.9Q57.8 -51.6 58.1 -48.3Q61 -11.6 82.1 0.2Q92.5 6.2 101 6.2Q106 6.2 110.6 4.2Q117.3 1.5 122.1 -4Q127 -9.5 129.2 -15.5Q131.3 -21.5 131.4 -27.5Q131.4 -27.9 131.5 -28.8Q131.6 -29.7 131.6 -30.2Q131.6 -30.8 131.5 -31.9Q131.4 -33 131.4 -33.8Q130.9 -39.4 128.7 -43.6Q126.6 -47.8 124.1 -49.9Q121.7 -52 118.3 -53.2Q115 -54.5 113.4 -54.8Q111.9 -55 110.2 -55.1Q101.7 -54.9 95.4 -49.9Q89.2 -44.9 89.2 -38.1Q89.2 -36 89.9 -33.7Q90.6 -31.4 92.9 -29.1Q95.3 -26.9 98.9 -26.9Q100.4 -26.9 102.2 -27.5Q102.9 -27.9 103.2 -27.9Q104.6 -27.9 105.2 -26.6Q105.4 -26.2 105.4 -25.7Q105.4 -24.2 104.2 -23.6Q101.7 -22.2 98.9 -22.2Q95.3 -22.3 92.4 -23.6Q89.6 -25 87.9 -26.8Q86.2 -28.7 85.1 -31.2Q84 -33.7 83.6 -35.8Q83.1 -38 83.1 -40.1V-41.1Q83.4 -47.1 87.1 -52.6Q90.8 -58.1 95.7 -60.6Q101.5 -63.7 107.8 -64.9Q114.1 -66.2 118.6 -66.1Q123.2 -66 128.7 -66.4Q134.2 -66.7 138.3 -68.1Q145.2 -70.6 149.2 -75.4Q153.1 -80.2 153.1 -84.9Q153.1 -86.6 152.6 -87.8L151.8 -89.2Q150.2 -91.4 148.1 -91.7Q147.3 -91.9 146.7 -92.6Q146.1 -93.3 146.1 -94.3Q146.4 -96 148.6 -96Q153.6 -95.5 156.3 -90.3ZM75.3 -107.2Q73.6 -106 71.8 -104.2Q70 -102.5 67.6 -99.3Q65.3 -96.1 63.2 -91Q61.1 -86 59.8 -79.8Q65.4 -82.8 68.8 -84.7Q72.2 -86.6 76.6 -89.4Q81 -92.2 83.5 -94.4Q86 -96.6 87.9 -99.4Q89.9 -102.1 90.1 -104.7Q90.1 -104.8 90.1 -105.1Q90 -105.3 90 -105.4Q90 -108.6 87.7 -109.9Q86 -110.7 84.3 -110.7Q81 -110.7 75.3 -107.2ZM21 8Q25.3 9.5 29.4 9.5Q34.4 9.5 39.1 7.6Q43.9 5.6 47.7 2.5Q51.4 -0.7 53.7 -3Q56 -5.4 57.9 -8Q45.8 -26.2 44.8 -49.7L44.4 -57.8Q44.4 -58.9 44.5 -60.8Q44.6 -62.7 44.6 -63.7Q9.9 -41.8 6.8 -16.5Q6.7 -15.3 6.7 -12.8Q6.7 3.1 21 8Z"/><path id="hwg6" d="M307.1 24.9Q308 25.3 308 26.6Q308 27.7 307.6 28Q298.7 40.6 284.6 48.1Q270.4 55.6 253.4 55.6Q242.9 55.6 232.7 53.3Q222.4 51 213.6 46.7Q204.7 42.5 197.1 37.8Q189.5 33.1 182.3 26.9Q175 20.8 170.1 16.2Q165.2 11.7 159.7 6.2Q154.2 0.7 151.9 -1.4Q147.4 -5.5 143 -8.1Q138.6 -10.7 136.5 -11.4Q134.4 -12.1 133 -12.2Q132.2 -12.2 131.5 -12.8Q130.8 -13.3 130.7 -14.4Q130.7 -15.1 131.2 -15.9Q131.8 -16.7 132.6 -16.7Q134.2 -17 136.7 -17.6Q139.2 -18.3 144.9 -20.5Q150.6 -22.6 156.2 -25.7Q161.9 -28.7 169.4 -34.1Q176.8 -39.5 183.3 -46.1Q189.9 -52.7 196.7 -62.7Q203.5 -72.6 208.6 -84.2Q218.9 -107.7 218.9 -125.4Q218.9 -139.5 212.3 -150Q198.3 -139.3 186.8 -124.5Q175.3 -109.8 163 -89.2Q156.2 -77.8 151.8 -69.8Q133.6 -37.6 119.9 -16.4Q106.3 4.9 95.5 17.2Q84.8 29.5 76.6 34.9Q68.5 40.4 59.8 42Q55.4 43.4 50.2 43.4Q45.3 43.4 41.3 42.5Q37.3 41.5 34.8 40.2Q32.3 38.8 30.5 36.8Q28.6 34.9 27.7 33.2Q26.7 31.4 26.2 29.5Q25.7 27.5 25.6 26.5Q25.5 25.5 25.5 24.5Q25.5 23.6 26.2 22.9Q26.8 22.2 27.9 22.2Q28.7 22.2 29.3 22.9Q29.9 23.6 29.9 24.5Q29.9 24.9 30 25.5Q30.1 26.2 30.6 27.7Q31.1 29.2 31.9 30.7Q32.7 32.1 34.4 33.7Q36.1 35.3 38.4 36.4Q42.3 38.4 47.3 38.4Q50.5 38.4 53.9 37.4Q61 35.5 68.4 29.2Q75.9 22.9 87.6 7.1Q99.4 -8.7 115.5 -35.4Q119.8 -42.4 131 -61.7Q142.2 -81.1 143.8 -84Q145.5 -87.2 148.4 -92Q151.3 -96.7 157.4 -106Q163.5 -115.2 172.1 -125.3Q180.7 -135.4 189.7 -143.3Q197.9 -150.5 207 -156.1Q199.4 -163.5 187.5 -167.6Q175.7 -171.7 161.8 -171.7Q145.4 -171.7 129.3 -167.1Q113.1 -162.6 100.6 -155.7Q88 -148.8 76.5 -139.6Q65 -130.4 57.3 -122.1Q49.6 -113.7 43.8 -105.4Q37.4 -96.4 32 -87.2Q26.7 -78 24.4 -73.3L22.2 -68.6L17.7 -56.7Q16.3 -52.9 16.1 -51.6Q12.8 -40.7 12.8 -31.2Q12.8 -22 15.9 -15.7Q18.5 -10.2 24.7 -8Q27.5 -7.3 31.2 -7.3Q44.9 -7.3 59.5 -20.3Q68.8 -28.5 76.2 -39.9Q83.7 -51.3 88.4 -63.1Q90.4 -68.5 91.8 -74.7Q93.1 -80.8 93.5 -84.3L93.8 -87.8V-88.7Q94.4 -94 98.7 -94Q102.5 -93.7 102.5 -88.9V-87.8Q102.5 -87.3 102.2 -86.3Q100.7 -79.8 97.5 -71.8Q94.3 -63.7 91.9 -59L89.5 -54.3Q78.5 -31.1 62.5 -17Q45.3 -1.7 28 -1.7Q26.2 -1.7 24.2 -2Q9.8 -2.7 4.2 -13.5Q0.3 -21.4 0 -32.9V-35.2Q0 -38.7 0.4 -42.9Q0.8 -47 2.6 -55Q4.4 -63 7.5 -71.1Q10.5 -79.3 16.6 -90.3Q22.6 -101.3 30.8 -111.9Q32.1 -113.8 34.4 -116.8Q36.7 -119.7 43.1 -126.4Q49.4 -133 56.6 -139.2Q63.7 -145.3 74.9 -152.5Q86 -159.6 97.9 -164.8Q109.8 -170 125.5 -173.5Q141.2 -177 157.7 -177Q162.6 -177 169.6 -176.4Q200 -174.3 214.4 -160.1Q229.5 -167.7 242.2 -168.3H244Q257.5 -168.3 264.6 -161.2Q269.3 -156.5 269.5 -148.1V-147.3Q269.3 -145.6 268.1 -144.6Q266.9 -143.6 265.1 -143.6Q263.9 -143.9 263.1 -145.1Q262.3 -146.2 262.3 -147.7V-148.4Q262.7 -149.7 262.7 -151.4Q262.7 -158.9 255.5 -161.8Q250.5 -163.6 245.2 -163.6Q242.3 -163.6 239.5 -163.3Q236.7 -162.9 235.2 -162.4L233.8 -162Q226.4 -159.5 219.3 -154.8L221.4 -151.9Q231.6 -137 231.6 -118.3Q231.6 -102.5 223.6 -83.7Q219.4 -74 213.8 -65.4Q208.2 -56.7 202.3 -50.4Q196.5 -44 189.8 -38.5Q183 -33.1 177.1 -29.4Q171.1 -25.6 164.7 -22.6Q158.3 -19.5 153.5 -17.7Q148.8 -16 144.1 -14.7Q155.9 -10.7 173.8 3.8Q183.6 11.8 189.4 16.3Q195.3 20.8 203.2 26Q211.1 31.3 217.5 34.1Q223.9 37 232 39.3Q240.1 41.7 249.2 42.7Q254.2 43.2 259 43.2Q273.7 43.2 285.8 38.6Q298 33.9 304.1 25.4Q305 24.5 306.1 24.5Q306.4 24.5 307.1 24.9Z"/><path id="hwg7" d="M15 -69.9 34.6 -33.4 30.3 -29.9 6.4 -69.9ZM36 -32.2V0H29.5V-32.2ZM53.8 -69.9H59.9L35.3 -30.1L31.7 -31.2ZM49.7 -62.8Q50.6 -64.2 50.2 -65.7Q49.8 -67.1 48.7 -68.1Q47.6 -69 46.2 -69Q46.2 -69 45.6 -69Q45 -69 45 -69V-70H67.2V-69H65.8Q62.7 -69 60 -67.2Q57.3 -65.4 55.7 -63.1ZM18.8 -62.8 10.4 -63.1Q9 -65.4 6.3 -67.2Q3.6 -69 0.4 -69H-1V-70H23.6V-69Q23.6 -69 23 -69Q22.3 -69 22.3 -69Q20.1 -69 19 -67Q17.8 -64.9 18.8 -62.8ZM29.7 -7.3V0H21.8V-1Q21.8 -1 22.4 -1Q23 -1 23.1 -1Q25.7 -1 27.6 -2.9Q29.4 -4.7 29.5 -7.3ZM35.7 -7.3H36Q36 -4.7 37.9 -2.9Q39.8 -1 42.4 -1Q42.4 -1 43 -1Q43.6 -1 43.6 -1V0H35.7Z"/><path id="hwg8" d="M12.6 -71.5 70.7 -9.5 71.6 1.4 13.5 -60.5ZM12.8 -7.1V0H4.5V-1Q4.5 -1 5.4 -1Q6.3 -1 6.4 -1Q8.9 -1 10.7 -2.8Q12.5 -4.6 12.5 -7.1ZM17.1 -7.1Q17.1 -4.6 18.9 -2.8Q20.7 -1 23.2 -1Q23.3 -1 24.2 -1Q25.1 -1 25.1 -1V0H16.8V-7.1ZM12.6 -71.5 17 -65.9 17.1 0H12.5V-59Q12.5 -64.1 12.1 -67.8Q11.6 -71.5 11.6 -71.5ZM71.6 -70V-11.4Q71.6 -8.2 71.8 -5.3Q72 -2.3 72.2 -0.5Q72.5 1.4 72.5 1.4H71.6L67.1 -3.9V-70ZM79.6 -70V-69Q79.6 -69 78.7 -69Q77.8 -69 77.8 -69Q75.3 -69 73.5 -67.2Q71.7 -65.5 71.6 -62.9H71.3V-70ZM59 -70H67.3V-62.9H67.1Q67 -65.5 65.2 -67.2Q63.5 -69 60.9 -69Q60.9 -69 60 -69Q59.1 -69 59 -69Z"/></defs><mask id="hwmask" maskUnits="userSpaceOnUse" x="-10.0" y="-187.0" width="1156.7" height="252.6"><rect x="-10.0" y="-187.0" width="1156.7" height="252.6" fill="#000"/><path class="hw-pen hw-p0" d="M99.7 -94.8L92.5 -71.1L82.2 -51.1L70.7 -35.1L55.1 -20.5L43.1 -13.7L35.1 -11.6L27.1 -11.1L19.1 -12.7L15.1 -15L9.1 -22.6L6.8 -30.6L6 -38.6L7.4 -50.6L10.4 -62.6L20 -86.6L29.5 -102.6L38.3 -114.6L49.1 -126.6L61.1 -137.8L81.1 -152.1L93.1 -158.5L105.1 -163.2L117.1 -166.1L129.1 -166.8L145.1 -163.8L153.1 -159.3L157.1 -155.6L160 -151.6L163.4 -143.6L165.2 -131.6L165.5 -123.6L163.9 -111.6L156.7 -87.6L146 -63.6L123.2 -23.6L124.6 -19.9L128.6 -18.1L135 -18.3" stroke-width="14.5"/><path class="hw-pen hw-p1" d="M309.5 -147.1L308.6 -155.2L305.7 -160.2L300.8 -163.5L292.4 -165.5L282.4 -165.5L274.1 -163.8L262.4 -158.8L252.4 -152.2L237.4 -139.1L222.8 -122.4L206.1 -99.1L184.8 -65.7L164.7 -39.1L151.9 -27.2L136.9 -20.4L134.8 -18.3" stroke-width="12.9"/><path class="hw-pen hw-p2" d="M122.8 -21.8L120.2 -19.9L105.8 1.8L94.2 16.8L81.8 29.6L73.4 35.6L60.1 40.4L47.6 40L43.4 38.7L38.4 35.3L35.4 31.1L33.8 24.9" stroke-width="14.7"/><path class="hw-pen hw-p3" d="M134.8 -18.3L136.8 -16.5L147.4 -12.8L156.8 -7L186.1 17.7L207.4 33.1L218.1 39.1L235.4 45.5L255.4 49L276.8 47.3L288.8 43.7L296.8 39.7L304.8 33.9L311.2 26.9" stroke-width="13.9"/><path class="hw-pen hw-p4" d="M228.5 -26.7L256.9 -26.1L258.7 -27.6" stroke-width="5.1"/><path class="hw-pen hw-p5" d="M244.5 -62.2L241.4 -60L228.7 -26.7" stroke-width="5.6"/><path class="hw-pen hw-p6" d="M244.4 -62.4L246.1 -60.7L258.5 -27.6" stroke-width="7.5"/><path class="hw-pen hw-p7" d="M228.7 -26.9L221.4 -10.8L219.5 -3.1" stroke-width="6.5"/><path class="hw-pen hw-p8" d="M258.5 -27.7L265.9 -10.7L267.4 -3.9" stroke-width="8.3"/><path class="hw-pen hw-p9" d="M307.7 -67.2L307.7 -3.4" stroke-width="7.5"/><path class="hw-pen hw-p10" d="M307.7 -67.1L310 -68.9L334.1 -68.9L336.4 -71.7" stroke-width="5.3"/><path class="hw-pen hw-p11" d="M280.9 -68.9L305.5 -68.9L307.7 -67.1" stroke-width="5.4"/><path class="hw-pen hw-p12" d="M359.5 -67L359.5 -3.3" stroke-width="7.6"/><path class="hw-pen hw-p13" d="M397.2 -3.3L399.6 -1.6L425.2 -2.3L429 -7L433.3 -16.1" stroke-width="5.5"/><path class="hw-pen hw-p14" d="M397.3 -67L397.3 -3.3" stroke-width="7.5"/><path class="hw-pen hw-p15" d="M397.3 -66.8L399.4 -68.6L425.3 -68.7L427.3 -71.5" stroke-width="5.2"/><path class="hw-pen hw-p16" d="M397.3 -34.6L421.3 -34.6" stroke-width="5.6"/><path class="hw-pen hw-p17" d="M552.2 -78L554 -76.3L560.6 -77.7L575.6 -86.5L585.6 -94.8L589 -99.8L590.2 -103.9L589.1 -109.8L584.3 -112.7L577.6 -112.5L570.1 -109L563.6 -103.3L557.2 -94.1L553.9 -86.6L552.2 -77.9" stroke-width="11.6"/><path class="hw-pen hw-p18" d="M552.2 -78L549.2 -65.1L549.9 -44.3L553.6 -26.8L560.9 -8.9" stroke-width="14.2"/><path class="hw-pen hw-p19" d="M549.2 -65L546.1 -67.5L539.1 -65.6L522.8 -54.2L510.4 -42.3L503.3 -31.8L500 -23.6L498.4 -13.1L499.2 -6.1L502.2 2.1L507.3 7.7L516.6 11.9L526 12.5L536.5 10.8L543.5 7.5L551.6 1.1L560.9 -9" stroke-width="13.3"/><path class="hw-pen hw-p20" d="M560.9 -9L575.5 2.6L585.5 6.8L592.5 8.4L608.5 7.6L616.5 4.2L622.5 -0.1L631.2 -11.9L633.8 -19.9L634.8 -27.9L633.5 -37.9L631.1 -43.9L627.5 -48.9L620.7 -54.6L617.4 -60.4" stroke-width="11.3"/><path class="hw-pen hw-p21" d="M601 -25.7L596.5 -24.7L592.5 -25.5L589.5 -27.1L586.2 -31.1L584.4 -42.1L587.3 -49.1L593.6 -55.4L600.6 -58.5L633.5 -62.5L645.5 -68L651.7 -75.8L653.5 -81.8L652.2 -89.8L646.9 -94" stroke-width="11.2"/><path class="hw-pen hw-p22" d="M792.1 -89.8L785.8 -66.7L775.2 -44.5L761.3 -25.5L745.6 -11.9L736.2 -7.1L729.8 -5.4L720.3 -4.7L714 -5.7L707.6 -9.4L704.9 -12.5L700.6 -25.2L700.1 -37.9L702.7 -53.7L710.8 -75.9L721.4 -94.9L734.8 -113.9L749 -129.6L764.8 -143.1L780.6 -153.8L799.6 -163.4L815.5 -168.9L834.5 -173L850.3 -174.3L869.3 -173.1L885.2 -169.4L897.8 -163.1L905.4 -155" stroke-width="15.3"/><path class="hw-pen hw-p23" d="M959.1 -147.3L958.7 -154L956.5 -159L951.6 -163L941.6 -165.7L931.6 -165.4L921.6 -162.8L911.6 -158.2L899.6 -150.6L882.4 -135.4L863.8 -112.9L847.5 -87.9L806.2 -17.9L790.9 4.6L774.2 24.6L767 31.3L759.5 36.2L749.5 40L742 40.9L734.5 40L727 36.4L722.9 31.5L721.4 24.2" stroke-width="14.7"/><path class="hw-pen hw-p24" d="M907.6 -155L915.5 -139.4L917.1 -132.7L918.4 -116.7L913.5 -94L906.7 -78L894.3 -58L877.5 -40L860.2 -27.7L848.2 -21.4L836.2 -16.9L834.4 -14.3" stroke-width="14.7"/><path class="hw-pen hw-p25" d="M834.2 -14.5L835.6 -12.3L849 -4.1L873 16.5L891.6 30.7L909 40.4L926.3 46.5L946.3 49.3L959.6 48.3L970.3 46.1L979.6 42.5L989 37.1L999.4 26.7" stroke-width="14.1"/><path class="hw-pen hw-p26" d="M936.3 -66.5L938 -60.2L954.5 -31.8" stroke-width="7.8"/><path class="hw-pen hw-p27" d="M988.5 -69.8L983 -69.5L975.1 -67.1L973.9 -62.6L968.6 -53.2L957.3 -34.2L954.5 -31.8" stroke-width="6.2"/><path class="hw-pen hw-p28" d="M921 -69.7L927.9 -69.3L936.3 -66.3" stroke-width="7.7"/><path class="hw-pen hw-p29" d="M954.5 -32L954.5 -3.3" stroke-width="7.6"/><path class="hw-pen hw-p30" d="M1001.7 -26.7L1030.1 -26.1L1031.9 -27.6" stroke-width="5.1"/><path class="hw-pen hw-p31" d="M1017.7 -62.2L1014.6 -60L1001.9 -26.7" stroke-width="5.6"/><path class="hw-pen hw-p32" d="M1017.6 -62.4L1019.3 -60.7L1031.7 -27.6" stroke-width="7.5"/><path class="hw-pen hw-p33" d="M1001.9 -26.9L994.6 -10.8L992.7 -3.1" stroke-width="6.5"/><path class="hw-pen hw-p34" d="M1031.7 -27.7L1039.1 -10.7L1040.6 -3.9" stroke-width="8.3"/><path class="hw-pen hw-p35" d="M1073.1 -60.5L1071.8 -58.9L1071.8 -2.7" stroke-width="5.5"/><path class="hw-pen hw-p36" d="M1072.9 -60.3L1076.7 -59.1L1121.3 -11.4L1125.1 -10" stroke-width="7.7"/><path class="hw-pen hw-p37" d="M1126.4 -67.7L1126.3 -12.1L1124.9 -10" stroke-width="5.8"/><use href="#hwg0" class="hw-catch hw-c0" fill="#fff" transform="translate(0.0 0)"/><use href="#hwg1" class="hw-catch hw-c1" fill="#fff" transform="translate(208.7 0)"/><use href="#hwg2" class="hw-catch hw-c2" fill="#fff" transform="translate(276.9 0)"/><use href="#hwg3" class="hw-catch hw-c3" fill="#fff" transform="translate(342.7 0)"/><use href="#hwg4" class="hw-catch hw-c4" fill="#fff" transform="translate(380.5 0)"/><use href="#hwg5" class="hw-catch hw-c5" fill="#fff" transform="translate(498.2 0)"/><use href="#hwg6" class="hw-catch hw-c6" fill="#fff" transform="translate(693.4 0)"/><use href="#hwg7" class="hw-catch hw-c7" fill="#fff" transform="translate(921.8 0)"/><use href="#hwg1" class="hw-catch hw-c8" fill="#fff" transform="translate(981.9 0)"/><use href="#hwg8" class="hw-catch hw-c9" fill="#fff" transform="translate(1057.1 0)"/></mask><g mask="url(#hwmask)"><use href="#hwg0" fill="url(#hwgrad)" transform="translate(0.0 0)"/><use href="#hwg1" fill="url(#hwgrad)" transform="translate(208.7 0)"/><use href="#hwg2" fill="url(#hwgrad)" transform="translate(276.9 0)"/><use href="#hwg3" fill="url(#hwgrad)" transform="translate(342.7 0)"/><use href="#hwg4" fill="url(#hwgrad)" transform="translate(380.5 0)"/><use href="#hwg5" fill="url(#hwgrad)" transform="translate(498.2 0)"/><use href="#hwg6" fill="url(#hwgrad)" transform="translate(693.4 0)"/><use href="#hwg7" fill="url(#hwgrad)" transform="translate(921.8 0)"/><use href="#hwg1" fill="url(#hwgrad)" transform="translate(981.9 0)"/><use href="#hwg8" fill="url(#hwgrad)" transform="translate(1057.1 0)"/></g></svg>';
const NamesWritten = () => (
  <span
    style={{
      display: 'block',
      width: 'calc(clamp(28px, 4.4vw, 60px) * 11.57)',
      maxWidth: '100%',
      // the svg box includes swash overshoot; pull margins in so the
      // hero rhythm matches the old 1.4 line-height text block
      margin: '-0.75em auto -0.35em'
    }}
    dangerouslySetInnerHTML={{ __html: NAMES_WRITTEN_SVG }} />
);

// ============================================================
// REVEAL — scroll-triggered entrance. Children fade/drift in the
// first time they enter the viewport. Honours reduced-motion.
//   from: 'up' (default) | 'left' | 'right'
// ============================================================
const Reveal = ({ children, delay = 0, from = 'up', style }) => {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = { up: 'translateY(28px)', left: 'translateX(-36px)', right: 'translateX(36px)' }[from];
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : hidden,
      transition: `opacity 0.9s ease ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      ...style
    }}>{children}</div>
  );
};

// ============================================================
// NAV — minimal, top-fixed, dot-separated, fades in on scroll
// ============================================================
const Nav = ({ active }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'day',     label: 'The day' },
    { id: 'venue',   label: 'Venue' },
    { id: 'travel',  label: 'Travel' },
    { id: 'party',   label: 'Party' },
    { id: 'details', label: 'Details' },
    { id: 'faqs',    label: 'FAQs' },
    { id: 'rsvp',    label: 'RSVP' },
  ];

  const go = (id) => (e) => {
    e.preventDefault(); setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,237,228,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(1.05)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.05)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule-soft)' : '1px solid transparent',
      transition: 'all 0.35s ease', padding: '16px 28px'
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
        position: 'relative'
      }}>
        <ul className="nav-desktop" style={{
          display: 'flex', alignItems: 'center', gap: 0, listStyle: 'none', margin: 0, padding: 0
        }}>
          {links.map((l, i) =>
            <li key={l.id} style={{ display: 'flex', alignItems: 'center' }}>
              <a href={`#${l.id}`} onClick={go(l.id)} style={{
                textDecoration: 'none', padding: '6px 14px',
                color: active === l.id ? 'var(--burgundy)' : 'var(--ink)',
                fontSize: 13, fontWeight: 400, letterSpacing: '0.02em',
                fontFamily: "'Cinzel', Georgia, serif",
                fontStyle: active === l.id ? 'italic' : 'normal',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap'
              }}>{l.label}</a>
              {i < links.length - 1 &&
                <span style={{ width: 3, height: 3, background: 'var(--ink-mute)', opacity: 0.4, borderRadius: '50%' }} />
              }
            </li>
          )}
        </ul>

        <button onClick={() => setMobileOpen(true)} className="nav-mobile-toggle" aria-label="Menu" style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          display: 'none', color: 'var(--ink)',
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'
        }}>
          <svg width="20" height="14" viewBox="0 0 20 14"><line x1="0" y1="3" x2="20" y2="3" stroke="currentColor" /><line x1="0" y1="11" x2="20" y2="11" stroke="currentColor" /></svg>
        </button>
      </div>

      {mobileOpen &&
        <div style={{
          position: 'fixed', inset: 0, background: 'var(--cream)', zIndex: 60,
          display: 'flex', flexDirection: 'column', padding: '24px 28px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--ink)' }}>
              <Names size={20} />
            </span>
            <button onClick={() => setMobileOpen(false)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Cinzel', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink)'
            }}>Close</button>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map((l) =>
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="serif" style={{
                  textDecoration: 'none', color: 'var(--ink)', fontSize: 30, fontStyle: 'italic', fontWeight: 300
                }}>{l.label}</a>
              </li>
            )}
          </ul>
        </div>
      }

      <style>{`
        @media (max-width: 980px){
          .nav-desktop{ display:none !important; }
          .nav-mobile-toggle{ display:block !important; }
          .nav-guest{ display:none !important; }
        }
      `}</style>
    </nav>
  );
};

// ============================================================
// COMMON
// ============================================================
const useCountdown = (iso) => {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(iso) - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff % 86400000 / 3600000),
    minutes: Math.floor(diff % 3600000 / 60000),
    seconds: Math.floor(diff % 60000 / 1000),
    total: diff
  };
};

// Build a downloadable .ics calendar invite.
const WEDDING_ICS = [
'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ryan and Katie//Wedding//EN',
'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
'BEGIN:VEVENT',
'UID:rk-wedding-02jul2027@katieandryan.co.uk',
'DTSTAMP:20260514T000000Z',
'DTSTART:20270702T120000Z', 'DTEND:20270702T230000Z',
'SUMMARY:Katie & Ryan\u2019s Wedding',
'LOCATION:St Audries Park\\, West Quantoxhead\\, Somerset TA4 4DS',
'DESCRIPTION:The wedding of Katie & Ryan. Black tie. Full details at katieandryan.co.uk',
'STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT', 'END:VCALENDAR'].
join('\r\n');

const downloadIcs = () => {
  try {
    const blob = new Blob([WEDDING_ICS], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;a.download = 'ryan-and-katie-02-jul-2027.ics';
    document.body.appendChild(a);a.click();
    setTimeout(() => {document.body.removeChild(a);URL.revokeObjectURL(url);}, 100);
  } catch (e) {console.warn('ics download failed', e);}
};

// Section container — single column, generous padding, centered.
const Section = ({ id, tint = false, narrow = false, children, padTop = 160, padBottom = 160, style = {} }) =>
<section id={id} style={{
  padding: `${padTop}px 24px ${padBottom}px`,
  background: tint ? 'var(--cream-deep)' : 'var(--cream)',
  position: 'relative',
  textAlign: 'center',
  ...style
}}>
    <div style={{ maxWidth: narrow ? 660 : 1000, margin: '0 auto' }}>
      {children}
    </div>
  </section>;


// Section heading — one line, restrained, always centered.
const Heading = ({ children, eyebrow }) =>
<header style={{ marginBottom: 56, textAlign: 'center' }}>
    {eyebrow && <div className="label" style={{ marginBottom: 18 }}>{eyebrow}</div>}
    <h2 className="serif" style={{
    margin: 0,
    fontSize: 'clamp(40px, 5.5vw, 64px)',
    fontWeight: 300, lineHeight: 1.05, color: 'var(--ink)', letterSpacing: '-0.015em'
  }}>{children}</h2>
  </header>;


// ============================================================
// HERO — single big image, names below, date/venue beneath.
// Subtle ken-burns on image, staggered fade-in on the type.
// ============================================================
const Hero = ({ showCountdown = true, onRsvp }) => {
  const { days, hours, minutes, seconds, total } = useCountdown('2027-07-02T13:00:00');

  // Once a guest has entered their invitation code (rsvp.jsx stores it
  // under rk_guest_v1), the hero greets their household by name. Read
  // per-render so it appears as soon as the modal closes.
  let household = null;
  try {
    const g = JSON.parse(localStorage.getItem('rk_guest_v1') || 'null');
    if (g && g.household && g.household !== 'Preview') household = g.household;
  } catch (e) {}

  return (
    <section id="top" style={{
      background: 'var(--cream)', padding: '120px 24px 80px',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: 880, margin: '0 auto', width: '100%', textAlign: 'center'
      }}>
        {/* Personal greeting once we know who's visiting */}
        {household && (
          <div className="serif hero-anim-1" style={{
            fontSize: 'clamp(16px, 2vw, 20px)', fontStyle: 'italic', fontWeight: 400,
            color: 'var(--burgundy)', marginBottom: 22,
          }}>Dear {household},</div>
        )}

        {/* Tiny eyebrow — copy lifted from the invite */}
        <div className="label hero-anim-1" style={{ marginBottom: 96 }}>
          Please join us in celebrating the marriage of
        </div>

        {/* Names — Katie & Ryan, hand-written on load */}
        <h1 style={{
          margin: 0,
          fontSize: 'clamp(28px, 4.4vw, 60px)',
          fontWeight: 300, lineHeight: 1.4, color: 'var(--ink)', letterSpacing: '-0.005em',
          padding: '0 16px'
        }}>
          <NamesWritten />
        </h1>

        {/* Date band — Friday · JUL 02 2027 · 1 o'clock — like the invite */}
        <DateBand className="hero-anim-4" />

        {/* Venue line, caps */}
        <div className="hero-anim-4" style={{
          marginTop: 23,
          fontFamily: 'Cinzel, Georgia, serif',
          fontSize: 'clamp(11px, 1.4vw, 13px)',
          fontWeight: 400, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'var(--ink-soft)', lineHeight: 1.7,
          /* Half the letter-spacing as text-indent compensates for the
             trailing tracking — centres tracked-out caps on the same
             axis as untracked content (the 02 above). */
          textIndent: '0.12em'
        }}>
          St Audries Park, West Quantoxhead<br />
          Taunton, Somerset &nbsp;·&nbsp; TA4 4DS
        </div>

        {/* Countdown */}
        {showCountdown && total > 0 &&
        <div className="hero-anim-5" style={{
          marginTop: 62,
          display: 'inline-flex', alignItems: 'baseline', gap: 18,
          color: 'var(--ink)'
        }}>
            <CdCell n={days} label="days" />
            <CdSep />
            <CdCell n={hours} label="hours" />
            <CdSep />
            <CdCell n={minutes} label="minutes" />
            <CdSep />
            <CdCell n={seconds} label="seconds" />
          </div>
        }
        {showCountdown && total === 0 &&
        <div className="serif hero-anim-5" style={{
          marginTop: 62, fontSize: 18, fontStyle: 'italic', color: 'var(--burgundy)'
        }}>today is the day</div>
        }

        {/* Primary CTA — gets guests straight to the reason they're here. */}
        <div className="hero-anim-6" style={{ marginTop: 48, textAlign: 'center' }}>
          <button
            type="button"
            onClick={onRsvp}
            style={{
              background: 'var(--ink)', color: 'var(--cream)',
              border: 'none', cursor: 'pointer',
              padding: '16px 36px',
              fontFamily: "'Cinzel', Georgia, serif",
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.4em', textTransform: 'uppercase', textIndent: '0.4em',
              transition: 'background 0.3s ease, letter-spacing 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--burgundy)'; e.currentTarget.style.letterSpacing = '0.5em'; e.currentTarget.style.textIndent = '0.5em'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.letterSpacing = '0.4em'; e.currentTarget.style.textIndent = '0.4em'; }}
          >RSVP</button>
        </div>

        {/* Scroll cue — a subtle indicator nudging guests onward */}
        <div className="hero-anim-6" style={{ marginTop: 32, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('day');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
            }}
            className="scroll-cue"
            aria-label="Scroll for more"
            style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              color: 'var(--ink-mute)'
            }}>
            <span style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 10, fontWeight: 400,
              letterSpacing: '0.36em', textTransform: 'uppercase',
              color: 'var(--ink-mute)', opacity: 0.7
            }}>Scroll</span>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true" style={{ opacity: 0.55 }}>
              <line x1="7" y1="0" x2="7" y2="16" stroke="currentColor" strokeWidth="1" />
              <polyline points="1,12 7,18 13,12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1) translate(0, 0); }
          50%  { transform: scale(1.06) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes rise {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes driftIn {
          from { opacity:0; letter-spacing: 0.18em; }
          to   { opacity:0.7; letter-spacing: 0.01em; }
        }
        .hero-kenburns{ animation: kenBurns 22s ease-in-out infinite; }
        .hero-anim-1{ animation: rise 1s ease-out 0.10s both; }
        .hero-anim-2{ animation: rise 1.2s ease-out 0.25s both; }
        .hero-anim-3{ animation: rise 1.0s ease-out 0.55s both; }
        /* The rest of the hero holds back until the names finish writing (~2.1s) */
        .hero-anim-4{ animation: driftIn 1.4s ease-out 1.95s both; }
        .hero-anim-5{ animation: rise 0.9s ease-out 2.25s both; }
        .hero-anim-6{ animation: rise 0.9s ease-out 2.50s both; }
        @keyframes scrollNudge {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50%      { transform: translateY(5px); opacity: 1; }
        }
        .scroll-cue svg{ animation: scrollNudge 2.4s ease-in-out infinite; }
        .scroll-cue:hover svg{ opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hero-kenburns,
          .hero-anim-1, .hero-anim-2, .hero-anim-3,
          .hero-anim-4, .hero-anim-5, .hero-anim-6,
          .scroll-cue svg { animation: none !important; }
        }
      `}</style>
    </section>);

};

const prefersReduce = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One odometer-style rolling digit: a vertical strip of 0-9 that
// translates to the current value, clipped to a one-digit window.
// Cells are 1.3em (not 1em) because Cormorant's figures overshoot the
// em box — the extra padding keeps neighbouring digits from bleeding
// into the visible window.
const ROLL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ROLL_EM = 1.3;
const RollDigit = ({ d }) => (
  <span aria-hidden="true" style={{ display: 'inline-block', height: `${ROLL_EM}em`, overflow: 'hidden', verticalAlign: 'top' }}>
    <span style={{
      display: 'block',
      transform: `translateY(${-d * ROLL_EM}em)`,
      transition: prefersReduce() ? 'none' : 'transform 0.55s cubic-bezier(0.45, 0, 0.2, 1)',
    }}>
      {ROLL_DIGITS.map((n) =>
      <span key={n} style={{ display: 'block', height: `${ROLL_EM}em`, lineHeight: ROLL_EM }}>{n}</span>
      )}
    </span>
  </span>
);

const CdCell = ({ n, label }) =>
<span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <span className="serif" aria-label={String(n).padStart(2, '0')} style={{
    fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 300, lineHeight: 1, color: 'var(--ink)',
    fontVariantNumeric: 'tabular-nums lining-nums', letterSpacing: '-0.01em'
  }}>{String(n).padStart(2, '0').split('').map((c, i) => <RollDigit key={i} d={Number(c)} />)}</span>
    <span style={{
    fontFamily: 'Cinzel', fontSize: 9.5, fontWeight: 400,
    letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)',
    textIndent: '0.12em'
  }}>{label}</span>
  </span>;


const CdSep = () =>
<span style={{
  width: 1, alignSelf: 'stretch', background: 'var(--ink-mute)', opacity: 0.3
}} />;


// Date band — Friday · JUL 02 2027 · 1 o'clock, with hairline rules
// flanking the date. Pulled straight from the invite's date treatment.
// Uses a 3-column grid (1fr auto 1fr) so the JUL/02/2027 column is locked
// to true page-centre regardless of the widths of FRIDAY and 1 O'CLOCK.
const DateBand = ({ className }) =>
<div className={className} style={{
  marginTop: 44,
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  columnGap: 25,
  maxWidth: 720, margin: '44px auto 0',
  color: 'var(--ink)'
}}>
    {/* LEFT cell — Friday, right-aligned toward the date column */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: "0px 3px 0px 0px" }}>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(11px, 1.4vw, 13px)',
      fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      textIndent: '0.32em'
    }}>Friday</span>
    </div>

    {/* CENTRE cell — JUL / 02 / 2027 stacked. This column auto-sizes to
    its content and the surrounding 1fr columns guarantee it sits on
    true page-centre. */}
    <span style={{
    display: 'inline-flex', flexDirection: 'column', alignItems: 'center', rowGap: 14
  }}>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(11px, 1.4vw, 13px)',
      fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      textIndent: '0.32em',
      lineHeight: 0.72
    }}>Jul</span>
      <span className="serif accent-gradient" style={{
      fontWeight: 400,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1, fontSize: "46.5px",
      padding: "0.05em 0.05em",
      display: "inline-block",
      /* Optical centring: Cormorant's figures are ~0.41em tall inside a
         line box sized for its 0.92em ascender, so the glyphs sit ~12px
         low in the stack. Nudge computed from the font's glyph bounds. */
      transform: 'translateY(-0.135em)',
    }}>02</span>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(10px, 1.2vw, 12px)',
      fontWeight: 400, letterSpacing: '0.32em',
      color: 'var(--ink-soft)',
      textIndent: '0.32em',
      lineHeight: 0.72
    }}>2027</span>
    </span>

    {/* RIGHT cell — 1 o'clock, left-aligned toward the date column */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <span style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(11px, 1.4vw, 13px)',
      fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-soft)',
      whiteSpace: 'nowrap',
      textIndent: '0.32em'
    }}>1 o&rsquo;clock</span>
    </div>
  </div>;


// ============================================================
// THE DAY — playful schedule with alternating image / timeline / text rows
// ============================================================
// Each event has a heading (the "We do!" line), a time, a short description,
// and optionally an image filename in /images/schedule/. The component
// alternates which side the image sits on; missing images leave a clean
// empty slot so this works before the SVGs are uploaded.
const SCHEDULE = [
  { heading: 'We do!',     time: '1:00 pm',  desc: 'Vows in the orangery at St Audries Park. Please be in your seat by quarter-to so we can start on time.',                  img: '/images/schedule/ceremony.svg',   alt: 'A wedding arch' },
  { heading: 'We drink!',  time: '1:45 pm',  desc: 'Prosecco, canapés and photographs by the fountain. We’ll be off chasing family portraits for a while. Make yourselves at home.', img: '/images/schedule/drinks.svg',     alt: 'Champagne flutes' },
  { heading: 'We eat!',    time: '4:00 pm',  desc: 'Three courses and good wine in the Dining Room. Find your seat at the place card with your name on, settle in for a long lunch.', img: '/images/schedule/breakfast.svg',  alt: 'A place setting' },
  { heading: 'We toast!',  time: '5:30 pm',  desc: 'Words from the people who know us best. Some funny, some sentimental, hopefully none too long. Tissues optional.',                img: '/images/schedule/speeches.svg',   alt: 'A raised glass' },
  { heading: 'We dance!',  time: '7:30 pm',  desc: 'Cake first, then the first dance, then the floor’s open till late. A late buffet around ten for anyone still standing.',         img: '/images/schedule/dance.svg',      alt: 'A dancing couple' },
  { heading: 'Goodnight!', time: '12:00 am', desc: 'Last orders at half past eleven. There are rooms held for guests at St Audries, and we hope you’ll stay the night.',               img: '/images/schedule/carriages.svg',  alt: 'A vintage car' },
];

const Schedule = () => {
  const listRef = React.useRef(null);
  const inkRef = React.useRef(null);

  // The centre axis "inks itself" as you scroll: a burgundy line grows
  // down the track, and each event's dot blooms as the ink passes it.
  React.useEffect(() => {
    const list = listRef.current, ink = inkRef.current;
    if (!list || !ink) return;
    const dots = Array.from(list.querySelectorAll('.schedule-dot'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ink.style.height = '100%';
      dots.forEach((d) => d.classList.add('lit'));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = list.getBoundingClientRect();
      // the "pen" sits a little below the middle of the viewport
      const penY = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (penY - rect.top) / rect.height));
      ink.style.height = (p * 100).toFixed(2) + '%';
      const inkY = rect.top + p * rect.height;
      for (const d of dots) {
        const r = d.getBoundingClientRect();
        d.classList.toggle('lit', r.top + r.height / 2 <= inkY);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
  <Section id="day" tint padTop={120} padBottom={120}>
    <PageHeading eyebrow="The order of the day" title="Schedule" intro="A rough shape. Times will firm up nearer July." />

    <ol ref={listRef} className="schedule-list" style={{
      listStyle: 'none', padding: 0, margin: '0 auto',
      maxWidth: 960, position: 'relative',
    }}>
      <div aria-hidden="true" className="schedule-axis" style={{
        position: 'absolute', top: 28, bottom: 28, left: '50%',
        width: 1, background: 'var(--rule)', transform: 'translateX(-50%)',
      }}>
        <div ref={inkRef} className="schedule-axis-ink" />
      </div>

      {SCHEDULE.map((item, i) => {
        const imgFirst = i % 2 === 0;
        const imgCell = (
          <div className="schedule-img">
            <Reveal from={imgFirst ? 'left' : 'right'}>
              <ScheduleImage src={item.img} alt={item.alt} />
            </Reveal>
          </div>
        );
        const dotCell = <div className="schedule-dot" aria-hidden="true"><span /></div>;
        const textCell = (
          <div className="schedule-text">
            <Reveal from={imgFirst ? 'right' : 'left'} delay={120}>
              <h3 className="schedule-heading">{item.heading}</h3>
              <div className="schedule-time accent-gradient">{item.time}</div>
              <p className="schedule-desc">{item.desc}</p>
            </Reveal>
          </div>
        );
        return (
          <li key={i} className={`schedule-row ${imgFirst ? 'img-left' : 'img-right'}`}>
            {imgFirst
              ? <>{imgCell}{dotCell}{textCell}</>
              : <>{textCell}{dotCell}{imgCell}</>}
          </li>
        );
      })}
    </ol>

    <style>{`
      .schedule-row{
        display: grid;
        grid-template-columns: 1fr 60px 1fr;
        align-items: center;
        column-gap: 32px;
        padding: 36px 0;
      }
      /* Children render in source order; img-left and img-right rows swap
         JSX order, so grid auto-flow puts the right thing in the right cell.
         Only thing we need to vary is text alignment. */
      .schedule-row.img-left  .schedule-img  { text-align: right; }
      .schedule-row.img-left  .schedule-text { text-align: left; }
      .schedule-row.img-right .schedule-text { text-align: right; }
      .schedule-row.img-right .schedule-img  { text-align: left; }

      .schedule-img img{
        display: inline-block;
        width: clamp(110px, 16vw, 170px);
        height: auto;
      }
      .schedule-img-placeholder{
        display: inline-block;
        width: clamp(110px, 16vw, 170px);
        aspect-ratio: 1 / 1;
        border: 1px dashed var(--rule);
        background: var(--cream);
        border-radius: 6px;
      }

      .schedule-axis-ink{
        position: absolute; top: 0; left: 0; width: 100%; height: 0;
        background: linear-gradient(180deg, var(--burgundy), var(--magenta));
        transition: height 0.25s ease-out;
      }
      .schedule-dot{
        display: flex; align-items: center; justify-content: center;
        position: relative; z-index: 1;
      }
      .schedule-dot span{
        width: 12px; height: 12px; border-radius: 50%;
        background-image: var(--accent-gradient);
        box-shadow: 0 0 0 6px var(--cream-deep);
        transform: scale(0.45); opacity: 0.35;
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
      }
      .schedule-dot.lit span{
        transform: scale(1); opacity: 1;
      }

      .schedule-heading{
        margin: 0 0 8px;
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-style: italic; font-weight: 400;
        font-size: clamp(28px, 3.6vw, 40px);
        line-height: 1.05; letter-spacing: -0.005em;
        color: var(--ink);
      }
      .schedule-time{
        font-family: 'Cinzel', Georgia, serif;
        font-size: clamp(13px, 1.5vw, 16px); font-weight: 500;
        letter-spacing: 0.24em; text-transform: uppercase;
        font-variant-numeric: tabular-nums;
      }
      .schedule-desc{
        margin: 14px 0 0;
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: clamp(15px, 1.6vw, 17px); font-style: italic;
        font-weight: 400; line-height: 1.6; color: var(--ink-soft);
        max-width: 38ch;
      }
      /* Pin the description to the side of the text column that abuts
         the timeline, so it reads inward instead of floating randomly. */
      .schedule-row.img-right .schedule-desc{ margin-left: auto; }
      .schedule-row.img-left  .schedule-desc{ margin-right: auto; }

      @media (max-width: 720px) {
        .schedule-axis{ display: none; }
        .schedule-dot{ display: none; }
        .schedule-row,
        .schedule-row.img-right,
        .schedule-row.img-left{
          grid-template-columns: 1fr;
          padding: 28px 0;
          text-align: center !important;
          column-gap: 0;
          border-bottom: 1px solid var(--rule-soft);
        }
        .schedule-row:last-child{ border-bottom: none; }
        .schedule-row .schedule-img,
        .schedule-row .schedule-text{
          order: 0;
          text-align: center !important;
        }
        .schedule-row .schedule-img{ margin-bottom: 14px; }
        .schedule-row.img-right .schedule-img{ order: 0; }
        .schedule-row.img-right .schedule-text{ order: 1; }
        .schedule-desc{ margin: 12px auto 0; }
        .schedule-img img,
        .schedule-img-placeholder{ width: 96px; }
      }
    `}</style>
  </Section>
  );
};

// Renders an SVG / image only once it exists in the repo. If the file 404s
// (still pending in /images/schedule/), the onError hides the broken-image
// icon and shows a quiet dashed placeholder instead so the layout stays clean.
const ScheduleImage = ({ src, alt }) => {
  const [missing, setMissing] = React.useState(false);
  if (!src || missing) return <span className="schedule-img-placeholder" aria-label={alt} />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setMissing(true)} />;
};

// Venue hero photo. Landscape (3:2) framed inside the 2-column grid; falls
// back to a quiet dashed box so the layout doesn't collapse before the
// file is uploaded.
const VenuePhoto = ({ src, alt }) => {
  const [missing, setMissing] = React.useState(false);
  const frameStyle = {
    display: 'block', width: '100%', aspectRatio: '3 / 2',
    border: '1px solid var(--rule)',
    background: 'var(--cream-deep)',
    overflow: 'hidden',
  };
  if (!src || missing) {
    return (
      <div style={{
        ...frameStyle,
        borderStyle: 'dashed',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'var(--ink-mute)', textIndent: '0.32em',
      }}>Venue photograph</div>
    );
  }
  return (
    <div style={frameStyle}>
      <img src={src} alt={alt} loading="lazy" onError={() => setMissing(true)}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};


// ============================================================
// VENUE — image left, info right with definition list, two CTAs
// ============================================================
const Venue = () => (
  <Section id="venue" padTop={140} padBottom={140}>
    <PageHeading eyebrow="The setting" title="St Audries Park" />

    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72,
      alignItems: 'center', maxWidth: 1120, margin: '0 auto',
      textAlign: 'left',
    }} className="venue-grid">
      <Reveal from="left">
        <VenuePhoto src="/images/venue/st-audries-park.jpg" alt="St Audries Park country house with ceremony chairs set up on the lawn" />
      </Reveal>

      <Reveal from="right" delay={120}>
        <p style={{
          margin: '0 0 32px',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(20px, 2.2vw, 24px)', fontStyle: 'italic', fontWeight: 400,
          lineHeight: 1.55, color: 'var(--ink)',
        }}>
          A Grade II* listed country house set within 100 acres of private parkland in the Quantock Hills, with sweeping views across the Bristol Channel to Wales.
        </p>

        <dl style={{
          margin: '0 0 36px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 32px',
        }} className="venue-dl">
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Address</dt>
            <dd style={{ margin: 0, fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(15px, 1.7vw, 17px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: 'var(--ink)' }}>St Audries Park<br/>West Quantoxhead<br/>Taunton, Somerset TA4 4DS</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Ceremony</dt>
            <dd style={{ margin: 0, fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(15px, 1.7vw, 17px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: 'var(--ink)' }}>The Orangery</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Reception</dt>
            <dd style={{ margin: 0, fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(15px, 1.7vw, 17px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: 'var(--ink)' }}>The Dining Room &amp; Terrace</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--burgundy)', textIndent: '0.32em', marginBottom: 6 }}>Parking</dt>
            <dd style={{ margin: 0, fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(15px, 1.7vw, 17px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: 'var(--ink)' }}>Ample, on-site</dd>
          </div>
        </dl>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ActionBtn href="https://www.google.com/maps?q=St+Audries+Park,+Somerset">Open in Maps</ActionBtn>
          <ActionBtn href="https://www.staudriespark.co.uk" ghost>Venue website</ActionBtn>
        </div>
      </Reveal>
    </div>

    <div style={{ maxWidth: 1120, margin: '80px auto 0' }}>
      <Reveal>
      <div style={{
        position: 'relative', aspectRatio: '21 / 9',
        border: '1px solid var(--rule)', overflow: 'hidden', background: 'var(--cream-deep)',
      }}>
        <iframe
          title="St Audries Park on Google Maps"
          src="https://www.google.com/maps?q=St+Audries+Park,+West+Quantoxhead,+Somerset+TA4+4DS&z=14&output=embed"
          style={{ border: 0, width: '100%', height: '100%', display: 'block', filter: 'saturate(0.75) contrast(0.96)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" />
      </div>
      </Reveal>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .venue-grid{ grid-template-columns: 1fr !important; gap: 48px !important; }
        .venue-dl{ grid-template-columns: 1fr !important; }
      }
    `}</style>
  </Section>
);


// ============================================================
// TRAVEL — three transport cards + accommodation cards
// ============================================================
const TRANSPORT = [
  { title: 'By Car',   body: 'From the M5, take Junction 23 or 24 and follow signs to the A39 toward Minehead. The venue is around 15 miles from the motorway. Free parking on site; cars may be left overnight.', detail: { label: 'Parking', value: 'Complimentary, on-site' } },
  { title: 'By Train', body: 'Taunton (25 min taxi) or Bridgwater (30 min). Both well served from London Paddington and Bristol Temple Meads.', detail: { label: 'Taxis', value: 'A1 Williton · 01984 000 000' } },
  { title: 'By Air',   body: 'Bristol Airport is the nearest major airport, about 50 miles away. Exeter and Cardiff are within a 90-minute drive.', detail: { label: 'Transfers', value: 'We can suggest car hire' } },
];

const STAYS = [
  { name: 'St Audries Park',       tagline: 'On site',        body: 'The house has rooms reserved for wedding guests at a preferential rate. Allocated first-come, first-served.', detail: 'From £180 / night', primary: true },
  { name: 'The Plough Inn',        tagline: '1.4 mi away',    body: 'A small coaching inn with seven rooms, quiet and well-run. Walkable in daylight, cab home after dark.', detail: 'From £120 / night' },
  { name: 'Combe House',           tagline: '4 mi away',      body: 'A country house hotel in Holford. Rooms held under Ryan & Katie until 1 April 2027.', detail: 'From £150 / night' },
  { name: 'The Castle Hotel',      tagline: '18 mi · Taunton',body: 'A historic four-star hotel in central Taunton, good for guests arriving by train.', detail: 'From £180 / night' },
];

const Travel = () => (
  <Section id="travel" tint padTop={140} padBottom={140}>
    <PageHeading eyebrow="Getting there" title="Travel & Stay" intro="It is a long way to Somerset, and a longer way home at midnight. Please plan to stay." />

    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
      maxWidth: 1120, margin: '0 auto',
    }} className="travel-grid">
      {TRANSPORT.map((t, i) => (
        <Reveal key={i} delay={i * 90} style={{ display: 'grid' }}>
          <Card>
            <CardTitle>{t.title}</CardTitle>
            <CardBody>{t.body}</CardBody>
            <CardDetail label={t.detail.label}>{t.detail.value}</CardDetail>
          </Card>
        </Reveal>
      ))}
    </div>

    <div style={{
      margin: '80px auto 48px', maxWidth: 480, textAlign: 'center',
      paddingTop: 36, borderTop: '1px solid var(--rule)',
    }}>
      <div style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 11, fontWeight: 400,
        letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--burgundy)', textIndent: '0.36em',
      }}>Where to stay</div>
      <p style={{
        margin: '20px 0 0',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: 'clamp(15px, 1.7vw, 17px)', fontStyle: 'italic',
        fontWeight: 400, lineHeight: 1.65, color: 'var(--ink-mute)',
      }}>
        A few favourites, in order of proximity. Booking links to follow.
      </p>
    </div>

    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
      maxWidth: 920, margin: '0 auto',
    }} className="stay-grid">
      {STAYS.map((s, i) => (
        <Reveal key={i} delay={(i % 2) * 90} style={{ display: 'grid' }}>
          <Card primary={s.primary}>
            <CardEyebrow>{s.primary ? 'Recommended · ' + s.tagline : s.tagline}</CardEyebrow>
            <CardTitle>{s.name}</CardTitle>
            <CardBody>{s.body}</CardBody>
            <CardDetail>{s.detail}</CardDetail>
          </Card>
        </Reveal>
      ))}
    </div>

    <style>{`
      @media (max-width: 900px) {
        .travel-grid, .stay-grid{ grid-template-columns: 1fr !important; }
      }
    `}</style>
  </Section>
);


// ============================================================
// WEDDING PARTY — two groups with avatar circles
// ============================================================
const PARTY_KATIE = [
  { initials: 'SL', role: 'Maid of Honour', name: 'Shanice Lobb', bio: 'Katie’s right hand, chief organiser, and the one keeping the whole day on track.' },
  { initials: 'LN', role: 'Bridesmaid',     name: 'Lucy Nile',    bio: 'A dear friend who has been there through every chapter, and a few misadventures besides.' },
  { initials: 'KJ', role: 'Bridesmaid',     name: 'Katy Jewell',  bio: 'Always ready with a laugh, a kind word, and a glass of something cold.' },
  { initials: 'HK', role: 'Bridesmaid',     name: 'Holly Kirk',   bio: 'One of Katie’s favourite people in the world, by her side all day long.' },
];
const PARTY_RYAN = [
  { initials: 'PE', role: 'Best Man',  name: 'Paul Elliott',   bio: 'Ryan’s right hand and the man behind the speech everyone is slightly nervous about.' },
  { initials: 'JA', role: 'Groomsman', name: 'Jake Adams',     bio: 'A loyal friend through thick and thin, good for a story or two.' },
  { initials: 'JW', role: 'Groomsman', name: 'Jamie Williams', bio: 'Brilliant company and a steady hand whenever it counts.' },
  { initials: 'HS', role: 'Groomsman', name: 'Harry Shotton',  bio: 'One of Ryan’s oldest and dearest friends, here for all of it.' },
];

const WeddingParty = () => (
  <Section id="party" padTop={140} padBottom={140}>
    <PageHeading eyebrow="The people" title="Wedding Party" intro="Endlessly grateful to those standing beside us on the day." />

    <PartyGroup label="On Katie’s side" people={PARTY_KATIE} />
    <div style={{ height: 80 }} />
    <PartyGroup label="On Ryan’s side" people={PARTY_RYAN} />
  </Section>
);

const PartyGroup = ({ label, people }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      <span style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 12, fontWeight: 400,
        letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--burgundy)', textIndent: '0.36em',
      }}>{label}</span>
    </div>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28,
      maxWidth: 1120, margin: '0 auto',
    }} className="party-grid">
      {people.map((p, i) => (
        <Reveal key={i} delay={i * 80}>
        <article style={{ textAlign: 'center', padding: '8px 12px' }}>
          <div style={{
            width: 124, height: 124, borderRadius: '50%',
            border: '1px solid var(--rule)', background: 'var(--cream-deep)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 22px',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 36, fontWeight: 400, fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}><span className="accent-gradient">{p.initials}</span></div>
          <div style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 10, fontWeight: 400,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'var(--burgundy)', textIndent: '0.32em',
            marginBottom: 8,
          }}>{p.role}</div>
          <div style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--ink)', textIndent: '0.14em',
            marginBottom: 12,
          }}>{p.name}</div>
          {p.bio && (
            <p style={{
              margin: 0,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 15, fontStyle: 'italic', fontWeight: 400,
              lineHeight: 1.55, color: 'var(--ink-mute)',
            }}>{p.bio}</p>
          )}
        </article>
        </Reveal>
      ))}
    </div>
    <style>{`
      @media (max-width: 900px) { .party-grid{ grid-template-columns: 1fr 1fr !important; } }
      @media (max-width: 540px) { .party-grid{ grid-template-columns: 1fr !important; } }
    `}</style>
  </div>
);


// ============================================================
// DETAILS — four cards: Dress, Gifts, Children, Photography
// ============================================================
const DETAILS = [
  { eyebrow: 'Dress Code',  headline: 'Black Tie',          body: 'Dinner jackets for gentlemen, long or cocktail dresses for ladies. The ceremony will be indoors; drinks and photographs move outside if the weather is kind. Comfortable shoes for the lawn.' },
  { eyebrow: 'Gifts',       headline: 'Honeymoon Fund',     body: 'Your company is the only present we ask for. If you’d like to mark the day, we’re saving towards our honeymoon in Japan. Contributions of any size are gratefully received.' },
  { eyebrow: 'Children',    headline: 'Adults Only',        body: 'With the exception of immediate family and ring-bearers, we’ve chosen to keep the day adults-only. We hope you’ll see it as an excuse for a rare evening off.' },
  { eyebrow: 'Photography', headline: 'Unplugged Ceremony', body: 'Phones and cameras away during the ceremony, please. Our photographer will capture every moment, and we’d love to see your faces rather than your screens.' },
];

const Details = () => (
  <Section id="details" tint padTop={140} padBottom={140}>
    <PageHeading eyebrow="Good to know" title="The Finer Details" />

    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
      maxWidth: 980, margin: '0 auto',
    }} className="details-grid">
      {DETAILS.map((d, i) => (
        <Reveal key={i} delay={(i % 2) * 90} style={{ display: 'grid' }}>
          <Card>
            <CardEyebrow>{d.eyebrow}</CardEyebrow>
            <div style={{
              margin: '10px 0 18px',
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(22px, 2.8vw, 30px)', fontWeight: 400,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--ink)', textIndent: '0.06em',
              lineHeight: 1.2,
            }}>{d.headline}</div>
            <CardBody>{d.body}</CardBody>
          </Card>
        </Reveal>
      ))}
    </div>

    <style>{`
      @media (max-width: 720px) { .details-grid{ grid-template-columns: 1fr !important; } }
    `}</style>
  </Section>
);


// ============================================================
// FAQ — accordion
// ============================================================
const FAQS = [
  { q: 'Can we bring our children?',                       a: 'We adore your children but have chosen to keep the day adults-only (eighteen and up), with the exception of immediate family. We hope this gives plenty of notice to arrange care.' },
  { q: 'I have a dietary requirement, what should I do?',  a: 'There is a dedicated space on the RSVP form. Vegetarian, vegan, gluten-free, allergies, anything; please tell us in your own words and we will make sure every plate works.' },
  { q: 'Are gifts expected?',                              a: 'Your company is more than gift enough. If you would like to mark the day, we are saving towards our honeymoon, but you are under no obligation.' },
  { q: 'Is the ceremony indoors or outdoors?',             a: 'Indoors. The Orangery seats everyone comfortably. Drinks and photographs will move outside if the weather is kind.' },
  { q: 'How long does the day run?',                       a: 'Roughly one in the afternoon through to midnight. The schedule is the current shape; times will firm up in the new year.' },
  { q: 'Will there be photographers?',                     a: 'Yes, Sam from Field & Folk will be with us. We ask, gently, that phones stay away during the ceremony. After that, please snap to your heart’s content.' },
  { q: 'How do I get there if I’m not driving?',      a: 'Trains to Taunton or Bridgwater, then a 25–30 minute taxi. We are also looking into a coach from Taunton in the afternoon and a return coach at midnight; details to follow.' },
  { q: 'Can I bring a plus-one?',                          a: 'Your invitation will say. If your guest is named, please bring them. If not, we have kept the numbers tight, please don’t take it personally.' },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <Section id="faqs" padTop={140} padBottom={140}>
      <PageHeading eyebrow="Anything else" title="Questions" />

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{
              borderTop: i === 0 ? '1px solid var(--rule)' : 'none',
              borderBottom: '1px solid var(--rule)',
              textAlign: 'left',
            }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: '100%', background: 'none', border: 'none',
                padding: '24px 4px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                color: 'var(--ink)', textAlign: 'left',
              }}>
                <span style={{
                  fontFamily: 'Cinzel, Georgia, serif',
                  fontSize: 'clamp(13px, 1.5vw, 15px)', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: isOpen ? 'var(--burgundy)' : 'var(--ink)',
                  textIndent: '0.14em', lineHeight: 1.5,
                  transition: 'color 0.25s',
                }}>{item.q}</span>
                <span aria-hidden="true" style={{
                  flex: '0 0 auto', color: 'var(--burgundy)', opacity: 0.7,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.4s',
                }}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  </svg>
                </span>
              </button>
              <div style={{
                maxHeight: isOpen ? 400 : 0, overflow: 'hidden',
                transition: 'max-height 0.5s ease, opacity 0.4s ease',
                opacity: isOpen ? 1 : 0,
              }}>
                <p style={{
                  margin: '0 0 26px', padding: '0 4px',
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(16px, 1.8vw, 18px)', fontStyle: 'italic',
                  fontWeight: 400, lineHeight: 1.55, color: 'var(--ink-mute)',
                }}>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{
        margin: '48px auto 0', textAlign: 'center',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: 16, fontStyle: 'italic', fontWeight: 400,
        color: 'var(--ink-mute)',
      }}>
        Anything left over, just ask Katie or Ryan directly.
      </p>
    </Section>
  );
};


// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer style={{
    padding: '140px 24px 80px', background: 'var(--cream)',
    textAlign: 'center', borderTop: '1px solid var(--rule)',
  }}>
    <div style={{
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 11, fontWeight: 400,
      letterSpacing: '0.36em', textTransform: 'uppercase',
      color: 'var(--ink-mute)', textIndent: '0.36em',
    }}>With love</div>
    <div style={{
      margin: '32px 0 0',
      fontSize: 'clamp(28px, 4vw, 44px)',
      fontWeight: 400, lineHeight: 1, color: 'var(--ink)',
    }}>
      <Names />
    </div>
    <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
      <button onClick={downloadIcs} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        color: 'var(--burgundy)',
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 11, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
        textDecoration: 'underline', textUnderlineOffset: 8, textDecorationThickness: '1px',
        textIndent: '0.32em',
      }}>Add to calendar</button>
    </div>
    <div style={{
      marginTop: 64,
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 10, fontWeight: 400,
      letterSpacing: '0.36em', textTransform: 'uppercase',
      color: 'var(--ink-mute)', textIndent: '0.36em',
    }}>02 · 07 · 2027 &nbsp;·&nbsp; St Audries Park</div>
    {/* Quiet admin link — only useful to the couple. Discreet on purpose
        so it doesn't look like a public destination. */}
    <a href="/admin" style={{
      display: 'inline-block', marginTop: 24,
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 9, fontWeight: 400, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--ink-mute)', textIndent: '0.32em',
      textDecoration: 'none', opacity: 0.4,
      transition: 'opacity 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
    >Admin</a>
  </footer>
);


// ============================================================
// SHARED HELPERS — heading, card primitives, action button
// ============================================================

const PageHeading = ({ eyebrow, title, intro }) => (
  <header style={{ textAlign: 'center', marginBottom: 80 }}>
    <Reveal>
    {eyebrow && (
      <div style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 'clamp(11px, 1.3vw, 13px)',
        fontWeight: 400, letterSpacing: '0.36em', textTransform: 'uppercase',
        color: 'var(--ink-mute)', textIndent: '0.36em',
        marginBottom: 28,
      }}>{eyebrow}</div>
    )}
    <h2 style={{
      margin: 0,
      fontFamily: 'Cinzel, Georgia, serif',
      fontSize: 'clamp(26px, 3.6vw, 40px)',
      fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)',
      letterSpacing: '0.10em', textTransform: 'uppercase', textIndent: '0.10em',
    }}>{title}</h2>
    {intro && (
      <p style={{
        margin: '32px auto 0', maxWidth: 560,
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: 'clamp(16px, 1.8vw, 19px)', fontStyle: 'italic',
        fontWeight: 400, lineHeight: 1.6, color: 'var(--ink-mute)',
      }}>{intro}</p>
    )}
    </Reveal>
  </header>
);

const Card = ({ children, primary = false }) => (
  <article style={{
    background: primary ? 'var(--cream)' : 'var(--cream)',
    border: '1px solid ' + (primary ? 'var(--burgundy)' : 'var(--rule)'),
    padding: '32px 30px',
    display: 'flex', flexDirection: 'column',
    textAlign: 'left',
    position: 'relative',
  }}>
    {primary && (
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: 'var(--burgundy)',
      }} />
    )}
    {children}
  </article>
);

const CardEyebrow = ({ children }) => (
  <div style={{
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 10, fontWeight: 500,
    letterSpacing: '0.32em', textTransform: 'uppercase',
    color: 'var(--burgundy)', textIndent: '0.32em',
    marginBottom: 8,
  }}>{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 style={{
    margin: '6px 0 14px',
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 'clamp(17px, 1.9vw, 21px)', fontWeight: 500,
    letterSpacing: '0.10em', textTransform: 'uppercase',
    color: 'var(--ink)', textIndent: '0.10em',
    lineHeight: 1.2,
  }}>{children}</h3>
);

const CardBody = ({ children }) => (
  <p style={{
    margin: '0 0 16px',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 'clamp(15px, 1.6vw, 17px)', fontStyle: 'italic', fontWeight: 400,
    lineHeight: 1.55, color: 'var(--ink-mute)',
    flex: 1,
  }}>{children}</p>
);

const CardDetail = ({ label, children }) => (
  <div style={{
    marginTop: 'auto', paddingTop: 14,
    borderTop: '1px solid var(--rule-soft)',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: 14, fontStyle: 'italic', fontWeight: 400,
    color: 'var(--ink-mute)',
  }}>
    {label && (
      <span style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 10, fontWeight: 500,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'var(--burgundy)', textIndent: '0.32em',
        fontStyle: 'normal',
        marginRight: 10,
      }}>{label}</span>
    )}
    <span>{children}</span>
  </div>
);

const ActionBtn = ({ href, children, ghost = false }) => (
  <a href={href} target="_blank" rel="noopener" style={{
    display: 'inline-block', padding: '14px 24px',
    background: ghost ? 'transparent' : 'var(--ink)',
    color: ghost ? 'var(--ink)' : 'var(--cream)',
    border: '1px solid ' + (ghost ? 'var(--rule)' : 'var(--ink)'),
    fontFamily: 'Cinzel, Georgia, serif',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase',
    textDecoration: 'none', textIndent: '0.32em',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  }}>{children}</a>
);


// Floating RSVP pill — mobile only. Appears once the guest scrolls past
// the hero so it doesn't fight with the hero's own RSVP button, and hides
// once they're inside the RSVP section so it isn't redundant on top of
// the form.
const FloatingRsvpCta = ({ onRsvp }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const rsvpEl = document.getElementById('rsvp');
      const rsvpTop = rsvpEl ? rsvpEl.offsetTop : Infinity;
      // Show after the hero is mostly off-screen, hide once the RSVP section
      // (with its own button) is in view so the pill isn't redundant.
      const shouldShow = y > 600 && y < rsvpTop - 200;
      setShow(shouldShow);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={onRsvp}
        className="floating-rsvp"
        aria-label="Reply to invitation"
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 40,
          background: 'var(--ink)', color: 'var(--cream)',
          border: 'none', cursor: 'pointer',
          padding: '14px 26px',
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: 11, fontWeight: 500,
          letterSpacing: '0.32em', textTransform: 'uppercase', textIndent: '0.32em',
          boxShadow: '0 8px 24px -6px rgba(26,20,22,0.35), 0 2px 6px -2px rgba(26,20,22,0.2)',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: show ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >RSVP</button>
      <style>{`
        /* Desktop has the nav + hero CTA — only show this on phone widths. */
        @media (min-width: 720px) { .floating-rsvp { display: none !important; } }
      `}</style>
    </>
  );
};

Object.assign(window, {
  Nav, Hero, Schedule, Venue, Travel, WeddingParty, Details, FAQ, Footer, FloatingRsvpCta, Reveal,
  Section, Heading, PageHeading, Card, CardEyebrow, CardTitle, CardBody, CardDetail, ActionBtn, Names,
});
