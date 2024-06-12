import { IEventNames } from "../store/tree-store"

export const TREE_NODE_EVENTS = [
  'expand',
  'check',
  'click',
  'select',
  'node-dblclick',
  'node-right-click',
  'node-dragstart',
  'node-dragenter',
  'node-dragover',
  'node-dragleave',
  'node-drop'
]

export const STORE_EVENTS: Array<keyof IEventNames> = [
  'expand',
  'select',
  'unselect',
  'selected-change',
  'check',
  'uncheck',
  'checked-change',
  'set-data'
]

export const TREE_EVENTS = [...TREE_NODE_EVENTS, ...STORE_EVENTS]

export const TREE_SEARCH_EVENTS = ['search', ...TREE_EVENTS]

export const TREE_DROP_EVENTS = [
  'clear',
  'dropdown-visible-change',
  ...TREE_SEARCH_EVENTS,
]
