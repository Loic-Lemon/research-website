import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Maximize2, X } from "lucide-react";
import { Portfolio } from "@/data/portfolio";
import { DISABLED_LINK_CLASSES, DISABLED_LINK_ICON_CLASSES } from "@/lib/constants";

export function PortfolioEntry({ index, portfolio, onProjectClick }: { index: number; portfolio: Portfolio; onProjectClick?: (slug: string) => void }) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewMounted, setPreviewMounted] = useState(false);
  const linkedDescription = portfolio.description?.match(/^(.*?)<a href="(\/?\?section=publication)">([^<]+)<\/a>(.*)$/);

  return (
    <>
      <article className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
        {portfolio.imageUrl ? (
          <button
            type="button"
            aria-label={`${showPreview ? "Hide" : "Show"} image preview for ${portfolio.title}`}
            aria-expanded={showPreview}
            className="group relative aspect-[4/3] w-full shrink-0 cursor-zoom-in overflow-hidden rounded-lg bg-surface-2 sm:w-52"
            onClick={() => {
              if (showPreview) {
                setShowPreview(false);
              } else {
                setPreviewMounted(true);
                setShowPreview(true);
              }
            }}
          >
            <Image
              src={portfolio.imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 208px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span aria-hidden="true" className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur-sm transition-colors group-hover:bg-background">
              <Maximize2 size={15} />
            </span>
          </button>
        ) : (
          <div
            aria-hidden="true"
            className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-surface to-surface-2 text-muted sm:w-52"
          >
            <span className="absolute h-24 w-24 rounded-full border border-foreground/10" />
            <span className="absolute h-16 w-16 rounded-full border border-foreground/10" />
            <FlaskConical size={24} strokeWidth={1.25} className="relative opacity-60" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-2 text-sm text-muted">
            {portfolio.technologies?.join(" · ") || `Project ${index + 1}`}
          </div>
          <h3 className="mb-2 font-serif text-base">{portfolio.title}</h3>
          {portfolio.description && (
            <p className="mb-3 text-sm leading-relaxed text-muted">
              {linkedDescription ? (
                <>
                  {linkedDescription[1]}
                  <Link href={linkedDescription[2]} className="underline text-foreground">{linkedDescription[3]}</Link>
                  {linkedDescription[4]}
                </>
              ) : portfolio.description.replace(/<[^>]*>/g, "")}
            </p>
          )}

          {portfolio.showMeta && (
            <div className="flex gap-4">
              {portfolio.slug && portfolio.projectLink !== false ? (
                <Link
                  href={`/research/${portfolio.slug}`}
                  onClick={onProjectClick ? (e) => { e.preventDefault(); onProjectClick(portfolio.slug!); } : undefined}
                  className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
                >
                  <ArrowUpRight size={10} />
                  <span>Project</span>
                </Link>
              ) : portfolio.slug && (
                <span className={`inline-flex items-center gap-1.5 text-xs ${DISABLED_LINK_CLASSES}`}>
                  <ArrowUpRight size={10} className={DISABLED_LINK_ICON_CLASSES} />
                  <span>Project</span>
                </span>
              )}
              {portfolio.codeUrl && (
                <a
                  href={portfolio.codeUrl}
                  className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
                >
                  <ArrowUpRight size={10} />
                  <span>Code</span>
                </a>
              )}
            </div>
          )}
        </div>

        {portfolio.imageUrl && previewMounted && (
          <div
            className={`${showPreview ? "animate-lightbox-in" : "animate-lightbox-out"} w-full basis-full rounded-xl border border-border bg-surface p-3 sm:p-4`}
            onAnimationEnd={() => {
              if (!showPreview) setPreviewMounted(false);
            }}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-xs text-muted">Image preview</span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="inline-flex min-h-9 items-center gap-2 rounded-md px-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X size={14} />
                Hide preview
              </button>
            </div>
            <div className="flex justify-center rounded-lg bg-surface-2 p-2 sm:p-4">
              <Image
                src={portfolio.imageUrl}
                alt={portfolio.title}
                width={1600}
                height={1200}
                className="max-h-[65vh] w-auto max-w-full object-contain"
                sizes="(max-width: 640px) 100vw, 70vw"
              />
            </div>
          </div>
        )}
      </article>
    </>
  );
}
