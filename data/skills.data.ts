export interface ISkill {
  name: string
  category: 'design' | 'development' | 'tools' | 'strategy'
}

export const skills: ISkill[] = [
  // Design
  { name: 'UI Design',          category: 'design' },
  { name: 'UX Research',        category: 'design' },
  { name: 'Figma',              category: 'design' },
  { name: 'Design Systems',     category: 'design' },
  { name: 'Prototyping',        category: 'design' },
  { name: 'Motion Design',      category: 'design' },
  { name: 'Brand Identity',     category: 'design' },
  { name: 'Typography',         category: 'design' },
  { name: 'Wireframing',        category: 'design' },
  { name: 'Graphic Design',     category: 'design' },

  // Development
  { name: 'Next.js',            category: 'development' },
  { name: 'React',              category: 'development' },
  { name: 'TypeScript',         category: 'development' },
  { name: 'Node.js',            category: 'development' },
  { name: 'Tailwind CSS',       category: 'development' },
  { name: 'PostgreSQL',         category: 'development' },
  { name: 'REST APIs',          category: 'development' },
  { name: 'Supabase',           category: 'development' },
  { name: 'Framer Motion',      category: 'development' },
  { name: 'React Native',       category: 'development' },

  // Tools
  { name: 'Vercel',             category: 'tools' },
  { name: 'Git & GitHub',       category: 'tools' },
  { name: 'Notion',             category: 'tools' },
  { name: 'Lottie',             category: 'tools' },
  { name: 'Adobe Suite',        category: 'tools' },
  { name: 'Storybook',          category: 'tools' },
  { name: 'Prisma',             category: 'tools' },

  // Strategy
  { name: 'SEO Strategy',       category: 'strategy' },
  { name: 'Content Strategy',   category: 'strategy' },
  { name: 'Conversion Rate Optimisation', category: 'strategy' },
  { name: 'Analytics & Reporting', category: 'strategy' },
  { name: 'Technical SEO',      category: 'strategy' },
]

// Pre-split for the two marquee rows
// Row 1 — design + development (odd indexed)
export const skillsRowOne: ISkill[] = skills.filter((_, i) => i % 2 === 0)

// Row 2 — tools + strategy (even indexed)
export const skillsRowTwo: ISkill[] = skills.filter((_, i) => i % 2 !== 0)