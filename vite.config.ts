/* Copyright 2021, Milkdown by Mirone. */
import react from '@vitejs/plugin-react'
import { join } from 'pathe'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import { markdownPlugin } from './plugins/markdown-plugin'
import { sitemapPlugin } from './plugins/sitemap-plugin'

export default defineConfig({
  define: {
    VERCEL_ANALYTICS_ID: JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
  },
  build: {
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'milkdown-vendor': ['@milkdown/core', '@milkdown/ctx', '@milkdown/transformer', '@milkdown/prose'],
        },
      },
    },
  },
  resolve: {
    alias: {
      chalk: join(__dirname, 'chalk.js'),
    },
  },
  plugins: [
    VitePWA({ registerType: 'autoUpdate' }),
    sitemapPlugin(),
    markdownPlugin(),
    react(),
  ],
})
