import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'


// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  return {
    plugins: [vue()],
    server: {
      open:true,
      hmr:true
    },
    build: {
      lib: {
        entry: resolve(__dirname,'src/index.ts'),
        name:'Vtree',
        fileName: 'vue-tree'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          dir: join(__dirname, 'dist'),
          exports: 'named',
          globals: {
            vue: 'Vue',
          }
        }
      }
    }
  }
})