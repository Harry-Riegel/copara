/* Copara UI kit — Startbildschirm im Website-Hero-Cut.
   Signatur-Animation, handanimiert (requestAnimationFrame), spielt GENAU EINMAL:
   Anticipation (die Kreise umarmen den neugeborenen Punkt), Squash & Stretch bei der Geburt,
   Sehnsuchts-Beat in der Trennung, Wachstum der Annäherung entgegen, Kontakt mit Squash,
   gedämpftem Nachschwingen und Glow-Funken — danach ein lebendiger Halt (nur der Glow atmet).
   Die Kreise berühren nur den Punkt, nie einander. */
function SplashScreen({ onDone }) {
  const [leaving, setLeaving] = React.useState(false);
  const lRef = React.useRef(null), rRef = React.useRef(null), dRef = React.useRef(null);
  const enter = () => { if (leaving) return; setLeaving(true); setTimeout(onDone, 440); };

  React.useEffect(() => {
    const L = lRef.current, R = rRef.current, D = dRef.current;
    const paint = (l, r, sx, sy, glowExtra) => {
      if (L) L.style.transform = `translate3d(${l}px,0,0)`;
      if (R) R.style.transform = `translate3d(${r}px,0,0)`;
      if (D) {
        D.style.transform = `scale(${Math.max(0, sx)}, ${Math.max(0, sy)})`;
        D.style.opacity = sx <= 0.02 ? '0' : '1';
        const a = Math.min(1, 0.25 + 0.45 * sy + (glowExtra || 0) * 0.5);
        D.style.boxShadow = `0 0 ${6 + 12 * sy + 24 * (glowExtra || 0)}px rgba(232,168,124,${a})`;
      }
    };

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(-39, 39, 1, 1, 0); // verbundener Endzustand
      return;
    }

    const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const backOut = (t, s = 1.9) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
    const lerp = (a, b, t) => a + (b - a) * t;

    // Posen: Überlappung ±14 · Umarmung ±9 · getrennt ±64 · verbunden ±39 (Kontakt am Punkt)
    const OVERLAP = 14, HUG = 9, APART = 64, LINK = 39, DOT_S = 0.55;
    // Story-Beats in Sekunden — spielt einmal, keine Wiederholung
    const T_HUG = 0.55, T_HOLD = 0.9, T_APART = 2.05, T_LONG = 2.55, T_LINK = 3.65, T_END = 5.6;

    const circleX = (t) => {
      if (t <= 0) return OVERLAP;
      if (t < T_HUG) return lerp(OVERLAP, HUG, easeOut(t / T_HUG));
      if (t < T_HOLD) return HUG;
      if (t < T_APART) return lerp(HUG, APART, easeInOut((t - T_HOLD) / (T_APART - T_HOLD)));
      if (t < T_LONG) return APART;
      if (t < T_LINK) return lerp(APART, LINK, easeInOut((t - T_LONG) / (T_LINK - T_LONG)));
      const s = t - T_LINK; // Micro-Recoil nach dem Kontakt, gedämpft
      return LINK + 1.6 * Math.exp(-s * 5) * Math.sin(s * 16);
    };

    const dotAt = (t) => {
      if (t < 0.12) return { sx: 0, sy: 0, glow: 0 };
      if (t < T_HUG) { // Geburt: Pop mit Squash & Stretch + kleiner Funke
        const k = clamp01((t - 0.12) / (T_HUG - 0.12));
        const b = DOT_S * backOut(k, 2.2);
        return { sx: b * (1 + 0.22 * (1 - k)), sy: b * (1 - 0.18 * (1 - k)), glow: 0.35 * (1 - k) };
      }
      if (t < T_LONG + 0.3) return { sx: DOT_S, sy: DOT_S, glow: 0 };
      if (t < T_LINK) { // wächst der Annäherung entgegen
        const k = clamp01((t - (T_LONG + 0.3)) / (T_LINK - (T_LONG + 0.3)));
        const g = lerp(DOT_S, 1, easeOut(k));
        return { sx: g, sy: g, glow: 0 };
      }
      // Kontakt: die Energie geht in den Punkt — Squash, gedämpftes Nachschwingen, Glow-Flare
      const s = t - T_LINK;
      const osc = Math.exp(-s * 4.5) * Math.cos(s * 14);
      return { sx: 1 - 0.16 * osc, sy: 1 + 0.14 * osc, glow: Math.exp(-s * 2.4) };
    };

    let raf, start = null, idleStart = null;
    const idle = (ts) => { // lebendiger Halt: nur der Glow atmet — keine Wiederholung der Geschichte
      if (idleStart == null) idleStart = ts;
      const s = (ts - idleStart) / 1000;
      const b = 0.5 + 0.5 * Math.sin((s * 2 * Math.PI) / 4.2);
      if (D) D.style.boxShadow = `0 0 ${16 + 5 * b}px rgba(232,168,124,${0.55 + 0.18 * b})`;
      raf = requestAnimationFrame(idle);
    };
    const frame = (ts) => {
      if (start == null) start = ts;
      const t = (ts - start) / 1000;
      const lx = circleX(t);
      const rx = circleX(t - 0.09); // Follow-through: der rechte Kreis zieht minimal nach
      const d = dotAt(t);
      paint(-lx, rx, d.sx, d.sy, d.glow);
      if (t < T_END) { raf = requestAnimationFrame(frame); }
      else { paint(-LINK, LINK, 1, 1, 0); raf = requestAnimationFrame(idle); }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      onClick={enter}
      className={'cop-splash' + (leaving ? ' cop-splash-out' : '')}
      style={{ position: 'absolute', inset: 0, background: '#14211B', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', zIndex: 200, padding: '0 26px' }}
    >
      <div className="cop-blob" style={{ position: 'absolute', top: -140, right: -150, width: 360, height: 360, borderRadius: '50%', background: '#2E4B3F', filter: 'blur(60px)', opacity: 0.6, pointerEvents: 'none' }} />
      <div className="cop-blob" style={{ position: 'absolute', bottom: -120, left: -150, width: 320, height: 320, borderRadius: '50%', background: '#C67E5C', filter: 'blur(70px)', opacity: 0.32, animationDelay: '0.6s', pointerEvents: 'none' }} />

      {/* Wortmarke oben */}
      <div style={{ position: 'relative', zIndex: 2, paddingTop: 68 }}>
        <span className="cop-fade-up" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: '#F4EFE6', animationDelay: '0.1s' }}>
          Copara<span style={{ color: '#E8A87C' }}>.</span>
        </span>
      </div>

      {/* Signatur-Animation: zwei Kreise, verbunden über das Kind (Punkt) */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'relative', width: 210, height: 80 }}>
          <span ref={lRef} style={{ position: 'absolute', top: 8, left: '50%', width: 64, height: 64, marginLeft: -32, borderRadius: '50%', border: '2px solid rgba(244,239,230,0.85)', boxSizing: 'border-box', transform: 'translate3d(-14px,0,0)' }} />
          <span ref={rRef} style={{ position: 'absolute', top: 8, left: '50%', width: 64, height: 64, marginLeft: -32, borderRadius: '50%', border: '2px solid #E8A87C', boxSizing: 'border-box', transform: 'translate3d(14px,0,0)' }} />
          <span ref={dRef} style={{ position: 'absolute', top: 33, left: '50%', width: 14, height: 14, marginLeft: -7, borderRadius: '50%', background: '#E8A87C', transform: 'scale(0)', opacity: 0 }} />
        </div>
      </div>

      {/* Hero unten */}
      <div style={{ position: 'relative', zIndex: 2, paddingBottom: 46 }}>
        <p className="cop-fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', animationDelay: '0.3s' }}>Der ruhige Sorgerechts-Kalender</p>
        <h1 className="cop-fade-up" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 52, lineHeight: 0.98, letterSpacing: '-0.03em', color: '#F4EFE6', margin: '16px 0 0', animationDelay: '0.42s' }}>
          Getrennt.<br />Und trotzdem<br /><span style={{ color: '#E8A87C' }}>zusammen.</span>
        </h1>
        <p className="cop-fade-up" style={{ marginTop: 22, fontSize: 16, lineHeight: 1.5, color: 'rgba(244,239,230,0.7)', maxWidth: 320, animationDelay: '0.56s' }}>
          Der ruhige Ort für alles, was eure Kinder betrifft — statt Streit im Chat.
        </p>
        <button className="cop-fade-up" onClick={enter} style={{ marginTop: 30, height: 56, width: '100%', borderRadius: 999, border: 'none', background: '#F4EFE6', color: '#14211B', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, cursor: 'pointer', animationDelay: '0.68s' }}>
          Los geht's
        </button>
        <p className="cop-fade-up" style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'rgba(244,239,230,0.6)', animationDelay: '0.78s' }}>
          Schon dabei? <span style={{ color: '#F4EFE6', fontWeight: 600 }}>Anmelden</span>
        </p>
      </div>
    </div>
  );
}
window.CoparaSplashScreen = SplashScreen;
