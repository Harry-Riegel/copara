/**
 * To-Do-Szenarien (geteilt zwischen Normal-To-Do und Fokus-Modus).
 * Jedes Szenario ist ein kanonischer Zustand der Startseite.
 * Kanon-Demofamilie: Lisa (du, Wald) · Markus (Aprikose, Mia & Felix) ·
 * Tom (Schiefer, Emma) · Oma Anna (Bezugsperson). Heute = Di, 10. Februar.
 */
import { AmpelProps } from '@/components/StatusAmpel';

export interface Task {
  id: string;
  who: string;
  tone: 'apricot' | 'wald' | 'neutral';
  kind: string;
  title: string;
  ctx: string;
  focusHeadline: string;
  broadcast?: boolean;
}

export interface Scenario {
  id: string;
  label: string;
  ampel: Omit<AmpelProps, 'onAction' | 'onSecondary'>;
  tasks: Task[];
}

const ferien: Task = {
  id: 'ferien',
  who: 'Markus',
  tone: 'apricot',
  kind: 'Anfrage',
  title: 'Ferien tauschen: 30. März – 3. April',
  ctx: 'Osterferien · Mia & Felix · seit heute Morgen',
  focusHeadline: 'Markus fragt: Ferien tauschen?',
};

const arzt: Task = {
  id: 'arzt',
  who: 'Broadcast',
  tone: 'neutral',
  kind: 'Abstimmung',
  title: 'Wer übernimmt den 28. Februar?',
  ctx: 'Kinderarzt Mia, 14:00 · an alle gesendet',
  focusHeadline: 'Wer übernimmt den 28. Februar?',
  broadcast: true,
};

export const scenarios: Record<string, Scenario> = {
  zwei: {
    id: 'zwei',
    label: 'Zwei',
    ampel: {
      state: 'now',
      headline: 'Zwei Dinge brauchen dich.',
      context: 'Danach ist heute nichts mehr zu tun.',
      actionLabel: 'Der Reihe nach antworten',
    },
    tasks: [ferien, arzt],
  },
  broadcast: {
    id: 'broadcast',
    label: 'Broadcast',
    ampel: {
      state: 'now',
      headline: 'Eine Abstimmung braucht dich.',
      context: 'Wer übernimmt den 28. Februar?',
      actionLabel: 'Ansehen',
    },
    tasks: [arzt],
  },
  bald: {
    id: 'bald',
    label: 'Bald',
    ampel: {
      state: 'soon',
      headline: 'In 6 Tagen bist du dran.',
      context: 'Mo, 16. Feb, 8:00 · Übergabe Schule. Bis dahin ist nichts zu tun.',
      secondaryLabel: 'Details ansehen',
    },
    tasks: [],
  },
  geregelt: {
    id: 'geregelt',
    label: 'Geregelt',
    ampel: {
      state: 'clear',
      headline: 'Heute ist nichts zu tun.',
      context: 'Mia & Felix sind bei Markus, Emma bei Tom · in 6 Tagen dran.',
    },
    tasks: [],
  },
};
