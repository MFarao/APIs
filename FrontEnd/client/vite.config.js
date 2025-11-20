import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: 'https://5w2kzjqw-4002.brs.devtunnels.ms',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})