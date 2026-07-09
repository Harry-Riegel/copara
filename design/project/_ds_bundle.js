/* @ds-bundle: {"format":4,"namespace":"CoparaDesignSystem_e5ed8c","components":[{"name":"Avatar","sourcePath":"components/avatar/Avatar.jsx"},{"name":"Banner","sourcePath":"components/banner/Banner.jsx"},{"name":"Button","sourcePath":"components/button/Button.jsx"},{"name":"Card","sourcePath":"components/card/Card.jsx"},{"name":"Chip","sourcePath":"components/chip/Chip.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"LUCIDE_ICONS","sourcePath":"components/icon/icons-data.js"},{"name":"Input","sourcePath":"components/input/Input.jsx"},{"name":"Sheet","sourcePath":"components/sheet/Sheet.jsx"}],"sourceHashes":{"components/avatar/Avatar.jsx":"1830c97ac018","components/banner/Banner.jsx":"220d7847872b","components/button/Button.jsx":"5657aba44e7c","components/card/Card.jsx":"6e1317c147af","components/chip/Chip.jsx":"5ac12fb3f7c2","components/icon/Icon.jsx":"37698391c466","components/icon/icons-data.js":"4b168f1a7179","components/input/Input.jsx":"68a4350785a5","components/sheet/Sheet.jsx":"6a4d675ab37f","ui_kits/copara-app/AccountScreen.jsx":"419fb98cc5b2","ui_kits/copara-app/CalendarScreen.jsx":"91b341f12331","ui_kits/copara-app/FamilyScreen.jsx":"8db5d1038ddf","ui_kits/copara-app/Flows.jsx":"d2513cdc1631","ui_kits/copara-app/FocusMode.jsx":"9d838d38a974","ui_kits/copara-app/OmaView.jsx":"394f80a4a94c","ui_kits/copara-app/Splash.jsx":"0fa341214452","ui_kits/copara-app/TodoScreen.jsx":"a8b0f1068dda","ui_kits/copara-app/app.jsx":"d80974127345","ui_kits/copara-app/scenarios.js":"4617361364ce","ui_kits/copara-app/shared.jsx":"9886dec4b066","ui_kits/copara-app/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CoparaDesignSystem_e5ed8c = window.CoparaDesignSystem_e5ed8c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/avatar/Avatar.jsx
try { (() => {
/**
 * Copara Avatar — Initialen-Kreis in Eltern-Farbkodierung.
 * Keine Fotos im Produkt; Initialen reichen und bleiben neutral.
 * tone: wald = Elternteil A, apricot = Elternteil B, schiefer = Elternteil C (Patchwork),
 * neutral = Dritte/Bezugspersonen.
 */
