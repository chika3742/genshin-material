<script lang="ts" setup>
import {SplashScreen} from "@capacitor/splash-screen"

definePageMeta({
  title: "bookmarks",
  screenType: "default",
})

onMounted(() => {
  void SplashScreen.hide()
})
</script>

<template>
  <div>
    <nuxt-link to="/characters">
      asdf
    </nuxt-link>
  </div>
</template>

<style lang="sass" scoped>

</style>
