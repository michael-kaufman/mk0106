import { afterAll, beforeAll } from 'vitest'
import { setup } from '@nuxt/test-utils'

beforeAll(async () => {
    await setup({
        server: true,
        browser: false,
        rootDir: '.',
        nuxtConfig: {
            srcDir: 'app'
        }
    })
})

afterAll(async () => {
    // Cleanup if needed
}) 