'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'

interface GalleryModalProps {
  images: string[]
  selectedImage: string | null
  onClose: () => void
  onNavigate: (src: string) => void
}

// ── Extract a readable filename from a URL ───────────────────
function getCaption(src: string): string {
  try {
    const decoded = decodeURIComponent(src)
    // Cloudinary URLs — grab the last path segment before query
    const parts = decoded.split('/').pop()?.split('?')[0] ?? ''
    // Remove extension and version prefix (v1234567890_)
    return parts
      .replace(/\.[^.]+$/, '')           // remove extension
      .replace(/^v\d+_/, '')             // remove cloudinary version prefix
      .replace(/[_-]/g, ' ')             // underscores/dashes to spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()) // title case
      .trim()
  } catch {
    return 'Portfolio Image'
  }
}

export default function GalleryModal({
  images,
  selectedImage,
  onClose,
  onNavigate,
}: GalleryModalProps) {
  const currentIndex = selectedImage
    ? images.indexOf(selectedImage)
    : -1

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(images[currentIndex - 1])
  }, [hasPrev, currentIndex, images, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(images[currentIndex + 1])
  }, [hasNext, currentIndex, images, onNavigate])

  // ── Keyboard navigation ────────────────────────────────
  useEffect(() => {
    if (!selectedImage) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedImage, goPrev, goNext])

  return (
    <Dialog open={!!selectedImage} onOpenChange={(open) => !open && onClose()}>

      {/* ── Backdrop ────────────────────────────────────── */}
      <DialogOverlay className="bg-black/85 backdrop-blur-md" />

      {/* ── Content ─────────────────────────────────────── */}
      <DialogContent
        className="
          p-0 border-none shadow-none bg-transparent
          max-w-none w-auto
          flex flex-col items-center gap-0
          focus:outline-none
          [&>button]:hidden
        "
        style={{ maxWidth: '92vw', maxHeight: '92vh' }}
      >
        <DialogTitle className="sr-only">Image preview</DialogTitle>
        <DialogDescription className="sr-only">
          {selectedImage ? `Viewing ${getCaption(selectedImage)}` : 'Image preview dialog'}
        </DialogDescription>
        {/* Close button — top right */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-50 flex items-center justify-center size-9 rounded-fluid transition-all duration-200"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* ── Image + nav ────────────────────────────────── */}
        <div className="relative flex items-center gap-4">

          {/* Prev arrow */}
          <button
            onClick={goPrev}
            disabled={!hasPrev}
            aria-label="Previous image"
            className="flex items-center justify-center size-11 rounded-fluid transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none shrink-0"
            style={{
              backgroundColor: 'rgba(0,0,0,0.55)',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          {/* Image */}
          {selectedImage && (
            <div
              className="relative flex items-center justify-center"
              style={{ maxWidth: '80vw', maxHeight: '80vh' }}
            >
              <Image
                src={selectedImage}
                alt={getCaption(selectedImage)}
                width={0}
                height={0}
                sizes="80vw"
                className="w-auto h-auto shadow-2xl shadow-black/60"
                style={{ maxWidth: '80vw', maxHeight: '80vh' }}
                unoptimized={false}
              />
            </div>
          )}

          {/* Next arrow */}
          <button
            onClick={goNext}
            disabled={!hasNext}
            aria-label="Next image"
            className="flex items-center justify-center size-11 rounded-fluid transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none shrink-0"
            style={{
              backgroundColor: 'rgba(0,0,0,0.55)',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Caption + counter ────────────────────────────── */}
        {selectedImage && (
          <div className="flex flex-col items-center gap-1.5 mt-4">
            {/* Filename caption */}
            <p
              className="text-sm font-medium tracking-wide text-center max-w-md"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {getCaption(selectedImage)}
            </p>

            {/* Position counter */}
            <div className="flex items-center gap-1.5">
              {/* Dot indicators — max 8 shown */}
              {images.length <= 12 ? (
                images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onNavigate(images[i])}
                    aria-label={`Go to image ${i + 1}`}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width:  i === currentIndex ? 20 : 6,
                      height: 6,
                      backgroundColor:
                        i === currentIndex
                          ? 'oklch(0.78 0.14 196)'
                          : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))
              ) : (
                // Numeric counter for large galleries
                <span
                  className="text-xs font-mono"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}