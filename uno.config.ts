import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {
    'btn-ghost-sm':
      'px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border-0 bg-transparent',
    'sidebar-divider': 'w-px h-4 bg-white/20',
  },
})
