"use client"

import { IServiceProcess } from '@/types'
import { motion } from 'framer-motion'

interface ServiceProcessStepProps {
  step: IServiceProcess
  index: number
  variant?: 'dark' | 'light'
}

export default function ServiceProcessStep({
  step,
  index,
  variant = 'dark',
}: ServiceProcessStepProps) {
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.1,
        type: 'spring',
        stiffness: 260,
        damping: 60,
      }}
      className="relative flex flex-col gap-4 p-6 rounded-fluid border transition-all duration-500 group"
      style={{
        borderColor: isDark
          ? 'oklch(0.97 0.005 196 / 0.08)'
          : 'var(--border)',
        backgroundColor: isDark
          ? 'oklch(0.97 0.005 196 / 0.03)'
          : 'var(--background)',
      }}
    >
      {/* Step number */}
      <div className="flex items-center gap-3">
        <div
          className="size-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.15)' }}
        >
          <span
            className="text-xs font-black font-mono"
            style={{ color: 'oklch(0.78 0.14 196)' }}
          >
            {String(step.step).padStart(2, '0')}
          </span>
        </div>

        {/* Connector line — hidden on last */}
        <div
          className="flex-1 h-px"
          style={{
            background: isDark
              ? 'oklch(0.97 0.005 196 / 0.06)'
              : 'var(--border)',
          }}
        />
      </div>

      <h3
        className="text-lg font-bold font-serif"
        style={{ color: isDark ? 'var(--dark-fg)' : 'var(--foreground)' }}
      >
        {step.title}
      </h3>

      <p
        className="text-sm leading-relaxed"
        style={{
          color: isDark
            ? 'oklch(0.97 0.005 196 / 0.5)'
            : 'var(--muted-foreground)',
        }}
      >
        {step.description}
      </p>
    </motion.div>
  )
}