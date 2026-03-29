'use client'

import { MaxWidthWrapper, SectionWrapper } from "@/components/layout"
import { ClientLogosMarquee, SectionHeader } from "@/components/shared"
import CustomButton from "@/components/ui/CustomButton"
import { clientLogos } from "@/data"
import Image from "next/image"

export default function AboutSection() {
  return (
    <SectionWrapper
      variant="light"
      id="about"
      className="flex flex-col"
    >
      

      {/* ── Main content ──────────────────────────────── */}
      <MaxWidthWrapper className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — image */}
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-xl border border-border/20 group">
            <Image
              src="/assets/sections/about-2.png"
              alt="Offwhite Visuals team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700" />
          </div>

          {/* Right — content */}
          <div className="flex flex-col">
            <SectionHeader
              eyebrow="About Us"
              heading="Why You Should Choose Offwhite"
              accentWord="Offwhite"
              description="We are a creative digital studio specialising in UI/UX design, full-stack development, and brand identity. Our experienced team works closely with clients to deliver solutions that are not just functional — they are memorable."
              align="left"
            />
            <CustomButton
              label="Learn More"
              href="/about"
              className="mt-8 w-fit"
            />
          </div>
        </div>
      </MaxWidthWrapper>
      {/* ── Logos marquee — full bleed, no max-width ── */}
      <div className="pb-16 md:pb-24">
        <ClientLogosMarquee logos={clientLogos} />
      </div>
    </SectionWrapper>
  )
}