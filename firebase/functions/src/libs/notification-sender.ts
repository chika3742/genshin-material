import axios from "axios"
import {parse} from "yaml"
import * as moment from "moment"
import * as admin from "firebase-admin"
import {Materials} from "../../../../nuxt/types/generated/materials.g"
import {UserDocument} from "../models/user-document"
import {getResinRecoveryRemainingMinutes} from "../utils/resin"
import {makeMulticastRequest, queryIn} from "../utils/sender"
import {getTargetMaterialIds} from "../utils/common"

type UserDoc = admin.firestore.DocumentSnapshot<UserDocument>

export class NotificationSender {
  readonly messaging = admin.messaging()
  readonly timestamp: moment.Moment
  materialsData?: Materials
  targetMaterialIds?: string[]

  constructor(timestamp: string) {
    this.timestamp = moment(timestamp)
  }

  async fetchMaterialsData() {
    const result = await axios.get("https://raw.githubusercontent.com/chika3742/genshin-material/main/nuxt/assets/data/materials.yaml")
    this.materialsData = parse(result.data)
    this.targetMaterialIds = getTargetMaterialIds(this.timestamp, this.materialsData!)
  }

  sendNotification(userDoc: UserDoc) {
    return Promise.all([
      this.notifyCollecting(userDoc),
      this.notifyResinRecovery(userDoc),
    ])
  }

  private async notifyCollecting(userDoc: UserDoc): Promise<void> {
    if (!this.targetMaterialIds || !this.materialsData) {
      throw new Error("You should call fetchMaterialsData() before call this method")
    }

    const config = userDoc.data()!.notification
    if (config.collecting &&
      (process.env.FIREBASE_DEBUG_MODE || moment(this.timestamp).format("HH:mm") === config.timeCollecting)) {
      const result = await queryIn(userDoc.ref.collection("collectingMaterials"),
        "materialId", this.targetMaterialIds)

      if (result.length > 0) {
        const materialNames = this.materialsData.filter(e => result
          .some(f => e.id === f.data().materialId))
          .map(e => e.nameJP).join(", ")

        const sendingResult = await this.messaging.sendMulticast(makeMulticastRequest({
          title: "今日手に入る素材があります",
          body: `${materialNames} は本日獲得できます。`,
          link: "/collecting",
        }, config.tokens))

        await this.removeTokensIfNotRegistered(userDoc, sendingResult)
      }
    }
  }

  private async notifyResinRecovery(userDoc: UserDoc) {
    const userData = userDoc.data()!
    const config = userData.notification

    if (config.resinRecovery) {
      const resinCount = userData.resinCount
      const resinBaseTime = userData.resinBaseTime

      if (resinCount !== undefined && resinBaseTime !== undefined && !isNaN(parseInt(resinCount))) {
        const remainingMinutes = getResinRecoveryRemainingMinutes(parseInt(resinCount), moment(resinBaseTime))!
        if (remainingMinutes > -20 && remainingMinutes <= 0) {
          const sendingResult = await this.messaging.sendMulticast(makeMulticastRequest({
            title: "天然樹脂が全回復したようです",
            body: "樹脂が全回復したかもしれません",
            link: "/resin",
          }, config.tokens))

          await this.removeTokensIfNotRegistered(userDoc, sendingResult)
        }
      }
    }
  }

  private async removeTokensIfNotRegistered(userDoc: UserDoc, sendingResult: admin.messaging.BatchResponse) {
    if (sendingResult.failureCount > 0) {
      const tokensToRemove: string[] = []

      for (const i in sendingResult.responses) {
        if (sendingResult.responses[i].error?.code ===
          "messaging/registration-token-not-registered") {
          tokensToRemove.push(userDoc.data()!.notification.tokens[i])
        }
      }

      await userDoc.ref.update("notification.tokens", admin.firestore.FieldValue.arrayRemove(...tokensToRemove))
    }
  }
}
