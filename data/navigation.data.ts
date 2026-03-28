import { IFooterColumn, INavLink } from '@/types'

export const navLinks: INavLink[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Services',
    href: '#services',
    isSection: true,
    pageHref: '/services',
    pageLabel: 'All Services',
  },
  {
    name: 'Projects',
    href: '#projects',
    isSection: true,
    pageHref: '/projects',
    pageLabel: 'All Projects',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]

export const footerColumns: IFooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'Projects', href: '/projects' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'UI/UX Design', href: '/services/ui-ux-design' },
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Brand Identity', href: '/services/brand-identity' },
      { name: 'Graphic Design', href: '/services/graphic-design' },
      { name: 'SEO & Growth', href: '/services/seo-growth' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
]