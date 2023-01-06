import {EnkaNetworkResponse, ErrorResponse} from "~types/showcase"
import loc from "~libs/data/loc.json"
import characterIds from "~libs/data/character-ids.json"
import travelerSkillSetIds from "~libs/data/traveler-skill-set-ids.json"

function errorResponse(message: string, status: number) {
  return jsonResponse({
    errorMessage: message,
  } as ErrorResponse, {
    status,
  })
}

function jsonResponse(json: Record<string, any>, init?: ResponseInit) {
  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  })
}

export const onRequest: PagesFunction = async(context) => {
  if (context.request.method !== "GET") {
    return errorResponse("Method not allowed", 405)
  }

  const requestUrl = new URL(context.request.url)

  if (!requestUrl.searchParams.has("uid")) {
    return errorResponse("Parameter 'uid' is required", 400)
  }

  const uid = requestUrl.searchParams.get("uid")

  if (!uid.match(/^\d{9,}$/)) {
    return errorResponse("Parameter 'uid' must be at least 9 digits", 400)
  }

  const result = await fetch(`https://enka.network/u/${uid}/__data.json`, {
    headers: {
      "User-Agent": "Genshin Material Data Sync/2.0.0 (gms.chikach.net)",
    },
  })
  const data = await result.json<EnkaNetworkResponse>()

  if (!data.playerInfo.showAvatarInfoList || !data.avatarInfoList ||
    data.playerInfo.showAvatarInfoList.length === 0) {
    return errorResponse(
      "Showcase character not found",
      404,
    )
  }

  return jsonResponse({
    uid: data.uid,
    ttl: data.ttl,
    username: data.playerInfo.nickname,
    adventureRank: data.playerInfo.level,
    showcaseCharacters: data.playerInfo.showAvatarInfoList.map((e, index) => {
      const skillLevels = Object.values(data.avatarInfoList[index].skillLevelMap)
      if (skillLevels.length === 4) {
        skillLevels.splice(0, 1)
      }

      let characterName = characterIds[e.avatarId]

      if (characterName === "Traveler") {
        characterName = travelerSkillSetIds[data.avatarInfoList[index].skillDepotId]
      }

      const weaponData = data.avatarInfoList[index].equipList.find(e => e.weapon)
      return {
        characterId: e.avatarId,
        characterName,
        level: e.level,
        ascension: parseInt(data.avatarInfoList[index].propMap["1002"].val ?? "0"),
        talentLevels: {
          normal: skillLevels[0],
          skill: skillLevels[1],
          burst: skillLevels[2],
        },
        weapon: weaponData
          ? {
              nameJP: loc[weaponData.flat.nameTextMapHash],
              level: weaponData.weapon!.level,
              ascension: weaponData.weapon!.promoteLevel ?? 0,
            }
          : undefined,
      }
    }),
  })
}
