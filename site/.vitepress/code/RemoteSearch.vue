<template>
  <VTreeSearch
    v-model="checked"
    checkable
    :expandOnFilter="false"
    searchRemote
    :load="load"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VTreeSearch } from '@wsfe/vue-tree'

const checked = ref()
const searchKeyword = ref('')

const handleSearch = (keyword) => {
  searchKeyword.value = keyword
}

const load = (node, resolve) => {
  setTimeout(() => {
    if (searchKeyword.value) {
      resolve([
        { title: 'search-1', id: 'search-1', isLeaf: true },
        { title: 'search-2', id: 'search-2', isLeaf: true },
      ])
    } else {
      resolve([
        { title: 'node-1', id: 'node-1', isLeaf: true },
        { title: 'node-2', id: 'node-2', isLeaf: true },
      ])
    }
  }, 1000)
}
</script>
