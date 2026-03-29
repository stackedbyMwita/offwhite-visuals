import { PageHeader } from '@/components/global'
import CTABanner from '@/components/global/CTABanner'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/shared/SectionHeader'
import CustomButton from '@/components/ui/CustomButton'
import { aboutPage } from '@/data/about.data'
import { siteConfig } from '@/data/site.config'
import {
  Gem,
  Globe,
  Handshake,
  Layers,
  ScanEye,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: aboutPage.mission,
}

// ── Icon resolver ────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Gem, Zap, Handshake, ScanEye, Layers, Globe,
}

export default function AboutPage() {
  const { story, mission, approach, values, timeline, author } = aboutPage

  return (
    <>
      {/* ── Page header ───────────────────────────────────── */}
      <PageHeader
        eyebrow="About Us"
        heading={aboutPage.headline}
        accentWord="Thinks"
        description={aboutPage.subheadline}
        align="left"
      />

      {/* ── Story + portrait ──────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left — portrait */}
            <div className="flex flex-col gap-6">
              <div className="relative w-full aspect-3/4 rounded-3xl overflow-hidden border border-border/20 shadow-xl group">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700" />
              </div>

              {/* Author card below image */}
              <div
                className="flex items-center gap-4 p-5 rounded-2xl border"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--secondary)',
                }}
              >
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-bold text-foreground text-sm">
                    {author.name}
                  </span>
                  <span className="text-xs text-primary tracking-wide">
                    {author.role}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {author.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="flex items-center justify-center size-8 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                    >
                      <span className="text-[10px] font-bold font-mono">
                        {s.name.slice(0, 2).toUpperCase()}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — story */}
            <div className="flex flex-col gap-8 pt-2">
              <SectionHeader
                eyebrow="The Story"
                heading="How Offwhite Visuals Came to Be"
                accentWord="Offwhite"
                align="left"
              />

              <div className="flex flex-col gap-5">
                {story.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Mission callout */}
              <div
                className="p-6 rounded-2xl border-l-4 mt-2"
                style={{
                  borderColor: 'oklch(0.78 0.14 196)',
                  backgroundColor: 'oklch(0.78 0.14 196 / 0.04)',
                  border: '1px solid oklch(0.78 0.14 196 / 0.2)',
                  borderLeft: '4px solid oklch(0.78 0.14 196)',
                }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
                  style={{ color: 'oklch(0.78 0.14 196)' }}
                >
                  Mission
                </p>
                <p className="text-base font-medium text-foreground leading-relaxed italic font-serif">
                  "{mission}"
                </p>
              </div>

              <CustomButton
                label="See Our Work"
                href="/projects"
                className="w-fit mt-2"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Approach ──────────────────────────────────────── */}
      <SectionWrapper variant="dark" className="flex flex-col">
        <MaxWidthWrapper className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionHeader
              eyebrow="How We Work"
              heading="Our Approach to Every Project"
              accentWord="Approach"
              align="left"
            />
            <div className="flex flex-col gap-4">
              <p
                className="text-base leading-relaxed"
                style={{ color: 'oklch(0.97 0.005 196 / 0.65)' }}
              >
                {approach}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Discovery first', 'No templates', 'Full transparency', 'Built to last'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'oklch(0.78 0.14 196 / 0.1)',
                      border: '1px solid oklch(0.78 0.14 196 / 0.2)',
                      color: 'oklch(0.78 0.14 196)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Values ────────────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="py-20 md:py-28">
          <SectionHeader
            eyebrow="What We Stand For"
            heading="Values That Drive the Work"
            accentWord="Drive"
            align="center"
            className="items-center text-center mb-14"
            descriptionClassName="max-w-lg"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = iconMap[value.icon] ?? Gem
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-7 rounded-2xl border border-border/40 bg-background hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group"
                >
                  <div
                    className="size-11 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/15"
                    style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.08)' }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: 'oklch(0.78 0.14 196)' }}
                    />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Timeline ──────────────────────────────────────── */}
      <SectionWrapper variant="dark" className="flex flex-col">
        <MaxWidthWrapper className="py-20 md:py-28">
          <SectionHeader
            eyebrow="The Journey"
            heading="From First Project to Now"
            accentWord="Journey"
            align="left"
            className="mb-14"
          />

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div
              className="absolute left-4.75 top-0 bottom-0 w-px hidden sm:block"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 0%, oklch(0.78 0.14 196 / 0.3) 10%, oklch(0.78 0.14 196 / 0.3) 90%, transparent 100%)',
              }}
            />

            {timeline.map((event, i) => (
              <div
                key={i}
                className="relative flex gap-8 pb-10 last:pb-0 group"
              >
                {/* Dot */}
                <div className="relative shrink-0 hidden sm:flex flex-col items-center">
                  <div
                    className="size-10 rounded-full flex items-center justify-center z-10 transition-all duration-300"
                    style={{
                      backgroundColor: event.highlight
                        ? 'oklch(0.78 0.14 196)'
                        : 'oklch(0.97 0.005 196 / 0.06)',
                      border: event.highlight
                        ? '2px solid oklch(0.78 0.14 196)'
                        : '1px solid oklch(0.97 0.005 196 / 0.15)',
                    }}
                  >
                    <span
                      className="text-[10px] font-black font-mono"
                      style={{
                        color: event.highlight
                          ? 'oklch(0.13 0.025 196)'
                          : 'oklch(0.97 0.005 196 / 0.5)',
                      }}
                    >
                      {String(event.year).slice(2)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 pt-1.5 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-xs font-black font-mono tracking-widest sm:hidden"
                      style={{ color: 'oklch(0.78 0.14 196 / 0.6)' }}
                    >
                      {event.year}
                    </span>
                    <span
                      className="text-xs font-black font-mono tracking-widest"
                      style={{ color: 'oklch(0.78 0.14 196 / 0.6)' }}
                    >
                      {event.year}
                    </span>
                    {event.highlight && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'oklch(0.78 0.14 196 / 0.15)',
                          color: 'oklch(0.78 0.14 196)',
                        }}
                      >
                        Milestone
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg font-bold font-serif"
                    style={{ color: 'var(--dark-fg)' }}
                  >
                    {event.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'oklch(0.97 0.005 196 / 0.5)' }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── CTA ───────────────────────────────────────────── */}
      <SectionWrapper variant="dark" className="flex flex-col">
        <MaxWidthWrapper>
          <CTABanner
            variant="dark"
            heading="Ready to work together?"
            body="Let's have a conversation about your project. No pitch, no pressure — just an honest chat."
            buttonLabel="Get in Touch"
            buttonHref="/contact"
            className='my-12'
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}