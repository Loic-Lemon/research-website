'use client';
import { useParams } from "next/navigation";
import { portfolioData } from "@/data/portfolio";
import { Section } from "@/data/section-order";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { ProjectDetail } from "@/components/project-detail";
import { NavBar } from "@/components/nav-bar";
import Link from "next/link";
import { useRef } from "react";
import { PageContents } from "@/components/page-contents";
import { ArrowLeft } from "lucide-react";

export default function ProjectPage() {
  const pageContentRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const slug = params.slug as string;
  const project = portfolioData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted text-lg">Project not found.</p>
          <Link
            href="/?section=portfolio"
            className="btn-chip"
          >
            <ArrowLeft size={12} data-back />
            <span>Back to Research</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar activeSection={Section.Portfolio} />
      <div className="max-w-screen-lg mx-auto px-8 py-28">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <ProfileSection aboutMe={aboutMe} />
          </div>
          <div className="contents md:col-span-7 md:col-start-6 md:block">
            <PageContents key={slug} contentRef={pageContentRef} />
            <div ref={pageContentRef} className="[&_[id]]:scroll-mt-[var(--page-contents-clearance,7rem)]">
              <ProjectDetail project={project} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
