# VTreeDrop API

## VTreeDrop Props

Note: You can use all the props of `VTree` and `VTreeSearch` in `VTreeDrop`

| Prop                       | Description                                                                                                                 | Type                                                                              | Default Value  |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :------------- |
| dropHeight                 | Height of the dropdown                                                                                                      | `number`                                                                          | 300            |
| dropPlaceholder            | Placeholder of display input                                                                                                | `string`                                                                          | None           |
| dropDisabled               | Whether to disable tree drop                                                                                                | `boolean`                                                                         | false          |
| clearable                  | Allow to clear                                                                                                              | `boolean`                                                                         | false          |
| placement                  | The position of the dropdown. Note!! Does not support auto adapting directions                                              | `'bottom-start' \| 'bottom-end' \| 'bottom' \| 'top-start' \| 'top-end' \| 'top'` | 'bottom-start' |
| transfer                   | To transfer DOM to body                                                                                                     | `boolean`                                                                         | false          |
| dropdownClassName          | Extra class on dropdown container                                                                                           | `string \| string[]`                                                              | None           |
| dropdownMinWidth `2.0.1`   | Min width of the dropdown. The default width is the width of the display input. It's better to use when 'transfer' is false | `number`                                                                          | None           |
| dropdownWidthFixed `2.0.5` | Fix the width of the dropdown. When the content length exceeds the min with of the dropdown, a horizontal scrollbar appears | `boolean`                                                                         | false          |

## VTreeDrop Events

Note: You can listen to all the events of `VTree` and `VTreeSearch` on `VTreeDrop`

| Event                   | Description                             | Return Value               |
| :---------------------- | :-------------------------------------- | :------------------------- |
| dropdown-visible-change | Triggers when dropdown shows/hides      | Visibility of the dropdown |
| clear                   | Triggers when click on the clear button | None                       |

## VTreeDrop Methods

Note: You can use all the methods of `VTree` and `VTreeSearch` in `VTreeDrop`

## VTreeDrop Slots

Note: You can pass all the slots of `VTree` and `VTreeSearch` to `VTreeDrop`

| Name    | Description                                                               |
| :------ | :------------------------------------------------------------------------ |
| default | The whole input                                                           |
| display | The text of display input. Not effective when the default slot is present |
| clear   | To replace the clear icon. Not effective when the default slot is present |

Slot props of `default` and `display` slots `2.3.0`:

```typescript
/** Slot props of display */
slotProps: {
  /** Multiple selected nodes */
  checkedNodes: [] as TreeNode[],

  /** Multiple selected node keys */
  checkedKeys: [] as Array<string | number>,

  /** Single selected nodes */
  selectedNode: null as TreeNode | null,

  /** Single selected node keys */
  selectedKey: null as string | number | null,
},
```

**Note**: `checkedNodes` and `selectedNode` only include loaded nodes. The content of these two fields will be empty if `value` prop is set but there's no tree data; While `checkedKeys` and `selectedKey` contains node keys that is not yet loaded.
