'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  variant?: 'dark' | 'light'
  className?: string
  id?: string
  fullHeight?: boolean
  enableMouseGlow?: boolean
  suppressTexture?: boolean
}

export default function SectionWrapper({
  children,
  variant = 'light',
  className,
  id,
  fullHeight = false,
  enableMouseGlow = true,
  suppressTexture = false,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!enableMouseGlow) return

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      section.addEventListener('mouseenter', handleMouseEnter)
      section.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
        section.removeEventListener('mouseenter', handleMouseEnter)
        section.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [enableMouseGlow])

  return (
    <section
      ref={sectionRef}
      id={id}
      style={
        variant === 'dark'
          ? { backgroundColor: 'var(--dark-bg)', color: 'var(--dark-fg)' }
          : { backgroundColor: 'var(--background)', color: 'var(--foreground)' }
      }
      className={cn(
        'relative w-full overflow-hidden',
        fullHeight && 'min-h-screen',
        className
      )}
    >
      {/* Background texture */}
      {!suppressTexture && variant === 'light' && (
        <div className="section-grid-bg" aria-hidden="true" />
      )}
      {!suppressTexture && variant === 'dark' && (
        <div className="section-glow-bg" aria-hidden="true">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="glow glow-3" />
        </div>
      )}

      {/* Mouse Glow Tracker */}
      {enableMouseGlow && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
          }}
        >
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: '300px',
              height: '300px',
              transform: 'translate(-50%, -50%)',
              background: variant === 'dark' 
                ? 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0) 70%)'
                : 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 70%)',
            }}
          />
        </div>
      )}

      {/* Content above texture */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  )
}