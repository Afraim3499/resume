// Theme utilities

export type Theme = "light" | "dark" | "system";

export function getThemePreference(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored && ["light", "dark", "system"].includes(stored)) {
    return stored;
  }

  return "system";
}

export function setThemePreference(theme: Theme) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("theme", theme);
}

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

