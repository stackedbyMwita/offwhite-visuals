'use client'

import { processSteps } from "@/data"
import { IProcessStep } from "@/types"
import { motion } from "framer-motion"

// ── Individual step card ─────────────────────────────────────
interface StepCardProps {
  step: IProcessStep
  index: number
}

function StepCard({ step, index }: StepCardProps) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.12,
        type: 'spring',
        stiffness: 260,
        damping: 60,
      }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Step number — floats above the icon ring */}
      <div className="relative mb-6">
        {/* Outer glow ring — expands on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          whileHover={{ scale: 1.15, opacity: 1 }}
          style={{
            background: 'radial-gradient(circle, oklch(0.78 0.14 196 / 0.12) 0%, transparent 70%)',
            opacity: 0.6,
            margin: '-12px',
          }}
        />

        {/* Icon circle */}
        <div
          className="relative size-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.15) 0%, oklch(0.78 0.14 196 / 0.05) 100%)',
            border: '1px solid oklch(0.78 0.14 196 / 0.2)',
            boxShadow: '0 0 0 0 oklch(0.78 0.14 196 / 0)',
          }}
        >
          <Icon
            size={28}
            strokeWidth={1.5}
            style={{ color: 'oklch(0.78 0.14 196)' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Step number badge — top right of icon */}
        <div
          className="absolute -top-1 -right-1 size-6 rounded-full flex items-center justify-center text-[10px] font-black font-mono"
          style={{
            background: 'oklch(0.78 0.14 196)',
            color: 'oklch(0.13 0.025 196)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-3 tracking-tight transition-colors duration-300"
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed max-w-50"
      >
        {step.description}
      </p>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────
export default function WorkProcess() {
  return (
    <div className="w-full py-12 md:py-16">
      <div className="relative">

        {/* ── Dotted connector line ──────────────────────
            Sits at the vertical center of the icon circles.
            Icon circle top = 0, icon height = 80px (size-20),
            so line sits at top: 40px from the grid top.
            Hidden on mobile/tablet where cards stack vertically.
        ──────────────────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 hidden lg:block pointer-events-none z-0"
          style={{ top: 40 }} // vertically centered on icon (80px / 2)
          aria-hidden="true"
        >
          {/* Full-width dotted line */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full h-px"
            style={{
              backgroundImage: `radial-gradient(circle, oklch(0.78 0.14 196 / 0.35) 1px, transparent 1px)`,
              backgroundSize: '12px 1px',
              backgroundRepeat: 'repeat-x',
            }}
          />

          {/* Moving dot that travels along the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 size-1.5 rounded-full"
            style={{ background: 'oklch(0.78 0.14 196)' }}
            initial={{ left: '0%', opacity: 0 }}
            whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 2.2,
              delay: 0.4,
              ease: 'linear',
            }}
          />
        </div>

        {/* ── Vertical connector for mobile/tablet ──────
            Shows between stacked cards on sm/md screens.
        ──────────────────────────────────────────────── */}
        <div
          className="absolute top-20 bottom-0 left-1/2 -translate-x-1/2 lg:hidden pointer-events-none z-0"
          aria-hidden="true"
          style={{ width: 1 }}
        >
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, oklch(0.78 0.14 196 / 0.35) 1px, transparent 1px)`,
              backgroundSize: '1px 12px',
              backgroundRepeat: 'repeat-y',
            }}
          />
        </div>

        {/* ── Cards grid ────────────────────────────────
            z-10 ensures cards sit above the connector line
            so the line disappears behind the icon circles.
        ──────────────────────────────────────────────── */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-6">
          {processSteps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}