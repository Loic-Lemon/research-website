import Image from "next/image";
import {
  FlaskConical,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { AboutMe } from "@/data/aboutme";

interface ProfileSectionProps {
  aboutMe: AboutMe;
}

export function ProfileSection({ aboutMe }: ProfileSectionProps) {
  if (!aboutMe) {
    return null;
  }

  return (
    <>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="ink-bleed" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="4" result="noise">
              <animate attributeName="baseFrequency" values="0.006;0.011;0.005;0.009;0.006" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="warped"/>
            <feGaussianBlur stdDeviation="1.5" in="warped" result="blurred"/>
            <feColorMatrix type="matrix" values="1.15 0 0 0 -0.08  1.1 0 0 0 -0.06  0.95 0 0 0 -0.04  0 0 0 0.85 0" in="blurred"/>
          </filter>
        </defs>
      </svg>
      <div className="md:sticky top-12 flex flex-row-reverse md:flex-col gap-2 md:space-y-6">
        {aboutMe.imageUrl && (
          <div className="w-1/3 md:w-full flex-shrink-0">
            <div className="relative max-h-[45vh] md:w-[65%] aspect-[3/4] group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500">
              <Image
                src={aboutMe.imageUrl}
                alt={aboutMe.name}
                fill
                priority
                className="object-cover transition-opacity duration-700 group-hover:opacity-0"
              />
              <Image
                src={aboutMe.imageUrl}
                alt={aboutMe.name}
                fill
                priority
                className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 pulse-on-hover"
                style={{ filter: 'url(#ink-bleed)' }}
              />
              <div className="absolute inset-0 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}
        <div className="w-2/3 md:w-full">
        <h1 className="font-serif text-4xl font-light tracking-wide mb-3">
          {aboutMe.name}
        </h1>
        {aboutMe.pronunciation && (
          <p className="text-xs italic text-muted opacity-60 mb-3">{aboutMe.pronunciation}</p>
        )}
        {aboutMe.altName && (
          <p className="text-muted text-sm leading-relaxed mb-6">
            {aboutMe.altName}
          </p>
        )}
        <p className="text-muted text-sm leading-relaxed tracking-wide uppercase mb-6">
          {aboutMe.title}
          <br />
          {aboutMe.institutionUrl ? (
            <a
              href={aboutMe.institutionUrl}
              className="hover:text-foreground transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {aboutMe.institution}
            </a>
          ) : (
            aboutMe.institution
          )}
        </p>
        <div className="flex items-center gap-3 mb-3">
          {aboutMe.institutionUrl && (
            <a
              href={aboutMe.institutionUrl}
              aria-label="Cardiff University"
              title="Cardiff University"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logos/cardiff-university.svg"
                alt="Cardiff University logo"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </a>
          )}
          {aboutMe.labUrl && (
            <a
              href={aboutMe.labUrl}
              aria-label="AGILE Lab"
              title="AGILE Lab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logos/agilelab.png"
                alt="AGILE Lab logo"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </a>
          )}
        </div>
        <div className="flex gap-6 mb-6">
          {aboutMe.blogUrl && (
            <a
              href={aboutMe.blogUrl}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Notebook</span>
            </a>
          )}
          {/* {aboutMe.cvUrl && (
            <a
              href={aboutMe.cvUrl}
              className="group inline-flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">CV</span>
            </a>
          )} */}
        </div>
        <div className="space-y-2">
          <a
            href={`mailto:${aboutMe.email}`}
            className="inline-flex items-center gap-2 text-base text-muted hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={14} />
            {aboutMe.email}
          </a>
          {aboutMe.googleScholarUrl && (
            <>
              <br />
              <a
                href={aboutMe.googleScholarUrl}
                className="inline-flex items-center gap-2 text-base text-muted hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap size={14} />
                Google Scholar
              </a>
            </>
          )}
          {aboutMe.twitterUsername && (
            <>
              <br />
              <a
                href={`https://twitter.com/${aboutMe.twitterUsername}`}
                className="inline-flex items-center gap-2 text-base text-muted hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={14} />@{aboutMe.twitterUsername}
              </a>
            </>
          )}
          {aboutMe.linkedinUsername && (
            <>
              <br />
              <a
                href={`https://www.linkedin.com/in/${aboutMe.linkedinUsername}`}
                className="inline-flex items-center gap-2 text-base text-muted hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={14} />
                linkedin.com/in/{aboutMe.linkedinUsername}
              </a>
            </>
          )}
          {aboutMe.labUrl && (
            <>
              <br />
              <a
                href={aboutMe.labUrl}
                className="inline-flex items-center gap-2 text-base text-muted hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FlaskConical size={14} />
                {aboutMe.labUrl}
              </a>
            </>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
