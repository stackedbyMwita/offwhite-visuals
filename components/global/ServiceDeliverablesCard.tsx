"use client"

import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ServiceDeliverablesCardProps {
  deliverables: string[]
  variant?: 'dark' | 'light'
}

export default function ServiceDeliverablesCard({
  deliverables,
  variant = 'dark',
}: ServiceDeliverablesCardProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-2xl border"
      style={{
        borderColor: isDark
          ? 'oklch(0.78 0.14 196 / 0.15)'
          : 'oklch(0.78 0.14 196 / 0.25)',
        background: isDark
          ? 'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.06) 0%, transparent 100%)'
          : 'oklch(0.78 0.14 196 / 0.03)',
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: 'oklch(0.78 0.14 196)' }}
      >
        What you receive
      </p>

      <ul className="flex flex-col gap-3">
        {deliverables.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex items-start gap-3"
          >
            <CheckCircle
              size={15}
              className="shrink-0 mt-0.5"
              style={{ color: 'oklch(0.78 0.14 196)' }}
            />
            <span
              className="text-sm"
              style={{
                color: isDark
                  ? 'oklch(0.97 0.005 196 / 0.7)'
                  : 'var(--foreground)',
              }}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}