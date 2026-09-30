'use client';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/data/section-order";

const quickLinks = [
  { label: "Start", section: null as Section | null },
  { label: "Research", section: Section.Portfolio },
  { label: "Publications", section: Section.Publication },
  { label: "Timeline", section: Section.Timeline },
  { label: "Awards", section: Section.Award },
  { label: "Extra", section: Section.Extra },
];

interface NavBarProps {
  activeSection?: Section | null;
  onNavigate?: (section: Section | null) => void;
}

export function NavBar({ activeSection, onNavigate }: NavBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    navRefs.current.forEach((btn) => {
      if (!btn) return;
      const before = window.getComputedStyle(btn, "::before");
      void before;
    });
  }, []);

  const handleClick = (section: Section | null) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    } else {
      const params = new URLSearchParams();
      if (section) params.set("section", section);
      const href = params.toString() ? `/?${params.toString()}` : '/';
      router.push(href);
    }
  };

  return (
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
            text-base leading-relaxed text-foreground text-center font-sans
          `}
        >
          {quickLinks.map((link, idx) => (
            <button
              key={link.label}
              ref={(el) => {
                navRefs.current[idx] = el;
              }}
              data-label={link.label}
              className={`nav-link hover:text-accent mx-2 italic bg-transparent border-none p-0 cursor-pointer
                ${activeSection === link.section ? "font-bold text-accent underline" : "text-foreground/50"}
              `}
              onClick={() => handleClick(link.section)}
            >
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
