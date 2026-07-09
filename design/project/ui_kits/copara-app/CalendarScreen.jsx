/* Copara UI kit — Kalender: das Beschlossene. Pro-Kind-Umschalter (Alle · Mia · Felix · Emma),
   Drei-Farben-Custody (Wald = bei dir · Aprikose = Markus · Schiefer = Tom), „Als Nächstes".
   Ändern per Tipp öffnet ein Tages-Sheet. */
const calDS = window.CoparaDesignSystem_e5ed8c;

function CalendarScreen({ onDay, focus }) {
  const { Icon, Chip } = calDS;
  const t = window.coparaType;
  const [child, setChild] = React.useState('alle');
  const [showMonth, setShowMonth] = React.useState(!focus);
  React.useEffect(() => { setShowMonth(!focus); }, [focus]);

  // Februar 2026 — 1. Feb ist Sonntag. Mo-erste Woche.
  const leadBlanks = 6;
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const today = 10;

  // Custody pro Kind (Kanon): Mia & Felix bei Markus 9.–15., sonst bei Lisa.
  // Emma bei Tom bis 17., kommt am 18. zu Lisa.
  const locMF = (d) => (d >= 9 && d <= 15 ? 'markus' : 'lisa');
  const locE = (d) => (d < 18 ? 'tom' : 'lisa');
  const P = {
    lisa: { bg: 'var(--wald-100)', ink: 'var(--wald-700)', dot: 'var(--wald-500)' },
    markus: { bg: 'var(--apricot-100)', ink: 'var(--apricot-700)', dot: 'var(--apricot-500)' },
    tom: { bg: 'var(--person-c-100)', ink: 'var(--person-c-700)', dot: 'var(--person-c-500)' },
  };

  const termine = { 11: 'var(--apricot-500)', 16: 'var(--wald-500)', 18: 'var(--person-c-500)', 19: 'var(--wald-500)' };
  const offen = { 28: true };

  const cell = (d) => {
    const isToday = d === today;
    let bg = 'var(--sand-0)', ink = 'var(--ink-600)', border = '1px solid var(--sand-200)', dots = null;
    if (child === 'mia' || child === 'felix') {
      const c = P[locMF(d)]; bg = c.bg; ink = c.ink; border = 'none';
    } else if (child === 'emma') {
      const c = P[locE(d)]; bg = c.bg; ink = c.ink; border = 'none';
    } else {
      const allHome = locMF(d) === 'lisa' && locE(d) === 'lisa';
      bg = allHome ? 'var(--wald-100)' : 'var(--sand-0)';
      border = allHome ? 'none' : '1px solid var(--sand-200)';
      ink = 'var(--ink-900)';
      if (!allHome) dots = [P[locMF(d)].dot, P[locE(d)].dot];
    }
    return (
      <button key={d} onClick={() => onDay(d)} style={{ position: 'relative', height: 44, borderRadius: 'var(--radius-md)', border: isToday ? '2px solid var(--wald-700)' : border, background: bg, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: isToday ? 700 : 500, color: ink }}>{d}</span>
        {dots && (
          <span style={{ position: 'absolute', bottom: 5, display: 'flex', gap: 3 }}>
            {dots.map((c, i) => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />)}
          </span>
        )}
        {!dots && termine[d] && <span style={{ position: 'absolute', bottom: 4, width: 16, height: 3, borderRadius: 2, background: termine[d] }} />}
        {offen[d] && <span style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--apricot-500)' }} />}
      </button>
    );
  };

  // Dynamische Legende je nach Kind
  const legend = child === 'emma'
    ? [['lisa', 'bei dir'], ['tom', 'bei Tom']]
    : child === 'alle'
    ? [['lisa', 'bei dir'], ['markus', 'bei Markus'], ['tom', 'bei Tom']]
    : [['lisa', 'bei dir'], ['markus', 'bei Markus']];

  const kids = [['alle', 'Alle'], ['mia', 'Mia'], ['felix', 'Felix'], ['emma', 'Emma']];

  const next = [
    { icon: 'clock', when: 'Morgen', what: 'Fußball Felix · Markus fährt', tone: 'apricot' },
    { icon: 'arrow-left-right', when: 'In 6 Tagen', what: 'Übergabe an dich · Schule', tone: 'wald' },
    { icon: 'map-pin', when: 'In 8 Tagen', what: 'Emma kommt zu dir · von Tom', tone: 'schiefer' },
    { icon: 'users', when: 'In 9 Tagen', what: 'Abholung durch Oma Anna', tone: 'neutral' },
  ];
  const toneColor = { apricot: 'var(--apricot-500)', wald: 'var(--wald-500)', schiefer: 'var(--person-c-500)', neutral: 'var(--ink-400)' };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--sand-50)' }}>
      <div style={{ padding: '64px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1 style={{ ...t.h1, flex: 1 }}>Kalender<span style={{ color: 'var(--apricot-500)' }}>.</span></h1>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="chevron-left" size={22} color="var(--ink-400)" /></button>
        <span style={{ ...t.h3 }}>Februar</span>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><Icon name="chevron-right" size={22} color="var(--ink-600)" /></button>
      </div>

      {/* Pro-Kind-Umschalter (Premium) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto' }}>
          {kids.map(([id, l]) => {
            const on = child === id;
            return (
              <button key={id} onClick={() => setChild(id)} style={{ flexShrink: 0, height: 34, padding: '0 15px', borderRadius: 999, border: on ? 'none' : '1px solid var(--sand-200)', cursor: 'pointer', background: on ? 'var(--wald-700)' : 'var(--sand-0)', color: on ? '#FFFDF7' : 'var(--ink-600)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>{l}</button>
            );
          })}
        </div>
        <Chip tone="premium">Pro Kind</Chip>
      </div>

      {/* Legende */}
      {showMonth && (
        <div style={{ display: 'flex', gap: 16, padding: '14px 20px 0', flexWrap: 'wrap' }}>
          {legend.map(([p, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 4, background: P[p].bg, border: `1px solid ${P[p].dot}` }} />
              <span style={t.caption}>{l}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--apricot-500)' }} />
            <span style={t.caption}>offen</span>
          </div>
        </div>
      )}

      {/* Raster oder Klartext (Fokus) */}
      {showMonth ? (
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6 }}>
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((d) => <span key={d} style={{ textAlign: 'center', ...t.caption, fontWeight: 600 }}>{d}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
            {Array.from({ length: leadBlanks }).map((_, i) => <div key={'b' + i} />)}
            {days.map(cell)}
          </div>
        </div>
      ) : (
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ background: 'var(--wald-100)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
            <p style={{ ...t.overline, letterSpacing: '0.06em', color: 'var(--wald-500)', marginBottom: 8 }}>Diese Woche</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: 'var(--wald-700)' }}>Mia &amp; Felix bei Markus, Emma bei Tom.</p>
            <p style={{ ...t.sm, color: 'var(--wald-700)', marginTop: 6 }}>Zurück zu dir am Mo, 16. Feb, 8:00.</p>
          </div>
          <button onClick={() => setShowMonth(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, border: 'none', background: 'none', cursor: 'pointer', padding: '14px 2px 0', color: 'var(--ink-600)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>
            <Icon name="calendar" size={16} color="var(--ink-600)" /> Monat anzeigen
          </button>
        </div>
      )}

      {/* Als Nächstes */}
      <div style={{ padding: '22px 16px 140px' }}>
        <window.CoparaSectionLabel style={{ marginLeft: 4 }}>Als Nächstes — vereinbart</window.CoparaSectionLabel>
        <div style={{ background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand-200)', overflow: 'hidden' }}>
          {next.map((n, i) => (
            <button key={i} onClick={() => onDay(19)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: 'none', borderTop: i ? '1px solid var(--sand-200)' : 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--sand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={n.icon} size={17} color={toneColor[n.tone]} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600, color: 'var(--ink-900)' }}>{n.when}</div>
                <div style={{ ...t.sm, marginTop: 1 }}>{n.what}</div>
              </div>
              <Icon name="chevron-right" size={17} color="var(--ink-400)" />
            </button>
          ))}
        </div>
        <p style={{ ...t.caption, textAlign: 'center', marginTop: 12 }}>Ändern per Tipp — alles Offene wartet im To-Do.</p>
      </div>
    </div>
  );
}
window.CoparaCalendarScreen = CalendarScreen;
