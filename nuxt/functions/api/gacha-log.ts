import {errorResponse, jsonResponse} from "~utils/functions"
import {GachaLogEntry} from "~types/gacha-log"
import {GachaLogRequest} from "~functions/lib/gacha-log-request"

export const onRequest: PagesFunction = async(context) => {
  if (context.request.method !== "GET") {
    return errorResponse("Method not allowed", "failed_precondition", 405)
  }

  const {searchParams} = new URL(context.request.url)

  if (!searchParams.has("auth_key") || !searchParams.has("region")) {
    return errorResponse("Insufficient parameters", "failed_precondition", 400)
  }

  const result: GachaLogEntry[] = []
  const gachaTypes = [200, 301, 302]
  const request = new GachaLogRequest(searchParams.get("auth_key"), searchParams.get("region"))

  for (const wishType of gachaTypes) {
    const wishTypeResult = await request.getGachaLogForWishType(wishType.toString(), searchParams.get(`lastId${wishType}`))

    // エラーが返された場合
    if (wishTypeResult instanceof Response) {
      return wishTypeResult
    }

    result.push(...wishTypeResult)
  }

  return jsonResponse(result)
}
