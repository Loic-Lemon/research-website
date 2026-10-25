import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif, PT_Serif } from "next/font/google";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { customMetadata } from "@/data/title-description";
import { ThemeToggle } from "@/components/theme-toggle";
import { PageProgress } from "@/components/page-progress";
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
        <main className="md:pr-8 lg:pr-12">{children}</main>
        <PageProgress />
        <footer className="border-t border-border bg-background pb-[calc(3rem+env(safe-area-inset-bottom))] md:border-t-0 md:pb-0 md:pr-8 lg:pr-12">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mx-auto max-w-7xl px-6 py-3 md:grid md:max-w-screen-lg md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-2 md:px-8 md:py-0">
            <div className="contents md:col-start-2 md:flex md:flex-wrap md:items-center md:justify-between md:gap-x-4 md:gap-y-2 md:border-t md:border-border md:py-3">
              <div className="relative text-xs leading-5 text-muted">
                <p>
                  © {new Date().getFullYear()} {aboutMe.name}.
                  <span aria-hidden="true" className="pointer-events-none absolute -bottom-2 left-0 whitespace-nowrap text-[9px] leading-none text-foreground/[0.05] select-none tracking-[0.25em] font-mono">
                    ↑ ↑ ↓ ↓ ← → ← → b a
                  </span>
                </p>
                {aboutMe.secretDescription && (
                  <p className="text-sm text-muted mt-2">
                    {aboutMe.secretDescription}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <p className="text-xs leading-5 text-muted">
                  Built with{" "}
                  <a
                    href="https://github.com/tovacinni/research-website-template"
                    className="underline decoration-foreground/20 underline-offset-2 hover:text-accent transition-colors"
                  >
                    research-website-template
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
