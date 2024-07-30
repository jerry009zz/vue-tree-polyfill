//#region ignoreMode
export enum ignoreEnum {
  none = 'none',
  parents = 'parents',
  children = 'children'
}
//#endregion ignoreMode

//#region API
// Tree API
export const TREE_API_METHODS = [
  'setData',
  'setChecked',
  'setCheckedKeys',
  'checkAll',
  'clearChecked',
  'setSelected',
  'clearSelected',
  'setExpand',
  'setExpandKeys',
  'setExpandAll',
  'getCheckedNodes',
  'getCheckedKeys',
  'getIndeterminateNodes',
  'getSelectedNode',
  'getSelectedKey',
  'getExpandNodes',
  'getExpandKeys',
  'getCurrentVisibleNodes',
  'getNode',
  'getTreeData',
  'getFlatData',
  'getNodesCount',
  'insertBefore',
  'insertAfter',
  'append',
  'prepend',
  'remove',
  'filter',
  'showCheckedNodes',
  'loadRootNodes',
  'updateNode',
  'updateNodes',
  'scrollTo'
] as const

export const TREE_SEARCH_API_METHODS = [...TREE_API_METHODS, 'clearKeyword', 'getKeyword', 'search'] as const

export enum placementEnum {
  'bottom-start' = 'bottom-start',
  'bottom-end' = 'bottom-end',
  'bottom' = 'bottom',
  'top-start' = 'top-start',
  'top-end' = 'top-end',
  'top' = 'top'
}

//#region Scroll position
export enum verticalPositionEnum {
  top = 'top',
  center = 'center',
  bottom = 'bottom'
}

export type VerticalPositionType = keyof typeof verticalPositionEnum
//#endregion Scroll position

//#region Drag
export enum dragHoverPartEnum {
  before = 'before',
  body = 'body',
  after = 'after'
}
//#endregion Drag

export enum showLineType {
  // dotted = 'dotted',
  dashed = 'dashed',
  solid = 'solid',
}
