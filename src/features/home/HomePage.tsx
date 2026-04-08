import { InfoCard } from '@/components/ui/InfoCard'
import { App as AntApp, Button, Descriptions, Flex, List, Space, Tag, Typography } from 'antd'
import {
  presetCapabilities,
  projectStructure,
  qualityScripts,
  quickLinks,
} from '@/shared/config/app'
import type { DesktopAppInfo } from '@/shared/types/desktop'

interface HomePageProps {
  appInfo: DesktopAppInfo
  openExternal: (url: string) => Promise<boolean>
}

export function HomePage({ appInfo, openExternal }: HomePageProps) {
  const { message } = AntApp.useApp()
  const structureItems = [...projectStructure]
  const scriptItems = [...qualityScripts]

  return (
    <Flex vertical gap={16} className="h-full">
      {/* Hero 区域：拍平，无外层卡片包装 */}
      <section id="overview">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_300px]">
          <Flex vertical gap={20} justify="center" className="py-2">
            <div>
              <Typography.Text className="template-kicker mb-2 inline-block text-[11px] text-stone-400">
                Immersive Desktop Template
              </Typography.Text>
              <Typography.Title
                level={2}
                className="!mb-2 !mt-1 !max-w-2xl !font-semibold !tracking-[-0.04em] !text-stone-950"
              >
                用更安静的页面，承载更重的桌面业务。
              </Typography.Title>
              <Typography.Paragraph className="!mb-0 !max-w-2xl !text-sm !leading-7 !text-stone-500">
                顶部状态栏负责传达环境与状态，页面直接展示能力、结构和运行环境，后续接入业务时更直接。
              </Typography.Paragraph>
            </div>

            <Space size={[8, 8]} wrap>
              {quickLinks.map((item) => (
                <Button
                  key={item.href}
                  shape="round"
                  onClick={async () => {
                    const opened = await openExternal(item.href)

                    if (!opened) {
                      void message.error(`打开失败: ${item.label}`)
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Space>
          </Flex>

          <InfoCard eyebrow="Runtime" title="运行环境">
            <Descriptions
              column={1}
              size="small"
              colon={false}
              items={[
                { key: 'app', label: '应用名', children: appInfo.name },
                { key: 'platform', label: '平台', children: appInfo.platform },
                { key: 'electron', label: 'Electron', children: appInfo.versions.electron },
                { key: 'chrome', label: 'Chrome', children: appInfo.versions.chrome },
                { key: 'node', label: 'Node.js', children: appInfo.versions.node },
              ]}
            />
          </InfoCard>
        </div>
      </section>

      {/* 底部三栏等高卡片 */}
      <div className="grid min-h-0 gap-4 xl:grid-cols-3">
        <section id="structure" className="min-h-0">
          <InfoCard
            eyebrow="项目结构"
            title="目录职责清晰"
            description="只保留会影响扩展效率的信息。"
          >
            <List
              size="small"
              dataSource={structureItems}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Typography.Text strong>{item.title}</Typography.Text>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </InfoCard>
        </section>

        <section id="quality" className="min-h-0">
          <InfoCard
            eyebrow="预置能力"
            title="通用基础设施"
            description="组件、类型和质量链路都在，但表达方式更简洁。"
          >
            <Flex vertical gap={18}>
              <Space size={[8, 8]} wrap>
                {presetCapabilities.map((item) => (
                  <Tag key={item} bordered={false} className="px-3 py-1 text-sm">
                    {item}
                  </Tag>
                ))}
              </Space>

              <List
                size="small"
                dataSource={scriptItems}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text code>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Flex>
          </InfoCard>
        </section>

        <aside className="min-h-0">
          <InfoCard
            eyebrow="Tech Stack"
            title="构建环境版本"
            description="当前应用的工具链版本一览。"
          >
            <Descriptions
              column={1}
              size="small"
              colon={false}
              items={[
                { key: 'electron', label: 'Electron', children: appInfo.versions.electron },
                { key: 'chrome', label: 'Chromium', children: appInfo.versions.chrome },
                { key: 'node', label: 'Node.js', children: appInfo.versions.node },
                { key: 'react', label: 'React', children: '19' },
                { key: 'vite', label: 'Vite', children: '8' },
                { key: 'antd', label: 'Ant Design', children: '6' },
                { key: 'ts', label: 'TypeScript', children: '6' },
              ]}
            />
          </InfoCard>
        </aside>
      </div>
    </Flex>
  )
}
