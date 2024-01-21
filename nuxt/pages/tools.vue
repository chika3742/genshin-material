<script lang="ts" setup>
import type {LinkItem} from "~/components/LinkList.vue"

definePageMeta({
  title: "tools",
  screenType: "default",
  nativeOnly: true,
})

const items: LinkItem[] = [
  {
    to: "/resin",
  },
]
</script>

<template>
  <LinkList :items="items" />
</template>

<style lang="sass" scoped>

</style>
