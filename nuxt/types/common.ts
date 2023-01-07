export const GenshinElement = {
  PYRO: "pyro",
  CRYO: "cryo",
  HYDRO: "hydro",
  ELECTRO: "electro",
  ANEMO: "anemo",
  GEO: "geo",
  DENDRO: "dendro",
} as const

export type GenshinElement = typeof GenshinElement[keyof typeof GenshinElement]

export const Stat = {
  HP: "hp",
  HP_PERCENTAGE: "hpPercentage",
  ATK: "atk",
  ATK_PERCENTAGE: "atkPercentage",
  DEF: "def",
  DEF_PERCENTAGE: "defPercentage",
  ELEMENTAL_MASTERY: "em",
  ENERGY_RECHARGE: "recharge",
  CRIT_RATE: "critRate",
  CRIT_DMG: "critDmg",
  PYRO_DMG_BONUS: "pyroDmgBonus",
  CRYO_DMG_BONUS: "cryoDmgBonus",
  HYDRO_DMG_BONUS: "hydroDmgBonus",
  ELECTRO_DMG_BONUS: "electroDmgBonus",
  ANEMO_DMG_BONUS: "anemoDmgBonus",
  GEO_DMG_BONUS: "geoDmgBonus",
  DENDRO_DMG_BONUS: "dendroDmgBonus",
  PHYSICAL_DMG_BONUS: "physicalDmgBonus",
  HEALING_BONUS: "healingBonus",
} as const

export type Stat = typeof Stat[keyof typeof Stat]

export const WeaponType = {
  SWORD: "u",
  CLAYMORE: "v",
  POLEARM: "w",
  BOW: "x",
  CATALYST: "y",
} as const

export type WeaponType = typeof WeaponType[keyof typeof WeaponType]

export type CharacterId = string

export type WeaponId = string

export type MaterialId = string

export type FurnishingSetCount = { [setId: string]: { [furnitureId: string]: number } }
