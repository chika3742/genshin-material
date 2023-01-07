import path from "path"
import {GenshinElement} from "~/types/common"

const baseUrl = "https://gms-r2-assets.chikach.net/assets"

export const getCharacterImage = (characterId: string, variant: "full" | "small") => {
  if (variant === "full") {
    return path.join(baseUrl, `character/${characterId}.webp`)
  } else {
    return path.join(baseUrl, `character/${characterId}_small.webp`)
  }
}

export const getElementImage = (element: GenshinElement) => {
  return path.join(baseUrl, `element/${element}.webp`)
}
