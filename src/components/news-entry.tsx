import { ArrowUpRight } from "lucide-react";
import { News } from "@/data/news";
import { getIcon } from "@/lib/icon-map";

export function NewsEntry({ news }: { news: News }) {
  const Icon = getIcon(news.icon);
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5">
        {Icon && <Icon size={14} className="text-muted shrink-0" />}
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">{news.date}</span>
        {news.theme && (
          <span className="text-sm text-muted">
            <span className="text-muted"> · </span>
            {news.theme}
          </span>
        )}
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">
        {news.link ? (
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 hover:text-foreground transition-colors duration-300"
          >
            {news.title}
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </a>
        ) : (
          news.title
        )}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-3 [&_a]:underline [&_a]:text-foreground [&_a:hover]:text-muted" dangerouslySetInnerHTML={{ __html: news.description }} />
    </div>
  );
}
