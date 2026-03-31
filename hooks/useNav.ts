import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { INavLink } from '@/types'

export const useScrollToAnchor = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return
    const params = new URLSearchParams(window.location.search)
    const scrollTo = params.get('scrollTo')
    if (!scrollTo) return

    const t = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState({}, '', '/')
    }, 400)
    return () => clearTimeout(t)
  }, [pathname])
}

export const useNavActions = (onClose?: () => void) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleNav = (link: INavLink) => {
    if (onClose) onClose()
    
    if (link.isSection) {
      const sectionId = link.href.replace('#', '')
      if (pathname === '/') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(`/?scrollTo=${sectionId}`)
      }
    } else {
      router.push(link.href)
    }
  }

  return { handleNav }
}