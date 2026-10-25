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
import { ExtraTypingRacer } from "@/components/extra/extra-typing-racer";
import { ArrowUpRight } from "lucide-react";
import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import { PageContents } from "@/components/page-contents";
import Image from "next/image";

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
  const pageContentRef = useRef<HTMLDivElement>(null);

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

  const scrollToTop = useCallback(() => {
    if (window.scrollY <= 0) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  }, []);

  const navigateTo = useCallback((section: Section | null, projectSlug?: string) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    scrollToTop();

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
      setShowAllNewsView(false);
      setNewsViewTransition('idle');
      isNewsViewTransitioning.current = false;
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
  }, [scrollToTop]);

  const closeProject = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    scrollToTop();

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
  }, [scrollToTop]);

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
        <div className={`${newsViewTransition === 'exiting' ? 'animate-fade-out-up' : ''} section-stack`}>
          {aboutMe.description && (
            <section id="about" data-toc-label="Intro">
              <div
                className="text-base leading-relaxed text-foreground/90 [&_a]:underline [&_a]:text-foreground [&_a:hover]:text-muted"
                dangerouslySetInnerHTML={{ __html: aboutMe.description }}
              />
            </section>
          )}
          {aboutMe.researchDescription && (
            <section id="my-research" aria-labelledby="my-research-heading">
              <h2 id="my-research-heading" className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                My Research
              </h2>
              <div
                className="text-base leading-relaxed text-foreground/90 [&_a]:underline [&_a]:text-foreground [&_a:hover]:text-muted"
                dangerouslySetInnerHTML={{ __html: aboutMe.researchDescription }}
              />
              {aboutMe.researchImage && (
                <figure className="mt-6">
                  <Image
                    src={aboutMe.researchImage}
                    alt="Loic as a cartoon caveman being chased by a saber-toothed tiger"
                    className="mx-auto aspect-[1.97] h-auto w-[85%] rounded-xl object-cover shadow-md"
                    sizes="(max-width: 899px) calc(85vw - 54.4px), (max-width: 1024px) 54vw, 540px"
                  />
                  <figcaption className="text-center text-sm text-muted mt-1 italic">
                    Image: Depiction of when stress helped us survive life or death situations.
                  </figcaption>
                </figure>
              )}
              {aboutMe.researchConclusion && (
                <>
                  <p
                    className="mt-6 text-base leading-relaxed text-foreground/90"
                    dangerouslySetInnerHTML={{ __html: aboutMe.researchConclusion }}
                  />
                  <div className="mt-5 text-center">
                    <p aria-hidden="true" className="tracking-[0.75em] text-foreground/[0.35]">· · ·</p>
                    <p className="mt-1 text-xs italic text-muted/80">Still being filled in</p>
                  </div>
                </>
              )}
            </section>
          )}
          {newsData.length > 0 && (
            <section id="recent-highlights">
              <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                Recent Highlights
              </h2>
              <div className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
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
                    className="btn-chip"
                  >
                    <ArrowUpRight size={11} />
                    <span>Show more</span>
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
              <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                Recent Highlights
              </h2>
              <div className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
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
          (aboutMe.backgroundDescription || educationData.length > 0 || experienceData.length > 0) && (
            <section id="timeline">
              {aboutMe.backgroundDescription && (
                <div
                  id="background-introduction"
                  data-toc-label="Intro"
                  className="text-base leading-relaxed text-foreground/90 [&_a]:underline [&_a]:text-foreground [&_a:hover]:text-muted"
                  dangerouslySetInnerHTML={{ __html: aboutMe.backgroundDescription }}
                />
              )}
              {educationData.length > 0 && (
                <>
                  <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                    Education
                  </h2>
                  <div className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
                    {educationData.map((education, index) => (
                      <EducationEntry key={index} education={education} />
                    ))}
                  </div>
                </>
              )}
              {experienceData.length > 0 && (
                <>
                  <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                    Experience
                  </h2>
                  <div className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
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
              <p className="text-sm text-muted leading-relaxed">
                A list of my published works.
              </p>
              <div className="section-heading flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pb-2">
                <h2 className="font-serif font-bold text-xl tracking-wide uppercase">
                  Publications
                </h2>
                <p className="text-sm text-muted">
                  * means co-first author
                </p>
              </div>
              <div data-toc-group="years" className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
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
              <p className="text-sm text-muted leading-relaxed">
                A collection of previous and ongoing research projects.
              </p>
              <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                Research
              </h2>
              <div className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
                {portfolioData.map((portfolio, index) => (
                  <PortfolioEntry key={index} index={index} portfolio={portfolio} onProjectClick={(slug) => navigateTo(Section.Portfolio, slug)} />
                ))}
              </div>
            </section>
          )
        );
      case Section.Award:
        return (
          awardData.length > 0 && (
            <section id="awards">
              <p className="text-sm text-muted leading-relaxed">
                A list of honours, scholarships, and any recognitions.
              </p>
              <h2 className="section-heading font-serif font-bold text-xl tracking-wide uppercase">
                Awards
              </h2>
              <div data-toc-group="years" className="space-y-4 [&>*+*]:item-separator [&>*+*]:pt-4">
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
      <NavBar activeSection={selectedSection} onNavigate={navigateTo} />
      <div className="max-w-screen-lg mx-auto px-8 py-28">
        {/* Grid Layout */}
        <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-2">
          {/* Left Column - Fixed Info */}
          <div className="mb-8 md:mb-0">
            <ProfileSection aboutMe={aboutMe} />
          </div>
          {/* Right Column - Scrolling Content */}
          <div className="contents md:block">
            <PageContents
              key={`${selectedSection}-${selectedProject?.slug}-${showAllNewsView}-${showSecretGame}`}
              contentRef={pageContentRef}
            />
            <div ref={pageContentRef} className="[&_[id]]:scroll-mt-[var(--page-contents-clearance,7rem)]">
              {showSecretGame ? (
                <ExtraTypingRacer onBack={() => setShowSecretGame(false)} />
              ) : (
                <div className={transitionState === 'exiting' ? 'animate-fade-out-up' : transitionState === 'entering' ? 'animate-fade-in-up' : ''}>
                  {renderSection()}
                </div>
              )}
            </div>
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
