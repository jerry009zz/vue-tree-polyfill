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
    ignoreMode: import("../constants").ignoreEnum;
    autoLoad: boolean;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
};
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
    ignoreMode: import("../constants").ignoreEnum;
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
    setData: (data: import("..").AnyPropsArrayType) => void;
    setChecked: (key: import("..").TreeNodeKeyType, value: boolean) => void;
    setCheckedKeys: (keys: import("..").TreeNodeKeyType[], value: boolean) => void;
    checkAll: () => void;
    clearChecked: () => void;
    setSelected: (key: import("..").TreeNodeKeyType, value: boolean) => void;
    clearSelected: () => void;
    setExpand: (key: import("..").TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
    setExpandKeys: (keys: import("..").TreeNodeKeyType[], value: boolean) => void;
    setExpandAll: (value: boolean) => void;
    getCheckedNodes: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNode[];
    getCheckedKeys: (ignoreMode?: "none" | "parents" | "children" | undefined) => import("..").TreeNodeKeyType[];
    getIndeterminateNodes: () => TreeNode[];
    getSelectedNode: () => TreeNode | null;
    getSelectedKey: () => import("..").TreeNodeKeyType | null;
    getExpandNodes: () => TreeNode[];
    getExpandKeys: () => import("..").TreeNodeKeyType[];
    getCurrentVisibleNodes: () => TreeNode[];
    getNode: (key: import("..").TreeNodeKeyType) => TreeNode | null;
    getTreeData: () => TreeNode[];
    getFlatData: () => TreeNode[];
    getNodesCount: () => number;
    insertBefore: (insertedNode: import("..").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, referenceKey: import("..").TreeNodeKeyType) => TreeNode | null;
    insertAfter: (insertedNode: import("..").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, referenceKey: import("..").TreeNodeKeyType) => TreeNode | null;
    append: (insertedNode: import("..").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, parentKey: import("..").TreeNodeKeyType) => TreeNode | null;
    prepend: (insertedNode: import("..").TreeNodeKeyType | import("../store/tree-node.js").ITreeNodeOptions, parentKey: import("..").TreeNodeKeyType) => TreeNode | null;
    remove: (removedKey: import("..").TreeNodeKeyType) => TreeNode | null;
    filter: (keyword: string, filterMethod?: import("../store/tree-store.js").FilterFunctionType | undefined) => void;
    showCheckedNodes: (showUnloadCheckedNodes?: boolean | undefined) => void;
    loadRootNodes: () => Promise<void>;
    scrollTo: (key: import("..").TreeNodeKeyType, verticalPosition?: number | "bottom" | "top" | "center") => void;
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
    ignoreMode: import("../constants").ignoreEnum;
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
    ignoreMode: "none" | "parents" | "children";
    filteredNodeCheckable: boolean;
    cascade: boolean;
    defaultExpandAll: boolean;
    expandOnFilter: boolean;
    titleField: string;
    checkable: boolean;
    selectable: boolean;
    unselectOnClick: boolean;
    disableAll: boolean;
    draggable: boolean;
    droppable: boolean;
    data: import("..").AnyPropsArrayType;
    emptyText: string;
    separator: string;
    showUnloadCheckedNodes: boolean;
    unloadDataList: import("..").AnyPropsArrayType;
    enableLeafOnly: boolean;
    defaultExpandedKeys: import("..").TreeNodeKeyType[];
    expandedKeys: import("..").TreeNodeKeyType[];
    beforeDropMethod: (dragKey: import("..").TreeNodeKeyType, dropKey: import("..").TreeNodeKeyType, hoverPart: import("../constants").dragHoverPartEnum) => boolean;
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
