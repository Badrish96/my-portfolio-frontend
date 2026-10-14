import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ThemeClientProvider from "../components/ThemeClientProvider"
import { LoadingProvider } from "../components/ui/LoadingProvider";
import ReduxProvider from "../components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Badrish Choubey | Senior Software Developer",
  description: "Portfolio of Badrish Choubey, a senior software developer specializing in React, Next.js, TypeScript, Node.js, and AI assisted development.",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} antialiased`}>
        <ReduxProvider>
          <ThemeClientProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </ThemeClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
