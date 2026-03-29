import { DEFAULT_THEME_COLOR, formatDate, getCategoryColor } from '@/lib/utils'
import { IBlogPost } from '@/types'
import { ArrowUpRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: IBlogPost
  variant?: 'large' | 'default' | 'compact'
}

// ── Shared Sub-Components ───────────────────────────────────

const CardArrow = ({ size = 18, className = "" }) => (
  <ArrowUpRight
    size={size}
    className={`shrink-0 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${className}`}
  />
)

const MetaInfo = ({ date, time, size = 10 }: { date: string; time: number; size?: number }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <span>{formatDate(date)}</span>
    <span>·</span>
    <span className="flex items-center gap-1">
      <Clock size={size} />
      {time} min {size === 9 ? '' : 'read'}
    </span>
  </div>
)

// ── Component Variants ──────────────────────────────────────

function LargeCard({ post }: { post: IBlogPost }) {
  const { coverImage, title, publishedAt, readingTime, excerpt, category, slug, tags } = post

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="relative flex flex-col h-full rounded-2xl border border-border/40 bg-background overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
        <div className="relative w-full aspect-16/10 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(6,182,212,0.85)', color: 'oklch(0.13 0.025 196)' }}
            >
              {category}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-6 flex-1">
          <div className="text-[11px]">
             <MetaInfo date={publishedAt} time={readingTime} />
          </div>

          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 flex-1">
              {title}
            </h2>
            <CardArrow size={18} className="mt-0.5" />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/40">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

function CompactCard({ post }: { post: IBlogPost }) {
  const { coverImage, title, publishedAt, readingTime, category, slug } = post
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="flex gap-4 p-4 rounded-2xl border border-border/40 bg-background hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-500">
        <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
          <Image src={coverImage} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="80px" />
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: getCategoryColor(category) }}>
            {category}
          </span>
          <h3 className="text-sm font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <div className="text-[10px] mt-auto">
             <MetaInfo date={publishedAt} time={readingTime} size={0} /> {/* size 0 to hide clock icon if desired, or pass specific size */}
          </div>
        </div>
        <CardArrow size={14} className="self-start mt-1" />
      </div>
    </Link>
  )
}

function DefaultCard({ post }: { post: IBlogPost }) {
  const { coverImage, title, publishedAt, readingTime, excerpt, category, slug, tags } = post
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="flex flex-col rounded-2xl border border-border/40 bg-background overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image src={coverImage} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: getCategoryColor(category) }}>
              {category}
            </span>
            <MetaInfo date={publishedAt} time={readingTime} size={9} />
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">
              {title}
            </h3>
            <CardArrow size={15} className="mt-0.5" />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{excerpt}</p>

          <div className="flex items-center justify-between pt-3 mt-1 border-t border-border/40">
            <span className="text-[10px] text-muted-foreground">{formatDate(publishedAt)}</span>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Main export ──────────────────────────────────────────────

const VARIANTS = {
  large: LargeCard,
  compact: CompactCard,
  default: DefaultCard,
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const Component = VARIANTS[variant]
  return <Component post={post} />
}
