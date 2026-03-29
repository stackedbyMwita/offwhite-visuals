'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function InteractiveZap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const zapRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Mouse tracking with ultra-smooth springs
  const mouseX = useSpring(0, { stiffness: 120, damping: 18, mass: 0.6 })
  const mouseY = useSpring(0, { stiffness: 120, damping: 18, mass: 0.6 })

  // Tilt values
  const rotateX = useTransform(mouseY, [-300, 300], [12, -12])
  const rotateY = useTransform(mouseX, [-300, 300], [-12, 12])

  // Dynamic glow intensity based on mouse proximity
  const proximity = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const dist = Math.sqrt((x as number) ** 2 + (y as number) ** 2)
      return Math.max(0.1, Math.min(1, 1 - dist / 420))
    }
  )

  const coreGlowOpacity = useTransform(proximity, [0.1, 1], [0.25, 0.95])
  const ringScale = useTransform(proximity, [0.1, 1], [0.85, 1.25])

  // Electric arc animation values
  const arcProgress = useMotionValue(0)

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // GSAP spark + charge effect on hover
  useEffect(() => {
    if (!zapRef.current) return

    let ctx = gsap.context(() => {
      if (isHovered) {
        gsap.to(zapRef.current, {
          scale: 1.08,
          filter: 'drop-shadow(0 0 60px oklch(0.78 0.14 196 / 0.9))',
          duration: 0.6,
          ease: 'power2.out'
        })
      } else {
        gsap.to(zapRef.current, {
          scale: 1,
          filter: 'drop-shadow(0 0 0px transparent)',
          duration: 0.8,
          ease: 'power2.inOut'
        })
      }
    })

    return () => ctx.revert()
  }, [isHovered])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full min-h-104 rounded-full overflow-hidden perspective-midrange"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* === ENERGY FIELD BACKGROUND === */}
      <motion.div
        style={{ opacity: coreGlowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.78_0.14_196/0.25)_0%,transparent_65%)] pointer-events-none"
      />

      {/* Secondary larger soft glow */}
      <motion.div
        style={{ scale: ringScale, opacity: useTransform(proximity, [0, 1], [0.08, 0.35]) }}
        className="absolute inset-[-40%] bg-[radial-gradient(circle,oklch(0.78_0.14_196/0.18)_10%,transparent_70%)] pointer-events-none"
      />

      {/* === MAIN ZAP CONTAINER WITH 3D TILT === */}
      <motion.div
        ref={zapRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isPressed ? 0.92 : isHovered ? 1.12 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Outer Energy Ring */}
        <motion.div
          className="absolute inset-[-60px] border border-[oklch(0.78_0.14_196/0.3)] rounded-full"
          style={{
            scale: useTransform(proximity, [0.2, 1], [0.6, 1.4]),
            opacity: useTransform(proximity, [0.2, 1], [0.4, 0.8]),
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Mid Energy Ring (faster) */}
        <motion.div
          className="absolute inset-[-35px] border border-[oklch(0.78_0.14_196/0.45)] rounded-full"
          animate={{
            rotate: isHovered ? -240 : 0,
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: useTransform(proximity, [0.3, 1], [0.3, 0.9]) }}
        />

        {/* The Zap Icon Core */}
        <div className="relative">
          <motion.div
            animate={{
              filter: isHovered
                ? 'drop-shadow(0 25px 60px oklch(0.78 0.14 196 / 0.85)) brightness(1.15)'
                : 'drop-shadow(0 0 0px transparent)',
            }}
            className="relative z-20"
          >
            <Zap
              size={168}
              strokeWidth={1.1}
              className={`transition-all duration-300 ${
                isHovered 
                  ? 'text-[oklch(0.92_0.12_196)] drop-shadow-[0_0_30px_oklch(0.78_0.14_196)]' 
                  : 'text-white/10'
              }`}
            />
          </motion.div>

          {/* Inner Bright Core */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            style={{ opacity: useTransform(proximity, [0.4, 1], [0.3, 0.85]) }}
          >
            <Zap
              size={92}
              strokeWidth={3}
              className="text-white drop-shadow-[0_0_25px_oklch(0.95_0.15_196)]"
            />
          </motion.div>
        </div>

        {/* === ELECTRIC ARC OVERLAY === */}
        {isHovered && (
          <motion.svg
            className="absolute inset-0 w-full h-full z-40 pointer-events-none"
            viewBox="0 0 400 400"
            style={{ opacity: proximity }}
          >
            {/* Primary Arc */}
            <motion.path
              d="M 120 140 Q 180 80 240 160 Q 300 90 320 190"
              fill="none"
              stroke="oklch(0.85 0.18 196)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 0.6,
                ease: 'easeInOut',
              }}
            />

            {/* Secondary Faster Arc */}
            <motion.path
              d="M 130 180 Q 210 110 260 200 Q 310 130 340 210"
              fill="none"
              stroke="oklch(0.92 0.14 196)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 0.45,
                repeat: Infinity,
                repeatDelay: 0.3,
                ease: 'easeInOut',
              }}
            />
          </motion.svg>
        )}

        {/* Sparkle Particles */}
        {isHovered && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_12px_oklch(0.95_0.2_196)]"
                style={{
                  left: `${45 + Math.sin(i) * 35}%`,
                  top: `${40 + Math.cos(i * 1.3) * 32}%`,
                }}
                animate={{
                  scale: [0, 1.4, 0],
                  opacity: [0, 0.9, 0],
                  x: [0, (Math.random() - 0.5) * 80],
                  y: [0, (Math.random() - 0.5) * 80],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Subtle scanline / energy texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0px,transparent_3px,oklch(0.78_0.14_196/0.03)_3px,oklch(0.78_0.14_196/0.03)_4px)] pointer-events-none" />
    </div>
  )
}