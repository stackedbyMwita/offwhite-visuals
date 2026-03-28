'use client'

import { IClientLogo } from '@/types'
import { cn } from '@/lib/utils'
import Marquee from 'react-fast-marquee'

interface ClientLogosMarqueeProps {
  className?: string
  logos: IClientLogo[]
  speed?: number
}

export default function ClientLogosMarquee({
  className,
  logos,
  speed = 35,
}: ClientLogosMarqueeProps) {
  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <Marquee
        gradient
        gradientWidth={800}
        gradientColor="var(--background)"
        speed={speed}
        pauseOnHover
      >
        <div className="flex items-center gap-32">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center grayscale opacity-40 hover:opacity-70 hover:grayscale-0 transition-all duration-300 select-none"
            >
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <div className='flex items-center gap-2'>
                  <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-2xl font-bold tracking-widest font-inter text-foreground">
                  {logo.name}
                </span>  
                </div>
              ) : (
                <span className="text-2xl font-bold tracking-widest font-inter text-foreground">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}