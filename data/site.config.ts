import { ISiteMeta, IStat } from '@/types'

export const siteConfig: ISiteMeta = {
  name: 'Offwhite Visuals',
  title: "Offwhite Visuals — Creative Digital Studio",
  tagline: 'We craft bold digital experiences.',
  description:
    'Offwhite Visuals is a creative digital studio specialising in UI/UX design, full-stack development, and brand identity. Based in Nairobi, building for the world.',
  url: 'https://offwhitevisuals.com',
  email: 'hello@offwhitevisuals.com',
  phone: '+254718521808',
  whatsapp: '+254718521808',
  location: 'Nairobi, Kenya',
  founded: 2020,
  socials: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/offwhitevisuals',
      icon: 'Twitter',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/offwhitevisuals',
      icon: 'Instagram',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/offwhitevisuals',
      icon: 'Linkedin',
    },
    {
      name: 'Dribbble',
      href: 'https://dribbble.com/offwhitevisuals',
      icon: 'Dribbble',
    },
  ],
}

export const heroStats: IStat[] = [
  {
    value: 5,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    value: 48,
    suffix: '+',
    label: 'Projects Delivered',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Happy Clients',
  },
]