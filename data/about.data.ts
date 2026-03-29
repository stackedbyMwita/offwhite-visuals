import { IAboutPage } from '@/types'
import { author } from './author.data'

export const aboutPage: IAboutPage = {
  headline: 'Design That Thinks. Code That Performs.',
  subheadline: 'The story behind Offwhite Visuals.',

  story: [
    'Offwhite Visuals was born out of a simple frustration — too many beautiful designs that couldn\'t be built, and too many functional products that felt soulless to use.',
    'I started this studio to close that gap. As a designer who codes and a developer who designs, I work at the intersection of both disciplines — which means every project I take on is considered from both angles from day one.',
    'Based in Nairobi, I work with clients across Africa, Europe, and North America. The distance has never been a barrier — clarity of communication and quality of work always travel further.',
  ],

  mission:
    'To craft digital products that earn attention, build trust, and create lasting impact for the people and businesses behind them.',

  approach:
    'Every engagement starts with listening. I take time to understand not just what you want built, but why it matters, who it serves, and what success actually looks like for you. Then I design and build with that north star in mind — not trends, not templates, not shortcuts.',

  values: [
    {
      title: 'Craft over speed',
      description:
        'Good work takes the time it takes. I would rather deliver something exceptional slightly later than something mediocre on time.',
      icon: 'Gem',
    },
    {
      title: 'Clarity in everything',
      description:
        'Clear communication, clear design, clear code. Complexity is easy — clarity is the hard and valuable thing.',
      icon: 'Zap',
    },
    {
      title: 'Honest collaboration',
      description:
        'I push back when something isn\'t right and I expect clients to do the same. The best work comes from honest dialogue, not polite agreement.',
      icon: 'Handshake',
    },
    {
      title: 'Details are the product',
      description:
        'The spacing, the transition timing, the empty state, the error message — these are not afterthoughts. They are the difference between good and great.',
      icon: 'ScanEye',
    },
    {
      title: 'Build for longevity',
      description:
        'Trends fade. I design and build with longevity in mind — systems that age well and codebases that remain maintainable.',
      icon: 'Layers',
    },
    {
      title: 'Rooted in Africa, built for the world',
      description:
        'Nairobi shapes how I think about design — resourceful, bold, and deeply human. That perspective travels into every project regardless of geography.',
      icon: 'Globe',
    },
  ],

  timeline: [
    {
      year: 2019,
      title: 'First client project',
      description:
        'Took on my first paid design project — a brand identity for a local logistics startup. Learned more in three weeks than in months of self-study.',
      highlight: false,
    },
    {
      year: 2020,
      title: 'Offwhite Visuals founded',
      description:
        'Officially registered the studio and committed to working independently. Started building a client base through referrals and Dribbble.',
      highlight: true,
    },
    {
      year: 2021,
      title: 'First full-stack project',
      description:
        'Expanded from design into development — built and shipped a full web application for a Kenyan fintech client. Changed everything about how I approach projects.',
      highlight: false,
    },
    {
      year: 2022,
      title: 'First international client',
      description:
        'Worked with a UK-based SaaS company on their product redesign. Proved remote collaboration could work just as well as being in the room.',
      highlight: false,
    },
    {
      year: 2023,
      title: '20+ projects delivered',
      description:
        'Crossed the 20-project milestone. Began turning down work that didn\'t align with the studio\'s direction — a hard but important step.',
      highlight: true,
    },
    {
      year: 2024,
      title: 'Studio refresh',
      description:
        'Rebuilt the Offwhite Visuals brand and website from scratch. Doubled down on the intersection of design and engineering as a clear positioning.',
      highlight: false,
    },
    {
      year: 2025,
      title: 'Building in public',
      description:
        'Started documenting process, sharing learnings, and opening up the studio\'s work through the blog. Building trust through transparency.',
      highlight: true,
    },
  ],

  author,
}