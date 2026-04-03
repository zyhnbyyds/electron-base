import { useEffect, useState, type ReactNode } from 'react'
import { templateMeta } from '@/shared/config/app'
import type { DesktopAppInfo } from '@/shared/types/desktop'

interface NavigationItem {
  id: string
  label: string
}

interface AppShellProps {
  appInfo: DesktopAppInfo
  navigation: readonly NavigationItem[]
  activeSection: string
  onSelect: (id: string) => void
  children: ReactNode
}

export function AppShell({
  appInfo,
  navigation,
  activeSection,
  onSelect,
  children,
}: AppShellProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="shell-backdrop min-h-screen p-3 md:p-5">
      <div className="template-surface grid min-h-[calc(100vh-1.5rem)] grid-cols-1 overflow-hidden rounded-[36px] md:min-h-[calc(100vh-2.5rem)] md:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="border-b border-white/60 bg-white/55 p-5 backdrop-blur-xl md:border-b-0 md:border-r">
          <div className="mb-10 space-y-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(23,23,23,0.16)]">
              DT
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-stone-900">
                {templateMeta.name}
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-500">{templateMeta.description}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const active = item.id === activeSection

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={[
                    'flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition-all',
                    active
                      ? 'bg-stone-900 text-white shadow-[0_12px_30px_rgba(23,23,23,0.14)]'
                      : 'text-stone-500 hover:bg-white/90 hover:text-stone-900',
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                  <span className={active ? 'text-white/60' : 'text-stone-300'}>/</span>
                </button>
              )
            })}
          </nav>

          <div className="mt-8 rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
              Runtime
            </p>
            <p className="mt-2 text-sm font-medium text-stone-900">{appInfo.runtime}</p>
            <p className="mt-1 text-sm text-stone-500">{appInfo.platform}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-stone-500">
              <div className="rounded-2xl bg-stone-50 px-3 py-2">
                Chrome {appInfo.versions.chrome}
              </div>
              <div className="rounded-2xl bg-stone-50 px-3 py-2">Node {appInfo.versions.node}</div>
            </div>
          </div>
        </aside>

        <div className="relative flex min-h-0 flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.52))]">
          <div className="status-glow pointer-events-none absolute inset-x-10 top-0 h-40" />

          <header className="sticky top-0 z-20 border-b border-white/60 bg-[rgba(247,245,239,0.72)] px-5 py-4 backdrop-blur-2xl md:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-1 pt-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ed6a5e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                    Workspace Status
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-base font-semibold tracking-tight text-stone-950">
                      模板首页
                    </p>
                    <span className="text-sm text-stone-400">/</span>
                    <p className="text-sm text-stone-500">准备承载你的下一个桌面应用</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1.5 shadow-sm">
                  Ready
                </span>
                <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1.5 shadow-sm">
                  Electron {appInfo.versions.electron}
                </span>
                <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1.5 shadow-sm">
                  {now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </header>

          <main className="app-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
