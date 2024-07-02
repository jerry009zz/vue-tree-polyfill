<template>
  <VTree :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VTree from '@wsfe/vue-tree'

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
