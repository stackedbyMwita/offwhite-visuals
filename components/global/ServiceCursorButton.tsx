'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import CustomButton from '../ui/CustomButton'

export default function ServiceCursorButton() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <CustomButton
        label="View Now"
        href="/about"
        className='bg-white/20 text-white'
        variant='ghost'
      />
    </motion.div>
  )
}