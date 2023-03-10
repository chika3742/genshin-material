import {EnkaNetworkResponse} from "~types/showcase"
import {errorResponse, jsonResponse} from "~utils/functions"
import loc from "~libs/data/loc.json"
import characterIds from "~libs/data/character-id-map.json"
import travelerSkillSetIds from "~libs/data/traveler-skill-set-id-map.json"

export const onRequest: PagesFunction = async(context) => {
  if (context.request.method !== "GET") {
    return errorResponse("Method not allowed", "failed_precondition", 405)
  }

  const requestUrl = new URL(context.request.url)

  if (!requestUrl.searchParams.has("uid")) {
    return errorResponse("Parameter 'uid' is required", "failed_precondition", 400)
  }

  const uid = requestUrl.searchParams.get("uid")

  if (!uid.match(/^\d{9,}$/)) {
    return errorResponse("Parameter 'uid' must be at least 9 digits", "failed_precondition", 400)
  }

  const result = await fetch(`https://enka.network/api/uid/${uid}`, {
    headers: {
      "User-Agent": "Genshin Material Data Sync/2.0.0 (gms.chikach.net)",
    },
  })
  const data = await result.json<EnkaNetworkResponse>()

  if (!data.playerInfo.showAvatarInfoList || !data.avatarInfoList ||
    data.playerInfo.showAvatarInfoList.length === 0) {
    return errorResponse(
      "Showcase character not found",
      "no_character_in_showcase",
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
