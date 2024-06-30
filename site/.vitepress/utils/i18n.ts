import { themeConfigI18n } from "../constants/i18n"

export const getLocaleThemeConfig = (lang: string) => {
  const pathPrefix = lang === 'root' || lang === 'zh' ? '' : `/${lang}`
  const i18nMap = themeConfigI18n[lang]

  return {
    nav: [
      { text: i18nMap.guide, link: `${pathPrefix}/guide/getting-started`, activeMatch: '/guide' },
      { text: i18nMap.examples, link: `${pathPrefix}/examples/tree`, activeMatch: '/examples' },
      { text: i18nMap.api, link: `${pathPrefix}/api/vtree`, activeMatch: '/api' },
    ],

    sidebar: [
      {
        text: i18nMap.guide,
        items: [
          { text: i18nMap.gettingStarted, link: `${pathPrefix}/guide/getting-started` },
          { text: i18nMap.migration, link: `${pathPrefix}/guide/migration` },
        ]
      },
      {
        text: i18nMap.examples,
        items: [
          { text: i18nMap.basicUsage, link: `${pathPrefix}/examples/tree` },
          { text: i18nMap.performance, link: `${pathPrefix}/examples/performance` },
          { text: i18nMap.nodeManipulation, link: `${pathPrefix}/examples/node-manipulation` },
          { text: i18nMap.treeSearch, link: `${pathPrefix}/examples/tree-search` },
          { text: i18nMap.treeDrop, link: `${pathPrefix}/examples/tree-drop` },
        ]
      },
      {
        text: i18nMap.api,
        items: [
          { text: 'VTree', link: `${pathPrefix}/api/vtree` },
          { text: 'VTreeSearch', link: `${pathPrefix}/api/vtree-search` },
          { text: 'VTreeDrop', link: `${pathPrefix}/api/vtree-drop` },
        ]
      },
    ],
  }
}
