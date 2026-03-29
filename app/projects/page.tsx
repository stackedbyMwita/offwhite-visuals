'use client'

import { PageHeader } from '@/components/global'
import ProjectCard from '@/components/global/ProjectCard'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import CustomButton from '@/components/ui/CustomButton'
import { projects, projectsPage } from '@/data'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

// ── All unique categories from data ──────────────────────────
const ALL = 'All'
const categories = [
  ALL,
  ...Array.from(new Set(projects.flatMap((p) => p.category))),
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered =
    activeCategory === ALL
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory))

  const featured = projects.filter((p) => p.featured)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <PageHeader
        eyebrow="Our Work"
        heading={projectsPage.headline}
        accentWord="Selected"
        description={projectsPage.description}
      >
        {/* Stats row */}
        <div className="flex items-center gap-6">
          {[
            { value: projects.length,        label: 'Projects'   },
            { value: featured.length,        label: 'Featured'   },
            { value: categories.length - 1,  label: 'Categories' },
          ].map((stat, i, arr) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="flex flex-col gap-0.5">
                <span
                  className="text-3xl font-black font-mono tabular-nums"
                  style={{ color: 'oklch(0.78 0.14 196)' }}
                >
                  {String(stat.value).padStart(2, '0')}
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: 'oklch(0.97 0.005 196 / 0.4)' }}
                >
                  {stat.label}
                </span>
              </div>

              {/* Divider — not after last item */}
              {i < arr.length - 1 && (
                <div
                  className="w-px h-10"
                  style={{ backgroundColor: 'oklch(0.97 0.005 196 / 0.12)' }}
                />
              )}
            </div>
          ))}
        </div>
      </PageHeader>

      {/* ── Featured projects ─────────────────────────────── */}
      {featured.length > 0 && (
        <SectionWrapper variant="light" className="flex flex-col">
          <MaxWidthWrapper className="flex flex-col gap-8 py-16">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary"
              >
                Featured
              </span>
              <div
                className="h-px flex-1"
                style={{ backgroundColor: 'var(--border)' }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </MaxWidthWrapper>
        </SectionWrapper>
      )}

      {/* ── All projects with filter ───────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="flex flex-col gap-8 pb-28">

          {/* Filter row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 outline-none"
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
                    <span
                      className="ml-2 text-[10px] font-mono tabular-nums"
                      style={{ opacity: isActive ? 0.7 : 0.4 }}
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

            {/* Result count */}
            <span className="text-xs text-muted-foreground shrink-0">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
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

          {/* Bottom CTA */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 md:px-12 py-8 rounded-3xl border border-border/40 bg-secondary/40 mt-8"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-xl md:text-2xl font-bold font-serif text-foreground">
                Have a project in mind?
              </span>
              <span className="text-sm text-muted-foreground">
                We would love to hear about it. Let's make something great together.
              </span>
            </div>
            <CustomButton
              label="Start a Project"
              href="/contact"
              className="shrink-0"
            />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}