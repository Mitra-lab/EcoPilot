import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcoPilot - Carbon Assessment Dashboard",
  description: "AI-powered sustainability guidance for everyday actions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <header className="border-b border-[hsl(var(--border))] py-4 px-6 bg-[hsl(var(--card))]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-xl font-bold tracking-tight text-[hsl(var(--primary))] flex items-center">
                🌱 EcoPilot
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/assessment" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                Assessment
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="border-t border-[hsl(var(--border))] py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
          <div className="max-w-7xl mx-auto space-y-1">
            <p className="font-semibold text-[hsl(var(--foreground))]">EcoPilot</p>
            <p>Built for Carbon Footprint Awareness — Sustainability Platform</p>
            <p>© {new Date().getFullYear()} EcoPilot. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
