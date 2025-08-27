import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      tech: {
        blue: '#3b82f6',
        cyan: '#06b6d4',
        purple: '#8b5cf6',
        pink: '#ec4899',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }
    }
  },
  shortcuts: {
    'tech-card': 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300',
    'tech-btn': 'bg-tech-gradient text-white font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300',
    'glass-effect': 'bg-white/10 backdrop-blur-md border border-white/20'
  }
})