// @/components/shared/CardParts.tsx
import { ArrowUpRight, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils/blog'

// The signature "Alex Mwita" arrow with the hover-offset
export const CardArrow = ({ size = 18, className = "" }) => (
  <ArrowUpRight
    size={size}
    className={`shrink-0 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45 transition-all duration-300 ${className}`}
  />
)

// Standardized Date + Reading Time row
export const MetaInfo = ({ date, time, size = 10 }: { date: string; time: number; size?: number }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <span className="tabular-nums">{formatDate(date)}</span>
    <span>·</span>
    <span className="flex items-center gap-1">
      {size! > 0 && <Clock size={size} />}
      {time} min {size === 9 ? '' : 'read'}
    </span>
  </div>
)

// Reusable Badge for Categories or Years
export const CardBadge = ({ children, variant = "default" }: { children: React.ReactNode, variant?: 'default' | 'accent' | 'outline' }) => {
  const variants = {
    default: "bg-black/50 text-white/70 border border-white/10 backdrop-blur-sm",
    accent: "bg-[oklch(0.78_0.14_196/0.9)] text-[oklch(0.13_0.025_196)]",
    outline: "border-primary/25 text-primary bg-primary/5"
  }
  
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}