<script setup lang="ts">
import releaseNotes from "~/assets/data/release-notes.yaml"

definePageMeta({
  title: "releaseNotes",
  screenType: "base",
})
</script>

<template>
  <PageReleaseNotes :release-notes="releaseNotes" />
</template>

<style scoped lang="sass">

</style>
