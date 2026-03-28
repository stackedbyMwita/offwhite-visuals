import { cn } from '@/lib/utils'
import { ArrowUpRight, LucideIcon } from 'lucide-react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface CustomButtonProps {
  label: string
  href?: string
  variant?: ButtonVariant
  icon?: LucideIcon | null   // null = hide icon entirely
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string         // only for layout overrides e.g. w-full, mt-8
  fullWidth?: boolean
}

// ── Variant style map ────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  // Solid cyan — primary actions
  primary:
    'bg-primary text-primary-foreground hover:brightness-105 shadow-lg shadow-primary/20',

  // Subtle cyan tint — secondary actions on dark backgrounds
  secondary:
    'bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20',

  // Bordered — secondary actions on light backgrounds
  outline:
    'bg-transparent text-primary border border-primary/30 hover:bg-primary/8 hover:border-primary/50',

  // No background — tertiary / text-level actions
  ghost:
    'bg-transparent text-primary hover:bg-primary/8',
}

export default function CustomButton({
  label,
  href,
  variant = 'primary',
  icon: Icon = ArrowUpRight,
  iconPosition = 'right',
  onClick,
  disabled,
  type = 'button',
  className,
  fullWidth,
}: CustomButtonProps) {

  const baseStyles = cn(
    // Base
    'group inline-flex items-center gap-2 rounded-full',
    'px-8 py-4 text-sm font-semibold tracking-wide',
    'transition-all duration-200 active:scale-[0.97]',
    'cursor-pointer select-none outline-none',
    'focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2',
    // Disabled
    'disabled:opacity-50 disabled:pointer-events-none',
    // Variant
    variantStyles[variant],
    // Width
    fullWidth && 'w-full justify-center',
    // Layout overrides only — caller should not pass color classes
    className
  )

  const iconLeft = Icon && iconPosition === 'left' && (
    <Icon
      size={15}
      className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
    />
  )

  const iconRight = Icon && iconPosition === 'right' && (
    <Icon
      size={15}
      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    />
  )

  const content = (
    <>
      {iconLeft}
      <span>{label}</span>
      {iconRight}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {content}
    </button>
  )
}