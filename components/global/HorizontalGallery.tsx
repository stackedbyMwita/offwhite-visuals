'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import GalleryModal from './GalleryModal'

// ── Build alternating column pattern ─────────────────────────
function buildColumns(images: string[]): Array<string[]> {
  const columns: Array<string[]> = []
  let i = 0
  while (i < images.length) {
    if (columns.length % 2 === 0) {
      columns.push([images[i]])
      i++
    } else {
      const pair: string[] = []
      if (i < images.length) { pair.push(images[i]); i++ }
      if (i < images.length) { pair.push(images[i]); i++ }
      columns.push(pair)
    }
  }
  return columns
}

// ── Single image cell ─────────────────────────────────────────
function GalleryCell({
  src,
  alt,
  tall = false,
  onClick,
}: {
  src: string
  alt: string
  tall?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group/cell"
      style={{
        width: tall ? 260 : 200,
        height: tall ? 360 : 174,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-200 group-hover/cell:opacity-90"
        sizes="260px"
        draggable={false}
      />
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/cell:bg-black/15 transition-colors duration-200 pointer-events-none" />
      {/* Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div
          className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          View
        </div>
      </div>
    </button>
  )
}

// ── Column ────────────────────────────────────────────────────
function GalleryColumn({
  images,
  allImages,
  onImageClick,
}: {
  images: string[]
  allImages: string[]
  onImageClick: (src: string) => void
}) {
  const isSingle = images.length === 1
  return (
    <div className="flex flex-col gap-3 shrink-0" style={{ height: 360 }}>
      {isSingle ? (
        <GalleryCell
          src={images[0]}
          alt="Portfolio image"
          tall
          onClick={() => onImageClick(images[0])}
        />
      ) : (
        <>
          <GalleryCell
            src={images[0]}
            alt="Portfolio image"
            onClick={() => onImageClick(images[0])}
          />
          <GalleryCell
            src={images[1]}
            alt="Portfolio image"
            onClick={() => onImageClick(images[1])}
          />
        </>
      )}
    </div>
  )
}

// ── Main HorizontalGallery ────────────────────────────────────
interface HorizontalGalleryProps {
  images: string[]
}

export default function HorizontalGallery({ images }: HorizontalGalleryProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const didDrag = useRef(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const columns = buildColumns(images)
  const repeated = [
    ...columns, ...columns, ...columns,
    ...columns, ...columns, ...columns,
  ]

  // ── Drag to scroll ──────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current
    if (!el) return
    isDragging.current = true
    didDrag.current = false
    startX.current = e.pageX - el.offsetLeft
    scrollLeft.current = el.scrollLeft
    el.style.cursor = 'grabbing'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    const el = trackRef.current
    if (!el || !isDragging.current) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const diff = x - startX.current
    if (Math.abs(diff) > 4) didDrag.current = true
    el.scrollLeft = scrollLeft.current - diff
  }

  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  // ── Touch ───────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    const el = trackRef.current
    if (!el) return
    startX.current = e.touches[0].pageX - el.offsetLeft
    scrollLeft.current = el.scrollLeft
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const el = trackRef.current
    if (!el) return
    const x = e.touches[0].pageX - el.offsetLeft
    el.scrollLeft = scrollLeft.current - (x - startX.current)
  }

  // ── Infinite loop ───────────────────────────────────────
  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const third = (el.scrollWidth / repeated.length) * columns.length
    if (el.scrollLeft < third * 0.5) el.scrollLeft += third * 2
    if (el.scrollLeft > third * 3.5) el.scrollLeft -= third * 2
  }

  const initRef = (el: HTMLDivElement | null) => {
    trackRef.current = el
    if (!el) return
    const third = (el.scrollWidth / repeated.length) * columns.length
    el.scrollLeft = third * 2
  }

  // ── Image click — only open modal if not dragging ───────
  const handleImageClick = (src: string) => {
    if (didDrag.current) return
    setSelectedImage(src)
  }

  return (
    <>
      <div className="w-full" style={{ backgroundColor: 'var(--background)' }}>
        <div
          ref={initRef}
          className="overflow-x-auto overflow-y-hidden cursor-grab select-none"
          style={{
            height: 384,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          } as React.CSSProperties}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onScroll={onScroll}
        >
          <div className="flex gap-3 h-full items-center px-3">
            {repeated.map((col, i) => (
              <GalleryColumn
                key={i}
                images={col}
                allImages={images}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <GalleryModal
        images={images}
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNavigate={setSelectedImage}
      />
    </>
  )
}