// https://nuxt.com/docs/api/configuration/nuxt-config
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
})
