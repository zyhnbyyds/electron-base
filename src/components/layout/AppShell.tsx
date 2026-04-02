import type { ReactNode } from 'react'
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
  return (
    <div className="min-h-screen p-4 md:p-5">
      <div className="template-surface grid min-h-[calc(100vh-2rem)] grid-cols-1 overflow-hidden rounded-[32px] md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-stone-200/80 bg-stone-50/80 p-5 md:border-b-0 md:border-r">
          <div className="mb-8 space-y-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-sm font-semibold text-white">
              DT
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">{templateMeta.name}</p>
              <p className="mt-1 text-sm leading-6 text-stone-500">{templateMeta.description}</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const active = item.id === activeSection

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={[
                    'flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm transition-colors',
                    active
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-500 hover:bg-white hover:text-stone-900',
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                  <span className={active ? 'text-white/60' : 'text-stone-300'}>/</span>
                </button>
              )
            })}
          </nav>

          <div className="mt-8 rounded-3xl border border-stone-200 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
              Runtime
            </p>
            <p className="mt-2 text-sm font-medium text-stone-900">{appInfo.runtime}</p>
            <p className="mt-1 text-sm text-stone-500">{appInfo.platform}</p>
          </div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-stone-200/80 bg-white/75 px-5 backdrop-blur md:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                Status
              </p>
              <p className="mt-1 text-sm font-medium text-stone-900">模板首页</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                Electron {appInfo.versions.electron}
              </span>
              <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
                Node {appInfo.versions.node}
              </span>
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
