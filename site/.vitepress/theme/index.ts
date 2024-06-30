import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import CodeDemo from '../components/code-demo.md'
import PlaygroundLink from '../components/PlaygroundLink.vue'
import '@wsfe/vue-tree/style.css'

const codeDemoComponents = import.meta.glob('../code/*.vue')

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('CodeDemo', CodeDemo)
    app.component('PlaygroundLink', PlaygroundLink)
    
    for (const path in codeDemoComponents) {
      codeDemoComponents[path]().then((component) => {
        const componentName = path.match(/^(?:.*\/)?(.+)\.vue$/)?.[1]
        if (componentName && component?.default) {
          app.component(componentName, component.default)
        }
      })
    }
  }
} satisfies Theme
