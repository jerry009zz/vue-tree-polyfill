<template>
  <div class="performance-control-container">
    <div class="performance-control">
      <div class="performance-control-item">
        <label>Node depth (1 ~ 10):</label>
        <input v-model="treeDepth" type="number" :min="1" :max="10" />
      </div>
      <div class="performance-control-item">
        <label>Nodes per layer:</label>
        <input v-model="nodesPerLayer" type="number" />
      </div>
      <div class="performance-control-item">
        <span>Node count: 
          <span v-if="tooManyNodes" :style="{ color: 'red' }">Too many nodes!</span>
          <span v-else>{{ totalNodesToGenerate }}</span>
        </span>
      </div>
    </div>

    <div class="performance-control">
      <span :style="{ marginRight: '20px' }">Quick generate:</span>
      <button
        v-for="quick in quickGenerateButtons"
        :key="quick.name"
        @click="treeDepth = quick.treeDepth, nodesPerLayer = quick.nodesPerLayer"
      >
        {{ quick.name }}
      </button>
      <button :disabled="tooManyNodes" @click="handleSetData">Set data</button>
    </div>

    <div class="performance-control">
      <span>Current rendered node count: {{ currentNodeCount }}</span>
    </div>
  </div>

  <div class="performance-control-container">
    <div class="performance-control">
      <div class="performance-control-item">
        <label>Scroll to node id:</label>
        <input v-model="scrollKey" type="text" />
      </div>
      <div class="performance-control-item">
        <label>Scroll position:</label>
        <select v-model="scrollVerticalOption">
          <option value="top">top</option>
          <option value="center">center</option>
          <option value="bottom">bottom</option>
        </select>
      </div>
      <div class="performance-control-item">
        <label>Scroll offset:</label>
        <input v-model="scrollOffset" type="number" />
      </div>
    </div>

    <div class="performance-control">
      <div class="performance-control-item">
        <button @click="handleScrollToNode">Scroll to node</button>
        <span>(Note: only applicable to expanded nodes)</span>
      </div>
    </div>
  </div>

  <div :style="{ height: '500px' }">
    <VTree
      ref="tree"
      :showLine="{ polyline: true }"
      animation
      defaultExpandAll
      selectable
      checkable
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VTree from '@wsfe/vue-tree'

const tree = ref<InstanceType<typeof VTree> | null>(null)
const treeDepth = ref(1)
const nodesPerLayer = ref(10)
const currentNodeCount = ref(0)

const scrollKey = ref('100')
const scrollVerticalOption = ref('top' as const)
const scrollOffset = ref(0)

const totalNodesToGenerate = computed(() => {
  const d = ~~Number(treeDepth.value)
  const n = ~~Number(nodesPerLayer.value)

  if (d < 1 || d > 10) return 0
  if (n < 1) return 0

  let total = 0
  let times = d
  while (times) {
    total += Math.pow(n, times--)
  }

  return total
})

const tooManyNodes = computed(() => {
  return totalNodesToGenerate.value < 1 || totalNodesToGenerate.value > 1000000
})

const quickGenerateButtons = [
  {
    name: '10k',
    treeDepth: 3,
    nodesPerLayer: 22,
  },
  {
    name: '100k',
    treeDepth: 3,
    nodesPerLayer: 47,
  },
  {
    name: '200k',
    treeDepth: 3,
    nodesPerLayer: 59,
  },
  {
    name: '300k',
    treeDepth: 3,
    nodesPerLayer: 67,
  },
]

const handleSetData = () => {
  const data = treeDataGenerator(treeDepth.value, nodesPerLayer.value)
  tree.value?.setData(data.data)
  currentNodeCount.value = data.total
}

const handleScrollToNode = () => {
  tree.value?.scrollTo(
    scrollKey.value,
    scrollOffset.value || scrollVerticalOption.value
  )
}
</script>

<script lang="ts">
interface ITreeNodeData {
  title?: string | number
  id?: string | number
  children?: ITreeNodeData[]
}

function treeDataGenerator (
  treeDepth = 5,
  nodesPerLayer = 10,
): { data: ITreeNodeData[]; total: number } {
  let data: ITreeNodeData[] = []
  let total = 0
  let orderCount = 0
  const genNodeData = (root: ITreeNodeData[], level: number = 0): void => {
    if (level >= treeDepth) return
    const len: number = nodesPerLayer
      ? nodesPerLayer
      : Math.floor(Math.random() * 100)
    for (let i: number = 0; i < len; i++) {
      let title = orderCount.toString()
      const id = title
      const node = {
        title,
        id,
        children: []
      }
      root.push(node)
      total++
      orderCount++
      genNodeData(node.children, level + 1)
    }
  }
  genNodeData(data)
  return {
    data,
    total
  }
}
</script>

<style scoped>
.performance-control-container {
  border-bottom: 1px solid lightgray;
  font-size: 14px;
  margin-bottom: 10px;
}

.performance-control {
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.performance-control input, .performance-control select {
  border: none;
  border-bottom: 1px solid lightgray;
  width: 50px;
  margin-left: 20px;
}

.performance-control button {
  border: 1px solid lightgray;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 20px;
}

.performance-control-item {
  display: inline-block;
  margin-right: 20px;
}
</style>
