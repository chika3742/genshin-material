<template>
  <client-only>
    <v-dialog v-model="versionDialog.show" :scrollable="true" max-width="400px">
      <v-card>
        <v-card-title class="orange--text text--lighten-2">
          {{ versionDialog.version }} アップデート内容
        </v-card-title>
        <v-card-text class="doc-container">
          <div v-html="marked.parse(versionDialog.contents)" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="versionDialog.show = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="versionSnackbar.show" color="light-blue darken-4">
      <span class="font-weight-bold">v{{ versionSnackbar.version }} に更新しました。</span>
      <template #actions>
        <v-btn color="lime accent-1" text to="/changeLog" @click="versionSnackbar.show = false">
          更新内容
        </v-btn>
      </template>
    </v-snackbar>
  </client-only>
</template>

<script lang="ts" setup>
import {marked} from "marked"
import {useConfigStore} from "~/stores/config.store"
import {ReleaseNotesEntry} from "~/types/generated/release-notes.g"
import releaseNotes from "~/assets/data/release-notes.yaml"

const versionDialog = ref({
  show: false,
  version: "",
  contents: "",
})

const versionSnackbar = ref({
  show: false,
  version: "",
})

onMounted(() => {
  const configStore = useConfigStore()
  if (configStore.previousVersion && configStore.previousVersion !== currentVersion) {
    let majorChange: ReleaseNotesEntry | undefined
    for (let i = 0; i < releaseNotes.length - 1; i++) {
      if (releaseNotes[i].funcVersion.split(".")[1] !== releaseNotes[i + 1].funcVersion.split(".")[1]) {
        majorChange = releaseNotes[i]
        break
      }
      if (currentVersion === `v${releaseNotes[i].funcVersion}_D${releaseNotes[i].dataVersion}`) {
        break
      }
    }

    if (majorChange) {
      versionDialog.value.show = true
      versionDialog.value.version = majorChange.funcVersion
      versionDialog.value.contents = majorChange.contents
    } else {
      versionSnackbar.value.show = true
      versionSnackbar.value.version = currentVersion
    }
  }
  configStore.previousVersion = currentVersion
})
</script>
