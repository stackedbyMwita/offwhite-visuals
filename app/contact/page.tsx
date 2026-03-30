'use client'

import { useState } from 'react'
import PageHeader from '@/components/global/PageHeader'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/shared/SectionHeader'
import CustomButton from '@/components/ui/CustomButton'
import { contactPage } from '@/data/contact.data'
import { siteConfig } from '@/data/site.config'
import {
  Mail, Phone, MapPin, Clock, MessageCircle,
  CheckCircle, Send, AlertCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Form state type ──────────────────────────────────────────
type FormState = 'idle' | 'submitting' | 'success' | 'error'

// ── WhatsApp message builder ─────────────────────────────────
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
    'w-full px-4 py-3 rounded-xl border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'

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

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Alex Mwita"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="hello@yourcompany.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputBase}
                      style={{ borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>

                {/* Service selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Service You Need
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {contactPage.services.map((service) => {
                      const isSelected = selectedService === service
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceSelect(service)}
                          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none"
                          style={{
                            backgroundColor: isSelected
                              ? 'oklch(0.78 0.14 196)'
                              : 'transparent',
                            color: isSelected
                              ? 'oklch(0.13 0.025 196)'
                              : 'oklch(0.50 0.02 196)',
                            border: isSelected
                              ? '1px solid oklch(0.78 0.14 196)'
                              : '1px solid oklch(0.90 0.01 196)',
                          }}
                        >
                          {service}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Rough Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputBase}
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <option value="" disabled>Select a range...</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 – $1,000">$500 – $1,000</option>
                    <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                    <option value="$3,000 – $7,000">$3,000 – $7,000</option>
                    <option value="$7,000+">$7,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project — what you need, your timeline, and any context that would help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputBase} resize-none`}
                    style={{ borderColor: 'var(--border)' }}
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={formState === 'submitting' || formState === 'success'}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none"
                    style={{
                      backgroundColor: 'oklch(0.78 0.14 196)',
                      color: 'oklch(0.13 0.025 196)',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {formState === 'submitting' ? (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="size-4 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Opening WhatsApp...
                        </motion.span>
                      ) : formState === 'success' ? (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle size={16} />
                          Message Sent!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={15} />
                          Send via WhatsApp
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Error message */}
                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-xs text-destructive"
                      >
                        <AlertCircle size={13} />
                        Please fill in your name, email and message.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-xs text-muted-foreground">
                  Clicking send opens WhatsApp with your message pre-filled.
                  Your details are never stored or shared.
                </p>
              </form>
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