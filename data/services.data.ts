import { IService } from '@/types'

export const services: IService[] = [
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription:
      'Interfaces that feel inevitable. We design digital products people love to use.',
    fullDescription:
      'From wireframes to polished high-fidelity prototypes, we design interfaces grounded in user research and elevated by craft. Every pixel is intentional. Every interaction is considered.',
    heroImage: '/assets/services/ui-ux-design.png',
    icon: 'Layers',
    features: [
      'User research & personas',
      'Information architecture',
      'Wireframing & prototyping',
      'High-fidelity UI design',
      'Design systems',
      'Usability testing',
    ],
    deliverables: [
      'Figma design files',
      'Interactive prototype',
      'Design system documentation',
      'Handoff-ready specs',
    ],
    process: [
      {
        step: 1,
        title: 'Discover',
        description: 'We audit your current state and research your users.',
      },
      {
        step: 2,
        title: 'Define',
        description: 'We map user flows and define the problem clearly.',
      },
      {
        step: 3,
        title: 'Design',
        description: 'We design, prototype, and iterate rapidly.',
      },
      {
        step: 4,
        title: 'Deliver',
        description: 'We hand off production-ready, documented files.',
      },
    ],
    cta: 'Start a Design Project',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortDescription:
      'Fast, scalable, and maintainable. We build web applications that perform.',
    fullDescription:
      'We build full-stack web applications using modern technologies. From marketing sites to complex SaaS platforms, we write clean code that scales.',
    heroImage: '/assets/services/web-development.png',
    icon: 'Code2',
    features: [
      'Next.js & React applications',
      'REST & GraphQL APIs',
      'Database architecture',
      'Authentication & security',
      'Performance optimisation',
      'CI/CD deployment',
    ],
    deliverables: [
      'Production-ready codebase',
      'Deployed application',
      'Technical documentation',
      'Post-launch support',
    ],
    process: [
      {
        step: 1,
        title: 'Scope',
        description: 'We define the technical requirements and architecture.',
      },
      {
        step: 2,
        title: 'Build',
        description: 'We develop in sprints with regular check-ins.',
      },
      {
        step: 3,
        title: 'Test',
        description: 'We run thorough QA across devices and browsers.',
      },
      {
        step: 4,
        title: 'Launch',
        description: 'We deploy, monitor, and support post-launch.',
      },
    ],
    cta: 'Start Building',
  },
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    shortDescription:
      'A brand that means something. We build identities that stand out and last.',
    fullDescription:
      'We craft brand identities from the ground up — strategy, naming, visual identity, and guidelines. The result is a coherent brand that communicates clearly and consistently.',
    heroImage: '/assets/services/brand-identity.png',
    icon: 'Sparkles',
    features: [
      'Brand strategy & positioning',
      'Logo design',
      'Typography system',
      'Color palette',
      'Brand voice & tone',
      'Brand guidelines',
    ],
    deliverables: [
      'Logo suite (all formats)',
      'Brand guidelines PDF',
      'Asset library',
      'Social media kit',
    ],
    process: [
      {
        step: 1,
        title: 'Strategise',
        description: 'We define your positioning and brand personality.',
      },
      {
        step: 2,
        title: 'Concept',
        description: 'We explore visual directions and present options.',
      },
      {
        step: 3,
        title: 'Refine',
        description: 'We refine the chosen direction to perfection.',
      },
      {
        step: 4,
        title: 'Package',
        description: 'We deliver a complete, ready-to-use brand system.',
      },
    ],
    cta: 'Build My Brand',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortDescription:
      'Print, digital, motion. Visual communication that cuts through the noise.',
    fullDescription:
      'From pitch decks to social campaigns, we design visual assets that communicate your message with clarity and style.',
    heroImage: '/assets/services/graphic-design.png',
    icon: 'PenTool',
    features: [
      'Social media graphics',
      'Pitch decks & presentations',
      'Print collateral',
      'Infographics',
      'Email templates',
      'Marketing assets',
    ],
    deliverables: [
      'Print-ready files',
      'Web-optimised exports',
      'Editable source files',
    ],
    process: [
      {
        step: 1,
        title: 'Brief',
        description: 'We understand the message and the audience.',
      },
      {
        step: 2,
        title: 'Create',
        description: 'We design with purpose and visual precision.',
      },
      {
        step: 3,
        title: 'Revise',
        description: 'We incorporate your feedback in clear rounds.',
      },
      {
        step: 4,
        title: 'Export',
        description: 'We deliver in every format you need.',
      },
    ],
    cta: 'Get a Quote',
  },
  {
    slug: 'seo-growth',
    title: 'SEO & Growth',
    shortDescription:
      'Visibility that compounds. We grow your organic presence with strategy and content.',
    fullDescription:
      'We build long-term organic growth through technical SEO, content strategy, and conversion optimisation. No tricks — just fundamentals done exceptionally well.',
    heroImage: '/assets/services/seo-growth.png',
    icon: 'TrendingUp',
    features: [
      'Technical SEO audit',
      'Keyword research',
      'On-page optimisation',
      'Content strategy',
      'Link building',
      'Analytics & reporting',
    ],
    deliverables: [
      'SEO audit report',
      'Keyword strategy doc',
      'Monthly performance reports',
      'Optimised content',
    ],
    process: [
      {
        step: 1,
        title: 'Audit',
        description: 'We assess your current SEO health and gaps.',
      },
      {
        step: 2,
        title: 'Strategise',
        description: 'We build a prioritised roadmap for growth.',
      },
      {
        step: 3,
        title: 'Execute',
        description: 'We implement on-page, technical, and content changes.',
      },
      {
        step: 4,
        title: 'Report',
        description: 'We track, report, and continuously optimise.',
      },
    ],
    cta: 'Grow My Traffic',
  },
]