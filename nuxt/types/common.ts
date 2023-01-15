import {FieldValue} from "firebase/firestore"

export type CharacterId = string

export type WeaponId = string

export type MaterialId = string

export type FurnishingSetMakeCount = { [setId: string]: { [furnitureId: string]: number } } | FieldValue
