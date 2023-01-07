<template>
  <PageContainer>
    <h1 class="font-kaisei-opti mb-4">
      {{ $t("common.app_name") }}
    </h1>
    <p>
      原神の素材収集メモなど、原神を楽しむ上で更に便利になるツールです。
    </p>
  </PageContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "home",
})
</script>
