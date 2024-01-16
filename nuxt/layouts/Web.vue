<script lang="ts" setup>
import {feedbackPageUrl, hoyolabArticleUrl, repositoryUrl} from "~/utils/constants"

const drawerItems: DrawerItemOrDivider[] = [
  {
    icon: "mdi-home",
    to: "/",
  },
]

const config = useConfigStore()
const myRouter = useMyRouter()

const isDrawerOpenOnMobile = ref(false)

</script>

<template>
  <div class="h-100">
    <AppDrawer v-model="isDrawerOpenOnMobile" :drawer-items="drawerItems" />

    <v-app-bar order="1">
      <template #prepend>
        <v-app-bar-nav-icon
          v-show="$vuetify.display.mobile"
          @click="isDrawerOpenOnMobile = true"
        />
      </template>

      <v-app-bar-title>{{ myRouter.pageTitle.value }}</v-app-bar-title>
    </v-app-bar>

    <v-main class="h-100">
      <div class="d-flex flex-column h-100">
        <v-container v-safe-area="{left: 16, right: 16}">
          <slot />
        </v-container>

        <v-spacer />

        <NonProdWarning />

        <AppFooter
          v-model:theme-setting="config.theme"
          :current-version="getCurrentVersionText()"
          :feedback-page-url="feedbackPageUrl"
          :hoyolab-article-url="hoyolabArticleUrl"
          :repository-url="repositoryUrl"
        />
      </div>
    </v-main>
  </div>
</template>

<style lang="sass" scoped>

</style>
