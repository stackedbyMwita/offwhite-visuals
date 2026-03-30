import CustomCard from '@/components/ui/CustomCard'
import { formatDate, getCategoryColor } from '@/lib/utils'
import { IBlogPost } from '@/types'
import { ArrowUpRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: IBlogPost
  variant?: 'large' | 'default' | 'compact'
}

// ── Shared sub-components ────────────────────────────────────
const CardArrow = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <ArrowUpRight
    size={size}
    className={`shrink-0 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${className}`}
  />
)

const MetaInfo = ({
  date,
  time,
  size = 10,
}: {
  date: string
  time: number
  size?: number
}) => (
  <div
    className="flex items-center gap-2 text-muted-foreground"
    style={{ fontSize: size }}
  >
    <span>{formatDate(date)}</span>
    <span>·</span>
    <span className="flex items-center gap-1">
      {size > 0 && <Clock size={size} />}
      {time} min read
    </span>
  </div>
)

// ── Large ────────────────────────────────────────────────────
function LargeCard({ post }: { post: IBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <CustomCard
        className="h-full hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
        header={
          <div className="relative w-full aspect-16/10 overflow-hidden rounded-t-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute top-4 left-4">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(6,182,212,0.85)',
                  color: 'oklch(0.13 0.025 196)',
                }}
              >
                {post.category}
              </span>
            </div>
          </div>
        }
        content={
          <div className="flex flex-col gap-3 pt-2 flex-1">
            <MetaInfo date={post.publishedAt} time={post.readingTime} size={11} />

            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 flex-1">
                {post.title}
              </h2>
              <CardArrow size={18} className="mt-0.5" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          </div>
        }
        footer={
          <div className="flex flex-wrap gap-1.5 w-full">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        }
      />
    </Link>
  )
}

// ── Compact — horizontal, no CustomCard needed ───────────────
function CompactCard({ post }: { post: IBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex gap-4 p-4 rounded-xl border border-border/40 bg-background hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-500">
        <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="80px"
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: getCategoryColor(post.category) }}
          >
            {post.category}
          </span>
          <h3 className="text-sm font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-auto">
            <MetaInfo date={post.publishedAt} time={post.readingTime} size={10} />
          </div>
        </div>
        <CardArrow size={14} className="self-start mt-1" />
      </div>
    </Link>
  )
}

// ── Default ──────────────────────────────────────────────────
function DefaultCard({ post }: { post: IBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <CustomCard
        className="hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
        header={
          <div className="relative w-full aspect-video overflow-hidden rounded-t-fluid">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
          </div>
        }
        content={
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-fluid-sm"
                style={{ 
                  color: getCategoryColor(post.category), 
                  // This mixes 10% of your color with 90% transparency
                  backgroundColor: `color-mix(in oklch, ${getCategoryColor(post.category)}, transparent 90%)`,
                  // Optional: add a very subtle border for that "Offwhite" premium feel
                  border: `1px solid color-mix(in oklch, ${getCategoryColor(post.category)}, transparent 80%)`
                }}
              >
                {post.category}
              </span>
              <MetaInfo date={post.publishedAt} time={post.readingTime} size={9} />
            </div>

            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">
                {post.title}
              </h4>
              <CardArrow size={15} className="mt-0.5" />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        }
        footer={
          <>
            <span className="text-[10px] text-muted-foreground">
              {formatDate(post.publishedAt)}
            </span>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-1.5 py-0.5 rounded border border-border text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </>
        }
      />
    </Link>
  )
}

// ── Main export ──────────────────────────────────────────────
const VARIANTS = { large: LargeCard, compact: CompactCard, default: DefaultCard }

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const Component = VARIANTS[variant]
  return <Component post={post} />
}