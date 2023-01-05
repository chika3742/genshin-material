<template>
  <v-dialog :model-value="modelValue" height="700px" max-width="500px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-text-field
        v-model="searchText"
        :label="$t('common.search')"
        :messages="$t('common.search_field_message')"
        autofocus
        class="ma-4"
        prepend-icon="mdi-magnify"
      />
      <v-list>
        <v-list-item
          v-for="(hit, i) in searchResults"
          :key="i"
          :prepend-icon="getIcon(hit.type)"
          :subtitle="$t(`pages.${hit.type}`)"
          :title="locale === 'ja' ? hit.nameJP : hit.nameEN"
          :to="localePath(`/${hit.type}/${hit.id}`)"
          lines="two"
          link
          @click="$emit('update:modelValue', false)"
        />
      </v-list>
      <v-card-actions>
        <v-spacer />
        <v-btn flat @click="$emit('update:modelValue', false)">
          {{ $t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import algoliasearch from "algoliasearch/lite"
import {Hit} from "@algolia/client-search"
import {hiraToKana} from "~/utils/hira-to-kana"

const props = defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

const config = useRuntimeConfig()
const {locale} = useI18n()

const client = algoliasearch(config.public.algoliaAppId, config.public.algoliaApiKey)
const index = client.initIndex("genshin_material")

const search = async(value: string) => {
  if (value === "") {
    searchResults.value = []
  } else {
    const result = await index.search(value, {})
    searchResults.value = result.hits as Hit<never>[]
  }
}

const searchText = ref("")
const searchResults = ref<Hit<never>[]>([])

watch(searchText, (value) => {
  search(hiraToKana(value))
})

const getIcon = (type: "character" | "material" | "weapon") => {
  switch (type) {
    case "character": return "mdi-account"
    case "material": return "mdi-grass"
    case "weapon": return "mdi-sword"
  }
}

watch(toRefs(props).modelValue, () => {
  searchText.value = ""
  search(searchText.value)
})
</script>
