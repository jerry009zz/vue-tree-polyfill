# 基本用法 {#basic-usage}

## 数据展示 {#data-display}

可直接传入 `data` Prop。当数据量较大时，为了防止 Vue 监听过多数据导致性能问题，可使用 `setData` 方法设置数据。

<CodeDemo component="DataDisplay" />

## 单选 {#selectable}

使用 `selectable` 启用单选功能

<CodeDemo component="Selectable" />

## 多选 {#checkable}

使用 `checkable` 启用单选功能

<CodeDemo component="Checkable" />

## 多选忽略特定节点 {#ignore-mode}

配置 `ignoreMode` 可在 `v-model` 和 `getCheckedNodes` 方法忽略父节点或者子节点，该 Prop 仅初始设置有效

<CodeDemo component="IgnoreMode" />

## 父子节点级联 {#cascade}

配置 `cascade` 可指定父子节点是否级联

<CodeDemo component="Cascade" />

## 单选与多选并存 {#selectable-and-checkable}

当既可以单选又可以多选时， `v-model` 绑定的是多选的值

<CodeDemo component="SelectableAndCheckable" />

## 展开动画 {#expand-animation}

配置 `animation` 可开启展开收起动画

<CodeDemo component="ExpandAnimation" />

## 连接线 {#show-line}

配置 `showLine` 可开启连接线

`showLine` 除了 `boolean`，还可以接收一个对象用于具体配置连接线的类型、宽度、颜色与是否启用折线

<CodeDemo component="ShowLine" />

## 远程 {#remote}

设置 `load` 方法可以使用远程加载数据，如果有设置 `data`，则 `data` 数据作为根数据；
如果没有传 `data`，则初始化时调用 `load` 方法载入根数据，其中节点参数为 `null`

<CodeDemo component="Remote" />
