'use client'

import { useInView } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// ── Pre-computed animation delays — no Math.random() in render
const DELAYS = [
  '0ms', '100ms', '200ms', '150ms', '250ms',
  '50ms', '300ms', '75ms', '175ms', '225ms',
  '125ms', '275ms', '25ms', '350ms', '400ms',
  '325ms', '375ms', '450ms', '475ms', '500ms',
]

// ── Split array across N columns ─────────────────────────────
function splitArray<T>(array: T[], cols: number): T[][] {
  const result: T[][] = Array.from({ length: cols }, () => [])
  array.forEach((item, i) => result[i % cols].push(item))
  return result
}

// ── Single image card ────────────────────────────────────────
function GalleryCard({
  src,
  alt,
  delayIndex,
}: {
  src: string
  alt: string
  delayIndex: number
}) {
  return (
    <div
      className="relative w-full overflow-hidden opacity-0 animate-gallery-fade"
      style={{
        animationDelay: DELAYS[delayIndex % DELAYS.length],
        animationFillMode: 'forwards',
      }}
    >
      <div className="relative w-full aspect-3/4">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-primary/0 hover:bg-primary/8 transition-colors duration-500" />
        {/* Top cyan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  )
}

// ── Single scrolling column ──────────────────────────────────
function GalleryColumn({
  images,
  direction = 'up',
  speed = 50,
  className,
}: {
  images: string[]
  direction?: 'up' | 'down'
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Duration = height × ms per pixel
  const duration = height * speed

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        ref={ref}
        className="flex flex-col gap-4"
        style={{
          animation: `gallery-scroll-${direction} ${duration}ms linear infinite`,
          willChange: 'transform',
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...images, ...images].map((src, i) => (
          <GalleryCard
            key={`${src}-${i}`}
            src={src}
            alt={`Gallery image ${i + 1}`}
            delayIndex={i}
          />
        ))}
      </div>
    </div>
  )
}

// ── Main GalleryView ─────────────────────────────────────────
interface GalleryViewProps {
  images: string[]
  title?: string
}

export default function GalleryView({ images, title }: GalleryViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.15 })

  // Split into 4 columns — 2 on tablet, 1 on mobile
  const [col1, col2, col3, col4, col5, col6] = splitArray(images, 6)

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-6">
      {/* Label */}
      {title && (
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: 'oklch(0.78 0.14 196)' }}
          >
            {title}
          </span>
          <div
            className="h-px flex-1"
            style={{ background: 'oklch(0.97 0.005 196 / 0.08)' }}
          />
        </div>
      )}

      {/* Grid — 3/4 screen height */}
      <div
        className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 overflow-hidden"
        style={{ height: '75vh' }}
      >
        {isInView ? (
          <>
            {/* Col 1 — scrolls up */}
            <GalleryColumn
              images={col1}
              direction="up"
              speed={17}
            />

            {/* Col 2 — scrolls down (counterlateral) */}
            <GalleryColumn
              images={col2}
              direction="down"
              speed={15}
              className="hidden sm:block"
            />

            {/* Col 3 — scrolls up, faster */}
            <GalleryColumn
              images={col3}
              direction="up"
              speed={12}
              className="hidden lg:block"
            />

            {/* Col 4 — scrolls down */}
            <GalleryColumn
              images={col4}
              direction="down"
              speed={16}
              className="hidden lg:block"
            />

            {/* Col 5 — scrolls up */}
            <GalleryColumn
              images={col5}
              direction="up"
              speed={17}
            />

            {/* Col 6 — scrolls down (counterlateral) */}
            <GalleryColumn
              images={col6}
              direction="down"
              speed={15}
              className="hidden sm:block"
            />
          </>
        ) : null}

        {/* Top + bottom gradient fades */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 z-10"
          style={{
            background: 'linear-gradient(to bottom, var(--dark-bg), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
          style={{
            background: 'linear-gradient(to top, var(--dark-bg), transparent)',
          }}
        />

        {/* Pause on hover overlay */}
        <div className="absolute inset-0 z-20 group">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/3 transition-colors duration-500" />
        </div>
      </div>
    </div>
  )
}