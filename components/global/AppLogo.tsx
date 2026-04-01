'use client'

import { LucideIcon, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  scrolled: boolean
  icon?: LucideIcon
}

export default function AppLogo({ scrolled, icon: Icon }: Props) {
  const logoSrc = scrolled ? '/assets/brand/logo-dark.svg' : '/assets/brand/logo-light.svg';

  return (
    <Link href="/" className="relative z-50 group">
      <Image
        src={logoSrc}
        alt="Offwhite Visuals"
        width={160}
        height={32}
        priority
        className="h-8 w-auto transition-opacity duration-300"
        style={{ width: 'auto', height: '2rem' }}
      />
    </Link>
  )
}
