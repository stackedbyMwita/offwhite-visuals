'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// ── Deterministic particle positions ────────────────────────
// No Math.random() in render — pre-computed to avoid hydration mismatch
const PARTICLES = [
  { left: '80%', top: '72%', dx: 32,  dy: -28 },
  { left: '45%', top: '8%',  dx: -20, dy: 36  },
  { left: '12%', top: '55%', dx: 40,  dy: 16  },
  { left: '70%', top: '20%', dx: -36, dy: -20 },
  { left: '25%', top: '80%', dx: 24,  dy: -40 },
  { left: '58%', top: '45%', dx: -28, dy: 32  },
]

export default function InteractiveZap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const zapRef      = useRef<HTMLDivElement>(null)

  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // ── Mouse tracking ───────────────────────────────────────
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mouseX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.6 })
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.6 })

  // ── 3D tilt ──────────────────────────────────────────────
  const rotateX = useTransform(mouseY, [-300, 300], [12, -12])
  const rotateY = useTransform(mouseX, [-300, 300], [-12, 12])

  // ── Proximity — drives glow + ring intensity ─────────────
  const proximity = useTransform(
    [mouseX, mouseY] as const,
    ([x, y]: number[]) => {
      const dist = Math.sqrt(x ** 2 + y ** 2)
      return Math.max(0.1, Math.min(1, 1 - dist / 420))
    }
  )

  const coreGlowOpacity = useTransform(proximity, [0.1, 1], [0.2, 0.9])
  const outerGlowOpacity = useTransform(proximity, [0, 1], [0.06, 0.3])
  const ringScale       = useTransform(proximity, [0.1, 1], [0.85, 1.25])
  const outerRingOpacity = useTransform(proximity, [0.2, 1], [0.3, 0.75])
  const midRingOpacity  = useTransform(proximity, [0.3, 1], [0.25, 0.85])
  const innerCoreOpacity = useTransform(proximity, [0.4, 1], [0.25, 0.85])
  const arcOpacity      = useTransform(proximity, [0.3, 1], [0.4, 1])

  // ── Global mouse move ────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      rawX.set(e.clientX - (rect.left + rect.width  / 2))
      rawY.set(e.clientY - (rect.top  + rect.height / 2))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  // ── GSAP hover glow ──────────────────────────────────────
  useEffect(() => {
    if (!zapRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(zapRef.current, {
        scale:  isHovered ? 1.08 : 1,
        filter: isHovered
          ? 'drop-shadow(0 0 60px var(--color-primary))'
          : 'drop-shadow(0 0 0px transparent)',
        duration: isHovered ? 0.6 : 0.8,
        ease: isHovered ? 'power2.out' : 'power2.inOut',
      })
    })
    return () => ctx.revert()
  }, [isHovered])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center rounded-full overflow-hidden perspective-midrange select-none
        size-48 sm:size-64 md:size-80 lg:size-96 xl:size-104
        mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >

      {/* ── Energy field ───────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: coreGlowOpacity,
          background: 'radial-gradient(circle at 50% 50%, oklch(0.78 0.14 196 / 0.22) 0%, transparent 65%)',
        }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: '-40%',
          scale: ringScale,
          opacity: outerGlowOpacity,
          background: 'radial-gradient(circle, oklch(0.78 0.14 196 / 0.15) 10%, transparent 70%)',
        }}
      />

      {/* ── Scanline texture ────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 3px, oklch(0.78 0.14 196 / 0.025) 3px, oklch(0.78 0.14 196 / 0.025) 4px)',
        }}
      />

      {/* ── 3D tilt container ───────────────────────────── */}
      <motion.div
        ref={zapRef}
        className="relative z-10 flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ scale: isPressed ? 0.92 : isHovered ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >

        {/* Outer rotating ring */}
        <motion.div
          className="absolute -inset-15 rounded-full border"
          style={{
            borderColor: 'oklch(0.78 0.14 196 / 0.28)',
            scale: useTransform(proximity, [0.2, 1], [0.6, 1.4]),
            opacity: outerRingOpacity,
            filter: 'blur(3px)',
          }}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner rotating ring — counter-clockwise */}
        <motion.div
          className="absolute -inset-8.75 rounded-full border"
          style={{
            borderColor: 'oklch(0.78 0.14 196 / 0.42)',
            opacity: midRingOpacity,
            filter: 'blur(2px)',
          }}
          animate={{ rotate: isHovered ? -240 : 0 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* ── Icon stack ──────────────────────────────── */}
        <div className="relative">

          {/* Outer dim icon — structural silhouette */}
          <motion.div
            className="relative z-20"
            animate={{
              filter: isHovered
                ? 'drop-shadow(0 25px 60px oklch(0.78 0.14 196 / 0.8)) brightness(1.15)'
                : 'none',
            }}
            transition={{ duration: 0.4 }}
          >
            <Zap
              size={168}
              strokeWidth={1.1}
              style={{
                color: isHovered
                  ? 'oklch(0.90 0.12 196)'
                  : 'oklch(0.97 0.005 196 / 0.08)',
                transition: 'color 0.3s',
              }}
            />
          </motion.div>
        </div>

        {/* ── Electric arcs (hover only) ──────────────── */}
        {isHovered && (
          <motion.svg
            className="absolute inset-0 w-full h-full z-40 pointer-events-none overflow-visible"
            viewBox="0 0 400 400"
            style={{ opacity: arcOpacity }}
          >
            {/* Primary arc */}
            <motion.path
              d="M 120 140 Q 180 80 240 160 Q 300 90 320 190"
              fill="none"
              stroke="oklch(0.85 0.18 196)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.85, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
            />

            {/* Secondary arc — faster */}
            <motion.path
              d="M 130 180 Q 210 110 260 200 Q 310 130 340 210"
              fill="none"
              stroke="oklch(0.92 0.14 196)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.65, 0] }}
              transition={{ duration: 0.45, repeat: Infinity, repeatDelay: 0.3, ease: 'easeInOut' }}
            />
          </motion.svg>
        )}

        {/* ── Sparkle particles (hover only) ──────────── */}
        {isHovered && PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute size-1 rounded-full pointer-events-none"
            style={{
              left: p.left,
              top:  p.top,
              backgroundColor: 'oklch(0.97 0.005 196)',
              boxShadow: '0 0 8px oklch(0.78 0.14 196)',
            }}
            animate={{
              scale:   [0, 1.4, 0],
              opacity: [0, 0.9, 0],
              x: [0, p.dx],
              y: [0, p.dy],
            }}
            transition={{
              duration: 1.2 + i * 0.1,
              repeat: Infinity,
              delay:  i * 0.1,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}