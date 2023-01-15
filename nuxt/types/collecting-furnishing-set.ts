import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore"

export interface CollectingFurnishingSet {
  id?: number
  targetId: string
}

export const collectingFurnishingSetConverter: FirestoreDataConverter<CollectingFurnishingSet> = {
  fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): CollectingFurnishingSet {
    return snapshot.data(options) as CollectingFurnishingSet
  },
  toFirestore(modelObject: WithFieldValue<CollectingFurnishingSet>): DocumentData {
    return modelObject
  },
}
