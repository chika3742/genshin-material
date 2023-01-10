import {GachaLogEntry} from "~/types/gacha-log"
import {errorResponse} from "~/utils/functions"
import {sleep} from "~utils/sleep"

export class GachaLogRequest {
  constructor(
    private readonly authKey: string,
    private readonly region: string,
  ) {}

  async getGachaLogForWishType(wishType: string, lastId: string | null): Promise<GachaLogEntry[] | Response> {
    const result: GachaLogEntry[] = []
    let endLoop = false
    let lastIdTemp: string | null = null

    while (!endLoop) {
      const listOrResponse: GachaLogEntry[] | Response = await this.sendGachaLogRequest(wishType, lastIdTemp)

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

      await sleep(250)
    }

    return result.reverse()
  }

  private async sendGachaLogRequest(wishType: string, lastId?: string): Promise<GachaLogEntry[] | Response> {
    const url = new URL("https://hk4e-api-os.mihoyo.com/event/gacha_info/api/getGachaLog?authkey_ver=1&lang=ja&game_biz=hk4e_global&size=20")

    url.searchParams.set("authkey", this.authKey)
    url.searchParams.set("region", this.region)
    url.searchParams.set("gacha_type", wishType)
    if (lastId) {
      url.searchParams.set("end_id", lastId)
    }

    const result = await fetch(new Request(url))

    const data = await result.json<{
      retcode: number
      message: string
      data: {
        list: any[]
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
            "too_many_requests",
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

    return data.data.list.map(e => ({
      id: e.id,
      name: e.name,
      rankType: e.rank_type,
      itemType: e.item_type,
      gachaType: e.gacha_type,
      time: e.time,
    }))
  }
}
