import {Moment} from "moment"
import {MaterialData} from "../types/material-data"

export function getTargetMaterialIds(timestamp: Moment, materials: MaterialData[]): string[] {
  return materials.filter((e) => {
    return e.availableDays && e.availableDays.includes(timestamp.subtract(7, "hours").weekday())
  }).map(e => e.id)
}
