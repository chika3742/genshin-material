import {CollectingArtifact} from "./collecting-artifact"

export interface CollectingArtifactPiece extends CollectingArtifact {
  type: "single"
  artifactId: string
}
