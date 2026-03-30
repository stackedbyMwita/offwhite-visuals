import { GalleryView } from '@/components/global'
import CTABanner from '@/components/global/CTABanner'
import PageHeader from '@/components/global/PageHeader'
import RelatedProjectCard from '@/components/global/RelatedProjectCard'
import ServiceDeliverablesCard from '@/components/global/ServiceDeliverablesCard'
import ServiceProcessStep from '@/components/global/ServiceProcessStep'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/shared/SectionHeader'
import CustomButton from '@/components/ui/CustomButton'
import { SERVICE_GALLERIES } from '@/data/images.data'
import { projects } from '@/data/projects.data'
import { services } from '@/data/services.data'
import { siteConfig } from '@/data/site.config'
import {
  ArrowLeft,
  ArrowUpRight,
  CheckIcon,
  Code2,
  Layers,
  PenTool,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// ── Icon resolver ────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Layers,
  Code2,
  Sparkles,
  PenTool,
  TrendingUp,
}

// ── Static params ────────────────────────────────────────────
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

// ── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: `${service.title} — ${siteConfig.name}`,
    description: service.shortDescription,
  }
}

// ── Page ──────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const Icon = iconMap[service.icon] ?? Layers

  // Adjacent services for prev/next nav
  const currentIndex = services.findIndex((s) => s.slug === slug)
  const prevService  = currentIndex > 0 ? services[currentIndex - 1] : null
  const nextService  = currentIndex < services.length - 1 ? services[currentIndex + 1] : null

  // Related projects
  const relatedProjects = projects.filter((p) =>
    service.relatedProjects?.includes(p.slug)
  )

  return (
    <>
      {/* ── Page header ───────────────────────────────────── */}
      <PageHeader
        eyebrow="Our Services"
        heading={service.title}
        accentWord={service.title.split(' ')[0]}
        description={service.shortDescription}
        align="left"
      >
        {/* Icon badge */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-full border mt-2"
          style={{
            borderColor: 'oklch(0.78 0.14 196 / 0.2)',
            backgroundColor: 'oklch(0.78 0.14 196 / 0.08)',
          }}
        >
          <Icon
            size={16}
            style={{ color: 'oklch(0.78 0.14 196)' }}
            strokeWidth={1.5}
          />
          <span
            className="text-xs font-medium tracking-wide"
            style={{ color: 'oklch(0.97 0.005 196 / 0.7)' }}
          >
            {service.deliverables.length} deliverables included
          </span>
        </div>
      </PageHeader>

      {/* ── Hero image + overview ─────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="pt-16 pb-0">

          {/* Hero image */}
          

          {/* Overview grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">

            {/* Left — full description */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <SectionHeader
                eyebrow="Overview"
                heading="What This Service Covers"
                accentWord="Covers"
                align="left"
              />
              <div className="relative w-full aspect-21/9 rounded-fluid overflow-hidden shadow-xl border border-border/20">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Cyan edge */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
              </div>
              <p className="text-base text-muted-foreground leading-[1.85]">
                {service.fullDescription}
              </p>

              {/* Feature checklist */}
              <div className="flex flex-col gap-3">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'oklch(0.78 0.14 196)' }}
                >
                  What's included
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div
                        className="size-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.1)' }}
                      >
                        <CheckIcon
                          size={10}
                          style={{ color: 'oklch(0.78 0.14 196)' }}
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <CustomButton
                label={service.cta}
                href="/contact"
                className="w-fit mt-2"
              />
            </div>

            {/* Right — deliverables + quick stats */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ServiceDeliverablesCard
                deliverables={service.deliverables}
                variant="light"
              />

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Deliverables', value: service.deliverables.length },
                  { label: 'Process steps', value: service.process.length },
                  { label: 'Features', value: service.features.length },
                  { label: 'Projects done', value: relatedProjects.length || '5+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1 p-4 rounded-fluid border border-border/40 bg-secondary/40"
                  >
                    <span className="text-2xl font-black text-primary">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Process ───────────────────────────────────────── */}
      <SectionWrapper variant="dark" className="flex flex-col">
        <MaxWidthWrapper className="py-20 md:py-28">
          <SectionHeader
            eyebrow="How It Works"
            heading="Our Process for This Service"
            accentWord="Process"
            align="left"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((step, i) => (
              <ServiceProcessStep
                key={i}
                step={step}
                index={i}
                variant="dark"
              />
            ))}
          </div>

          {/* Deliverables in dark section too */}
          <div className="mt-12 max-w-md">
            <ServiceDeliverablesCard
              deliverables={service.deliverables}
              variant="dark"
            />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Work Gallery ──────────────────────────────────── */}
      {SERVICE_GALLERIES[service.slug] && (
        <SectionWrapper variant="dark" className="flex flex-col">
          <MaxWidthWrapper className="py-20 md:py-28">
            <SectionHeader
              eyebrow="Our Work"
              heading="Samples of What We've Worked on"
              accentWord="Worked"
              align="left"
              className="mb-12"
            />
            <GalleryView
              images={SERVICE_GALLERIES[service.slug]}
              title={`${service.title} Gallery`}
            />
          </MaxWidthWrapper>
        </SectionWrapper>
      )}

      {/* ── Related projects ──────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <SectionWrapper variant="light" className="flex flex-col">
          <MaxWidthWrapper className="py-20 md:py-24">
            <div className="flex items-center justify-between mb-10">
              <SectionHeader
                eyebrow="Case Studies"
                heading="Projects Using This Service"
                accentWord="Projects"
                align="left"
              />
              <CustomButton
                label="All Projects"
                href="/projects"
                variant="outline"
                className="shrink-0 self-start"
              />
            </div>

            <div className="flex flex-col gap-4 max-w-2xl">
              {relatedProjects.map((project) => (
                <RelatedProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </MaxWidthWrapper>
        </SectionWrapper>
      )}

      {/* ── Other services ────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col pt-12">
        <MaxWidthWrapper className="pb-10">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'oklch(0.78 0.14 196)' }}
            >
              Other Services
            </span>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter((s) => s.slug !== slug)
              .slice(0, 3)
              .map((s) => {
                const OtherIcon = iconMap[s.icon] ?? Layers
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-start gap-4 p-5 rounded-fluid border border-border/40 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div
                      className="size-10 rounded-fluid flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/15"
                      style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.08)' }}
                    >
                      <OtherIcon
                        size={18}
                        strokeWidth={1.5}
                        style={{ color: 'oklch(0.78 0.14 196)' }}
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {s.shortDescription}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 mt-0.5 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </Link>
                )
              })}
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Prev / Next service navigation ────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col ">
        <MaxWidthWrapper className="pb-20">
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-border/40">

            {/* Prev */}
            {prevService ? (
              <Link
                href={`/services/${prevService.slug}`}
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest opacity-60">
                    Previous
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {prevService.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* All services */}
            <Link
              href="/services"
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              All Services
            </Link>

            {/* Next */}
            {nextService ? (
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 text-right"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-widest opacity-60">
                    Next
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {nextService.title}
                  </span>
                </div>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── CTA ───────────────────────────────────────────── */}
      <SectionWrapper variant="dark" className="flex flex-col">
        <MaxWidthWrapper>
          <CTABanner
            variant="dark"
            heading={`Ready to start your ${service.title.toLowerCase()} project?`}
            body="Let's have a quick call and figure out exactly what you need."
            buttonLabel={service.cta}
            buttonHref="/contact"
            className='my-12'
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}