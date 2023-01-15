import {Stat} from "~/types/enums"
import {createSimpleDataConverter} from "~/utils/create-simple-data-converter"

export interface CollectingArtifactSet {
  id?: number
  artifactSetIds: string[]
  characterId: string | null
  mainStat: {
    sands: Stat | null
    goblet: Stat | null
    circlet: Stat | null
  } | Stat | null
  subStats: Stat[]
}

export const collectingArtifactSetConverter = createSimpleDataConverter<CollectingArtifactSet>()
