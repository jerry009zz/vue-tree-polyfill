---
layout: page
navbar: false
sidebar: false
title: Playground
---

<ClientOnly>
  <Playground/>
</ClientOnly>

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'

const Playground = defineClientComponent(() => {
  return import('./.vitepress/components/Playground.vue')
})
</script>
