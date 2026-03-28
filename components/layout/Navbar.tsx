'use client'

import { AppLogo } from '@/components/global'
import CustomButton from '@/components/ui/CustomButton'
import { navLinks, siteConfig } from '@/data'
import { INavLink } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// ── Individual nav link ──────────────────────────────────────
function NavLink({
  link,
  scrolled,
  pathname,
}: {
  link: INavLink
  scrolled: boolean
  pathname: string
}) {
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isHomepage = pathname === '/'

  // Active state — section links are active when on homepage,
  // page links are active when pathname matches
  const isActive = link.isSection
    ? isHomepage
    : pathname === link.href

  const handleSectionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const sectionId = link.href.replace('#', '')

    if (isHomepage) {
      // Already on homepage — scroll directly
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate to homepage with scroll target in query
      router.push(`/?scrollTo=${sectionId}`)
    }
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  const baseTextColor = scrolled
    ? 'text-foreground hover:text-primary'
    : 'text-white/80 hover:text-white'

  return (
    <div
      className="relative"
      onMouseEnter={link.isSection ? handleMouseEnter : undefined}
      onMouseLeave={link.isSection ? handleMouseLeave : undefined}
    >
      {/* Main link */}
      {link.isSection ? (
        <button
          onClick={handleSectionClick}
          className={`relative group py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${baseTextColor}`}
        >
          {link.name}

          {/* Active underline */}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-0.5 left-0 w-full h-px bg-primary"
            />
          )}

          {/* Hover underline */}
          {!isActive && (
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary/50 transition-all duration-300 group-hover:w-full" />
          )}
        </button>
      ) : (
        <Link
          href={link.href}
          className={`relative group py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${baseTextColor}`}
        >
          {link.name}

          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-0.5 left-0 w-full h-px bg-primary"
            />
          )}

          {!isActive && (
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary/50 transition-all duration-300 group-hover:w-full" />
          )}
        </Link>
      )}

      {/* Dropdown — only for section links that have a pageHref */}
      <AnimatePresence>
        {link.isSection && link.pageHref && dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Small pointer arrow */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 rounded-sm border-l border-t"
              style={{
                backgroundColor: scrolled
                  ? 'var(--background)'
                  : 'oklch(0.18 0.03 196)',
                borderColor: scrolled
                  ? 'var(--border)'
                  : 'oklch(0.97 0.005 196 / 0.1)',
              }}
            />

            {/* Dropdown card */}
            <div
              className="rounded-xl border shadow-xl shadow-black/10 px-1 py-1 min-w-40"
              style={{
                backgroundColor: scrolled
                  ? 'var(--background)'
                  : 'oklch(0.18 0.03 196)',
                borderColor: scrolled
                  ? 'var(--border)'
                  : 'oklch(0.97 0.005 196 / 0.1)',
              }}
            >
              {/* Scroll to section */}
              <button
                onClick={(e) => {
                  handleSectionClick(e)
                  setDropdownOpen(false)
                }}
                className="flex items-center justify-between gap-6 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group/item"
                style={{ color: scrolled ? 'var(--foreground)' : 'var(--dark-fg)' }}
              >
                <span
                  className="group-hover/item:text-primary transition-colors duration-150"
                >
                  {link.name} Overview
                </span>
              </button>

              {/* Divider */}
              <div
                className="mx-3 my-1 h-px"
                style={{
                  backgroundColor: scrolled
                    ? 'var(--border)'
                    : 'oklch(0.97 0.005 196 / 0.08)',
                }}
              />

              {/* Full page link */}
              <Link
                href={link.pageHref}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center justify-between gap-6 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group/page"
                style={{ color: scrolled ? 'var(--foreground)' : 'var(--dark-fg)' }}
              >
                <span className="group-hover/page:text-primary transition-colors duration-150">
                  {link.pageLabel ?? `All ${link.name}`}
                </span>
                <ArrowUpRight
                  size={13}
                  className="text-primary opacity-60 group-hover/page:opacity-100 group-hover/page:translate-x-0.5 group-hover/page:-translate-y-0.5 transition-all duration-150"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Mobile link — same logic, simpler UI ────────────────────
function MobileNavLink({
  link,
  pathname,
  onClose,
}: {
  link: INavLink
  pathname: string
  onClose: () => void
}) {
  const router = useRouter()
  const isHomepage = pathname === '/'
  const isActive = link.isSection ? isHomepage : pathname === link.href

  const handleSectionClick = () => {
    const sectionId = link.href.replace('#', '')
    onClose()
    if (isHomepage) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 350) // wait for menu close animation
    } else {
      router.push(`/?scrollTo=${sectionId}`)
    }
  }

  return (
    <div className="border-b border-white/5 last:border-b-0">
      {/* Main row */}
      {link.isSection ? (
        <button
          onClick={handleSectionClick}
          className={`flex items-center justify-between w-full py-4 text-2xl font-bold font-serif text-left transition-colors duration-200 ${
            isActive ? 'text-primary' : 'text-white/70 hover:text-white'
          }`}
        >
          {link.name}
          {isActive && <span className="size-1.5 rounded-full bg-primary" />}
        </button>
      ) : (
        <Link
          href={link.href}
          onClick={onClose}
          className={`flex items-center justify-between w-full py-4 text-2xl font-bold font-serif transition-colors duration-200 ${
            isActive ? 'text-primary' : 'text-white/70 hover:text-white'
          }`}
        >
          {link.name}
          {isActive && <span className="size-1.5 rounded-full bg-primary" />}
        </Link>
      )}

      {/* Sub-link to full page — shown for section links */}
      {link.isSection && link.pageHref && (
        <Link
          href={link.pageHref}
          onClick={onClose}
          className="flex items-center gap-1.5 pb-3 -mt-1 text-xs font-medium text-primary/60 hover:text-primary transition-colors duration-200"
        >
          <ArrowUpRight size={11} />
          {link.pageLabel ?? `View all ${link.name}`}
        </Link>
      )}
    </div>
  )
}

