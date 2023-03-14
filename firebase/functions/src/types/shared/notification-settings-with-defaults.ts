import {NotificationSettings} from "./notification-settings"

export class NotificationSettingsWithDefaults implements NotificationSettings {
  tokens: string[]
  collecting: boolean
  resinRecovery: boolean
  transformerRecovery: boolean
  timeCollecting: string

  constructor(settings: NotificationSettings) {
    this.tokens = settings.tokens ?? []
    this.collecting = settings.collecting ?? true
    this.resinRecovery = settings.resinRecovery ?? false
    this.transformerRecovery = settings.transformerRecovery ?? true
    this.timeCollecting = settings.timeCollecting ?? "07:00"
  }
}
