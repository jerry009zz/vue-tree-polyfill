---
layout: page
navbar: false
sidebar: false
---

<Playground/>

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const Playground = defineClientComponent(() => {
  return import('./.vitepress/components/Playground.vue')
})
</script>
