'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function InteractiveZap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse position relative to the icon center
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 })

  // Opacity based on proximity (0 when far, up to 0.4 when near)
  const proximityOpacity = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const distance = Math.sqrt(Math.pow(x as number, 2) + Math.pow(y as number, 2))
      return Math.max(0, 0.4 - distance / 400)
    }
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full min-h-75"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Proximity Glow */}
      <motion.div
        style={{ opacity: proximityOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle,oklch(0.78_0.14_196/0.15)_0%,transparent_70%)] pointer-events-none"
      />

      {/* The Zap Icon */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          filter: isHovered 
            ? 'drop-shadow(0 0 15px oklch(0.78 0.14 196 / 0.8))' 
            : 'drop-shadow(0 0 0px oklch(0.78 0.14 196 / 0))',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative z-10 text-white/10 ring-4 rounded-full p-20"
      >
        <Zap 
          size={160} 
          strokeWidth={1} 
          className={isHovered ? "text-cyan-400/40" : "text-white/5"} 
        />
      </motion.div>
    </div>
  )
}