import { Flex, Typography } from 'antd'

export function HomePage() {
  return (
    <Flex vertical gap={16} className="h-full">
      {/* Hero 区域：拍平，无外层卡片包装 */}
      <section id="overview" className="shrink-0">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_300px]">
          <Flex vertical gap={20} justify="center" className="py-2">
            <div>
              <Typography.Text className="tracking-[0.12em] uppercase mb-2 inline-block text-[11px] text-stone-400">
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
          </Flex>
        </div>
      </section>
    </Flex>
  )
}
