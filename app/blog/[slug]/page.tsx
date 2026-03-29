import { BlogSidebar, CTABanner } from '@/components/global'
import PageHeader from '@/components/global/PageHeader'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import CustomButton from '@/components/ui/CustomButton'
import { blogPosts } from '@/data/blog.data'
import { siteConfig } from '@/data/site.config'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// ── Static params from data layer ────────────────────────────
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

// ── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.excerpt,
  }
}

// ── Format date ───────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ── Page ──────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  // Dynamically import the MDX file for this slug
  let MDXContent: React.ComponentType | null = null
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`)
    MDXContent = mod.default
  } catch {
    // MDX file not found — render post without body
    MDXContent = null
  }

  // Related posts — same category, exclude current
  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2)

  return (
    <>
      {/* ── Page header ─────────────────────────────────── */}
      <PageHeader
        eyebrow={post.category}
        heading={post.title}
        accentWord={post.title.split(' ')[6]}
        description={post.excerpt}
        align="left"
      >
        {/* Meta row inside children slot */}
        <div className="flex flex-wrap items-center gap-4 mt-2">
          {/* Date */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
              color: 'oklch(0.97 0.005 196 / 0.6)',
            }}
          >
            <Calendar size={11} />
            {formatDate(post.publishedAt)}
          </div>

          {/* Reading time */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
            style={{
              borderColor: 'oklch(0.78 0.14 196 / 0.2)',
              backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
              color: 'oklch(0.97 0.005 196 / 0.6)',
            }}
          >
            <Clock size={11} />
            {post.readingTime} min read
          </div>

          {/* Tags */}
          {post.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs"
              style={{
                borderColor: 'oklch(0.97 0.005 196 / 0.1)',
                backgroundColor: 'oklch(0.97 0.005 196 / 0.04)',
                color: 'oklch(0.97 0.005 196 / 0.5)',
              }}
            >
              <Tag size={9} />
              {tag}
            </div>
          ))}
        </div>
      </PageHeader>

      {/* ── Cover image ─────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col pb-0">
        <MaxWidthWrapper className="pt-12 pb-0">
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border border-border/20">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Article body ────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── Main article ──────────────────────────── */}
            <article className="lg:col-span-8 min-w-0">
              {/* Top sentinel — sidebar goes sticky when this leaves viewport */}
              <div id="article-top-sentinel" className="h-0 w-full" />

              {MDXContent ? (
                <div className="mdx-content">
                  <MDXContent />
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  Content coming soon.
                </p>
              )}

              {/* Bottom sentinel — sidebar unsticks when this enters viewport */}
              <div id="article-bottom-sentinel" className="h-4 w-full mt-16" />
            </article>

            {/* ── Sidebar ───────────────────────────────── */}
            <BlogSidebar post={post} />
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>

      {/* ── Related posts ───────────────────────────────── */}
      {related.length > 0 && (
        <SectionWrapper variant="light" className="flex flex-col pb-0">
          <MaxWidthWrapper className="pb-16">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                More in {post.category}
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-4 p-4 rounded-2xl border border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: 'oklch(0.78 0.14 196)' }}
                    >
                      {p.category}
                    </span>
                    <h3 className="text-sm font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {p.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground mt-auto">
                      {p.readingTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </MaxWidthWrapper>
        </SectionWrapper>
      )}

      {/* ── CTA ─────────────────────────────────────────── */}
      <SectionWrapper variant="dark">
        <MaxWidthWrapper>
          <CTABanner
            variant="dark"
            heading="Enjoyed this article?"
            body="We write about design, development, and craft. Follow along for more."
            buttonLabel="See All Posts"
            buttonHref="/blog"
            className='my-12'
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}