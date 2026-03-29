"use client"

import CustomButton from '../ui/CustomButton'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type CTAVariant = 'dark' | 'light'

type CTABannerProps = {
  variant?: CTAVariant
  heading: string
  body: string
  buttonLabel?: string
  buttonHref?: string
  buttonIcon?: LucideIcon | null
  className?: string
}

// ── Style map ────────────────────────────────────────────────
const styles: Record<CTAVariant, {
  border: string
  background: string
  heading: string
  body: string
  buttonVariant: 'primary' | 'outline' | 'secondary'
}> = {
  dark: {
    border: 'oklch(0.78 0.14 196 / 0.15)',
    background: 'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.07) 0%, oklch(0.13 0.025 196 / 0) 100%)',
    heading: 'var(--dark-fg)',
    body: 'oklch(0.97 0.005 196 / 0.45)',
    buttonVariant: 'primary',
  },
  light: {
    border: 'oklch(0.78 0.14 196 / 0.2)',
    background: 'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.04) 0%, transparent 100%)',
    heading: 'var(--foreground)',
    body: 'var(--muted-foreground)',
    buttonVariant: 'secondary',
  },
}

export default function CTABanner({
  variant = 'dark',
  heading,
  body,
  className,
  buttonLabel = 'Book a Free Call',
  buttonHref = '/contact',
  buttonIcon,
}: CTABannerProps) {
  const s = styles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 60 }}
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-6 px-8 md:px-14 py-10 rounded-3xl border",
        className,
      )}
      style={{ borderColor: s.border, background: s.background }}
    >
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <span
          className="text-xl md:text-2xl font-bold font-serif"
          style={{ color: s.heading }}
        >
          {heading}
        </span>
        <span
          className="text-sm"
          style={{ color: s.body }}
        >
          {body}
        </span>
      </div>

      <CustomButton
        label={buttonLabel}
        href={buttonHref}
        variant={s.buttonVariant}
        icon={buttonIcon === undefined ? undefined : buttonIcon ?? undefined}
        className="shrink-0"
      />
    </motion.div>
  )
}