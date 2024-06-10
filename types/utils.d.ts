import { Ref } from "vue";
export declare const getCtreeMethods: <T extends string, K extends Record<T, any>>(apiMethods: readonly T[], ref: Ref<K | null>) => Pick<K, T>;
type PickReadonly<T, K extends keyof T> = {
    readonly [P in K]: T[P];
};
export declare const pickReadonly: <T extends object, K extends keyof T>(obj: Readonly<T>, ...keys: K[]) => PickReadonly<T, K>;
export {};
