import { InfoCard } from '@/components/ui/InfoCard'
import {
  presetCapabilities,
  projectStructure,
  qualityScripts,
  quickLinks,
  templateMeta,
} from '@/shared/config/app'
import type { DesktopAppInfo } from '@/shared/types/desktop'

interface HomePageProps {
  appInfo: DesktopAppInfo
  openExternal: (url: string) => Promise<boolean>
}

export function HomePage({ appInfo, openExternal }: HomePageProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      <section
        id="overview"
        className="hero-panel overflow-hidden rounded-[32px] px-6 py-7 md:px-8 md:py-9"
      >
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_360px] xl:items-end">
          <div className="relative max-w-3xl space-y-6">
            <div className="hero-orbit absolute -left-10 top-2 hidden h-28 w-28 xl:block" />
            <p className="template-kicker text-[11px] font-semibold text-stone-400">
              Immersive Desktop Template
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-stone-950 md:text-6xl">
                用更安静的页面，承载更重的桌面业务。
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
                这个模板现在更像一个工作台，而不是演示页。顶部状态栏负责传达环境与状态，首屏负责说明结构与能力，其余视觉层尽量退后，让后续业务更容易接入。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {quickLinks.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    void openExternal(item.href)
                  }}
                  className="rounded-full border border-stone-300/80 bg-white/80 px-4 py-2 text-sm text-stone-700 transition-all hover:-translate-y-0.5 hover:border-stone-900 hover:text-stone-950"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-grid rounded-[28px] p-4 md:p-5">
            <div className="rounded-[22px] border border-white/80 bg-white/75 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                Template Snapshot
              </p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <span className="text-sm text-stone-500">Runtime</span>
                  <span className="text-sm font-medium text-stone-900">{appInfo.runtime}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <span className="text-sm text-stone-500">Bridge</span>
                  <span className="text-sm font-medium text-stone-900">Typed / Ready</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <span className="text-sm text-stone-500">Version</span>
                  <span className="text-sm font-medium text-stone-900">{templateMeta.version}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <div className="space-y-6">
          <InfoCard
            eyebrow="预置能力"
            title="保留基础设施，移除业务噪音"
            description="现在的模板只保留真正通用的部分，方便你从这里继续扩展。"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {presetCapabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-stone-200/80 bg-stone-50/80 px-4 py-3 text-sm text-stone-700 transition-transform hover:-translate-y-0.5"
                >
                  {item}
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard
            eyebrow="项目结构"
            title="按职责拆分后的目录"
            description="后续新增页面、组件、bridge 或业务模块时，不再需要把所有逻辑塞进一个文件。"
          >
            <div className="space-y-3">
              {projectStructure.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white/88 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-stone-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>

        <div className="space-y-6">
          <section id="structure">
            <InfoCard
              eyebrow="环境信息"
              title={templateMeta.version}
              description="这些数据来自 preload bridge，证明渲染层已经和 Electron 做了类型化解耦。"
            >
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <dt className="text-stone-500">应用名</dt>
                  <dd className="font-medium text-stone-900">{appInfo.name}</dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <dt className="text-stone-500">运行时</dt>
                  <dd className="font-medium text-stone-900">{appInfo.runtime}</dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <dt className="text-stone-500">平台</dt>
                  <dd className="font-medium text-stone-900">{appInfo.platform}</dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-stone-50/90 px-4 py-3">
                  <dt className="text-stone-500">Chrome</dt>
                  <dd className="font-medium text-stone-900">{appInfo.versions.chrome}</dd>
                </div>
              </dl>
            </InfoCard>
          </section>

          <section id="quality">
            <InfoCard
              eyebrow="开发流程"
              title="默认质量链路"
              description="模板保留了最基础也最常用的命令，适合继续往上堆业务。"
            >
              <div className="space-y-2">
                {qualityScripts.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-stone-200/80 bg-white/88 px-4 py-3 font-mono text-sm text-stone-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </InfoCard>
          </section>
        </div>
      </div>
    </div>
  )
}
