import { ProjectCard } from '@/components/cards'
import CTABanner from '@/components/global/CTABanner'
import PageHeader from '@/components/global/PageHeader'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import CustomButton from '@/components/ui/CustomButton'
import { projects } from '@/data/projects.data'
import { services } from '@/data/services.data'
import { siteConfig } from '@/data/site.config'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  Quote,
  Users,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Static params
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.tagline,
  }
}

// ── Stat pill ────────────────────────────────────────────────
function StatPill({
  label,
  value,
  variant = 'dark',
}: {
  label: string
  value: string
  variant?: 'dark' | 'light'
}) {
  const isDark = variant === 'dark'
  return (
    <div
      className="flex flex-col gap-1 px-5 py-4 rounded-2xl border"
      style={{
        borderColor: isDark
          ? 'oklch(0.78 0.14 196 / 0.15)'
          : 'oklch(0.78 0.14 196 / 0.2)',
        backgroundColor: isDark
          ? 'oklch(0.78 0.14 196 / 0.06)'
          : 'oklch(0.78 0.14 196 / 0.04)',
      }}
    >
      <span
        className="text-2xl md:text-3xl font-black font-serif tabular-nums"
        style={{ color: 'oklch(0.78 0.14 196)' }}
      >
        {value}
      </span>
      <span
        className="text-[10px] uppercase tracking-widest"
        style={{
          color: isDark
            ? 'oklch(0.97 0.005 196 / 0.45)'
            : 'var(--muted-foreground)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Tech badge ───────────────────────────────────────────────
function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium font-mono border"
      style={{
        borderColor: 'oklch(0.78 0.14 196 / 0.2)',
        backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
        color: 'oklch(0.78 0.14 196)',
      }}
    >
      {name}
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  // Adjacent projects
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  // Related projects — same category, exclude current
  const relatedProjects = projects
    .filter(
      (p) =>
        p.slug !== slug &&
        p.category.some((c) => project.category.includes(c))
    )
    .slice(0, 3)

  // Services used — resolve slugs to full service objects
  const usedServices = services.filter((s) =>
    project.services.includes(s.slug)
  )

  return (
    <>
      {/* ── Page header ───────────────────────────────────── */}
      <PageHeader
        eyebrow={project.category[0]}
        heading={project.title}
        accentWord={project.title.split(' ')[0]}
        description={project.tagline}
        align="left"
      >
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
              color: 'oklch(0.97 0.005 196 / 0.65)',
            }}
          >
            <Users size={11} />
            {project.client}
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
              color: 'oklch(0.97 0.005 196 / 0.65)',
            }}
          >
            <Calendar size={11} />
            {project.year}
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
              color: 'oklch(0.97 0.005 196 / 0.65)',
            }}
          >
            <Clock size={11} />
            {project.duration}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200"
              style={{
                backgroundColor: 'oklch(0.78 0.14 196)',
                color: 'oklch(0.13 0.025 196)',
              }}
            >
              <ExternalLink size={11} />
              Live Project
            </a>
          )}
        </div>
      </PageHeader>

      {/* ── Cover image ───────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col pb-0">
        <MaxWidthWrapper className="pt-12">
          <div className="relative w-full aspect-21/9 rounded-3xl overflow-hidden shadow-xl border border-border/20">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Outcomes strip ────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col pb-0">
        <MaxWidthWrapper className="py-10">
          <div className="flex flex-wrap gap-4">
            {project.outcomes.map((outcome, i) => (
              <StatPill
                key={i}
                value={outcome.value}
                label={outcome.label}
                variant="light"
              />
            ))}
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Case study body ───────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── Main content ──────────────────────────── */}
            <div className="lg:col-span-8 flex flex-col gap-14">

              {/* Challenge */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.25em]"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    01 — The Challenge
                  </span>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                <p className="text-base text-muted-foreground leading-[1.85]">
                  {project.challenge}
                </p>
              </div>

              {/* Approach */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.25em]"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    02 — Our Approach
                  </span>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                <p className="text-base text-muted-foreground leading-[1.85]">
                  {project.approach}
                </p>
              </div>

              {/* Solution */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.25em]"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    03 — The Solution
                  </span>
                  <div className="h-px flex-1 bg-border/40" />
                </div>
                <p className="text-base text-muted-foreground leading-[1.85]">
                  {project.solution}
                </p>
              </div>

              {/* Project images */}
              {project.images.length > 0 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.25em]"
                      style={{ color: 'oklch(0.78 0.14 196)' }}
                    >
                      04 — Project Shots
                    </span>
                    <div className="h-px flex-1 bg-border/40" />
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* First image — full width */}
                    {project.images[0] && (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/20 shadow-md">
                        <Image
                          src={project.images[0]}
                          alt={`${project.title} — screenshot 1`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 65vw"
                        />
                      </div>
                    )}

                    {/* Remaining images — two column grid */}
                    {project.images.length > 1 && (
                      <div className="grid grid-cols-2 gap-4">
                        {project.images.slice(1).map((img, i) => (
                          <div
                            key={i}
                            className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-border/20 shadow-md"
                          >
                            <Image
                              src={img}
                              alt={`${project.title} — screenshot ${i + 2}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 30vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <div
                  className="flex flex-col gap-6 p-8 rounded-3xl border"
                  style={{
                    borderColor: 'oklch(0.78 0.14 196 / 0.2)',
                    background:
                      'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.04) 0%, transparent 100%)',
                  }}
                >
                  <Quote
                    size={32}
                    style={{ color: 'oklch(0.78 0.14 196 / 0.4)' }}
                  />
                  <p className="text-lg font-serif italic text-foreground leading-relaxed">
                    "{project.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full flex items-center justify-center text-xs font-black"
                      style={{
                        backgroundColor: 'oklch(0.78 0.14 196 / 0.15)',
                        color: 'oklch(0.78 0.14 196)',
                      }}
                    >
                      {project.testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-foreground">
                        {project.testimonial.author}
                      </span>
                      <span className="text-xs text-primary">
                        {project.testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ───────────────────────────────── */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 flex flex-col gap-5">

                {/* Project info */}
                <div
                  className="flex flex-col gap-4 p-5 rounded-2xl border"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--secondary)',
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    Project Details
                  </p>

                  {[
                    { label: 'Client', value: project.client },
                    { label: 'Year', value: String(project.year) },
                    { label: 'Duration', value: project.duration },
                    {
                      label: 'Category',
                      value: project.category.join(', '),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-4 text-xs"
                    >
                      <span className="text-muted-foreground shrink-0">
                        {label}
                      </span>
                      <span className="font-semibold text-foreground text-right">
                        {value}
                      </span>
                    </div>
                  ))}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: 'oklch(0.78 0.14 196 / 0.1)',
                        color: 'oklch(0.78 0.14 196)',
                        border: '1px solid oklch(0.78 0.14 196 / 0.2)',
                      }}
                    >
                      <ExternalLink size={12} />
                      Visit Live Site
                    </a>
                  )}
                </div>

                {/* Services used */}
                {usedServices.length > 0 && (
                  <div
                    className="flex flex-col gap-4 p-5 rounded-2xl border"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--secondary)',
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: 'oklch(0.78 0.14 196)' }}
                    >
                      Services Used
                    </p>
                    <div className="flex flex-col gap-2">
                      {usedServices.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-center justify-between text-xs font-medium text-foreground hover:text-primary transition-colors duration-200 group/s"
                        >
                          {s.title}
                          <ArrowUpRight
                            size={12}
                            className="text-border group-hover/s:text-primary group-hover/s:translate-x-0.5 group-hover/s:-translate-y-0.5 transition-all duration-200"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech stack */}
                <div
                  className="flex flex-col gap-4 p-5 rounded-2xl border"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--secondary)',
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div
                  className="flex flex-col gap-4 p-5 rounded-2xl border"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--secondary)',
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    Outcomes
                  </p>
                  <div className="flex flex-col gap-3">
                    {project.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {outcome.label}
                        </span>
                        <span
                          className="text-sm font-black tabular-nums"
                          style={{ color: 'oklch(0.78 0.14 196)' }}
                        >
                          {outcome.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <CustomButton
                  label="Start a Similar Project"
                  href="/contact"
                  fullWidth
                />
              </div>
            </aside>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Related projects ──────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <SectionWrapper variant="light" className="flex flex-col pb-0">
          <MaxWidthWrapper className="pb-16">
            <div className="flex items-center gap-3 mb-10">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                Related Work
              </span>
              <div className="h-px flex-1 bg-border/40" />
              <Link
                href="/projects"
                className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                All Projects
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </MaxWidthWrapper>
        </SectionWrapper>
      )}

      {/* ── Prev / Next navigation ────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="pb-20">
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-border/40">

            {/* Prev */}
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 text-sm"
              >
                <ArrowLeft
                  size={16}
                  className="text-muted-foreground group-hover:text-primary group-hover:-translate-x-0.5 transition-all duration-200"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Previous
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* All projects */}
            <Link
              href="/projects"
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200 shrink-0"
            >
              All Projects
            </Link>

            {/* Next */}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 text-sm text-right"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Next
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── CTA ───────────────────────────────────────────── */}
      <SectionWrapper variant="dark" className="flex flex-col pb-28">
        <MaxWidthWrapper>
          <CTABanner
            variant="dark"
            heading="Like what you see?"
            body="Let's build something great together. Tell us about your project."
            buttonLabel="Start a Project"
            buttonHref="/contact"
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}