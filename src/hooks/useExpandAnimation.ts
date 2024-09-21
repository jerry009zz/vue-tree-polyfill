import { Ref, nextTick, ref } from "vue"
import { TreeNode } from "../store"
import { TreeProps } from "../components/Tree.vue"

type IUseExpandAnimationProps = Required<Pick<TreeProps, 
'keyField' |
'animation'
>>

export const useExpandAnimation = (renderNodesRef: Ref<TreeNode[]>, renderStartRef: Ref<number>, props: IUseExpandAnimationProps) => {
  const expandAnimationStart = ref(false)
  const expandAnimationReady = ref(false)
  const expandNodeIndex = ref(-1)
  const expandNodeLevel = ref(-1)
  const expandNodeCurrentState = ref(false)
  const expandNodeNextState = ref(false)

  const expandRenderStart = ref(0)
  const expandTopNodes = ref<TreeNode[]>([])
  const expandMiddleNodes = ref<TreeNode[]>([])
  const expandBottomNodes = ref<TreeNode[]>([])

  const resetExpandAnimation = () => {
    expandAnimationStart.value = false
    expandAnimationReady.value = false
    expandNodeIndex.value = -1
    expandNodeLevel.value = -1

    expandRenderStart.value = 0
    expandTopNodes.value = []
    expandMiddleNodes.value = []
    expandBottomNodes.value = []
  }

  const updateMiddleNodes = () => {
    const nodeToExpandLevel = expandNodeLevel.value
    const middleNodes: TreeNode[] = []
    const renderNodesLength = renderNodesRef.value.length
    const expandRenderStartDiff = renderStartRef.value - expandRenderStart.value
    for (let i = expandNodeIndex.value - expandRenderStartDiff + 1; i < renderNodesLength; i++) {
      if (renderNodesRef.value[i]._level > nodeToExpandLevel) {
        middleNodes.push(renderNodesRef.value[i])
      } else break
    }
    expandMiddleNodes.value = middleNodes
  }

  const updateBeforeExpand = (nodeToExpand: TreeNode) => {
    if (!props.animation) return
    resetExpandAnimation()

    const key = nodeToExpand[props.keyField]
    const index = renderNodesRef.value.findIndex((renderNode) => renderNode[props.keyField] === key)
    if (index > -1) {
      expandNodeIndex.value = index
      expandNodeLevel.value = nodeToExpand._level
      expandAnimationStart.value = true
      expandNodeCurrentState.value = nodeToExpand.expand
      expandNodeNextState.value = !nodeToExpand.expand
      expandRenderStart.value = renderStartRef.value

      if (expandNodeNextState.value) {
        expandBottomNodes.value = renderNodesRef.value.slice(expandNodeIndex.value + 1)
      } else {
        updateMiddleNodes()
      }
    }
  }

  const updateAfterExpand = () => {
    if (!props.animation) return

    if (!expandAnimationStart.value) {
      expandAnimationStart.value = false
      return
    }

    if (expandNodeIndex.value === -1) return

    nextTick(() => {
      const expandRenderStartDiff = renderStartRef.value - expandRenderStart.value
      expandTopNodes.value = renderNodesRef.value.slice(0, expandNodeIndex.value - expandRenderStartDiff + 1)
      if (expandNodeNextState.value) {
        updateMiddleNodes()
      } else {
        expandBottomNodes.value = renderNodesRef.value.slice(expandNodeIndex.value - expandRenderStartDiff + 1)
      }
      expandAnimationReady.value = true
      nextTick(() => {
        expandNodeCurrentState.value = !expandNodeCurrentState.value
      })
    })
  }

  const onExpandAnimationFinish = () => {
    resetExpandAnimation()
  }

  return {
    ready: expandAnimationReady,
    currentExpandState: expandNodeCurrentState,

    topNodes: expandTopNodes,
    middleNodes: expandMiddleNodes,
    bottomNodes: expandBottomNodes,

    updateBeforeExpand,
    updateAfterExpand,
    onExpandAnimationFinish,
  }
}