// ── Main Navbar ──────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Handle ?scrollTo= query param — homepage reads this on mount
  // and scrolls to the right section when navigating from another page
  useEffect(() => {
    if (pathname !== '/') return
    const params = new URLSearchParams(window.location.search)
    const scrollTo = params.get('scrollTo')
    if (!scrollTo) return

    // Small delay to ensure section has mounted
    const t = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      // Clean the query param from the URL without a reload
      window.history.replaceState({}, '', '/')
    }, 400)

    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500
          ${scrolled
            ? 'bg-white/95 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AppLogo scrolled={scrolled} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              link={link}
              scrolled={scrolled}
              pathname={pathname}
            />
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <CustomButton
            label="Let's Talk"
            href="/contact"
          />
          <CustomButton
            label="View Work"
            href="/contact"
            variant="secondary"
          />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className={`md:hidden p-1 transition-colors ${
            scrolled ? 'text-foreground' : 'text-white'
          }`}
        >
          <MenuIcon size={26} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="panel"
              className="fixed top-0 right-0 bottom-0 z-100 w-full max-w-sm flex flex-col px-8 py-10 shadow-2xl"
              style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--dark-fg)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <AppLogo scrolled={false} />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-white/60 hover:text-white transition-colors"
                >
                  <XIcon size={24} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col flex-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.06 * i,
                      type: 'spring',
                      stiffness: 300,
                      damping: 40,
                    }}
                  >
                    <MobileNavLink
                      link={link}
                      pathname={pathname}
                      onClose={() => setIsOpen(false)}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex flex-col gap-3"
              >
                <CustomButton
                  label="Let's Talk"
                  href="/contact"
                  className="w-full justify-center"
                  onClick={() => setIsOpen(false)}
                />
                <p className="text-center text-xs text-white/25">
                  {siteConfig.location} — available worldwide
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}