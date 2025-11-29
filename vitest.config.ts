import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
  },
  resolve: {
    alias: {
      '~~/': fileURLToPath(new URL('./', import.meta.url)),
      '~/': fileURLToPath(new URL('./', import.meta.url)),
      '@/': fileURLToPath(new URL('./app/', import.meta.url)),
    },
  },
})
