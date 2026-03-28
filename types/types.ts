import { LucideIcon } from "lucide-react"

// SITE
export interface ISiteMeta {
  name: string
  title: string
  tagline: string
  description: string
  url: string
  email: string
  phone: string
  whatsapp: string
  location: string
  founded: number
  socials: ISocial[]
}
export interface ISocial {
  name: string
  href: string
  icon: string
}
export interface IStat {
  value: number
  suffix: string
  label: string
}
// NAVIGATION
export interface INavLink {
  name: string
  href: string
  isSection?: boolean
  pageHref?: string
  pageLabel?: string
}
export interface IFooterColumn {
  title: string
  links: IFooterLink[]
}
export interface IFooterLink {
  name: string
  href: string
}
// CLIENTS
export interface IClientLogo {
  name: string
  src?: string
}
// SERVICES
export interface IService {
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  heroImage: string
  icon: string // lucide icon name
  features: string[]
  deliverables: string[]
  process: IServiceProcess[]
  relatedProjects?: string[] // project slugs
  cta: string
}
export interface IServiceProcess {
  step: number
  title: string
  description: string
}
// PROJECTS
export interface IProject {
  slug: string
  title: string
  tagline: string
  category: string[]
  coverImage: string
  images: string[]
  client: string
  year: number
  duration: string
  services: string[] // service slugs
  challenge: string
  approach: string
  solution: string
  techStack: string[]
  outcomes: IOutcome[]
  testimonial?: IProjectTestimonial
  liveUrl?: string
  featured: boolean
}
export interface IOutcome {
  value: string
  label: string
}
export interface IProjectTestimonial {
  quote: string
  author: string
  role: string
  avatar?: string
}
// TESTIMONIALS
export interface ITestimonial {
  id: number
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
  rating: number
}
// FAQS
export interface IFAQ {
  question: string
  answer: string
}
// PROCESS
export interface IProcessStep {
  step: number
  title: string
  description: string
  icon: LucideIcon
}
// PRICING
export interface IPricingPlan {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  highlighted: boolean // true = recommended card
  cta: string
}
