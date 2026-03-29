import { IBlogPost } from '@/types'
import { author } from './author.data'

export const blogPosts: IBlogPost[] = [
  {
    slug: 'why-your-website-is-losing-you-clients',
    title: 'Why Your Website Is Losing You Clients (And How to Fix It)',
    excerpt:
      'Most business websites fail not because they look bad — but because they make visitors work too hard to understand what\'s being offered. Here\'s what to fix first.',
    coverImage: '/assets/blog/website-losing-clients.jfif',
    publishedAt: '2025-01-14',
    readingTime: 6,
    category: 'Strategy',
    tags: ['websites', 'conversion', 'UX', 'business'],
    featured: true,
    author,
  },
  {
    slug: 'the-case-for-boring-design',
    title: 'The Case for Boring Design',
    excerpt:
      'Chasing trends is expensive and ages badly. Here\'s why the most durable digital products are built on design decisions that looked boring at the time.',
    coverImage: '/assets/blog/boring-design.jfif',
    publishedAt: '2025-02-03',
    readingTime: 5,
    category: 'Design',
    tags: ['design', 'systems', 'longevity', 'craft'],
    featured: true,
    author,
  },
  {
    slug: 'how-we-build-nextjs-projects-at-offwhite',
    title: 'How We Structure Next.js Projects at Offwhite Visuals',
    excerpt:
      'A walkthrough of the folder structure, naming conventions, component patterns, and tooling decisions we use on every new project.',
    coverImage: '/assets/blog/nextjs-structure.jfif',
    publishedAt: '2025-02-20',
    readingTime: 8,
    category: 'Development',
    tags: ['Next.js', 'architecture', 'TypeScript', 'process'],
    featured: false,
    author,
  },
  {
    slug: 'building-a-brand-identity-from-scratch',
    title: 'Building a Brand Identity From Scratch — Our Process',
    excerpt:
      'A behind-the-scenes look at how we approach brand identity projects — from the discovery workshop through to the final guidelines handoff.',
    coverImage: '/assets/blog/brand-identity-process.jfif',
    publishedAt: '2025-03-05',
    readingTime: 7,
    category: 'Branding',
    tags: ['branding', 'identity', 'process', 'design'],
    featured: false,
    author,
  },
  {
    slug: 'the-real-cost-of-a-cheap-website',
    title: 'The Real Cost of a Cheap Website',
    excerpt:
      'A $300 website sounds like a bargain until you factor in what it costs in lost trust, missed conversions, and eventual rebuild. Let\'s do the actual math.',
    coverImage: '/assets/blog/cost-of-cheap-website.jfif',
    publishedAt: '2025-03-22',
    readingTime: 5,
    category: 'Strategy',
    tags: ['pricing', 'value', 'business', 'websites'],
    featured: false,
    author,
  },
  {
    slug: 'kazi-studio-case-study',
    title: 'Case Study — Kazi Studio Brand Identity',
    excerpt:
      'How we developed a complete brand identity for a Nairobi-based architecture firm in four weeks — the brief, the process, the decisions, and the outcome.',
    coverImage: '/assets/blog/kazi-studio-case-study.png',
    publishedAt: '2025-04-10',
    readingTime: 10,
    category: 'Case Study',
    tags: ['case study', 'branding', 'architecture', 'Nairobi'],
    featured: true,
    author,
  },
]

// Utility — get featured posts
export const featuredPosts = blogPosts.filter((p) => p.featured)

// Utility — get posts by category
export const getPostsByCategory = (category: IBlogPost['category']) =>
  blogPosts.filter((p) => p.category === category)

// Utility — get all unique tags
export const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)))

// Utility — get all unique categories
export const allCategories = Array.from(
  new Set(blogPosts.map((p) => p.category))
)