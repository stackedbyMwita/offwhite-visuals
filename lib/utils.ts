import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_THEME_COLOR = 'oklch(62% 0.19 200)' // A refined Cyan/Blue

export const CATEGORY_COLORS: Record<string, string> = {
  Design: 'oklch(65% 0.22 300)',             // Vibrant Purple
  Development: 'oklch(65% 0.20 180)',        // Teal/Mint
  Branding: 'oklch(65% 0.24 20)',            // Deep Coral/Pink
  Strategy: 'oklch(65% 0.15 250)',           // Royal Blue
  'Case Study': 'oklch(65% 0.22 80)',        // Gold/Ochre
  'Behind the Scenes': 'oklch(65% 0.05 0)',  // Sophisticated Warm Gray
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