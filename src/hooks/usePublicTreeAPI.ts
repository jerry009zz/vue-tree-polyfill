import { ref } from "vue"
import { AnyPropsArrayType, INonReactiveData, IgnoreType, TreeNodeKeyType } from "../types"
import { TreeNode } from ".."
import { ITreeNodeOptions } from "../store/tree-node"
import { FilterFunctionType } from "../store/tree-store"
import { TreeProps } from "../components/Tree.vue"

type IUsePublicTreeAPIProps = Required<Pick<TreeProps, 
  'selectable' |
  'checkable' |
  'separator' |
  'ignoreMode' |
  'titleField' |
  'keyField' |
  'showUnloadCheckedNodes' |
  'unloadDataList'
>> & Pick<TreeProps, 'modelValue' | 'filterMethod' | 'load'>

export const usePublicTreeAPI = (
  nonReactive: INonReactiveData,
  props: IUsePublicTreeAPIProps,
  options: {
    resetSpaceHeights: () => void,
    updateExpandedKeys: () => void,
    updateBlockData: () => void,
    updateRender: () => void,
  },
) => {
  const {
    resetSpaceHeights,
    updateExpandedKeys,
    updateBlockData,
    updateRender,
  } = options

  const unloadCheckedNodes = ref<TreeNode[]>([])
  const isRootLoading = ref(false)

  /** 使用此方法重置树数据，可避免大量数据被 vue 监听 */
  function setData(data: AnyPropsArrayType): void {
    resetSpaceHeights()
    let checkableUnloadKeys: TreeNodeKeyType | TreeNodeKeyType[] | null = null
    let selectableUnloadKey: TreeNodeKeyType | null = null
    if (props.checkable) {
      if (Array.isArray(props.modelValue)) {
        checkableUnloadKeys = props.modelValue.concat()
      } else if (typeof props.modelValue === 'string') {
        checkableUnloadKeys =
          props.modelValue === ''
            ? []
            : props.modelValue.split(props.separator)
      }
    } else if (props.selectable && !Array.isArray(props.modelValue)) {
      selectableUnloadKey = props.modelValue as TreeNodeKeyType | null
    }
    nonReactive.store.setData(
      data,
      selectableUnloadKey,
      checkableUnloadKeys as TreeNodeKeyType[]
    )
    updateExpandedKeys()
  }
  function setChecked(key: TreeNodeKeyType, value: boolean): void {
    nonReactive.store.setChecked(key, value)
  }
  function setCheckedKeys(keys: TreeNodeKeyType[], value: boolean): void {
    nonReactive.store.setCheckedKeys(keys, value)
  }
  function checkAll(): void {
    nonReactive.store.checkAll()
  }
  function clearChecked(): void {
    nonReactive.store.clearChecked()
  }
  function setSelected(key: TreeNodeKeyType, value: boolean): void {
    nonReactive.store.setSelected(key, value)
  }
  function clearSelected(): void {
    nonReactive.store.clearSelected()
  }
  function setExpand(
    key: TreeNodeKeyType,
    value: boolean,
    expandParent: boolean = true
  ): void {
    nonReactive.store.setExpand(key, value, expandParent)
  }
  function setExpandKeys(keys: TreeNodeKeyType[], value: boolean): void {
    nonReactive.store.setExpandKeys(keys, value)
  }
  function setExpandAll(value: boolean): void {
    nonReactive.store.setExpandAll(value)
  }
  function getCheckedNodes(ignoreMode?: IgnoreType): TreeNode[] {
    ignoreMode = ignoreMode || props.ignoreMode
    return nonReactive.store.getCheckedNodes(ignoreMode)
  }
  function getCheckedKeys(ignoreMode?: IgnoreType): TreeNodeKeyType[] {
    ignoreMode = ignoreMode || props.ignoreMode
    return nonReactive.store.getCheckedKeys(ignoreMode)
  }
  function getIndeterminateNodes(): TreeNode[] {
    return nonReactive.store.getIndeterminateNodes()
  }
  function getSelectedNode(): TreeNode | null {
    return nonReactive.store.getSelectedNode()
  }
  function getSelectedKey(): TreeNodeKeyType | null {
    return nonReactive.store.getSelectedKey()
  }
  function getExpandNodes(): TreeNode[] {
    return nonReactive.store.getExpandNodes()
  }
  function getExpandKeys(): TreeNodeKeyType[] {
    return nonReactive.store.getExpandKeys()
  }
  function getCurrentVisibleNodes(): TreeNode[] {
    return nonReactive.store.flatData.filter(node => node._filterVisible)
  }
  function getNode(key: TreeNodeKeyType): TreeNode | null {
    return nonReactive.store.getNode(key)
  }
  /** 返回树形结构的节点数据 */
  function getTreeData(): TreeNode[] {
    return nonReactive.store.data
  }
  /** 返回扁平化后的节点数据 */
  function getFlatData(): TreeNode[] {
    return nonReactive.store.flatData
  }
  function getNodesCount(): number {
    return nonReactive.store.flatData.length
  }
  function insertBefore(
    insertedNode: TreeNodeKeyType | ITreeNodeOptions,
    referenceKey: TreeNodeKeyType
  ): TreeNode | null {
    return nonReactive.store.insertBefore(insertedNode, referenceKey)
  }
  function insertAfter(
    insertedNode: TreeNodeKeyType | ITreeNodeOptions,
    referenceKey: TreeNodeKeyType
  ): TreeNode | null {
    return nonReactive.store.insertAfter(insertedNode, referenceKey)
  }
  function append(
    insertedNode: TreeNodeKeyType | ITreeNodeOptions,
    parentKey: TreeNodeKeyType
  ): TreeNode | null {
    return nonReactive.store.append(insertedNode, parentKey)
  }
  function prepend(
    insertedNode: TreeNodeKeyType | ITreeNodeOptions,
    parentKey: TreeNodeKeyType
  ): TreeNode | null {
    return nonReactive.store.prepend(insertedNode, parentKey)
  }
  function remove(removedKey: TreeNodeKeyType): TreeNode | null {
    return nonReactive.store.remove(removedKey)
  }
  function filter(keyword: string, filterMethod?: FilterFunctionType): void {
    const defaultFilterMethod = (keyword: string, node: TreeNode) => {
      const title = node[props.titleField]
      if (title == null || !title.toString) return false
      return (
        (title.toString() as string)
          .toLowerCase()
          .indexOf(keyword.toLowerCase()) > -1
      )
    }
    filterMethod = filterMethod || props.filterMethod || defaultFilterMethod
    nonReactive.store.filter(keyword, filterMethod)
  }
  /**
   * 展示已选节点
   */
  function showCheckedNodes(showUnloadCheckedNodes?: boolean): void {
    if (!props.checkable) return
    showUnloadCheckedNodes =
      showUnloadCheckedNodes == null
        ? props.showUnloadCheckedNodes
        : showUnloadCheckedNodes
    const checkedNodesCache = nonReactive.store.getCheckedNodes()
    nonReactive.store.filter('', (keyword, node) => node.checked)
    if (!showUnloadCheckedNodes) return
    const unloadKeys = nonReactive.store.getUnloadCheckedKeys()
    if (unloadKeys.length) {
      const unloadNodes: TreeNode[] = unloadKeys.map(key => {
        const queryList = props.unloadDataList.concat(checkedNodesCache)
        let title = key
        queryList.some(query => {
          if (
            query[props.keyField] === key &&
            query[props.titleField] != null
          ) {
            title = query[props.titleField]
            return true
          }
          return false
        })

        return new TreeNode(
          {
            [props.keyField]: key,
            [props.titleField]: title,
            checked: true,
            isLeaf: true
          },
          null,
          props.keyField,
          !!props.load
        )
      })
      unloadCheckedNodes.value = unloadNodes as TreeNode[]
      nonReactive.blockNodes.push(...unloadNodes)
      updateBlockData()
      updateRender()
    }
  }
  /**
   * 从远程加载根节点
   */
  function loadRootNodes(): Promise<void> {
    isRootLoading.value = true
    return new Promise((resolve, reject) => {
      if (props.load) props.load(null, resolve, reject)
    })
      .then(root => {
        if (Array.isArray(root)) {
          setData(root as AnyPropsArrayType)
        }
      })
      .catch(() => {})
      .then(() => {
        isRootLoading.value = false
      })
  }

  return {
    unloadCheckedNodes,
    isRootLoading,
    setData,
    setChecked,
    setCheckedKeys,
    checkAll,
    clearChecked,
    setSelected,
    clearSelected,
    setExpand,
    setExpandKeys,
    setExpandAll,
    getCheckedNodes,
    getCheckedKeys,
    getIndeterminateNodes,
    getSelectedNode,
    getSelectedKey,
    getExpandNodes,
    getExpandKeys,
    getCurrentVisibleNodes,
    getNode,
    getTreeData,
    getFlatData,
    getNodesCount,
    insertBefore,
    insertAfter,
    append,
    prepend,
    remove,
    filter,
    showCheckedNodes,
    loadRootNodes,
  }
}
