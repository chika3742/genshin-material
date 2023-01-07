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
