<script lang="ts" setup>
export interface LinkItem {
  to: string
  icon?: string
}

interface Props {
  items: LinkItem[]
}
defineProps<Props>()
</script>

<template>
  <v-list elevation="2" rounded>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :href="item.to"
      :prepend-icon="item.icon"
      :title="tx(`pageTitles.${$router.resolve(item.to).meta.title}`)"
      :to="item.to"
      append-icon="mdi-chevron-right"
    />
  </v-list>
</template>

<style lang="sass" scoped>

</style>
