import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/wxformat',
    plugins: [
      react({
        babel: {
          plugins: ['styled-components'],
        },
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
      dynamicImport(),
    ],
    build: {
      rollupOptions: {
        plugins: [dynamicImportVars()],
      },
    },
  }
})
