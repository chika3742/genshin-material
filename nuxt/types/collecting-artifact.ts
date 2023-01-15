import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore"
import {Stat} from "~/types/enums"

export interface CollectingArtifact {
  id?: number
  type: "single" | "set"
  characterId: string | null
  mainStat: {
    sands: Stat | null
    goblet: Stat | null
    circlet: Stat | null
  } | Stat | null
  subStats: Stat[]
}

export const collectingArtifactConverter: FirestoreDataConverter<CollectingArtifact> = {
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CollectingArtifact {
    return snapshot.data(options) as CollectingArtifact
  },
  toFirestore(modelObject: WithFieldValue<CollectingArtifact>): DocumentData {
    return modelObject
  },
}
