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
  // Replace YOUR_REPO_NAME with your exact GitHub repository name
  // e.g. if repo is github.com/username/wouldyoutry → '/wouldyoutry/'
  base: '/PrepBrain_User/',
})