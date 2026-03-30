'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { contactPage } from '@/data'

// ── WhatsApp SVG ─────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── Scroll progress ring ─────────────────────────────────────
function ProgressRing({
  progress,
  size = 52,
  stroke = 2.5,
}: {
  progress: number
  size?: number
  stroke?: number
}) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - progress * circ

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 -rotate-90"
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="oklch(0.78 0.14 196 / 0.15)"
        strokeWidth={stroke}
      />
      {/* Progress */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#06b6d4"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
    </svg>
  )
}

// ── Tooltip ──────────────────────────────────────────────────
function Tooltip({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-fluid px-3 py-1.5 text-xs font-medium shadow-lg pointer-events-none z-50"
      style={{
        backgroundColor: 'var(--dark-bg)',
        color: 'var(--dark-fg)',
        border: '1px solid oklch(0.97 0.005 196 / 0.1)',
      }}
    >
      {label}
      {/* Pointer */}
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 size-2 rounded-sm"
        style={{
          backgroundColor: 'var(--dark-bg)',
          borderTop: '1px solid oklch(0.97 0.005 196 / 0.1)',
          borderRight: '1px solid oklch(0.97 0.005 196 / 0.1)',
        }}
      />
    </motion.div>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function FABGroup() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [tooltip, setTooltip] = useState<'whatsapp' | 'top' | null>(null)

  const { scrollYProgress } = useScroll()
  useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      const scrolled  = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrolled > 300)
      setScrollProgress(docHeight > 0 ? scrolled / docHeight : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const waUrl = `https://wa.me/${contactPage.whatsapp.replace(/\D/g, '')}`

  // Shared spring for FAB entrance
  const fabSpring = { type: 'spring', stiffness: 300, damping: 24 } as const

  return (
    <div className="fixed bottom-6 right-6 z-80 flex flex-col items-center gap-3 pointer-events-none">

      {/* ── WhatsApp ──────────────────────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="relative pointer-events-auto"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={fabSpring}
            onMouseEnter={() => setTooltip('whatsapp')}
            onMouseLeave={() => setTooltip(null)}
          >
            <AnimatePresence>
              {tooltip === 'whatsapp' && <Tooltip label="Chat on WhatsApp" />}
            </AnimatePresence>

            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="relative flex items-center justify-center rounded-full shadow-xl shadow-black/20 transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ width: 52, height: 52, backgroundColor: '#25D366', color: '#fff' }}
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: '#25D366', opacity: 0.25, animationDuration: '2.5s' }}
              />
              <WhatsAppIcon size={22} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back to top ───────────────────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="relative pointer-events-auto"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ ...fabSpring, delay: 0.06 }}
            onMouseEnter={() => setTooltip('top')}
            onMouseLeave={() => setTooltip(null)}
          >
            <AnimatePresence>
              {tooltip === 'top' && <Tooltip label="Back to top" />}
            </AnimatePresence>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="relative flex items-center justify-center rounded-full shadow-xl shadow-black/20 transition-transform duration-200 hover:scale-110 active:scale-95 outline-none"
              style={{
                width: 52,
                height: 52,
                backgroundColor: 'var(--dark-bg)',
                border: '1px solid oklch(0.97 0.005 196 / 0.1)',
                color: '#06b6d4',
              }}
            >
              <ProgressRing progress={scrollProgress} size={52} stroke={2.5} />
              <motion.div
                animate={{ y: scrollProgress > 0.95 ? -1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ArrowUp size={18} strokeWidth={2.5} />
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}