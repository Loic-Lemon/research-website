'use client';

import { ChevronDown, List } from "lucide-react";
import { RefObject, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ContentsItem {
  id: string;
  label: string;
}

export function PageContents({ contentRef }: { contentRef: RefObject<HTMLDivElement | null> }) {
  const [items, setItems] = useState<ContentsItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const prefix = useId();
  const nextId = useRef(0);

  useEffect(() => {
    setHost(document.getElementById("page-contents"));
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const closeOutside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setExpanded(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setExpanded(false);
      toggleRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [expanded]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateContents = () => {
      const years = new Map<string, HTMLElement>();
      for (const element of content.querySelectorAll<HTMLElement>('[data-toc-group="years"] [data-toc-year]')) {
        const year = element.dataset.tocYear?.trim();
        if (year && !years.has(year)) years.set(year, element);
      }
      const sections = Array.from(content.querySelectorAll<HTMLElement>("[data-toc-label], h2"));
      const entries = Array.from(content.querySelectorAll<HTMLElement>("h3"));
      const headings = sections.length > 1 ? sections : entries.length > 1 ? entries : [...sections, ...entries];
      const targets = years.size ? Array.from(years.values()) : headings;
      const updated = targets.map((element) => {
        if (!element.id) element.id = `${prefix}-${nextId.current++}`;
        return { id: element.id, label: element.dataset.tocYear?.trim() || element.dataset.tocLabel || element.textContent?.trim() || "" };
      }).filter((item) => item.label);

      setItems((previous) => previous.length === updated.length && previous.every((item, index) =>
        item.id === updated[index].id && item.label === updated[index].label
      ) ? previous : updated);
    };

    updateContents();
    const observer = new MutationObserver(updateContents);
    observer.observe(content, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["data-toc-group", "data-toc-year", "data-toc-label"] });
    return () => observer.disconnect();
  }, [contentRef, prefix]);

  useEffect(() => {
    if (items.length < 2) {
      contentRef.current?.style.removeProperty("--page-contents-clearance");
      return;
    }

    let frame = 0;
    let wasMobile: boolean | undefined;
    const updateActive = () => {
      frame = 0;
      const boundary = (navRef.current?.getBoundingClientRect().bottom ?? 64) + 20;
      let current = items[0]?.id || "";
      for (const item of items) {
        if ((document.getElementById(item.id)?.getBoundingClientRect().top ?? Infinity) <= boundary) current = item.id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1]?.id || current;
      }
      setActiveId(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };

    const updateLayout = () => {
      if (navRef.current) {
        const isMobile = getComputedStyle(navRef.current).position === "static";
        if (wasMobile !== undefined && isMobile !== wasMobile) setExpanded(false);
        wasMobile = isMobile;
        const bounds = navRef.current.getBoundingClientRect();
        const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
        const clearance = isMobile ? Math.max(0, bounds.bottom + 16 - scrollPadding) : bounds.height + 16;
        contentRef.current?.style.setProperty("--page-contents-clearance", `${clearance}px`);
      }
      scheduleUpdate();
    };
    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    if (navRef.current) observer.observe(navRef.current);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateLayout);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateLayout);
    };
  }, [items, contentRef, host]);

  if (items.length < 2) return null;

  const contents = (
    <nav
      ref={navRef}
      aria-label="Page contents"
      className="min-w-0 rounded border border-foreground/15 bg-background shadow-sm md:relative md:my-1 md:ml-2 md:mr-2 md:flex md:h-[34px] md:items-center"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        aria-label={`${expanded ? "Close" : "Open"} page contents: ${items[activeIndex].label}`}
        aria-expanded={expanded}
        aria-controls={`${prefix}-links`}
        onClick={() => setExpanded(!expanded)}
        className="flex h-[42px] w-full min-w-0 items-center gap-2 rounded px-3 text-left transition-colors hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:h-[34px] md:w-auto md:shrink-0 md:rounded-[2px] md:px-2.5 md:hover:bg-foreground/5 md:focus-visible:outline-offset-2"
      >
        <List aria-hidden="true" size={15} className="hidden shrink-0 text-muted md:block" />
        <span className="shrink-0 text-sm">Page contents</span>
        <span className="ml-auto min-w-0 truncate text-xs text-muted max-[374px]:hidden md:ml-0 md:hidden md:max-w-[9rem] lg:block">{items[activeIndex].label}</span>
        <ChevronDown
          aria-hidden="true"
          size={14}
          className={`ml-auto shrink-0 text-muted transition-transform min-[375px]:ml-0 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <ol
        id={`${prefix}-links`}
        hidden={!expanded}
        className="absolute left-0 top-[calc(100%+0.75rem)] max-h-[calc(100dvh-6rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full overflow-y-auto overscroll-contain rounded border border-foreground/15 bg-background/70 p-1 shadow-md backdrop-blur-md md:left-auto md:right-3 md:max-h-[calc(100dvh-12rem)] md:w-64 md:bg-background/95"
      >
        {items.map((item) => (
          <li key={item.id} className="min-w-0">
            <a
              href={`#${encodeURIComponent(item.id)}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`flex min-h-11 items-center rounded-sm px-3 py-2 text-base leading-relaxed transition-colors hover:bg-foreground/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${activeId === item.id ? "bg-foreground/5 font-medium text-accent" : "text-foreground/80"}`}
              onClick={() => {
                setExpanded(false);
                requestAnimationFrame(() => toggleRef.current?.focus({ preventScroll: true }));
              }}
            >
              <span className="min-w-0 break-words">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );

  return host ? createPortal(contents, host) : null;
}
