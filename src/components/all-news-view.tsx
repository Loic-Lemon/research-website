'use client';
import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { News } from "@/data/news";
import { NewsEntry } from "@/components/news-entry";

export function AllNewsView({ news, onBack }: { news: News[]; onBack: () => void }) {
  const years = useMemo(() => {
    const set = new Set<string>();
    for (const item of news) {
      const year = item.date.split(" ").pop();
      if (year) set.add(year);
    }
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [news]);

  const [selectedYear, setSelectedYear] = useState("All");

  const filteredNews = selectedYear === "All"
    ? news
    : news.filter((item) => item.date.endsWith(selectedYear));

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="btn-chip align-top"
      >
        <ArrowLeft size={12} data-back />
        <span>Back</span>
      </button>

      <div className="section-heading flex justify-between items-baseline pb-2">
        <h2 className="font-serif font-bold text-xl tracking-wide uppercase">
          All Highlights
        </h2>
        {years.length > 1 && (
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-sm text-accent bg-transparent border border-border rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="All">All years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>

      {filteredNews.length === 0 ? (
        <p className="text-sm text-muted italic">No highlights for this year.</p>
      ) : (
        <div className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
          {filteredNews.map((item, index) => (
            <NewsEntry key={index} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
