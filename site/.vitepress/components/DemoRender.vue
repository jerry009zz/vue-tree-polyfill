<template>
  <ClientOnly>
    <div
      :style="{
        width: '100%',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#FFF',
        border: '1px solid lightgray',
      }"
    >
      <component :is="vueComponent" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{
  component: string
}>()

const vueComponent = (await import(`../code/${props.component}.vue`)).default
</script>
