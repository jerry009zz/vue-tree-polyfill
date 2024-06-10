import { Ref } from "vue";
import { TreeNodeProps } from "../components/TreeNode.vue";
declare const prefixCls = "ctree-tree-node";
export { prefixCls as TREE_NODE_PREFIX_CLS };
export declare const useTreeNodeCls: (props: TreeNodeProps, dragoverRefs: {
    dragoverBody: Ref<boolean>;
    dragoverBefore: Ref<boolean>;
    dragoverAfter: Ref<boolean>;
}) => {
    wrapperCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__wrapper_is-leaf": boolean;
        "ctree-tree-node_disabled": boolean;
        "ctree-tree-node_checked"?: undefined;
        "ctree-tree-node_indeterminate"?: undefined;
        "ctree-tree-node_selected"?: undefined;
    } | {
        "ctree-tree-node_checked": boolean;
        "ctree-tree-node_indeterminate": boolean;
        "ctree-tree-node__wrapper_is-leaf"?: undefined;
        "ctree-tree-node_disabled"?: undefined;
        "ctree-tree-node_selected"?: undefined;
    } | {
        "ctree-tree-node_selected": boolean;
        "ctree-tree-node__wrapper_is-leaf"?: undefined;
        "ctree-tree-node_disabled"?: undefined;
        "ctree-tree-node_checked"?: undefined;
        "ctree-tree-node_indeterminate"?: undefined;
    })[]>;
    nodeBodyCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__drop_active": boolean;
    })[]>;
    dropBeforeCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__drop_active": boolean;
    })[]>;
    dropAfterCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__drop_active": boolean;
    })[]>;
    checkboxWrapperCls: import("vue").ComputedRef<string[]>;
    expandCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__expand_active": boolean;
    })[]>;
    loadingIconCls: import("vue").ComputedRef<string[]>;
    checkboxCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__checkbox_checked": boolean;
        "ctree-tree-node__checkbox_indeterminate": boolean;
        "ctree-tree-node__checkbox_disabled": boolean;
    })[]>;
    titleCls: import("vue").ComputedRef<(string | {
        "ctree-tree-node__title_selected": boolean;
        "ctree-tree-node__title_disabled": boolean;
    })[]>;
};
