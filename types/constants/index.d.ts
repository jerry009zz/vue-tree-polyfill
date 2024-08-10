export declare enum ignoreEnum {
    none = "none",
    parents = "parents",
    children = "children"
}
export declare const TREE_API_METHODS: readonly ["setData", "setChecked", "setCheckedKeys", "checkAll", "clearChecked", "setSelected", "clearSelected", "setExpand", "setExpandKeys", "setExpandAll", "getCheckedNodes", "getCheckedKeys", "getIndeterminateNodes", "getSelectedNode", "getSelectedKey", "getExpandNodes", "getExpandKeys", "getCurrentVisibleNodes", "getNode", "getTreeData", "getFlatData", "getNodesCount", "insertBefore", "insertAfter", "append", "prepend", "remove", "filter", "showCheckedNodes", "loadRootNodes", "updateNode", "updateNodes", "scrollTo"];
export declare const TREE_SEARCH_API_METHODS: readonly ["setData", "setChecked", "setCheckedKeys", "checkAll", "clearChecked", "setSelected", "clearSelected", "setExpand", "setExpandKeys", "setExpandAll", "getCheckedNodes", "getCheckedKeys", "getIndeterminateNodes", "getSelectedNode", "getSelectedKey", "getExpandNodes", "getExpandKeys", "getCurrentVisibleNodes", "getNode", "getTreeData", "getFlatData", "getNodesCount", "insertBefore", "insertAfter", "append", "prepend", "remove", "filter", "showCheckedNodes", "loadRootNodes", "updateNode", "updateNodes", "scrollTo", "clearKeyword", "getKeyword", "search"];
export declare enum placementEnum {
    'bottom-start' = "bottom-start",
    'bottom-end' = "bottom-end",
    'bottom' = "bottom",
    'top-start' = "top-start",
    'top-end' = "top-end",
    'top' = "top"
}
export declare enum verticalPositionEnum {
    top = "top",
    center = "center",
    bottom = "bottom"
}
export type VerticalPositionType = keyof typeof verticalPositionEnum;
export declare enum dragHoverPartEnum {
    before = "before",
    body = "body",
    after = "after"
}
export declare enum showLineType {
    dashed = "dashed",
    solid = "solid"
}
