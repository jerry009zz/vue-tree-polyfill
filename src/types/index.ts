import { placementEnum, ignoreEnum, showLineType } from '../constants'

import TreeStore, { TreeNode } from '../store'

export type PlacementType = keyof typeof placementEnum

export type TreeNodeKeyType = string | number

export type GetNodeFn = (key: TreeNodeKeyType) => TreeNode | null

export type IgnoreType = keyof typeof ignoreEnum

export type LoadFn = (node: null | TreeNode, resolve: Function, reject: Function) => any

export interface TreeDropSlotProps {
  /** 多选选中的节点 */
  checkedNodes: TreeNode[]
  /** 多选选中的节点 key */
  checkedKeys: TreeNodeKeyType[]
  /** 单选选中的节点 */
  selectedNode?: TreeNode

  /** 单选选中的节点 key */
  selectedKey?: TreeNodeKeyType
}

export type AnyPropsArrayType = Array<{ [key: string]: any }>

export interface INonReactiveData {
  store: TreeStore
  blockNodes: TreeNode[]
}

// Utils to generate types like 1 | 2 | 3
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface ShowLine {
  /** 连接线宽度，svg stroke-width， 默认 1px */
  width?: number
  type?: showLineType
  color?: string
  polyline?: boolean
  dashDensity?: IntRange<1, 11>
}
