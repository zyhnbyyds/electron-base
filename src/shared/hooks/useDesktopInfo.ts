import { useEffect, useMemo, useState } from 'react'
import type { DesktopAppInfo, DesktopWindowState } from '@/shared/types/desktop'

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

const fallbackWindowState: DesktopWindowState = {
  isMaximized: false,
  isMinimized: false,
}

export function useDesktopInfo() {
  const [appInfo, setAppInfo] = useState<DesktopAppInfo>(fallbackInfo)
  const [windowState, setWindowState] = useState<DesktopWindowState>(fallbackWindowState)

  useEffect(() => {
    let active = true

    async function load() {
      const [info, state] = await Promise.all([
        window.desktop?.getAppInfo?.(),
        window.desktop?.getWindowState?.(),
      ])

      if (!active) {
        return
      }

      if (info) {
        setAppInfo(info)
      }

      if (state) {
        setWindowState(state)
      }
    }

    void load()

    const dispose = window.desktop?.onWindowStateChange?.((state) => {
      if (active) {
        setWindowState(state)
      }
    })

    return () => {
      active = false
      dispose?.()
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

  const windowControls = useMemo(() => {
    return {
      minimize: async () => {
        await window.desktop?.minimizeWindow?.()
      },
      toggleMaximize: async () => {
        const state = await window.desktop?.toggleMaximizeWindow?.()

        if (state) {
          setWindowState(state)
        }

        return state
      },
      close: async () => {
        await window.desktop?.closeWindow?.()
      },
    }
  }, [])

  return {
    appInfo,
    openExternal,
    isElectron: window.desktop?.isElectron ?? false,
    windowState,
    windowControls,
  }
}
