export const templateMeta = {
  name: 'Desktop Template',
  description: 'Electron + Vite + React + TypeScript 基础模板',
  version: 'Starter v1',
}

export const navigation = [
  { id: 'overview', label: '概览' },
  { id: 'structure', label: '结构' },
  { id: 'quality', label: '质量' },
] as const

export const projectStructure = [
  { title: 'src/app', description: '应用装配层，负责入口和页面组合。' },
  { title: 'src/components', description: '可复用布局与 UI 组件。' },
  { title: 'src/features', description: '按功能组织页面模块，便于扩展业务。' },
  { title: 'src/shared', description: '类型、配置、hooks 等稳定公共层。' },
  { title: 'electron', description: '主进程与 preload bridge，独立于渲染层。' },
] as const

export const presetCapabilities = [
  '严格模式 TypeScript',
  'UnoCSS 原子化样式',
  '类型化 preload bridge',
  'Electron 外链安全打开',
  'oxlint + oxfmt 质量链路',
] as const

export const qualityScripts = [
  'pnpm dev',
  'pnpm build',
  'pnpm lint',
  'pnpm lint:fix',
  'pnpm format',
  'pnpm format:check',
] as const

export const quickLinks = [
  { label: 'Vite 文档', href: 'https://vite.dev' },
  { label: 'React 文档', href: 'https://react.dev' },
  { label: 'Electron 文档', href: 'https://www.electronjs.org/docs/latest' },
] as const
