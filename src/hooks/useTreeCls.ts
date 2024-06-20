import { computed } from "vue"

const prefixCls = 'vtree-tree'

export { prefixCls as TREE_PREFIX_CLS }

export const useTreeCls = () => {
  const wrapperCls = computed(() => {
    return [`${prefixCls}__wrapper`]
  })
  const scrollAreaCls = computed(() => {
    return [`${prefixCls}__scroll-area`]
  })
  const blockAreaCls = computed(() => {
    return [`${prefixCls}__block-area`]
  })
  const emptyCls = computed(() => {
    return [`${prefixCls}__empty`]
  })
  const emptyTextDefaultCls = computed(() => {
    return [`${prefixCls}__empty-text_default`]
  })
  const loadingCls = computed(() => {
    return [`${prefixCls}__loading`]
  })
  const loadingWrapperCls = computed(() => {
    return [`${prefixCls}__loading-wrapper`]
  })
  const loadingIconCls = computed(() => {
    return [`${prefixCls}__loading-icon`]
  })
  const iframeCls = computed(() => {
    return [`${prefixCls}__iframe`]
  })

  return {
    wrapperCls,
    scrollAreaCls,
    blockAreaCls,
    emptyCls,
    emptyTextDefaultCls,
    loadingCls,
    loadingWrapperCls,
    loadingIconCls,
    iframeCls,
  }
}
