import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { Avatar, Button, Divider, Flex, Layout, Segmented, Tag, Tooltip, Typography } from 'antd'
import { templateMeta } from '@/shared/config/app'
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

export function AppShell({
  appInfo,
  navigation,
  activeSection,
  onSelect,
  isElectron,
  windowControls,
  windowState,
  children,
}: AppShellProps) {
  const [now, setNow] = useState(() => new Date())
  const isWindows = appInfo.platform === 'win32'

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 60_000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  function handleTitleBarDoubleClick(event: MouseEvent<HTMLElement>) {
    if (!isElectron) {
      return
    }

    const target = event.target

    if (!(target instanceof HTMLElement)) {
      return
    }

    if (target.closest('.app-no-drag')) {
      return
    }

    void windowControls.toggleMaximize()
  }

  return (
    <div className="shell-backdrop min-h-screen">
      <Layout className="h-screen bg-transparent">
        <div
          className={[
            'app-window-frame',
            'template-surface',
            windowState.isMaximized ? 'app-window-frame--maximized' : '',
            isWindows ? 'app-window-frame--windows' : '',
          ].join(' ')}
        >
          <Layout.Header
            className="app-drag app-header !h-14 !bg-transparent !px-5"
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
                <div className="app-no-drag leading-tight">
                  <Typography.Text strong className="!block !text-sm !leading-none !text-stone-900">
                    {templateMeta.name}
                  </Typography.Text>
                  <Typography.Text className="!text-[11px] !leading-none !text-stone-400">
                    {templateMeta.description}
                  </Typography.Text>
                </div>
              </Flex>

              {/* 中间：导航 */}
              <Segmented
                className="app-no-drag"
                options={navigation.map((item) => ({ label: item.label, value: item.id }))}
                value={activeSection}
                onChange={(value) => onSelect(value as string)}
              />

              {/* 右侧：状态 + 窗口控制 */}
              <Flex gap={6} align="center" className="app-no-drag shrink-0">
                <Tag bordered={false} style={{ margin: 0 }}>
                  Ready
                </Tag>
                <Tag bordered={false} style={{ margin: 0 }}>
                  Electron {appInfo.versions.electron}
                </Tag>
                <Typography.Text className="!min-w-[36px] !text-right !text-xs !text-stone-400">
                  {now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </Typography.Text>
                {isElectron ? (
                  <>
                    <Divider type="vertical" className="!mx-1 !h-4" />
                    <Tooltip title="最小化">
                      <Button
                        size="small"
                        shape="circle"
                        type="text"
                        aria-label="最小化窗口"
                        onClick={() => {
                          void windowControls.minimize()
                        }}
                      >
                        <span className="window-control-glyph">－</span>
                      </Button>
                    </Tooltip>
                    <Tooltip title={windowState.isMaximized ? '还原' : '最大化'}>
                      <Button
                        size="small"
                        shape="circle"
                        type="text"
                        aria-label={windowState.isMaximized ? '还原窗口' : '最大化窗口'}
                        onClick={() => {
                          void windowControls.toggleMaximize()
                        }}
                      >
                        <span className="window-control-glyph">
                          {windowState.isMaximized ? '❐' : '□'}
                        </span>
                      </Button>
                    </Tooltip>
                    <Tooltip title="关闭">
                      <Button
                        size="small"
                        danger
                        shape="circle"
                        type="text"
                        aria-label="关闭窗口"
                        onClick={() => {
                          void windowControls.close()
                        }}
                      >
                        <span className="window-control-glyph">×</span>
                      </Button>
                    </Tooltip>
                  </>
                ) : null}
              </Flex>
            </Flex>
          </Layout.Header>

          <Layout.Content className="app-scrollbar min-h-0 flex-1 px-5 py-5 md:px-8 md:py-6">
            {children}
          </Layout.Content>
        </div>
      </Layout>
    </div>
  )
}
