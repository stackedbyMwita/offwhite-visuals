'use client'

import { ServiceRow } from '@/components/global'
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout'
import { SectionHeader } from '@/components/shared'
import CustomButton from '@/components/ui/CustomButton'
import { services } from '@/data'
import { motion } from 'framer-motion'

export default function ServicesSection() {
  return (
    <SectionWrapper
      variant="dark"
      id="services"
      className="flex flex-col"
    >
      <MaxWidthWrapper className="flex flex-col pt-24 md:pt-32 pb-24 md:pb-32">

        {/* ── Section header ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-4">
          <SectionHeader
            eyebrow="Our Services"
            heading="What Services We're Offering"
            accentWord="Services"
            description='We are a digital agency that specializes in web design, SEO, social media management.'
            align="left"
            headingClassName="max-w-lg"
          />

          {/* Right side — service count + CTA */}
          <div className="flex flex-col items-start md:items-end gap-4 shrink-0 ">
            {/* Count badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                borderColor: 'oklch(0.78 0.14 196 / 0.2)',
                backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
              }}
            >
              <span
                className="text-2xl font-black font-mono tabular-nums"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                {String(services.length).padStart(2, '0')}
              </span>
              <span
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: 'oklch(0.97 0.005 196 / 0.4)' }}
              >
                Services
              </span>
            </div>

            <CustomButton
              label="All Services"
              href="/services"
              variant="secondary"
            />
          </div>
        </div>

        {/* ── Divider ────────────────────────────────────── */}
        <motion.div
          className="h-px w-full mb-2"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              'linear-gradient(90deg, oklch(0.78 0.14 196 / 0.4) 0%, oklch(0.97 0.005 196 / 0.05) 100%)',
          }}
        />

        {/* ── Service rows ───────────────────────────────── */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: index * 0.08,
                type: 'spring',
                stiffness: 260,
                damping: 60,
              }}
            >
              <ServiceRow service={service} index={index} />
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA banner ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 60 }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 md:px-12 py-8 md:py-10 rounded-3xl border"
          style={{
            borderColor: 'oklch(0.78 0.14 196 / 0.15)',
            background:
              'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.06) 0%, oklch(0.13 0.025 196 / 0) 100%)',
          }}
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span
              className="text-xl md:text-2xl font-bold font-serif"
              style={{ color: 'var(--dark-fg)' }}
            >
              Not sure what you need?
            </span>
            <span
              className="text-sm"
              style={{ color: 'oklch(0.97 0.005 196 / 0.45)' }}
            >
              Let's talk through your project and figure it out together.
            </span>
          </div>
          <CustomButton
            label="Book a Free Call"
            href="/contact"
            className="shrink-0"
          />
        </motion.div>
      </MaxWidthWrapper>
    </SectionWrapper>
  )
}