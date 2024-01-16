<script lang="ts" setup>

const router = useRouter()
const myRouter = useMyRouter()

const items: BottomNavigationItem[] = [
  {
    path: "/bookmarks",
    labelI18nKey: "pageTitles.bookmarks",
    icon: "mdi-bookmark",
  },
  {
    path: "/database",
    labelI18nKey: "pageTitles.database",
    icon: "mdi-database",
  },
  {
    path: "/tools",
    labelI18nKey: "pageTitles.tools",
    icon: "mdi-tools",
  },
  {
    path: "/more",
    labelI18nKey: "pageTitles.more",
    icon: "mdi-dots-horizontal",
  },
]

/* === Bottom navigation routing control === */
const tabId = myRouter.tabId
const routeStacks = myRouter.preservedRouteStacks

const unsubscribe = router.afterEach((to) => {
  if (to.meta.screenType === "default" && to.hash !== "#replace") {
    // insert new page path into stack
    routeStacks.value[tabId.value] ||= []
    routeStacks.value[tabId.value].push(to.path)
  }
})

watch(tabId, (newPageId) => {
  routeStacks.value[newPageId] ||= []

  if (routeStacks.value[newPageId].length !== 0) {
    // if stack is not empty, reveal the page on the top of the stack
    void router.replace(routeStacks.value[newPageId].slice(-1)[0] + "#replace")
  } else {
    // if stack is empty, insert the page id into the stack
    routeStacks.value[newPageId].push(newPageId)
    void router.replace(newPageId + "#replace")
  }
}, {immediate: true})

const back = () => {
  // remove top of the stack
  routeStacks.value[tabId.value].pop()
  // reveal top of the stack
  void router.replace(routeStacks.value[tabId.value].slice(-1)[0] + "#replace")
}

onBeforeUnmount(() => {
  unsubscribe()
})
/* ========================================= */
</script>

<template>
  <div class="h-100">
    <v-app-bar v-safe-area="{top: true, left: true, right: true}">
      <v-app-bar-nav-icon
        v-if="routeStacks[tabId]?.length >= 2"
        class="gm-navigate-back"
        icon="mdi-arrow-left"
        @click="back"
      />

      <v-app-bar-title>{{ myRouter.pageTitle.value }}</v-app-bar-title>
    </v-app-bar>

    <v-main class="h-100">
      <div v-safe-area="{top: true, bottom: true}" class="d-flex flex-column h-100">
        <v-container v-safe-area="{left: 16, right: 16}">
          <slot />
        </v-container>

        <v-spacer />

        <NonProdWarning />

        <AppBottomNavigation v-model="tabId" :items="items" />
      </div>
    </v-main>
  </div>
</template>

<style lang="sass" scoped>

</style>
