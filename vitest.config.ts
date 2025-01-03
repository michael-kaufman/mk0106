/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue() as any],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['app/tests/**/*.spec.ts'],
        deps: {
            inline: [/vue/, /nuxt/]
        }
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./app', import.meta.url)),
            '#app': fileURLToPath(new URL('./app', import.meta.url))
        }
    }
}) 