import {Moment} from "moment"
import * as admin from "firebase-admin"
import {Materials} from "../../../../nuxt/types/generated/materials.g"
import {UserDocument} from "../../../../nuxt/models/user-document"

export function getTargetMaterialIds(timestamp: Moment, materials: Materials): string[] {
  return materials.filter((e) => {
    return e.availableDays && e.availableDays.includes(timestamp.subtract(7, "hours").weekday())
  }).map(e => e.id)
}

export const userDocumentConverter: admin.firestore.FirestoreDataConverter<UserDocument> = {
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): UserDocument {
    return new UserDocument(snapshot.data())
  },
  toFirestore(modelObject: admin.firestore.WithFieldValue<UserDocument>): admin.firestore.DocumentData {
    return modelObject
  },
}
