import { defineConfig } from 'vitepress'
import { getLocaleThemeConfig } from './utils/i18n'

const lang = 'en'

export default defineConfig({
  lang,
  themeConfig: getLocaleThemeConfig(lang),
})
