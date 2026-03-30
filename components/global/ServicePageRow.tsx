import { IService } from '@/types'
import { ArrowUpRight, CheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ServicePageRowProps {
  service: IService
  index: number
}

export default function ServicePageRow({ service, index }: ServicePageRowProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 md:py-16 transition-all duration-300"
        style={{ borderColor: 'oklch(0.97 0.005 196 / 0.07)' }}
      >

        {/* ── Left — number + title + description + CTA ── */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Number row */}
          <div className="flex items-center gap-4">
            <span
              className="text-xs font-black font-mono tracking-widest shrink-0"
              style={{ color: 'oklch(0.78 0.14 196 / 0.4)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div
              className="h-px flex-1"
              style={{ background: 'oklch(0.97 0.005 196 / 0.08)' }}
            />
          </div>

          {/* Title */}
          <h2
            className="text-3xl md:text-4xl font-bold font-serif tracking-tight leading-tight group-hover:text-primary transition-colors duration-300"
            style={{ color: 'var(--dark-fg)' }}
          >
            {service.title}
          </h2>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'oklch(0.97 0.005 196 / 0.5)' }}
          >
            {service.shortDescription}
          </p>

          {/* Visual CTA — div styled as button, not an <a> */}
          <div className="mt-2 w-fit">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground"
              style={{
                backgroundColor: 'oklch(0.78 0.14 196 / 0.1)',
                color: 'oklch(0.78 0.14 196)',
                border: '1px solid oklch(0.78 0.14 196 / 0.25)',
              }}
            >
              View Service
              <ArrowUpRight
                size={14}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>

        {/* ── Middle — features list ─────────────────────── */}
        <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
            style={{ color: 'oklch(0.78 0.14 196 / 0.5)' }}
          >
            What's included
          </p>

          <ul className="flex flex-col gap-2.5">
            {service.features.slice(0, 4).map((feature, j) => (
              <li key={j} className="flex items-center gap-3">
                <div
                  className="size-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/20"
                  style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.1)' }}
                >
                  <CheckIcon
                    size={9}
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                    strokeWidth={3}
                  />
                </div>
                <span
                  className="text-sm"
                  style={{ color: 'oklch(0.97 0.005 196 / 0.6)' }}
                >
                  {feature}
                </span>
              </li>
            ))}

            {service.features.length > 4 && (
              <li
                className="text-xs pl-7"
                style={{ color: 'oklch(0.78 0.14 196 / 0.5)' }}
              >
                +{service.features.length - 4} more included
              </li>
            )}
          </ul>
        </div>

        {/* ── Right — hero image + arrow ─────────────────── */}
        <div className="lg:col-span-3 flex flex-col gap-4 justify-between">

          {/* Image */}
          <div className="relative w-full aspect-4/3 rounded-fluid overflow-hidden">
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors duration-500" />

            {/* Top cyan edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Arrow */}
          <div className="flex justify-end">
            <div
              className="flex items-center justify-center size-10 rounded-full border transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10"
              style={{ borderColor: 'oklch(0.97 0.005 196 / 0.12)' }}
            >
              <ArrowUpRight
                size={16}
                className="transition-all duration-300 group-hover:text-primary group-hover:rotate-45"
                style={{ color: 'oklch(0.97 0.005 196 / 0.4)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}