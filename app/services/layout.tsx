import type { Metadata } from 'next'
import { siteConfig } from '@/data/site.config'

export const metadata: Metadata = {
  title: `Services — ${siteConfig.name}`,
  description: 'UI/UX design, web development, brand identity, graphic design, and SEO — all under one roof.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}