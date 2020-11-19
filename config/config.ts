import { defineConfig } from 'umi';
import routes from './routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  antd: {},
  dva: {
    hmr: true,
  },
  proxy: {
    '/service/api': {
      target: 'http://localhost:9987',
      changeOrigin: true,
      pathRewrite: {
        '^/service':'',
      },
    },
  },
});
