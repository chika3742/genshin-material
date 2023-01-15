import * as admin from "firebase-admin"
import {UserDocument} from "../../../../nuxt/types/user-document"

export const userDocumentConverter: admin.firestore.FirestoreDataConverter<UserDocument> = {
  fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot): UserDocument {
    return snapshot.data() as UserDocument
  },
  toFirestore(modelObject: admin.firestore.WithFieldValue<UserDocument>): admin.firestore.DocumentData {
    return modelObject
  },
}
