import {createSimpleDataConverter} from "~/utils/create-simple-data-converter"

export interface CollectingFurnishingSet {
  id?: number
  targetId: string
}

export const collectingFurnishingSetConverter = createSimpleDataConverter<CollectingFurnishingSet>()
