'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MenuIcon, XIcon } from 'lucide-react'

import { AppLogo } from '@/components/global'
import CustomButton from '@/components/ui/CustomButton'
import { navLinks, siteConfig } from '@/data'
import { INavLink } from '@/types'
import { useScrollToAnchor, useNavActions } from '@/hooks/useNav'

// ── Desktop Link ─────────────────────────────────────────────
function NavLink({ link, scrolled, pathname }: { link: INavLink; scrolled: boolean; pathname: string }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { handleNav } = useNavActions()

  // Improved Active Logic:
  // 1. If it's a section link (#), it's active if we are on the homepage.
  // 2. If we are on the specific subpage (e.g., /services), the "Services" link lights up.
  const isActive = useMemo(() => {
    if (link.isSection) {
      return pathname === '/' || (link.pageHref && pathname.startsWith(link.pageHref))
    }
    return pathname === link.href
  }, [pathname, link])

  const baseTextColor = scrolled
    ? 'text-foreground hover:text-primary'
    : 'text-white/80 hover:text-white'

  return (
    <div 
      className="relative"
      onMouseEnter={() => link.isSection && setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
    >
      <button
        onClick={() => link.isSection ? handleNav(link) : undefined}
        className={`relative group py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${baseTextColor}`}
      >
        {link.isSection ? (
          link.name
        ) : (
          <Link href={link.href}>{link.name}</Link>
        )}

        {/* Active Underline Indicator */}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-0.5 left-0 w-full h-px bg-primary"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}

        {/* Hover Underline */}
        {!isActive && (
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary/50 transition-all duration-300 group-hover:w-full" />
        )}
      </button>

      <AnimatePresence>
        {link.isSection && link.pageHref && dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
          >
            {/* The "Pointer" Arrow */}
            <div 
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rotate-45 rounded-sm border-l border-t"
              style={{
                backgroundColor: scrolled ? 'var(--background)' : 'oklch(0.18 0.03 196)',
                borderColor: scrolled ? 'var(--border)' : 'oklch(0.97 0.005 196 / 0.1)',
              }}
            />
            
            <div 
              className="rounded-fluid border shadow-xl px-1 py-1 min-w-40"
              style={{
                backgroundColor: scrolled ? 'var(--background)' : 'oklch(0.18 0.03 196)',
                borderColor: scrolled ? 'var(--border)' : 'oklch(0.97 0.005 196 / 0.1)',
              }}
            >
              <button
                onClick={() => { handleNav(link); setDropdownOpen(false); }}
                className="flex items-center w-full px-3 py-2.5 rounded-fluid text-sm font-medium hover:text-primary transition-colors"
                style={{ color: scrolled ? 'var(--foreground)' : 'var(--dark-fg)' }}
              >
                {link.name} Overview
              </button>
              
              <div className="mx-3 my-1 h-px opacity-10 bg-current" />

              <Link
                href={link.pageHref}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center justify-between gap-6 w-full px-3 py-2.5 rounded-fluid text-sm font-medium hover:text-primary transition-colors group/page"
                style={{ color: scrolled ? 'var(--foreground)' : 'var(--dark-fg)' }}
              >
                <span>{link.pageLabel ?? `All ${link.name}`}</span>
                <ArrowUpRight size={13} className="text-primary opacity-60 group-hover/page:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Navbar ──────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  
  useScrollToAnchor()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500
          ${scrolled ? 'bg-white/95 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}
      >
        <AppLogo scrolled={scrolled} />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} link={link} scrolled={scrolled} pathname={pathname} />
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <CustomButton label="Contact" href="/contact" />
          <CustomButton label="Work" href="/projects" variant="secondary" />
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(true)}
          className={`md:hidden p-1 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
        >
          <MenuIcon size={26} />
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu 
            onClose={() => setIsOpen(false)} 
            pathname={pathname} 
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ── Mobile Menu Sub-component ───────────────────────────────
function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-sm flex flex-col px-8 py-10 shadow-2xl"
        style={{ backgroundColor: 'var(--dark-bg)', color: 'var(--dark-fg)' }}
      >
        <div className="flex items-center justify-between mb-10">
          <AppLogo scrolled={false} />
          <button onClick={onClose} className="p-1 text-white/60 hover:text-white transition-colors">
            <XIcon size={24} />
          </button>
        </div>

        <nav className="flex flex-col flex-1 overflow-y-auto">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i }}
            >
              <MobileNavLink link={link} pathname={pathname} onClose={onClose} />
            </motion.div>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <CustomButton label="Let's Talk" href="/contact" className="w-full justify-center" onClick={onClose} />
          <p className="text-center text-xs text-white/25">Available Worldwide</p>
        </div>
      </motion.div>
    </>
  )
}

function MobileNavLink({ link, pathname, onClose }: { link: INavLink; pathname: string; onClose: () => void }) {
  const { handleNav } = useNavActions(onClose)
  const isActive = link.isSection ? pathname === '/' : pathname === link.href

  return (
    <div className="border-b border-white/5 last:border-b-0 py-4">
      <button
        onClick={() => handleNav(link)}
        className={`flex items-center justify-between w-full text-2xl font-bold font-serif transition-colors ${
          isActive ? 'text-primary' : 'text-white/70'
        }`}
      >
        {link.name}
        {isActive && <span className="size-1.5 rounded-full bg-primary" />}
      </button>
      {link.isSection && link.pageHref && (
        <Link href={link.pageHref} onClick={onClose} className="flex items-center gap-1.5 text-xs font-medium text-primary/60 mt-1">
          <ArrowUpRight size={11} /> {link.pageLabel ?? `View all ${link.name}`}
        </Link>
      )}
    </div>
  )
}