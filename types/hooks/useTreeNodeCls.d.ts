import { Ref } from "vue";
import { TreeNodeProps } from "../components/TreeNode.vue";
declare const prefixCls = "vtree-tree-node";
export { prefixCls as TREE_NODE_PREFIX_CLS };
export declare const useTreeNodeCls: (props: TreeNodeProps, dragoverRefs: {
    dragoverBody: Ref<boolean>;
    dragoverBefore: Ref<boolean>;
    dragoverAfter: Ref<boolean>;
}) => {
    indentWrapperCls: import("vue").ComputedRef<string[]>;
    wrapperCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__wrapper_is-leaf": boolean;
        "vtree-tree-node_disabled": boolean;
        "vtree-tree-node_checked"?: undefined;
        "vtree-tree-node_indeterminate"?: undefined;
        "vtree-tree-node_selected"?: undefined;
    } | {
        "vtree-tree-node_checked": boolean;
        "vtree-tree-node_indeterminate": boolean;
        "vtree-tree-node__wrapper_is-leaf"?: undefined;
        "vtree-tree-node_disabled"?: undefined;
        "vtree-tree-node_selected"?: undefined;
    } | {
        "vtree-tree-node_selected": boolean;
        "vtree-tree-node__wrapper_is-leaf"?: undefined;
        "vtree-tree-node_disabled"?: undefined;
        "vtree-tree-node_checked"?: undefined;
        "vtree-tree-node_indeterminate"?: undefined;
    })[]>;
    nodeBodyCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__drop_active": boolean;
    })[]>;
    dropBeforeCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__drop_active": boolean;
    })[]>;
    dropAfterCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__drop_active": boolean;
    })[]>;
    checkboxWrapperCls: import("vue").ComputedRef<string[]>;
    expandCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__expand_active": boolean;
    })[]>;
    loadingIconCls: import("vue").ComputedRef<string[]>;
    checkboxCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__checkbox_checked": boolean;
        "vtree-tree-node__checkbox_indeterminate": boolean;
        "vtree-tree-node__checkbox_disabled": boolean;
    })[]>;
    titleCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__title_selected": boolean;
        "vtree-tree-node__title_disabled": boolean;
    })[]>;
};
