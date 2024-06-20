<template>
  <div :class="wrapperCls">
    <!-- 展示框 -->
    <div ref="referenceRef" :class="referenceCls" @click="handleRefClick">
      <slot v-bind="slotProps">
        <div :class="displayInputCls">
          <span :class="displayInputTextCls">
            <slot name="display" v-bind="slotProps">
              {{ displayValue }}
            </slot>
          </span>
          <template v-if="!dropDisabled">
            <i :class="dropIconCls"></i>
            <slot v-if="clearable && showClearIcon" name="clear">
              <i :class="clearIconCls" @click.stop="handleClear"></i>
            </slot>
          </template>
        </div>
      </slot>
    </div>

    <!-- 下拉框 -->
    <transition name="vtree-dropdown">
      <div
        ref="dropdownRef"
        v-show="dropdownVisible"
        :class="dropdownCls"
        :style="{
          height: `${dropHeight}px`
        }"
      >
        <VTreeSearch
          ref="treeSearchRef"
          v-bind="props"
          v-model="treeSearchValue"
          v-on="treeSearchListeners"
          @set-data="handleSetData"
          @checked-change="handleCheckedChange"
          @selected-change="handleSelectedChange"
        >
          <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </VTreeSearch>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export type TreeDropProps = TreeSearchProps & {
  /** 下拉内容高度 */
  dropHeight?: number,

  /** 展示输入框 placeholder */
  dropPlaceholder?: string,

  /** 是否禁用 */
  dropDisabled?: boolean,

  /** 允许清空 */
  clearable?: boolean,
  
  /** 下拉弹出框位置 */
  placement?: PlacementType,

  /** 将下拉 DOM 转移到 body 中 */
  transfer?: boolean,

  /** 在下拉框容器上额外添加的 class */
  dropdownClassName?: string | string[],

  /** 下拉框容器最小宽度，未指定则默认为展示输入框宽度 */
  dropdownMinWidth?: number,

  /** 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条 */
  dropdownWidthFixed?: boolean,
}

export const DEFAULT_TREE_DROP_PROPS = {
  ...DEFAULT_TREE_SEARCH_PROPS,
  dropHeight: 300,
  dropDisabled: false,
  clearable: false,
  placement: placementEnum['bottom-start'],
  transfer: false,
  dropdownWidthFixed: false,
}
</script>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  nextTick,
} from 'vue'
import VTreeSearch, { DEFAULT_TREE_SEARCH_PROPS, TreeSearchProps } from './TreeSearch.vue'
import { TreeNode } from '../store'
import { TREE_SEARCH_API_METHODS, placementEnum } from '../constants'
import { TREE_DROP_EVENTS, TREE_SEARCH_EVENTS } from '../constants/events'
import { TreeNodeKeyType, TreeDropSlotProps, PlacementType } from '../types'
import { getVTreeMethods } from '../utils'
import { useTreeDropCls } from '../hooks/useTreeDropCls'

const props = withDefaults(defineProps<TreeDropProps>(), DEFAULT_TREE_DROP_PROPS)

const emit = defineEmits([
  'update:modelValue',
  ...TREE_DROP_EVENTS,
])

const EXCLUDED_TREE_NODE_EVENTS = ['set-data', 'checked-change', 'selected-change']

const treeSearchListeners = TREE_SEARCH_EVENTS.reduce((prev, eventName) => {
  if (EXCLUDED_TREE_NODE_EVENTS.indexOf(eventName) < 0) {
    prev[eventName] = (...args: any[]) => {
      emit(eventName, ...args)
    }
  }
  return prev
}, {} as Record<string, Function>)

const dropdownVisible = ref(false)
const checkedCount = ref(0)
const selectedTitle = ref('')

const {
  wrapperCls,
  referenceCls,
  displayInputCls,
  displayInputTextCls,
  dropIconCls,
  clearIconCls,
  dropdownCls,
} = useTreeDropCls(props, {
  dropdownVisible,
  checkedCount,
  selectedTitle,
})

const referenceRef = ref()
const dropdownRef = ref()
const treeSearchRef = ref<InstanceType<typeof VTreeSearch> | null>(null)
const slotProps = reactive<TreeDropSlotProps>({
  /** 多选选中的节点 */
  checkedNodes: [] as TreeNode[],

  /** 多选选中的节点 key */
  checkedKeys: [] as TreeNodeKeyType[],

  /** 单选选中的节点 */
  selectedNode: undefined,

  /** 单选选中的节点 key */
  selectedKey: undefined
})
const treeSearchValue = computed({
  get: () => {
    return props.modelValue
  },
  set: newVal => {
    emit('update:modelValue', newVal)
  }
})

