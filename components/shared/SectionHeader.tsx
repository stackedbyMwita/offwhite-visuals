import { cn } from '@/lib/utils'
import SectionEyebrow from './SectionEyebrow'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  accentWord?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  headingClassName?: string
  descriptionClassName?: string
}

export default function SectionHeader({
  eyebrow,
  heading,
  accentWord,
  description,
  align = 'left',
  className,
  headingClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  // Replaces the accentWord in the heading with a cyan-colored span
  const renderHeading = () => {
    if (!accentWord) return heading

    const parts = heading.split(new RegExp(`(${accentWord})`, 'gi'))

    return parts.map((part, i) =>
      part.toLowerCase() === accentWord.toLowerCase() ? (
        <span key={i} className="text-primary">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className
      )}
    >
      {eyebrow && <SectionEyebrow label={eyebrow} />}

      <h2
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight',
          headingClassName
        )}
      >
        {renderHeading()}
      </h2>

      {description && (
        <p
          className={cn(
            'text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}