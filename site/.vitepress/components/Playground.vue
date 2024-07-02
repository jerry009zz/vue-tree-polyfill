<template>
  <div class="header">
    <div class="header-title"><b>Vue Tree Playground</b></div>
    <div class="version"><VersionSelect :name="wsfePackageName" :packageName="wsfePackageName" v-model="treeVersion" /></div>
    <div class="version"><VersionSelect name="Vue" packageName="vue" v-model="vueVersion" /></div>
    <div class="version"><VersionSelect name="TypeScript" packageName="typescript" v-model="store.typescriptVersion" /></div>
    <button class="copy-button" @click="handleCopy">
      <span v-if="copied">Copied!</span>
      <span v-else>Copy sharable URL</span>
    </button>
    <a class="link" href="https://github.com/wsfe/vue-tree" target="_blank" rel="noreferrer noopener">GitHub↗</a>
  </div>
  <Repl :editor="Monaco" :store="store" />
</template>

<script setup lang="ts">
import { nextTick, ref, watch, watchEffect } from 'vue'
import { Repl, useStore } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'

import VersionSelect from './VersionSelect.vue'

const wsfePackageName = '@wsfe/vue-tree'
const importMapFile = 'import-map.json'

const store = useStore(
  {},
  // initialize repl with previously serialized state
  location.hash,
)

// #region tree version
const treeVersion = ref('latest')

const importMap = store.getImportMap()
const treeLink = importMap.imports?.[wsfePackageName]

if (treeLink) {
  const currentVersion = treeLink.match(/@wsfe\/vue-tree@(.+?)\//)?.[1]
  if (currentVersion) {
    treeVersion.value = currentVersion
  }
}

watch(treeVersion, () => {
  const currentImportMap = store.getImportMap()
  store.setFiles({
    ...store.getFiles(),
    [importMapFile]: JSON.stringify({
      ...currentImportMap,
      imports: {
        ...currentImportMap.imports,
        '@wsfe/vue-tree': `https://cdn.jsdelivr.net/npm/@wsfe/vue-tree@${treeVersion.value}/dist/vue-tree.mjs`,
      },
    }, null, 2),
  })
})
// #endregion

// #region vue version
const vueVersion = ref(store.vueVersion)

if (!vueVersion.value) {
  vueVersion.value = 'latest'
}

watch(vueVersion, () => {
  nextTick(() => {
    store.vueVersion = vueVersion.value
  })
}, {
  immediate: true,
})
// #endregion

// persist state
watchEffect(() => {
  const newHash = store.serialize()
  history.replaceState({}, '', newHash)
})

const isCopying = ref(false)
const copied = ref(false)

const handleCopy = async () => {
  if (isCopying.value) return
  isCopying.value = true
  try {
    await navigator.clipboard.writeText(location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1000)
  } finally {
    isCopying.value = false
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-title {
  flex: 1;
}

.version {
  font-size: 14px;
  margin-right: 20px;
}

.copy-button {
  font-size: 12px;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 0 8px;
  margin-right: 20px;
  width: 130px;
}

.link:hover {
  color: #3ca877;
}

.vue-repl {
  height: calc(100vh - 50px);
}
</style>
