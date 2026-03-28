'use client'

import { AppLogo, FooterWordMark } from '@/components/global'
import { footerColumns } from '@/data'
import { siteConfig } from '@/data/site.config'
import { IFooterLink } from '@/types'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Link from 'next/link'

const socialIconMap: Record<string, React.ReactNode> = {
  Twitter: <User size={16} />,
  Instagram: <User size={16} />,
  Linkedin: <User size={16} />,
  Dribbble: <User size={16} />,
}

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-white/5"
      style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--dark-fg)' }}
    >

      {/* ── main footer body ──────────────────────────────── */}
      <div className="flex flex-wrap justify-between gap-12 px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20">

        {/* Left col — logo + tagline + socials */}
        <motion.div
          className="flex flex-col gap-6 max-w-xs"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 70 }}
        >
          {/* Logo — scrolled=true forces the dark-bg-safe color variant */}
          <AppLogo scrolled={false} />

          <p className="text-sm text-white/40 leading-relaxed">
            {siteConfig.tagline} Based in{' '}
            <span className="text-primary">{siteConfig.location}</span>,
            building for the world.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {siteConfig.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="flex items-center justify-center size-8 rounded-full border border-white/10 text-white/40 hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                {socialIconMap[social.icon]}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right col — link columns */}
        <motion.div
          className="flex flex-wrap gap-12 md:gap-20"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 70 }}
        >
          {footerColumns.map((column, i) => (
            <div key={i} className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link: IFooterLink, j: number) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── bottom bar ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-16 lg:px-24 xl:px-32 py-5 border-t border-white/5">
        <p className="text-xs text-white/25">
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-white/40">{siteConfig.name}</span>. All rights
          reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-xs text-white/25 hover:text-primary transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs text-white/25 hover:text-primary transition-colors duration-300"
          >
            Terms of Service
          </Link>
        </div>
      </div>
      <FooterWordMark size="lg" /> 
    </footer>
  )
}