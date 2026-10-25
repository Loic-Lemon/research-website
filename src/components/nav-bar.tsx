'use client';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Section } from "@/data/section-order";
import { ThemeToggle } from "@/components/theme-toggle";

const quickLinks = [
  { label: "Home", section: null as Section | null },
  { label: "Research", section: Section.Portfolio },
  { label: "Publications", section: Section.Publication },
  { label: "Background", section: Section.Timeline },
  { label: "Awards", section: Section.Award },
];

interface NavBarProps {
  activeSection?: Section | null;
  onNavigate?: (section: Section | null) => void;
}

export function NavBar({ activeSection, onNavigate }: NavBarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navGlow, setNavGlow] = useState(false);
  const navGlowTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const triggerGlow = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-nav-glow]")) return;
      clearTimeout(navGlowTimer.current);
      setNavGlow(false);
      requestAnimationFrame(() => setNavGlow(true));
      navGlowTimer.current = setTimeout(() => setNavGlow(false), 1900);
    };
    document.addEventListener("click", triggerGlow);
    return () => {
      document.removeEventListener("click", triggerGlow);
      clearTimeout(navGlowTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus({ preventScroll: true });
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeMenu = () => setMenuOpen(false);
    const contentsHost = document.getElementById("page-contents");

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", closeMenu);
    contentsHost?.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", closeMenu);
      contentsHost?.removeEventListener("click", closeMenu);
    };
  }, [menuOpen]);

  const handleClick = (section: Section | null) => {
    setMenuOpen(false);
    if (menuOpen) menuButtonRef.current?.focus({ preventScroll: true });
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
    <header
      ref={navRef}
      data-open={menuOpen}
      className={`site-nav fixed left-4 right-4 top-[max(1rem,env(safe-area-inset-top))] z-50 md:left-0 md:right-0 md:top-0 md:flex md:h-[42px] md:items-center${navGlow ? " nav-glow" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}
    >
      <span
        aria-hidden="true"
        className="hidden md:absolute md:inset-0 md:z-0 md:block md:border-b md:border-foreground/15 md:bg-background/70 md:backdrop-blur-md md:shadow-sm"
      />
      <div className="flex items-start gap-2 md:contents">
      <button
        type="button"
        aria-label="Go to home"
        className="relative z-10 hidden h-[34px] w-[34px] shrink-0 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:ml-4 md:mr-4 md:flex"
        onClick={() => handleClick(null)}
      >
        <Image src="/favicon.ico" alt="" width={24} height={24} unoptimized className="h-6 w-6 object-contain" />
      </button>
      <button
        ref={menuButtonRef}
        type="button"
        className="menu-toggle flex h-11 items-center gap-2.5 rounded border border-foreground/15 bg-background px-3 text-sm text-foreground shadow-sm transition-colors hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:hidden"
        aria-label={menuOpen ? "Close quick links" : "Open quick links"}
        aria-expanded={menuOpen}
        aria-controls="quick-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="menu-toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span aria-hidden="true" className="text-base leading-none">🍔</span>
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>
      <div id="page-contents" className="min-w-0 flex-1 md:order-last md:flex-initial" />
      </div>
      <div
        className="quick-links-panel absolute left-0 top-[calc(100%+0.75rem)] w-full overflow-y-auto rounded border border-foreground/15 bg-background/70 p-1 shadow-md backdrop-blur-md md:static md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none md:relative md:top-auto md:z-10 md:min-w-0 md:flex-1"
      >
        <nav
          id="quick-links"
          aria-label="Quick links"
          className="flex flex-col font-sans text-base leading-relaxed text-foreground md:flex-row md:items-center md:justify-start md:gap-0.5 md:pl-2"
        >
          {quickLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              aria-current={activeSection === link.section ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-sm px-3 text-left transition-colors hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent md:h-[34px] md:min-h-0 md:shrink-0 md:rounded-[2px] md:text-sm ${
                activeSection === link.section ? "bg-foreground/5 font-medium text-accent md:bg-foreground/5 md:font-semibold" : "text-foreground/80"
              }`}
              onClick={() => handleClick(link.section)}
            >
              <span className="nav-link" data-label={link.label}>
                <span>{link.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </div>
      <div className="relative z-10 hidden shrink-0 md:block">
        <ThemeToggle />
      </div>
    </header>
  );
}
