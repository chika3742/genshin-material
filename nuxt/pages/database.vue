<script lang="ts" setup>
import type {LinkItem} from "~/components/LinkList.vue"

definePageMeta({
  title: "database",
  screenType: "default",
  nativeOnly: true,
})

const items: LinkItem[] = [
  {
    to: "/characters",
    icon: "mdi-account",
  },
  // {
  //   path: "/weapons",
  //   labelI18nKey: "pageTitles.weapons",
  // },
]
</script>

<template>
  <div>
    <LinkList :items="items" />
  </div>
</template>

<style lang="sass" scoped>

</style>
