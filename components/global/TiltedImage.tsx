'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

type Props = {
  rotateAmplitude?: number
  imagePath: string
}

const springConfig = { damping: 30, stiffness: 100, mass: 2 }

export default function TiltedImage({ rotateAmplitude = 5, imagePath }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)

  const [lastY, setLastY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    rawRotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rawRotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)
    setLastY(offsetY)
  }

  const handleMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <motion.figure
      ref={ref}
      className="perspective-midrange relative w-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 60,
        mass: 1.2,
      }}
    >
      <motion.div
        className="transform-3d relative w-full"
        style={{ rotateX, rotateY }}
      >
        {/* Reflection gradient at the bottom edge */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 z-10 rounded-b-3xl bg-linear-to-t from-[oklch(0.13_0.025_196)] to-transparent" />

        <Image
          src={imagePath}
          alt="Offwhite Visuals — project showcase"
          width={1400}
          height={700}
          priority
          className="w-full rounded-3xl object-cover shadow-2xl shadow-black/40 will-change-transform"
        />

        {/* Top edge highlight line */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      </motion.div>
    </motion.figure>
  )
}