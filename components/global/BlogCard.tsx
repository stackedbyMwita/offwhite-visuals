import { IBlogPost } from '@/types'
import { ArrowUpRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  post: IBlogPost
  variant?: 'large' | 'default' | 'compact'
}

// ── Category color ───────────────────────────────────────────
const categoryColor: Record<string, string> = {
  Design:               '#06b6d4',
  Development:          '#06b6d4',
  Branding:             '#06b6d4',
  Strategy:             '#06b6d4',
  'Case Study':         '#06b6d4',
  'Behind the Scenes':  '#06b6d4',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ── Large card — hero size ───────────────────────────────────
function LargeCard({ post }: { post: IBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="relative flex flex-col h-full rounded-2xl border border-border/40 bg-background overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">

        {/* Image */}
        <div className="relative w-full aspect-16/10 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Category badge on image */}
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

        {/* Content */}
        <div className="flex flex-col gap-3 p-6 flex-1">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {post.readingTime} min read
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 flex-1">
              {post.title}
            </h2>
            <ArrowUpRight
              size={18}
              className="shrink-0 mt-0.5 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/40">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--muted-foreground)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Compact card — horizontal layout ────────────────────────
function CompactCard({ post }: { post: IBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex gap-4 p-4 rounded-2xl border border-border/40 bg-background hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-500">

        {/* Thumbnail */}
        <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="80px"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: categoryColor[post.category] ?? '#06b6d4' }}
          >
            {post.category}
          </span>

          <h3 className="text-sm font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-auto">
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readingTime} min</span>
          </div>
        </div>

        <ArrowUpRight
          size={14}
          className="shrink-0 self-start mt-1 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </div>
    </Link>
  )
}

// ── Default card — standard grid card ────────────────────────
function DefaultCard({ post }: { post: IBlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex flex-col rounded-2xl border border-border/40 bg-background overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">

        {/* Image */}
        <div className="relative w-full aspect-16/9 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: categoryColor[post.category] ?? '#06b6d4' }}
            >
              {post.category}
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock size={9} />
              {post.readingTime} min
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1">
              {post.title}
            </h3>
            <ArrowUpRight
              size={15}
              className="shrink-0 mt-0.5 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-border/40">
            <span className="text-[10px] text-muted-foreground">
              {formatDate(post.publishedAt)}
            </span>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-1.5 py-0.5 rounded border"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Main export ──────────────────────────────────────────────
export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'large')   return <LargeCard   post={post} />
  if (variant === 'compact') return <CompactCard post={post} />
  return                            <DefaultCard post={post} />
}