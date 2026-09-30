// Visual SVG previews for textures and reliefs used in the configurator

export function TextureVisual({ pattern }: { pattern: string }) {
  const size = 48;
  const c = '#85899B';

  switch (pattern) {
    case 'suave':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#E4E6ED" />
          <path d="M12 30 Q18 22 24 28 T36 26" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M10 34 Q16 26 22 32 T38 30" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.3" />
        </svg>
      );
    case 'lisa':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          <rect x="6" y="6" width="36" height="36" rx="8" stroke={c} strokeWidth="1.5" opacity="0.3" />
        </svg>
      );
    case 'rugosa':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[...Array(5)].map((_, i) =>
            [...Array(5)].map((_, j) => (
              <circle key={`${i}-${j}`} cx={12 + i * 6} cy={12 + j * 6} r="1.5" fill={c} opacity="0.5" />
            ))
          )}
        </svg>
      );
    case 'acanalada':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[10, 16, 22, 28, 34].map((y) => (
            <line key={y} x1="10" y1={y} x2="38" y2={y} stroke={c} strokeWidth="2" opacity="0.4" />
          ))}
        </svg>
      );
    case 'pelitos':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[12, 18, 24, 30, 36].map((y) =>
            [12, 20, 28, 36].map((x) => (
              <line key={`${x}-${y}`} x1={x} y1={y} x2={x + 2} y2={y - 5} stroke={c} strokeWidth="1.5" opacity="0.5" />
            ))
          )}
        </svg>
      );
    case 'velcro':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[...Array(7)].map((_, i) =>
            [...Array(7)].map((_, j) => (
              <rect key={`${i}-${j}`} x={9 + i * 5} y={9 + j * 5} width="2.5" height="2.5" rx="0.5" fill={c} opacity="0.45" />
            ))
          )}
        </svg>
      );
    default:
      return null;
  }
}

export function ReliefVisual({ pattern }: { pattern: string }) {
  const size = 48;
  const c = '#85899B';

  switch (pattern) {
    case 'lineas':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[14, 22, 30].map((y) => (
            <line key={y} x1="12" y1={y} x2="36" y2={y} stroke={c} strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'puntos':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[16, 28].map((y) =>
            [16, 24, 32].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill={c} />)
          )}
        </svg>
      );
    case 'ondas':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          {[18, 30].map((y) => (
            <path key={y} d={`M12 ${y} Q18 ${y - 6} 24 ${y} T36 ${y}`} stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'espirales':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          <path d="M24 24 Q24 18 30 18 Q34 18 34 24 Q34 32 24 32 Q16 32 16 24 Q16 14 28 14" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'circulos':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          <circle cx="24" cy="24" r="12" stroke={c} strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="7" stroke={c} strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="2.5" fill={c} />
        </svg>
      );
    case 'zigzag':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="8" fill="#E4E6ED" />
          <polyline points="12,18 18,28 24,18 30,28 36,18" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="12,30 18,40 24,30 30,40 36,30" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
