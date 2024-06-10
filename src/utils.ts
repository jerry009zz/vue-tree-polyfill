import { Ref } from "vue";

export const getCtreeMethods = <T extends string, K extends Record<T, any>>(apiMethods: readonly T[], ref: Ref<K | null>): Pick<K, T> => {
  return apiMethods.reduce((prev, cur) => {
    const fn = (...args: any[]) => {
      const value = ref.value?.[cur]
      if (typeof value !== 'function') return
      return value(...args)
    }
    prev[cur] = fn as K[T]
    return prev
  }, {} as Pick<K, T>)
}

type PickReadonly<T, K extends keyof T> = {
  readonly [P in K]: T[P];
};

export const pickReadonly = <T extends object, K extends keyof T>(
  obj: Readonly<T>,
  ...keys: K[]
): PickReadonly<T, K> => {
  const picked: Partial<PickReadonly<T, K>> = {};
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      picked[key] = obj[key];
    }
  });
  return picked as PickReadonly<T, K>;
}
