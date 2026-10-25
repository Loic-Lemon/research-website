import { Education } from "@/data/education";

export function EducationEntry({ education }: { education: Education }) {
  return (
    <div className="grid gap-y-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-4">
      <span className="self-start whitespace-nowrap text-sm font-medium tabular-nums text-accent sm:pt-1">{education.year}</span>
      <div className="min-w-0">
        <h3 className="text-lg mb-1 font-serif">{education.institution}</h3>
        <p className="text-base text-muted">{education.degree}</p>
        {education.details && (
          <ul className="list-none text-sm text-muted/80 mt-1 space-y-0.5">
            {education.details.map((d, i) => (
              <li key={i} className="before:content-['›'] before:mr-2 before:text-accent/60"><span className="italic">{d}</span></li>
            ))}
          </ul>
        )}
        {education.advisors && education.advisors.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-sm text-muted">{education.advisors.length === 1 ? "Advisor" : "Advisors"}</p>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-x-5 gap-y-3">
              {education.advisors.map((advisor) => (
                <li key={advisor.name} className="min-w-0">
                  <span className="block text-base font-medium leading-6 text-foreground">{advisor.name}</span>
                  {advisor.affiliation && (
                    <span className="mt-0.5 block text-sm italic leading-5 text-muted">{advisor.affiliation}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* thesis hidden — uncomment to restore */}
        {/* {education.thesis && (
          <p className="text-sm text-muted mt-2 italic">
            Thesis:{" "}
            {education.thesisUrl ? (
              <a
                href={education.thesisUrl}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {education.thesis}
              </a>
            ) : (
              education.thesis
            )}
          </p>
        )} */}
      </div>
    </div>
  );
}
