/* Copara UI kit — „Als Oma Anna ansehen": Klartext-Dritt-Ansicht (Runde 5).
   Bezugspersonen sehen ganze Sätze statt Raster, nur ihren Ausschnitt (Mia & Felix). */
const omaDS = window.CoparaDesignSystem_e5ed8c;

function OmaView({ onExit }) {
  const { Icon, Avatar } = omaDS;
  const t = window.coparaType;
  const card = { background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand-200)', padding: 18 };
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--sand-50)' }}>
      <div style={{ position: 'sticky', top: 0, background: 'var(--apricot-100)', padding: '54px 20px 12px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
        <Icon name="eye" size={17} color="var(--apricot-700)" />
        <span style={{ ...t.sm, color: 'var(--apricot-700)', fontWeight: 600, flex: 1 }}>Vorschau: So sieht Oma Anna eure Familie</span>
        <button onClick={onExit} style={{ border: 'none', background: 'var(--sand-0)', borderRadius: 999, cursor: 'pointer', padding: '6px 12px', color: 'var(--apricot-700)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>Schließen</button>
      </div>

      <div style={{ padding: '18px 20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name="Oma Anna" tone="neutral" size={44} />
          <div>
            <h1 style={{ ...t.h1, fontSize: 24 }}>Hallo Anna</h1>
            <p style={t.sm}>Du siehst mit: Mia &amp; Felix</p>
          </div>
        </div>

        {/* Bitte um Hilfe — Aprikose (wie offene Anfragen bei den Eltern) */}
        <div style={{ background: 'var(--apricot-100)', borderRadius: 'var(--radius-lg)', padding: 18 }}>
          <p style={{ ...t.overline, letterSpacing: '0.06em', color: 'var(--apricot-700)', marginBottom: 8 }}>Kannst du helfen?</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600, color: 'var(--apricot-700)', lineHeight: 1.4 }}>Am 28. Februar wird jemand für Mias Arzttermin gebraucht.</p>
          <p style={{ ...t.sm, color: 'var(--apricot-700)', marginTop: 6 }}>Kinderarzt, 14:00. Du hast schon zugesagt — danke.</p>
        </div>

        {/* Reine Info — neutral */}
        <div style={card}>
          <p style={{ ...t.overline, letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 8 }}>Als Nächstes</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={t.body}>Do, 19. Februar, 15:30 — du holst Felix von der Schule.</p>
            <p style={{ ...t.muted, fontSize: 15 }}>Mo, 16. Februar — die Kinder sind wieder bei Lisa.</p>
          </div>
        </div>

        <p style={{ ...t.caption, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Icon name="shield" size={13} color="var(--ink-400)" /> Du siehst nur, was für Mia &amp; Felix wichtig ist — sonst nichts.
        </p>
      </div>
    </div>
  );
}
window.CoparaOmaView = OmaView;
