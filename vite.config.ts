import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached long-term
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation library — large, separate chunk
          'framer':       ['framer-motion'],
          // Form validation — only loaded on contact page
          'forms':        ['react-hook-form', '@hookform/resolvers', 'zod'],
          // UI utilities — small but used everywhere
          'ui':           ['lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          // Radix UI primitives
          'radix': [
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
            '@radix-ui/react-toast',
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
