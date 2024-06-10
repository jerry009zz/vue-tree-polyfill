import { Ref } from 'vue';
import { TreeDropProps } from '../components/TreeDrop.vue';
declare const prefixCls = "ctree-tree-drop";
export { prefixCls as TREE_DROP_PREFIX_CLS };
export declare const useTreeDropCls: (props: TreeDropProps, options: {
    dropdownVisible: Ref<boolean>;
    checkedCount: Ref<number>;
    selectedTitle: Ref<string>;
}) => {
    wrapperCls: import("vue").ComputedRef<string[]>;
    referenceCls: import("vue").ComputedRef<string[]>;
    displayInputCls: import("vue").ComputedRef<(string | {
        "ctree-tree-drop__display-input_focus": boolean;
        "ctree-tree-search__input_disabled": boolean | undefined;
    })[]>;
    displayInputTextCls: import("vue").ComputedRef<(string | {
        "ctree-tree-drop__display-input-placeholder": boolean;
    })[]>;
    dropIconCls: import("vue").ComputedRef<(string | {
        "ctree-tree-drop__display-icon-drop_active": boolean;
    })[]>;
    clearIconCls: import("vue").ComputedRef<string[]>;
    dropdownCls: import("vue").ComputedRef<(string | undefined)[]>;
};
