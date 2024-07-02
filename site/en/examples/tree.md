# Basic Usage {#basic-usage}

## Data Display {#data-display}

`data` prop can be accepted. To prevent from performance issue, use `setData` when the data is large.

<CodeDemo component="DataDisplay" />

## Single Select {#selectable}

Use `selectable` to enable single select

<CodeDemo component="Selectable" />

## Multiple Select {#checkable}

Use `checkable` to enable multiple select

<CodeDemo component="Checkable" />

## Ignore Specific Nodes {#ignore-mode}

Parent nodes or child nodes can be ignored in `v-model` and `getCheckedNodes` using `ignoreMode` prop. This prop is effective only when it's set initially.

<CodeDemo component="IgnoreMode" />

## Node Cascade {#cascade}

Use `cascade` to config if parent and child nodes are cascaded

<CodeDemo component="Cascade" />

## Single and Multiple Select {#selectable-and-checkable}

When single and multiple select are enabled at the same time, the value of `v-model` is bound to multiple select value

<CodeDemo component="SelectableAndCheckable" />

## Expand Animation {#expand-animation}

Use `animation` to enable animation when expand/collapse

<CodeDemo component="ExpandAnimation" />

## Connecting Line {#show-line}

Use `showLine` to show lines between nodes

Apart from `boolean`, the `showLine` prop also takes an object to config the type, width, color and polyline of the line

<CodeDemo component="ShowLine" />

## Remote {#remote}

Config `load` method to load data from remote. `data` prop will be used as root data if present;
If there's no `data`, then `load` will be invoked to load root data with a `null` node parameter

<CodeDemo component="Remote" />
