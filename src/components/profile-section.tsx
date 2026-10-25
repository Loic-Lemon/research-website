'use client';

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import {
  FlaskConical,
  Linkedin,
  Mail,
  MailOpen,
  Bird,
  Check,
  Twitter,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { AboutMe } from "@/data/aboutme";

interface ProfileSectionProps {
  aboutMe: AboutMe;
}

function CardiffDragon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 52" className="cardiff-dragon">
      <g className="dragon-tail" fill="currentColor">
        <path d="M30 32C18 38 4 36 6 26c1-5 6-7 9-5-6 0-5 7 0 8 4 1 8-1 13-3Z" />
        <path d="m9 22-5-3 2 6Z" />
      </g>
      <g className="dragon-wing">
        <path d="M31 29 17 6l1 14-9-2 13 17 10-4Z" fill="currentColor" />
        <path d="m18 15 11 14m-15-8 15 8" fill="none" stroke="rgb(var(--background))" strokeWidth="1.25" strokeLinecap="round" />
      </g>
      <g fill="currentColor">
        <path d="M23 29c4-9 11-11 19-7l4-8 9 1 5 5-7 3-4-1-2 8c-1 6-7 9-15 7l-6-1Z" />
        <path d="m46 15-1-6 6 5m2 2 4-5 1 7m-22 3 1-5 4 6m-14 3-2-4 6 2" />
        <path d="m40 33 2 10h9l-4-4-1-8m-16 3-6 8h-8l4-4 3-8" />
      </g>
      <circle cx="52" cy="18" r="1.1" fill="rgb(var(--background))" />
      <path d="M53 22h4" fill="none" stroke="rgb(var(--background))" strokeWidth="1" strokeLinecap="round" />
      <g className="dragon-breath">
        <path d="M59 20c4-7 8-5 11-7-1 4-2 6-7 8 4-1 5 0 7 2-5 2-9 2-11-3Z" fill="#d68a3a" />
        <path d="m60 20 6-3-3 4 3 1-6-1Z" fill="#f2c478" />
      </g>
    </svg>
  );
}

export function ProfileSection({ aboutMe }: ProfileSectionProps) {
  const slotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    const updateWidth = () => {
      slot.style.setProperty("--profile-width", `${slot.getBoundingClientRect().width}px`);
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [aboutMe]);

  if (!aboutMe) {
    return null;
  }

  return (
    <div ref={slotRef}>
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
      <div className="flex flex-row-reverse md:fixed md:top-24 md:w-[var(--profile-width)] md:flex-col gap-2 md:space-y-6 md:max-h-[calc(100dvh-7rem)] md:overflow-y-auto">
        {aboutMe.imageUrl && (
          <div className="w-2/5 md:w-full flex-shrink-0">
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
        <div className="min-w-0 flex-1 md:w-full md:flex-none">
        <h1 className="font-serif text-4xl font-light tracking-wide mb-3">
          {aboutMe.name.endsWith("Lemoine") ? (
            <>
              {aboutMe.name.slice(0, -"Lemoine".length)}
              <span className="surname-hover">
                Lemoine
                <span aria-hidden="true" className="surname-lemon">🍋</span>
              </span>
            </>
          ) : aboutMe.name}
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
              className="hover:text-accent focus-visible:text-accent transition-colors duration-300"
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
              className="cardiff-link relative inline-flex shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
              <CardiffDragon />
            </a>
          )}
          {aboutMe.labUrl && (
            <a
              href={aboutMe.labUrl}
              aria-label="AGILE Lab"
              title="AGILE Lab"
              className="biosignal-link relative inline-flex shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
              <svg aria-hidden="true" viewBox="0 0 72 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lab-biosignal">
                <path pathLength="1" className="biosignal-trace" d="M2 8 6 8 8 5 10 11 12 2 15 14 18 6 21 9 24 4 27 11 30 7 33 8 36 1 39 13 42 6 45 9 48 3 51 12 54 6 57 8 60 4 63 11 66 6 70 8" />
                <path pathLength="1" className="biosignal-trace opacity-30" d="M2 19 6 19 9 17 12 21 15 16 18 20 21 18 24 19 27 15 30 21 33 17 36 19 39 16 42 21 45 17 48 19 51 16 54 20 57 18 60 19 63 16 66 20 70 18" />
              </svg>
            </a>
          )}
        </div>
        <div className="flex gap-6 mb-6">
          {aboutMe.blogUrl && (
            <a
              href={aboutMe.blogUrl}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent focus-visible:text-accent transition-colors duration-300"
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
              className="group inline-flex items-center gap-2 text-xs text-muted hover:text-accent focus-visible:text-accent transition-colors duration-300"
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
        <div className="space-y-2 md:[&>a]:max-w-full md:[&>a]:[overflow-wrap:anywhere] md:[&>a>svg]:shrink-0">
          <a
            href={`mailto:${aboutMe.email}`}
            className="mail-link inline-flex items-center gap-2 text-base text-muted hover:text-accent focus-visible:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true" className="mail-icon">
              <Mail size={14} className="mail-closed" />
              <MailOpen size={14} className="mail-open" />
              <Bird size={16} className="mail-pigeon" />
            </span>
            {aboutMe.email}
          </a>
          {aboutMe.googleScholarUrl && (
            <>
              <br />
              <a
                href={aboutMe.googleScholarUrl}
                className="inline-flex items-center gap-2 text-base text-muted hover:text-accent focus-visible:text-accent transition-colors"
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
                className="inline-flex items-center gap-2 text-base text-muted hover:text-accent focus-visible:text-accent transition-colors"
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
                className="linkedin-link inline-flex items-center gap-2 text-base text-muted hover:text-accent focus-visible:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true" className="linkedin-icon">
                  <Linkedin size={14} className="linkedin-mark" />
                  <span className="linkedin-check"><Check size={9} strokeWidth={3} /></span>
                </span>
                linkedin.com/in/{aboutMe.linkedinUsername}
              </a>
            </>
          )}
          {aboutMe.labUrl && (
            <>
              <br />
              <a
                href={aboutMe.labUrl}
                className="lab-link inline-flex items-center gap-2 text-base text-muted hover:text-accent focus-visible:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true" className="lab-icon">
                  <FlaskConical size={14} className="lab-flask" />
                  <span className="lab-bubbles"><span /><span /><span /></span>
                </span>
                {aboutMe.labUrl}
              </a>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
