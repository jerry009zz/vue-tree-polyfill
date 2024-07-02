<template>
  <VTree ref="tree" :data="data">
    <template #node="{ node }">
      <span>{{ node.title }}</span>
      <button @click="handleAdd(node)">Add sibling</button>
      <button @click="handleAppend(node)">Append child</button>
      <button @click="handleRemove(node)">Remove</button>
    </template>
  </VTree>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const tree = ref()

let nodeAddCount = 0
let nodeAppendCount = 0

const handleAdd = (node) => {
  tree.value.insertAfter({ title: `node-added-${nodeAddCount}` }, node.id)
  nodeAddCount++
}

const handleAppend = (node) => {
  tree.value.append({ title: `node-appended-${nodeAppendCount}` }, node.id)
  nodeAppendCount++
}

const handleRemove = (node) => {
  tree.value.remove(node.id)
}

const data = ref([
  {
    title: 'node-1',
    id: 'node-1',
    children: [
      {
        title: 'node-1-1',
        id: 'node-1-1',
        children: [
          {
            title: 'node-1-1-1',
            id: 'node-1-1-1',
          },
          {
            title: 'node-1-1-2',
            id: 'node-1-1-2',
          },
          {
            title: 'node-1-1-3',
            id: 'node-1-1-3',
          },
        ],
      },
      {
        title: 'node-1-2',
        id: 'node-1-2',
        children: [
          {
            title: 'node-1-2-1',
            id: 'node-1-2-1',
          },
          {
            title: 'node-1-2-2',
            id: 'node-1-2-2',
          },
        ],
      },
      {
        title: 'node-1-3',
        id: 'node-1-3',
        children: [
          {
            title: 'node-1-3-1',
            id: 'node-1-3-1',
          },
          {
            title: 'node-1-3-2',
            id: 'node-1-3-2',
          },
        ],
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
        children: [
          {
            title: 'node-2-1-1',
            id: 'node-2-1-1',
          },
          {
            title: 'node-2-1-2',
            id: 'node-2-1-2',
          },
        ],
      },
    ],
  },
])
</script>

<style scoped>
button {
  margin-left: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 12px;
  height: 20px;
}
</style>
