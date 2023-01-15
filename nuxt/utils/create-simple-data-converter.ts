import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore"

export const createSimpleDataConverter = <T extends DocumentData>(): FirestoreDataConverter<T> => {
  return {
    fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): T {
      return snapshot.data(options) as T
    },
    toFirestore(modelObject: WithFieldValue<T>): DocumentData {
      return modelObject
    },
  }
}
