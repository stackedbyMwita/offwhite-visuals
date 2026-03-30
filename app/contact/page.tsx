'use client'

import ContactForm from '@/components/forms/ContactForm'
import PageHeader from '@/components/global/PageHeader'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/shared/SectionHeader'
import CustomButton from '@/components/ui/CustomButton'
import { contactPage } from '@/data/contact.data'
import { siteConfig } from '@/data/site.config'
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react'
import { useState } from 'react'

// Form state type
type FormState = 'idle' | 'submitting' | 'success' | 'error'

// WhatsApp message builder
function buildWhatsAppUrl(data: {
  name: string
  email: string
  service: string
  budget: string
  message: string
}) {
  const number = contactPage.whatsapp.replace(/\D/g, '')
  const text = encodeURIComponent(
    `Hi, I'm ${data.name} (${data.email}).\n\n` +
    `*Service:* ${data.service}\n` +
    `*Budget:* ${data.budget}\n\n` +
    `*Message:*\n${data.message}`
  )
  return `https://wa.me/${number}?text=${text}`
}

// ── Info card ────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/40 bg-background hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group">
      <div
        className="size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/15"
        style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.08)' }}
      >
        <Icon size={18} style={{ color: 'oklch(0.78 0.14 196)' }} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 truncate">
          {value}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

// ── Main page ────────────────────────────────────────────────
export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setFormData((prev) => ({ ...prev, service }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 3000)
      return
    }

    setFormState('submitting')

    // Build WhatsApp URL and open it
    const url = buildWhatsAppUrl(formData)

    setTimeout(() => {
      window.open(url, '_blank')
      setFormState('success')
    }, 800)
  }

  const inputBase =
    'w-full h-11 px-4 rounded-md border border-border bg-background text-sm ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'

  return (
    <>
      {/* ── Page header ───────────────────────────────────── */}
      <PageHeader
        eyebrow="Contact"
        heading={contactPage.headline}
        accentWord="Something"
        description={contactPage.subheadline}
        align="left"
      >
        {/* Availability badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full border mt-2"
          style={{
            borderColor: 'oklch(0.78 0.14 196 / 0.2)',
            backgroundColor: 'oklch(0.78 0.14 196 / 0.06)',
          }}
        >
          <span className="relative flex size-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: 'oklch(0.78 0.14 196)' }}
            />
            <span
              className="relative inline-flex rounded-full size-2"
              style={{ backgroundColor: 'oklch(0.78 0.14 196)' }}
            />
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: 'oklch(0.97 0.005 196 / 0.7)' }}
          >
            {contactPage.availability}
          </span>
        </div>
      </PageHeader>

      {/* ── Main content ──────────────────────────────────── */}
      <SectionWrapper variant="light" className="flex flex-col">
        <MaxWidthWrapper className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

            {/* ── Left — form ───────────────────────────── */}
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Send a Message"
                heading="Tell Us About Your Project"
                accentWord="Project"
                align="left"
                className="mb-10"
              />
              <ContactForm />
            </div>

            {/* ── Right — info + direct contacts ────────── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">

              {/* Response time callout */}
              <div
                className="flex items-center gap-4 p-5 rounded-2xl border"
                style={{
                  borderColor: 'oklch(0.78 0.14 196 / 0.2)',
                  backgroundColor: 'oklch(0.78 0.14 196 / 0.04)',
                }}
              >
                <div
                  className="size-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'oklch(0.78 0.14 196 / 0.12)' }}
                >
                  <Clock size={18} style={{ color: 'oklch(0.78 0.14 196)' }} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'oklch(0.78 0.14 196)' }}
                  >
                    Response time
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {contactPage.responseTime}
                  </span>
                </div>
              </div>

              {/* Contact info cards */}
              <div className="flex flex-col gap-3">
                <InfoCard
                  icon={MessageCircle}
                  label="WhatsApp"
                  value={contactPage.whatsapp}
                  href={`https://wa.me/${contactPage.whatsapp.replace(/\D/g, '')}`}
                />
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={contactPage.email}
                  href={`mailto:${contactPage.email}`}
                />
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={contactPage.phone}
                  href={`tel:${contactPage.phone}`}
                />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={contactPage.location}
                  href={contactPage.locationUrl}
                />
              </div>

              {/* Direct WhatsApp CTA */}
              <div
                className="flex flex-col gap-4 p-6 rounded-2xl border"
                style={{
                  borderColor: 'oklch(0.78 0.14 196 / 0.15)',
                  background: 'linear-gradient(135deg, oklch(0.78 0.14 196 / 0.06) 0%, transparent 100%)',
                }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prefer to skip the form? Send a direct WhatsApp message
                  and get a response within a few hours.
                </p>
                <CustomButton
                  label="Open WhatsApp"
                  href={`https://wa.me/${contactPage.whatsapp.replace(/\D/g, '')}`}
                  icon={MessageCircle}
                  variant="primary"
                  fullWidth
                />
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Find us online
                </p>
                <div className="flex items-center gap-2">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="flex items-center justify-center size-10 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                    >
                      <span className="text-[10px] font-bold font-mono">
                        {social.name.slice(0, 2).toUpperCase()}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  )
}