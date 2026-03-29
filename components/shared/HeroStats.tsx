'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { cn } from '@/lib/utils'
import { IStat } from '@/types'

interface HeroStatsProps {
  stats: IStat[]
  className?: string
}

export default function HeroStats({ stats, className }: HeroStatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div
      ref={ref}
      className={cn('flex items-center divide-x divide-white/10', className)}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 px-6 first:pl-0 last:pr-0"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-primary leading-none tabular-nums">
            
            {isInView ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2.2}
                delay={i * 0.15}
                useEasing
                easingFn={(t, b, c, d) =>
                  t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
                }
              />
            ) : (
              '0'
            )}
            {stat.suffix}
          </h1>
          <span className="text-[11px] text-white/40 tracking-widest leading-tight max-w-22.5">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}