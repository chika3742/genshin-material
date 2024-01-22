<script lang="ts" setup>
import BackGestureHandle from "~/components/BackGestureHandle.vue"

const myRouter = useMyRouter()
const router = useRouter()

useBackListener(() => {
  router.back()
}, () => true)
</script>

<template>
  <div class="h-100">
    <BackGestureHandle can-back @back="$router.back" />

    <v-app-bar v-safe-area="{top: true, left: true, right: true}">
      <v-app-bar-nav-icon
        class="gm-navigate-back"
        icon="mdi-arrow-left"
        @click="$router.back"
      />

      <v-app-bar-title>{{ myRouter.pageTitle.value }}</v-app-bar-title>
    </v-app-bar>

    <v-main class="h-100">
      <div v-safe-area="{top: true, bottom: true}" class="d-flex flex-column h-100">
        <v-container v-safe-area="{left: 16, right: 16}">
          <NuxtPage keepalive />
        </v-container>

        <v-spacer />

        <NonProdWarning />
      </div>
    </v-main>
  </div>
</template>

<style lang="sass" scoped>

</style>
