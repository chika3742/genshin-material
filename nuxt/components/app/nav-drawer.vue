<template>
  <v-navigation-drawer v-model="isOpen">
    <v-list nav>
      <template v-for="(item, i) in drawerItems">
        <v-list-item
          v-if="item !== '---'"
          :key="i"
          :href="item.href"
          :prepend-icon="item.icon"
          :target="item.target"
          :title="$t(`pages.${item.title}`)"
          :to="item.to ? localePath(item.to) : undefined"
          density="comfortable"
          @click="item.onClick?.(); isOpen = false"
        />
        <v-divider v-else :key="i * 2" class="mb-1" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useDisplay} from "vuetify"

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const display = useDisplay()

const isOpen = computed({
  get() {
    return display.mobile.value ? props.modelValue : true
  },
  set(value: boolean) {
    emit("update:modelValue", value)
  },
})

interface DrawerItem {
  icon: string
  title: string
  to?: string
  href?: string
  target?: string
  onClick?: () => void
}

type Divider = "---"

const drawerItems: (DrawerItem | Divider)[] = [
  {
    icon: "mdi-home",
    title: "home",
    to: "/",
  },
  "---" as const,
  {
    icon: "mdi-format-list-checkbox",
    title: "collecting",
    to: "/collecting",
  },
  {
    icon: "mdi-import",
    title: "game_data_sync",
    onClick: () => {
    },
  },
  {
    icon: "mdi-calendar",
    title: "daily",
    to: "/daily",
  },
  "---" as const,
  {
    icon: "mdi-account",
    title: "character",
    to: "/character",
  },
  {
    icon: "mdi-sword",
    title: "weapon",
    to: "/weapon",
  },
  {
    icon: "mdi-flower-poppy",
    title: "artifacts",
    to: "/artifacts",
  },
  {
    icon: "mdi-sofa-single",
    title: "furnishing_set",
    to: "/furnishing-set",
  },
  {
    icon: "mdi-grass",
    title: "material",
    to: "/material",
  },
  "---" as const,
  {
    icon: "mdi-diamond-stone",
    title: "resin",
    to: "/resin",
  },
  {
    icon: "mdi-history",
    title: "wishes",
    to: "/wishes",
  },
  {
    icon: "mdi-book-open-page-variant",
    title: "readings",
    to: "/readings",
  },
  {
    icon: "mdi-account-circle",
    title: "account",
    to: "/account",
  },
  "---" as const,
  {
    icon: "mdi-information",
    title: "about",
    to: "/about",
  },
  {
    icon: "mdi-coffee",
    title: "buy_me_coffee",
    href: "https://ko-fi.com/chika3742",
    target: "gms-ko-fi",
  },
]
</script>
