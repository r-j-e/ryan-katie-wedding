// Small reusable SVG/visual motifs — kept minimal and editorial.
// No hand-drawn florals; just elegant rules, ornaments, and geometric flourishes.

const SectionRule = ({ label, dark = false }) => {
  const color = dark ? 'rgba(244,237,228,0.45)' : 'rgba(26,20,22,0.35)';
  const lineColor = dark ? 'rgba(244,237,228,0.25)' : 'rgba(26,20,22,0.18)';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:18, margin:'0 auto', maxWidth:520, color }}>
      <div style={{ flex:1, height:1, background:lineColor }}></div>
      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" style={{ flex:'0 0 auto' }}>
        <circle cx="11" cy="5" r="2" fill={color}/>
        <circle cx="2" cy="5" r="0.9" fill={color}/>
        <circle cx="20" cy="5" r="0.9" fill={color}/>
      </svg>
      <div style={{ flex:1, height:1, background:lineColor }}></div>
      {label && (
        <>
          <span className="mono-eyebrow" style={{ color, letterSpacing:'0.32em' }}>{label}</span>
          <div style={{ flex:1, height:1, background:lineColor }}></div>
        </>
      )}
    </div>
  );
};

// Monogram — R & K — used in nav + gate
const Monogram = ({ size = 44, dark = false }) => {
  const stroke = dark ? '#F4EDE4' : '#1A1416';
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 80 44" fill="none">
      <text x="0" y="34" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" fontSize="36" fill={stroke}>R</text>
      <text x="32" y="34" fontFamily="'Cormorant Garamond', serif" fontWeight="300" fontSize="30" fill={stroke}>&amp;</text>
      <text x="58" y="34" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" fontSize="36" fill={stroke}>K</text>
    </svg>
  );
};

// A subtle vertical ornament — used as a section opener
const VerticalOrnament = ({ height = 60, dark = false }) => {
  const c = dark ? 'rgba(244,237,228,0.5)' : 'rgba(26,20,22,0.35)';
  return (
    <svg width="10" height={height} viewBox={`0 0 10 ${height}`} fill="none">
      <line x1="5" y1="0" x2="5" y2={height/2 - 6} stroke={c} strokeWidth="1"/>
      <circle cx="5" cy={height/2} r="2" fill={c}/>
      <line x1="5" y1={height/2 + 6} x2="5" y2={height} stroke={c} strokeWidth="1"/>
    </svg>
  );
};

// Calla-lily-ish abstract botanical mark (very minimal, not a drawing)
const FloralMark = ({ size = 28, dark = false }) => {
  const c = dark ? '#F4EDE4' : '#4A1A2C';
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 4 C 9 10, 9 18, 14 24 C 19 18, 19 10, 14 4 Z" stroke={c} strokeWidth="0.8" fill="none"/>
      <line x1="14" y1="14" x2="14" y2="26" stroke={c} strokeWidth="0.8"/>
      <circle cx="14" cy="14" r="1.2" fill={c}/>
    </svg>
  );
};

// Striped placeholder card (when no image-slot is used)
const PlaceholderImage = ({ ratio = '4 / 5', label = 'image placeholder', dark = false }) => {
  const bg = dark ? '#1A1416' : 'rgba(26,20,22,0.04)';
  const stripe = dark ? 'rgba(244,237,228,0.06)' : 'rgba(26,20,22,0.06)';
  const color = dark ? 'rgba(244,237,228,0.55)' : 'rgba(26,20,22,0.45)';
  return (
    <div style={{
      aspectRatio: ratio,
      background: `repeating-linear-gradient(135deg, ${bg} 0 14px, ${stripe} 14px 15px)`,
      border:`1px solid ${dark ? 'rgba(244,237,228,0.18)' : 'rgba(26,20,22,0.15)'}`,
      display:'flex', alignItems:'center', justifyContent:'center',
      color, fontFamily:'ui-monospace, "SF Mono", Menlo, monospace', fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase',
      width:'100%',
    }}>
      {label}
    </div>
  );
};

Object.assign(window, { SectionRule, Monogram, VerticalOrnament, FloralMark, PlaceholderImage });
