# VTreeSearch API

## VTreeSearch Props

注：可在 `VTreeSearch` 上直接使用 `VTree` 的所有 Props

| 属性                 | 说明                                                                               | 类型                                         | 默认值       |
| :------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------- | :----------- |
| searchPlaceholder    | 搜索输入框的 placeholder                                                           | `string`                                     | '搜索关键字' |
| showCheckAll         | 是否显示全选复选框                                                                 | `boolean`                                    | true         |
| showCheckedButton    | 是否显示已选按钮                                                                   | `boolean`                                    | true         |
| checkedButtonText    | 已选按钮文字                                                                       | `string`                                     | '已选'       |
| showFooter           | 是否显示底部信息                                                                   | `boolean`                                    | true         |
| searchMethod `2.0.2` | 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 | `(keyword: string) => void \| Promise<void>` | 无           |
| searchLength         | 触发搜索的字符长度                                                                 | `number`                                     | 1            |
| searchDisabled       | 禁用搜索功能                                                                       | `boolean`                                    | false        |
| searchRemote         | 是否远程搜索，传入 `searchMethod` 时无效                                           | `boolean`                                    | false        |
| searchDebounceTime   | 搜索防抖时间，单位为毫秒                                                           | `number`                                     | 300          |

## VTreeSearch Events

注：可在 `VTreeSearch` 上直接监听 `VTree` 的所有 Events

| 事件名 | 说明               | 返回值       |
| :----- | :----------------- | :----------- |
| search | 执行搜索操作时触发 | 搜索的关键字 |

## VTreeSearch Methods

注：可在 `VTreeSearch` 上直接调用 `VTree` 的所有 Methods

| 方法         | 说明           | 参数                                                     | 返回值          |
| :----------- | :------------- | :------------------------------------------------------- | :-------------- |
| clearKeyword | 清空关键字     | 无                                                       | `void`          |
| getKeyword   | 获取搜索关键字 | 无                                                       | `string`        |
| search       | 执行搜索       | `keyword: string`: 搜索的关键字，默认为内部 this.keyword | `Promise<void>` |

## VTreeSearch Slots

注：可在 `VTreeSearch` 上直接传入 `VTree` 的所有 Slots

| 名称         | 说明                                               |
| :----------- | :------------------------------------------------- |
| search-input | 搜索输入框，可通过此 slot 自行封装树搜索组件的行为 |
| actions      | 操作按钮，可在搜索输入框后加入更多操作按钮         |
| footer       | 底部信息                                           |

