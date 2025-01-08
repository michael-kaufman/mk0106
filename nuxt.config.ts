// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      title: 'POS Tool Rental - MK'
    }
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
  vite: {
    optimizeDeps: {
      exclude: ['vue-demi']
    }
  },
})
