'use client';
import Link from "next/link";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { Section } from "@/data/section-order";
import { useState, useCallback } from "react";

const quickLinks = [
  { label: "Home", section: null },
  { label: "Research", section: Section.Portfolio },
  { label: "Publications", section: Section.Publication },
  { label: "Background", section: Section.Timeline },
  { label: "Awards", section: Section.Award },
];

export default function NotFound() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = useCallback((section: Section | null) => {
    setMenuOpen(false);
    if (section) {
      window.location.href = `/?section=${section}`;
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 z-50 w-full bg-background flex items-center justify-between">
        <div className="flex items-center md:hidden ml-4">
          <button
            className="p-2 z-10 italic font-serif text-base leading-relaxed text-foreground bg-background rounded-lg shadow-md"
            aria-label="Open quick links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "✕ Close ←" : "🍔 Menu →"}
          </button>
        </div>
        <div
          className={`
            transition-all duration-300
            ${menuOpen ? "max-h-96 py-6 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"}
            md:max-h-none md:py-2 md:opacity-100
            w-full
            bg-background
            md:bg-transparent
            md:static
            absolute left-0 top-full
            md:top-0
            shadow-sm
          `}
        >
          <nav
            className={`
              flex flex-col items-center gap-4
              md:flex-row md:justify-center md:gap-2
              text-base leading-relaxed text-foreground text-center font-serif
            `}
          >
            {quickLinks.map((link) => (
              <button
                key={link.label}
                className="underline hover:text-accent mx-2 italic bg-transparent border-none p-0 cursor-pointer"
                onClick={() => navigateTo(link.section)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto px-8 py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <ProfileSection aboutMe={aboutMe} />
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-12">
            <section>
              <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                Page Not Found
              </h2>
              <p className="font-serif text-base leading-relaxed text-foreground">
                The page you are looking for does not exist or has been moved.
              </p>
              <p className="font-serif text-base leading-relaxed text-foreground mt-4">
                <Link
                  href="/"
                  className="underline hover:text-accent"
                >
                  Return home
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
