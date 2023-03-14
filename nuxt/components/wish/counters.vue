<template>
  <div class="pb-4">
    <v-row no-gutters>
      <v-card>
        <h4 class="rank-5">
          {{ $t('wishes.pity_count', {rank: 5}) }}
        </h4>
        <span :class="rank5ColorClass">{{ rank5Count !== undefined ? rank5Count : "--" }} <span> / {{ weaponWish ? "80" : "90" }}回</span></span>
      </v-card>

      <v-card>
        <h4 class="rank-4">
          {{ $t('wishes.pity_count', {rank: 4}) }}
        </h4>
        <span>{{ rank4Count !== undefined ? rank4Count : "--" }} <span> / 10回</span></span>
      </v-card>

      <v-card>
        <h4 class="rank-5">
          {{ $t('wishes.latest', {rank: 5}) }}
        </h4>
        <span>{{ latestRank5Item !== undefined ? latestRank5Item : "--" }}</span>
      </v-card>

      <v-card>
        <h4 class="rank-4">
          {{ $t('wishes.latest', {rank: 4}) }}
        </h4>
        <span>{{ latestRank4Item !== undefined ? latestRank4Item : "--" }}</span>
      </v-card>
      <v-card>
        <h4 class="rank-5">
          {{ $t('wishes.rank_5_probability', {count: probabilityCount}) }}
        </h4>
        <span>{{ probability !== undefined ? (probability * 100.0).toFixed(2) : "--" }}%</span>
      </v-card>
    </v-row>

    <v-expansion-panels style="max-width: 600px">
      <v-expansion-panel>
        <v-expansion-panel-title>詳細</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-table density="compact" hover>
            <thead>
              <tr>
                <th>アイテム名</th>
                <th>天井カウント</th>
                <th>排出日</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in wishListHighRank" :key="item.id">
                <td :class="{'rank-4': item.rankType === '4', 'rank-5': item.rankType === '5', 'font-weight-bold': true}" style="gap: 8px; display: flex; align-items: center">
                  <span>☆{{ item.rankType }}</span>
                  <span><v-icon>{{ item.itemType === "キャラクター" ? "mdi-account" : "mdi-sword" }}</v-icon></span>
                  <span>{{ item.name }}</span>
                </td>
                <td :class="[getIndividualPityClass(item), 'font-weight-bold']">
                  {{ getIndividualWishPity(item) }}
                </td>
                <td>{{ moment(item.time).format("YYYY/MM/DD HH:mm") }} ({{ moment(item.time).fromNow() }})</td>
              </tr>
            </tbody>
          </v-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment"
import "moment/dist/locale/ja"
import {useWishesStore} from "~/stores/wishes.store"
import {getGachaProbability} from "~/utils"
import {computed} from "#imports"
import {WishItem} from "~/types/wish-item"

const props = withDefaults(defineProps<{
  wishType: string,
  probabilityCount: number,
  weaponWish?: boolean
}>(), {
  weaponWish: false,
})

const wishesStore = useWishesStore()

const wishList = computed(() => {
  return wishesStore.wishes.filter(e => e.gachaType === props.wishType).slice().reverse()
})

const wishListHighRank = computed(() => {
  return wishList.value.filter(e => parseInt(e.rankType) >= 4)
})

const getPityCount = (rankType: string) => {
  if (wishList.value.length === 0) { return undefined }

  const index = wishList.value.findIndex(e => e.rankType === rankType)

  if (index === -1) {
    return wishList.value.length
  } else {
    return index
  }
}

const getIndividualWishPity = (item: WishItem) => {
  const index = wishList.value.findIndex(e => e.id === item.id)
  const nextIndex = wishList.value.findIndex((e, findIndex) => findIndex > index && e.rankType === item.rankType)
  if (nextIndex === -1) {
    return (wishList.value.length - 1) - index
  }
  return nextIndex - index
}

const getIndividualPityClass = (item: WishItem) => {
  const pity = getIndividualWishPity(item)
  switch (item.rankType) {
    case "4": {
      if (pity <= 8) {
        return "text-green"
      } else if (pity <= 9) {
        return "text-orange"
      } else {
        return "text-red"
      }
    }
    case "5":
      if (pity <= 63) {
        return "text-green"
      } else if (pity <= 73) {
        return "text-orange"
      } else {
        return "text-red"
      }
  }
}

const getLatestItem = (rankType: string) => {
  return [...wishList.value].reverse().find(e => e.rankType === rankType)?.name
}

const rank5Count = computed(() => {
  return getPityCount("5")
})

const rank4Count = computed(() => {
  return getPityCount("4")
})

const latestRank5Item = computed(() => {
  return getLatestItem("5")
})

const latestRank4Item = computed(() => {
  return getLatestItem("4")
})

const rank5ColorClass = computed(() => {
  if (rank5Count.value === undefined) { return undefined }
  if (!props.weaponWish) {
    if (rank5Count.value < 64) { return undefined }
    if (rank5Count.value >= 64 && rank5Count.value <= 73) { return "text-orange" }
    if (rank5Count.value >= 74) { return "text-red" }
  } else {
    if (rank5Count.value < 54) { return undefined }
    if (rank5Count.value >= 54 && rank5Count.value <= 63) { return "text-orange" }
    if (rank5Count.value >= 64) { return "text-red" }
  }
  return undefined
})

const probability = computed(() => {
  if (rank5Count.value === undefined || rank5Count.value + props.probabilityCount > (props.weaponWish ? 80 : 90) || props.probabilityCount === undefined) {
    return undefined
  }
  return getGachaProbability(props.weaponWish ? "weapon" : "others", rank5Count.value + props.probabilityCount)
})
</script>

<style lang="sass" scoped>
.v-card
  text-align: center
  margin: 8px
  padding: 8px 16px

  h4
    font-weight: normal
    font-size: 14px

  span
    font-size: 26px
    font-weight: bold

    span
      font-size: 18px

.rank-4
  color: #c488fd

.rank-5
  color: #f1931d
</style>
