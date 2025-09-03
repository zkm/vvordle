import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // For GitHub Pages project site: https://<user>.github.io/<repo>/
  // Set base to '/<repo>/' so built asset paths work under the subpath.
  base: '/vvordle/',
  plugins: [
  vue(),
  ],
  build: {
    // Emit the production build into 'docs' so GitHub Pages can serve from it.
    outDir: 'docs',
    emptyOutDir: true,
  },
})
