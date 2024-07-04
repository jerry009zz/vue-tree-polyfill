<Suspense>
  <DemoRender :component="component" />

  <template #fallback>
    Loading demo...
  </template>
</Suspense>

<div :style="{ margin: '16px 0' }">
  <PlaygroundLink :component="component" />
</div>

::: details {{i18n.showCode}}
<div v-html="sourceCode.markdown"></div>
:::

<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

import DemoRender from './DemoRender.vue'
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
