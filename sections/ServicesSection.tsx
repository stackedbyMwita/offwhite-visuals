'use client'

import { ServiceRow } from '@/components/global'
import CTABanner from '@/components/global/CTABanner'
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout'
import { SectionHeader, SkillsMarquee } from '@/components/shared'
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
      <MaxWidthWrapper className="flex flex-col pt-24 md:pt-32 pb-12">

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

        <CTABanner
          variant="dark"
          heading="Not sure what you need?"
          body="Let's talk through your project and figure it out together."
          buttonLabel="Book a Free Call"
          buttonHref="/contact"
          className="my-12"
        />
        
      </MaxWidthWrapper>
      <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 60 }}
          className=""
        >
          <SkillsMarquee/>
        </motion.div>
    </SectionWrapper>
  )
}