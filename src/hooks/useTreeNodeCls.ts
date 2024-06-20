import { Ref, computed } from "vue"
import { TreeNodeProps } from "../components/TreeNode.vue"

const prefixCls = 'vtree-tree-node'

export { prefixCls as TREE_NODE_PREFIX_CLS }

export const useTreeNodeCls = (props: TreeNodeProps, dragoverRefs: {
  dragoverBody: Ref<boolean>
  dragoverBefore: Ref<boolean>
  dragoverAfter: Ref<boolean>
}) => {
  const {
    dragoverBody,
    dragoverBefore,
    dragoverAfter,
  } = dragoverRefs

  const indentWrapperCls = computed(() => {
    return [
      `${prefixCls}__indent-wrapper`,
    ]
  })
  const wrapperCls = computed(() => {
    return [
      `${prefixCls}__wrapper`,
      {
        [`${prefixCls}__wrapper_is-leaf`]: props.data?.isLeaf,
        [`${prefixCls}_disabled`]:
          props.disableAll || props.data?.disabled
      },
      // 复选
      {
        [`${prefixCls}_checked`]: props.checkable && props.data?.checked,
        [`${prefixCls}_indeterminate`]: props.checkable && props.data?.indeterminate
      },
      // 单选
      {
        [`${prefixCls}_selected`]: props.data?.selected,
      }
    ]
  })
  const nodeBodyCls = computed(() => {
    return [
      `${prefixCls}__node-body`,
      {
        [`${prefixCls}__drop_active`]: dragoverBody.value
      }
    ]
  })
  const dropBeforeCls = computed(() => {
    return [
      `${prefixCls}__drop`,
      {
        [`${prefixCls}__drop_active`]: dragoverBefore.value
      }
    ]
  })
  const dropAfterCls = computed(() => {
    return [
      `${prefixCls}__drop`,
      {
        [`${prefixCls}__drop_active`]: dragoverAfter.value
      }
    ]
  })
  // const squareCls = computed(() => {
  //   return [`${prefixCls}__square`]
  // })
  // 复选框图标
  const checkboxWrapperCls = computed(() => {
    return [`${prefixCls}__square`, `${prefixCls}__checkbox_wrapper`]
  })
  const expandCls = computed(() => {
    return [
      `${prefixCls}__square`,
      `${prefixCls}__expand`,
      {
        [`${prefixCls}__expand_active`]: props.data?.expand
      }
    ]
  })
  const loadingIconCls = computed(() => {
    return [`${prefixCls}__loading-icon`]
  })
  const checkboxCls = computed(() => {
    return [
      `${prefixCls}__checkbox`,
      {
        [`${prefixCls}__checkbox_checked`]: props.data?.checked,
        [`${prefixCls}__checkbox_indeterminate`]: props.data?.indeterminate,
        [`${prefixCls}__checkbox_disabled`]:
          props.disableAll || props.data?.disabled
      }
    ]
  })
  const titleCls = computed(() => {
    return [
      `${prefixCls}__title`,
      {
        [`${prefixCls}__title_selected`]: props.data?.selected,
        [`${prefixCls}__title_disabled`]:
          props.disableAll || props.data?.disabled
      }
    ]
  })

  return {
    indentWrapperCls,
    wrapperCls,
    nodeBodyCls,
    dropBeforeCls,
    dropAfterCls,
    checkboxWrapperCls,
    expandCls,
    loadingIconCls,
    checkboxCls,
    titleCls,
  }
}
