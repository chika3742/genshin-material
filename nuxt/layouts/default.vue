<template>
  <div>
    <v-app class="position-relative" theme="dark">
      <AppNavDrawer v-model="isDrawerOpenSp" />

      <AppSearch v-model="isSearchDialogShown" />

      <v-app-bar>
        <template #prepend>
          <v-app-bar-nav-icon
            v-if="$vuetify.display.mobile"
            @click="isDrawerOpenSp = true"
          />
        </template>

        <v-app-bar-title>{{ title }}</v-app-bar-title>

        <template #append>
          <v-btn
            icon
            @click="isSearchDialogShown = true"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-app-bar>

      <slot />

      <AppUpdateInfo />
    </v-app>
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()
const i18n = useI18n()

const isDrawerOpenSp = ref(false)
const isSearchDialogShown = ref(false)

const title = computed(() => {
  const title = route.meta.title as string | undefined
  if (!title) {
    return ""
  }
  if (title.includes("__")) {
    const split = title.split("__")
    return i18n.t(`pages.${title}`, {name: i18n.t(`${split[0]}.${route.params[split[1]]}`)})
  } else {
    return i18n.t(`pages.${title}`)
  }
})

useHead({
  title,
  titleTemplate: `%s - ${i18n.t("common.app_name")}`,
})

</script>
