import {Stat} from "~/types/enums"

export interface LegacyCollectingArtifact {
  id?: number
  type: "set" | "single"
  artifactId?: string
  artifactSetIds?: string[]
  characterId: string | null
  mainStat: {
    sands: Stat | null
    goblet: Stat | null
    circlet: Stat | null
  } | Stat | null
  subStats: Stat[]
}
