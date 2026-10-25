import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { Portfolio } from "@/data/portfolio";
import { ImagePreview } from "@/components/image-preview";
import { DISABLED_LINK_CLASSES, DISABLED_LINK_ICON_CLASSES } from "@/lib/constants";

export function PortfolioEntry({ index, portfolio, onProjectClick }: { index: number; portfolio: Portfolio; onProjectClick?: (slug: string) => void }) {
  const linkedDescription = portfolio.description?.match(/^(.*?)<a href="(\/?\?section=publication)">([^<]+)<\/a>(.*)$/);

  return (
    <>
      <article className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {portfolio.imageUrl ? (
          <ImagePreview image={portfolio.imageUrl} title={portfolio.title} />
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

      </article>
    </>
  );
}
