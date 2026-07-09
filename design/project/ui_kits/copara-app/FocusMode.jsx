/* Copara UI kit — Fokus-Modus (Runde 6). Reiner Anzeige-Modus: zeigt immer nur EINE Sache.
   Zähler, ein Auftrag (Status-Ampel), ein Knopf, „Später — kommt ans Ende".
   Endzustand IMMER die Garantie-Karte: „Das war alles. Du hast nichts übersehen." */
const focusDS = window.CoparaDesignSystem_e5ed8c;

function FocusTodo(props) {
  const scenario = props.scenario || window.CoparaScenarios.zwei;
  const { onExit, onOpenAccount } = props;
  const { Icon, Avatar } = focusDS;
  const t = window.coparaType;
  const [queue, setQueue] = React.useState(scenario.tasks.map((x) => x.id));
  const [sheet, setSheet] = React.useState(null);
  React.useEffect(() => { setQueue(scenario.tasks.map((x) => x.id)); }, [scenario.id]);

  const total = scenario.tasks.length;
  const byId = (id) => scenario.tasks.find((x) => x.id === id);
  const current = queue.length ? byId(queue[0]) : null;
  const doneCount = total - queue.length;
  const remainingAfter = queue.length - 1;

  const answerDone = () => { setSheet(null); setQueue((q) => q.slice(1)); };
  const later = () => setQueue((q) => (q.length > 1 ? [...q.slice(1), q[0]] : q));

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--sand-50)', position: 'relative' }}>
      {/* Fokus-Kopf: minimal, kein Gruß */}
      <div style={{ padding: '64px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="sun" size={18} color="var(--wald-700)" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--wald-700)' }}>Fokus</span>
        </div>
        <button onClick={onOpenAccount} aria-label="Konto" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
          <Avatar name="Lisa Wagner" tone="wald" size={38} />
        </button>
      </div>

      <div style={{ padding: '28px 20px 140px', display: 'flex', flexDirection: 'column', minHeight: 'calc(100% - 100px)' }}>
        {current ? (
          <div style={{ marginTop: 8 }}>
            <p style={{ ...t.overline, letterSpacing: '0.08em', color: 'var(--ink-400)', textAlign: 'center', marginBottom: 18 }}>{doneCount + 1} von {total}</p>
            <window.CoparaStatusAmpel
              state="now"
              headline={current.focusHeadline || current.title}
              context={current.ctx}
              actionLabel={current.broadcast ? 'Ansehen' : 'Antworten'}
              onAction={() => setSheet(current)}
            />
            <button onClick={later} style={{ display: 'block', margin: '16px auto 0', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-400)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, padding: '8px 12px' }}>
              Auf später verschieben
            </button>
            <p style={{ ...t.caption, textAlign: 'center', marginTop: 22 }}>
              {remainingAfter > 0 ? `Danach ${remainingAfter === 1 ? 'ist noch eine Sache übrig' : `sind noch ${remainingAfter} Sachen übrig`}.` : 'Danach bist du fertig.'}
            </p>
          </div>
        ) : (
          /* Garantie-Karte */
          <div style={{ margin: 'auto 0' }}>
            <div style={{ background: 'var(--status-clear-gradient)', borderRadius: 'var(--radius-lg)', padding: '26px 22px 24px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Icon name="check" size={26} color="var(--status-clear-ink)" />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: 'var(--status-clear-ink)' }}>Das war alles.</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--status-clear-sub)', margin: '10px 0 0' }}>Du hast nichts übersehen. Copara meldet sich, wenn etwas Neues dazukommt.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '0 4px' }}>
              <Icon name="calendar" size={17} color="var(--ink-400)" />
              <span style={{ ...t.sm }}>Als Nächstes: in 6 Tagen — Mo, 16. Feb, 8:00 · Übergabe Schule.</span>
            </div>
          </div>
        )}

        <button onClick={onExit} style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-400)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500 }}>
          Fokus-Modus verlassen
        </button>
      </div>

      {current && current.broadcast ? (
        <window.CoparaBroadcastSheet open={!!sheet} onClose={() => setSheet(null)} onResult={answerDone} />
      ) : (
        <window.CoparaAnswerSheet open={!!sheet} task={sheet} onClose={() => setSheet(null)} onDone={answerDone} />
      )}
    </div>
  );
}
window.CoparaFocusTodo = FocusTodo;