function Avatar({
  name = '',
  tone = 'neutral',
  size = 34,
  style
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const tones = {
    wald: {
      background: 'var(--wald-100)',
      color: 'var(--wald-700)'
    },
    apricot: {
      background: 'var(--apricot-100)',
      color: 'var(--apricot-700)'
    },
    schiefer: {
      background: 'var(--person-c-100)',
      color: 'var(--person-c-700)'
    },
    neutral: {
      background: 'var(--sand-100)',
      color: 'var(--ink-600)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": name,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-body-semibold)',
      fontSize: Math.round(size * 0.38),
      ...tones,
      ...style
    }
  }, initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/button/Button.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Copara Button — Redesign „Warm Sand & Wald": Pillenform.
 * primary = Wald, secondary = Sand, tertiary = Text. Press = opacity 0.8, disabled = 0.4.
 */
function Button({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  style,
  children
}) {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;
  const bg = {
    primary: 'var(--wald-700)',
    secondary: 'var(--sand-100)',
    tertiary: 'transparent'
  }[variant];
  const fg = {
    primary: 'var(--sand-0)',
    secondary: 'var(--ink-900)',
    tertiary: 'var(--ink-600)'
  }[variant];
  const dims = {
    small: {
      height: 'var(--control-sm)',
      padding: '0 var(--space-4)',
      fontSize: 'var(--text-sm-size)'
    },
    medium: {
      height: 'var(--control-md)',
      padding: '0 var(--space-5)',
      fontSize: 'var(--text-base-size)'
    },
    large: {
      height: 'var(--control-lg)',
      padding: '0 var(--space-6)',
      fontSize: 'var(--text-base-size)'
    }
  }[size];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: isDisabled,
    onClick: onClick,
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-body-semibold)',
      cursor: isDisabled ? 'default' : 'pointer',
      opacity: isDisabled ? 'var(--opacity-disabled)' : pressed ? 'var(--opacity-pressed)' : 1,
      transition: 'opacity var(--transition-default)',
      ...dims,
      ...style
    }
  }, loading ? /*#__PURE__*/React.createElement(Spinner, {
    color: variant === 'primary' ? '#FFFDF7' : '#6B675C'
  }) : children);
}
function Spinner({
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: '2px solid ' + color,
      borderTopColor: 'transparent',
      animation: 'copara-spin 0.8s linear infinite',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes copara-spin { to { transform: rotate(360deg); } }'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/button/Button.jsx", error: String((e && e.message) || e) }); }

// components/card/Card.jsx
try { (() => {
/**
 * Copara Card — „Warm Sand & Wald": Sand-0-Fläche, Radius 24, warmer Soft-Schatten.
 * Karte = Schatten (elevated) ODER Hairline, nie beides.
 */
function Card({
  elevated = false,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      boxShadow: elevated ? 'var(--shadow-card)' : 'none',
      border: elevated ? 'none' : '1px solid var(--sand-200)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/card/Card.jsx", error: String((e && e.message) || e) }); }

// components/chip/Chip.jsx
try { (() => {
/**
 * Copara Chip — kleine Pille für Status & Premium-Kennzeichnung.
 * premium = warmer Gold-Verlauf (immer für Premium-Elemente); die übrigen Töne sind ruhige Soft-Flächen.
 */
function Chip({
  tone = 'neutral',
  style,
  children
}) {
  const tones = {
    premium: {
      background: 'var(--premium-gradient)',
      color: 'var(--gold-900)'
    },
    wald: {
      background: 'var(--wald-100)',
      color: 'var(--wald-700)'
    },
    apricot: {
      background: 'var(--apricot-100)',
      color: 'var(--apricot-700)'
    },
    schiefer: {
      background: 'var(--person-c-100)',
      color: 'var(--person-c-700)'
    },
    neutral: {
      background: 'var(--sand-100)',
      color: 'var(--ink-600)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      fontWeight: 'var(--weight-body-semibold)',
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
      ...tones,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chip/Chip.jsx", error: String((e && e.message) || e) }); }

// components/icon/icons-data.js
try { (() => {
// Lucide icon inner-SVG markup, copied from lucide-static@0.462.0 (ISC license).
// 24x24 viewBox, stroke=currentColor, stroke-width 2, round caps/joins.
// Matches the app's lucide-react-native set. Add new glyphs here as screens need them.
const LUCIDE_ICONS = {
  "calendar": "<path d=\"M8 2v4\" />\n  <path d=\"M16 2v4\" />\n  <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" />\n  <path d=\"M3 10h18\" />",
  "inbox": "<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\" />\n  <path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\" />",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <path d=\"M12 16v-4\" />\n  <path d=\"M12 8h.01\" />",
  "x": "<path d=\"M18 6 6 18\" />\n  <path d=\"m6 6 12 12\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "check-check": "<path d=\"M18 6 7 17l-5-5\" />\n  <path d=\"m22 10-7.5 7.5L13 16\" />",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "plus": "<path d=\"M5 12h14\" />\n  <path d=\"M12 5v14\" />",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <polyline points=\"12 6 12 12 16 14\" />",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" />\n  <circle cx=\"9\" cy=\"7\" r=\"4\" />\n  <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" />\n  <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" />",
  "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" />\n  <path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" />",
  "settings": "<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\" />\n  <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "arrow-left-right": "<path d=\"M8 3 4 7l4 4\" />\n  <path d=\"M4 7h16\" />\n  <path d=\"m16 21 4-4-4-4\" />\n  <path d=\"M20 17H4\" />",
  "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\" />\n  <path d=\"m21.854 2.147-10.94 10.939\" />",
  "log-out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\" />\n  <polyline points=\"16 17 21 12 16 7\" />\n  <line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\" />",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" />\n  <circle cx=\"12\" cy=\"7\" r=\"4\" />",
  "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />",
  "file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" />\n  <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" />\n  <path d=\"M10 9H8\" />\n  <path d=\"M16 13H8\" />\n  <path d=\"M16 17H8\" />",
  "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" />\n  <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />",
  "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />",
  "more-horizontal": "<circle cx=\"12\" cy=\"12\" r=\"1\" />\n  <circle cx=\"19\" cy=\"12\" r=\"1\" />\n  <circle cx=\"5\" cy=\"12\" r=\"1\" />",
  "alert-circle": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" />\n  <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
  "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" />\n  <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />",
  "list-checks": "<path d=\"m3 17 2 2 4-4\" />\n  <path d=\"m3 7 2 2 4-4\" />\n  <path d=\"M13 6h8\" />\n  <path d=\"M13 12h8\" />\n  <path d=\"M13 18h8\" />",
  "crown": "<path d=\"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z\" />\n  <path d=\"M5 21h14\" />",
  "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" />\n  <circle cx=\"12\" cy=\"12\" r=\"3\" />",
  "chart-column": "<path d=\"M3 3v16a2 2 0 0 0 2 2h16\" />\n  <path d=\"M18 17V9\" />\n  <path d=\"M13 17V5\" />\n  <path d=\"M8 17v-3\" />",
  "user-plus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" />\n  <circle cx=\"9\" cy=\"7\" r=\"4\" />\n  <line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\" />\n  <line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\" />",
  "timer": "<line x1=\"10\" x2=\"14\" y1=\"2\" y2=\"2\" />\n  <line x1=\"12\" x2=\"15\" y1=\"14\" y2=\"11\" />\n  <circle cx=\"12\" cy=\"14\" r=\"8\" />",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" />\n  <circle cx=\"12\" cy=\"10\" r=\"3\" />",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" />\n  <path d=\"M12 2v2\" />\n  <path d=\"M12 20v2\" />\n  <path d=\"m4.93 4.93 1.41 1.41\" />\n  <path d=\"m17.66 17.66 1.41 1.41\" />\n  <path d=\"M2 12h2\" />\n  <path d=\"M20 12h2\" />\n  <path d=\"m6.34 17.66-1.41 1.41\" />\n  <path d=\"m19.07 4.93-1.41 1.41\" />",
  "mail": "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" />\n  <path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />",
  "message-circle": "<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\" />",
  "share": "<path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\" />\n  <polyline points=\"16 6 12 2 8 6\" />\n  <line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"15\" />",
  "pencil": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" />\n  <path d=\"m15 5 4 4\" />",
  "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\" />\n  <path d=\"M3 3v5h5\" />",
  "heart-handshake": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" />\n  <path d=\"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66\" />\n  <path d=\"m18 15-2-2\" />\n  <path d=\"m15 18-2-2\" />"
};
Object.assign(__ds_scope, { LUCIDE_ICONS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/icons-data.js", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
/**
 * Copara Icon — renders a Lucide glyph (copied from lucide-static, matching the
 * app's lucide-react-native set). Outline, 2px stroke, tints via `color`.
 * Icons always accompany a label; they never carry meaning alone.
 */
function Icon({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  style
}) {
  const inner = __ds_scope.LUCIDE_ICONS[name];
  if (!inner) {
    console.warn('[Copara Icon] unknown icon: ' + name);
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      ...style
    },
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: inner
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/banner/Banner.jsx
try { (() => {
/**
 * Copara Banner — web port of src/components/ui/Banner.tsx (parentingapp).
 * Sand-100 fill; the tone only tints the 18px lucide icon. Error is clay, never red.
 */
function Banner({
  tone = 'info',
  onDismiss,
  style,
  children
}) {
  const iconColor = {
    info: '#3E6553',
    warning: '#C4956A',
    error: '#B07060'
  }[tone];
  const iconName = tone === 'info' ? 'info' : 'alert-circle';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-3)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconName,
    size: 18,
    color: iconColor
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      margin: '0 var(--space-3)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm-size)',
      lineHeight: 'var(--text-sm-line)',
      color: 'var(--ink-900)'
    }
  }, children), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Schlie\xDFen",
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      color: '#6B675C'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  })));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/banner/Banner.jsx", error: String((e && e.message) || e) }); }

// components/input/Input.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Copara Input — web port of src/components/ui/Input.tsx (parentingapp).
 * Sand fill, hairline border; 2px Wald focus; 2px clay error (never red).
 */
function Input({
  label,
  error,
  value,
  onChange,
  placeholder,
  type = 'text',
  style,
  inputStyle
}) {
  const [focused, setFocused] = useState(false);
  const border = error ? '2px solid var(--clay-500)' : focused ? '2px solid var(--wald-500)' : '1px solid var(--sand-200)';
  // keep height stable between 1px and 2px borders
  const pad = error || focused ? 'calc(var(--space-4) - 1px)' : 'var(--space-4)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-body-medium)',
      fontSize: 'var(--text-sm-size)',
      lineHeight: 'var(--text-sm-line)',
      color: 'var(--ink-600)',
      marginBottom: 'var(--space-1)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      height: 'var(--control-md)',
      padding: '0 ' + pad,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--sand-0)',
      border,
      outline: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base-size)',
      color: 'var(--ink-900)',
      boxSizing: 'border-box',
      width: '100%',
      ...inputStyle
    }
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm-size)',
      lineHeight: 'var(--text-sm-line)',
      color: 'var(--clay-500)',
      marginTop: 'var(--space-1)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/input/Input.jsx", error: String((e && e.message) || e) }); }

// components/sheet/Sheet.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
/**
 * Copara Sheet — web port of src/components/ui/Sheet.tsx (parentingapp).
 * Bottom sheet with drag handle, 32px top radius, 320ms reassuring ease.
 * Positioned absolutely — the nearest positioned ancestor is the "screen"
 * (e.g. a phone frame). Backdrop is rgba(42,39,33,0.32), tap to close, no blur.
 */
function Sheet({
  open,
  onClose,
  height = '70%',
  children
}) {
  const [visible, setVisible] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    } else {
      setShown(false);
      const t = setTimeout(() => setVisible(false), 320);
      return () => clearTimeout(t);
    }
  }, [open]);
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    "aria-label": "Schlie\xDFen",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--backdrop)',
      opacity: shown ? 1 : 0,
      transition: 'opacity var(--transition-sheet)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height,
      background: 'var(--sand-0)',
      borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      boxShadow: 'var(--shadow-sheet)',
      paddingTop: 'var(--space-3)',
      transform: shown ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform var(--transition-sheet)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'center',
      width: 40,
      height: 4,
      borderRadius: 999,
      background: 'var(--ink-400)',
      marginBottom: 'var(--space-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      padding: '0 var(--space-4) var(--space-6)',
      overflowY: 'auto'
    }
  }, children)));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sheet/Sheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/AccountScreen.jsx
try { (() => {
/* Copara UI kit — Konto (über den Avatar): Profil, Anzeige (Fokus-Modus), Konto-Sektionen.
   Alle Zeilen öffnen ein echtes Sheet. */
const accDS = window.CoparaDesignSystem_e5ed8c;
function SettingToggle({
  label,
  def,
  sub
}) {
  const [on, setOn] = React.useState(def);
  const t = window.coparaType;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...t.body,
      fontSize: 15
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      ...t.caption,
      marginTop: 2
    }
  }, sub)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOn(!on),
    "aria-label": label,
    style: {
      width: 48,
      height: 28,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: on ? 'var(--wald-700)' : 'var(--sand-200)',
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? 23 : 3,
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: '#FFFDF7',
      transition: 'left var(--transition-default)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }
  })));
}
function AccountScreen({
  onBack,
  focus,
  onFocus
}) {
  const {
    Icon,
    Avatar,
    Chip,
    Sheet,
    Button
  } = accDS;
  const t = window.coparaType;
  const [sheet, setSheet] = React.useState(null);
  const flatCard = {
    background: 'var(--sand-0)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--sand-200)',
    overflow: 'hidden'
  };
  const row = (icon, label, value, valueColor, key, first) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setSheet(key),
    style: {
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderTop: first ? 'none' : '1px solid var(--sand-200)',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: "var(--ink-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.body,
      fontSize: 15,
      flex: 1
    }
  }, label), value && /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.sm,
      color: valueColor || 'var(--ink-600)'
    }
  }, value), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--ink-400)"
  }));
  const sheetContent = {
    premium: {
      title: 'Copara Premium',
      body: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--sand-100)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "crown",
        size: 18,
        color: "var(--gold-500)"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          ...t.sm,
          color: 'var(--ink-900)',
          fontWeight: 600
        }
      }, "Aktiv \xB7 eine Familie, ein Abo \xB7 4,99 \u20AC/Monat")), /*#__PURE__*/React.createElement("p", {
        style: t.sm
      }, "Gro\xDFeltern, die abholen. Ein Au-pair, das Bescheid wissen muss. Ein zweiter Ex-Partner mit eigenen Tagen. Premium bindet alle ein, die bei euren Kindern helfen \u2014 jede Person sieht genau das, was sie braucht, und kein bisschen mehr."), [['Oma, Opa & Au-pair einladen', 'Sie sehen nur die Tage und Termine ihres Kindes — ohne in euren Nachrichten mitzulesen.'], ['Notfall-Helfer, wenn keiner kann', 'Antwortet der andere Elternteil nicht, fragt Copara automatisch Oma & Opa. Kein Kind bleibt ohne Abholung.'], ['Eine Frage an alle gleichzeitig', '„Wer holt Mia am Freitag?" — die Erste, die zusagt, übernimmt. Kein Herumtelefonieren.'], ['Mehrere Kinder getrennt planen', 'Jedes Kind mit eigenem Kalender und eigenen Übergaben — auch bei verschiedenen Vätern.'], ['Erinnerungen, die mitdenken', 'Vor dem Arzttermin die Gesundheitskarte, vor der Auslandsreise die Reise-Erlaubnis — automatisch.'], ['Monatsübersicht als PDF', 'Wer hatte die Kinder wann — sauber dokumentiert für Anwältin, Jugendamt oder Mediation.']].map(([title, sub]) => /*#__PURE__*/React.createElement("div", {
        key: title,
        style: {
          display: 'flex',
          gap: 11,
          alignItems: 'flex-start'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 16,
        color: "var(--wald-500)",
        style: {
          marginTop: 3
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: 'var(--font-body)',
          fontSize: 14.5,
          fontWeight: 600,
          color: 'var(--ink-900)'
        }
      }, title), /*#__PURE__*/React.createElement("div", {
        style: {
          ...t.caption,
          marginTop: 1
        }
      }, sub)))))
    },
    focus: {
      title: 'Fokus-Modus',
      body: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
        style: t.sm
      }, "Eine Sache nach der anderen, ganz in Ruhe. Du siehst immer nur den n\xE4chsten Schritt \u2014 \u201ESp\xE4ter\" schiebt etwas nach hinten, und am Schluss steht die Gewissheit: \u201EDas war alles.\""), /*#__PURE__*/React.createElement(SettingToggle, {
        label: "Fokus-Modus",
        sub: "Immer nur eine Sache anzeigen",
        def: focus
      }))
    },
    bell: {
      title: 'Benachrichtigungen',
      body: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
        style: {
          ...t.sm,
          marginBottom: 6
        }
      }, "Nur was wichtig ist, nie Marketing."), [['Neue Anfragen', true], ['Antworten & Bestätigungen', true], ['Erinnerung vor Übergaben', true], ['Notfall-Eskalationen', true], ['Produkt-Neuigkeiten', false]].map(([l, d]) => /*#__PURE__*/React.createElement(SettingToggle, {
        key: l,
        label: l,
        def: d
      })))
    },
    sync: {
      title: 'Kalender-Sync',
      body: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--wald-100)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 16,
        color: "var(--wald-700)"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          ...t.sm,
          color: 'var(--wald-700)',
          fontWeight: 600
        }
      }, "Aktiv \u2014 zuletzt synchronisiert vor 2 Minuten")), /*#__PURE__*/React.createElement("p", {
        style: t.sm
      }, "Best\xE4tigte Wechsel und Termine landen automatisch in deinem iOS-Kalender \u2014 \xC4nderungen werden mitgef\xFChrt."), /*#__PURE__*/React.createElement(SettingToggle, {
        label: "Mit iOS-Kalender synchronisieren",
        def: true
      }), /*#__PURE__*/React.createElement(SettingToggle, {
        label: "Erinnerung 1 Tag vor \xDCbergabe",
        def: true
      }))
    },
    stats: {
      title: 'Februar in Zahlen',
      premium: true,
      body: /*#__PURE__*/React.createElement(React.Fragment, null, [['Lisa', '14 Tage', 'var(--wald-500)'], ['Markus', '14 Tage', 'var(--apricot-500)']].map(([name, val, color]) => /*#__PURE__*/React.createElement("div", {
        key: name
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          ...t.sm,
          fontWeight: 600,
          color: 'var(--ink-900)'
        }
      }, name), /*#__PURE__*/React.createElement("span", {
        style: t.sm
      }, val)), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 8,
          borderRadius: 4,
          background: 'var(--sand-100)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: '50%',
          height: '100%',
          borderRadius: 4,
          background: color
        }
      })))), /*#__PURE__*/React.createElement("div", {
        style: {
          borderTop: '1px solid var(--sand-200)',
          paddingTop: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          ...t.sm,
          fontWeight: 600,
          color: 'var(--ink-900)'
        }
      }, "Tausch-Bilanz"), /*#__PURE__*/React.createElement("span", {
        style: {
          ...t.sm,
          fontWeight: 600,
          color: 'var(--wald-700)'
        }
      }, "+1 Tag f\xFCr dich")), /*#__PURE__*/React.createElement("p", {
        style: {
          ...t.caption,
          marginTop: 4
        }
      }, "Neutral & still protokolliert \u2014 die Zahlen sprechen, nicht die App.")), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        size: "large"
      }, "Als PDF exportieren"))
    },
    verlauf: {
      title: 'Verlauf & Entschieden',
      body: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
        style: {
          ...t.sm,
          marginBottom: 4
        }
      }, "Still protokolliert \u2014 fair f\xFCr beide Seiten."), [['10.02. · 14:07', 'Oma Anna hat den 28. Februar übernommen.'], ['09.02. · 19:20', 'Tausch bestätigt: Emma kommt Mi, 18. Feb.'], ['06.02. · 08:15', 'Ferien-Anfrage an Markus gesendet.'], ['03.02. · 16:40', 'Fußball Felix in den Kalender übernommen.']].map(([ts, txt]) => /*#__PURE__*/React.createElement("div", {
        key: ts,
        style: {
          display: 'flex',
          gap: 12,
          padding: '10px 0',
          borderTop: '1px solid var(--sand-200)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--ink-400)',
          width: 92,
          flexShrink: 0
        }
      }, ts), /*#__PURE__*/React.createElement("span", {
        style: t.sm
      }, txt))))
    },
    privacy: {
      title: 'Datenschutz',
      body: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--wald-100)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "shield",
        size: 17,
        color: "var(--wald-700)"
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          ...t.sm,
          color: 'var(--wald-700)',
          fontWeight: 600
        }
      }, "Streng gesch\xFCtzt")), /*#__PURE__*/React.createElement("p", {
        style: t.sm
      }, "Nur eure Familie sieht eure Daten \u2014 niemals verkauft, niemals geteilt. (DSGVO)"), /*#__PURE__*/React.createElement(SettingToggle, {
        label: "Aktivit\xE4t still protokollieren",
        sub: "F\xFCr faire Nachweise \u2014 nur f\xFCr euch sichtbar",
        def: true
      }))
    }
  };
  const sc = sheet ? sheetContent[sheet] : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: 'var(--sand-50)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '56px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      color: 'var(--ink-600)',
      fontFamily: 'var(--font-body)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 18,
    color: "var(--ink-600)"
  }), " Zur\xFCck")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 12px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: t.h1
  }, "Konto", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--apricot-500)'
    }
  }, "."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Lisa Wagner",
    tone: "wald",
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, "Lisa Wagner"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...t.caption,
      marginTop: 2
    }
  }, "lisa@example.de \xB7 Familie Wagner")), /*#__PURE__*/React.createElement(Icon, {
    name: "pencil",
    size: 16,
    color: "var(--ink-400)"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSheet('premium'),
    style: {
      ...flatCard,
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 19,
    color: "var(--gold-500)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.body,
      fontSize: 15,
      flex: 1,
      fontWeight: 600
    }
  }, "Copara Premium"), /*#__PURE__*/React.createElement(Chip, {
    tone: "premium"
  }, "Aktiv \xB7 Familie")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Anzeige"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...flatCard,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 19,
    color: "var(--wald-700)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.body,
      fontSize: 15,
      flex: 1,
      fontWeight: 600
    }
  }, "Fokus-Modus"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onFocus(!focus),
    "aria-label": "Fokus-Modus",
    style: {
      width: 52,
      height: 30,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: focus ? 'var(--wald-700)' : 'var(--sand-200)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: focus ? 25 : 3,
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#FFFDF7',
      transition: 'left var(--transition-default)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.sm,
      marginTop: 10
    }
  }, "Eine Sache nach der anderen \u2014 ganz in Ruhe. Du siehst immer nur den n\xE4chsten Schritt, alles andere bleibt griffbereit."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Konto"), /*#__PURE__*/React.createElement("div", {
    style: flatCard
  }, row('rotate-ccw', 'Verlauf & Entschieden', null, null, 'verlauf', true), row('bell', 'Benachrichtigungen', 'An', null, 'bell'), row('calendar', 'Kalender-Sync', 'Aktiv', 'var(--wald-500)', 'sync'), row('chart-column', 'Statistik & Export', null, null, 'stats'), row('shield', 'Datenschutz', 'Streng geschützt', null, 'privacy'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '4px 16px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 19,
    color: "var(--ink-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: t.muted
  }, "Abmelden")), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center'
    }
  }, "Copara 1.0 \xB7 Getrennt und trotzdem zusammen!", /*#__PURE__*/React.createElement("br", null), "Deine Daten geh\xF6ren deiner Familie \u2014 niemals verkauft, niemals geteilt. (DSGVO)")), /*#__PURE__*/React.createElement(Sheet, {
    open: !!sheet,
    onClose: () => setSheet(null),
    height: "72%"
  }, sc && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...t.h2,
      flex: 1
    }
  }, sc.title), sc.premium && /*#__PURE__*/React.createElement(Chip, {
    tone: "premium"
  }, "Premium")), sc.body, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "large",
    onClick: () => setSheet(null),
    style: {
      width: '100%'
    }
  }, "Fertig")))));
}
window.CoparaAccountScreen = AccountScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/AccountScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/CalendarScreen.jsx
try { (() => {
/* Copara UI kit — Kalender: das Beschlossene. Pro-Kind-Umschalter (Alle · Mia · Felix · Emma),
   Drei-Farben-Custody (Wald = bei dir · Aprikose = Markus · Schiefer = Tom), „Als Nächstes".
   Ändern per Tipp öffnet ein Tages-Sheet. */
const calDS = window.CoparaDesignSystem_e5ed8c;
function CalendarScreen({
  onDay,
  focus
}) {
  const {
    Icon,
    Chip
  } = calDS;
  const t = window.coparaType;
  const [child, setChild] = React.useState('alle');
  const [showMonth, setShowMonth] = React.useState(!focus);
  React.useEffect(() => {
    setShowMonth(!focus);
  }, [focus]);

  // Februar 2026 — 1. Feb ist Sonntag. Mo-erste Woche.
  const leadBlanks = 6;
  const days = Array.from({
    length: 28
  }, (_, i) => i + 1);
  const today = 10;

  // Custody pro Kind (Kanon): Mia & Felix bei Markus 9.–15., sonst bei Lisa.
  // Emma bei Tom bis 17., kommt am 18. zu Lisa.
  const locMF = d => d >= 9 && d <= 15 ? 'markus' : 'lisa';
  const locE = d => d < 18 ? 'tom' : 'lisa';
  const P = {
    lisa: {
      bg: 'var(--wald-100)',
      ink: 'var(--wald-700)',
      dot: 'var(--wald-500)'
    },
    markus: {
      bg: 'var(--apricot-100)',
      ink: 'var(--apricot-700)',
      dot: 'var(--apricot-500)'
    },
    tom: {
      bg: 'var(--person-c-100)',
      ink: 'var(--person-c-700)',
      dot: 'var(--person-c-500)'
    }
  };
  const termine = {
    11: 'var(--apricot-500)',
    16: 'var(--wald-500)',
    18: 'var(--person-c-500)',
    19: 'var(--wald-500)'
  };
  const offen = {
    28: true
  };
  const cell = d => {
    const isToday = d === today;
    let bg = 'var(--sand-0)',
      ink = 'var(--ink-600)',
      border = '1px solid var(--sand-200)',
      dots = null;
    if (child === 'mia' || child === 'felix') {
      const c = P[locMF(d)];
      bg = c.bg;
      ink = c.ink;
      border = 'none';
    } else if (child === 'emma') {
      const c = P[locE(d)];
      bg = c.bg;
      ink = c.ink;
      border = 'none';
    } else {
      const allHome = locMF(d) === 'lisa' && locE(d) === 'lisa';
      bg = allHome ? 'var(--wald-100)' : 'var(--sand-0)';
      border = allHome ? 'none' : '1px solid var(--sand-200)';
      ink = 'var(--ink-900)';
      if (!allHome) dots = [P[locMF(d)].dot, P[locE(d)].dot];
    }
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => onDay(d),
      style: {
        position: 'relative',
        height: 44,
        borderRadius: 'var(--radius-md)',
        border: isToday ? '2px solid var(--wald-700)' : border,
        background: bg,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: isToday ? 700 : 500,
        color: ink
      }
    }, d), dots && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 5,
        display: 'flex',
        gap: 3
      }
    }, dots.map((c, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: c
      }
    }))), !dots && termine[d] && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 4,
        width: 16,
        height: 3,
        borderRadius: 2,
        background: termine[d]
      }
    }), offen[d] && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--apricot-500)'
      }
    }));
  };

  // Dynamische Legende je nach Kind
  const legend = child === 'emma' ? [['lisa', 'bei dir'], ['tom', 'bei Tom']] : child === 'alle' ? [['lisa', 'bei dir'], ['markus', 'bei Markus'], ['tom', 'bei Tom']] : [['lisa', 'bei dir'], ['markus', 'bei Markus']];
  const kids = [['alle', 'Alle'], ['mia', 'Mia'], ['felix', 'Felix'], ['emma', 'Emma']];
  const next = [{
    icon: 'clock',
    when: 'Morgen',
    what: 'Fußball Felix · Markus fährt',
    tone: 'apricot'
  }, {
    icon: 'arrow-left-right',
    when: 'In 6 Tagen',
    what: 'Übergabe an dich · Schule',
    tone: 'wald'
  }, {
    icon: 'map-pin',
    when: 'In 8 Tagen',
    what: 'Emma kommt zu dir · von Tom',
    tone: 'schiefer'
  }, {
    icon: 'users',
    when: 'In 9 Tagen',
    what: 'Abholung durch Oma Anna',
    tone: 'neutral'
  }];
  const toneColor = {
    apricot: 'var(--apricot-500)',
    wald: 'var(--wald-500)',
    schiefer: 'var(--person-c-500)',
    neutral: 'var(--ink-400)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: 'var(--sand-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 20px 0',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...t.h1,
      flex: 1
    }
  }, "Kalender", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--apricot-500)'
    }
  }, ".")), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 22,
    color: "var(--ink-400)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.h3
    }
  }, "Februar"), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 22,
    color: "var(--ink-600)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '14px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 1,
      overflowX: 'auto'
    }
  }, kids.map(([id, l]) => {
    const on = child === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setChild(id),
      style: {
        flexShrink: 0,
        height: 34,
        padding: '0 15px',
        borderRadius: 999,
        border: on ? 'none' : '1px solid var(--sand-200)',
        cursor: 'pointer',
        background: on ? 'var(--wald-700)' : 'var(--sand-0)',
        color: on ? '#FFFDF7' : 'var(--ink-600)',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 600
      }
    }, l);
  })), /*#__PURE__*/React.createElement(Chip, {
    tone: "premium"
  }, "Pro Kind")), showMonth && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      padding: '14px 20px 0',
      flexWrap: 'wrap'
    }
  }, legend.map(([p, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 4,
      background: P[p].bg,
      border: `1px solid ${P[p].dot}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: t.caption
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--apricot-500)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: t.caption
  }, "offen"))), showMonth ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 6,
      marginBottom: 6
    }
  }, ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      textAlign: 'center',
      ...t.caption,
      fontWeight: 600
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 6
    }
  }, Array.from({
    length: leadBlanks
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: 'b' + i
  })), days.map(cell))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--wald-100)',
      borderRadius: 'var(--radius-lg)',
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.overline,
      letterSpacing: '0.06em',
      color: 'var(--wald-500)',
      marginBottom: 8
    }
  }, "Diese Woche"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 20,
      lineHeight: 1.3,
      color: 'var(--wald-700)'
    }
  }, "Mia & Felix bei Markus, Emma bei Tom."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.sm,
      color: 'var(--wald-700)',
      marginTop: 6
    }
  }, "Zur\xFCck zu dir am Mo, 16. Feb, 8:00.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowMonth(true),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '14px 2px 0',
      color: 'var(--ink-600)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 16,
    color: "var(--ink-600)"
  }), " Monat anzeigen")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 16px 140px'
    }
  }, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, {
    style: {
      marginLeft: 4
    }
  }, "Als N\xE4chstes \u2014 vereinbart"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--sand-200)',
      overflow: 'hidden'
    }
  }, next.map((n, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => onDay(19),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      border: 'none',
      borderTop: i ? '1px solid var(--sand-200)' : 'none',
      background: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--sand-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 17,
    color: toneColor[n.tone]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, n.when), /*#__PURE__*/React.createElement("div", {
    style: {
      ...t.sm,
      marginTop: 1
    }
  }, n.what)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--ink-400)"
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center',
      marginTop: 12
    }
  }, "\xC4ndern per Tipp \u2014 alles Offene wartet im To-Do.")));
}
window.CoparaCalendarScreen = CalendarScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/CalendarScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/FamilyScreen.jsx
try { (() => {
/* Copara UI kit — Familie: Mitglieder & Rollen (pro Kind), Premium, „Als Oma Anna ansehen",
   Person hinzufügen. Kinder & Erwachsene sind antippbar → bearbeiten / entfernen. */
const famDS = window.CoparaDesignSystem_e5ed8c;
function FamilyScreen({
  onAddPerson,
  onPaywall,
  onOmaView
}) {
  const {
    Icon,
    Avatar,
    Chip,
    Sheet,
    Button
  } = famDS;
  const t = window.coparaType;
  const card = {
    background: 'var(--sand-0)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--sand-200)',
    overflow: 'hidden'
  };
  const [kids, setKids] = React.useState([{
    name: 'Mia',
    parents: [['LW', 'wald'], ['MB', 'apricot']],
    sub: 'Lisa & Markus'
  }, {
    name: 'Felix',
    parents: [['LW', 'wald'], ['MB', 'apricot']],
    sub: 'Lisa & Markus'
  }, {
    name: 'Emma',
    parents: [['LW', 'wald'], ['TB', 'schiefer']],
    sub: 'Lisa & Tom'
  }]);
  const [adults, setAdults] = React.useState([{
    name: 'Lisa Wagner',
    tone: 'wald',
    role: 'Du · alle Kinder',
    you: true
  }, {
    name: 'Markus Berg',
    tone: 'apricot',
    role: 'Co-Elternteil · Mia & Felix'
  }, {
    name: 'Tom Baumann',
    tone: 'schiefer',
    role: 'Co-Elternteil · Emma'
  }, {
    name: 'Oma Anna',
    tone: 'neutral',
    role: 'Bezugsperson · lesen mit (Mia & Felix)'
  }]);
  const [sel, setSel] = React.useState(null); // { type, data }
  const [confirm, setConfirm] = React.useState(false);
  const close = () => {
    setSel(null);
    setConfirm(false);
  };
  const remove = () => {
    if (sel.type === 'kind') setKids(k => k.filter(x => x.name !== sel.data.name));else setAdults(a => a.filter(x => x.name !== sel.data.name));
    close();
  };
  const toneAvatar = {
    wald: 'var(--wald-100)',
    apricot: 'var(--apricot-100)',
    schiefer: 'var(--person-c-100)'
  };
  const toneInk = {
    wald: 'var(--wald-700)',
    apricot: 'var(--apricot-700)',
    schiefer: 'var(--person-c-700)'
  };
  const editRow = (icon, label, first) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 4px',
      borderTop: first ? 'none' : '1px solid var(--sand-200)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: "var(--ink-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.body,
      fontSize: 15,
      flex: 1
    }
  }, label), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--ink-400)"
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: 'var(--sand-50)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 20px 8px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: t.h1
  }, "Eure Familie", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--apricot-500)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.sm,
      marginTop: 4
    }
  }, "Eltern gelten pro Kind \u2014 jede Person plant und sieht nur ihre Kinder.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px 140px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Kinder"), /*#__PURE__*/React.createElement("div", {
    style: card
  }, kids.map((k, i) => /*#__PURE__*/React.createElement("button", {
    key: k.name,
    onClick: () => setSel({
      type: 'kind',
      data: k
    }),
    style: {
      width: '100%',
      textAlign: 'left',
      background: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderTop: i ? '1px solid var(--sand-200)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: k.name,
    tone: "neutral",
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, k.name), /*#__PURE__*/React.createElement("div", {
    style: t.sm
  }, k.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, k.parents.map(([ini, tone], j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: toneAvatar[tone],
      color: toneInk[tone],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 600,
      marginLeft: j ? -8 : 0,
      border: '2px solid var(--sand-0)'
    }
  }, ini))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--ink-400)",
    style: {
      marginLeft: 4
    }
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Erwachsene"), /*#__PURE__*/React.createElement("div", {
    style: card
  }, adults.map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: a.name,
    onClick: () => setSel({
      type: 'adult',
      data: a
    }),
    style: {
      width: '100%',
      textAlign: 'left',
      background: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderTop: i ? '1px solid var(--sand-200)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.name,
    tone: a.tone,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: t.sm
  }, a.role)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--ink-400)"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onAddPerson,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderTop: '1px solid var(--sand-200)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--wald-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user-plus",
    size: 19,
    color: "var(--wald-700)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--wald-700)',
      flex: 1
    }
  }, "Person hinzuf\xFCgen"), /*#__PURE__*/React.createElement(Chip, {
    tone: "premium"
  }, "Premium")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--premium-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 20,
    color: "var(--gold-900)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, "Premium ist aktiv"), /*#__PURE__*/React.createElement("div", {
    style: t.sm
  }, "Tr\xE4gt das Netz um eure Kinder \xB7 4,99 \u20AC/Monat")), /*#__PURE__*/React.createElement(Chip, {
    tone: "premium"
  }, "aktiv")), /*#__PURE__*/React.createElement("button", {
    onClick: onOmaView,
    style: {
      ...card,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--sand-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 19,
    color: "var(--ink-600)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, "Als Oma Anna ansehen"), /*#__PURE__*/React.createElement("div", {
    style: t.sm
  }, "So sieht die Bezugsperson eure Familie.")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--ink-400)"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 13,
    color: "var(--ink-400)"
  }), " Nur eure Familie sieht eure Daten \u2014 niemals verkauft, niemals geteilt.")), /*#__PURE__*/React.createElement(Sheet, {
    open: sel !== null,
    onClose: close,
    height: "62%"
  }, sel && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: sel.data.name,
    tone: sel.type === 'kind' ? 'neutral' : sel.data.tone,
    size: 48
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...t.h2,
      fontSize: 21
    }
  }, sel.data.name), /*#__PURE__*/React.createElement("p", {
    style: t.sm
  }, sel.type === 'kind' ? sel.data.sub : sel.data.role))), sel.type === 'kind' ? /*#__PURE__*/React.createElement("div", null, editRow('pencil', 'Name & Geburtstag', true), editRow('file-text', 'Info-Seite — Gesundheit, Schule, Größen'), editRow('users', 'Eltern & Zuständigkeit')) : /*#__PURE__*/React.createElement("div", null, editRow('pencil', 'Name bearbeiten', true), editRow('users', sel.data.you ? 'Deine Zuständigkeit' : 'Rolle & Kinder'), editRow('bell', 'Benachrichtigungen')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingBottom: 6
    }
  }, sel.type === 'adult' && sel.data.you ? /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center'
    }
  }, "Das bist du \u2014 dein Zugang bleibt bestehen.") : confirm ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-md)',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.sm,
      color: 'var(--ink-900)',
      textAlign: 'center',
      marginBottom: 12
    }
  }, sel.type === 'kind' ? `${sel.data.name} aus eurer Familie entfernen? Kalender und Infos werden gelöst.` : `${sel.data.name.split(' ')[0]} den Zugang entziehen? Die Person sieht eure Familie dann nicht mehr.`), /*#__PURE__*/React.createElement("button", {
    onClick: remove,
    style: {
      width: '100%',
      height: 52,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: 'var(--clay-500)',
      color: '#FFFDF7',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      fontWeight: 600
    }
  }, sel.type === 'kind' ? 'Endgültig entfernen' : 'Zugang entziehen'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirm(false),
    style: {
      width: '100%',
      height: 44,
      marginTop: 8,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--ink-600)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500
    }
  }, "Abbrechen")) : /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirm(true),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: '100%',
      height: 48,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--clay-500)',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17,
    color: "var(--clay-500)"
  }), sel.type === 'kind' ? 'Kind entfernen' : 'Aus Familie entfernen')))));
}
window.CoparaFamilyScreen = FamilyScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/FamilyScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/Flows.jsx
try { (() => {
/* Copara UI kit — Flows als Bottom-Sheets: Antworten (Bestätigen/Gegenvorschlag/Später),
   Anfrage stellen (Plus), Person hinzufügen, Tages-Sheet. */
const flowDS = window.CoparaDesignSystem_e5ed8c;

/* Antworten — Bill-Eddy-Methode: nie „Ablehnen". Ton-Check als sanftes Angebot. */
function AnswerSheet({
  open,
  task,
  onClose,
  onDone
}) {
  const {
    Sheet,
    Button,
    Icon,
    Avatar
  } = flowDS;
  const t = window.coparaType;
  if (!task) return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    height: "1%"
  }, /*#__PURE__*/React.createElement("div", null));
  const broadcast = task.who === 'Broadcast';
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    height: "66%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: broadcast ? 'An Alle' : task.who,
    tone: task.tone,
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: t.caption
  }, broadcast ? 'Frage an alle' : `${task.kind} von ${task.who}`), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...t.h2,
      fontSize: 20,
      marginTop: 2
    }
  }, task.title))), /*#__PURE__*/React.createElement("p", {
    style: t.sm
  }, task.ctx), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 14px',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 17,
    color: "var(--wald-500)",
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: t.sm
  }, broadcast ? 'Erste Zusage gewinnt · du kannst 24 h widersprechen.' : 'Tust du nichts, bleibt die Anfrage offen — kein Druck.')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "large",
    onClick: onDone
  }, broadcast ? 'Ich übernehme' : 'Bestätigen'), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "large",
    onClick: onDone
  }, "Gegenvorschlag"), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "large",
    onClick: onClose
  }, "Sp\xE4ter"))));
}
window.CoparaAnswerSheet = AnswerSheet;

/* Broadcast (#4a) — „An alle": erste Zusage gewinnt. Personenliste mit Status. */
function BroadcastSheet({
  open,
  onClose,
  onResult
}) {
  const {
    Sheet,
    Button,
    Icon,
    Avatar,
    Chip
  } = flowDS;
  const t = window.coparaType;
  const people = [{
    name: 'Oma Anna',
    tone: 'neutral',
    status: 'übernimmt',
    chip: 'wald'
  }, {
    name: 'Markus Berg',
    tone: 'apricot',
    status: 'nicht nötig',
    chip: 'neutral',
    dim: true
  }, {
    name: 'Opa Heinz',
    tone: 'neutral',
    status: 'nicht nötig',
    chip: 'neutral',
    dim: true
  }, {
    name: 'Au-pair Sofia',
    tone: 'neutral',
    status: 'nicht nötig',
    chip: 'neutral',
    dim: true
  }];
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    height: "78%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: t.caption
  }, "Frage an alle"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...t.h2,
      fontSize: 21,
      marginTop: 2
    }
  }, "Wer \xFCbernimmt den 28. Februar?"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.sm,
      marginTop: 6
    }
  }, "Kinderarzt Mia, 14:00 \xB7 erste Zusage gewinnt.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      border: '1px solid var(--sand-200)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, people.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '13px 15px',
      borderTop: i ? '1px solid var(--sand-200)' : 'none',
      opacity: p.dim ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    tone: p.tone,
    size: 38
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.body,
      fontSize: 15,
      fontWeight: 600,
      flex: 1
    }
  }, p.name), /*#__PURE__*/React.createElement(Chip, {
    tone: p.chip
  }, p.status)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 14px',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 17,
    color: "var(--wald-500)",
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: t.sm
  }, "Oma Anna hat zugesagt. Du kannst bis Mi, 14:02 widersprechen \u2014 sonst gilt ihre Zusage.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "large",
    onClick: () => onResult('bestätigt')
  }, "Passt f\xFCr mich"), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "large",
    onClick: () => onResult('übernommen')
  }, "Ich \xFCbernehme lieber selbst"))));
}
window.CoparaBroadcastSheet = BroadcastSheet;

/* Anfrage stellen (Plus) */
function RequestSheet({
  open,
  onClose,
  onSent
}) {
  const {
    Sheet,
    Button,
    Icon,
    Chip
  } = flowDS;
  const t = window.coparaType;
  const [span, setSpan] = React.useState('zeitraum');
  const [rcpt, setRcpt] = React.useState('markus');
  const seg = [['tag', 'Ein Tag'], ['zeitraum', 'Zeitraum'], ['serie', 'Serie']];
  const rcpts = [{
    id: 'markus',
    label: 'An Markus',
    sub: 'direkt an den anderen Elternteil',
    premium: false
  }, {
    id: 'alle',
    label: 'An alle',
    sub: 'erste Zusage gewinnt',
    premium: true
  }, {
    id: 'oma',
    label: 'Nur an Oma & Opa',
    sub: 'Bezugspersonen',
    premium: true
  }];
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    height: "82%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: t.h2
  }, "Anfrage stellen"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: 'var(--sand-100)',
      borderRadius: 999,
      padding: 4
    }
  }, seg.map(([id, l]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setSpan(id),
    style: {
      flex: 1,
      height: 38,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: span === id ? 'var(--sand-0)' : 'transparent',
      color: span === id ? 'var(--ink-900)' : 'var(--ink-600)',
      boxShadow: span === id ? 'var(--shadow-card)' : 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      border: '1px solid var(--sand-200)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 20,
    color: "var(--wald-700)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, "30. M\xE4rz \u2013 3. April"), /*#__PURE__*/React.createElement("div", {
    style: t.sm
  }, "5 Tage \xB7 Osterferien \xB7 Mia & Felix")), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--wald-700)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, "\xC4ndern")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Empf\xE4nger"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, rcpts.map(r => {
    const on = rcpt === r.id;
    return /*#__PURE__*/React.createElement("button", {
      key: r.id,
      onClick: () => setRcpt(r.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 15px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        border: on ? '2px solid var(--wald-700)' : '1px solid var(--sand-200)',
        background: on ? 'var(--wald-100)' : 'var(--sand-0)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: on ? '6px solid var(--wald-700)' : '2px solid var(--ink-400)',
        boxSizing: 'border-box'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--ink-900)'
      }
    }, r.label), /*#__PURE__*/React.createElement("div", {
      style: t.sm
    }, r.sub)), r.premium && /*#__PURE__*/React.createElement(Chip, {
      tone: "premium"
    }, "Premium"));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-sm)',
      padding: '12px 14px',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 17,
    color: "var(--amber-500)",
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: t.sm
  }, "Auslandsferien? Copara erinnert an die Reise-Erlaubnis. Gegentag ist optional.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "large",
    onClick: onSent,
    style: {
      width: '100%'
    }
  }, "Weiter"))));
}
window.CoparaRequestSheet = RequestSheet;

/* Person hinzufügen */
function AddPersonSheet({
  open,
  onClose
}) {
  const {
    Sheet,
    Button,
    Icon
  } = flowDS;
  const t = window.coparaType;
  const [role, setRole] = React.useState('co');
  const [kids, setKids] = React.useState({
    Mia: true,
    Felix: true,
    Emma: false
  });
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    height: "80%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: t.h2
  }, "Person hinzuf\xFCgen"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Rolle"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['co', 'Co-Elternteil', 'gleichberechtigt für seine Kinder'], ['bezug', 'Bezugsperson', 'sieht nur ihren Ausschnitt']].map(([id, l, s]) => {
    const on = role === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setRole(id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 15px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        border: on ? '2px solid var(--wald-700)' : '1px solid var(--sand-200)',
        background: on ? 'var(--wald-100)' : 'var(--sand-0)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: on ? '6px solid var(--wald-700)' : '2px solid var(--ink-400)',
        boxSizing: 'border-box'
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--ink-900)'
      }
    }, l), /*#__PURE__*/React.createElement("div", {
      style: t.sm
    }, s)));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "F\xFCr welche Kinder?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, Object.keys(kids).map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setKids(c => ({
      ...c,
      [k]: !c[k]
    })),
    style: {
      height: 40,
      padding: '0 18px',
      borderRadius: 999,
      cursor: 'pointer',
      border: kids[k] ? '2px solid var(--wald-700)' : '1px solid var(--sand-200)',
      background: kids[k] ? 'var(--wald-700)' : 'var(--sand-0)',
      color: kids[k] ? '#FFFDF7' : 'var(--ink-600)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, k)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-100)',
      borderRadius: 'var(--radius-md)',
      padding: 16,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: t.sm
  }, "Teile diesen Code mit der Person, die du einladen m\xF6chtest:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 30,
      letterSpacing: '0.16em',
      color: 'var(--wald-700)',
      fontWeight: 400,
      margin: '8px 0'
    }
  }, "T7KM2P"), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--wald-700)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "copy",
    size: 15,
    color: "var(--wald-700)"
  }), " Code kopieren"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      marginTop: 10
    }
  }, "Beim Einrichten der App wird der Code einmal eingegeben \u2014 dann seid ihr verbunden.")), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 13,
    color: "var(--ink-400)"
  }), " Nur eure Familie sieht eure Daten \u2014 niemals verkauft, niemals geteilt."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "large",
    onClick: onClose,
    style: {
      width: '100%'
    }
  }, "Fertig"))));
}
window.CoparaAddPersonSheet = AddPersonSheet;

/* Tages-Sheet (Ändern per Tipp) */
function DaySheet({
  open,
  onClose,
  onRequest
}) {
  const {
    Sheet,
    Button,
    Icon
  } = flowDS;
  const t = window.coparaType;
  return /*#__PURE__*/React.createElement(Sheet, {
    open: open,
    onClose: onClose,
    height: "58%"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: t.caption
  }, "bei dir"), /*#__PURE__*/React.createElement("h2", {
    style: t.h2
  }, "Donnerstag, 19. Februar")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      border: '1px solid var(--sand-200)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--sand-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 17,
    color: "var(--ink-600)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ink-900)'
    }
  }, "Abholung durch Oma Anna"), /*#__PURE__*/React.createElement("div", {
    style: t.sm
  }, "15:30")), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--wald-700)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, "\xC4ndern")), /*#__PURE__*/React.createElement("p", {
    style: t.sm
  }, "\xC4nderungen gehen als ruhige Anfrage an die Beteiligten \u2014 nichts wird \xFCberschrieben."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "large",
    onClick: onRequest
  }, "Wechsel f\xFCr diesen Tag anfragen"), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "large",
    onClick: onClose
  }, "Sp\xE4ter"))));
}
window.CoparaDaySheet = DaySheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/Flows.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/FocusMode.jsx
try { (() => {
/* Copara UI kit — Fokus-Modus (Runde 6). Reiner Anzeige-Modus: zeigt immer nur EINE Sache.
   Zähler, ein Auftrag (Status-Ampel), ein Knopf, „Später — kommt ans Ende".
   Endzustand IMMER die Garantie-Karte: „Das war alles. Du hast nichts übersehen." */
const focusDS = window.CoparaDesignSystem_e5ed8c;
function FocusTodo(props) {
  const scenario = props.scenario || window.CoparaScenarios.zwei;
  const {
    onExit,
    onOpenAccount
  } = props;
  const {
    Icon,
    Avatar
  } = focusDS;
  const t = window.coparaType;
  const [queue, setQueue] = React.useState(scenario.tasks.map(x => x.id));
  const [sheet, setSheet] = React.useState(null);
  React.useEffect(() => {
    setQueue(scenario.tasks.map(x => x.id));
  }, [scenario.id]);
  const total = scenario.tasks.length;
  const byId = id => scenario.tasks.find(x => x.id === id);
  const current = queue.length ? byId(queue[0]) : null;
  const doneCount = total - queue.length;
  const remainingAfter = queue.length - 1;
  const answerDone = () => {
    setSheet(null);
    setQueue(q => q.slice(1));
  };
  const later = () => setQueue(q => q.length > 1 ? [...q.slice(1), q[0]] : q);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: 'var(--sand-50)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 18,
    color: "var(--wald-700)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--wald-700)'
    }
  }, "Fokus")), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenAccount,
    "aria-label": "Konto",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Lisa Wagner",
    tone: "wald",
    size: 38
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 20px 140px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100% - 100px)'
    }
  }, current ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.overline,
      letterSpacing: '0.08em',
      color: 'var(--ink-400)',
      textAlign: 'center',
      marginBottom: 18
    }
  }, doneCount + 1, " von ", total), /*#__PURE__*/React.createElement(window.CoparaStatusAmpel, {
    state: "now",
    headline: current.focusHeadline || current.title,
    context: current.ctx,
    actionLabel: current.broadcast ? 'Ansehen' : 'Antworten',
    onAction: () => setSheet(current)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: later,
    style: {
      display: 'block',
      margin: '16px auto 0',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--ink-400)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      padding: '8px 12px'
    }
  }, "Auf sp\xE4ter verschieben"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center',
      marginTop: 22
    }
  }, remainingAfter > 0 ? `Danach ${remainingAfter === 1 ? 'ist noch eine Sache übrig' : `sind noch ${remainingAfter} Sachen übrig`}.` : 'Danach bist du fertig.')) :
  /*#__PURE__*/
  /* Garantie-Karte */
  React.createElement("div", {
    style: {
      margin: 'auto 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--status-clear-gradient)',
      borderRadius: 'var(--radius-lg)',
      padding: '26px 22px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 14px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 26,
    color: "var(--status-clear-ink)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 26,
      lineHeight: 1.2,
      color: 'var(--status-clear-ink)'
    }
  }, "Das war alles."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14.5,
      lineHeight: 1.5,
      color: 'var(--status-clear-sub)',
      margin: '10px 0 0'
    }
  }, "Du hast nichts \xFCbersehen. Copara meldet sich, wenn etwas Neues dazukommt.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 16,
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 17,
    color: "var(--ink-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.sm
    }
  }, "Als N\xE4chstes: in 6 Tagen \u2014 Mo, 16. Feb, 8:00 \xB7 \xDCbergabe Schule."))), /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    style: {
      marginTop: 'auto',
      paddingTop: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--ink-400)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500
    }
  }, "Fokus-Modus verlassen")), current && current.broadcast ? /*#__PURE__*/React.createElement(window.CoparaBroadcastSheet, {
    open: !!sheet,
    onClose: () => setSheet(null),
    onResult: answerDone
  }) : /*#__PURE__*/React.createElement(window.CoparaAnswerSheet, {
    open: !!sheet,
    task: sheet,
    onClose: () => setSheet(null),
    onDone: answerDone
  }));
}
window.CoparaFocusTodo = FocusTodo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/FocusMode.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/OmaView.jsx
try { (() => {
/* Copara UI kit — „Als Oma Anna ansehen": Klartext-Dritt-Ansicht (Runde 5).
   Bezugspersonen sehen ganze Sätze statt Raster, nur ihren Ausschnitt (Mia & Felix). */
const omaDS = window.CoparaDesignSystem_e5ed8c;
function OmaView({
  onExit
}) {
  const {
    Icon,
    Avatar
  } = omaDS;
  const t = window.coparaType;
  const card = {
    background: 'var(--sand-0)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--sand-200)',
    padding: 18
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: 'var(--sand-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      background: 'var(--apricot-100)',
      padding: '54px 20px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 17,
    color: "var(--apricot-700)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.sm,
      color: 'var(--apricot-700)',
      fontWeight: 600,
      flex: 1
    }
  }, "Vorschau: So sieht Oma Anna eure Familie"), /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    style: {
      border: 'none',
      background: 'var(--sand-0)',
      borderRadius: 999,
      cursor: 'pointer',
      padding: '6px 12px',
      color: 'var(--apricot-700)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600
    }
  }, "Schlie\xDFen")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Oma Anna",
    tone: "neutral",
    size: 44
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...t.h1,
      fontSize: 24
    }
  }, "Hallo Anna"), /*#__PURE__*/React.createElement("p", {
    style: t.sm
  }, "Du siehst mit: Mia & Felix"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--apricot-100)',
      borderRadius: 'var(--radius-lg)',
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.overline,
      letterSpacing: '0.06em',
      color: 'var(--apricot-700)',
      marginBottom: 8
    }
  }, "Kannst du helfen?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--apricot-700)',
      lineHeight: 1.4
    }
  }, "Am 28. Februar wird jemand f\xFCr Mias Arzttermin gebraucht."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.sm,
      color: 'var(--apricot-700)',
      marginTop: 6
    }
  }, "Kinderarzt, 14:00. Du hast schon zugesagt \u2014 danke.")), /*#__PURE__*/React.createElement("div", {
    style: card
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.overline,
      letterSpacing: '0.06em',
      color: 'var(--ink-400)',
      marginBottom: 8
    }
  }, "Als N\xE4chstes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: t.body
  }, "Do, 19. Februar, 15:30 \u2014 du holst Felix von der Schule."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.muted,
      fontSize: 15
    }
  }, "Mo, 16. Februar \u2014 die Kinder sind wieder bei Lisa."))), /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 13,
    color: "var(--ink-400)"
  }), " Du siehst nur, was f\xFCr Mia & Felix wichtig ist \u2014 sonst nichts.")));
}
window.CoparaOmaView = OmaView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/OmaView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/Splash.jsx
try { (() => {
/* Copara UI kit — Startbildschirm im Website-Hero-Cut.
   Signatur-Animation, handanimiert (requestAnimationFrame), spielt GENAU EINMAL:
   Anticipation (die Kreise umarmen den neugeborenen Punkt), Squash & Stretch bei der Geburt,
   Sehnsuchts-Beat in der Trennung, Wachstum der Annäherung entgegen, Kontakt mit Squash,
   gedämpftem Nachschwingen und Glow-Funken — danach ein lebendiger Halt (nur der Glow atmet).
   Die Kreise berühren nur den Punkt, nie einander. */
function SplashScreen({
  onDone
}) {
  const [leaving, setLeaving] = React.useState(false);
  const lRef = React.useRef(null),
    rRef = React.useRef(null),
    dRef = React.useRef(null);
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, 440);
  };
  React.useEffect(() => {
    const L = lRef.current,
      R = rRef.current,
      D = dRef.current;
    const paint = (l, r, sx, sy, glowExtra) => {
      if (L) L.style.transform = `translate3d(${l}px,0,0)`;
      if (R) R.style.transform = `translate3d(${r}px,0,0)`;
      if (D) {
        D.style.transform = `scale(${Math.max(0, sx)}, ${Math.max(0, sy)})`;
        D.style.opacity = sx <= 0.02 ? '0' : '1';
        const a = Math.min(1, 0.25 + 0.45 * sy + (glowExtra || 0) * 0.5);
        D.style.boxShadow = `0 0 ${6 + 12 * sy + 24 * (glowExtra || 0)}px rgba(232,168,124,${a})`;
      }
    };
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(-39, 39, 1, 1, 0); // verbundener Endzustand
      return;
    }
    const clamp01 = t => t < 0 ? 0 : t > 1 ? 1 : t;
    const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const backOut = (t, s = 1.9) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
    const lerp = (a, b, t) => a + (b - a) * t;

    // Posen: Überlappung ±14 · Umarmung ±9 · getrennt ±64 · verbunden ±39 (Kontakt am Punkt)
    const OVERLAP = 14,
      HUG = 9,
      APART = 64,
      LINK = 39,
      DOT_S = 0.55;
    // Story-Beats in Sekunden — spielt einmal, keine Wiederholung
    const T_HUG = 0.55,
      T_HOLD = 0.9,
      T_APART = 2.05,
      T_LONG = 2.55,
      T_LINK = 3.65,
      T_END = 5.6;
    const circleX = t => {
      if (t <= 0) return OVERLAP;
      if (t < T_HUG) return lerp(OVERLAP, HUG, easeOut(t / T_HUG));
      if (t < T_HOLD) return HUG;
      if (t < T_APART) return lerp(HUG, APART, easeInOut((t - T_HOLD) / (T_APART - T_HOLD)));
      if (t < T_LONG) return APART;
      if (t < T_LINK) return lerp(APART, LINK, easeInOut((t - T_LONG) / (T_LINK - T_LONG)));
      const s = t - T_LINK; // Micro-Recoil nach dem Kontakt, gedämpft
      return LINK + 1.6 * Math.exp(-s * 5) * Math.sin(s * 16);
    };
    const dotAt = t => {
      if (t < 0.12) return {
        sx: 0,
        sy: 0,
        glow: 0
      };
      if (t < T_HUG) {
        // Geburt: Pop mit Squash & Stretch + kleiner Funke
        const k = clamp01((t - 0.12) / (T_HUG - 0.12));
        const b = DOT_S * backOut(k, 2.2);
        return {
          sx: b * (1 + 0.22 * (1 - k)),
          sy: b * (1 - 0.18 * (1 - k)),
          glow: 0.35 * (1 - k)
        };
      }
      if (t < T_LONG + 0.3) return {
        sx: DOT_S,
        sy: DOT_S,
        glow: 0
      };
      if (t < T_LINK) {
        // wächst der Annäherung entgegen
        const k = clamp01((t - (T_LONG + 0.3)) / (T_LINK - (T_LONG + 0.3)));
        const g = lerp(DOT_S, 1, easeOut(k));
        return {
          sx: g,
          sy: g,
          glow: 0
        };
      }
      // Kontakt: die Energie geht in den Punkt — Squash, gedämpftes Nachschwingen, Glow-Flare
      const s = t - T_LINK;
      const osc = Math.exp(-s * 4.5) * Math.cos(s * 14);
      return {
        sx: 1 - 0.16 * osc,
        sy: 1 + 0.14 * osc,
        glow: Math.exp(-s * 2.4)
      };
    };
    let raf,
      start = null,
      idleStart = null;
    const idle = ts => {
      // lebendiger Halt: nur der Glow atmet — keine Wiederholung der Geschichte
      if (idleStart == null) idleStart = ts;
      const s = (ts - idleStart) / 1000;
      const b = 0.5 + 0.5 * Math.sin(s * 2 * Math.PI / 4.2);
      if (D) D.style.boxShadow = `0 0 ${16 + 5 * b}px rgba(232,168,124,${0.55 + 0.18 * b})`;
      raf = requestAnimationFrame(idle);
    };
    const frame = ts => {
      if (start == null) start = ts;
      const t = (ts - start) / 1000;
      const lx = circleX(t);
      const rx = circleX(t - 0.09); // Follow-through: der rechte Kreis zieht minimal nach
      const d = dotAt(t);
      paint(-lx, rx, d.sx, d.sy, d.glow);
      if (t < T_END) {
        raf = requestAnimationFrame(frame);
      } else {
        paint(-LINK, LINK, 1, 1, 0);
        raf = requestAnimationFrame(idle);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    onClick: enter,
    className: 'cop-splash' + (leaving ? ' cop-splash-out' : ''),
    style: {
      position: 'absolute',
      inset: 0,
      background: '#14211B',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      zIndex: 200,
      padding: '0 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cop-blob",
    style: {
      position: 'absolute',
      top: -140,
      right: -150,
      width: 360,
      height: 360,
      borderRadius: '50%',
      background: '#2E4B3F',
      filter: 'blur(60px)',
      opacity: 0.6,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "cop-blob",
    style: {
      position: 'absolute',
      bottom: -120,
      left: -150,
      width: 320,
      height: 320,
      borderRadius: '50%',
      background: '#C67E5C',
      filter: 'blur(70px)',
      opacity: 0.32,
      animationDelay: '0.6s',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      paddingTop: 68
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cop-fade-up",
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '-0.02em',
      color: '#F4EFE6',
      animationDelay: '0.1s'
    }
  }, "Copara", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#E8A87C'
    }
  }, "."))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 210,
      height: 80
    }
  }, /*#__PURE__*/React.createElement("span", {
    ref: lRef,
    style: {
      position: 'absolute',
      top: 8,
      left: '50%',
      width: 64,
      height: 64,
      marginLeft: -32,
      borderRadius: '50%',
      border: '2px solid rgba(244,239,230,0.85)',
      boxSizing: 'border-box',
      transform: 'translate3d(-14px,0,0)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    ref: rRef,
    style: {
      position: 'absolute',
      top: 8,
      left: '50%',
      width: 64,
      height: 64,
      marginLeft: -32,
      borderRadius: '50%',
      border: '2px solid #E8A87C',
      boxSizing: 'border-box',
      transform: 'translate3d(14px,0,0)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    ref: dRef,
    style: {
      position: 'absolute',
      top: 33,
      left: '50%',
      width: 14,
      height: 14,
      marginLeft: -7,
      borderRadius: '50%',
      background: '#E8A87C',
      transform: 'scale(0)',
      opacity: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      paddingBottom: 46
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "cop-fade-up",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'rgba(244,239,230,0.55)',
      animationDelay: '0.3s'
    }
  }, "Der ruhige Sorgerechts-Kalender"), /*#__PURE__*/React.createElement("h1", {
    className: "cop-fade-up",
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 52,
      lineHeight: 0.98,
      letterSpacing: '-0.03em',
      color: '#F4EFE6',
      margin: '16px 0 0',
      animationDelay: '0.42s'
    }
  }, "Getrennt.", /*#__PURE__*/React.createElement("br", null), "Und trotzdem", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#E8A87C'
    }
  }, "zusammen.")), /*#__PURE__*/React.createElement("p", {
    className: "cop-fade-up",
    style: {
      marginTop: 22,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'rgba(244,239,230,0.7)',
      maxWidth: 320,
      animationDelay: '0.56s'
    }
  }, "Der ruhige Ort f\xFCr alles, was eure Kinder betrifft \u2014 statt Streit im Chat."), /*#__PURE__*/React.createElement("button", {
    className: "cop-fade-up",
    onClick: enter,
    style: {
      marginTop: 30,
      height: 56,
      width: '100%',
      borderRadius: 999,
      border: 'none',
      background: '#F4EFE6',
      color: '#14211B',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 16,
      cursor: 'pointer',
      animationDelay: '0.68s'
    }
  }, "Los geht's"), /*#__PURE__*/React.createElement("p", {
    className: "cop-fade-up",
    style: {
      textAlign: 'center',
      marginTop: 16,
      fontSize: 14,
      color: 'rgba(244,239,230,0.6)',
      animationDelay: '0.78s'
    }
  }, "Schon dabei? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#F4EFE6',
      fontWeight: 600
    }
  }, "Anmelden"))));
}
window.CoparaSplashScreen = SplashScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/Splash.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/TodoScreen.jsx
try { (() => {
/* Copara UI kit — To-Do: alles, was eine Entscheidung braucht.
   Status-Ampel oben → Aufgaben → eigene wartende Anfrage. Szenario-Umschalter (Demo)
   zeigt die kanonischen Startseiten-Zustände. */
const todoDS = window.CoparaDesignSystem_e5ed8c;
function TodoScreen(props) {
  const scenario = props.scenario || window.CoparaScenarios.zwei;
  const {
    onScenario,
    onAnswerFlow,
    onFocusHint
  } = props;
  const showDemo = props.showDemo !== false;
  const {
    Icon,
    Avatar,
    Chip
  } = todoDS;
  const t = window.coparaType;
  const [answered, setAnswered] = React.useState([]);
  React.useEffect(() => {
    setAnswered([]);
  }, [scenario.id]);
  const openTasks = scenario.tasks.filter(x => !answered.includes(x.id));
  const hadTasks = scenario.tasks.length > 0;
  let ampel;
  if (openTasks.length > 0 && answered.length === 0) {
    ampel = {
      ...scenario.ampel,
      onAction: () => onAnswerFlow(openTasks[0])
    };
  } else if (openTasks.length > 0) {
    ampel = {
      state: 'now',
      headline: openTasks.length === 1 ? 'Noch eine Sache.' : `Noch ${openTasks.length} Dinge.`,
      context: 'Danach ist heute nichts mehr zu tun.',
      actionLabel: 'Weiter antworten',
      onAction: () => onAnswerFlow(openTasks[0])
    };
  } else if (hadTasks) {
    ampel = {
      state: 'clear',
      headline: 'Das war alles.',
      context: 'Du hast nichts übersehen. Mia & Felix bei Markus, Emma bei Tom · in 6 Tagen dran.'
    };
  } else {
    ampel = scenario.ampel;
  }
  const card = {
    background: 'var(--sand-0)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-card)'
  };
  const scenList = Object.values(window.CoparaScenarios);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      background: 'var(--sand-50)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      ...t.caption,
      marginBottom: 4,
      color: 'var(--ink-600)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.02em'
    }
  }, "Dienstag, 10. Februar"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...t.h1,
      fontSize: 34
    }
  }, "To-Do", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--apricot-500)'
    }
  }, "."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onAnswerFlow('account'),
    "aria-label": "Konto",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Lisa Wagner",
    tone: "wald",
    size: 42
  }))), showDemo && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...t.caption,
      color: 'var(--ink-400)',
      flexShrink: 0,
      marginRight: 2
    }
  }, "Demo"), scenList.map(s => {
    const on = s.id === scenario.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => onScenario(s.id),
      style: {
        flexShrink: 0,
        height: 30,
        padding: '0 12px',
        borderRadius: 999,
        cursor: 'pointer',
        border: on ? 'none' : '1px solid var(--sand-200)',
        background: on ? 'var(--ink-900)' : 'var(--sand-0)',
        color: on ? '#FFFDF7' : 'var(--ink-600)',
        fontFamily: 'var(--font-body)',
        fontSize: 12.5,
        fontWeight: 600
      }
    }, s.label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 140px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(window.CoparaStatusAmpel, ampel), openTasks.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, null, "Was du entscheiden kannst"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, openTasks.map(task => {
    const dot = task.tone === 'apricot' ? 'var(--apricot-500)' : 'var(--wald-500)';
    const meta = task.who === 'Broadcast' ? 'Frage an alle' : `${task.kind} von ${task.who}`;
    return /*#__PURE__*/React.createElement("button", {
      key: task.id,
      onClick: () => onAnswerFlow(task, () => setAnswered(c => [...c, task.id])),
      style: {
        ...card,
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        padding: '16px 18px',
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: dot,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        ...t.caption,
        color: 'var(--ink-600)',
        whiteSpace: 'nowrap'
      }
    }, meta)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 16.5,
        fontWeight: 600,
        color: 'var(--ink-900)',
        lineHeight: 1.3
      }
    }, task.title), /*#__PURE__*/React.createElement("div", {
      style: {
        ...t.sm,
        marginTop: 4
      }
    }, task.ctx)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 18,
      color: "var(--ink-400)",
      style: {
        marginTop: 2
      }
    }));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.CoparaSectionLabel, {
    style: {
      color: 'var(--ink-400)'
    }
  }, "Liegt bei Markus"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sand-0)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--sand-200)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--apricot-300)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ink-600)',
      lineHeight: 1.35
    }
  }, "Ferien 30. M\xE4rz \u2013 3. April"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...t.caption,
      marginTop: 2
    }
  }, "Ohne Antwort fragen wir nach 24 h Oma & Opa.")), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "offen")), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      marginTop: 12,
      minHeight: 24,
      color: 'var(--ink-400)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-ccw",
    size: 15,
    color: "var(--ink-400)"
  }), " Anfrage zur\xFCckziehen"))), /*#__PURE__*/React.createElement("button", {
    onClick: onFocusHint,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '4px 0',
      color: 'var(--ink-400)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 15,
    color: "var(--ink-400)"
  }), " Fokus-Modus einschalten")));
}
window.CoparaTodoScreen = TodoScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/TodoScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/app.jsx
try { (() => {
/* Copara UI kit — App-Shell: Tabs (To-Do · Kalender · Familie), Plus, Konto, Fokus-Modus,
   Oma-Ansicht, Sheets, Toast. */
const appDS = window.CoparaDesignSystem_e5ed8c;
function Toast({
  show,
  children
}) {
  const {
    Icon
  } = appDS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 104,
      left: 20,
      right: 20,
      zIndex: 60,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      transition: 'opacity var(--transition-default), transform var(--transition-default)',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(8px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--wald-700)',
      color: '#FFFDF7',
      borderRadius: 999,
      padding: '12px 18px',
      boxShadow: 'var(--shadow-card)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 17,
    color: "#FFFDF7"
  }), " ", children));
}
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "waldPalette": ["#2E4B3F", "#3E6553", "#DFEFE6"],
  "cardRadius": 24,
  "showDemo": true,
  "focusMode": false
} /*EDITMODE-END*/;
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
    r.setProperty('--wald-700', c700);
    r.setProperty('--wald-500', c500);
    r.setProperty('--wald-100', c100);
    r.setProperty('--color-primary', c700);
    r.setProperty('--parent-a', c700);
    r.setProperty('--parent-a-soft', c100);
    r.setProperty('--radius-lg', tw.cardRadius + 'px');
  }, [tw.waldPalette, tw.cardRadius]);
  React.useEffect(() => {
    setFocus(tw.focusMode);
  }, [tw.focusMode]);
  const flash = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  const handleTodoAction = (arg, onDone) => {
    if (arg === 'account') {
      setAccount(true);
      return;
    }
    setSheet({
      kind: arg.broadcast ? 'broadcast' : 'answer',
      task: arg,
      onDone
    });
  };
  const finishSheet = msg => {
    if (sheet && sheet.onDone) sheet.onDone();
    setSheet(null);
    flash(msg);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.CoparaPhoneFrame, null, /*#__PURE__*/React.createElement(window.CoparaStatusBar, {
    dark: false
  }), oma ? /*#__PURE__*/React.createElement(window.CoparaOmaView, {
    onExit: () => setOma(false)
  }) : account ? /*#__PURE__*/React.createElement(window.CoparaAccountScreen, {
    onBack: () => setAccount(false),
    focus: focus,
    onFocus: setFocus
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, tab === 'todo' && (focus ? /*#__PURE__*/React.createElement(window.CoparaFocusTodo, {
    scenario: scenario,
    onExit: () => setFocus(false),
    onOpenAccount: () => setAccount(true)
  }) : /*#__PURE__*/React.createElement(window.CoparaTodoScreen, {
    scenario: scenario,
    onScenario: setScenarioId,
    onAnswerFlow: handleTodoAction,
    onFocusHint: () => setFocus(true),
    showDemo: tw.showDemo
  })), tab === 'kalender' && /*#__PURE__*/React.createElement(window.CoparaCalendarScreen, {
    focus: focus,
    onDay: () => setSheet({
      kind: 'day'
    })
  }), tab === 'familie' && /*#__PURE__*/React.createElement(window.CoparaFamilyScreen, {
    onAddPerson: () => setSheet({
      kind: 'addperson'
    }),
    onPaywall: () => flash('Premium ist aktiv'),
    onOmaView: () => setOma(true)
  }), /*#__PURE__*/React.createElement(window.CoparaTabBar, {
    active: tab,
    onTab: setTab,
    onPlus: () => setSheet({
      kind: 'request'
    }),
    todoDot: scenario.tasks.length > 0
  })), /*#__PURE__*/React.createElement(window.CoparaAnswerSheet, {
    open: sheet?.kind === 'answer',
    task: sheet?.kind === 'answer' ? sheet.task : null,
    onClose: () => setSheet(null),
    onDone: () => finishSheet('Antwort gesendet')
  }), /*#__PURE__*/React.createElement(window.CoparaBroadcastSheet, {
    open: sheet?.kind === 'broadcast',
    onClose: () => setSheet(null),
    onResult: kind => {
      if (sheet && sheet.onDone) sheet.onDone();
      setSheet(null);
      flash(kind === 'übernommen' ? 'Du übernimmst den 28. Februar' : 'Omas Zusage bestätigt');
    }
  }), /*#__PURE__*/React.createElement(window.CoparaRequestSheet, {
    open: sheet?.kind === 'request',
    onClose: () => setSheet(null),
    onSent: () => finishSheet('Anfrage gesendet')
  }), /*#__PURE__*/React.createElement(window.CoparaAddPersonSheet, {
    open: sheet?.kind === 'addperson',
    onClose: () => setSheet(null)
  }), /*#__PURE__*/React.createElement(window.CoparaDaySheet, {
    open: sheet?.kind === 'day',
    onClose: () => setSheet(null),
    onRequest: () => finishSheet('Anfrage gesendet')
  }), /*#__PURE__*/React.createElement(Toast, {
    show: !!toast
  }, toast), stage === 'splash' && /*#__PURE__*/React.createElement(window.CoparaSplashScreen, {
    onDone: () => setStage('app')
  })), /*#__PURE__*/React.createElement(window.TweaksPanel, null, /*#__PURE__*/React.createElement(window.TweakSection, {
    label: "Marke"
  }), /*#__PURE__*/React.createElement(window.TweakColor, {
    label: "Prim\xE4rfarbe",
    value: tw.waldPalette,
    options: [['#2E4B3F', '#3E6553', '#DFEFE6'], ['#26506A', '#3E7BA6', '#DCEAF2'], ['#4B3A6B', '#6E58A6', '#E7E1F3'], ['#5A4632', '#8A6A45', '#EFE6D8']],
    onChange: v => setTweak('waldPalette', v)
  }), /*#__PURE__*/React.createElement(window.TweakSlider, {
    label: "Kartenrundung",
    value: tw.cardRadius,
    min: 12,
    max: 28,
    step: 2,
    unit: "px",
    onChange: v => setTweak('cardRadius', v)
  }), /*#__PURE__*/React.createElement(window.TweakSection, {
    label: "Verhalten"
  }), /*#__PURE__*/React.createElement(window.TweakToggle, {
    label: "Fokus-Modus",
    value: tw.focusMode,
    onChange: v => setTweak('focusMode', v)
  }), /*#__PURE__*/React.createElement(window.TweakToggle, {
    label: "Demo-Umschalter",
    value: tw.showDemo,
    onChange: v => setTweak('showDemo', v)
  })));
}
class ErrBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      e: null
    };
  }
  static getDerivedStateFromError(e) {
    return {
      e
    };
  }
  componentDidCatch(e) {
    window.__lastErr = e && e.stack || String(e);
  }
  render() {
    if (this.state.e) return React.createElement('pre', {
      style: {
        padding: 20,
        color: '#B05B57',
        fontSize: 11,
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace'
      }
    }, String(this.state.e && this.state.e.stack || this.state.e));
    return this.props.children;
  }
}
const rootEl = document.getElementById('root');
window.__coparaRoot = window.__coparaRoot || ReactDOM.createRoot(rootEl);
window.__coparaRoot.render(/*#__PURE__*/React.createElement(ErrBoundary, null, /*#__PURE__*/React.createElement(App, null)));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/scenarios.js
try { (() => {
/* Copara UI kit — To-Do-Szenarien (geteilt zwischen Normal-To-Do und Fokus-Modus).
   Jedes Szenario ist ein kanonischer Zustand der Startseite. */
window.CoparaScenarios = {
  zwei: {
    id: 'zwei',
    label: 'Zwei',
    ampel: {
      state: 'now',
      headline: 'Zwei Dinge brauchen dich.',
      context: 'Danach ist heute nichts mehr zu tun.',
      actionLabel: 'Der Reihe nach antworten'
    },
    tasks: [{
      id: 'ferien',
      who: 'Markus',
      tone: 'apricot',
      kind: 'Anfrage',
      title: 'Ferien tauschen: 30. März – 3. April',
      ctx: 'Osterferien · Mia & Felix · seit heute Morgen',
      focusHeadline: 'Markus fragt: Ferien tauschen?'
    }, {
      id: 'arzt',
      who: 'Broadcast',
      tone: 'neutral',
      kind: 'Abstimmung',
      title: 'Wer übernimmt den 28. Februar?',
      ctx: 'Kinderarzt Mia, 14:00 · an alle gesendet',
      focusHeadline: 'Wer übernimmt den 28. Februar?',
      broadcast: true
    }]
  },
  broadcast: {
    id: 'broadcast',
    label: 'Broadcast',
    ampel: {
      state: 'now',
      headline: 'Eine Abstimmung braucht dich.',
      context: 'Wer übernimmt den 28. Februar?',
      actionLabel: 'Ansehen'
    },
    tasks: [{
      id: 'arzt',
      who: 'Broadcast',
      tone: 'neutral',
      kind: 'Abstimmung',
      title: 'Wer übernimmt den 28. Februar?',
      ctx: 'Kinderarzt Mia, 14:00 · an alle gesendet',
      focusHeadline: 'Wer übernimmt den 28. Februar?',
      broadcast: true
    }]
  },
  bald: {
    id: 'bald',
    label: 'Bald',
    ampel: {
      state: 'soon',
      headline: 'In 6 Tagen bist du dran.',
      context: 'Mo, 16. Feb, 8:00 · Übergabe Schule. Bis dahin ist nichts zu tun.',
      secondaryLabel: 'Details ansehen'
    },
    tasks: []
  },
  geregelt: {
    id: 'geregelt',
    label: 'Geregelt',
    ampel: {
      state: 'clear',
      headline: 'Heute ist nichts zu tun.',
      context: 'Mia & Felix sind bei Markus, Emma bei Tom · in 6 Tagen dran.'
    },
    tasks: []
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/scenarios.js", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/shared.jsx
try { (() => {
/* Copara UI kit — shared shell: type helper, phone frame, tab bar + FAB, Status-Ampel box.
   Uses the DS components via window.CoparaDesignSystem_e5ed8c. */
const DS = window.CoparaDesignSystem_e5ed8c;
const type = {
  display: {
    margin: 0,
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    color: 'var(--ink-900)'
  },
  h1: {
    margin: 0,
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.12,
    letterSpacing: '-0.025em',
    color: 'var(--ink-900)'
  },
  h2: {
    margin: 0,
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 1.3,
    color: 'var(--ink-900)'
  },
  h3: {
    margin: 0,
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.3,
    color: 'var(--ink-900)'
  },
  body: {
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 16,
    lineHeight: 1.55,
    color: 'var(--ink-900)'
  },
  muted: {
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 16,
    lineHeight: 1.55,
    color: 'var(--ink-600)'
  },
  sm: {
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    lineHeight: 1.5,
    color: 'var(--ink-600)'
  },
  caption: {
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 12,
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    color: 'var(--ink-400)'
  },
  overline: {
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  }
};
window.coparaType = type;

/* iPhone status bar — Dynamic Island */
function StatusBar({
  dark
}) {
  const c = dark ? '#FFFDF7' : 'var(--ink-900)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 54,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 26px',
      zIndex: 30,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 15,
      color: c
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 84,
      height: 26,
      background: '#000',
      borderRadius: 999
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: c
    }
  }, "\u25CF\u25CF\u25CF"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: c
    }
  }, "\u25AE")));
}
window.CoparaStatusBar = StatusBar;

/* Phone frame — 390×844 */
function PhoneFrame({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      background: 'var(--sand-50)',
      borderRadius: 44,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(50,40,20,0.28)',
      border: '10px solid #141210',
      boxSizing: 'content-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 34,
      overflow: 'hidden'
    }
  }, children));
}
window.CoparaPhoneFrame = PhoneFrame;

/* Floating tab bar (left pill) + FAB (right) */
function TabBar({
  active,
  onTab,
  onPlus,
  todoDot
}) {
  const {
    Icon
  } = DS;
  const tabs = [['todo', 'list-checks', 'To-Do'], ['kalender', 'calendar', 'Kalender'], ['familie', 'users', 'Familie']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 26,
      left: 16,
      right: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 62,
      background: 'var(--sand-0)',
      borderRadius: 999,
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--sand-200)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 6px'
    }
  }, tabs.map(([id, icon, label]) => {
    const on = active === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onTab(id),
      style: {
        position: 'relative',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: '6px 10px'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 23,
      color: on ? 'var(--wald-700)' : 'var(--ink-400)'
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--wald-700)' : 'var(--ink-400)'
      }
    }, label), id === 'todo' && todoDot && !on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 4,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--apricot-500)'
      }
    }));
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onPlus,
    "aria-label": "Anfrage stellen",
    style: {
      width: 62,
      height: 62,
      borderRadius: '50%',
      background: 'var(--wald-700)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(46,75,63,0.4)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 28,
    color: "#FFFDF7"
  })));
}
window.CoparaTabBar = TabBar;

/* Status-Ampel box — die wichtigste Komponente. Feste Anatomie:
   Punkt + Zustandswort → größte Zeile → Kontextzeile → höchstens ein Knopf. */
function StatusAmpel({
  state,
  headline,
  context,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary
}) {
  const skin = {
    clear: {
      bg: 'var(--status-clear-gradient)',
      dot: 'var(--status-clear-dot)',
      ink: 'var(--status-clear-ink)',
      sub: 'var(--status-clear-sub)',
      word: 'Alles geregelt'
    },
    soon: {
      bg: 'var(--status-soon-gradient)',
      dot: 'var(--status-soon-dot)',
      ink: 'var(--status-soon-ink)',
      sub: 'var(--status-soon-ink)',
      word: 'Bald dran'
    },
    now: {
      bg: 'var(--status-now-gradient)',
      dot: 'var(--status-now-dot)',
      ink: 'var(--status-now-ink)',
      sub: 'var(--status-now-sub)',
      word: 'Jetzt zu tun'
    }
  }[state];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: skin.bg,
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      ...type.overline,
      color: skin.sub
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: skin.dot
    }
  }), skin.word), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 27,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: skin.ink,
      margin: '12px 0 8px'
    }
  }, headline), context && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.5,
      color: skin.sub
    }
  }, context), actionLabel && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      marginTop: 16,
      width: '100%',
      height: 54,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: state === 'now' ? '#FFFDF7' : 'var(--wald-700)',
      color: state === 'now' ? 'var(--status-now-700)' : '#FFFDF7',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 16
    }
  }, actionLabel), secondaryLabel && /*#__PURE__*/React.createElement("button", {
    onClick: onSecondary,
    style: {
      marginTop: 10,
      width: '100%',
      height: 44,
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      background: 'transparent',
      color: skin.sub,
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 14
    }
  }, secondaryLabel));
}
window.CoparaStatusAmpel = StatusAmpel;

/* Section overline label */
function SectionLabel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      ...type.overline,
      letterSpacing: '0.06em',
      color: 'var(--ink-400)',
      margin: '0 0 10px 4px',
      ...style
    }
  }, children);
}
window.CoparaSectionLabel = SectionLabel;
Object.assign(window, {
  CoparaDS: DS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copara-app/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copara-app/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.LUCIDE_ICONS = __ds_scope.LUCIDE_ICONS;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Sheet = __ds_scope.Sheet;

})();
