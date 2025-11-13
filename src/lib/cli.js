export default function initCLI({ defaultCommand = "about" } = {}) {
  if (typeof window === "undefined") return;

  const terminal = document.querySelector("[data-cli-terminal]");
  if (!terminal) return;

  const commandList = terminal.querySelector("[data-cli-command-list]");
  const buttons = commandList?.querySelectorAll("[data-cli-command]") ?? [];
  const sections = terminal.querySelectorAll("[data-cli-section]");
  const typewriter = terminal.querySelector("[data-cli-typewriter]");
  const themeToggle = terminal.querySelector("[data-cli-theme-toggle]");
  const themeLabel = terminal.querySelector("[data-cli-theme-label]");

  const keyBindings = {
    a: "about",
    p: "projects",
    c: "certifications",
  };

  const showCommand = (id) => {
    sections.forEach((section) => {
      const active = section.dataset.cliSection === id;
      section.classList.toggle("active", active);
    });

    buttons.forEach((button) => {
      const active = button.dataset.cliCommand === id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  const handleCommandClick = (event) => {
    const button = event.target.closest("[data-cli-command]");
    if (!button) return;
    const id = button.dataset.cliCommand;
    showCommand(id);
  };

  commandList?.addEventListener("click", handleCommandClick);

  window.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (!keyBindings[key]) return;
    event.preventDefault();
    showCommand(keyBindings[key]);
  });

  const runTypewriter = () => {
    if (!typewriter) return;
    const text = typewriter.dataset.text ?? "";
    typewriter.textContent = "";
    let index = 0;

    const tick = () => {
      if (index <= text.length) {
        typewriter.textContent = text.slice(0, index);
        index += 1;
        window.requestAnimationFrame(() => setTimeout(tick, 30));
      }
    };

    tick();
  };

  const applyTheme = (theme) => {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.body.classList.toggle("dark", nextTheme === "dark");
    themeToggle?.setAttribute("data-theme-state", nextTheme);
    if (themeLabel) {
      themeLabel.textContent =
        nextTheme === "light" ? "light mode" : "dark mode";
    }
    try {
      localStorage.setItem("cli-theme", nextTheme);
    } catch (_) {
      /* ignore */
    }
  };

  const initTheme = () => {
    let stored = null;
    try {
      stored = localStorage.getItem("cli-theme");
    } catch (_) {
      stored = null;
    }
    const prefersLight = window.matchMedia?.(
      "(prefers-color-scheme: light)",
    )?.matches;
    applyTheme(stored ?? (prefersLight ? "light" : "dark"));
  };

  themeToggle?.addEventListener("click", () => {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });

  runTypewriter();
  initTheme();
  showCommand(defaultCommand);
}
