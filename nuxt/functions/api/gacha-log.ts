import {errorResponse, jsonResponse} from "~utils/functions"
import {GachaLogEntry} from "~types/gacha-log"
import {sleep} from "~utils/sleep"

export const onRequest: PagesFunction = async(context) => {
  if (context.request.method !== "GET") {
    return errorResponse("Method not allowed", "failed_precondition", 405)
  }

  const {searchParams} = new URL(context.request.url)

  if (!searchParams.has("auth_key")) {
    return errorResponse("Parameter 'auth_key' is required", "failed_precondition", 400)
  }

  const result: GachaLogEntry[] = []
  const gachaTypes = [200, 301, 302]

  for (const wishType of gachaTypes) {
    const result = await getGachaLog(searchParams.get("auth_key")!, wishType.toString(), searchParams.get(`lastId${wishType}`))

    // エラーが返された場合
    if (result instanceof Response) {
      return result
    }

    result.push(...result)
  }

  return jsonResponse(result)
}

async function sendGachaLogRequest(authKey: string, wishType: string, lastId?: string): Promise<GachaLogEntry[] | Response> {
  const url = new URL("https://hk4e-api-os.mihoyo.com/event/gacha_info/api/getGachaLog?authkey_ver=1&lang=ja&game_biz=hk4e_global&size=20")

  url.searchParams.set("authkey", authKey)
  url.searchParams.set("region", "os_asia")
  url.searchParams.set("gacha_type", wishType)
  if (lastId) {
    url.searchParams.set("end_id", lastId)
  }

  const result = await fetch(new Request(url))

  const data = await result.json<{
    retcode: number
    message: string
    data: {
      list: GachaLogEntry[]
    }
  }>()

  if (data.retcode !== 0) {
    switch (data.retcode) {
      case -101:
        // 認証キータイムアウト
        return errorResponse(
          "Authentication key timeout",
          "authkey_timeout",
          401,
        )

      case -100:
        // 認証キー不正
        return errorResponse(
          "Invalid authentication key",
          "invalid_authkey",
          401,
        )

      case -110:
        // 頻繁なリクエスト
        return errorResponse(
          "Too many requests",
          "authkey_timeout",
          429,
        )

      default:
        // 不明

        // miHoYo APIのレスポンスをログ出力
        console.error("Error: miHoYo API returned non-zero retcode")
        console.error(data)

        return errorResponse(
          "Unknown error",
          "unknown",
          500,
        )
    }
  }
}

async function getGachaLog(authKey: string, wishType: string, lastId: string | null): Promise<GachaLogEntry[] | Response> {
  const result: GachaLogEntry[] = []
  let endLoop = false
  let lastIdTemp: string | null = null

  while (!endLoop) {
    const listOrResponse: GachaLogEntry[] | Response = await sendGachaLogRequest(authKey, wishType, lastIdTemp)

    // エラーが返された場合
    if (listOrResponse instanceof Response) {
      return listOrResponse
    }

    const list = listOrResponse

    if (list.length === 0) {
      break
    }

    for (const item of list) {
      if (!lastId && result.some(e => e.rankType === "5") && result.some(e => e.rankType === "4")) {
        endLoop = true
        break
      }
      if (lastId && item.id === lastId) {
        endLoop = true
        break
      }
      result.push(item)
    }

    lastIdTemp = list.splice(-1)[0].id

    await sleep(200)
  }

  return result.reverse()
}
