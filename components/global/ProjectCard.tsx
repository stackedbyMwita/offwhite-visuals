'use client'

import { IProject } from '@/types'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  project: IProject
  index: number
}

const CARD_HEIGHT = 480 // px — fixed, no layout shift

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 260,
        damping: 60,
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div
          className="relative flex flex-col rounded-2xl border border-border/40 bg-background overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
          style={{ height: CARD_HEIGHT }}
        >

          {/* ── TOP — fixed height image ─────────────── */}
          <div className="relative w-full shrink-0" style={{ height: 220 }}>
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Arrow button */}
            <div className="absolute top-3 right-3 z-10">
              <div className="flex items-center justify-center size-9 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border/30 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-background">
                <ArrowUpRight
                  size={16}
                  className="text-foreground transition-all duration-300 group-hover:text-primary group-hover:rotate-45"
                />
              </div>
            </div>

            {/* Year badge */}
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className="text-[10px] font-bold font-mono tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm"
                style={{
                  background: 'rgba(0,0,0,0.50)',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {project.year}
              </span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute bottom-3 right-3 z-10">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: 'oklch(0.78 0.14 196 / 0.9)',
                    color: 'oklch(0.13 0.025 196)',
                  }}
                >
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* ── MIDDLE — fills remaining space ───────── */}
          <div className="flex-1 flex flex-col justify-between px-5 pt-4 pb-0 min-h-0">

            {/* Category tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.category.map((cat, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium tracking-wide px-2.5 py-0.5 rounded-full border"
                  style={{
                    borderColor: 'oklch(0.78 0.14 196 / 0.25)',
                    color: 'oklch(0.78 0.14 196)',
                    backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {project.title}
              </p>
              <ArrowUpRight
                size={16}
                className="shrink-0 mt-0.5 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </div>

            {/* Tagline */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {project.tagline}
            </p>
          </div>

          {/* ── BOTTOM — pinned footer ────────────────── */}
          <div
            className="shrink-0 flex items-center gap-4 px-5 py-3 border-t border-border/40 mt-3"
          >
            {project.outcomes.slice(0, 2).map((outcome, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span
                  className="text-sm font-black leading-none tabular-nums"
                  style={{ color: 'oklch(0.78 0.14 196)' }}
                >
                  {outcome.value}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground leading-tight">
                  {outcome.label}
                </span>
              </div>
            ))}

            {/* Client — pushed to the right */}
            <div className="ml-auto flex flex-col gap-0.5 text-right">
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                Client
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight">
                {project.client}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}