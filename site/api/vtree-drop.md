# VTreeDrop API

## VTreeDrop Props

注：可在 `VTreeDrop` 上直接使用 `VTree` 和 `VTreeSearch` 的所有 Props

| 属性                       | 说明                                                                             | 类型                                                                              | 默认值         |
| :------------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :------------- |
| dropHeight                 | 下拉内容高度                                                                     | `number`                                                                          | 300            |
| dropPlaceholder            | 展示输入框 placeholder                                                           | `string`                                                                          | 无             |
| dropDisabled               | 是否禁用                                                                         | `boolean`                                                                         | false          |
| clearable                  | 允许清空                                                                         | `boolean`                                                                         | false          |
| placement                  | 下拉弹出框位置，注意！！不支持自动识别方向                                       | `'bottom-start' \| 'bottom-end' \| 'bottom' \| 'top-start' \| 'top-end' \| 'top'` | 'bottom-start' |
| transfer                   | 将下拉 DOM 转移到 body 中                                                        | `boolean`                                                                         | false          |
| dropdownClassName          | 在下拉框容器上额外添加的 class                                                   | `string \| string[]`                                                              | 无             |
| dropdownMinWidth `2.0.1`   | 下拉框容器最小宽度，未指定则默认为展示输入框宽度。 适合 transfer 为 false 时使用 | `number`                                                                          | 无             |
| dropdownWidthFixed `2.0.5` | 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条               | `boolean`                                                                         | false          |

## VTreeDrop Events

注：可在 `VTreeDrop` 上直接监听 `VTree` 和 `VTreeSearch` 的所有 Events

| 事件名                  | 说明                   | 返回值         |
| :---------------------- | :--------------------- | :------------- |
| dropdown-visible-change | 下拉框出现或消失时触发 | 下拉框是否可见 |
| clear                   | 点击清空按钮时触发     | 无             |

## VTreeDrop Methods

注：可在 `VTreeDrop` 上直接调用 `VTree` 和 `VTreeSearch` 的所有 Methods

## VTreeDrop Slots

注：可在 `VTreeDrop` 上直接传入 `VTree` 和 `VTreeSearch` 的所有 Slots

| 名称    | 说明                                                 |
| :------ | :--------------------------------------------------- |
| 默认    | 展示输入框                                           |
| display | 展示输入框的展示文字，如果有默认 slot 则此 slot 无效 |
| clear   | 替换清空图标，如果有默认 slot 则此 slot 无效         |

默认 slot 与 display slot 的 Slot Props `2.3.0` ：

```typescript
/** 展示 slot 的 props */
slotProps: {
  /** 多选选中的节点 */
  checkedNodes: [] as TreeNode[],

  /** 多选选中的节点 key */
  checkedKeys: [] as Array<string | number>,

  /** 单选选中的节点 */
  selectedNode: null as TreeNode | null,

  /** 单选选中的节点 key */
  selectedKey: null as string | number | null,
},
```

**注意**： `checkedNodes` 与 `selectedNode` 只包含已加载的节点，如果设置了选中的值（比如设置了 `value` Prop），但没有设置树的数据，则这两个字段内容将为空；而 `checkedKeys` 与 `selectedKey` 则会包含未加载的选中节点 key 。
