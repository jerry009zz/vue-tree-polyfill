<template>
  <div>
    <button @click="remoteShow = true">Load root data</button>
  </div>
  <div :style="{ height: '150px', position: 'relative' }">
    <VTree v-if="remoteShow" :load="remoteLoad" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const remoteShow = ref(false)

const remoteLoad = (node, resolve) => {
  const length = node ? 2 : 5
  setTimeout(() => {
    resolve(Array.from({ length }).map((_, index) => {
      return {
        title: index.toString(),
        id: Math.random().toString(),
      }
    }))
  }, 1000)
}
</script>
