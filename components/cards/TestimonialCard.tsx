'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ITestimonial } from "@/types"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  testimonial: ITestimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={12}
        className={i < testimonial.rating ? 'text-yellow-400' : 'text-border'}
        fill={i < testimonial.rating ? 'currentColor' : 'none'}
      />
    ))

  return (
    <div className="pt-8 px-2 h-full">
      <Card className="relative h-80 flex flex-col overflow-visible shadow-sm bg-background">

        {/* Avatar — initials fallback when no image */}
        <div className="absolute -top-8 left-8 size-16 rounded-fluid overflow-hidden border-4 border-background shadow-lg z-20 bg-primary">
          {testimonial.avatar ? (
            <Image
              src={`/assets/avatars/${testimonial.avatar}`}
              alt={testimonial.author}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/15">
              <span className="text-white font-bold text-lg font-serif">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Decorative quote mark */}
        <div className="absolute top-12 left-10 text-primary/20 z-0 select-none">
          <span className="text-8xl font-serif leading-none">"</span>
        </div>

        <CardContent className="pt-24 flex-1 px-8 relative z-10">
          <p className="text-muted-foreground leading-relaxed text-sm">
            "{testimonial.quote}"
          </p>
        </CardContent>

        <CardFooter className="flex items-center bg-white justify-between border-t border-border/20 py-5 px-8 mt-auto">
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-foreground text-sm leading-tight">
              {testimonial.author}
            </span>
            <span className="text-[10px] text-primary ">
              {testimonial.role}, {testimonial.company}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {renderStars()}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
