<script lang="ts" setup>
definePageMeta({
  title: "more",
  screenType: "default",
  nativeOnly: true,
})

const config = useConfigStore()

const themeOptions = ["light", "dark", "auto"]
const langOptions: Record<string, string> = {
  ja: "日本語",
  en: "English",
}

</script>

<template>
  <div>
    <v-list elevation="2" rounded>
      <v-list-item :title="tx('pageTitles.settings')" append-icon="mdi-chevron-right" prepend-icon="mdi-cog" to="/settings" />
      <v-list-item :title="tx('pageTitles.sync')" append-icon="mdi-chevron-right" prepend-icon="mdi-account-circle" to="/sync" />

      <!-- language preference -->
      <v-list-item :subtitle="langOptions[$i18n.locale]" lines="two" link prepend-icon="mdi-earth" title="Language">
        <v-menu activator="parent">
          <v-list :selected="[$i18n.locale]" max-width="200px" @update:selected="$i18n.setLocale($event[0])">
            <v-list-item
              v-for="(text, locale) in langOptions"
              :key="locale"
              :title="text"
              :value="locale"
            />
          </v-list>
        </v-menu>
      </v-list-item>

      <!-- theme preference -->
      <v-list-item
        :subtitle="tx(`footer.themeOptions.${config.theme}`)"
        :title="tx('footer.theme')"
        lines="two"
        link
        prepend-icon="mdi-brightness-4"
      >
        <v-menu activator="parent">
          <v-list :selected="[config.theme]" max-width="200px" @update:selected="config.theme = $event[0]">
            <v-list-item
              v-for="option in themeOptions"
              :key="option"
              :title="tx(`footer.themeOptions.${option}`)"
              :value="option"
            />
          </v-list>
        </v-menu>
      </v-list-item>
      <v-divider />
      <v-list-item
        :href="hoyolabArticleUrl"
        :subtitle="tx('common.feedbackDesc')"
        :title="tx('footer.feedback')"
        append-icon="mdi-open-in-new"
        lines="two"
        prepend-icon="mdi-comment-quote"
      />
      <v-list-item
        :title="tx('pageTitles.releaseNotes')"
        append-icon="mdi-chevron-right"
        prepend-icon="mdi-alert-decagram"
        to="/release-notes"
      />
      <v-divider />
      <v-list-item :title="tx('pageTitles.terms')" append-icon="mdi-chevron-right" to="/terms" />
      <v-list-item :title="tx('pageTitles.privacy')" append-icon="mdi-chevron-right" to="/privacy" />
    </v-list>

    <div class="my-4" style="opacity: 0.7; font-size: 0.8em; text-align: end">
      <p>{{ getCurrentVersionText() }}</p>
      <p>©chika {{ new Date().getFullYear() }}</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>

</style>
