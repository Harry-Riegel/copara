/**
 * Geteilter App-Zustand der Demo: Fokus-Modus, Szenario, Toast,
 * globales Anfrage-Sheet (Plus-FAB).
 */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Scenario, scenarios } from '@/data/scenarios';

interface AppState {
  focus: boolean;
  setFocus: (on: boolean) => void;
  scenario: Scenario;
  setScenarioId: (id: string) => void;
  showDemo: boolean;
  toast: string | null;
  flash: (message: string) => void;
  requestOpen: boolean;
  setRequestOpen: (open: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [focus, setFocus] = useState(false);
  const [scenarioId, setScenarioId] = useState('zwei');
  const [toast, setToast] = useState<string | null>(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      focus,
      setFocus,
      scenario: scenarios[scenarioId] ?? scenarios.zwei,
      setScenarioId,
      showDemo: true,
      toast,
      flash,
      requestOpen,
      setRequestOpen,
    }),
    [focus, scenarioId, toast, flash, requestOpen]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppState {
  const value = useContext(Ctx);
  if (!value) throw new Error('useAppState braucht einen AppStateProvider');
  return value;
}
