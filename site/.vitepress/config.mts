import path from 'node:path'
import { defineConfig } from 'vitepress'
import zh from './zh.mjs'
import en from './en.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue-tree/',
  title: "Vue Tree",
  description: "Virtual list optimized Vue tree component",
  appearance: false,
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-BBCLLNZQ2E' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-BBCLLNZQ2E');`
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wsfe/vue-tree' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        '@wsfe/vue-tree/style.css': path.resolve('src/styles/index.less'),
        '@wsfe/vue-tree': path.resolve('src'),
      },
    },
  },

  locales: {
    root: {
      label: '简体中文',
      ...zh,
    },
    en: {
      label: 'English',
      ...en,
    },
  },
})
