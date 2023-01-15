import {CollectingArtifact} from "~/types/collecting-artifact"

export interface CollectingArtifactSet extends CollectingArtifact {
  type: "set"
  artifactSetIds: string[]
}
