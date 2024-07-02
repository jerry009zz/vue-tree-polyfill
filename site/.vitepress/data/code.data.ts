import fs from 'node:fs/promises'
import path from 'node:path'
import { createMarkdownRenderer } from 'vitepress'

export default {
  async load() {
    const md = await createMarkdownRenderer('')

    const codeDirName = path.resolve(__dirname, '../code')
    const fileNameList = await fs.readdir(codeDirName)
    const sourceCodeMap: Record<string, { markdown: string, sourceCode: string, extension?: string }> = {}
    for (let fileName of fileNameList) {
      const [, componentName, extension] = fileName.match(/^(.+?)?(?:\.(.+))?$/) || []
      if (componentName) {
        const sourceCode = (await fs.readFile(path.resolve(codeDirName, fileName), { encoding: 'utf8' })).toString()
        sourceCodeMap[componentName] = {
          markdown: md.render(`\`\`\`${extension || 'vue'}\n${sourceCode}\n\`\`\``),
          sourceCode,
          extension,
        }
      }
    }
    return sourceCodeMap
  }
}
