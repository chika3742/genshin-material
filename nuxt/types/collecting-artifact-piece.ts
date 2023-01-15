import {Stat} from "~/types/enums"
import {createSimpleDataConverter} from "~/utils/create-simple-data-converter"

export interface CollectingArtifactPiece {
  id?: number
  artifactId: string
  characterId: string | null
  mainStat: {
    sands: Stat | null
    goblet: Stat | null
    circlet: Stat | null
  } | Stat | null
  subStats: Stat[]
}

export const collectingArtifactPieceConverter = createSimpleDataConverter<CollectingArtifactPiece>()
