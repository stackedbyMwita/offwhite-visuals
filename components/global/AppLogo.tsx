'use client'

import { Zap } from 'lucide-react'
import Link from 'next/link'

type Props = {
  scrolled: boolean
}

export default function AppLogo({ scrolled }: Props) {
  const logoTextClass = scrolled ? 'text-foreground' : 'text-white';
  const iconClass = scrolled ? 'text-white' : 'text-foreground';

  return (
    <Link href="/" className="relative z-50 group">
      <div className="flex items-center gap-2 transition-all duration-500">
        <span className="bg-primary p-2 rounded-full shadow-lg shadow-primary/10 transition group-hover:scale-105">
          <Zap 
            className={`transition-colors duration-500 ${iconClass}`} 
            fill="currentColor" 
            size={18} 
            strokeWidth={0} // Remove stroke for a solid shape
          />
        </span>

        {/* Logo Text - Toggles between Dark Teal and White */}
        <span className={`text-lg font-extrabold font-mono tracking-tighter transition-colors duration-500 ${logoTextClass}`}>
          Offwhite
          <span className='text-primary'>
            Visuals
          </span>
        </span>
      </div>
    </Link>
  )
}