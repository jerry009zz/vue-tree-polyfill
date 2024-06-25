import { Ref, nextTick, ref } from "vue"
import { TreeNode } from "../store"
import { TreeProps } from "../components/Tree.vue"

type IUseExpandAnimationProps = Required<Pick<TreeProps, 
'keyField' |
'animation'
>>

export const useExpandAnimation = (renderNodesRef: Ref<TreeNode[]>, props: IUseExpandAnimationProps) => {
  const expandAnimationStart = ref(false)
  const expandAnimationReady = ref(false)
  const expandNodeIndex = ref(-1)
  const expandNodeLevel = ref(-1)
  const expandNodeCurrentState = ref(false)
  const expandNodeNextState = ref(false)

  const expandTopNodes = ref<TreeNode[]>([])
  const expandMiddleNodes = ref<TreeNode[]>([])
  const expandBottomNodes = ref<TreeNode[]>([])

  const resetExpandAnimation = () => {
    expandAnimationStart.value = false
    expandAnimationReady.value = false
    expandNodeIndex.value = -1
    expandNodeLevel.value = -1

    expandTopNodes.value = []
    expandMiddleNodes.value = []
    expandBottomNodes.value = []
  }

  const updateMiddleNodes = () => {
    const nodeToExpandLevel = expandNodeLevel.value
    const middleNodes: TreeNode[] = []
    const renderNodesLength = renderNodesRef.value.length
    for (let i = expandNodeIndex.value + 1; i < renderNodesLength; i++) {
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
      expandTopNodes.value = renderNodesRef.value.slice(0, expandNodeIndex.value + 1)
      if (expandNodeNextState.value) {
        updateMiddleNodes()
      } else {
        expandBottomNodes.value = renderNodesRef.value.slice(expandNodeIndex.value + 1)
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
