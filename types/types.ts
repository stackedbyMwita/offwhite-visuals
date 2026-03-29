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

// ============================================================
// BLOG
// ============================================================

export interface IBlogPost {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  publishedAt: string   // ISO date string e.g. '2024-11-15'
  updatedAt?: string
  readingTime: number   // minutes
  category: IBlogCategory
  tags: string[]
  featured: boolean
  author: IAuthor
}

export type IBlogCategory =
  | 'Design'
  | 'Development'
  | 'Branding'
  | 'Strategy'
  | 'Case Study'
  | 'Behind the Scenes'

// ============================================================
// AUTHOR (solo — but typed for extensibility)
// ============================================================

export interface IAuthor {
  name: string
  role: string
  avatar: string
  bio: string
  socials: ISocial[]
}

// ============================================================
// ABOUT
// ============================================================

export interface ITimelineEvent {
  year: number
  title: string
  description: string
  highlight?: boolean  // true = render with cyan accent
}

export interface IValue {
  title: string
  description: string
  icon: string  // lucide icon name
}

export interface IAboutPage {
  headline: string
  subheadline: string
  story: string[]            // paragraphs
  mission: string
  approach: string
  values: IValue[]
  timeline: ITimelineEvent[]
  author: IAuthor
}

// ============================================================
// CONTACT
// ============================================================

export interface IContactPage {
  headline: string
  subheadline: string
  email: string
  phone: string
  whatsapp: string
  location: string
  locationUrl: string        // Google Maps URL
  availability: string       // e.g. "Mon–Fri, 9am–6pm EAT"
  responseTime: string       // e.g. "Within 4 hours"
  services: string[]         // quick service checklist for contact form
}

// ============================================================
// SERVICES PAGE
// ============================================================

export interface IServicesPage {
  headline: string
  subheadline: string
  description: string
}

// ============================================================
// PROJECTS PAGE
// ============================================================

export interface IProjectsPage {
  headline: string
  subheadline: string
  description: string
}