/* Copara UI kit — To-Do-Szenarien (geteilt zwischen Normal-To-Do und Fokus-Modus).
   Jedes Szenario ist ein kanonischer Zustand der Startseite. */
window.CoparaScenarios = {
  zwei: {
    id: 'zwei',
    label: 'Zwei',
    ampel: { state: 'now', headline: 'Zwei Dinge brauchen dich.', context: 'Danach ist heute nichts mehr zu tun.', actionLabel: 'Der Reihe nach antworten' },
    tasks: [
      { id: 'ferien', who: 'Markus', tone: 'apricot', kind: 'Anfrage', title: 'Ferien tauschen: 30. März – 3. April', ctx: 'Osterferien · Mia & Felix · seit heute Morgen', focusHeadline: 'Markus fragt: Ferien tauschen?' },
      { id: 'arzt', who: 'Broadcast', tone: 'neutral', kind: 'Abstimmung', title: 'Wer übernimmt den 28. Februar?', ctx: 'Kinderarzt Mia, 14:00 · an alle gesendet', focusHeadline: 'Wer übernimmt den 28. Februar?', broadcast: true },
    ],
  },
  broadcast: {
    id: 'broadcast',
    label: 'Broadcast',
    ampel: { state: 'now', headline: 'Eine Abstimmung braucht dich.', context: 'Wer übernimmt den 28. Februar?', actionLabel: 'Ansehen' },
    tasks: [
      { id: 'arzt', who: 'Broadcast', tone: 'neutral', kind: 'Abstimmung', title: 'Wer übernimmt den 28. Februar?', ctx: 'Kinderarzt Mia, 14:00 · an alle gesendet', focusHeadline: 'Wer übernimmt den 28. Februar?', broadcast: true },
    ],
  },
  bald: {
    id: 'bald',
    label: 'Bald',
    ampel: { state: 'soon', headline: 'In 6 Tagen bist du dran.', context: 'Mo, 16. Feb, 8:00 · Übergabe Schule. Bis dahin ist nichts zu tun.', secondaryLabel: 'Details ansehen' },
    tasks: [],
  },
  geregelt: {
    id: 'geregelt',
    label: 'Geregelt',
    ampel: { state: 'clear', headline: 'Heute ist nichts zu tun.', context: 'Mia & Felix sind bei Markus, Emma bei Tom · in 6 Tagen dran.' },
    tasks: [],
  },
};
