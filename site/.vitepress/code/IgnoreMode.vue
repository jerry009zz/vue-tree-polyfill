<template>
  <div>
    <span>ignoreMode: </span>

    <input type="radio" id="ignore-mode-none" value="none" v-model="ignoreMode" />
    <label for="ignore-mode-none">none</label>

    <input type="radio" id="ignore-mode-parents" value="parents" v-model="ignoreMode" />
    <label for="ignore-mode-parents">parents</label>

    <input type="radio" id="ignore-mode-children" value="children" v-model="ignoreMode" />
    <label for="ignore-mode-children">children</label>
  </div>
  <VTree v-if="flag" v-model="checked" :data="data" checkable :ignoreMode="ignoreMode" />
  <div>Checked Nodes: {{ checked }}</div>
</template>

<script setup lang="ts">
import { nextTick, ref, watchEffect } from 'vue'
import VTree from '@wsfe/vue-tree'

const ignoreMode = ref('none')
const checked = ref(null)
const flag = ref(true)

watchEffect(() => {
  if (ignoreMode.value) {
    flag.value = false
    checked.value = null
    nextTick(() => flag.value = true)
  }
})

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
