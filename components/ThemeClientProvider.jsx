"use client";

import { ThemeProvider } from 'next-themes';

export default function ThemeClientProvider({ children }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
