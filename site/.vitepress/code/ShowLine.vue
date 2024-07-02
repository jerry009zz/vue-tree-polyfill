<template>
  <div>
    <div>
      <span>showLine.type: </span>

      <input type="radio" id="showline-type-solid" value="solid" v-model="type" />
      <label for="showline-type-solid">solid</label>

      <input type="radio" id="showline-type-dashed" value="dashed" v-model="type" />
      <label for="showline-type-dashed">dashed</label>
    </div>

    <div>
      <span>showLine.polyline: </span>

      <input type="radio" id="showline-polyline-true" :value="true" v-model="polyline" />
      <label for="showline-polyline-true">true</label>

      <input type="radio" id="showline-polyline-false" :value="false" v-model="polyline" />
      <label for="showline-polyline-false">false</label>
    </div>
  </div>
  <VTree :data="data" :showLine="showLine" animation defaultExpandAll />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const type = ref('solid')
const polyline = ref(false)

const showLine = computed(() => {
  return {
    type: type.value,
    polyline: polyline.value,
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
