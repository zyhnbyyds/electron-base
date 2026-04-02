import { useEffect, useMemo, useState } from 'react'
import type { DesktopAppInfo } from '@/shared/types/desktop'

const fallbackInfo: DesktopAppInfo = {
  name: 'Desktop Template',
  runtime: 'Browser',
  platform: navigator.platform || 'web',
  versions: {
    chrome: '-',
    electron: '-',
    node: '-',
  },
}

export function useDesktopInfo() {
  const [appInfo, setAppInfo] = useState<DesktopAppInfo>(fallbackInfo)

  useEffect(() => {
    let active = true

    async function load() {
      const info = await window.desktop?.getAppInfo?.()
      if (active && info) {
        setAppInfo(info)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  const openExternal = useMemo(() => {
    return async (url: string) => {
      if (window.desktop?.openExternal) {
        return window.desktop.openExternal(url)
      }

      window.open(url, '_blank', 'noopener,noreferrer')
      return true
    }
  }, [])

  return { appInfo, openExternal, isElectron: window.desktop?.isElectron ?? false }
}
