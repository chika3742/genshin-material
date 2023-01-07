import * as admin from "firebase-admin"
import {GachaLogEntry} from "../../../../nuxt/types/gacha-log"
import {FurnishingSetCount} from "../../../../nuxt/types/common"

export class UserDocNotificationConfig {
  tokens: string[]
  collecting: boolean
  resinRecovery: boolean
  transformerRecovery: boolean
  timeCollecting: string
  constructor(
    tokens: string[] | undefined,
    collecting: boolean | undefined,
    resinRecovery: boolean | undefined,
    transformerRecovery: boolean | undefined,
    timeCollecting: string | undefined,
  ) {
    this.tokens = tokens ?? []
    this.collecting = collecting ?? true
    this.resinRecovery = resinRecovery ?? false
    this.transformerRecovery = transformerRecovery ?? true
    this.timeCollecting = timeCollecting ?? "07:00"
  }
}

export class UserDocument {
  resinCount?: string
  resinBaseTime?: string
  furnishingSetCount?: FurnishingSetCount
  gachaLog?: GachaLogEntry[]
  schemaVer: number
  notification: UserDocNotificationConfig

  constructor(data: { [field: string]: any }) {
    this.resinCount = data.resinCount
    this.resinBaseTime = data.resinBaseTime ?? undefined
    this.furnishingSetCount = data.furnishingSetCount
    this.gachaLog = data.gachaLog ?? []
    this.schemaVer = data.schemaVer
    this.notification = new UserDocNotificationConfig(
      data.notification.tokens,
      data.notification.collecting,
      data.notification.resinRecovery,
      data.notification.transformerRecovery,
      data.notification.timeCollecting,
    )
  }
}

export const userDocumentConverter: admin.firestore.FirestoreDataConverter<UserDocument> = {
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): UserDocument {
    return new UserDocument(snapshot.data())
  },
  toFirestore(modelObject: admin.firestore.WithFieldValue<UserDocument>): admin.firestore.DocumentData {
    return modelObject
  },
}
