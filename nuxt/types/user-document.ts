// noinspection ES6PreferShortImport

import {GachaLogEntry} from "../types/gacha-log"
import {UserDocumentNotificationConfig} from "../models/user-document-notification-config"
import {FurnishingSetMakeCount} from "~/types/common"

export interface UserDocument {
  resinCount?: string
  resinBaseTime?: string
  furnishingSetCount?: FurnishingSetMakeCount
  gachaLog?: GachaLogEntry[]
  schemaVer: number
  notification: UserDocumentNotificationConfig
}
