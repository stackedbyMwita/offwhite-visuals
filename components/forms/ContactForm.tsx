'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { contactPage } from '@/data'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'

// ── Schema ─────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  service: z.string().min(1, 'Select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message too short'),
})

type FormValues = z.infer<typeof formSchema>

// ── Unified styling ─────────────────────────────────────
const fieldBase =
  'w-full h-11 px-4 rounded-fluid border border-border bg-background text-sm ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors'

const textareaBase = cn(fieldBase, 'h-auto min-h-[120px] py-3 resize-none')

// ── WhatsApp builder ───────────────────────────────────
function buildWhatsAppUrl(data: FormValues) {
  const number = contactPage.whatsapp.replace(/\D/g, '')
  const text = encodeURIComponent(
    `Hi, I'm ${data.name} (${data.email}).\n\n` +
    `*Service:* ${data.service}\n` +
    `*Budget:* ${data.budget || 'Not specified'}\n\n` +
    `*Message:*\n${data.message}`
  )
  return `https://wa.me/${number}?text=${text}`
}

// ── Component ─────────────────────────────────────────
export default function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      budget: '',
      message: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    setFormState('submitting')

    const url = buildWhatsAppUrl(data)

    setTimeout(() => {
      window.open(url, '_blank')
      setFormState('success')
      setTimeout(() => setFormState('idle'), 3000)
    }, 800)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input {...field} className={fieldBase} placeholder="Alex Mwita" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className={fieldBase} placeholder="hello@yourcompany.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Service selection */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service You Need *</FormLabel>
              <div className="flex flex-wrap gap-2">
                {contactPage.services.map((service) => {
                  const selected = field.value === service
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => field.onChange(service)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none',
                        selected
                          ? 'bg-primary text-primary-foreground border border-primary'
                          : 'bg-transparent text-muted-foreground border border-border/50'
                      )}
                    >
                      {service}
                    </button>
                  )
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Budget */}
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rough Budget</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={fieldBase}>
                    <SelectValue placeholder="Select a range..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under $500">Under $500</SelectItem>
                    <SelectItem value="$500 – $1,000">$500 – $1,000</SelectItem>
                    <SelectItem value="$1,000 – $3,000">$1,000 – $3,000</SelectItem>
                    <SelectItem value="$3,000 – $7,000">$3,000 – $7,000</SelectItem>
                    <SelectItem value="$7,000+">$7,000+</SelectItem>
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message *</FormLabel>
              <FormControl>
                <Textarea {...field} className={textareaBase} placeholder="Tell me about your project..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

          <AnimatePresence>
            {formState === 'error' && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-destructive"
              >
                <AlertCircle size={13} />
                Please fill in all required fields.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className="text-xs text-muted-foreground">
          Clicking send opens WhatsApp with your message pre-filled. Your details are never stored or shared.
        </p>
      </form>
    </Form>

  )
}