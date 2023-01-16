import {GachaLogEntry} from "./gacha-log-entry";
import {FurnishingSetMakeCount} from "./common";
import {UserDocumentNotificationConfig} from "./user-document-notification-config";

export interface UserDocument {
  resinCount?: string
  resinBaseTime?: string
  furnishingSetCount?: FurnishingSetMakeCount
  gachaLog?: GachaLogEntry[]
  schemaVer: number
  notification: UserDocumentNotificationConfig
}
