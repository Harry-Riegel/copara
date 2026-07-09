/* Copara UI kit — To-Do: alles, was eine Entscheidung braucht.
   Status-Ampel oben → Aufgaben → eigene wartende Anfrage. Szenario-Umschalter (Demo)
   zeigt die kanonischen Startseiten-Zustände. */
const todoDS = window.CoparaDesignSystem_e5ed8c;

function TodoScreen(props) {
  const scenario = props.scenario || window.CoparaScenarios.zwei;
  const { onScenario, onAnswerFlow, onFocusHint } = props;
  const showDemo = props.showDemo !== false;
  const { Icon, Avatar, Chip } = todoDS;
  const t = window.coparaType;
  const [answered, setAnswered] = React.useState([]);
  React.useEffect(() => { setAnswered([]); }, [scenario.id]);

  const openTasks = scenario.tasks.filter((x) => !answered.includes(x.id));
  const hadTasks = scenario.tasks.length > 0;

  let ampel;
  if (openTasks.length > 0 && answered.length === 0) {
    ampel = { ...scenario.ampel, onAction: () => onAnswerFlow(openTasks[0]) };
  } else if (openTasks.length > 0) {
    ampel = { state: 'now', headline: openTasks.length === 1 ? 'Noch eine Sache.' : `Noch ${openTasks.length} Dinge.`, context: 'Danach ist heute nichts mehr zu tun.', actionLabel: 'Weiter antworten', onAction: () => onAnswerFlow(openTasks[0]) };
  } else if (hadTasks) {
    ampel = { state: 'clear', headline: 'Das war alles.', context: 'Du hast nichts übersehen. Mia & Felix bei Markus, Emma bei Tom · in 6 Tagen dran.' };
  } else {
    ampel = scenario.ampel;
  }

  const card = { background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' };
  const scenList = Object.values(window.CoparaScenarios);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: 'var(--sand-50)' }}>
      <div style={{ padding: '64px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ ...t.caption, marginBottom: 4, color: 'var(--ink-600)', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }}>Dienstag, 10. Februar</p>
          <h1 style={{ ...t.h1, fontSize: 34 }}>To-Do<span style={{ color: 'var(--apricot-500)' }}>.</span></h1>
        </div>
        <button onClick={() => onAnswerFlow('account')} aria-label="Konto" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
          <Avatar name="Lisa Wagner" tone="wald" size={42} />
        </button>
      </div>

      {/* Szenario-Umschalter (Demo) */}
      {showDemo && (
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          <span style={{ ...t.caption, color: 'var(--ink-400)', flexShrink: 0, marginRight: 2 }}>Demo</span>
          {scenList.map((s) => {
            const on = s.id === scenario.id;
            return (
              <button key={s.id} onClick={() => onScenario(s.id)} style={{ flexShrink: 0, height: 30, padding: '0 12px', borderRadius: 999, cursor: 'pointer', border: on ? 'none' : '1px solid var(--sand-200)', background: on ? 'var(--ink-900)' : 'var(--sand-0)', color: on ? '#FFFDF7' : 'var(--ink-600)', fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600 }}>{s.label}</button>
            );
          })}
        </div>
      </div>
      )}

      <div style={{ padding: '12px 16px 140px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <window.CoparaStatusAmpel {...ampel} />

        {openTasks.length > 0 && (
          <div>
            <window.CoparaSectionLabel>Was du entscheiden kannst</window.CoparaSectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {openTasks.map((task) => {
                const dot = task.tone === 'apricot' ? 'var(--apricot-500)' : 'var(--wald-500)';
                const meta = task.who === 'Broadcast' ? 'Frage an alle' : `${task.kind} von ${task.who}`;
                return (
                  <button key={task.id} onClick={() => onAnswerFlow(task, () => setAnswered((c) => [...c, task.id]))} style={{ ...card, border: 'none', textAlign: 'left', cursor: 'pointer', padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                        <span style={{ ...t.caption, color: 'var(--ink-600)', whiteSpace: 'nowrap' }}>{meta}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 16.5, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1.3 }}>{task.title}</div>
                      <div style={{ ...t.sm, marginTop: 4 }}>{task.ctx}</div>
                    </div>
                    <Icon name="chevron-right" size={18} color="var(--ink-400)" style={{ marginTop: 2 }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Eigene wartende Anfrage — passiv, bewusst zurückgenommen */}
        <div>
          <window.CoparaSectionLabel style={{ color: 'var(--ink-400)' }}>Liegt bei Markus</window.CoparaSectionLabel>
          <div style={{ background: 'var(--sand-0)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand-200)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--apricot-300)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink-600)', lineHeight: 1.35 }}>Ferien 30. März – 3. April</div>
                <div style={{ ...t.caption, marginTop: 2 }}>Ohne Antwort fragen wir nach 24 h Oma &amp; Opa.</div>
              </div>
              <Chip tone="neutral">offen</Chip>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 7, border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: 12, minHeight: 24, color: 'var(--ink-400)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500 }}>
              <Icon name="rotate-ccw" size={15} color="var(--ink-400)" /> Anfrage zurückziehen
            </button>
          </div>
        </div>

        <button onClick={onFocusHint} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, border: 'none', background: 'none', cursor: 'pointer', padding: '4px 0', color: 'var(--ink-400)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500 }}>
          <Icon name="sun" size={15} color="var(--ink-400)" /> Fokus-Modus einschalten
        </button>
      </div>
    </div>
  );
}
window.CoparaTodoScreen = TodoScreen;
