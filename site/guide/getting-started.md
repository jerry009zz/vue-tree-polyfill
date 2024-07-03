# 快速开始 {#getting-started}

## 在线尝试 {#try-it-online}

<ClientOnly>
  <div>前往 <PlaygroundLink component="DataDisplay" text="Playground" /> 在线尝试</div>
</ClientOnly>

## 安装 {#install}

```bash
# npm
npm install @wsfe/vue-tree

# yarn
yarn add @wsfe/vue-tree

# pnpm
pnpm add @wsfe/vue-tree
```

## 引入 {#import}

`@wsfe/vue-tree` 提供了三个组件

```typescript
import VTree, { VTreeSearch, VTreeDrop } from '@wsfe/vue-tree'
```

引入样式

```css
@import '~@wsfe/vue-tree/style.css';
```

引入 less 以便于变量覆盖

```less
@import '~@wsfe/vue-tree/src/styles/index.less';
```
