import React from '@vitejs/plugin-react'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import litCss from 'vite-plugin-lit-css'

const modeResolver: Record<string, Function> = {
  vue: () => ({
    plugins: [Vue(), litCss()],

  }),
  react: () => ({
    plugins: [React(), litCss()],
  }),
}

export default defineConfig(({ mode }) => {
  const modeConfig = modeResolver[mode]()
  return {
    ...modeConfig,

  }
})
