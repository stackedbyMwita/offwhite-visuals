import { IProject } from '@/types'

export const projects: IProject[] = [
  {
    slug: 'finance-mobile-app',
    title: 'Finance Mobile App',
    tagline: 'A personal finance tracker built for Gen Z.',
    category: ['UI/UX Design', 'Web Development'],
    coverImage: '/assets/projects/finance-app-cover.png',
    images: [
      '/assets/projects/finance-app-1.png',
      '/assets/projects/finance-app-2.png',
      '/assets/projects/finance-app-3.png',
    ],
    client: 'FinTrack Inc.',
    year: 2024,
    duration: '8 weeks',
    services: ['ui-ux-design', 'web-development'],
    challenge:
      'Young adults struggled to track spending across multiple accounts. Existing apps felt corporate and overwhelming.',
    approach:
      'We ran user interviews with 20 participants aged 18–28, identified the top 3 pain points, and designed around simplicity and delight rather than feature density.',
    solution:
      'A clean, card-based mobile interface with smart categorisation, a weekly spending summary, and a savings goal tracker. Built with React Native and a Node.js backend.',
    techStack: ['React Native', 'Node.js', 'PostgreSQL', 'Figma'],
    outcomes: [
      { value: '4.8★', label: 'App Store Rating' },
      { value: '12K+', label: 'Downloads in Month 1' },
      { value: '68%', label: 'Daily Active Users' },
    ],
    testimonial: {
      quote:
        'Offwhite Visuals delivered exactly what we envisioned — and then some. The attention to detail was exceptional.',
      author: 'Sarah K.',
      role: 'CEO, FinTrack Inc.',
    },
    liveUrl: 'https://fintrackapp.com',
    featured: true,
  },
  {
    slug: 'elearning-dashboard',
    title: 'E-Learning Dashboard',
    tagline: 'A learning management system that students actually enjoy.',
    category: ['UI/UX Design', 'Web Development'],
    coverImage: '/assets/projects/elearning-cover.png',
    images: [
      '/assets/projects/elearning-1.png',
      '/assets/projects/elearning-2.png',
    ],
    client: 'EduFlow Kenya',
    year: 2024,
    duration: '12 weeks',
    services: ['ui-ux-design', 'web-development'],
    challenge:
      'EduFlow had high drop-off rates on their legacy LMS. Students found the interface confusing and demotivating.',
    approach:
      'We audited the existing platform, mapped the full student journey, and identified the 5 highest-friction points. We redesigned from the ground up with engagement as the north star metric.',
    solution:
      'A modern dashboard with progress tracking, gamified milestones, a clean course player, and a collaborative notes feature. Built with Next.js and Supabase.',
    techStack: ['Next.js', 'Supabase', 'TypeScript', 'Figma'],
    outcomes: [
      { value: '43%', label: 'Reduction in Drop-off' },
      { value: '2.1×', label: 'Session Duration' },
      { value: '91%', label: 'Student Satisfaction' },
    ],
    testimonial: {
      quote:
        'Our student engagement numbers have never looked better. The new platform is a joy to use.',
      author: 'James M.',
      role: 'CTO, EduFlow Kenya',
    },
    featured: true,
  },
  {
    slug: 'brand-identity-studio',
    title: 'Brand Identity — Kazi Studio',
    tagline: 'A complete brand identity for a Nairobi-based architecture firm.',
    category: ['Brand Identity', 'Graphic Design'],
    coverImage: '/assets/projects/kazi-studio-cover.png',
    images: [
      '/assets/projects/kazi-studio-1.png',
      '/assets/projects/kazi-studio-2.png',
    ],
    client: 'Kazi Studio',
    year: 2023,
    duration: '4 weeks',
    services: ['brand-identity', 'graphic-design'],
    challenge:
      'Kazi Studio had no coherent visual identity. Their materials were inconsistent across print and digital, which undermined their positioning as a premium firm.',
    approach:
      'We started with a brand discovery workshop, then developed three distinct visual directions before refining the chosen concept.',
    solution:
      'A minimal, architectural brand identity — a custom wordmark, a restrained color system of off-white and deep charcoal, and a full brand guidelines document.',
    techStack: ['Figma', 'Adobe Illustrator', 'Adobe InDesign'],
    outcomes: [
      { value: '3×', label: 'Increase in Inbound Leads' },
      { value: '100%', label: 'Client Satisfaction Score' },
    ],
    featured: true,
  },
]