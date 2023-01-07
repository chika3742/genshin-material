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
