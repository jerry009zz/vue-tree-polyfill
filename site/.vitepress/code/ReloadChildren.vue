<template>
  <button @click="handleSetChildren">Set node-1 children</button>
  <button @click="handleClearChildren">Clear node-1 children</button>
  <div :style="{ height: '300px' }">
    <VTree ref="tree" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const tree = ref()

const children = Array.from({ length: 100000 }).map((_, i) => {
  return {
    title: `node-1-${i + 1}`,
    id: `node-1-${i + 1}`,
  }
})

const data = [
  {
    title: 'node-1',
    id: 'node-1',
    children,
  },
  {
    title: 'node-2',
    id: 'node-2',
    children: [
      {
        title: 'node-2-1',
        id: 'node-2-1',
      },
    ],
  },
]

onMounted(() => {
  tree.value.setData(data)
})

const handleSetChildren = () => {
  tree.value.updateNode('node-1', { children })
}
const handleClearChildren = () => {
  tree.value.updateNode('node-1', { children: [] })
}
</script>

<style scoped>
button {
  border: 1px solid lightgray;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 20px;
}
</style>
