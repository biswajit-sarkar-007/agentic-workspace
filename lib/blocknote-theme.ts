// BlockNote custom theme aligned with Axiom / DESIGN.MD color tokens:
// Canvas: #010102, Surface 1: #08090a, Surface 2: #121316, Hairline: #23252a, Ink: #f7f8f8.

export const axiomDarkTheme = {
  colors: {
    editor: { text: "#f7f8f8", background: "#08090a" },
    menu: { text: "#f7f8f8", background: "#121316" },
    tooltip: { text: "#f7f8f8", background: "#121316" },
    hovered: { text: "#f7f8f8", background: "#1b1c20" },
    selected: { text: "#ffffff", background: "#26282e" },
    disabled: { text: "#62666d", background: "#121316" },
    shadow: "rgba(0, 0, 0, 0.6)",
    border: "#23252a",
    sideMenu: "#8a8f98",
    highlights: {},
  },
  borderRadius: 8,
  fontFamily: "var(--font-geist-sans), -apple-system, system-ui, sans-serif",
};

// Backwards compatibility alias
export const outpostDarkTheme = axiomDarkTheme;
