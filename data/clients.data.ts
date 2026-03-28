import { IClientLogo } from '@/types'

const names = [
  'Spotify',
  'Apple',
  'Google',
  'Notion',
  'Figma',
  'Vercel',
  'Stripe',
  'Linear',
  'Netflix',
  'Discord',
  'Slack',
  'GitHub',
]

export const clientLogos = names.map((name) => ({
  name,
  src: `https://cdn.simpleicons.org/${name.toLowerCase()}`,
})) satisfies IClientLogo[]