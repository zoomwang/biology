import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less', // 一定要开启这个配置项
        }),
      ],
    }),
    viteCompression({
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 5120, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    })
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
        target: 'http://47.113.192.227:8090',
        //target: 'http://test3.javablade.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
      '/notify': {
        target: 'http://47.113.192.227:8080',
        //target: 'http://test3.javablade.com',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
