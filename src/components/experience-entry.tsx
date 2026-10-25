import { Experience } from "@/data/experience";

export function ExperienceEntry({ experience }: { experience: Experience }) {
  return (
    <div className="grid gap-y-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-4">
      <span className="self-start whitespace-nowrap text-sm font-medium tabular-nums text-accent sm:pt-1">{experience.date}</span>
      <div className="flex min-w-0 flex-col">
        <h3 className="text-lg font-serif">
          {experience.title} —{" "}
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {experience.company}
            </a>
          ) : (
            experience.company
          )}
        </h3>
        {experience.advisor && (
          <p className="text-base text-muted leading-relaxed italic mt-2">
            Advisor: {experience.advisor}
          </p>
        )}
        {experience.manager && (
          <p className="text-base text-muted leading-relaxed italic mt-2">
            Manager: {experience.manager}
          </p>
        )}
        {experience.details && (
          <ul className="list-none text-sm text-muted/80 mt-1 space-y-0.5">
            {experience.details.map((d, i) => (
              <li key={i} className="before:content-['›'] before:mr-2 before:text-accent/60"><span className="italic">{d}</span></li>
            ))}
          </ul>
        )}
        {experience.description && (
          <p className="text-base text-muted leading-relaxed mt-2">
            {experience.description}
          </p>
        )}
      </div>
    </div>
  );
}
