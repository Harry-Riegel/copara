/* Copara UI kit — Flows als Bottom-Sheets: Antworten (Bestätigen/Gegenvorschlag/Später),
   Anfrage stellen (Plus), Person hinzufügen, Tages-Sheet. */
const flowDS = window.CoparaDesignSystem_e5ed8c;

/* Antworten — Bill-Eddy-Methode: nie „Ablehnen". Ton-Check als sanftes Angebot. */
function AnswerSheet({ open, task, onClose, onDone }) {
  const { Sheet, Button, Icon, Avatar } = flowDS;
  const t = window.coparaType;
  if (!task) return <Sheet open={open} onClose={onClose} height="1%"><div /></Sheet>;
  const broadcast = task.who === 'Broadcast';
  return (
    <Sheet open={open} onClose={onClose} height="66%">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={broadcast ? 'An Alle' : task.who} tone={task.tone} size={44} />
          <div style={{ flex: 1 }}>
            <p style={t.caption}>{broadcast ? 'Frage an alle' : `${task.kind} von ${task.who}`}</p>
            <h2 style={{ ...t.h2, fontSize: 20, marginTop: 2 }}>{task.title}</h2>
          </div>
        </div>
        <p style={t.sm}>{task.ctx}</p>
        <div style={{ background: 'var(--sand-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={17} color="var(--wald-500)" style={{ marginTop: 1 }} />
          <span style={t.sm}>{broadcast ? 'Erste Zusage gewinnt · du kannst 24 h widersprechen.' : 'Tust du nichts, bleibt die Anfrage offen — kein Druck.'}</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 6 }}>
          <Button size="large" onClick={onDone}>{broadcast ? 'Ich übernehme' : 'Bestätigen'}</Button>
          <Button variant="secondary" size="large" onClick={onDone}>Gegenvorschlag</Button>
          <Button variant="tertiary" size="large" onClick={onClose}>Später</Button>
        </div>
      </div>
    </Sheet>
  );
}
window.CoparaAnswerSheet = AnswerSheet;

/* Broadcast (#4a) — „An alle": erste Zusage gewinnt. Personenliste mit Status. */
function BroadcastSheet({ open, onClose, onResult }) {
  const { Sheet, Button, Icon, Avatar, Chip } = flowDS;
  const t = window.coparaType;
  const people = [
    { name: 'Oma Anna', tone: 'neutral', status: 'übernimmt', chip: 'wald' },
    { name: 'Markus Berg', tone: 'apricot', status: 'nicht nötig', chip: 'neutral', dim: true },
    { name: 'Opa Heinz', tone: 'neutral', status: 'nicht nötig', chip: 'neutral', dim: true },
    { name: 'Au-pair Sofia', tone: 'neutral', status: 'nicht nötig', chip: 'neutral', dim: true },
  ];
  return (
    <Sheet open={open} onClose={onClose} height="78%">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <div>
          <p style={t.caption}>Frage an alle</p>
          <h2 style={{ ...t.h2, fontSize: 21, marginTop: 2 }}>Wer übernimmt den 28. Februar?</h2>
          <p style={{ ...t.sm, marginTop: 6 }}>Kinderarzt Mia, 14:00 · erste Zusage gewinnt.</p>
        </div>
        <div style={{ background: 'var(--sand-0)', border: '1px solid var(--sand-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {people.map((p, i) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderTop: i ? '1px solid var(--sand-200)' : 'none', opacity: p.dim ? 0.5 : 1 }}>
              <Avatar name={p.name} tone={p.tone} size={38} />
              <span style={{ ...t.body, fontSize: 15, fontWeight: 600, flex: 1 }}>{p.name}</span>
              <Chip tone={p.chip}>{p.status}</Chip>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--sand-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={17} color="var(--wald-500)" style={{ marginTop: 1 }} />
          <span style={t.sm}>Oma Anna hat zugesagt. Du kannst bis Mi, 14:02 widersprechen — sonst gilt ihre Zusage.</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 6 }}>
          <Button size="large" onClick={() => onResult('bestätigt')}>Passt für mich</Button>
          <Button variant="tertiary" size="large" onClick={() => onResult('übernommen')}>Ich übernehme lieber selbst</Button>
        </div>
      </div>
    </Sheet>
  );
}
window.CoparaBroadcastSheet = BroadcastSheet;

