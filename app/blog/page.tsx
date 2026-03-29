'use client'

import { BlogCard } from '@/components/cards'
import { CTABanner, PageHeader } from '@/components/global'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import {
  allCategories,
  blogPosts,
  featuredPosts,
} from '@/data/blog.data'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const ALL = 'All'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered =
    activeCategory === ALL
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const categories = [ALL, ...allCategories]

  return (
    <>
      {/* ── Page header ───────────────────────────────────── */}
      <PageHeader
        eyebrow="The Blog"
        heading="Thoughts on Design, Code & Craft"
        accentWord="Craft"
        description="Writing about the work — process, decisions, lessons, and the occasional opinion."
        align="left"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
            }}
          >
            <span
              className="text-xl font-black font-mono tabular-nums"
              style={{ color: 'oklch(0.78 0.14 196)' }}
            >
              {String(blogPosts.length).padStart(2, '0')}
            </span>
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ color: 'oklch(0.97 0.005 196 / 0.4)' }}
            >
              Articles
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
            }}
          >
            <span
              className="text-xl font-black font-mono tabular-nums"
              style={{ color: 'oklch(0.78 0.14 196)' }}
            >
              {String(allCategories.length).padStart(2, '0')}
            </span>
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ color: 'oklch(0.97 0.005 196 / 0.4)' }}
            >
              Topics
            </span>
          </div>
        </div>
      </PageHeader>

      {/* ── Featured posts ────────────────────────────────── */}
      {featuredPosts.length > 0 && (
        <SectionWrapper variant="light" className="flex flex-col pb-0">
          <MaxWidthWrapper className="pt-20 pb-12">
            <div className="flex items-center gap-3 mb-10">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                Featured
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            {/* Featured hero — first featured post large, rest small */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Large card */}
              <div className="lg:row-span-2">
                <BlogCard post={featuredPosts[0]} variant="large" />
              </div>

              {/* Smaller featured cards */}
              <div className="flex flex-col gap-6">
                {featuredPosts.slice(1, 3).map((post) => (
                  <BlogCard key={post.slug} post={post} variant="compact" />
                ))}
              </div>
            </div>
          </MaxWidthWrapper>
        </SectionWrapper>
      )}

      {/* ── All posts with filter ─────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="flex flex-col gap-8 pb-28">

          {/* Filter + result count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat
                const count =
                  cat === ALL
                    ? blogPosts.length
                    : blogPosts.filter((p) => p.category === cat).length

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
                      {count}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            <span className="text-xs text-muted-foreground shrink-0">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <BlogCard post={post} variant="default" />
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
              <span className="text-5xl">✍️</span>
              <p className="text-muted-foreground text-sm">
                Nothing in this category yet — check back soon.
              </p>
            </motion.div>
          )}

          {/* CTA */}
          <div className="mt-8">
            <CTABanner
              variant="light"
              heading="Want to be notified of new posts?"
              body="Follow along on Twitter or LinkedIn — that's where new articles are announced first."
              buttonLabel="Follow on Twitter"
              buttonHref="https://twitter.com/offwhitevisuals"
            />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}