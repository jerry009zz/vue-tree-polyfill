# Migrate from Old Version {#migrate-from-old-version}

## Vue Support {#vue-support}

`@wsfe/vue-tree` is the upgraded version of `@wsfe/ctree`. The new version changed the exported module names and Less/CSS prefixes.

Vue support info:

- @wsfe/vue-tree 4.x:  Vue3
- @wsfe/vue-tree 3.x: Supports Vue2 and Vue3 using `vue-demi`, but it's not under maintenance due to compatibility issues
- @wsfe/ctree: Vue2. Severe bug fixes only

## Migration {#migration}

To migrate from `@wsfe/ctree` or `@wsfe/vue-tree` 3.x to `@wsfe/vue-tree` 4.x, follow these steps:

1. Update all Less variables and CSS related class prefix from ctree to vtree
2. Change the prefix of exported modules from C to V

```typescript
import CTree, { CTreeSearch, CTreeDrop } from '@wsfe/ctree' // [!code --]
import VTree, { VTreeSearch, VTreeDrop } from '@wsfe/vue-tree' // [!code ++]
```
