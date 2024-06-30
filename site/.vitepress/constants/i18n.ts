export const codeDemoI18n = {
  root: {
    showCode: '查看代码',
    openInPlayground: '在 Playground 打开示例',
  },
  en: {
    showCode: 'Show code',
    openInPlayground: 'Open example in Playground',
  },
}

const themeConfigI18n = {
  zh: {
    guide: '指南',
    examples: '示例',
    api: '接口文档',

    gettingStarted: '快速开始',
    migration: '从旧版迁移',
    basicUsage: '基本用法',
    performance: '性能测试',
    nodeManipulation: '节点操作',
    treeSearch: '树搜索',
    treeDrop: '树下拉',
  },
  en: {
    guide: 'Guide',
    examples: 'Examples',
    api: 'API Document',

    gettingStarted: 'Getting Started',
    migration: 'Migrate from Old Version',
    basicUsage: 'Basic Usage',
    performance: 'Performance',
    nodeManipulation: 'Node Manipulation',
    treeSearch: 'Tree Search',
    treeDrop: 'Tree Drop',
  },
}

;(themeConfigI18n as any).root = themeConfigI18n.zh

export { themeConfigI18n }
