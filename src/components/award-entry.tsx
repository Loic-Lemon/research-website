import { Award } from "@/data/award";
import { getIcon } from "@/lib/icon-map";

export function AwardEntry({ award }: { award: Award }) {
  const Icon = getIcon(award.icon);
  return (
    <div data-toc-year={award.year}>
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={14} className="text-muted shrink-0" />}
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">{award.year}</span>
        <span className="text-sm text-muted">·</span>
        <span className="text-sm text-muted">{award.institution}</span>
      </div>
      <h3 className="font-serif text-base text-foreground mb-2">{award.title}</h3>
      {award.tldr && (
        <p className="text-sm text-muted leading-relaxed mb-3 [&_a]:underline [&_a]:text-foreground [&_a:hover]:text-muted" dangerouslySetInnerHTML={{ __html: award.tldr }} />
      )}
    </div>
  );
}
