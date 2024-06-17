import { TreeNodeKeyType } from '../types'
import TreeNode from './tree-node'

interface IListenersMap {
  [eventName: string]: Function[]
}

type NodeGeneralListenerType = (node: TreeNode) => void

export type ListenerType<T extends keyof IEventNames> = IEventNames[T]

export interface IEventNames {
  'set-data': () => void
  'visible-data-change': () => void
  'render-data-change': () => void
  expand: NodeGeneralListenerType
  select: NodeGeneralListenerType
  unselect: NodeGeneralListenerType
  'selected-change': (
    node: TreeNode | null,
    key: TreeNodeKeyType | null
  ) => void
  check: NodeGeneralListenerType
  uncheck: NodeGeneralListenerType
  'checked-change': (nodes: TreeNode[], keys: TreeNodeKeyType[]) => void
}

export default class TreeEventTarget {
  /** 事件 listeners */
  private listenersMap: IListenersMap = {}

  on<T extends keyof IEventNames>(
    eventName: T,
    listener: ListenerType<T> | Array<ListenerType<T>>
  ): void {
    if (!this.listenersMap[eventName]) {
      this.listenersMap[eventName] = []
    }
    let listeners: Array<ListenerType<T>> = []
    if (!Array.isArray(listener)) {
      listeners = [listener]
    } else {
      listeners = listener
    }
    listeners.forEach(listener => {
      if (this.listenersMap[eventName].indexOf(listener) === -1) {
        this.listenersMap[eventName].push(listener)
      }
    })
  }

  off<T extends keyof IEventNames>(
    eventName: T,
    listener?: ListenerType<T>
  ): void {
    if (!this.listenersMap[eventName]) return
    if (!listener) {
      this.listenersMap[eventName] = []
    } else {
      const index = this.listenersMap[eventName].indexOf(listener)
      if (index > -1) {
        this.listenersMap[eventName].splice(index, 1)
      }
    }
  }

  emit<T extends keyof IEventNames>(
    eventName: T,
    ...args: Parameters<IEventNames[T]>
  ): void {
    if (!this.listenersMap[eventName]) return
    const length: number = this.listenersMap[eventName].length
    for (let i: number = 0; i < length; i++) {
      this.listenersMap[eventName][i](...args)
    }
  }

  disposeListeners(): void {
    for (const eventName in this.listenersMap) {
      this.listenersMap[eventName] = []
    }
  }
}
