import {ApiErrorCode} from "~/types/api-error-codes"

export interface ShowcaseCharacterWeapon {
  nameJP: string
  level: number
  ascension: number
}

export interface ShowcaseCharacter {
  characterId: string
  characterName: string
  level: number
  ascension: number
  talentLevels: {
    normal: number
    skill: number
    burst: number
  }
  weapon: ShowcaseCharacterWeapon | undefined
}

interface PropMap {
  type: number
  val: string
}

export interface EnkaNetworkResponse {
  uid: string
  ttl: number
  playerInfo: {
    nickname: string
    level: number
    showAvatarInfoList: {
      avatarId: string
      level: number
    }[]
  }
  avatarInfoList: {
    propMap: { [id: string]: PropMap }
    skillLevelMap: { [id: string]: number }
    skillDepotId: number
    equipList: {
      weapon?: {
        level: number
        promoteLevel?: number
      }
      flat: {
        nameTextMapHash: string
      }
    }[]
  }[]
}

export interface ErrorResponse {
  errorMessage: string
  code: ApiErrorCode
}
