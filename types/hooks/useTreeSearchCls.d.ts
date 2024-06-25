import { Ref } from 'vue';
import { TreeSearchProps } from '../components/TreeSearch.vue';
declare const prefixCls = "vtree-tree-search";
export { prefixCls as TREE_SEARCH_PREFIX_CLS };
export declare const useTreeSearchCls: (props: TreeSearchProps, options: {
    checkAllStatus: {
        checked: boolean;
        indeterminate: boolean;
        disabled: boolean;
    };
    isShowingChecked: Ref<boolean>;
}) => {
    wrapperCls: import("vue").ComputedRef<string[]>;
    searchCls: import("vue").ComputedRef<string[]>;
    checkAllWrapperCls: import("vue").ComputedRef<string[]>;
    checkboxCls: import("vue").ComputedRef<(string | {
        "vtree-tree-node__checkbox_checked": boolean;
        "vtree-tree-node__checkbox_indeterminate": boolean;
        "vtree-tree-node__checkbox_disabled": boolean;
    })[]>;
    inputWrapperCls: import("vue").ComputedRef<string[]>;
    inputCls: import("vue").ComputedRef<(string | {
        "vtree-tree-search__input_disabled": boolean | undefined;
    })[]>;
    actionWrapperCls: import("vue").ComputedRef<string[]>;
    checkedButtonCls: import("vue").ComputedRef<(string | {
        "vtree-tree-search__checked-button_active": boolean;
    })[]>;
    treeWrapperCls: import("vue").ComputedRef<string[]>;
    footerCls: import("vue").ComputedRef<string[]>;
};
