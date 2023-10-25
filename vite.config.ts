import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
import mkcert from 'vite-plugin-mkcert'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      https: true,
    },
    plugins: [
      react({
        babel: {
          plugins: ['styled-components'],
        },
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
      dynamicImport(),
      mkcert({
        hosts: ['wxformat.netlify.app', 'localhost', '127.0.0.1'],
        autoUpgrade: true,
      }),
    ],
    build: {
      rollupOptions: {
        plugins: [dynamicImportVars()],
      },
    },
  }
})
