import "./globals.css";
import type { Metadata } from "next";

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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <header className="border-b border-[hsl(var(--border))] py-4 px-6 bg-[hsl(var(--card))]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-[hsl(var(--primary))] flex items-center">
                🌱 EcoPilot
              </span>
            </div>
            <nav className="flex space-x-4">
              <a href="/assessment" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
                Assessment
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="border-t border-[hsl(var(--border))] py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} EcoPilot. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
