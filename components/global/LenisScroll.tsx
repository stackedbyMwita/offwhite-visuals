'use client'

import { useEffect } from "react"
import Lenis from "lenis"

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      anchors: {
        offset: -100,
      }
    })

    // Expose lenis instance for use elsewhere if needed
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return null
}