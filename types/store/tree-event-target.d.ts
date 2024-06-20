import { TreeNodeKeyType } from '../types';
import TreeNode from './tree-node';
type NodeGeneralListenerType = (node: TreeNode) => void;
export type ListenerType<T extends keyof IEventNames> = IEventNames[T];
export interface IEventNames {
    'set-data': () => void;
    'visible-data-change': () => void;
    'render-data-change': () => void;
    expand: NodeGeneralListenerType;
    select: NodeGeneralListenerType;
    unselect: NodeGeneralListenerType;
    'selected-change': (node: TreeNode | null, key: TreeNodeKeyType | null) => void;
    check: NodeGeneralListenerType;
    uncheck: NodeGeneralListenerType;
    'checked-change': (nodes: TreeNode[], keys: TreeNodeKeyType[]) => void;
}
export default class TreeEventTarget {
    /** 事件 listeners */
    private listenersMap;
    on<T extends keyof IEventNames>(eventName: T, listener: ListenerType<T> | Array<ListenerType<T>>): void;
    off<T extends keyof IEventNames>(eventName: T, listener?: ListenerType<T>): void;
    emit<T extends keyof IEventNames>(eventName: T, ...args: Parameters<IEventNames[T]>): void;
    disposeListeners(): void;
}
export {};
