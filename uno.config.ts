import { defineConfig, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  shortcuts: {
    'btn-ghost-sm':
      'px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer border-0 bg-transparent',
    'sidebar-divider': 'w-px h-4 bg-white/20',
  },
})
