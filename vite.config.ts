import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

/**
 * True when the module lives inside a given npm package, regardless of the
 * package-manager layout (npm top-level or pnpm `.pnpm` symlinks). Rolldown
 * passes the resolved file path to `manualChunks`, so matching on the
 * `node_modules/<pkg>/` path segment reliably identifies package boundaries.
 */
function isPackage(id: string, pkg: string): boolean {
  return id.includes(`node_modules/${pkg}/`)
}

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
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }
          // Core React runtime — cached long-term
          if (isPackage(id, 'react') || isPackage(id, 'react-dom') || isPackage(id, 'react-router') || isPackage(id, 'react-router-dom')) {
            return 'react-vendor'
          }
          // Animation library — large, separate chunk
          if (isPackage(id, 'framer-motion')) {
            return 'framer'
          }
          // Form validation — only loaded on contact page
          if (isPackage(id, 'react-hook-form') || isPackage(id, '@hookform') || isPackage(id, 'zod')) {
            return 'forms'
          }
          // UI utilities — small but used everywhere
          if (isPackage(id, 'lucide-react') || isPackage(id, 'class-variance-authority') || isPackage(id, 'clsx') || isPackage(id, 'tailwind-merge')) {
            return 'ui'
          }
          // Radix UI primitives
          if (isPackage(id, '@radix-ui')) {
            return 'radix'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
