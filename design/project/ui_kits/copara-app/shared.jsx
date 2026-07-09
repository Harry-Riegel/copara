/* Copara UI kit — shared shell: type helper, phone frame, tab bar + FAB, Status-Ampel box.
   Uses the DS components via window.CoparaDesignSystem_e5ed8c. */
const DS = window.CoparaDesignSystem_e5ed8c;

const type = {
  display: { margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 32, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--ink-900)' },
  h1: { margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 30, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--ink-900)' },
  h2: { margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 22, lineHeight: 1.3, color: 'var(--ink-900)' },
  h3: { margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 18, lineHeight: 1.3, color: 'var(--ink-900)' },
  body: { margin: 0, fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-900)' },
  muted: { margin: 0, fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-600)' },
  sm: { margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: 'var(--ink-600)' },
  caption: { margin: 0, fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.4, letterSpacing: '0.02em', color: 'var(--ink-400)' },
  overline: { margin: 0, fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, lineHeight: 1.4, letterSpacing: '0.08em', textTransform: 'uppercase' },
};
window.coparaType = type;

/* iPhone status bar — Dynamic Island */
function StatusBar({ dark }) {
  const c = dark ? '#FFFDF7' : 'var(--ink-900)';
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', zIndex: 30, pointerEvents: 'none' }}>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: c }}>9:41</span>
      <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 84, height: 26, background: '#000', borderRadius: 999 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: c }}>●●●</span>
        <span style={{ fontSize: 12, color: c }}>▮</span>
      </div>
    </div>
  );
}
window.CoparaStatusBar = StatusBar;

/* Phone frame — 390×844 */
function PhoneFrame({ children }) {
  return (
    <div style={{ width: 390, height: 844, background: 'var(--sand-50)', borderRadius: 44, position: 'relative', overflow: 'hidden', boxShadow: '0 40px 100px rgba(50,40,20,0.28)', border: '10px solid #141210', boxSizing: 'content-box' }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 34, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}
window.CoparaPhoneFrame = PhoneFrame;

/* Floating tab bar (left pill) + FAB (right) */
function TabBar({ active, onTab, onPlus, todoDot }) {
  const { Icon } = DS;
  const tabs = [
    ['todo', 'list-checks', 'To-Do'],
    ['kalender', 'calendar', 'Kalender'],
    ['familie', 'users', 'Familie'],
  ];
  return (
    <div style={{ position: 'absolute', bottom: 26, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12, zIndex: 40 }}>
      <div style={{ flex: 1, height: 62, background: 'var(--sand-0)', borderRadius: 999, boxShadow: 'var(--shadow-card)', border: '1px solid var(--sand-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 6px' }}>
        {tabs.map(([id, icon, label]) => {
          const on = active === id;
          return (
            <button key={id} onClick={() => onTab(id)} style={{ position: 'relative', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 10px' }}>
              <Icon name={icon} size={23} color={on ? 'var(--wald-700)' : 'var(--ink-400)'} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: on ? 600 : 500, color: on ? 'var(--wald-700)' : 'var(--ink-400)' }}>{label}</span>
              {id === 'todo' && todoDot && !on && (
                <span style={{ position: 'absolute', top: 4, right: 10, width: 8, height: 8, borderRadius: '50%', background: 'var(--apricot-500)' }} />
              )}
            </button>
          );
        })}
      </div>
      <button onClick={onPlus} aria-label="Anfrage stellen" style={{ width: 62, height: 62, borderRadius: '50%', background: 'var(--wald-700)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(46,75,63,0.4)', flexShrink: 0 }}>
        <Icon name="plus" size={28} color="#FFFDF7" />
      </button>
    </div>
  );
}
window.CoparaTabBar = TabBar;

/* Status-Ampel box — die wichtigste Komponente. Feste Anatomie:
   Punkt + Zustandswort → größte Zeile → Kontextzeile → höchstens ein Knopf. */
function StatusAmpel({ state, headline, context, actionLabel, onAction, secondaryLabel, onSecondary }) {
  const skin = {
    clear: { bg: 'var(--status-clear-gradient)', dot: 'var(--status-clear-dot)', ink: 'var(--status-clear-ink)', sub: 'var(--status-clear-sub)', word: 'Alles geregelt' },
    soon: { bg: 'var(--status-soon-gradient)', dot: 'var(--status-soon-dot)', ink: 'var(--status-soon-ink)', sub: 'var(--status-soon-ink)', word: 'Bald dran' },
    now: { bg: 'var(--status-now-gradient)', dot: 'var(--status-now-dot)', ink: 'var(--status-now-ink)', sub: 'var(--status-now-sub)', word: 'Jetzt zu tun' },
  }[state];
  return (
    <div style={{ background: skin.bg, borderRadius: 'var(--radius-lg)', padding: '18px 20px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...type.overline, color: skin.sub }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: skin.dot }} />
        {skin.word}
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 27, lineHeight: 1.2, letterSpacing: '-0.01em', color: skin.ink, margin: '12px 0 8px' }}>{headline}</div>
      {context && <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, color: skin.sub }}>{context}</div>}
      {actionLabel && (
        <button onClick={onAction} style={{ marginTop: 16, width: '100%', height: 54, borderRadius: 999, border: 'none', cursor: 'pointer', background: state === 'now' ? '#FFFDF7' : 'var(--wald-700)', color: state === 'now' ? 'var(--status-now-700)' : '#FFFDF7', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16 }}>{actionLabel}</button>
      )}
      {secondaryLabel && (
        <button onClick={onSecondary} style={{ marginTop: 10, width: '100%', height: 44, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'transparent', color: skin.sub, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14 }}>{secondaryLabel}</button>
      )}
    </div>
  );
}
window.CoparaStatusAmpel = StatusAmpel;

/* Section overline label */
function SectionLabel({ children, style }) {
  return <p style={{ ...type.overline, letterSpacing: '0.06em', color: 'var(--ink-400)', margin: '0 0 10px 4px', ...style }}>{children}</p>;
}
window.CoparaSectionLabel = SectionLabel;

Object.assign(window, { CoparaDS: DS });
