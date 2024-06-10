import { TreeProps } from './Tree.vue';
import { TreeNode } from '..';
export type TreeSearchProps = TreeProps & {
    /** 搜索输入框的 placeholder */
    searchPlaceholder?: string;
    /** 是否显示全选复选框 */
    showCheckAll?: boolean;
    /** 是否显示已选按钮 */
    showCheckedButton?: boolean;
    /** 已选按钮文字 */
    checkedButtonText?: string;
    /** 是否显示底部信息 */
    showFooter?: boolean;
    /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
    searchMethod?: (keyword: string) => void | Promise<void>;
    /** 触发搜索的字符长度 */
    searchLength?: number;
    /** 禁用搜索功能 */
    searchDisabled?: boolean;
    /** 是否远程搜索，传入 `searchMethod` 时无效 */
    searchRemote?: boolean;
    /** 搜索防抖时间，单位为毫秒 */
    searchDebounceTime?: number;
};
export declare const DEFAULT_TREE_SEARCH_PROPS: {
    searchPlaceholder: string;
    showCheckAll: boolean;
    showCheckedButton: boolean;
    checkedButtonText: string;
    showFooter: boolean;
    searchLength: number;
    searchDisabled: boolean;
    searchRemote: boolean;
    searchDebounceTime: number;
    data: () => never[];
    unloadDataList: () => never[];
    showUnloadCheckedNodes: boolean;
    emptyText: string;
    titleField: string;
    keyField: string;
    separator: string;
    checkable: boolean;
    selectable: boolean;
    filteredNodeCheckable: boolean;
    cascade: boolean;
    enableLeafOnly: boolean;
    disableAll: boolean;
    defaultExpandAll: boolean;
    defaultExpandedKeys: () => never[];
    expandedKeys: () => never[];
    draggable: boolean;
    droppable: boolean;
    beforeDropMethod: () => () => boolean;
    ignoreMode: import("../const").ignoreEnum;
    autoLoad: boolean;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
};
export declare const TREE_SEARCH_EVENTS: string[];
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<TreeSearchProps>, {
    searchPlaceholder: string;
    showCheckAll: boolean;
    showCheckedButton: boolean;
    checkedButtonText: string;
    showFooter: boolean;
    searchLength: number;
    searchDisabled: boolean;
    searchRemote: boolean;
    searchDebounceTime: number;
    data: () => never[];
    unloadDataList: () => never[];
    showUnloadCheckedNodes: boolean;
    emptyText: string;
    titleField: string;
    keyField: string;
    separator: string;
    checkable: boolean;
    selectable: boolean;
    filteredNodeCheckable: boolean;
    cascade: boolean;
    enableLeafOnly: boolean;
    disableAll: boolean;
    defaultExpandAll: boolean;
    defaultExpandedKeys: () => never[];
    expandedKeys: () => never[];
    draggable: boolean;
    droppable: boolean;
    beforeDropMethod: () => () => boolean;
    ignoreMode: import("../const").ignoreEnum;
    autoLoad: boolean;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
}>, {
    clearKeyword: () => void;
    getKeyword: () => string;
    search: (keyword1?: string) => Promise<void>;
    filter: (keyword: string, filterMethod?: import("../store/tree-store.js").FilterFunctionType | undefined) => void;
    setData: (data: import("../types/index.js").AnyPropsArrayType) => void;
    setChecked: (key: import("../types/index.js").TreeNodeKeyType, value: boolean) => void;
    setCheckedKeys: (keys: import("../types/index.js").TreeNodeKeyType[], value: boolean) => void;
    checkAll: () => void;
    clearChecked: () => void;
    setSelected: (key: import("../types/index.js").TreeNodeKeyType, value: boolean) => void;
    clearSelected: () => void;
    setExpand: (key: import("../types/index.js").TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
    setExpandKeys: (keys: import("../types/index.js").TreeNodeKeyType[], value: boolean) => void;
    setExpandAll: (value: boolean) => void;
    getCheckedNodes: (ignoreMode?: "children" | "none" | "parents" | undefined) => TreeNode[];
    getCheckedKeys: (ignoreMode?: "children" | "none" | "parents" | undefined) => import("../types/index.js").TreeNodeKeyType[];
    getIndeterminateNodes: () => TreeNode[];
    getSelectedNode: () => TreeNode | null;
    getSelectedKey: () => import("../types/index.js").TreeNodeKeyType | null;
    getExpandNodes: () => TreeNode[];
    getExpandKeys: () => import("../types/index.js").TreeNodeKeyType[];
    getCurrentVisibleNodes: () => TreeNode[];
    getNode: (key: import("../types/index.js").TreeNodeKeyType) => TreeNode | null;
    getTreeData: () => TreeNode[];
    getFlatData: () => TreeNode[];
    getNodesCount: () => number;
    insertBefore: (insertedNode: import("../types/index.js").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, referenceKey: import("../types/index.js").TreeNodeKeyType) => TreeNode | null;
    insertAfter: (insertedNode: import("../types/index.js").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, referenceKey: import("../types/index.js").TreeNodeKeyType) => TreeNode | null;
    append: (insertedNode: import("../types/index.js").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, parentKey: import("../types/index.js").TreeNodeKeyType) => TreeNode | null;
    prepend: (insertedNode: import("../types/index.js").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, parentKey: import("../types/index.js").TreeNodeKeyType) => TreeNode | null;
    remove: (removedKey: import("../types/index.js").TreeNodeKeyType) => TreeNode | null;
    showCheckedNodes: (showUnloadCheckedNodes?: boolean | undefined) => void;
    loadRootNodes: () => Promise<void>;
    scrollTo: (key: import("../types/index.js").TreeNodeKeyType, verticalPosition?: number | "bottom" | "top" | "center") => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<TreeSearchProps>, {
    searchPlaceholder: string;
    showCheckAll: boolean;
    showCheckedButton: boolean;
    checkedButtonText: string;
    showFooter: boolean;
    searchLength: number;
    searchDisabled: boolean;
    searchRemote: boolean;
    searchDebounceTime: number;
    data: () => never[];
    unloadDataList: () => never[];
    showUnloadCheckedNodes: boolean;
    emptyText: string;
    titleField: string;
    keyField: string;
    separator: string;
    checkable: boolean;
    selectable: boolean;
    filteredNodeCheckable: boolean;
    cascade: boolean;
    enableLeafOnly: boolean;
    disableAll: boolean;
    defaultExpandAll: boolean;
    defaultExpandedKeys: () => never[];
    expandedKeys: () => never[];
    draggable: boolean;
    droppable: boolean;
    beforeDropMethod: () => () => boolean;
    ignoreMode: import("../const").ignoreEnum;
    autoLoad: boolean;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
}>>>, {
    keyField: string;
    ignoreMode: "children" | "none" | "parents";
    filteredNodeCheckable: boolean;
    cascade: boolean;
    defaultExpandAll: boolean;
    expandOnFilter: boolean;
    data: import("../types/index.js").AnyPropsArrayType;
    titleField: string;
    checkable: boolean;
    selectable: boolean;
    unselectOnClick: boolean;
    disableAll: boolean;
    draggable: boolean;
    droppable: boolean;
    emptyText: string;
    separator: string;
    showUnloadCheckedNodes: boolean;
    unloadDataList: import("../types/index.js").AnyPropsArrayType;
    enableLeafOnly: boolean;
    defaultExpandedKeys: import("../types/index.js").TreeNodeKeyType[];
    expandedKeys: import("../types/index.js").TreeNodeKeyType[];
    beforeDropMethod: (dragKey: import("../types/index.js").TreeNodeKeyType, dropKey: import("../types/index.js").TreeNodeKeyType, hoverPart: import("../const").dragHoverPartEnum) => boolean;
    autoLoad: boolean;
    loading: boolean;
    nodeIndent: number;
    renderNodeAmount: number;
    nodeMinHeight: number;
    bufferNodeAmount: number;
    searchPlaceholder: string;
    showCheckAll: boolean;
    showCheckedButton: boolean;
    checkedButtonText: string;
    showFooter: boolean;
    searchLength: number;
    searchDisabled: boolean;
    searchRemote: boolean;
    searchDebounceTime: number;
}, {}>, Partial<Record<NonNullable<string | number>, (_: any) => any>> & {
    "search-input"?(_: {}): any;
    actions?(_: {}): any;
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
