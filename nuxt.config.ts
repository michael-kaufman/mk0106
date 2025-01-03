// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      title: 'POS Tool Rental - MK'
    },
    port: 3000
  },
  srcDir: 'app',
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false
      }
    ]
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    https: false
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    port: 3000,
    strictPort: true
  },
  vite: {
    server: {
      port: 3000,
      strictPort: true
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    }
  }
})
