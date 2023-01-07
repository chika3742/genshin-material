import {Moment} from "moment"
import {Materials} from "../../../../nuxt/types/generated/materials.g"

export function getTargetMaterialIds(timestamp: Moment, materials: Materials): string[] {
  return materials.filter((e) => {
    return e.availableDays && e.availableDays.includes(timestamp.subtract(7, "hours").weekday())
  }).map(e => e.id)
}
