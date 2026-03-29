'use client'

import { Icons } from '@/components/global/Icons'
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout'
import { HeroStats } from '@/components/shared'
import CustomButton from '@/components/ui/CustomButton'
import { heroStats, siteConfig } from '@/data/site.config'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowBigDownDash, ChevronRight, Zap } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

// ── fade-up helper ───────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    delay,
    type: 'spring' as const,
    stiffness: 260,
    damping: 60,
    mass: 1,
  },
})

// ── tilted image (inlined so it shares the scroll ref) ───────
const springConfig = { damping: 30, stiffness: 100, mass: 2 }

function HeroImage({ onPlayClick, imageSrc }: { onPlayClick: () => void, imageSrc: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    rawRotateX.set((offsetY / (rect.height / 2)) * -5)
    rawRotateY.set((offsetX / (rect.width / 2)) * 5)
  }

  const handleMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className="perspective-midrange relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 60,
        mass: 1.2,
      }}
    >
      <motion.div
        className="transform-3d relative w-full"
        style={{ rotateX, rotateY }}
      >
        {/* Image */}
        <div className="relative w-full aspect-21/9 rounded-lg overflow-hidden shadow-2xl shadow-black/60">
          <Image
            src={imageSrc}
            alt="Offwhite Visuals — project showcase"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay — lightens on hover */}
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundColor: hovered ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.45)' }}
            transition={{ duration: 0.4 }}
          />

          {/* Dowbward arrow button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={onPlayClick}
              aria-label="Scroll to next section"
              className="group relative flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, 10, 0] }}
              transition={{
                y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Outer ring pulse */}
              <motion.span
                className="absolute rounded-full border border-primary/40"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                style={{ width: 88, height: 88 }}
              />

              {/* Button circle */}
              <span className="relative flex items-center justify-center size-20 rounded-full bg-primary/90 backdrop-blur-sm shadow-xl shadow-primary/30 group-hover:bg-primary transition-colors duration-300">
                <Zap
                  size={28}
                  fill="white"
                  className="text-white translate-x-0.5"
                />
              </span>
            </motion.button>
          </div>

          {/* Bottom reflection fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-from-dark-bg to-transparent" />
        </div>

        {/* Top edge highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      </motion.div>
    </motion.div>
  )
}

// ── main component ───────────────────────────────────────────
export default function HeroSection() {
  const nextSectionRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    // finds the element immediately after the hero section
    const hero = document.getElementById('hero')
    if (!hero) return
    const next = hero.nextElementSibling as HTMLElement | null
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <SectionWrapper
        variant="dark"
        id="hero"
        fullHeight
        className="flex flex-col"
      >
        <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-36 md:pt-44">

          {/* Founding pill */}
          <motion.div {...fadeUp(0.1)}>
            <a
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm hover:bg-primary/15 transition-colors duration-300"
            >
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-medium tracking-wide">
                Est. {siteConfig.founded} — {siteConfig.location}
              </span>
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </a>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.18)}
            className="text-center max-w-4xl"
          >
            We Craft{' '}
            <span className="text-gradient">Bold</span>
            <br className="hidden sm:block" />
            {' '}Digital{' '}
            <span className="relative inline-block">
              Experiences
              <Icons.underline
                className=' absolute inset-x-0 pointer-events-none -bottom-6 md:-bottom-8 text-accent'
              />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.26)}
            className="text-center text-base md:text-lg max-w-xl leading-relaxed px-4"
            style={{ color: 'var(--dark-fg)', opacity: 0.55 }}
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.34)}
            className="flex flex-wrap items-center justify-center gap-4 mt-2"
          >
            <CustomButton
              label="View Our Work"
              href="/projects"
            />
            <CustomButton
              label="Let's Talk"
              href="/contact"
              variant="secondary"
            />
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.42)} className="mt-2">
            <HeroStats stats={heroStats} />
          </motion.div>

          {/* Hero image */}
          <div className="w-full mt-10 md:mt-14">
            <HeroImage imageSrc="/assets/sections/hero-1.png" onPlayClick={scrollToNext} />
          </div>
        </MaxWidthWrapper>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-2 py-10"
        >
          <span
            className="text-[11px] uppercase tracking-[0.25em]"
            style={{ color: 'var(--dark-fg)', opacity: 0.3 }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-primary/50"
            onClick={() => scrollToNext()}
          >
            <ArrowBigDownDash />
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Invisible anchor for scrollToNext */}
      <div ref={nextSectionRef} />
    </>
  )
}