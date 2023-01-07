<template>
  <NuxtLayout>
    <PageContainer>
      <div>
        <h2 class="ma-4">
          <v-icon class="mr-4 mb-1">
            mdi-alert-circle
          </v-icon>
          {{ error.statusCode }} {{ error.statusMessage }}
        </h2>
        <div class="ml-4">
          <p>{{ error.message }}</p>
          <v-btn class="my-4" @click="clearError({redirect: '/'})">
            <v-icon class="mr-2">
              mdi-home
            </v-icon>トップに戻る
          </v-btn>
          <details class="ml-6">
            <summary style="cursor: pointer; user-select: none">
              詳細情報
            </summary>
            <pre v-html="error.message + '<br>' + error.stack" />
          </details>
        </div>
      </div>
    </PageContainer>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {NuxtError} from "#app"

defineProps<{
  error: NuxtError
}>()
</script>
