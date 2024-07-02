# VTreeSearch API

## VTreeSearch Props

Note: You can use all the props of `VTree` in `VTreeSearch`

| Prop                 | Description                                                                                                             | Type                                         | Default Value |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- | :------------ |
| searchPlaceholder    | Placeholder of search input                                                                                             | `string`                                     | '搜索关键字'  |
| showCheckAll         | Whether to show check all checkbox                                                                                      | `boolean`                                    | true          |
| showCheckedButton    | Whether to show 'Checked' button                                                                                        | `boolean`                                    | true          |
| checkedButtonText    | Checked button text                                                                                                     | `string`                                     | '已选'        |
| showFooter           | Whether to show footer                                                                                                  | `boolean`                                    | true          |
| searchMethod `2.0.2` | This method will be invoked when `search` event triggers if present, or else the internal search method will be invoked | `(keyword: string) => void \| Promise<void>` | None          |
| searchLength         | The length of search text that triggers a search                                                                        | `number`                                     | 1             |
| searchDisabled       | Disable search                                                                                                          | `boolean`                                    | false         |
| searchRemote         | Enable remote search. Not effective when `searchMethod` is present                                                      | `boolean`                                    | false         |
| searchDebounceTime   | Search debounce time. Unit: ms                                                                                          | `number`                                     | 300           |

## VTreeSearch Events

Note: You can listen to all the events of `VTree` on `VTreeSearch`

| Event  | Description          | Return Value   |
| :----- | :------------------- | :------------- |
| search | Triggers when search | Search keyword |

## VTreeSearch Methods

Note: You can use all the methods of `VTree` in `VTreeSearch`

| Method       | Description    | Params                                                                        | Return Value    |
| :----------- | :------------- | :---------------------------------------------------------------------------- | :-------------- |
| clearKeyword | Clear keyword  | None                                                                          | `void`          |
| getKeyword   | Get keyword    | None                                                                          | `string`        |
| search       | Execute search | `keyword: string`: Search keyword, the default value is internal this.keyword | `Promise<void>` |

## VTreeSearch Slots

Note: You can pass all the slots of `VTree` to `VTreeSearch`

| Name         | Description                                                   |
| :----------- | :------------------------------------------------------------ |
| search-input | Search input                                                  |
| actions      | Action buttons. Append more action buttons after search input |
| footer       | Footer info                                                   |

