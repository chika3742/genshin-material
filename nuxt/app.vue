<script lang="ts" setup>
import {useTheme} from "vuetify"

const config = useConfigStore()
const theme = useTheme()
const myRouter = useMyRouter()

const mounted = ref(false)

useHead({
  title: myRouter.pageTitle,
  titleTemplate: `%s - ${tx("common.appName")}`,
})

// register service worker
onBeforeMount(() => {
  if ("serviceWorker" in navigator) {
    const scriptUrl = process.env.NODE_ENV === "production" ? "/sw.js" : "/sw-dev.js"
    navigator.serviceWorker.register(scriptUrl).catch((e) => {
      console.error("Service worker registration failed:", e)
    })
  }
})

const updateCurrentTheme = () => {
  theme.global.name.value = config.getCurrentTheme()
}
// watch theme config change
watch(toRefs(config).theme, () => {
  updateCurrentTheme()
})

onMounted(() => {
  mounted.value = true
  window.mounted = true

  // set theme
  updateCurrentTheme()
  // listen to system theme change
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    updateCurrentTheme()
  })
})
</script>

<template>
  <v-app>
    <NuxtLayout :name="myRouter.layoutId.value">
      <NuxtPage :page-key="$router.currentRoute.value.path" keepalive />
    </NuxtLayout>

    <v-fade-transition>
      <div v-show="!mounted" class="loading-overlay" />
    </v-fade-transition>
  </v-app>
</template>

<style lang="sass" scoped>
.loading-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 2000
  backdrop-filter: blur(4px) brightness(0.5)
  --webkit-backdrop-filter: blur(4px) brightness(0.5)

  &::after
    // loading indicator
    content: ""
    position: absolute
    top: 50%
    left: 50%
    width: 100px
    height: 100px
    margin-top: -50px
    margin-left: -50px
    border-radius: 50%
    border: 10px solid rgba(255, 255, 255, 0.2)
    border-top-color: #fff
    animation: spin 1s linear infinite

    @keyframes spin
      from
        transform: rotate(0deg)
      to
        transform: rotate(360deg)

</style>
