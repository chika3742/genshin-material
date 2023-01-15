declare module "~/assets/data/release-notes.yaml" {
  import {ReleaseNotes} from "~/types/generated/release-notes.g";
  const releaseNotes: ReleaseNotes
  export default releaseNotes
}

declare module "~/assets/data/materials.yaml" {
  import {Materials} from "~/types/generated/materials.g";
  const materials: Materials
  export default materials
}

declare module "~/assets/data/characters.yaml" {
  import {Characters} from "~/types/generated/characters.g";
  const _characters: Characters
  export default _characters
}

declare module "~/assets/data/grind-rate-list.yaml" {
  import {GrindRateList} from "~/types/generated/grind-rate-list.g";
  const grindRateList: GrindRateList
  export default grindRateList
}

declare module "~/assets/data/d3.0.0.corr.yaml" {
  const d300corr: {[oldId: string]: string}
  export default d300corr
}

declare module "~/assets/data/d3.2.1.corr.yaml" {
  const d321corr: {[oldId: string]: string}
  export default d321corr
}

declare module "~/assets/data/d3.3.1.corr.yaml" {
  const d331corr: {[oldId: string]: string}
  export default d331corr
}
