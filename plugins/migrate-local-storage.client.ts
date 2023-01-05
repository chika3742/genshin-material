import {camelCase} from "scule"

export default defineNuxtPlugin(() => {
  const keys = [
    "previous_version",
    "resin_base_time",
    "resin_count",
    "gacha_auth_key",
    "character_status",
    "uid",
    "auto_import",
  ]
  const newData = JSON.parse(localStorage.getItem("config") ?? "{}")

  for (const key of keys) {
    const item = localStorage.getItem(`gm:${key}`)
    if (item) {
      newData[camelCase(key)] = item
    }
  }

  localStorage.setItem("config", JSON.stringify(newData))

  for (const key of keys) {
    localStorage.removeItem(`gm:${key}`)
  }
})