/* Anfrage stellen (Plus) */
function RequestSheet({ open, onClose, onSent }) {
  const { Sheet, Button, Icon, Chip } = flowDS;
  const t = window.coparaType;
  const [span, setSpan] = React.useState('zeitraum');
  const [rcpt, setRcpt] = React.useState('markus');
  const seg = [['tag', 'Ein Tag'], ['zeitraum', 'Zeitraum'], ['serie', 'Serie']];
  const rcpts = [
    { id: 'markus', label: 'An Markus', sub: 'direkt an den anderen Elternteil', premium: false },
    { id: 'alle', label: 'An alle', sub: 'erste Zusage gewinnt', premium: true },
    { id: 'oma', label: 'Nur an Oma & Opa', sub: 'Bezugspersonen', premium: true },
  ];
  return (
    <Sheet open={open} onClose={onClose} height="82%">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        <h2 style={t.h2}>Anfrage stellen</h2>
        {/* Segment */}
        <div style={{ display: 'flex', background: 'var(--sand-100)', borderRadius: 999, padding: 4 }}>
          {seg.map(([id, l]) => (
            <button key={id} onClick={() => setSpan(id)} style={{ flex: 1, height: 38, borderRadius: 999, border: 'none', cursor: 'pointer', background: span === id ? 'var(--sand-0)' : 'transparent', color: span === id ? 'var(--ink-900)' : 'var(--ink-600)', boxShadow: span === id ? 'var(--shadow-card)' : 'none', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>{l}</button>
          ))}
        </div>
        {/* Datum */}
        <div style={{ background: 'var(--sand-0)', border: '1px solid var(--sand-200)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="calendar" size={20} color="var(--wald-700)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>30. März – 3. April</div>
            <div style={t.sm}>5 Tage · Osterferien · Mia & Felix</div>
          </div>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--wald-700)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>Ändern</button>
        </div>
        {/* Empfänger */}
        <div>
          <window.CoparaSectionLabel>Empfänger</window.CoparaSectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rcpts.map((r) => {
              const on = rcpt === r.id;
              return (
                <button key={r.id} onClick={() => setRcpt(r.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', border: on ? '2px solid var(--wald-700)' : '1px solid var(--sand-200)', background: on ? 'var(--wald-100)' : 'var(--sand-0)' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: on ? '6px solid var(--wald-700)' : '2px solid var(--ink-400)', boxSizing: 'border-box' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{r.label}</div>
                    <div style={t.sm}>{r.sub}</div>
                  </div>
                  {r.premium && <Chip tone="premium">Premium</Chip>}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ background: 'var(--sand-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={17} color="var(--amber-500)" style={{ marginTop: 1 }} />
          <span style={t.sm}>Auslandsferien? Copara erinnert an die Reise-Erlaubnis. Gegentag ist optional.</span>
        </div>
        <div style={{ marginTop: 'auto', paddingBottom: 6 }}>
          <Button size="large" onClick={onSent} style={{ width: '100%' }}>Weiter</Button>
        </div>
      </div>
    </Sheet>
  );
}
window.CoparaRequestSheet = RequestSheet;

/* Person hinzufügen */
function AddPersonSheet({ open, onClose }) {
  const { Sheet, Button, Icon } = flowDS;
  const t = window.coparaType;
  const [role, setRole] = React.useState('co');
  const [kids, setKids] = React.useState({ Mia: true, Felix: true, Emma: false });
  return (
    <Sheet open={open} onClose={onClose} height="80%">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        <h2 style={t.h2}>Person hinzufügen</h2>
        <div>
          <window.CoparaSectionLabel>Rolle</window.CoparaSectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['co', 'Co-Elternteil', 'gleichberechtigt für seine Kinder'], ['bezug', 'Bezugsperson', 'sieht nur ihren Ausschnitt']].map(([id, l, s]) => {
              const on = role === id;
              return (
                <button key={id} onClick={() => setRole(id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 15px', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', border: on ? '2px solid var(--wald-700)' : '1px solid var(--sand-200)', background: on ? 'var(--wald-100)' : 'var(--sand-0)' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: on ? '6px solid var(--wald-700)' : '2px solid var(--ink-400)', boxSizing: 'border-box' }} />
                  <div><div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{l}</div><div style={t.sm}>{s}</div></div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <window.CoparaSectionLabel>Für welche Kinder?</window.CoparaSectionLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.keys(kids).map((k) => (
              <button key={k} onClick={() => setKids((c) => ({ ...c, [k]: !c[k] }))} style={{ height: 40, padding: '0 18px', borderRadius: 999, cursor: 'pointer', border: kids[k] ? '2px solid var(--wald-700)' : '1px solid var(--sand-200)', background: kids[k] ? 'var(--wald-700)' : 'var(--sand-0)', color: kids[k] ? '#FFFDF7' : 'var(--ink-600)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>{k}</button>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--sand-100)', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'center' }}>
          <p style={t.sm}>Teile diesen Code mit der Person, die du einladen möchtest:</p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, letterSpacing: '0.16em', color: 'var(--wald-700)', fontWeight: 400, margin: '8px 0' }}>T7KM2P</div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--wald-700)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}><Icon name="copy" size={15} color="var(--wald-700)" /> Code kopieren</button>
          <p style={{ ...t.caption, marginTop: 10 }}>Beim Einrichten der App wird der Code einmal eingegeben — dann seid ihr verbunden.</p>
        </div>
        <p style={{ ...t.caption, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><Icon name="shield" size={13} color="var(--ink-400)" /> Nur eure Familie sieht eure Daten — niemals verkauft, niemals geteilt.</p>
        <div style={{ marginTop: 'auto', paddingBottom: 6 }}><Button size="large" onClick={onClose} style={{ width: '100%' }}>Fertig</Button></div>
      </div>
    </Sheet>
  );
}
window.CoparaAddPersonSheet = AddPersonSheet;

/* Tages-Sheet (Ändern per Tipp) */
function DaySheet({ open, onClose, onRequest }) {
  const { Sheet, Button, Icon } = flowDS;
  const t = window.coparaType;
  return (
    <Sheet open={open} onClose={onClose} height="58%">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <div>
          <p style={t.caption}>bei dir</p>
          <h2 style={t.h2}>Donnerstag, 19. Februar</h2>
        </div>
        <div style={{ background: 'var(--sand-0)', border: '1px solid var(--sand-200)', borderRadius: 'var(--radius-md)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--sand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="users" size={17} color="var(--ink-600)" /></span>
          <div style={{ flex: 1 }}><div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>Abholung durch Oma Anna</div><div style={t.sm}>15:30</div></div>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--wald-700)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>Ändern</button>
        </div>
        <p style={t.sm}>Änderungen gehen als ruhige Anfrage an die Beteiligten — nichts wird überschrieben.</p>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 6 }}>
          <Button size="large" onClick={onRequest}>Wechsel für diesen Tag anfragen</Button>
          <Button variant="tertiary" size="large" onClick={onClose}>Später</Button>
        </div>
      </div>
    </Sheet>
  );
}
window.CoparaDaySheet = DaySheet;
