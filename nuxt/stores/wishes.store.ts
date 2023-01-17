import {GachaLogEntry} from "../../shared-types/gacha-log-entry"
import {db} from "~/dexie/db"
import {auth} from "~/libs/firebase-init"

export const useWishesStore = defineStore("wishes", {
  state() {
    return {
      wishes: [] as GachaLogEntry[],
    }
  },
  actions: {
    fetchFromIdb() {
      return db.gachaLogs.toArray().then((result) => {
        this.wishes = result
        return result
      }).catch((e) => {
        console.error(e)
        throw e
      })
    },
    async appendAll(entries: GachaLogEntry[]) {
      this.wishes.push(...toRaw(entries))
      await db.gachaLogs.bulkAdd(toRaw(entries))
      if (auth.currentUser) {
        // await new GachaLogProvider(auth.currentUser).append(toRaw(entries))
      }
    },
    async clear() {
      this.wishes.splice(0)
      await db.gachaLogs.clear()
      if (auth.currentUser) {
        // await new GachaLogProvider(auth.currentUser).clear()
      }
    },
  },
})
