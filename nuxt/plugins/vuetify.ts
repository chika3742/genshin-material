import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/lib/styles/main.sass"
import {useConfigStore} from "~/stores/config.store"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useConfigStore()
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: config.currentTheme,
      themes: {
        dark: {
          dark: true,
          colors: {
            star: "#ffff00",
            "button-activated": "#d24700",
          },
        },
        light: {
          dark: false,
          colors: {
            star: "#ff8c00",
            "button-activated": "#ff5900",
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
