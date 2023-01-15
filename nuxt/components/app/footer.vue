<template>
  <v-footer class="py-2">
    <div class="d-flex flex-column align-end w-100">
      <div class="d-flex align-end align-sm-center flex-column flex-sm-row justify-end" style="gap: 8px">
        <!--      <v-spacer />-->
        <v-btn :to="localePath('/release-notes')" color="primary" density="comfortable">
          {{ $t('pages.release_notes') }}
        </v-btn>
        <v-btn :to="localePath('/terms')" density="comfortable" variant="text">
          {{ $t('pages.terms') }}
        </v-btn>
        <v-btn :to="localePath('/privacy')" density="comfortable" variant="text">
          {{ $t('pages.privacy') }}
        </v-btn>
        <v-btn density="comfortable" flat prepend-icon="mdi-web">
          <span>LANG</span>
          <v-menu activator="parent">
            <v-list>
              <v-list-item :to="switchLocalePath('ja')">
                日本語
              </v-list-item>
              <v-list-item :to="switchLocalePath('en')">
                English
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <v-btn density="comfortable" flat prepend-icon="mdi-brightness-6">
          <span>テーマ</span>
          <v-menu activator="parent">
            <v-list :selected="[config.theme]">
              <v-list-item prepend-icon="mdi-brightness-7" value="light" @click="toggleTheme('light')">
                ライト
              </v-list-item>
              <v-list-item prepend-icon="mdi-brightness-2" value="dark" @click="toggleTheme('dark')">
                ダーク
              </v-list-item>
              <v-list-item prepend-icon="mdi-brightness-auto" value="auto" @click="toggleTheme('auto')">
                自動
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
        <span style="font-size: 0.8em">&copy;C2K Studio {{ new Date().getFullYear() }}</span>
      </div>
      <div class="mt-4">
        <div v-if="useI18n().locale.value === 'en'" style="font-size: 0.7em">
          If there are any mistranslations, please <nuxt-link :to="localePath({path: '/about', hash: '#aboutFeedback'})">
            contact me
          </nuxt-link>.
        </div>
        <div style="font-size: 0.7em">
          Images/Data: ©miHoYo/COGNOSPHERE<br>このWebページはmiHoYoおよびCOGNOSPHEREとは一切関係ありません
        </div>
      </div>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
import {useTheme} from "vuetify"
import {ThemeConfig, useConfigStore} from "~/stores/config.store"

const theme = useTheme()
const config = useConfigStore()

const toggleTheme = (value: ThemeConfig) => {
  config.theme = value
  theme.global.name.value = config.currentTheme
}

onMounted(() => {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (evt) => {
    if (config.theme === "auto") {
      theme.global.name.value = evt.matches ? "dark" : "light"
    }
  })
})
</script>
