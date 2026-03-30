import { CTABanner, PageHeader, ServicePageRow } from '@/components/global'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { services, servicesPage, siteConfig } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Services — ${siteConfig.name}`,
  description: servicesPage.description,
}

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <PageHeader
        eyebrow="Our Services"
        heading={servicesPage.headline}
        accentWord="Offer"
        description={servicesPage.description}
      >
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-full border shrink-0"
          style={{
            borderColor: 'oklch(0.78 0.14 196 / 0.2)',
            backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
          }}
        >
          <span
            className="text-3xl font-black font-mono tabular-nums"
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
      </PageHeader>

      {/* ── Services list ─────────────────────────────────── */}
      {services.map((service, i) => (
        <SectionWrapper variant="dark" id="services-list" className="flex flex-col" key={service.slug}>
        <MaxWidthWrapper className="">
            <ServicePageRow service={service} index={i} />
        </MaxWidthWrapper>
      </SectionWrapper>
      ))}

      {/* ── CTA banner ────────────────────────────────────── */}
      <SectionWrapper variant="dark" id="services-list" className="flex flex-col">
        <MaxWidthWrapper className="flex flex-col gap-0 p-12">
          <CTABanner
            variant="dark"
            heading="Not sure which service fits?"
            body="Let's have a free 30-minute call and figure it out together."
            buttonLabel="Book a Free Call"
            buttonHref="/contact"
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}