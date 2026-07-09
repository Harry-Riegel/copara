# Copara App — UI kit (3-Tab-Redesign)

Interaktive Klick-Recreation der Copara-App im Redesign „Warm Sand & Wald". Ein iPhone-Frame (390×844) mit der neuen Informationsarchitektur: **drei Tabs — To-Do · Kalender · Familie — plus schwebendes Plus und Konto über den Avatar.** Kein Anfragen-Tab mehr (früher 4 Tabs).

## Screens
- **To-Do** (`TodoScreen.jsx`) — alles, was eine Entscheidung braucht. Oben die **Status-Ampel-Box** (feste Anatomie: Punkt + Zustandswort → größte Zeile → Kontext → höchstens ein Knopf). Darunter „Was du entscheiden kannst" und die eigene wartende Anfrage „Liegt bei Markus". Nach dem Beantworten kippt die Ampel auf Salbei „Das war alles."
- **Kalender** (`CalendarScreen.jsx`) — das Beschlossene. Monatsraster Februar (Eltern-Farbkodierung Wald/Aprikose, Termin-Balken, Offen-Punkt), Legende, Filter Alle/Termine/Tausche, „Als Nächstes — vereinbart". Tipp auf einen Tag öffnet das Tages-Sheet.
- **Familie** (`FamilyScreen.jsx`) — Kinder mit Eltern-Paaren (Patchwork: Eltern pro Kind), Erwachsene mit Rolle, „Premium ist aktiv", „Person hinzufügen", „Als Oma Anna ansehen".
- **Flows** (`Flows.jsx`) — Bottom-Sheets: Antworten (Bestätigen/Gegenvorschlag/Später — nie „Ablehnen"), Anfrage stellen (Plus: Ein Tag/Zeitraum/Serie + Empfänger-Wahl), Person hinzufügen (Rolle → Kinder → Code), Tages-Sheet.
- **Konto** (`AccountScreen.jsx`) — Profil, Anzeige mit **Fokus-Modus-Schalter**, Konto-Sektionen. Erreichbar über den Avatar oben rechts im To-Do.

## Kanon-Demofamilie
Lisa (du, Wald) · Markus (Aprikose, Mia & Felix) · Tom (Schiefer, Emma) · Oma Anna (Bezugsperson, sieht Mia & Felix). Heute = Di, 10. Februar. Premium durchgehend aktiv.

## Aufbau
`index.html` lädt React + Babel, `styles.css`, das kompilierte `_ds_bundle.js` und dann die Screen-Dateien. Jede Datei exportiert ihre Komponente nach `window.Copara*`; die Screens nutzen die DS-Primitive (`Button`, `Card`, `Chip`, `Avatar`, `Icon`, `Sheet`, `Banner`, `Input`) über `window.CoparaDesignSystem_e5ed8c`. Der gemeinsame Shell (Typo-Helfer, Phone-Frame, Tab-Bar, Status-Ampel) liegt in `shared.jsx`.

Dies ist eine visuelle Recreation, kein Produktionscode — Zielzustand für den Nachbau im Expo/React-Native-Repo.
