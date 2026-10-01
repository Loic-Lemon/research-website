'use client';
import { EducationEntry } from "@/components/education-entry";
import { educationData } from "@/data/education";
import { PublicationEntry } from "@/components/publication-entry";
import { publicationData } from "@/data/publication";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { ExperienceEntry } from "@/components/experience-entry";
import { experienceData } from "@/data/experience";
import { PortfolioEntry } from "@/components/portfolio-entry";
import { portfolioData } from "@/data/portfolio";
import { Portfolio } from "@/data/portfolio";
import { Section } from "@/data/section-order";
import { AwardEntry } from "@/components/award-entry";
import { awardData } from "@/data/award";
import { extraBlocks } from "@/data/extra";
import { ExtraSection } from "@/components/extra";
import { ProjectDetail } from "@/components/project-detail";
import { AllNewsView } from "@/components/all-news-view";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExtraTypingRacer } from "@/components/extra/extra-typing-racer";
import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/nav-bar";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") as Section | null;
  const initialProjectSlug = searchParams.get("project");
  const [showAllNewsView, setShowAllNewsView] = useState(false);
  const [newsViewTransition, setNewsViewTransition] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const isNewsViewTransitioning = useRef(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(
    initialSection && Object.values(Section).includes(initialSection as Section)
      ? initialSection
      : null
  );
  const [selectedProject, setSelectedProject] = useState<Portfolio | null>(
    initialProjectSlug ? portfolioData.find((p) => p.slug === initialProjectSlug) ?? null : null
  );
  const [transitionState, setTransitionState] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const isTransitioning = useRef(false);
  const [showSecretGame, setShowSecretGame] = useState(false);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          index = 0;
          setShowSecretGame(true);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigateTo = useCallback((section: Section | null, projectSlug?: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const params = new URLSearchParams(window.location.search);
    if (section) {
      params.set("section", section);
    } else {
      params.delete("section");
    }
    if (projectSlug) {
      params.set("project", projectSlug);
    } else {
      params.delete("project");
    }
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);

    setTransitionState('exiting');

    setTimeout(() => {
      setSelectedSection(section);
      if (section === Section.Portfolio && projectSlug) {
        setSelectedProject(portfolioData.find((p) => p.slug === projectSlug) ?? null);
      } else {
        setSelectedProject(null);
      }
      setTransitionState('entering');

      setTimeout(() => {
        setTransitionState('idle');
        isTransitioning.current = false;
      }, 300);
    }, 150);
  }, []);

  const closeProject = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const params = new URLSearchParams(window.location.search);
    params.set("section", Section.Portfolio);
    params.delete("project");
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);

    setTransitionState('exiting');

    setTimeout(() => {
      setSelectedProject(null);
      setTransitionState('entering');

      setTimeout(() => {
        setTransitionState('idle');
        isTransitioning.current = false;
      }, 300);
    }, 150);
  }, []);

  // Helper to render the selected section
  const renderSection = () => {
    if (selectedSection === null) {
      if (showAllNewsView) {
        return (
          <div className={newsViewTransition === 'entering' ? 'animate-fade-in-up' : ''}>
            <AllNewsView
              news={newsData}
              onBack={() => {
                if (isNewsViewTransitioning.current) return;
                isNewsViewTransitioning.current = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setNewsViewTransition('exiting');
                setTimeout(() => {
                  setShowAllNewsView(false);
                  setNewsViewTransition('entering');
                  setTimeout(() => {
                    setNewsViewTransition('idle');
                    isNewsViewTransitioning.current = false;
                  }, 300);
                }, 150);
              }}
            />
          </div>
        );
      }

      return (
        <div className={`${newsViewTransition === 'exiting' ? 'animate-fade-out-up' : ''} space-y-12`}>
          {aboutMe.description && (
            <section>
              <div
                className="text-base leading-relaxed text-foreground/90 [&_a]:underline [&_a]:text-foreground [&_a:hover]:text-muted"
                dangerouslySetInnerHTML={{ __html: aboutMe.description }}
              />
            </section>
          )}
          {newsData.length > 0 && (
            <section id="recent-highlights">
              <h2 className="font-serif font-bold text-xl mb-8 tracking-wide uppercase border-b border-foreground">
                Recent Highlights
              </h2>
              <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                {newsData.slice(0, 4).map((news, index) => (
                  <NewsEntry key={index} news={news} />
                ))}
              </div>
              {newsData.length > 4 && (
                <div className="flex justify-end items-center gap-2 mt-8">
                  <button
                    onClick={() => {
                      if (isNewsViewTransitioning.current) return;
                      isNewsViewTransitioning.current = true;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setNewsViewTransition('exiting');
                      setTimeout(() => {
                        setShowAllNewsView(true);
                        setNewsViewTransition('entering');
                        setTimeout(() => {
                          setNewsViewTransition('idle');
                          isNewsViewTransitioning.current = false;
                        }, 300);
                      }, 150);
                    }}
                    className="text-base text-muted italic hover:text-accent bg-transparent border-none p-0 cursor-pointer opacity-30"
                  >
                    Show more →
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      );
    }

    switch (selectedSection) {
      case Section.News:
        return (
          newsData.length > 0 && (
            <section id="recent-highlights">
              <h2 className="font-serif font-bold text-xl mb-8 tracking-wide uppercase border-b border-foreground">
                Recent Highlights
              </h2>
              <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                {newsData.map((news, index) => (
                  <NewsEntry key={index} news={news} />
                ))}
              </div>
              <div className="flex justify-end items-center gap-2 mt-16">
                {/* <p className="text-sm text-zinc-600 italic cursor-not-allowed line-through">View all highlights here →</p> */}
              </div>
            </section>
          )
        );
      case Section.Timeline:
        return (
          (educationData.length > 0 || experienceData.length > 0) && (
            <section id="timeline">
              <p className="text-sm text-muted mb-4 leading-relaxed">
                My academic and professional timeline.
              </p>
              {educationData.length > 0 && (
                <>
                  <h2 className="font-serif font-bold text-xl mb-8 tracking-wide uppercase border-b border-foreground">
                    Education
                  </h2>
                  <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                    {educationData.map((education, index) => (
                      <EducationEntry key={index} education={education} />
                    ))}
                  </div>
                </>
              )}
              {experienceData.length > 0 && (
                <>
                  <h2 className="font-serif font-bold text-xl mb-8 mt-12 tracking-wide uppercase border-b border-foreground">
                    Experience
                  </h2>
                  <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                    {experienceData.map((experience, index) => (
                      <ExperienceEntry key={index} experience={experience} />
                    ))}
                  </div>
                </>
              )}
            </section>
          )
        );
      case Section.Publication:
        return (
          publicationData.length > 0 && (
            <section id="publications">
              <p className="text-sm text-muted mb-4 leading-relaxed">
                A list of my published works.
              </p>
              <div className="flex justify-between items-baseline mb-8 border-b border-foreground">
                <h2 className="font-serif font-bold text-xl tracking-wide uppercase">
                  Publications
                </h2>
                <p className="text-base text-muted italic opacity-35 shrink-0">
                  * means co-first author
                </p>
              </div>
              <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                {publicationData.map((publication, index) => (
                  <PublicationEntry key={index} publication={publication} />
                ))}
              </div>
              <div className="flex justify-end items-center gap-2 mt-2">
                {/* <p className="text-sm text-zinc-600 italic cursor-not-allowed line-through">View all publications here →</p> */}
              </div>
            </section>
          )
        );
      case Section.Portfolio:
        if (selectedProject) {
          return <ProjectDetail project={selectedProject} onBack={closeProject} />;
        }
        return (
          portfolioData.length > 0 && (
            <section id="research">
              <p className="text-sm text-muted mb-4 leading-relaxed">
                A collection of previous and ongoing research projects.
              </p>
              <h2 className="font-serif font-bold text-xl mb-8 tracking-wide uppercase border-b border-foreground">
                Research
              </h2>
              <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                {portfolioData.map((portfolio, index) => (
                  <PortfolioEntry key={index} index={index} portfolio={portfolio} onProjectClick={(slug) => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigateTo(Section.Portfolio, slug); }} />
                ))}
              </div>
            </section>
          )
        );
      case Section.Award:
        return (
          awardData.length > 0 && (
            <section id="awards">
              <p className="text-sm text-muted mb-4 leading-relaxed">
                A list of honours, scholarships, and any recognitions.
              </p>
              <h2 className="font-serif font-bold text-xl mb-8 tracking-wide uppercase border-b border-foreground">
                Awards
              </h2>
              <div className="space-y-6 [&>*+*]:item-separator [&>*+*]:pt-6">
                {awardData.map((award, index) => (
                  <AwardEntry key={index} award={award} />
                ))}
              </div>
            </section>
          )
        );
      case Section.Extra:
        return (
          extraBlocks.length > 0 && (
            <section id="extra">
              <ExtraSection blocks={extraBlocks} />
            </section>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top-left theme toggle */}
      <div className="fixed left-4 top-3 z-[60] hidden md:block opacity-50 hover:opacity-100 transition-opacity duration-300">
        <ThemeToggle />
      </div>

      <NavBar activeSection={selectedSection} onNavigate={navigateTo} />
      <div className="max-w-screen-lg mx-auto px-8 py-28">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2">
          {/* Left Column - Fixed Info */}
          <div className="space-y-12 mb-8 md:mb-0">
            {/* Profile */}
            <div className="">
              <div className="">
              </div>
              <ProfileSection aboutMe={aboutMe} />
            </div>
          </div>
          {/* Right Column - Scrolling Content */}
          <div>
            {showSecretGame ? (
              <ExtraTypingRacer onBack={() => setShowSecretGame(false)} />
            ) : (
              <div className={`${transitionState === 'exiting' ? 'animate-fade-out-up' : transitionState === 'entering' ? 'animate-fade-in-up' : ''} ${selectedSection === null ? 'space-y-12' : ''}`}>
                {renderSection()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
