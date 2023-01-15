import {Dexie, Table} from "dexie"
import {GachaLogEntry} from "~/types/gacha-log"
import d331corr from "~/assets/data/d3.3.1.corr.yaml"
import d321corr from "~/assets/data/d3.2.1.corr.yaml"
import {CollectingFurnishingSet} from "~/types/collecting-furnishing-set"
import {CollectingMaterial} from "~/types/collecting-material"
import d300corr from "~/assets/data/d3.0.0.corr.yaml"
import {CollectingArtifactPiece} from "~/types/collecting-artifact-piece"
import {CollectingArtifactSet} from "~/types/collecting-artifact-set"
import {LegacyCollectingArtifact} from "~/types/legacy-collecting-artifact"

class MySubClassedDexie extends Dexie {
  gachaLogs!: Table<GachaLogEntry>
  collectingMaterials!: Table<CollectingMaterial>
  collectingFurnishingSets!: Table<CollectingFurnishingSet>
  collectingArtifactPieces!: Table<CollectingArtifactPiece>
  collectingArtifactSets!: Table<CollectingArtifactSet>

  constructor() {
    super("genshinMaterial")
    this.version(12).stores({
      gachaLogs: "++entryId, id, time, gachaType, itemType, name, rankType",
      collectingMaterials: "++id, dateAdded, identifier, materialId, targetType, targetId, characterPurpose, level, amount",
      collectingFurnishingSets: "++id, targetId",
      collectingArtifacts: "++id, type, artifactId, characterId, mainStat, *subStats",
    })

    this.version(13).stores({})

    this.version(14).stores({})

    this.version(16).stores({})

    this.version(17).stores({
      collectingMaterials: "++id, dateAdded, identifier, materialId, targetType, targetId, characterPurpose, level, amount, weaponEquipTo",
    })

    this.version(18).upgrade((trans) => {
      return trans.table("collectingArtifacts").toCollection().modify((data: CollectingArtifactPiece) => {
        if (d331corr[data.artifactId]) {
          data.artifactId = d331corr[data.artifactId]
        }
      })
    })

    this.version(19).stores({
      collectingArtifactPieces: "++id, artifactId, characterId, mainStat, *subStats",
      collectingArtifactSets: "++id, *artifactSetIds, characterId, mainStat, *subStats",
    }).upgrade(async(trans) => {
      const piecesTable = trans.table<CollectingArtifactPiece>("collectingArtifactPieces")
      const setsTable = trans.table<CollectingArtifactSet>("collectingArtifactSets")

      for (const legacyObj of await trans.table<LegacyCollectingArtifact>("collectingArtifacts").toArray()) {
        switch (legacyObj.type) {
          case "set":
            await setsTable.add({
              id: legacyObj.id,
              characterId: legacyObj.characterId,
              artifactSetIds: legacyObj.artifactSetIds!,
              mainStat: legacyObj.mainStat,
              subStats: legacyObj.subStats,
            })
            break

          case "single":
            await piecesTable.add({
              id: legacyObj.id,
              characterId: legacyObj.characterId,
              artifactId: legacyObj.artifactId!,
              mainStat: legacyObj.mainStat,
              subStats: legacyObj.subStats,
            })
            break
        }
      }
    })

    this.on("ready", (event) => {
      event.transaction("rw", this.collectingMaterials, (trans) => {
        return trans.table<CollectingMaterial>("collectingMaterials").toCollection().modify((data: CollectingMaterial) => {
          if (data.materialId.toString().match(/^(?![a-z]).*$/)) {
            data.materialId = d300corr[data.materialId] ?? data.materialId
          }
          if (data.targetType === "weapon" && !data.targetId.toString().includes("-")) {
            data.targetId = d321corr[data.targetId.toString()] ?? data.targetId
          }
        })
      })
    })
  }
}

export const db = new MySubClassedDexie()
