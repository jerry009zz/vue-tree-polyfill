<template>
  <button @click="handleUpdateCount">Update node-1 count</button>
  <VTree ref="tree">
    <template #node="{ node }">
      <span>{{ node.title }}</span>
      <span v-if="typeof node.count === 'number'">
        Count: {{ node.count }}
      </span>
    </template>
  </VTree>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const tree = ref()

const data = [
  {
    title: 'node-1',
    id: 'node-1',
    count: 0,
    children: [
      {
        title: 'node-1-1',
        id: 'node-1-1',
      },
      {
        title: 'node-1-2',
        id: 'node-1-2',
      },
    ],
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

const handleUpdateCount = () => {
  const key = 'node-1'
  const currentCount = tree.value.getNode(key).count
  tree.value.updateNode(key, { count: currentCount + 1 })
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
