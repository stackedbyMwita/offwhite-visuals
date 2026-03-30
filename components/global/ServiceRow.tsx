'use client'

import { IService } from '@/types'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { ServiceHoverCard } from '../cards'

interface ServiceRowProps {
  service: IService
  index: number
}

const ROW_HEIGHT = 128 // px — fixed, no layout shift ever

export default function ServiceRow({ service, index }: ServiceRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!rowRef.current) return
      const rect = rowRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      // Overflow visible so the hover card can escape the row bounds
      style={{ overflow: 'visible' }}
    >
      {/* Hover card — positioned relative to row */}
      <ServiceHoverCard
        imageSrc={service.heroImage}
        imageAlt={service.title}
        mouseX={mouseX}
        mouseY={mouseY}
        isVisible={isHovered}
      />

      <Link href={`/services/${service.slug}`} className="block">
        <motion.div
          className="relative flex items-center justify-between gap-6 cursor-none"
          style={{ height: ROW_HEIGHT }}
          initial={false}
          animate={isHovered ? 'hovered' : 'idle'}
        >

          {/* ── Left — index + title ───────────────────── */}
          <div className="flex items-center gap-6 md:gap-10 min-w-0">

            {/* Index */}
            {/* <motion.span
              variants={{
                idle: { opacity: 0.2, x: 0 },
                hovered: { opacity: 1, x: 0, color: '#06b6d4' },
              }}
              transition={{ duration: 0.22 }}
              className="hidden sm:block text-sm font-bold tracking-widest tabular-nums w-8 shrink-0"
              style={{ color: 'var(--dark-fg)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span> */}

            {/* Title — shifts slightly on hover, never wraps */}
            <motion.h3
              variants={{
                idle: { x: 0 },
                hovered: { x: 0, color: '#06b6d4'  },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight leading-none whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: 'var(--dark-fg)' }}
            >
              {service.title}
            </motion.h3>
          </div>

          {/* ── Right — feature list replaces "Explore" ── */}
          {/*
            Fixed width container so layout never shifts.
            On idle: shows "Explore" label + arrow.
            On hover: shows first 3 features as subtle column list + arrow.
            Both states occupy the same space.
          */}
          <div className="flex items-center gap-6 shrink-0">

            {/* Text area — fixed width, switches content */}
            <div className="hidden md:block w-48 text-right overflow-hidden">
              <AnimatePresence mode="wait">
                {isHovered ? (
                  // Feature list
                  <motion.ul
                    key="features"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-1.5 items-end"
                  >
                    {service.features.slice(0, 3).map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="text-[11px] tracking-wide"
                        style={{ color: 'oklch(0.97 0.005 196 / 0.45)' }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  // Explore label
                  <motion.span
                    key="explore"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="text-sm font-medium tracking-wide"
                    style={{ color: 'oklch(0.97 0.005 196 / 0.3)' }}
                  >
                    Explore
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Arrow button — rotates on hover */}
            <motion.div
              variants={{
                idle: {
                  rotate: 0,
                  backgroundColor: 'oklch(0.97 0.005 196 / 0.05)',
                  borderColor: 'oklch(0.97 0.005 196 / 0.08)',
                },
                hovered: {
                  rotate: 45,
                  backgroundColor: 'oklch(0.78 0.14 196 / 0.12)',
                  borderColor: 'oklch(0.78 0.14 196 / 0.35)',
                },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex items-center justify-center size-12 md:size-14 rounded-full border shrink-0"
            >
              <ArrowUpRight
                size={20}
                style={{
                  color: isHovered
                    ? '#06b6d4'
                    : 'oklch(0.97 0.005 196 / 0.4)',
                  transition: 'color 0.2s',
                }}
              />
            </motion.div>
          </div>

          {/* Row background wash — never affects height */}
          <motion.div
            className="absolute inset-0 rounded-fluid pointer-events-none -mx-4"
            variants={{
              idle: { opacity: 0 },
              hovered: { opacity: 1 },
            }}
            transition={{ duration: 0.22 }}
            style={{
              background:
                'linear-gradient(90deg, oklch(0.78 0.14 196 / 0.05) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </Link>

      {/* Divider */}
      <motion.div
        className="h-px w-full"
        animate={
          isHovered
            ? {
                background:
                  'linear-gradient(90deg, #06b6d4 0%, oklch(0.97 0.005 196 / 0.04) 60%)',
                opacity: 0.35,
              }
            : {
                background:
                  'linear-gradient(90deg, oklch(0.97 0.005 196 / 0.08) 0%, oklch(0.97 0.005 196 / 0.02) 100%)',
                opacity: 1,
              }
        }
        transition={{ duration: 0.28 }}
      />
    </div>
  )
}