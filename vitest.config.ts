/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: [
      'packages/**/__test__/*.spec.{tsx,ts}',
    ],
  },
})
