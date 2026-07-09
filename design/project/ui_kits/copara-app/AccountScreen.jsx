/* Copara UI kit — Konto (über den Avatar): Profil, Anzeige (Fokus-Modus), Konto-Sektionen.
   Alle Zeilen öffnen ein echtes Sheet. */
const accDS = window.CoparaDesignSystem_e5ed8c;

function SettingToggle({ label, def, sub }) {
  const [on, setOn] = React.useState(def);
  const t = window.coparaType;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
      <div style={{ flex: 1 }}>
        <div style={{ ...t.body, fontSize: 15 }}>{label}</div>
        {sub && <div style={{ ...t.caption, marginTop: 2 }}>{sub}</div>}
      </div>
      <button onClick={() => setOn(!on)} aria-label={label} style={{ width: 48, height: 28, borderRadius: 999, border: 'none', cursor: 'pointer', background: on ? 'var(--wald-700)' : 'var(--sand-200)', position: 'relative', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: '50%', background: '#FFFDF7', transition: 'left var(--transition-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </button>
    </div>
  );
}

function AccountScreen({ onBack, focus, onFocus }) {
  const { Icon, Avatar, Chip, Sheet, Button } = accDS;
  const t = window.coparaType;
  const [sheet, setSheet] = React.useState(null);
  const flatCard = { background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand-200)', overflow: 'hidden' };
  const row = (icon, label, value, valueColor, key, first) => (
    <button onClick={() => setSheet(key)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: first ? 'none' : '1px solid var(--sand-200)', cursor: 'pointer', background: 'none', border: 'none' }}>
      <Icon name={icon} size={19} color="var(--ink-600)" />
      <span style={{ ...t.body, fontSize: 15, flex: 1 }}>{label}</span>
      {value && <span style={{ ...t.sm, color: valueColor || 'var(--ink-600)' }}>{value}</span>}
      <Icon name="chevron-right" size={17} color="var(--ink-400)" />
    </button>
  );

  const sheetContent = {
    premium: { title: 'Copara Premium', body: (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--sand-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px' }}>
          <Icon name="crown" size={18} color="var(--gold-500)" /><span style={{ ...t.sm, color: 'var(--ink-900)', fontWeight: 600 }}>Aktiv · eine Familie, ein Abo · 4,99 €/Monat</span>
        </div>
        <p style={t.sm}>Großeltern, die abholen. Ein Au-pair, das Bescheid wissen muss. Ein zweiter Ex-Partner mit eigenen Tagen. Premium bindet alle ein, die bei euren Kindern helfen — jede Person sieht genau das, was sie braucht, und kein bisschen mehr.</p>
        {[
          ['Oma, Opa & Au-pair einladen', 'Sie sehen nur die Tage und Termine ihres Kindes — ohne in euren Nachrichten mitzulesen.'],
          ['Notfall-Helfer, wenn keiner kann', 'Antwortet der andere Elternteil nicht, fragt Copara automatisch Oma & Opa. Kein Kind bleibt ohne Abholung.'],
          ['Eine Frage an alle gleichzeitig', '„Wer holt Mia am Freitag?" — die Erste, die zusagt, übernimmt. Kein Herumtelefonieren.'],
          ['Mehrere Kinder getrennt planen', 'Jedes Kind mit eigenem Kalender und eigenen Übergaben — auch bei verschiedenen Vätern.'],
          ['Erinnerungen, die mitdenken', 'Vor dem Arzttermin die Gesundheitskarte, vor der Auslandsreise die Reise-Erlaubnis — automatisch.'],
          ['Monatsübersicht als PDF', 'Wer hatte die Kinder wann — sauber dokumentiert für Anwältin, Jugendamt oder Mediation.'],
        ].map(([title, sub]) => (
          <div key={title} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <Icon name="check" size={16} color="var(--wald-500)" style={{ marginTop: 3 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, fontWeight: 600, color: 'var(--ink-900)' }}>{title}</div>
              <div style={{ ...t.caption, marginTop: 1 }}>{sub}</div>
            </div>
          </div>
        ))}
      </>
    ) },
    focus: { title: 'Fokus-Modus', body: (
      <>
        <p style={t.sm}>Eine Sache nach der anderen, ganz in Ruhe. Du siehst immer nur den nächsten Schritt — „Später" schiebt etwas nach hinten, und am Schluss steht die Gewissheit: „Das war alles."</p>
        <SettingToggle label="Fokus-Modus" sub="Immer nur eine Sache anzeigen" def={focus} />
      </>
    ) },
    bell: { title: 'Benachrichtigungen', body: (
      <>
        <p style={{ ...t.sm, marginBottom: 6 }}>Nur was wichtig ist, nie Marketing.</p>
        {[['Neue Anfragen', true], ['Antworten & Bestätigungen', true], ['Erinnerung vor Übergaben', true], ['Notfall-Eskalationen', true], ['Produkt-Neuigkeiten', false]].map(([l, d]) => <SettingToggle key={l} label={l} def={d} />)}
      </>
    ) },
    sync: { title: 'Kalender-Sync', body: (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--wald-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px' }}>
          <Icon name="check" size={16} color="var(--wald-700)" /><span style={{ ...t.sm, color: 'var(--wald-700)', fontWeight: 600 }}>Aktiv — zuletzt synchronisiert vor 2 Minuten</span>
        </div>
        <p style={t.sm}>Bestätigte Wechsel und Termine landen automatisch in deinem iOS-Kalender — Änderungen werden mitgeführt.</p>
        <SettingToggle label="Mit iOS-Kalender synchronisieren" def={true} />
        <SettingToggle label="Erinnerung 1 Tag vor Übergabe" def={true} />
      </>
    ) },
    stats: { title: 'Februar in Zahlen', premium: true, body: (
      <>
        {[['Lisa', '14 Tage', 'var(--wald-500)'], ['Markus', '14 Tage', 'var(--apricot-500)']].map(([name, val, color]) => (
          <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><span style={{ ...t.sm, fontWeight: 600, color: 'var(--ink-900)' }}>{name}</span><span style={t.sm}>{val}</span></div>
            <div style={{ height: 8, borderRadius: 4, background: 'var(--sand-100)' }}><div style={{ width: '50%', height: '100%', borderRadius: 4, background: color }} /></div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--sand-200)', paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ ...t.sm, fontWeight: 600, color: 'var(--ink-900)' }}>Tausch-Bilanz</span><span style={{ ...t.sm, fontWeight: 600, color: 'var(--wald-700)' }}>+1 Tag für dich</span></div>
          <p style={{ ...t.caption, marginTop: 4 }}>Neutral & still protokolliert — die Zahlen sprechen, nicht die App.</p>
        </div>
        <Button variant="secondary" size="large">Als PDF exportieren</Button>
      </>
    ) },
    verlauf: { title: 'Verlauf & Entschieden', body: (
      <>
        <p style={{ ...t.sm, marginBottom: 4 }}>Still protokolliert — fair für beide Seiten.</p>
        {[['10.02. · 14:07', 'Oma Anna hat den 28. Februar übernommen.'], ['09.02. · 19:20', 'Tausch bestätigt: Emma kommt Mi, 18. Feb.'], ['06.02. · 08:15', 'Ferien-Anfrage an Markus gesendet.'], ['03.02. · 16:40', 'Fußball Felix in den Kalender übernommen.']].map(([ts, txt]) => (
          <div key={ts} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid var(--sand-200)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-400)', width: 92, flexShrink: 0 }}>{ts}</span>
            <span style={t.sm}>{txt}</span>
          </div>
        ))}
      </>
    ) },
    privacy: { title: 'Datenschutz', body: (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--wald-100)', borderRadius: 'var(--radius-sm)', padding: '12px 14px' }}>
          <Icon name="shield" size={17} color="var(--wald-700)" /><span style={{ ...t.sm, color: 'var(--wald-700)', fontWeight: 600 }}>Streng geschützt</span>
        </div>
        <p style={t.sm}>Nur eure Familie sieht eure Daten — niemals verkauft, niemals geteilt. (DSGVO)</p>
        <SettingToggle label="Aktivität still protokollieren" sub="Für faire Nachweise — nur für euch sichtbar" def={true} />
      </>
    ) },
  };
  const sc = sheet ? sheetContent[sheet] : null;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--sand-50)', position: 'relative' }}>
      <div style={{ padding: '56px 20px 0' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: 'var(--ink-600)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
          <Icon name="chevron-left" size={18} color="var(--ink-600)" /> Zurück
        </button>
      </div>
      <div style={{ padding: '16px 20px 12px' }}><h1 style={t.h1}>Konto<span style={{ color: 'var(--apricot-500)' }}>.</span></h1></div>

      <div style={{ padding: '0 16px 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name="Lisa Wagner" tone="wald" size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600, color: 'var(--ink-900)' }}>Lisa Wagner</div>
            <div style={{ ...t.caption, marginTop: 2 }}>lisa@example.de · Familie Wagner</div>
          </div>
          <Icon name="pencil" size={16} color="var(--ink-400)" />
        </div>

        <button onClick={() => setSheet('premium')} style={{ ...flatCard, width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
          <Icon name="crown" size={19} color="var(--gold-500)" />
          <span style={{ ...t.body, fontSize: 15, flex: 1, fontWeight: 600 }}>Copara Premium</span>
          <Chip tone="premium">Aktiv · Familie</Chip>
        </button>

        {/* Anzeige — Fokus-Modus */}
        <div>
          <window.CoparaSectionLabel>Anzeige</window.CoparaSectionLabel>
          <div style={{ ...flatCard, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="sun" size={19} color="var(--wald-700)" />
              <span style={{ ...t.body, fontSize: 15, flex: 1, fontWeight: 600 }}>Fokus-Modus</span>
              <button onClick={() => onFocus(!focus)} aria-label="Fokus-Modus" style={{ width: 52, height: 30, borderRadius: 999, border: 'none', cursor: 'pointer', background: focus ? 'var(--wald-700)' : 'var(--sand-200)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: 3, left: focus ? 25 : 3, width: 24, height: 24, borderRadius: '50%', background: '#FFFDF7', transition: 'left var(--transition-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
            <p style={{ ...t.sm, marginTop: 10 }}>Eine Sache nach der anderen — ganz in Ruhe. Du siehst immer nur den nächsten Schritt, alles andere bleibt griffbereit.</p>
          </div>
        </div>

        <div>
          <window.CoparaSectionLabel>Konto</window.CoparaSectionLabel>
          <div style={flatCard}>
            {row('rotate-ccw', 'Verlauf & Entschieden', null, null, 'verlauf', true)}
            {row('bell', 'Benachrichtigungen', 'An', null, 'bell')}
            {row('calendar', 'Kalender-Sync', 'Aktiv', 'var(--wald-500)', 'sync')}
            {row('chart-column', 'Statistik & Export', null, null, 'stats')}
            {row('shield', 'Datenschutz', 'Streng geschützt', null, 'privacy')}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 16px', cursor: 'pointer' }}>
          <Icon name="log-out" size={19} color="var(--ink-600)" />
          <span style={t.muted}>Abmelden</span>
        </div>

        <p style={{ ...t.caption, textAlign: 'center' }}>
          Copara 1.0 · Getrennt und trotzdem zusammen!<br />
          Deine Daten gehören deiner Familie — niemals verkauft, niemals geteilt. (DSGVO)
        </p>
      </div>

      <Sheet open={!!sheet} onClose={() => setSheet(null)} height="72%">
        {sc && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ ...t.h2, flex: 1 }}>{sc.title}</h2>
              {sc.premium && <Chip tone="premium">Premium</Chip>}
            </div>
            {sc.body}
            <div style={{ marginTop: 'auto', paddingBottom: 6 }}>
              <Button variant="tertiary" size="large" onClick={() => setSheet(null)} style={{ width: '100%' }}>Fertig</Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
window.CoparaAccountScreen = AccountScreen;
