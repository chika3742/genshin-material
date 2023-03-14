import {WishItem} from "../../../../../nuxt/types/wish-item"
import {FurnishingSetCreationCount} from "./furnishing-set-creation-count"
import {NotificationSettings} from "./notification-settings"

export interface UserSettings {
  resinCount?: string
  resinBaseTime?: string
  furnishingSetCount?: FurnishingSetCreationCount
  gachaLog?: WishItem[]
  schemaVer: number
  notification: NotificationSettings
}
