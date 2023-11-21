import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  envDir: "./src",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  rules: [
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      '/sys': {
        target: 'http://47.113.192.227:8080',
        //target: 'http://test3.javablade.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
