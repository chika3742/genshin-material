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
  <div style="display: flex; justify-content: center; align-items: center; height: calc(100vh - 188px);">
    <p>This is Bookmarks page!</p>
  </div>
</template>

<style lang="sass" scoped>

</style>
