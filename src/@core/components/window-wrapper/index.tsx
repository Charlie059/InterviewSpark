// ** React Imports
import { useState, useEffect, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

interface Props {
  children: ReactNode
}

const WindowWrapper = ({ children }: Props) => {
  // ** State
  const [windowReadyFlag, setWindowReadyFlag] = useState<boolean>(false)

  const router = useRouter()

  const handleResize = () => {
    const baseWidth = 1750
    const viewportWidth = window.innerWidth
    const zoom = viewportWidth / baseWidth

    document.documentElement.style.setProperty('zoom', zoom.toString())
  }

  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        setWindowReadyFlag(true)
        handleResize()
        window.addEventListener('resize', handleResize)
      }

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize)
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (windowReadyFlag) {
    return <>{children}</>
  } else {
    return null
  }
}

export default WindowWrapper
