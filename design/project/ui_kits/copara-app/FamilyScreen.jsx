/* Copara UI kit — Familie: Mitglieder & Rollen (pro Kind), Premium, „Als Oma Anna ansehen",
   Person hinzufügen. Kinder & Erwachsene sind antippbar → bearbeiten / entfernen. */
const famDS = window.CoparaDesignSystem_e5ed8c;

function FamilyScreen({ onAddPerson, onPaywall, onOmaView }) {
  const { Icon, Avatar, Chip, Sheet, Button } = famDS;
  const t = window.coparaType;
  const card = { background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand-200)', overflow: 'hidden' };

  const [kids, setKids] = React.useState([
    { name: 'Mia', parents: [['LW', 'wald'], ['MB', 'apricot']], sub: 'Lisa & Markus' },
    { name: 'Felix', parents: [['LW', 'wald'], ['MB', 'apricot']], sub: 'Lisa & Markus' },
    { name: 'Emma', parents: [['LW', 'wald'], ['TB', 'schiefer']], sub: 'Lisa & Tom' },
  ]);
  const [adults, setAdults] = React.useState([
    { name: 'Lisa Wagner', tone: 'wald', role: 'Du · alle Kinder', you: true },
    { name: 'Markus Berg', tone: 'apricot', role: 'Co-Elternteil · Mia & Felix' },
    { name: 'Tom Baumann', tone: 'schiefer', role: 'Co-Elternteil · Emma' },
    { name: 'Oma Anna', tone: 'neutral', role: 'Bezugsperson · lesen mit (Mia & Felix)' },
  ]);
  const [sel, setSel] = React.useState(null); // { type, data }
  const [confirm, setConfirm] = React.useState(false);
  const close = () => { setSel(null); setConfirm(false); };
  const remove = () => {
    if (sel.type === 'kind') setKids((k) => k.filter((x) => x.name !== sel.data.name));
    else setAdults((a) => a.filter((x) => x.name !== sel.data.name));
    close();
  };

  const toneAvatar = { wald: 'var(--wald-100)', apricot: 'var(--apricot-100)', schiefer: 'var(--person-c-100)' };
  const toneInk = { wald: 'var(--wald-700)', apricot: 'var(--apricot-700)', schiefer: 'var(--person-c-700)' };

  const editRow = (icon, label, first) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 4px', borderTop: first ? 'none' : '1px solid var(--sand-200)', cursor: 'pointer' }}>
      <Icon name={icon} size={19} color="var(--ink-600)" />
      <span style={{ ...t.body, fontSize: 15, flex: 1 }}>{label}</span>
      <Icon name="chevron-right" size={17} color="var(--ink-400)" />
    </div>
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--sand-50)', position: 'relative' }}>
      <div style={{ padding: '64px 20px 8px' }}>
        <h1 style={t.h1}>Eure Familie<span style={{ color: 'var(--apricot-500)' }}>.</span></h1>
        <p style={{ ...t.sm, marginTop: 4 }}>Eltern gelten pro Kind — jede Person plant und sieht nur ihre Kinder.</p>
      </div>

      <div style={{ padding: '10px 16px 140px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Kinder */}
        <div>
          <window.CoparaSectionLabel>Kinder</window.CoparaSectionLabel>
          <div style={card}>
            {kids.map((k, i) => (
              <button key={k.name} onClick={() => setSel({ type: 'kind', data: k })} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? '1px solid var(--sand-200)' : 'none', cursor: 'pointer' }}>
                <Avatar name={k.name} tone="neutral" size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{k.name}</div>
                  <div style={t.sm}>{k.sub}</div>
                </div>
                <div style={{ display: 'flex' }}>
                  {k.parents.map(([ini, tone], j) => (
                    <span key={j} style={{ width: 28, height: 28, borderRadius: '50%', background: toneAvatar[tone], color: toneInk[tone], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, marginLeft: j ? -8 : 0, border: '2px solid var(--sand-0)' }}>{ini}</span>
                  ))}
                </div>
                <Icon name="chevron-right" size={17} color="var(--ink-400)" style={{ marginLeft: 4 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Erwachsene */}
        <div>
          <window.CoparaSectionLabel>Erwachsene</window.CoparaSectionLabel>
          <div style={card}>
            {adults.map((a, i) => (
              <button key={a.name} onClick={() => setSel({ type: 'adult', data: a })} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? '1px solid var(--sand-200)' : 'none', cursor: 'pointer' }}>
                <Avatar name={a.name} tone={a.tone} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{a.name}</div>
                  <div style={t.sm}>{a.role}</div>
                </div>
                <Icon name="chevron-right" size={17} color="var(--ink-400)" />
              </button>
            ))}
            <button onClick={onAddPerson} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: '1px solid var(--sand-200)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--wald-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="user-plus" size={19} color="var(--wald-700)" /></span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--wald-700)', flex: 1 }}>Person hinzufügen</span>
              <Chip tone="premium">Premium</Chip>
            </button>
          </div>
        </div>

        {/* Premium */}
        <div style={{ background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--premium-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="crown" size={20} color="var(--gold-900)" /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>Premium ist aktiv</div>
            <div style={t.sm}>Trägt das Netz um eure Kinder · 4,99 €/Monat</div>
          </div>
          <Chip tone="premium">aktiv</Chip>
        </div>

        {/* Als Oma Anna ansehen */}
        <button onClick={onOmaView} style={{ ...card, width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left' }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--sand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="eye" size={19} color="var(--ink-600)" /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>Als Oma Anna ansehen</div>
            <div style={t.sm}>So sieht die Bezugsperson eure Familie.</div>
          </div>
          <Icon name="chevron-right" size={17} color="var(--ink-400)" />
        </button>

        <p style={{ ...t.caption, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Icon name="shield" size={13} color="var(--ink-400)" /> Nur eure Familie sieht eure Daten — niemals verkauft, niemals geteilt.
        </p>
      </div>

      {/* Person bearbeiten / entfernen */}
      <Sheet open={sel !== null} onClose={close} height="62%">
        {sel && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={sel.data.name} tone={sel.type === 'kind' ? 'neutral' : sel.data.tone} size={48} />
              <div>
                <h2 style={{ ...t.h2, fontSize: 21 }}>{sel.data.name}</h2>
                <p style={t.sm}>{sel.type === 'kind' ? sel.data.sub : sel.data.role}</p>
              </div>
            </div>

            {sel.type === 'kind' ? (
              <div>
                {editRow('pencil', 'Name & Geburtstag', true)}
                {editRow('file-text', 'Info-Seite — Gesundheit, Schule, Größen')}
                {editRow('users', 'Eltern & Zuständigkeit')}
              </div>
            ) : (
              <div>
                {editRow('pencil', 'Name bearbeiten', true)}
                {editRow('users', sel.data.you ? 'Deine Zuständigkeit' : 'Rolle & Kinder')}
                {editRow('bell', 'Benachrichtigungen')}
              </div>
            )}

            {/* Entfernen */}
            <div style={{ marginTop: 'auto', paddingBottom: 6 }}>
              {sel.type === 'adult' && sel.data.you ? (
                <p style={{ ...t.caption, textAlign: 'center' }}>Das bist du — dein Zugang bleibt bestehen.</p>
              ) : confirm ? (
                <div style={{ background: 'var(--sand-100)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                  <p style={{ ...t.sm, color: 'var(--ink-900)', textAlign: 'center', marginBottom: 12 }}>
                    {sel.type === 'kind'
                      ? `${sel.data.name} aus eurer Familie entfernen? Kalender und Infos werden gelöst.`
                      : `${sel.data.name.split(' ')[0]} den Zugang entziehen? Die Person sieht eure Familie dann nicht mehr.`}
                  </p>
                  <button onClick={remove} style={{ width: '100%', height: 52, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'var(--clay-500)', color: '#FFFDF7', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600 }}>
                    {sel.type === 'kind' ? 'Endgültig entfernen' : 'Zugang entziehen'}
                  </button>
                  <button onClick={() => setConfirm(false)} style={{ width: '100%', height: 44, marginTop: 8, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-600)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}>Abbrechen</button>
                </div>
              ) : (
                <button onClick={() => setConfirm(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: 48, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--clay-500)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600 }}>
                  <Icon name="x" size={17} color="var(--clay-500)" />
                  {sel.type === 'kind' ? 'Kind entfernen' : 'Aus Familie entfernen'}
                </button>
              )}
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
window.CoparaFamilyScreen = FamilyScreen;
