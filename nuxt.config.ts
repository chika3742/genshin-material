// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from "@rollup/plugin-yaml"
import {generateSchemas} from "./utils/generate-schemas"

// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  app: {
    keepalive: {
      max: 10,
    },
    pageTransition: {
      name: "scroll-x-reverse-transition",
      leaveActiveClass: "position-absolute w-100",
      duration: 250,
    },
    head: {
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.webp",
        },
      ],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
  ],
  css: [
    "assets/styles/global.sass",
  ],

  i18n: {
    locales: [
      {
        code: "ja",
        iso: "ja-JP",
        file: "ja.yaml",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.yaml",
      },
    ],
    langDir: "./locales/",
    defaultLocale: "ja",
    vueI18n: {
      legacy: false,
      fallbackLocale: "ja",
      datetimeFormats: {
        ja: {
          time: {
            hour12: false,
          },
        },
      },
    },
  },

  googleFonts: {
    families: {
      "Kaisei Opti": [700],
      "Noto Sans JP": [400, 700],
      Cairo: [700],
      "Kiwi Maru": [500],
    },
  },

  ssr: false,

  hooks: {
    async "build:before"() {
      await generateSchemas()
    },
    async "builder:watch"(_, path) {
      if (path.startsWith("schemas/")) {
        await generateSchemas()
      }
    },
  },

  vite: {
    plugins: [
      yaml({
        exclude: "locales/**",
      }),
    ],
  },

  runtimeConfig: {
    public: {
      algoliaApiKey: process.env.ALGOLIA_API_KEY,
      algoliaAppId: process.env.ALGOLIA_APP_ID,
    },
  },
})
