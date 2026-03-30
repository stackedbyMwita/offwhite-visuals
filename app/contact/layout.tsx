import type { Metadata } from 'next'
import { siteConfig } from '@/data/site.config'
import { contactPage } from '@/data/contact.data'

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: contactPage.subheadline,
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}