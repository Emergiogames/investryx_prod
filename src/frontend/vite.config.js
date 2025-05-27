// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {BASE_URL_MAIN} from './src/constants/baseUrls'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BASE_URL_MAIN,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/admin': {
      //   target: BASE_URL_MAIN, // This can be the same as BASE_URL_MAIN or different based on your setup
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/admin/, '/admin'), // Keeping /admin intact
      // },
    }
  }
})
