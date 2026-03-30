import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CustomCardProps {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  onClick?: () => void
}

export default function CustomCard({
  header,
  content,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  onClick,
}: CustomCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'relative flex flex-col overflow-visible shadow-sm bg-background p-0',
        className
      )}
    >
      {/* Header — only rendered if passed */}
      {header && (
        <CardHeader className={cn('p-0 rounded-fluid', headerClassName)}>
          {header}
        </CardHeader>
      )}

      {/* Content — only rendered if passed */}
      {content && (
        <CardContent
          className={cn('flex-1 px-6 py-4 relative z-10', contentClassName)}
        >
          {content}
        </CardContent>
      )}

      {/* Footer — only rendered if passed */}
      {footer && (
        <CardFooter
          className={cn(
            'flex items-center justify-between bg-white border-t border-border/20 py-4 px-6 mt-auto',
            footerClassName
          )}
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}