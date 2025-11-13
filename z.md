**FIX the theming.
Light mode and dark mode MUST look completely different.
Dark mode is already correct; DO NOT change dark palette.
Fix the LIGHT MODE so it uses a soft clean UI aesthetic.**

### ★ Strict theming rules:

* **ALL colors must come ONLY from CSS variables.**
* NO hex colors inside components.
* NO Tailwind built-in colors (no `text-gray-500`, no `bg-zinc-900`).
* NO Tailwind `dark:` classes.
* ALL colors must be mapped through Tailwind config → `var(--color-name)`.

### ★ CSS variable structure:

```
/* Light Mode */
:root {
  --bg: #fafafa;        /* soft white */
  --text: #222222;      /* dark neutral */
  --subtle: #f5f5f5;    /* soft light gray card */
  --accent: #0066ff;    /* blue highlight */
}

/* Dark Mode */
:root.dark {
  --bg: #0a0a0a;        /* terminal black */
  --text: #eaeaea;      /* light text */
  --subtle: #1a1a1a;    /* dark surface */
  --accent: #00eaff;    /* cyan */
}
```

### ★ Tailwind config MUST map these:

```
extend: {
  colors: {
    bg: "var(--bg)",
    text: "var(--text)",
    subtle: "var(--subtle)",
    accent: "var(--accent)",
  }
}
```

### ★ Component requirement:

* Use only `bg-bg`, `text-text`, `border-subtle`, `text-accent`.
* Do NOT use hardcoded hex values inside `.astro` or `.tsx`.
* Do NOT use Tailwind color names.
* Use `<body class="dark">` to activate dark mode.

### ★ GOAL:

Light mode should look like a clean white UI.
Dark mode should remain a terminal-like theme.
NO color leaking between themes.
