import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import CodeDemo from '../components/code-demo.md'
import PlaygroundLink from '../components/PlaygroundLink.vue'
import '@wsfe/vue-tree/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('CodeDemo', CodeDemo)
    app.component('PlaygroundLink', PlaygroundLink)
  }
} satisfies Theme
