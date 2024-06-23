import { VNode } from 'vue';
import { TreeNode } from '../store';
import { ignoreEnum, dragHoverPartEnum } from '../constants';
import { TreeNodeKeyType, IgnoreType, AnyPropsArrayType, LoadFn, ShowLine } from '../types';
import { FilterFunctionType } from '../store/tree-store';
export interface TreeProps {
    /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
    data?: AnyPropsArrayType;
    /** 数据为空时显示的文本 */
    emptyText?: string;
    /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
    modelValue?: string | number | TreeNodeKeyType[];
    /** 是否可单选 */
    selectable?: boolean;
    /** 是否可多选 */
    checkable?: boolean;
    /** 多选模式下 value 分隔符 */
    separator?: string;
    /** 忽略模式 */
    ignoreMode?: IgnoreType;
    /** 节点标题字段 */
    titleField?: string;
    /** 节点唯一标识字段 */
    keyField?: string;
    /** 节点过滤方法 */
    filterMethod?: FilterFunctionType;
    /** 过滤已选时是否在列表后面展示未加载的已选节点 */
    showUnloadCheckedNodes?: boolean;
    /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
    unloadDataList?: AnyPropsArrayType;
    /** 异步加载方法 */
    load?: LoadFn;
    /** 是否可勾选被过滤节点 */
    filteredNodeCheckable?: boolean;
    /** 父子节点是否关联 */
    cascade?: boolean;
    /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
    enableLeafOnly?: boolean;
    /** 是否禁用所有节点 */
    disableAll?: boolean;
    /** 是否默认展开所有节点 */
    defaultExpandAll?: boolean;
    /**
     * 默认展开的节点 key
     * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
     */
    defaultExpandedKeys?: TreeNodeKeyType[];
    /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
    expandedKeys?: TreeNodeKeyType[];
    /** 是否可拖拽 */
    draggable?: boolean;
    /** 是否可放置 */
    droppable?: boolean;
    /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
    beforeDropMethod?: (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean;
    /** 异步加载初始化时是否自动加载根节点 */
    autoLoad?: boolean;
    /** 节点渲染 render 函数 */
    render?: (node: TreeNode) => VNode;
    /**
     * 过滤时是否展开所有可见节点
     * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
     * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
     */
    expandOnFilter?: boolean;
    /** 点击已选中节点是否取消选中 */
    unselectOnClick?: boolean;
    /** 是否显示 loading 图标 */
    loading?: boolean;
    /** 节点根元素的 class ，传入函数以对每个节点定制 class */
    nodeClassName?: string | object | Array<string | object> | ((node: TreeNode) => string | object | Array<string | object>);
    /** 连接线 */
    showLine?: boolean | ShowLine;
    /** 是否启用过渡动画，目前仅控制展开收起 */
    animation?: boolean;
    /** 子节点缩进 */
    nodeIndent?: number;
    /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
    renderNodeAmount?: number;
    /** 根据节点最小高度计算数据总高度 */
    nodeMinHeight?: number;
    /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
    bufferNodeAmount?: number;
}
export declare const DEFAULT_TREE_PROPS: {
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
    ignoreMode: ignoreEnum;
    autoLoad: boolean;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<TreeProps>, {
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
    ignoreMode: ignoreEnum;
    autoLoad: boolean;
    expandOnFilter: boolean;
    unselectOnClick: boolean;
    loading: boolean;
    nodeMinHeight: number;
    nodeIndent: number;
    renderNodeAmount: number;
    bufferNodeAmount: number;
}>, {
    setData: (data: AnyPropsArrayType) => void;
    setChecked: (key: TreeNodeKeyType, value: boolean) => void;
    setCheckedKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
    checkAll: () => void;
    clearChecked: () => void;
    setSelected: (key: TreeNodeKeyType, value: boolean) => void;
    clearSelected: () => void;
    setExpand: (key: TreeNodeKeyType, value: boolean, expandParent?: boolean) => void;
    setExpandKeys: (keys: TreeNodeKeyType[], value: boolean) => void;
    setExpandAll: (value: boolean) => void;
    getCheckedNodes: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNode[];
    getCheckedKeys: (ignoreMode?: "none" | "parents" | "children" | undefined) => TreeNodeKeyType[];
    getIndeterminateNodes: () => TreeNode[];
    getSelectedNode: () => TreeNode | null;
    getSelectedKey: () => TreeNodeKeyType | null;
    getExpandNodes: () => TreeNode[];
    getExpandKeys: () => TreeNodeKeyType[];
    getCurrentVisibleNodes: () => TreeNode[];
    getNode: (key: TreeNodeKeyType) => TreeNode | null;
    getTreeData: () => TreeNode[];
    getFlatData: () => TreeNode[];
    getNodesCount: () => number;
    insertBefore: (insertedNode: TreeNodeKeyType | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
    insertAfter: (insertedNode: TreeNodeKeyType | import("../store/tree-node").ITreeNodeOptions, referenceKey: TreeNodeKeyType) => TreeNode | null;
    append: (insertedNode: TreeNodeKeyType | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
    prepend: (insertedNode: TreeNodeKeyType | import("../store/tree-node").ITreeNodeOptions, parentKey: TreeNodeKeyType) => TreeNode | null;
    remove: (removedKey: TreeNodeKeyType) => TreeNode | null;
    filter: (keyword: string, filterMethod?: FilterFunctionType | undefined) => void;
    showCheckedNodes: (showUnloadCheckedNodes?: boolean | undefined) => void;
    loadRootNodes: () => Promise<void>;
    scrollTo: (key: TreeNodeKeyType, verticalPosition?: number | "bottom" | "top" | "center") => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<TreeProps>, {
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
    ignoreMode: ignoreEnum;
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
    data: AnyPropsArrayType;
    titleField: string;
    checkable: boolean;
    selectable: boolean;
    unselectOnClick: boolean;
    disableAll: boolean;
    draggable: boolean;
    droppable: boolean;
    nodeIndent: number;
    emptyText: string;
    separator: string;
    showUnloadCheckedNodes: boolean;
    unloadDataList: AnyPropsArrayType;
    enableLeafOnly: boolean;
    defaultExpandedKeys: TreeNodeKeyType[];
    expandedKeys: TreeNodeKeyType[];
    beforeDropMethod: (dragKey: TreeNodeKeyType, dropKey: TreeNodeKeyType, hoverPart: dragHoverPartEnum) => boolean;
    autoLoad: boolean;
    loading: boolean;
    renderNodeAmount: number;
    nodeMinHeight: number;
    bufferNodeAmount: number;
}, {}>, {
    node?(_: {
        node: TreeNode;
    }): any;
    node?(_: {
        node: TreeNode;
    }): any;
    node?(_: {
        node: TreeNode;
    }): any;
    empty?(_: {}): any;
    loading?(_: {}): any;
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
