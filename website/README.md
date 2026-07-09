# copara.co — Website

Die Website des ruhigen Sorgerechts-Kalenders für getrennte Eltern.
Umsetzung des Design-Mockups „Still & Stark" aus dem Copara-Design-System
(`design/project/ui_kits/copara-app/Concept.html` + `Rechtliches.html`) als
produktionsreife, statische Website.

## Stack

- **Vite + TypeScript** (vanilla, kein Framework — die Seite ist statischer
  Inhalt mit wenigen, kleinen Interaktionen)
- **Design-Tokens** unverändert aus dem Handoff-Bundle
  (`src/styles/tokens/`), Fonts self-hosted als woff2 (`public/fonts/`)
- Kein externes Asset, kein Tracking, kein Cookie — nichts verlässt die Seite

## Seiten

| Seite              | Inhalt                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `index.html`       | Landingpage: Hero mit Signatur-Animation, Scroll-Story, Status, Kalender, Familie, drei Schritte, Zitat, Premium, Footer |
| `rechtliches.html` | Impressum · Datenschutz · Kontakt (Platzhalter bis zur Kanzlei)                                                          |
| `404.html`         | Ruhige Fehlerseite (wird von Static-Hosts automatisch erkannt)                                                           |

## Entwicklung

```bash
npm install
npm run dev        # Dev-Server
npm run build      # Typecheck + Produktions-Build nach dist/
npm run preview    # dist/ lokal ansehen
```

## Qualität

```bash
npm run typecheck  # TypeScript strict
npm run lint       # ESLint (typescript-eslint strict + stylistic)
npm run format     # Prettier
```

## Barrierefreiheit & Motion

- Alle Mockups (Phone, Kalender, Netz, Signatur) sind `aria-hidden` — der
  Inhalt trägt der Text.
- `prefers-reduced-motion` wird überall respektiert: Signatur und Scroll-Story
  zeigen die Endpose, Reveals und Parallax entfallen, die Kalender-Demo bleibt
  auf der „Alle"-Sicht stehen.
- Skip-Link, sichtbarer Tastatur-Fokus (Aprikose), semantische Landmarken.

## Deployment

`npm run build` erzeugt reines statisches HTML/CSS/JS in `dist/` — lauffähig
auf jedem Static-Host. `404.html`, `robots.txt` und `sitemap.xml` liegen bei.
Canonical-Domain: `https://copara.co`.

**Live-Setup:** Hetzner CX23 (`178.104.207.31`, Ubuntu 26.04) mit nginx +
Let's-Encrypt (Auto-Renewal via certbot). Webroot `/var/www/copara.co`,
nginx-Konfiguration `/etc/nginx/sites-available/copara.co` (Cache-Header für
`/assets` + `/fonts`, eigene 404, HSTS, HTTP→HTTPS-Redirect). SSH nur per Key
(`~/.ssh/copara_deploy`), Passwort-Login ist deaktiviert, ufw erlaubt nur
OpenSSH + nginx.

Neues Release deployen:

```
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

## Offene Punkte

- **Store-Badges** im Footer sind bewusst keine Links — die Apps sind noch
  nicht veröffentlicht. Sobald es Store-URLs gibt: die beiden `<span
class="btn … badge">` in `index.html` in `<a href="…">` umwandeln.
- **Footer „Haltung"**: „Warum kein Rot", „Bill Eddy & BIFF" und „Über uns"
  haben noch keine Zielseiten und sind daher nicht verlinkt.
- **Rechtstexte** sind Platzhalter aus dem Mockup — finale Texte kommen von
  der Kanzlei vor Launch (Hinweis steht auf der Seite).
- **OG-Bild**: Es gibt bewusst kein `og:image` — im Design-System existiert
  noch kein Raster-Asset dafür.
