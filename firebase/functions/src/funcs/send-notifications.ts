import * as functions from "firebase-functions"
import admin from "firebase-admin"
import {NotificationSender} from "../libs/notification-sender"
import {userDocumentConverter} from "../utils/common"

export const sendNotifications = functions.region("asia-northeast1").pubsub
  .schedule("every 20 minutes from 0:00 to 23:59")
  .timeZone("Asia/Tokyo")
  .onRun(async(context) => {
    const db = admin.firestore()
    const snapshot = await db.collection("users")
      .where("notification.tokens", "!=", [])
      .withConverter(userDocumentConverter)
      .get()

    const sender = new NotificationSender(context.timestamp)

    await sender.fetchMaterialsData()

    // per user
    for (const userDoc of snapshot.docs.filter(e => e.data().notification.tokens.length > 0)) {
      await sender.sendNotification(userDoc)
    }
  })
