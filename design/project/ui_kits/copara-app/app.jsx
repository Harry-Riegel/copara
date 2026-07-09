/* Copara UI kit — App-Shell: Tabs (To-Do · Kalender · Familie), Plus, Konto, Fokus-Modus,
   Oma-Ansicht, Sheets, Toast. */
const appDS = window.CoparaDesignSystem_e5ed8c;

function Toast({ show, children }) {
  const { Icon } = appDS;
  return (
    <div style={{ position: 'absolute', bottom: 104, left: 20, right: 20, zIndex: 60, display: 'flex', justifyContent: 'center', pointerEvents: 'none', transition: 'opacity var(--transition-default), transform var(--transition-default)', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(8px)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--wald-700)', color: '#FFFDF7', borderRadius: 999, padding: '12px 18px', boxShadow: 'var(--shadow-card)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600 }}>
        <Icon name="check" size={17} color="#FFFDF7" /> {children}
      </div>
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "waldPalette": ["#2E4B3F", "#3E6553", "#DFEFE6"],
  "cardRadius": 24,
  "showDemo": true,
  "focusMode": false
}/*EDITMODE-END*/;

function App() {
  const [stage, setStage] = React.useState('splash');
  const [tab, setTab] = React.useState('todo');
  const [account, setAccount] = React.useState(false);
  const [oma, setOma] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [scenarioId, setScenarioId] = React.useState('zwei');
  const [sheet, setSheet] = React.useState(null); // { kind, task, onDone }
  const [toast, setToast] = React.useState(null);

  const scenario = window.CoparaScenarios[scenarioId] || window.CoparaScenarios.zwei;

  const [tw, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement.style;
    const [c700, c500, c100] = tw.waldPalette;
    r.setProperty('--wald-700', c700); r.setProperty('--wald-500', c500); r.setProperty('--wald-100', c100);
    r.setProperty('--color-primary', c700); r.setProperty('--parent-a', c700); r.setProperty('--parent-a-soft', c100);
    r.setProperty('--radius-lg', tw.cardRadius + 'px');
  }, [tw.waldPalette, tw.cardRadius]);
  React.useEffect(() => { setFocus(tw.focusMode); }, [tw.focusMode]);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const handleTodoAction = (arg, onDone) => {
    if (arg === 'account') { setAccount(true); return; }
    setSheet({ kind: arg.broadcast ? 'broadcast' : 'answer', task: arg, onDone });
  };

  const finishSheet = (msg) => {
    if (sheet && sheet.onDone) sheet.onDone();
    setSheet(null);
    flash(msg);
  };

  return (
    <>
    <window.CoparaPhoneFrame>
      <window.CoparaStatusBar dark={false} />

      {oma ? (
        <window.CoparaOmaView onExit={() => setOma(false)} />
      ) : account ? (
        <window.CoparaAccountScreen onBack={() => setAccount(false)} focus={focus} onFocus={setFocus} />
      ) : (
        <>
          {tab === 'todo' && (focus ? (
            <window.CoparaFocusTodo scenario={scenario} onExit={() => setFocus(false)} onOpenAccount={() => setAccount(true)} />
          ) : (
            <window.CoparaTodoScreen scenario={scenario} onScenario={setScenarioId} onAnswerFlow={handleTodoAction} onFocusHint={() => setFocus(true)} showDemo={tw.showDemo} />
          ))}
          {tab === 'kalender' && <window.CoparaCalendarScreen focus={focus} onDay={() => setSheet({ kind: 'day' })} />}
          {tab === 'familie' && (
            <window.CoparaFamilyScreen
              onAddPerson={() => setSheet({ kind: 'addperson' })}
              onPaywall={() => flash('Premium ist aktiv')}
              onOmaView={() => setOma(true)}
            />
          )}

          <window.CoparaTabBar
            active={tab}
            onTab={setTab}
            onPlus={() => setSheet({ kind: 'request' })}
            todoDot={scenario.tasks.length > 0}
          />
        </>
      )}

      {/* Sheets */}
      <window.CoparaAnswerSheet
        open={sheet?.kind === 'answer'}
        task={sheet?.kind === 'answer' ? sheet.task : null}
        onClose={() => setSheet(null)}
        onDone={() => finishSheet('Antwort gesendet')}
      />
      <window.CoparaBroadcastSheet
        open={sheet?.kind === 'broadcast'}
        onClose={() => setSheet(null)}
        onResult={(kind) => { if (sheet && sheet.onDone) sheet.onDone(); setSheet(null); flash(kind === 'übernommen' ? 'Du übernimmst den 28. Februar' : 'Omas Zusage bestätigt'); }}
      />
      <window.CoparaRequestSheet open={sheet?.kind === 'request'} onClose={() => setSheet(null)} onSent={() => finishSheet('Anfrage gesendet')} />
      <window.CoparaAddPersonSheet open={sheet?.kind === 'addperson'} onClose={() => setSheet(null)} />
      <window.CoparaDaySheet open={sheet?.kind === 'day'} onClose={() => setSheet(null)} onRequest={() => finishSheet('Anfrage gesendet')} />

      <Toast show={!!toast}>{toast}</Toast>

      {stage === 'splash' && <window.CoparaSplashScreen onDone={() => setStage('app')} />}
    </window.CoparaPhoneFrame>

    <window.TweaksPanel>
      <window.TweakSection label="Marke" />
      <window.TweakColor label="Primärfarbe" value={tw.waldPalette}
        options={[['#2E4B3F', '#3E6553', '#DFEFE6'], ['#26506A', '#3E7BA6', '#DCEAF2'], ['#4B3A6B', '#6E58A6', '#E7E1F3'], ['#5A4632', '#8A6A45', '#EFE6D8']]}
        onChange={(v) => setTweak('waldPalette', v)} />
      <window.TweakSlider label="Kartenrundung" value={tw.cardRadius} min={12} max={28} step={2} unit="px"
        onChange={(v) => setTweak('cardRadius', v)} />
      <window.TweakSection label="Verhalten" />
      <window.TweakToggle label="Fokus-Modus" value={tw.focusMode} onChange={(v) => setTweak('focusMode', v)} />
      <window.TweakToggle label="Demo-Umschalter" value={tw.showDemo} onChange={(v) => setTweak('showDemo', v)} />
    </window.TweaksPanel>
    </>
  );
}

class ErrBoundary extends React.Component {
  constructor(p) { super(p); this.state = { e: null }; }
  static getDerivedStateFromError(e) { return { e }; }
  componentDidCatch(e) { window.__lastErr = (e && e.stack) || String(e); }
  render() {
    if (this.state.e) return React.createElement('pre', { style: { padding: 20, color: '#B05B57', fontSize: 11, whiteSpace: 'pre-wrap', fontFamily: 'monospace' } }, String((this.state.e && this.state.e.stack) || this.state.e));
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
window.__coparaRoot = window.__coparaRoot || ReactDOM.createRoot(rootEl);
window.__coparaRoot.render(<ErrBoundary><App /></ErrBoundary>);
