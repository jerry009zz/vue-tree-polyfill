# 从旧版迁移 {#migrate-from-old-version}

## Vue 支持情况 {#vue-support}

`@wsfe/vue-tree` 是 `@wsfe/ctree` 的升级版，新旧版本之间除了包的名称，导出的模块与 Less/CSS 相关前缀也有所不同

对 Vue 的支持情况如下：

- @wsfe/vue-tree 4.x: 支持 Vue3
- @wsfe/vue-tree 3.x: 使用 `vue-demi` 同时支持 Vue2 与 Vue3，但存在 Vue2 兼容性问题，后续不会再维护
- @wsfe/ctree: 支持 Vue2，后续仅提供重大 bug 修复

## 迁移 {#migration}

从 `@wsfe/ctree` 或者 `@wsfe/vue-tree` 3.x 迁移到 `@wsfe/vue-tree` 4.x 需按如下步骤修改：

1. 所有 Less 变量与 CSS 相关 class 前缀从 ctree 改为 vtree
2. 导出的包前缀从 C 改为 V，例如：

```typescript
import CTree, { CTreeSearch, CTreeDrop } from '@wsfe/ctree' // [!code --]
import VTree, { VTreeSearch, VTreeDrop } from '@wsfe/vue-tree' // [!code ++]
```
