import { IProject } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedProjectCardProps {
  project: IProject
}

export default function RelatedProjectCard({ project }: RelatedProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="flex gap-4 p-4 rounded-2xl border border-border/40 bg-background hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-500">

        {/* Thumbnail */}
        <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="80px"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5">
            {project.category.slice(0, 1).map((cat) => (
              <span
                key={cat}
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="text-sm font-bold font-serif leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-auto">
            {project.tagline}
          </p>
        </div>

        <ArrowUpRight
          size={14}
          className="shrink-0 self-start mt-1 text-border group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </div>
    </Link>
  )
}