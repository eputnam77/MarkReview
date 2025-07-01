import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MarkReview',
      fileName: (format) => `markreview.${format}.js`
    },
    rollupOptions: {
      external: ['prosemirror-model', 'prosemirror-state', 'prosemirror-view']
    }
  }
})
