import * as admin from "firebase-admin"
import {UserSettings} from "../types/shared/user-settings"

export const userDocumentConverter: admin.firestore.FirestoreDataConverter<UserSettings> = {
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): UserSettings {
    return snapshot.data() as UserSettings
  },
  toFirestore(modelObject: admin.firestore.WithFieldValue<UserSettings>): admin.firestore.DocumentData {
    return modelObject
  },
}
