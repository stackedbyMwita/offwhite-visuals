'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, MessageCircle } from 'lucide-react'
import CustomButton from '@/components/ui/CustomButton'
import { siteConfig } from '@/data/site.config'

// ── Floating particle
function Particle({ delay, x, y, size, opacity }: {
  delay: number
  x: string
  y: string
  size: number
  opacity: number  // pre-computed, passed as prop
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `oklch(0.78 0.14 196 / ${opacity})`,
      }}
      animate={{
        y: [0, -24, 0],
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3 + delay, // deterministic — uses delay instead of Math.random()
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

// ── Glitching 404 digit
function GlitchDigit({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      className="relative inline-block font-black font-serif select-none"
      style={{
        fontSize: 'clamp(120px, 22vw, 220px)',
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '2px oklch(0.78 0.14 196 / 0.4)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 40,
      }}
    >
      {/* Ghost layer — cyan fill, offset */}
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          color: 'oklch(0.78 0.14 196)',
          opacity: 0.12,
          transform: 'translate(4px, -4px)',
          WebkitTextStroke: '0px',
        }}
        aria-hidden
      >
        {char}
      </span>

      {/* Main stroke */}
      {char}
    </motion.span>
  )
}

// ── Animated scan line ───────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, oklch(0.78 0.14 196 / 0.6) 50%, transparent 100%)',
      }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// ── Main page────────
export default function NotFound() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-redirect after 15 seconds
  useEffect(() => {
    const t = setTimeout(() => router.push('/'), 15000)
    return () => clearTimeout(t)
  }, [router])

  const PARTICLES = [
    { delay: 0,   x: '8%',  y: '20%', size: 6, opacity: 0.08 },
    { delay: 0.4, x: '15%', y: '70%', size: 4, opacity: 0.12 },
    { delay: 0.8, x: '80%', y: '15%', size: 8, opacity: 0.06 },
    { delay: 1.2, x: '88%', y: '65%', size: 5, opacity: 0.10 },
    { delay: 0.6, x: '50%', y: '85%', size: 4, opacity: 0.09 },
    { delay: 1.6, x: '30%', y: '12%', size: 6, opacity: 0.07 },
    { delay: 0.2, x: '70%', y: '80%', size: 3, opacity: 0.11 },
    { delay: 1.0, x: '92%', y: '40%', size: 7, opacity: 0.08 },
    { delay: 1.4, x: '5%',  y: '50%', size: 4, opacity: 0.10 },
    { delay: 0.3, x: '60%', y: '8%',  size: 5, opacity: 0.09 },
  ]

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--dark-fg)' }}
    >

      {/* ── Background glows ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: 600,
            height: 600,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'oklch(0.78 0.14 196 / 0.06)',
          }}
        />
        <div
          className="absolute rounded-full blur-[80px]"
          style={{
            width: 300,
            height: 300,
            top: '20%',
            right: '10%',
            background: 'oklch(0.78 0.14 196 / 0.04)',
          }}
        />
      </div>

      {/* ── Floating particles ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {PARTICLES.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* ── Scan line ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <ScanLine />
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="h-px w-8 bg-primary/50" />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: 'oklch(0.78 0.14 196 / 0.7)' }}
          >
            Error 404
          </span>
          <span className="h-px w-8 bg-primary/50" />
        </motion.div>

        {/* 404 numerals */}
        <div className="flex items-center gap-2 md:gap-4 mb-8 relative">
          <GlitchDigit char="4" delay={0.2} />

          {/* Center O — filled cyan */}
          <motion.span
            className="relative font-black font-serif select-none"
            style={{
              fontSize: 'clamp(120px, 22vw, 220px)',
              lineHeight: 1,
              color: 'oklch(0.78 0.14 196)',
            }}
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.35,
              type: 'spring',
              stiffness: 180,
              damping: 30,
            }}
          >
            0
          </motion.span>

          <GlitchDigit char="4" delay={0.5} />
        </div>

        {/* Heading */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold font-serif mb-4 leading-tight"
          style={{ color: 'var(--dark-fg)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 60 }}
        >
          This page doesn't exist
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base leading-relaxed mb-10 max-w-md"
          style={{ color: 'oklch(0.97 0.005 196 / 0.45)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 60 }}
        >
          The page you're looking for may have been moved, renamed, or never
          existed. Let's get you back somewhere useful.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 60 }}
        >
          <CustomButton
            label="Go Home"
            href="/"
            icon={Home}
            variant="primary"
          />
          <CustomButton
            label="Go Back"
            icon={ArrowLeft}
            iconPosition="left"
            variant="secondary"
            onClick={() => router.back()}
          />
          <CustomButton
            label="Chat with Us"
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, '')}`}
            icon={MessageCircle}
            variant="outline"
          />
        </motion.div>

        {/* Auto-redirect notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Progress bar */}
          <div
            className="h-px rounded-full overflow-hidden"
            style={{
              width: 160,
              backgroundColor: 'oklch(0.97 0.005 196 / 0.1)',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.5)' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 15, ease: 'linear' }}
            />
          </div>

          <p
            className="text-[11px] tracking-wide"
            style={{ color: 'oklch(0.97 0.005 196 / 0.25)' }}
          >
            Redirecting to home in 15 seconds
          </p>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10"
        >
          {[
            { label: 'Services', href: '/services' },
            { label: 'Projects', href: '/projects' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium transition-colors duration-200 hover:text-primary"
              style={{ color: 'oklch(0.97 0.005 196 / 0.35)' }}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom brand mark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link
          href="/"
          className="text-xs font-bold font-mono tracking-widest transition-colors duration-200 hover:text-primary"
          style={{ color: 'oklch(0.97 0.005 196 / 0.2)' }}
        >
          {siteConfig.name.toUpperCase()}
        </Link>
      </motion.div>
    </div>
  )
}
