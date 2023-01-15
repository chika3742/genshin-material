<template>
  <PageContainer class="doc-container">
    <v-timeline
      :class="{ 'collapse': !showAll, 'mt-4': true }"
      align="start"
      side="end"
      style="transition: all 300ms ease"
    >
      <div v-show="!showAll" class="gradient" />
      <v-timeline-item
        v-for="(entry, i) in releaseNotes"
        :key="i"
        :dot-color="isDataUpdate(i) ? 'light-blue' : 'green'"
        :size="isMajor(i) ? 'default' : 'small'"
      >
        <div class="d-flex flex-column flex-sm-row">
          <span class="font-weight-bold flex-shrink-0" style="width: 100px">{{ entry.date }}</span>
          <div class="ml-2 ml-sm-4">
            <div class="text-light-blue-accent-2 font-weight-bold">
              v{{ entry.funcVersion }} (D{{ entry.dataVersion }})
            </div>
            <div class="mt-2" v-html="marked.parse(entry.contents)" />
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>

    <div style="text-align: center">
      <v-btn v-show="!showAll" flat @click="showAll = true">
        すべて表示
      </v-btn>
    </div>

    <section class="mt-4">
      <h2>凡例</h2>
      <v-table>
        <tbody>
          <tr>
            <td>緑色のドット</td>
            <td>機能バージョンの更新。機能追加やバグ修正などを含みます。</td>
          </tr>
          <tr>
            <td>青色のドット</td>
            <td>データバージョンの更新を含む。キャラや武器などの追加を含みます。</td>
          </tr>
          <tr>
            <td>大きなドット</td>
            <td>メジャーバージョンアップ。</td>
          </tr>
        </tbody>
      </v-table>
    </section>
  </PageContainer>
</template>

<script lang="ts" setup>
import {marked} from "marked"
import releaseNotes from "~/assets/data/release-notes.yaml"

definePageMeta({
  title: "release_notes",
})

const showAll = ref(false)

const isMajor = (index: number) => {
  if (index >= releaseNotes.length - 1) {
    return true
  }

  const split = releaseNotes[index].funcVersion.split(".")
  const split2 = releaseNotes[index + 1].funcVersion.split(".")

  return split[1] !== split2[1] || split[0] !== split2[0]
}

const isDataUpdate = (index: number) => {
  if (index >= releaseNotes.length - 1) {
    return false
  }

  return releaseNotes[index].dataVersion !== releaseNotes[index + 1].dataVersion
}

</script>

<style lang="scss">
.gradient {
  width: 100%;
  height: 700px;
  top: 0;
  position: absolute;
  z-index: 4;
  pointer-events: none;

  .v-theme--light & {
    background: linear-gradient(to bottom, #fff0, #fff0 75%, #9f9f9f);
  }

  .v-theme--dark & {
    background: linear-gradient(to bottom, #fff0, #fff0 75%, #121212);
  }
}

.collapse {
  max-height: 700px !important;
  overflow: hidden;
}
</style>
