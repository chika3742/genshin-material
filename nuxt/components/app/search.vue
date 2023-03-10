<template>
  <v-dialog :model-value="modelValue" height="700px" max-width="500px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card height="100%">
      <div class="h-100 d-flex flex-column">
        <v-row class="flex-grow-0" no-gutters>
          <v-text-field
            v-model="searchText"
            :label="$t('common.search')"
            :messages="$t('common.search_field_message')"
            autofocus
            class="ma-4"
            prepend-icon="mdi-magnify"
          />
          <v-btn class="ma-2" density="comfortable" icon="mdi-close" variant="text" @click="$emit('update:modelValue', false)" />
        </v-row>
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
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import algoliasearch from "algoliasearch/lite"
import {Hit} from "@algolia/client-search"

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
