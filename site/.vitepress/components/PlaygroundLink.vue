<template>
  <a :href="withBase(`/playground${serializedCode}`)" target="_blank" rel="noreferrer noopener">{{ text || i18n.openInPlayground }}</a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { withBase, useData } from 'vitepress'
import { useStore } from '@vue/repl'

import { data as sourceCodeMap } from '../data/code.data'
import { codeDemoI18n } from '../constants/i18n'

const props = defineProps<{
  component: string
  text?: string
}>()

const { localeIndex } = useData()

const sourceCode = sourceCodeMap[props.component]
const i18n = codeDemoI18n[localeIndex.value]
const serializedCode = ref<string | null>(null)

const mainFile = 'src/App.vue'
const importMapFile = 'import-map.json'

const store = useStore()

// Insert vue-tree style.css
let mainFileContent = sourceCode.sourceCode
const styleTagCode = `\<style\>\n@import 'https://cdn.jsdelivr.net/npm/@wsfe/vue-tree@latest/dist/style.css';\n\</style\>\n`
const styleTagMatch = mainFileContent?.match(/(<style)/)
if (styleTagMatch) {
  // Insert before first <style>
  mainFileContent = mainFileContent.slice(0, styleTagMatch.index) + styleTagCode + '\n' + mainFileContent.slice(styleTagMatch.index)
} else {
  mainFileContent = mainFileContent + '\n' + styleTagCode
}

store.setFiles({
  [mainFile]: mainFileContent,
  [importMapFile]: JSON.stringify({
    imports: {
      '@wsfe/vue-tree': 'https://cdn.jsdelivr.net/npm/@wsfe/vue-tree@latest/dist/vue-tree.mjs',
    },
  }, null, 2),
}, mainFile).then(() => {
  serializedCode.value = store.serialize()
})
</script>
