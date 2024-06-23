<template>
  <div :class="wrapperCls">
    <!-- 搜索、操作区域 -->
    <div :class="searchCls">
      <div v-if="showCheckAll && checkable" :class="checkAllWrapperCls">
        <div :class="checkboxCls" @click="handleCheckAll"></div>
      </div>
      <div :class="inputWrapperCls">
        <slot name="search-input">
          <input
            v-model="keyword"
            type="text"
            :class="inputCls"
            :placeholder="searchPlaceholder"
            :disabled="searchDisabled"
            @input="handleSearch"
          />
        </slot>
      </div>
      <div :class="actionWrapperCls">
        <span
          v-if="showCheckedButton && checkable"
          :class="checkedButtonCls"
          @click="handleShowChecked"
        >
          {{ checkedButtonText }}
        </span>
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- 树区域 -->
    <div :class="treeWrapperCls">
      <VTree
        ref="treeRef"
        v-bind="props"
        v-model="treeModelValue"
        v-on="treeListeners"
        @set-data="onSetData"
        @checked-change="checkedChange"
      >
        <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </VTree>
    </div>

    <!-- 底部信息 -->
    <div v-if="showFooter && checkable" :class="footerCls">
      <slot name="footer">
        <span style="float: right">已选 {{ checkedCount }} 个</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export type TreeSearchProps = TreeProps & {
  /** 搜索输入框的 placeholder */
  searchPlaceholder?: string,

  /** 是否显示全选复选框 */
  showCheckAll?: boolean,

  /** 是否显示已选按钮 */
  showCheckedButton?: boolean,

  /** 已选按钮文字 */
  checkedButtonText?: string,

  /** 是否显示底部信息 */
  showFooter?: boolean,

  /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
  searchMethod?: (keyword: string) => void | Promise<void>,

  /** 触发搜索的字符长度 */
  searchLength?: number,

  /** 禁用搜索功能 */
  searchDisabled?: boolean,

  /** 是否远程搜索，传入 `searchMethod` 时无效 */
  searchRemote?: boolean,

  /** 搜索防抖时间，单位为毫秒 */
  searchDebounceTime?: number
}

export const DEFAULT_TREE_SEARCH_PROPS = {
  ...DEFAULT_TREE_PROPS,
  searchPlaceholder: '搜索关键字',
  showCheckAll: true,
  showCheckedButton: true,
  checkedButtonText: '已选',
  showFooter: true,
  searchLength: 1,
  searchDisabled: false,
  searchRemote: false,
  searchDebounceTime: 300,
}
</script>

<script setup lang="ts">
import {
  reactive,
  ref,
  computed,
  onMounted,
} from 'vue'
import VTree, { DEFAULT_TREE_PROPS, TreeProps } from './Tree.vue'
import { useTreeSearchCls } from '../hooks/useTreeSearchCls'
import { TreeNode } from '..'
import { getVTreeMethods } from '../utils'
import { TREE_API_METHODS } from '../constants'
import { TREE_EVENTS, TREE_SEARCH_EVENTS } from '../constants/events'

const props = withDefaults(defineProps<TreeSearchProps>(), DEFAULT_TREE_SEARCH_PROPS)

const emit = defineEmits(['update:modelValue', ...TREE_SEARCH_EVENTS])

const EXCLUDED_TREE_NODE_EVENTS = ['set-data', 'checked-change']

const treeListeners = TREE_EVENTS.reduce((prev, eventName) => {
  if (EXCLUDED_TREE_NODE_EVENTS.indexOf(eventName) < 0) {
    prev[eventName] = (...args: any[]) => {
      emit(eventName, ...args)
    }
  }
  return prev
}, {} as Record<string, Function>)

const checkAllStatus = reactive({
  checked: false,
  /** 半选 */
  indeterminate: false,
  /** 禁用 */
  disabled: false
})
const isShowingChecked = ref(false)
const keyword = ref('')
const debounceTimer = ref<number | undefined>(undefined)
const checkedCount = ref(0)
const treeRef = ref<InstanceType<typeof VTree> | null>(null)

const {
  wrapperCls,
  searchCls,
  checkAllWrapperCls,
  checkboxCls,
  inputWrapperCls,
  inputCls,
  actionWrapperCls,
  checkedButtonCls,
  treeWrapperCls,
  footerCls,
} = useTreeSearchCls(props, {
  checkAllStatus,
  isShowingChecked,
})

const treeModelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: newVal => {
    updateCheckedCount()
    emit('update:modelValue', newVal)
  }
})

function clearKeyword(): void {
  keyword.value = ''
}

/** 获取搜索关键字 */
function getKeyword(): string {
  return keyword.value
}

/** 执行搜索 */
function search(keyword1?: string): Promise<void> {
  let searchKeyword: string = keyword1 as string
  if (typeof keyword1 !== 'string') {
    searchKeyword = keyword.value
  }
  return new Promise((resolve, reject) => {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(() => {
      if (
        searchKeyword.length > 0 &&
        searchKeyword.length < props.searchLength
      )
        return
      isShowingChecked.value = false
      emit('search', searchKeyword)
      if (typeof props.searchMethod === 'function') {
        const searchReturnValue: void | Promise<void> =
          props.searchMethod(searchKeyword)
        Promise.resolve(searchReturnValue).then(() => {
          updateCheckAllStatus()
          resolve()
        })
      } else {
        if (!treeRef.value) return
        if (props.searchRemote) {
          // 远程搜索
          treeRef.value.loadRootNodes().then(() => {
            updateCheckAllStatus()
            resolve()
          })
        } else {
          // 本地搜索
          treeRef.value.filter(searchKeyword)
          updateCheckAllStatus()
          resolve()
        }
      }
    }, props.searchDebounceTime)
  })
}
//#endregion Public API

//#region Event handlers
/** 处理全选点击 */
function handleCheckAll(): void {
  const keyField = treeRef.value?.keyField
  if (props.searchDisabled || checkAllStatus.disabled || !treeRef.value || !keyField) return

  const currentVisibleKeys = treeRef.value.getCurrentVisibleNodes().map((node: TreeNode) => node[keyField])
  if (checkAllStatus.checked || checkAllStatus.indeterminate) {
    // 反选
    treeRef.value.setCheckedKeys(currentVisibleKeys, false)
  } else {
    // 全选
    treeRef.value.setCheckedKeys(currentVisibleKeys, true)
  }

  updateCheckAllStatus()
}

/** 处理搜索 */
function handleSearch(): void {
  search()
}

/** 处理已选点击 */
function handleShowChecked(): void {
  const execShowChecked = () => {
    // 处理展示已选操作
    isShowingChecked.value = !isShowingChecked.value
    if (isShowingChecked.value) {
      // 展示已选
      treeRef.value?.showCheckedNodes()
    } else {
      // 恢复展示
      treeRef.value?.filter(keyword.value, () => true)
    }

    updateCheckAllStatus()
  }

  if (keyword.value) {
    // 清空关键字
    clearKeyword()
    search().then(() => {
      execShowChecked()
    })
  } else {
    execShowChecked()
  }
}

/** 处理树数据更新 */
function handleSetData(): void {
  updateCheckedCount()
  updateCheckAllStatus()
}
//#endregion Event handlers

/** 更新全选复选框状态 */
function updateCheckAllStatus(): void {
  const currentVisibleNodes = treeRef.value?.getCurrentVisibleNodes() || []
  const length = currentVisibleNodes.length
  let hasChecked = false
  let hasUnchecked = false
  let isInterrupted = false
  for (let i = 0; i < length; i++) {
    const node = currentVisibleNodes[i]
    if (node.checked) {
      hasChecked = true
    } else {
      hasUnchecked = true
    }
    if ((hasChecked && hasUnchecked) || node.indeterminate) {
      isInterrupted = true
      checkAllStatus.checked = false
      checkAllStatus.indeterminate = true
      break
    }
  }
  if (!isInterrupted) {
    checkAllStatus.checked = hasChecked
    checkAllStatus.indeterminate = false
  }
}

function updateCheckedCount(): void {
  checkedCount.value = treeRef.value?.getCheckedKeys().length || 0
}

function checkedChange(value1: any, value2: any) {
  updateCheckAllStatus()
  emit('checked-change', value1, value2)
}

function onSetData() {
  emit('set-data')
  handleSetData()
}
onMounted(() => {
  if (props.checkable && !checkedCount.value) {
    handleSetData()
  }
})

defineExpose({
  ...getVTreeMethods(TREE_API_METHODS, treeRef),
  clearKeyword,
  getKeyword,
  search,
})

defineOptions({
  name: 'VTreeSearch',
  inheritAttrs: false,
})
</script>
