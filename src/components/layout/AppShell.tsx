import { type MouseEvent, type ReactNode } from 'react'
import { Avatar, Button, Flex, Layout } from 'antd'
import type { DesktopWindowControls, DesktopWindowState } from '@/shared/types/desktop'
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
  isElectron: boolean
  windowControls: DesktopWindowControls
  windowState: DesktopWindowState
  children: ReactNode
}

export function AppShell({ isElectron, windowControls, windowState, children }: AppShellProps) {
  function handleTitleBarDoubleClick(event: MouseEvent<HTMLElement>) {
    if (!isElectron) {
      return
    }

    const target = event.target

    if (!(target instanceof HTMLElement)) {
      return
    }

    if (target.closest('[data-nodrag]')) {
      return
    }

    void windowControls.toggleMaximize()
  }

  return (
    <div className="h-screen">
      <Layout className="h-full bg-transparent">
        <div className="relative flex h-full w-full flex-col overflow-hidden">
          <Layout.Header
            className="!h-14 !px-5 !bg-[#faf9f7] border-b border-b-[rgba(23,23,23,0.08)] [-webkit-app-region:drag]"
            onDoubleClick={handleTitleBarDoubleClick}
          >
            <Flex align="center" justify="space-between" className="h-full" gap={12}>
              {/* 左侧：Logo + 应用名 */}
              <Flex gap={10} align="center" className="shrink-0">
                <Avatar
                  shape="square"
                  size={32}
                  style={{
                    background: '#1c1917',
                    color: '#f5f5f4',
                    fontWeight: 700,
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                >
                  DT
                </Avatar>
              </Flex>

              {/* 右侧：状态 + 窗口控制 */}
              <Flex
                gap={6}
                align="center"
                className="shrink-0 [-webkit-app-region:no-drag]"
                data-nodrag
              >
                {isElectron ? (
                  <>
                    <Button
                      size="small"
                      type="text"
                      onClick={() => {
                        void windowControls.minimize()
                      }}
                    >
                      <span className="i-lucide-minus text-[15px]" />
                    </Button>
                    <Button
                      size="small"
                      type="text"
                      onClick={() => {
                        void windowControls.toggleMaximize()
                      }}
                    >
                      <span
                        className={`text-[12px] ${
                          windowState.isMaximized ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'
                        }`}
                      />
                    </Button>
                    <Button
                      size="small"
                      type="text"
                      aria-label="关闭窗口"
                      onClick={() => {
                        void windowControls.close()
                      }}
                    >
                      <span className="i-lucide-x text-[15px]" />
                    </Button>
                  </>
                ) : null}
              </Flex>
            </Flex>
          </Layout.Header>

          <Layout.Content className="min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-8 md:py-6">
            {children}
          </Layout.Content>
        </div>
      </Layout>
    </div>
  )
}
