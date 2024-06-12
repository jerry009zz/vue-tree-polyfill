<template>
  <div :class="wrapperCls">
    <div :class="dropBeforeCls"></div>
    <div ref="nodeBody" :class="nodeBodyCls" v-on="dropListeners">
      <!-- 展开按钮 -->
      <div :class="expandCls">
        <!-- 外层用于占位，icon 用于点击 -->
        <i
          v-show="!data?.isLeaf && !data?._loading"
          @click="handleExpand"
        ></i>
        <LoadingIcon v-if="data?._loading" :class="loadingIconCls" />
      </div>

      <!-- 复选框 -->
      <div v-if="showCheckbox" :class="checkboxWrapperCls">
        <div :class="checkboxCls" @click="handleCheck"></div>
      </div>

      <!-- 标题 -->
      <div
        :class="titleCls"
        @click="handleSelect"
        @dblclick="handleDblclick"
        @contextmenu="handleRightClick"
        v-on="dragListeners"
        :draggable="draggable && !disableAll && !data?.disabled"
      >
        <component v-if="renderFunction" :is="renderComponent"></component>
        <template v-else>{{ data ? data[titleField] : '' }}</template>
      </div>
    </div>
    <div :class="dropAfterCls"></div>
  </div>
</template>

<script lang="ts">
type PickedProps = Required<Pick<TreeProps,
  'titleField' |
  'keyField' |
  'checkable' |
  'selectable' |
  'unselectOnClick' |
  'disableAll' |
  'draggable' |
  'droppable'
>> & Pick<TreeProps, 'render'>

export type TreeNodeProps = PickedProps & {
  data: TreeNode,
  getNode?: GetNodeFn,
}
</script>

<script setup lang="ts">
import {
  defineComponent,
  ref,
  computed,
  getCurrentInstance,
  h,
} from 'vue'
import { TreeNode } from '../store'
import LoadingIcon from './LoadingIcon.vue'
import { dragHoverPartEnum } from '../constants'
import { TREE_NODE_EVENTS } from '../constants/events'
import { useTreeNodeCls } from '../hooks/useTreeNodeCls'
import { TreeProps } from './Tree.vue'
import { GetNodeFn } from '../types'

const props = defineProps<TreeNodeProps>()

const emit = defineEmits([...TREE_NODE_EVENTS])

const dragoverBody = ref(false)
const dragoverBefore = ref(false)
const dragoverAfter = ref(false)
const keyField = props.keyField as string
const getNode = props.getNode as Function

const {
  wrapperCls,
  nodeBodyCls,
  dropBeforeCls,
  dropAfterCls,
  checkboxWrapperCls,
  expandCls,
  loadingIconCls,
  checkboxCls,
  titleCls,
} = useTreeNodeCls(props, {
  dragoverBody,
  dragoverBefore,
  dragoverAfter,
})

const fullData = computed(() => {
  return (
    getNode(props.data ? props.data[keyField] : '') ||
    props.data ||
    ({} as TreeNode)
  )
})
const showCheckbox = computed(() => {
  return props.checkable
})
const renderFunction = props.data?.render || props.render || null
const renderComponent = computed(() => {
  return defineComponent({
    name: 'Render',
    functional: true,
    render() {
      if (typeof renderFunction !== 'function') return h('div')
      return renderFunction(fullData.value)
    }
  })
})
const dragListeners = computed(() => {
  let result = {}
  if (props.draggable && !props.disableAll && !props.data?.disabled) {
    result = {
      dragstart: handleDragStart
    }
  }
  return result
})
const dropListeners = computed(() => {
  let result = {}
  if (props.droppable) {
    result = {
      dragenter: handleDragEnter.bind(getCurrentInstance()),
      dragover: handleDragOver.bind(getCurrentInstance()),
      dragleave: handleDragLeave.bind(getCurrentInstance()),
      drop: handleDrop.bind(getCurrentInstance())
    }
  }
  return result
})

function handleExpand(): void {
  if (props.data?.isLeaf) return
  emit('expand', fullData.value)
}

function handleCheck(): void {
  if (props.disableAll || props.data?.disabled || !props.checkable) return
  emit('check', fullData.value)
}

function handleSelect(e: MouseEvent): void {
  emit('click', fullData.value, e)
  if (props.selectable) {
    if (props.disableAll || props.data?.disabled) return
    if (props.data?.selected && !props.unselectOnClick) return
    emit('select', fullData.value)
  } else if (props.checkable) {
    handleCheck()
  } else {
    handleExpand()
  }
}

function handleDblclick(e: MouseEvent): void {
  emit('node-dblclick', fullData.value, e)
}

function handleRightClick(e: MouseEvent): void {
  emit('node-right-click', fullData.value, e)
}

//#region Drag handlers
/** 计算拖拽到节点的哪个部分 */
const nodeBody = ref()
function getHoverPart(e: DragEvent) {
  const boundingClientRect = nodeBody.value.getBoundingClientRect()
  const height = boundingClientRect.height
  const y = e.clientY - boundingClientRect.top
  if (y <= height * 0.3) return dragHoverPartEnum.before
  if (y <= height * (0.3 + 0.4)) return dragHoverPartEnum.body
  return dragHoverPartEnum.after
}

/**
 * 重置 dragover 标志位
 * @param hoverPart 计算出的拖拽部分
 * @param isLeaveOrDrop 是否是 dragleave 或者 drop 事件，如果是则不再把标志位置为 true
 */
function resetDragoverFlags(
  hoverPart: dragHoverPartEnum,
  isLeaveOrDrop = false
) {
  dragoverBefore.value = false
  dragoverBody.value = false
  dragoverAfter.value = false
  if (!isLeaveOrDrop) {
    if (hoverPart === dragHoverPartEnum.before) dragoverBefore.value = true
    else if (hoverPart === dragHoverPartEnum.body) dragoverBody.value = true
    else if (hoverPart === dragHoverPartEnum.after)
      dragoverAfter.value = true
  }
}

function handleDragStart(e: DragEvent): void {
  if (e.dataTransfer) {
    e.dataTransfer.setData('node', JSON.stringify(props.data))
  }
  if (props.data?.expand) handleExpand()
  emit('node-dragstart', fullData.value, e)
}

function handleDragEnter(e: DragEvent): void {
  e.preventDefault()
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart)
  emit('node-dragenter', fullData.value, e, hoverPart)
}

function handleDragOver(e: DragEvent): void {
  e.preventDefault()
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart)
  emit('node-dragover', fullData.value, e, hoverPart)
}

function handleDragLeave(e: DragEvent): void {
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart, true)
  emit('node-dragleave', fullData.value, e, hoverPart)
}

function handleDrop(e: DragEvent): void {
  const hoverPart = getHoverPart(e)
  resetDragoverFlags(hoverPart, true)
  emit('node-drop', fullData.value, e, hoverPart)
}

defineOptions({
  name: 'CTreeNode',
})
</script>
