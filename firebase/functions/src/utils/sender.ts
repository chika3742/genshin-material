import * as admin from "firebase-admin"
import {chunk} from "lodash"

export async function queryIn(ref: admin.firestore.CollectionReference, fieldPath: string, value: unknown[])
  : Promise<admin.firestore.QueryDocumentSnapshot[]> {
  const chunked = chunk(value, 10)
  const docs: admin.firestore.QueryDocumentSnapshot[] = []

  for (const chunkedElement of chunked) {
    const result = await ref.where(fieldPath, "in", chunkedElement).get()
    docs.push(...result.docs)
  }

  return docs
}

type SimplifiedMulticastMessage = {
  title: string,
  body: string,
  link: string
}

export function makeMulticastRequest(data: SimplifiedMulticastMessage, tokens: string[]): admin.messaging.MulticastMessage {
  return {
    tokens,
    notification: {
      title: data.title,
      body: data.body,
    },
    apns: {
      payload: {
        aps: {
          sound: "default",
          category: "default",
        },
      },
    },
    webpush: {
      notification: {
        icon: "https://gms.chikach.net/pwaicon.png",
      },
      fcmOptions: {
        link: `${data.link}`,
      },
    },
  }
}
