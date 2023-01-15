import {NotificationConfig} from "~/types/notification-config"

export class UserDocumentNotificationConfig implements NotificationConfig {
  tokens: string[]
  collecting: boolean
  resinRecovery: boolean
  transformerRecovery: boolean
  timeCollecting: string
  constructor(
    tokens?: string[] | undefined,
    collecting?: boolean | undefined,
    resinRecovery?: boolean | undefined,
    transformerRecovery?: boolean | undefined,
    timeCollecting?: string | undefined,
  ) {
    this.tokens = tokens ?? []
    this.collecting = collecting ?? true
    this.resinRecovery = resinRecovery ?? false
    this.transformerRecovery = transformerRecovery ?? true
    this.timeCollecting = timeCollecting ?? "07:00"
  }
}
