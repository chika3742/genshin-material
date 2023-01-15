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
export const CollectingMaterialTargetType = {
  CHARACTER: "character",
  WEAPON: "weapon",
  FURNISHING_SET: "furnishing set",
  ARTIFACT: "artifact",
} as const

export type CollectingMaterialTargetType = typeof CollectingMaterialTargetType[keyof typeof CollectingMaterialTargetType]

export const TargetType = {
  CHARACTER: "character",
  WEAPON: "weapon",
} as const

export type TargetType = typeof TargetType[keyof typeof TargetType]

export const Purpose = {
  ASCENSION: "ascension",
  LEVEL_UP: "levelUp",
  NORMAL_TALENT: "normalTalent",
  SKILL_TALENT: "skillTalent",
  BURST_TALENT: "burstTalent",
} as const

export type Purpose = typeof Purpose[keyof typeof Purpose]

export const MaterialCardType = {
  CHARACTER_ASCENSION: "characterAscension",
  CHARACTER_NORMAL_TALENT: "characterNormalTalent",
  CHARACTER_SKILL_TALENT: "characterSkillTalent",
  CHARACTER_BURST_TALENT: "characterBurstTalent",
  WEAPON_ASCENSION: "weaponAscension",
} as const

export type MaterialCardType = typeof MaterialCardType[keyof typeof MaterialCardType]

export const WeaponType = {
  SWORD: "u",
  CLAYMORE: "v",
  POLEARM: "w",
  BOW: "x",
  CATALYST: "y",
} as const

export type WeaponType = typeof WeaponType[keyof typeof WeaponType]
