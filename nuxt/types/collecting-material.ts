import {Purpose, TargetType} from "~/types/enums"
import {CharacterId} from "~/types/common"

export interface CollectingMaterial {
  id?: number
  dateAdded?: Date
  materialId: string
  targetId: string
  targetType: TargetType
  purpose: Purpose
  level: number
  amount: number
  weaponEquipTo: CharacterId | undefined
}
