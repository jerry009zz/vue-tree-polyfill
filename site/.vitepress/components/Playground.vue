<template>
  <Repl :editor="Monaco" :store="store" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'

const query = new URLSearchParams(location.search)

const {
  importMap: builtinImportMap,
  vueVersion,
} = useVueImportMap()

const store = useStore(
  {
    // pre-set import map
    builtinImportMap,
    vueVersion,
  },
  // initialize repl with previously serialized state
  location.hash,
)
</script>

<style scoped>
.vue-repl {
  height: 100vh;
}
</style>
