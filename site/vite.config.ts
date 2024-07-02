import { defineConfig, UserConfig } from 'vite'

export default defineConfig((): UserConfig => {
  return {
    ssr: {
      noExternal: ['@vue/repl'],
    },
  }
})
