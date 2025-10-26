"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function toggle() {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Persist theme to cookie for SSR
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  }

  // Avoid hydration mismatch until mounted
  const isDark = mounted ? theme === "dark" || resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="mr-3 inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:text-[#12F7D6] focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
        className="w-6 h-6"
      />
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
