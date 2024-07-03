<div
  :style="{
    width: '100%',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#FFF',
    border: '1px solid lightgray',
  }"
>
  <ClientOnly>
    <component :is="component" />
  </ClientOnly>
</div>

<div :style="{ margin: '16px 0' }">
  <ClientOnly>
    <PlaygroundLink :component="component" />
  </ClientOnly>
</div>

::: details {{i18n.showCode}}
<div v-html="sourceCode.markdown"></div>
:::

<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

import PlaygroundLink from './PlaygroundLink.vue'
import { data as sourceCodeMap } from '../data/code.data'
import { codeDemoI18n } from '../constants/i18n'

const props = defineProps<{
  component: string
}>()

const { localeIndex } = useData()

const sourceCode = sourceCodeMap[props.component]
const i18n = codeDemoI18n[localeIndex.value]
</script>
