'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CustomButton from '@/components/ui/CustomButton'
import { ArrowLeft } from 'lucide-react'
import { IBlogPost } from '@/types'

interface BlogSidebarProps {
  post: IBlogPost
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogSidebar({ post }: BlogSidebarProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [reachedBottom, setReachedBottom] = useState(false)

  useEffect(() => {
    // Sticky — fires when the top of the article scrolls past the navbar
    const topSentinel = document.getElementById('article-top-sentinel')
    const bottomSentinel = document.getElementById('article-bottom-sentinel')

    const topObserver = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { rootMargin: '-112px 0px 0px 0px', threshold: 0 }
    )

    const bottomObserver = new IntersectionObserver(
      ([entry]) => setReachedBottom(entry.isIntersecting),
      { threshold: 0 }
    )

    if (topSentinel) topObserver.observe(topSentinel)
    if (bottomSentinel) bottomObserver.observe(bottomSentinel)

    return () => {
      topObserver.disconnect()
      bottomObserver.disconnect()
    }
  }, [])

  const stickyClass =
    isSticky && !reachedBottom ? 'lg:sticky lg:top-28' : 'relative'

  return (
    <aside className="lg:col-span-4">
      <div className={`flex flex-col gap-6 transition-[top] duration-300 ${stickyClass}`}>

        {/* ── Author card ─────────────────────────────── */}
        <div
          className="flex flex-col gap-4 p-5 rounded-2xl border"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--secondary)',
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'oklch(0.78 0.14 196)' }}
          >
            Written by
          </p>

          <div className="flex items-center gap-3">
            <div className="relative size-12 rounded-xl overflow-hidden shrink-0 border border-border/30">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-foreground">
                {post.author.name}
              </span>
              <span className="text-xs text-primary">
                {post.author.role}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {post.author.bio}
          </p>

          <div className="flex items-center gap-2 pt-1">
            {post.author.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="flex items-center justify-center size-7 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              >
                <span className="text-[9px] font-bold font-mono">
                  {s.name.slice(0, 2).toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Article info ────────────────────────────── */}
        <div
          className="flex flex-col gap-3 p-5 rounded-2xl border"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--secondary)',
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'oklch(0.78 0.14 196)' }}
          >
            Article info
          </p>

          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Published</span>
              <span className="font-medium text-foreground">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Category</span>
              <span
                className="font-medium"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                {post.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Reading time</span>
              <span className="font-medium text-foreground">
                {post.readingTime} min
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
            {post.tags.map((tag) => (
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

        {/* ── Back button ─────────────────────────────── */}
        <CustomButton
          label="Back to Blog"
          href="/blog"
          variant="outline"
          icon={ArrowLeft}
          iconPosition="left"
          fullWidth
        />
      </div>
    </aside>
  )
}