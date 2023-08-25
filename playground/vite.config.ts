import React from '@vitejs/plugin-react'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const modeResolver: Record<string, Function> = {
  vue: () => ({
    plugins: [Vue()],

  }),
  react: () => ({
    plugins: [React()],

  }),
}

export default defineConfig(({ mode }) => {
  const modeConfig = modeResolver[mode]()
  return {
    ...modeConfig,

  }
})
