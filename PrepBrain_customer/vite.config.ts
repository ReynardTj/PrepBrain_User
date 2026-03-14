import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ⚠ Replace 'customer-app' with your exact GitHub repo name
  // e.g. if your repo is github.com/username/wouldyoutry → base: '/wouldyoutry/'
  base: process.env.NODE_ENV === 'production' ? '/prepbrain-user/' : '/',
})