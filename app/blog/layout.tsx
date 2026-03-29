import type { Metadata } from 'next'
import { siteConfig } from '@/data/site.config'

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description: 'Writing about design, development, and the craft behind building great digital products.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}