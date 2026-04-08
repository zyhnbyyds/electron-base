import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/features/home/HomePage'
import { navigation } from '@/shared/config/app'
import { useDesktopInfo } from '@/shared/hooks/useDesktopInfo'

export default function App() {
  const [activeSection, setActiveSection] = useState<string>(navigation[0].id)
  const { appInfo, isElectron, windowControls, windowState } = useDesktopInfo()

  function handleSelect(id: string) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AppShell
      appInfo={appInfo}
      navigation={navigation}
      activeSection={activeSection}
      onSelect={handleSelect}
      isElectron={isElectron}
      windowControls={windowControls}
      windowState={windowState}
    >
      <HomePage />
    </AppShell>
  )
}
