<template>
  <PageContainer>
    <v-row align="center" class="mx-4" no-gutters style="gap: 16px">
      <!-- Sort button -->
      <v-btn prepend-icon="mdi-sort">
        {{ $t("common.sort") }}
        <v-menu activator="parent">
          <v-list v-model:selected="sort" :items="sortMenuItems" />
        </v-menu>
      </v-btn>
      <!-- Filter button -->
      <v-btn :color="refined ? '#d24700' : undefined" class="" prepend-icon="mdi-filter">
        {{ $t("common.filter") }}
        <v-menu :close-on-content-click="false" activator="parent">
          <v-card>
            <v-row no-gutters>
              <v-list v-model:selected="refine.rarity">
                <v-list-subheader>
                  {{ $t("common.rarity") }}
                </v-list-subheader>
                <!-- 4-star -->
                <v-list-item :value="4">
                  <v-list-item-title>
                    <v-icon v-for="i in [1, 2, 3, 4]" :key="i" color="yellow" size="18">
                      mdi-star
                    </v-icon>
                  </v-list-item-title>
                </v-list-item>
                <!-- 5-star -->
                <v-list-item :value="5">
                  <v-list-item-title>
                    <v-icon v-for="i in [1, 2, 3, 4, 5]" :key="i" color="yellow" size="18">
                      mdi-star
                    </v-icon>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider :thickness="2" class="my-12" vertical />
              <v-list v-model:selected="refine.element" width="100px">
                <v-list-subheader>
                  {{ $t("common.element") }}
                </v-list-subheader>
                <v-list-item v-for="element in elements" :key="element" :value="element">
                  <v-list-item-title>
                    <v-img :src="getElementImage(element)" class="mx-auto" width="30" />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider :thickness="2" class="my-12" vertical />
              <v-list v-model:selected="refine.weaponType">
                <v-list-subheader>
                  {{ $t("common.weapon_type") }}
                </v-list-subheader>
                <v-list-item v-for="weaponType in weaponTypes" :key="weaponType" :value="weaponType">
                  <v-list-item-title>
                    {{ $t(`weapon_type.${weaponType}`) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-row>
          </v-card>
        </v-menu>
      </v-btn>
    </v-row>

    <v-row :class="['my-2', $vuetify.display.xs ? 'ma-2' : 'ma-6']" justify="center" no-gutters>
      <v-lazy
        v-for="character in characters"
        :key="character.id"
        :height="$vuetify.display.xs ? undefined : '136px'"
        :width="$vuetify.display.xs ? '45%' : '256px'"
      >
        <v-card
          :class="['character-card', $vuetify.display.xs ? 'ma-2' : 'ma-4']"
          :to="localePath(`/character/${character.id}`)"
        >
          <div class="character-card__element-image">
            <v-img
              :src="getElementImage(character.element)"
            />
          </div>
          <v-img
            :aspect-ratio="2"
            :src="getCharacterImage(character.id, 'full')"
            class="character-card__image"
          />
          <span
            :class="{
              'font-kaisei-opti': true,
              'character-card__name-text': true,
              'character-card__name-text--small': $vuetify.display.xs
            }"
          >
            {{ $t(`character.${character.id}`) }}
          </span>
        </v-card>
      </v-lazy>
    </v-row>
  </PageContainer>
</template>

<script lang="ts" setup>
import {GenshinElement, WeaponType} from "~/types/enums"
import _characters from "~/assets/data/characters.yaml"
import {getCharacterImage, getElementImage} from "~/utils/images"

definePageMeta({
  title: "character",
})

type CharacterSortOrder = "default" | "name" | "element"

const i18n = useI18n()

const sortMenuItems: { title: string, value: CharacterSortOrder }[] = [
  {
    title: i18n.t("character_sort_order.default"),
    value: "default",
  },
  {
    title: i18n.t("character_sort_order.name"),
    value: "name",
  },
  {
    title: i18n.t("character_sort_order.element"),
    value: "element",
  },
]
const elements = Object.values(GenshinElement)
const weaponTypes = Object.values(WeaponType)

const sort = ref<CharacterSortOrder[]>(["default"])
const refine = ref({
  rarity: [] as (4 | 5)[],
  element: [] as GenshinElement[],
  weaponType: [] as WeaponType[],
})
const refined = computed(() => {
  return refine.value.rarity.length >= 1 ||
    refine.value.element.length >= 1 ||
    refine.value.weaponType.length >= 1
})

const characters = computed(() => {
  const filteredList = _characters.entries.filter((e) => {
    if (!refined.value) {
      return true
    }
    return (refine.value.element[0] ?? e.element) === e.element &&
      (refine.value.weaponType[0] ?? e.weaponType) === e.weaponType &&
      (refine.value.rarity[0] ?? e.rarity) === e.rarity
  })

  switch (sort.value[0]) {
    case "default":
      return filteredList
    case "name":
      return filteredList.sort((a, b) => {
        if (i18n.locale.value === "ja") {
          return (a.yomi ?? i18n.t(`character.${a.id}`)) > (b.yomi ?? i18n.t(`character.${b.id}`)) ? 1 : -1
        } else {
          return i18n.t(`character.${a.id}`) > i18n.t(`character.${b.id}`) ? 1 : -1
        }
      })
    case "element":
      return filteredList.sort((a, b) => elements.indexOf(a.element) - elements.indexOf(b.element))
  }
})
</script>

<style lang="scss" scoped>
.character-card {
  .v-theme--light & {
    background-color: #dddddd;
  }

  &__image {
    opacity: 90%;
  }

  &__element-image {
    position: absolute;
    opacity: 15%;
    width: 80px;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);

    .v-theme--light & {
      filter: brightness(0);
    }
  }

  &__name-text {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    width: auto;
    font-size: 24px;
    color: #dddddd;
    padding: 2px 8px 4px 32px;
    border-radius: 0 !important;
    background: linear-gradient(90deg, transparent, #242424cc 20%, #242424cc 100%);
    max-width: 110%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &--small {
      font-size: 20px;
    }
  }
}
</style>
