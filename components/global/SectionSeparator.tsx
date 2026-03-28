'use client'

import { motion } from 'framer-motion'

interface SectionSeparatorProps {
  variant?: 'wave' | 'zigzag' | 'dots'
}

export default function SectionSeparator({ variant = 'wave' }: SectionSeparatorProps) {

  if (variant === 'zigzag') {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 32,
          backgroundColor: 'var(--background)',
        }}
      >
        <motion.svg
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.polyline
            points="0,16 60,4 120,28 180,4 240,28 300,4 360,28 420,4 480,28 540,4 600,28 660,4 720,28 780,4 840,28 900,4 960,28 1020,4 1080,28 1140,4 1200,28 1260,4 1320,28 1380,4 1440,28"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.svg>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div
        className="relative w-full flex items-center justify-center py-4 overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <motion.div
          className="flex items-center gap-0"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
        >
          {/* Left fade line */}
          <div
            className="h-px w-32 md:w-64"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, oklch(0.78 0.14 196 / 0.3) 100%)',
            }}
          />

          {/* Dot cluster */}
          <div className="flex items-center gap-1.5 px-4">
            {[0.3, 0.6, 1, 0.6, 0.3].map((opacity, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  background: `oklch(0.78 0.14 196 / ${opacity})`,
                  width: i === 2 ? 8 : i === 1 || i === 3 ? 5 : 3,
                  height: i === 2 ? 8 : i === 1 || i === 3 ? 5 : 3,
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Right fade line */}
          <div
            className="h-px w-32 md:w-64"
            style={{
              background:
                'linear-gradient(90deg, oklch(0.78 0.14 196 / 0.3) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>
    )
  }

  // Default — wave
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 40,
        backgroundColor: 'var(--background)',
      }}
    >
      <motion.svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Wave 1 — main */}
        <motion.path
          d="M0,20 C180,40 360,0 540,20 C720,40 900,0 1080,20 C1260,40 1380,10 1440,20"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          initial={{ pathLength: 0, pathOffset: 1 }}
          whileInView={{ pathLength: 1, pathOffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Wave 2 — offset, thinner, more transparent */}
        <motion.path
          d="M0,20 C180,40 360,0 540,20 C720,40 900,0 1080,20 C1260,40 1380,10 1440,20"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.75"
          strokeOpacity="0.2"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, pathOffset: 1 }}
          whileInView={{ pathLength: 1, pathOffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />

        {/* Traveling dot along wave */}
        <motion.circle
          r="3"
          fill="#06b6d4"
          fillOpacity="0.8"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          whileInView={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            offsetPath:
              "path('M0,20 C180,40 360,0 540,20 C720,40 900,0 1080,20 C1260,40 1380,10 1440,20')",
          } as React.CSSProperties}
        />
      </motion.svg>
    </div>
  )
}