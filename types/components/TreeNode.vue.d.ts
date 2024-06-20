import { TreeNode } from '../store';
import { TreeProps } from './Tree.vue';
import { GetNodeFn } from '../types';
type PickedProps = Required<Pick<TreeProps, 'titleField' | 'keyField' | 'checkable' | 'selectable' | 'unselectOnClick' | 'disableAll' | 'draggable' | 'droppable' | 'nodeIndent'>> & Pick<TreeProps, 'render' | 'showLine'>;
export type TreeNodeProps = PickedProps & {
    data: TreeNode;
    getNode: GetNodeFn;
    noSiblingNodeMap: Record<string, true>;
};
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToOption<TreeNodeProps>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToOption<TreeNodeProps>>>, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
