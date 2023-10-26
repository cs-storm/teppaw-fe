import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default ({ command, mode }) =>
  defineConfig({
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always', // 括号内才使用数学计算
          globalVars: {
            // 全局变量
            mainColor: 'red'
          }
        }
      }
    },

    server: {
      host: true, // true 才可以使用 IP 网络服务
      //port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      port: 5173,
      strictPort: true, // 端口被占用直接退出
      https: false,
      open: true, // 在开发服务器启动时自动在浏览器中打开应用程序
      cors: true,
      proxy: {
        // 字符串简写写法
        '/api': {
          target:
            mode === 'development'
              ? 'http://43.153.86.6'
              : loadEnv(mode, process.cwd()).VITE_APP_DEV_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: false // 屏蔽服务器报错
      }
    }
  })
