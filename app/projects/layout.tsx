import type { Metadata } from 'next'
import { siteConfig, projectsPage } from '@/data'

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: projectsPage.description,
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}