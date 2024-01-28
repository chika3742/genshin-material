declare module "~/assets/data/release-notes.yaml" {
  import {ReleaseNote} from "~/types/generated/release-notes.g"
  const releaseNotes: ReleaseNote[]
  export default releaseNotes
}

declare module "~/assets/data/artifact-sets.yaml" {
  import {ArtifactSet} from "~/types/generated/artifact-sets.g"
  const artifactSets: ArtifactSet[]
  export default artifactSets
}

declare module "~/assets/data/artifact-pieces.yaml" {
  import {ArtifactPiece} from "~/types/generated/artifact-pieces.g"
  const artifactPieces: ArtifactPiece[]
  export default artifactPieces
}

declare module "~/assets/data/domains.yaml" {
  import {Domain} from "~/types/generated/domains.g"
  const domains: Domain[]
  export default domains
}

declare module "~/assets/data/characters.yaml" {
  import {Character} from "~/types/generated/characters.g"
  const characters: Character[]
  export default characters
}

declare module "~/assets/data/furnishing-sets.yaml" {
  import {FurnishingSet} from "~/types/generated/furnishing-sets.g"
  const furnishingSets: FurnishingSet[]
  export default furnishingSets
}

declare module "~/assets/data/furnishing-pieces.yaml" {
  import {FurnishingPiece} from "~/types/generated/furnishing-pieces.g"
  const furnishingPieces: FurnishingPiece[]
  export default furnishingPieces
}

declare module "~/assets/data/materials.yaml" {
  import {Material} from "~/types/generated/materials.g"
  const materials: Material[]
  export default materials
}

declare module "~/assets/data/weapons.yaml" {
  import {Weapon} from "~/types/generated/weapons.g"
  const weapons: Weapon[]
  export default weapons
}
