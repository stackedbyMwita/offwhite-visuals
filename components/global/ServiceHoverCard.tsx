'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import Image from 'next/image'
import ServiceCursorButton from './ServiceCursorButton'

interface ServiceHoverCardProps {
  imageSrc: string
  imageAlt: string
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  isVisible: boolean
}

export default function ServiceHoverCard({
  imageSrc,
  imageAlt,
  mouseX,
  mouseY,
  isVisible,
}: ServiceHoverCardProps) {
  const cardSpringX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.9 })
  const cardSpringY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.9 })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute pointer-events-none z-30"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.72 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{
            x: cardSpringX,
            y: cardSpringY,
            translateX: '-50%',
            translateY: '-50%',
            transformOrigin: 'center center',
          }}
        >
          {/*
            Square card — responsive size:
            sm: 140×140  md: 180×180  lg: 240×240
            All square so centering math is always exact
            (equal offset in both axes from the cursor)
          */}
          <div
            className="
              relative overflow-hidden rounded-2xl
              shadow-2xl shadow-black/60 ring-1 ring-white/10
              w-45 h-45
              md:w-52.5 md:h-52.5
              lg:w-60 lg:h-60
            "
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 240px"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />

            {/* Top cyan edge line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

            {/* Button always centered */}
            <ServiceCursorButton />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}