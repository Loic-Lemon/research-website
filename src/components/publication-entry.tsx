'use client';

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Publication } from "@/data/publication";
import { DISABLED_LINK_CLASSES } from "@/lib/constants";

export function PublicationEntry({ publication }: { publication: Publication }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const citationRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  useEffect(() => {
    if (copyState === "manual") {
      citationRef.current?.focus();
      citationRef.current?.select();
    }
  }, [copyState]);

  async function copyCitation() {
    if (!publication.bibtex) return;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setCopyState("idle");
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopyState("copied");
      resetTimer.current = setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("manual");
    }
  }

  return (
    <article data-toc-year={publication.year} className="min-w-0">
      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="font-medium text-accent">{publication.year}</span>
        <span aria-hidden="true" className="text-muted/50">·</span>
        <span className="font-medium text-muted">{publication.conference}</span>
        {publication.award && (
          <div className="group relative flex items-center overflow-hidden rounded-md border border-amber-100/50 bg-gradient-to-r from-amber-50 to-rose-50 px-2 py-1 shadow-md transition-all duration-300 hover:rotate-1 dark:border-amber-800/30 dark:from-amber-900/30 dark:to-rose-900/30">
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/90 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%] dark:via-zinc-700/90" />
            <p className="relative text-sm font-medium text-amber-700 dark:text-amber-400">{publication.award}</p>
          </div>
        )}
      </div>
      <h3 className="mb-2 text-base font-semibold leading-relaxed text-foreground">{publication.title}</h3>
      <p className="text-sm leading-relaxed text-muted [&_u]:text-foreground [&_u]:decoration-foreground/30 [&_u]:underline-offset-2" dangerouslySetInnerHTML={{ __html: publication.authors }} />
      {publication.full_conf && (
        <p className="mt-1 text-sm leading-relaxed text-muted">{publication.full_conf}</p>
      )}
      {publication.tldr && (
        <p className="mt-2 text-sm leading-relaxed text-muted">{publication.tldr}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {publication.paperUrl && publication.paperUrl !== "#" && (publication.showLinks ? (
          <a href={publication.paperUrl} className="btn-chip min-h-9">
            <ArrowUpRight size={12} />
            <span>{publication.pub_type === "Extended Abstract" ? "Abstract" : "Paper"}</span>
          </a>
        ) : (
          <span aria-disabled="true" className={`inline-flex min-h-9 items-center gap-1.5 rounded-[2px] border border-foreground/15 px-2 text-xs uppercase tracking-wider ${DISABLED_LINK_CLASSES}`}>
            <ArrowUpRight size={12} />
            {publication.pub_type === "Extended Abstract" ? "Abstract" : "Paper"}
          </span>
        ))}
        {publication.codeUrl && (publication.showLinks ? (
          <a href={publication.codeUrl} className="btn-chip min-h-9">
            <ArrowUpRight size={12} />
            <span>Code</span>
          </a>
        ) : (
          <span aria-disabled="true" className={`inline-flex min-h-9 items-center gap-1.5 rounded-[2px] border border-foreground/15 px-2 text-xs uppercase tracking-wider ${DISABLED_LINK_CLASSES}`}>
            <ArrowUpRight size={12} />
            Code
          </span>
        ))}
        {publication.bibtex && (
          <button
            type="button"
            disabled={!publication.showLinks}
            onClick={copyCitation}
            aria-label={`${copyState === "copied" ? "Copied" : "Copy"} BibTeX for ${publication.title}`}
            className="btn-chip min-h-9 min-w-[8.5rem] justify-center disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-foreground/15 disabled:hover:text-muted"
          >
            {copyState === "copied" ? <Check size={12} data-static /> : <Copy size={12} data-static />}
            {copyState === "copied" ? "Copied" : "Copy BibTeX"}
          </button>
        )}
      </div>
      <p role="status" className={copyState === "manual" ? "mt-3 text-sm text-muted" : "sr-only"}>
        {copyState === "copied" ? "BibTeX copied to clipboard." : copyState === "manual" ? "Automatic copying is unavailable. Copy the selected citation below." : ""}
      </p>
      {copyState === "manual" && (
        <textarea
          ref={citationRef}
          readOnly
          value={publication.bibtex}
          aria-label={`BibTeX citation for ${publication.title}`}
          onFocus={(event) => event.currentTarget.select()}
          className="mt-2 h-52 w-full rounded-md border border-border bg-surface p-3 font-mono text-xs leading-relaxed text-foreground focus:outline focus:outline-2 focus:outline-accent"
        />
      )}
    </article>
  );
}
