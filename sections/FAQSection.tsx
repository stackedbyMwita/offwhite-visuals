'use client'

import { MaxWidthWrapper, SectionWrapper } from '@/components/layout'
import { SectionHeader } from '@/components/shared'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data'
import { motion } from 'framer-motion'

export default function FAQSection() {
  return (
    <SectionWrapper
      variant="light"
      id="faq"
      className="flex flex-col"
      
    >
      <MaxWidthWrapper className="flex flex-col pt-24 md:pt-32 pb-24 md:pb-32">

        {/* ── Two column layout ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left — sticky header ──────────────────────── */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-8">
            <SectionHeader
              eyebrow="FAQ"
              heading="Frequently Asked Questions"
              accentWord="Questions"
              description="Everything you need to know before we start working together. Can't find your answer? Reach out directly."
              align="left"
            />

            {/* Contact nudge card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 60 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-border/50 bg-secondary/40"
            >
              {/* Pulsing dot + label */}
              <div className="flex items-center gap-2">
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
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'oklch(0.78 0.14 196)' }}
                >
                  Available now
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Still have questions? We typically respond within a few hours
                on WhatsApp.
              </p>

              <a
                href="https://wa.me/254718521808"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 w-fit group"
                style={{ color: 'oklch(0.78 0.14 196)' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 fill-current shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
                <svg
                  className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>

            {/* FAQ count */}
            <div className="flex items-center gap-3">
              <div
                className="h-px flex-1"
                style={{
                  background:
                    'linear-gradient(90deg, oklch(0.78 0.14 196 / 0.4) 0%, transparent 100%)',
                }}
              />
              <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground">
                {String(faqs.length).padStart(2, '0')} QUESTIONS
              </span>
            </div>
          </div>

          {/* ── Right — accordion ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 60 }}
          >
            <Accordion type="single" collapsible className="flex flex-col gap-0">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.05 * i,
                    type: 'spring',
                    stiffness: 260,
                    damping: 60,
                  }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border-b border-border/50 last:border-b-0 group/item"
                  >
                    <AccordionTrigger
                      className="flex items-center justify-between w-full py-6 text-left gap-6 hover:no-underline data-[state=open]:text-primary transition-colors duration-200 group/trigger"
                    >
                      {/* Question number + text */}
                      <div className="flex items-start gap-4 min-w-0">
                        <span
                          className="text-[11px] tabular-nums mt-0.5 shrink-0 transition-colors duration-200"
                          style={{
                            color: 'oklch(0.78 0.14 196 / 0.5)',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg font-sans text-foreground group-data-[state=open]/trigger:text-primary transition-colors duration-200">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-6 pl-9 pr-12">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  )
}