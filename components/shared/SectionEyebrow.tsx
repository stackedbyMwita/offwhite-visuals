import { cn } from '@/lib/utils'

interface SectionEyebrowProps {
  label: string
  className?: string
}

export default function SectionEyebrow({ label, className }: SectionEyebrowProps) {
  return (
    <div className={cn('flex items-center gap-2 w-fit', className)}>
      {/* Left accent line */}
      <span className="h-px w-6 bg-primary" />

      <span className="text-primary text-[11px] font-bold uppercase tracking-[0.25em]">
        {label}
      </span>

      {/* Right accent line */}
      <span className="h-px w-6 bg-primary" />
    </div>
  )
}