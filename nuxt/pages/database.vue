<script lang="ts" setup>
import type {LinkListItem} from "~/types/link-list-item"

definePageMeta({
  title: "database",
  screenType: "default",
  nativeOnly: true,
})

const items: LinkListItem[] = [
  {
    path: "/characters",
    labelI18nKey: "pageTitles.characters",
  },
  // {
  //   path: "/weapons",
  //   labelI18nKey: "pageTitles.weapons",
  // },
]
</script>

<template>
  <div>
    <v-list elevation="2" rounded>
      <v-list-item
        v-for="item in items"
        :key="item.path"
        :prepend-icon="item.icon"
        :title="tx(item.labelI18nKey)"
        :to="item.path"
        append-icon="mdi-chevron-right"
      />
    </v-list>
  </div>
</template>

<style lang="sass" scoped>

</style>
