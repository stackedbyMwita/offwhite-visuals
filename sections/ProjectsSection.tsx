'use client'

import { ProjectCard } from '@/components/global'
import CTABanner from '@/components/global/CTABanner'
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout'
import { SectionHeader } from '@/components/shared'
import CustomButton from '@/components/ui/CustomButton'
import { projects } from '@/data'
import { motion } from 'framer-motion'
import { useState } from 'react'

// All unique categories derived from data
const ALL = 'All'
const categories = [ ALL, ...Array.from(new Set(projects.flatMap((p) => p.category))) ]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered =
    activeCategory === ALL
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory))

  return (
    <SectionWrapper
      variant="light"
      id="projects"
      className="flex flex-col"
    >
      <MaxWidthWrapper className="flex flex-col pt-24 md:pt-32 pb-24 md:pb-32">

        {/* ── Header row ────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <SectionHeader
            eyebrow="Our Projects"
            heading="Discover Our Selected Work"
            accentWord="Work"
            description="A curated look at projects we are proud of — each one a story of collaboration, craft, and impact."
            align="left"
            headingClassName="max-w-md"
          />

          <CustomButton
            label="View All Projects"
            href="/projects"
            variant="secondary"
            className='w-fit'
          />
        </div>

        {/* ── Category filter tabs ───────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.96 }}
                className="relative px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-colors duration-200 outline-none"
                style={{
                  color: isActive
                    ? 'oklch(0.13 0.025 196)'
                    : 'oklch(0.50 0.02 196)',
                  backgroundColor: isActive
                    ? 'oklch(0.78 0.14 196)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid oklch(0.78 0.14 196)'
                    : '1px solid oklch(0.90 0.01 196)',
                }}
              >
                {cat}

                {/* Count badge */}
                <span
                  className="ml-2 text-[10px] font-mono tabular-nums"
                  style={{
                    opacity: isActive ? 0.7 : 0.4,
                  }}
                >
                  {cat === ALL
                    ? projects.length
                    : projects.filter((p) =>
                        p.category.includes(cat)
                      ).length}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ── Projects grid ─────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
        >
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.28,
                delay: index * 0.06,
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Empty state ───────────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <span className="text-5xl">🔍</span>
            <p className="text-muted-foreground text-sm">
              No projects in this category yet.
            </p>
          </motion.div>
        )}

        {/* ── Bottom CTA strip ──────────────────────────── */}
        <CTABanner
          variant="light"
          heading="Have a project in mind?"
          body="We would love to hear about it. Let's make something great together."
          buttonLabel="Start a Project"
          buttonHref="/contact"
          className="mt-12"
        />
      </MaxWidthWrapper>
    </SectionWrapper>
  )
}