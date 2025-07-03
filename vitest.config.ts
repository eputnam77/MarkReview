import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['__tests__/**/*.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
})
