import { Ref, computed } from 'vue'
import { TREE_NODE_PREFIX_CLS as treeNodePrefixCls } from './useTreeNodeCls'
import { TreeSearchProps } from '../components/TreeSearch.vue'

const prefixCls = 'vtree-tree-search'

export { prefixCls as TREE_SEARCH_PREFIX_CLS }

export const useTreeSearchCls = (props: TreeSearchProps, options: {
  checkAllStatus: {
    checked: boolean
    indeterminate: boolean
    disabled: boolean
  }
  isShowingChecked: Ref<boolean>
}) => {
  const { checkAllStatus, isShowingChecked } = options

  const wrapperCls = computed(() => {
    return [`${prefixCls}__wrapper`]
  })
  const searchCls = computed(() => {
    return [`${prefixCls}__search`]
  })
  const checkAllWrapperCls = computed(() => {
    return [`${prefixCls}__check-all-wrapper`]
  })
  const checkboxCls = computed(() => {
    return [
      `${prefixCls}__check-all`,
      `${treeNodePrefixCls}__checkbox`,
      {
        [`${treeNodePrefixCls}__checkbox_checked`]: checkAllStatus.checked,
        [`${treeNodePrefixCls}__checkbox_indeterminate`]:
          checkAllStatus.indeterminate,
        [`${treeNodePrefixCls}__checkbox_disabled`]:
          props.searchDisabled || checkAllStatus.disabled
      }
    ]
  })
  const inputWrapperCls = computed(() => {
    return [`${prefixCls}__input-wrapper`]
  })
  const inputCls = computed(() => {
    return [
      `${prefixCls}__input`,
      {
        [`${prefixCls}__input_disabled`]: props.searchDisabled
      }
    ]
  })
  const actionWrapperCls = computed(() => {
    return [`${prefixCls}__action-wrapper`]
  })
  const checkedButtonCls = computed(() => {
    return [
      `${prefixCls}__checked-button`,
      {
        [`${prefixCls}__checked-button_active`]: isShowingChecked.value
      }
    ]
  })
  const treeWrapperCls = computed(() => {
    return [`${prefixCls}__tree-wrapper`]
  })
  const footerCls = computed(() => {
    return [`${prefixCls}__footer`]
  })

  return {
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
  }
}
