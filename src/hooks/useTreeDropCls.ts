import { Ref, computed } from 'vue'
import { TREE_SEARCH_PREFIX_CLS as treeSearchPrefixCls } from './useTreeSearchCls'
import { TreeDropProps } from '../components/TreeDrop.vue'

const prefixCls = 'vtree-tree-drop'

export { prefixCls as TREE_DROP_PREFIX_CLS }

export const useTreeDropCls = (props: TreeDropProps, options: {
  dropdownVisible: Ref<boolean>
  checkedCount: Ref<number>
  selectedTitle: Ref<string>
}) => {
  const {
    dropdownVisible,
    checkedCount,
    selectedTitle,
  } = options

  const wrapperCls = computed(() => {
    return [`${prefixCls}__wrapper`]
  })
  const referenceCls = computed(() => {
    return [`${prefixCls}__reference`]
  })

  const displayInputCls = computed(() => {
    return [
      `${treeSearchPrefixCls}__input`,
      `${prefixCls}__display-input`,
      {
        [`${prefixCls}__display-input_focus`]: dropdownVisible.value,
        [`${treeSearchPrefixCls}__input_disabled`]: props.dropDisabled
      }
    ]
  })

  const displayInputTextCls = computed(() => {
    let showPlaceholder: boolean = false
    if (typeof props.dropPlaceholder === 'string') {
      if (props.checkable) showPlaceholder = checkedCount.value === 0
      else if (props.selectable) showPlaceholder = selectedTitle.value === ''
    }
    return [
      `${prefixCls}__display-input-text`,
      {
        [`${prefixCls}__display-input-placeholder`]: showPlaceholder
      }
    ]
  })

  const dropIconCls = computed(() => {
    return [
      `${prefixCls}__display-icon-drop`,
      {
        [`${prefixCls}__display-icon-drop_active`]: dropdownVisible.value
      }
    ]
  })

  const clearIconCls = computed(() => {
    return [`${prefixCls}__display-icon-clear`]
  })

  const dropdownCls = computed(() => {
    const extraClassName = Array.isArray(props.dropdownClassName)
      ? props.dropdownClassName
      : [props.dropdownClassName]
    return [`${prefixCls}__dropdown`, ...extraClassName]
  })

  return {
    wrapperCls,
    referenceCls,
    displayInputCls,
    displayInputTextCls,
    dropIconCls,
    clearIconCls,
    dropdownCls,
  }
}
