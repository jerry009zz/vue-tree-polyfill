<template>
  <button @click="handleUpdateSingleNode">Update node-1</button>
  <button @click="handleUpdateMultipleNode">Update node-1 & node-2</button>
  <VTree ref="tree" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const tree = ref()

const data = [
  {
    title: 'node-1',
    id: 'node-1',
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

const count = ref(0)

const handleUpdateSingleNode = () => {
  count.value++
  tree.value.updateNode('node-1', { title: `node-1 - ${count.value}` })
}
const handleUpdateMultipleNode = () => {
  count.value++
  tree.value.updateNodes([
    {
      id: 'node-1',
      title: `node-1 - ${count.value}`,
    },
    {
      id: 'node-2',
      title: `node-2 - ${count.value}`,
    },
  ])
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
