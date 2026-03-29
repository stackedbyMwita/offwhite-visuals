export const DEFAULT_THEME_COLOR = '#06b6d4'

export const CATEGORY_COLORS: Record<string, string> = {
  Design: DEFAULT_THEME_COLOR,
  Development: DEFAULT_THEME_COLOR,
  Branding: DEFAULT_THEME_COLOR,
  Strategy: DEFAULT_THEME_COLOR,
  'Case Study': DEFAULT_THEME_COLOR,
  'Behind the Scenes': DEFAULT_THEME_COLOR,
}

/**
 * Formats an ISO string to "D MMM YYYY" (e.g., 16 Oct 2025)
 */
export function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Returns the hex color for a specific category or the default theme color
 */
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? DEFAULT_THEME_COLOR
}