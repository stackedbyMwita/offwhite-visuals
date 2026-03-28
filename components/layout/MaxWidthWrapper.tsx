import { cn } from '@/lib/utils'

interface MaxWidthWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function MaxWidthWrapper({ children, className }: MaxWidthWrapperProps) {
  return (
    <div className={cn(
      'mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16',
      className
    )}>
      {children}
    </div>
  )
}