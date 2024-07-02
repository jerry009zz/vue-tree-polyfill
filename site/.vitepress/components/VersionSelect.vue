<template>
  <span class="select-root" @click.stop>
    <span class="select-trigger" @click="open = !open">
      <span>{{ name }} Version</span>
      <span class="select-text">{{ modelValue }}</span>
      <span class="select-icon">&gt;</span>
    </span>
    <div v-show="open" class="dropdown">
      <ul>
        <li v-if="loading">Loading versions...</li>
        <li
          v-for="version in versionList"
          :class="{ 'selected-version': version === modelValue }"
          @click="modelValue = version, open = false"
        >
          {{ version }}
        </li>
      </ul>
    </div>
  </span>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'

const modelValue = defineModel<string>()

const props = defineProps<{
  name: string
  packageName: string
}>()

const open = ref(false)
const versionList = ref<string[] | null>(null)
const loading = ref(false)
const latestTag = ref()

watchEffect(async () => {
  if (!loading.value && !versionList.value) {
    loading.value = true
    const { tags, versions } = await (await fetch(`https://data.jsdelivr.com/v1/package/npm/${props.packageName}`)).json() as { tags: Record<string, string>, versions: string[] }
    versionList.value = ['latest'].concat(versions.filter((v) => !v.includes('-')))
    if (tags?.latest) latestTag.value = tags.latest
    loading.value = false
  }
})

watchEffect(() => {
  if (modelValue.value === 'latest' && latestTag.value) {
    modelValue.value = latestTag.value
  }
})

onMounted(() => {
  window.addEventListener('click', () => {
    open.value = false
  })

  window.addEventListener('blur', () => {
    if (document.activeElement?.tagName === 'IFRAME') {
      open.value = false
    }
  })
})
</script>

<style scoped>
.select-root {
  display: inline-block;
  position: relative;
}

.select-trigger {
  cursor: pointer;
}

.select-text {
  color: #3ca877;
  margin: 0 4px;
}

.select-icon {
  display: inline-block;
  color: darkgray;
  transform: rotate(90deg);
}

.dropdown {
  border: 1px solid lightgray;
  border-radius: 4px;
  min-width: 200px;
  max-width: 300px;
  min-height: 30px;
  max-height: calc(100vh - 50px);
  position: absolute;
  top: 30px;
  left: 0px;
  z-index: 999;
  background-color: #FFF;
  overflow-y: scroll;
  padding: 8px 12px;
}

.dropdown li {
  cursor: pointer;
}

.dropdown li:hover {
  color: #3ca877;
}

.selected-version {
  color: #3ca877;
}
</style>
