"use client";

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24" {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="24" height="24" {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v1.5M12 20.5V22M4.2 4.2l1.06 1.06M18.74 18.74l1.06 1.06M2 12h1.5M20.5 12H22M4.2 19.8l1.06-1.06M18.74 5.26l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  function toggle() {
    // When using next-themes with attribute='class', setTheme toggles correctly
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Avoid rendering mismatch until mounted
  const isDark = mounted ? (theme === 'dark' || resolvedTheme === 'dark') : false

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="mr-3 inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:text-[#12F7D6] focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
    >
      {isDark ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
      <span className="sr-only">Toggle color theme</span>
    </button>
  );
}