const displayValue = computed(() => {
  if (props.checkable) {
    if (
      checkedCount.value === 0 &&
      typeof props.dropPlaceholder === 'string'
    )
      return props.dropPlaceholder
    return `已选 ${checkedCount.value} 个`
  } else if (props.selectable) {
    if (
      selectedTitle.value === '' &&
      typeof props.dropPlaceholder === 'string'
    )
      return props.dropPlaceholder
    return selectedTitle.value
  } else return props.dropPlaceholder || ''
})
const showClearIcon = computed(() => {
  if (props.checkable) return checkedCount.value !== 0
  else if (props.selectable) return selectedTitle.value !== ''
  return false
})
function locateDropdown(): void {
  const referenceRect = referenceRef.value.getBoundingClientRect()
  const referenceWidth = referenceRect.width
  const referenceHeight = referenceRect.height

  // Set dropdown width
  const minWidth = `${
    typeof props.dropdownMinWidth === 'number'
      ? props.dropdownMinWidth
      : referenceWidth
  }px`
  dropdownRef.value.style.minWidth = minWidth
  dropdownRef.value.style.width = props.dropdownWidthFixed
    ? minWidth
    : 'auto'

  const dropdownRect = dropdownRef.value.getBoundingClientRect()
  const dropdownStyleDeclaration = window.getComputedStyle(
    dropdownRef.value
  )
  const dropdownMarginHorizontal =
    parseFloat(dropdownStyleDeclaration.marginLeft) +
    parseFloat(dropdownStyleDeclaration.marginRight)
  const dropdownMarginVertical =
    parseFloat(dropdownStyleDeclaration.marginTop) +
    parseFloat(dropdownStyleDeclaration.marginBottom)
  const dropdownWidth = dropdownRect.width + dropdownMarginHorizontal
  // 0.8 这个值写在 css 里，因为有动画，所以获取到的是 scaleY 变换后的值
  const dropdownHeight = dropdownRect.height / 0.8 + dropdownMarginVertical
  let top = 0
  let left = 0
  if (props.transfer) {
    top = -999
    left = -999
  }
  switch (props.placement) {
    case 'bottom-start':
      if (props.transfer) {
        top = window.pageYOffset + referenceRect.bottom
        left = window.pageXOffset + referenceRect.left
      } else {
        top = referenceHeight
      }
      break
    case 'bottom-end':
      if (props.transfer) {
        top = window.pageYOffset + referenceRect.bottom
        left = window.pageXOffset + referenceRect.right - dropdownWidth
      } else {
        top = referenceHeight
        left = referenceWidth - dropdownWidth
      }
      break
    case 'bottom':
      if (props.transfer) {
        top = window.pageYOffset + referenceRect.bottom
        left =
          window.pageXOffset +
          referenceRect.left +
          (referenceWidth - dropdownWidth) / 2
      } else {
        top = referenceHeight
        left = (referenceWidth - dropdownWidth) / 2
      }
      break
    case 'top-start':
      if (props.transfer) {
        top = window.pageYOffset + referenceRect.top - dropdownHeight
        left = window.pageXOffset + referenceRect.left
      } else {
        top = -dropdownHeight
      }
      break
    case 'top-end':
      if (props.transfer) {
        top = window.pageYOffset + referenceRect.top - dropdownHeight
        left = window.pageXOffset + referenceRect.right - dropdownWidth
      } else {
        top = -dropdownHeight
        left = referenceWidth - dropdownWidth
      }
      break
    case 'top':
      if (props.transfer) {
        top = window.pageYOffset + referenceRect.top - dropdownHeight
        left =
          window.pageXOffset +
          referenceRect.left +
          (referenceWidth - dropdownWidth) / 2
      } else {
        top = -dropdownHeight
        left = (referenceWidth - dropdownWidth) / 2
      }
      break
  }

  dropdownRef.value.style.top = `${top}px`
  dropdownRef.value.style.left = `${left}px`
}

//#region Event handlers
function handleRefClick(): void {
  if (props.dropDisabled) return
  dropdownVisible.value = !dropdownVisible.value
}
function handleDocumentClick(e: MouseEvent): void {
  if (
    !referenceRef.value?.contains(e.target as Node) &&
    !dropdownRef.value?.contains(e.target as Node)
  ) {
    dropdownVisible.value = false
  }
}
function handleClear(): void {
  emit('clear')
  if (props.checkable) {
    treeSearchRef.value?.clearChecked()
  } else if (props.selectable) {
    treeSearchRef.value?.clearSelected()
  }
}
function handleCheckedChange(
  nodes: TreeNode[],
  keys: TreeNodeKeyType[]
): void {
  slotProps.checkedNodes = nodes
  slotProps.checkedKeys = keys
  checkedCount.value = keys.length
  emit('checked-change', nodes, keys)
}
function handleSelectedChange(
  node?: TreeNode,
  key?: TreeNodeKeyType
): void {
  slotProps.selectedNode = node
  slotProps.selectedKey = key

  if (node) {
    const titleField = props.titleField
    if (titleField) {
      selectedTitle.value = node[titleField]
    }
  } else if (key) {
    selectedTitle.value = key as string
  } else {
    selectedTitle.value = ''
  }
  dropdownVisible.value = false
  emit('selected-change', node, key)
}

/** 处理树数据更新 */
function handleSetData(): void {
  slotProps.checkedNodes = treeSearchRef.value?.getCheckedNodes() || []
  slotProps.checkedKeys = treeSearchRef.value?.getCheckedKeys() || []
  slotProps.selectedNode = treeSearchRef.value?.getSelectedNode() || undefined
  slotProps.selectedKey = treeSearchRef.value?.getSelectedKey() || undefined

  if (props.checkable) {
    checkedCount.value = slotProps.checkedKeys.length
  }
  if (props.selectable) {
    if (props.modelValue != null) {
      const node = treeSearchRef.value?.getNode(
        props.modelValue as TreeNodeKeyType
      )
      if (node) {
        const titleField = props.titleField
        if (titleField) {
          selectedTitle.value = node[titleField]
        }
      } else {
        selectedTitle.value = props.modelValue as any
      }
    }
  }
}
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  if (props.transfer) {
    document.body.appendChild(dropdownRef.value)
  }
  handleSetData()
})
watch(
  () => dropdownVisible.value,
  newVal => {
    emit('dropdown-visible-change', newVal)
    if (newVal) {
      nextTick(() => {
        locateDropdown()
      })
    } else {
      if (treeSearchRef.value?.getKeyword()) {
        treeSearchRef.value.clearKeyword()
        treeSearchRef.value.search()
      }
    }
  }
)
//#endregion

defineExpose({
  ...getVTreeMethods(TREE_SEARCH_API_METHODS, treeSearchRef),
})

defineOptions({
  name: 'VTreeDrop',
  inheritAttrs: false,
})
</script>
