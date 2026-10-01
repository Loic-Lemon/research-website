import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif, PT_Serif } from "next/font/google";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { customMetadata } from "@/data/title-description";
import { ThemeToggle } from "@/components/theme-toggle";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: customMetadata.title || aboutMe.name,
  description: customMetadata.description || aboutMe.description,

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() { try { var stored = localStorage.getItem('theme'); var theme = stored || 'light'; if (theme === 'dark') document.documentElement.classList.add('dark'); } catch(e) {} })()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${ptSerif.variable} antialiased`}
      >
        <main className="">{children}</main>
        <footer className="border-t border-border bg-background">
          <div className="flex flex-row mx-auto max-w-7xl px-6 py-8 md:flex md:items-start md:justify-between ">
            <div className="text-sm text-muted">
              <p>
                © {new Date().getFullYear()} {aboutMe.name}.
                <span className="text-xs text-foreground/[0.05] select-none ml-2 tracking-[0.3em] font-mono">
                  ↑ ↑ ↓ ↓ ← → ← → b a
                </span>
              </p>
              {aboutMe.secretDescription && (
                <p className="text-sm text-muted mt-2">
                  {aboutMe.secretDescription}
                </p>
              )}
            </div>
            <div className="flex items-center gap-6">
              <ThemeToggle />
              <p className="text-sm text-muted justify">
                Built with{" "}
                <a
                  href="https://github.com/tovacinni/research-website-template"
                  className="underline hover:text-foreground transition-colors"
                >
                  research-website-template
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
