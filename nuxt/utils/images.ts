import {GenshinElement} from "~/types/enums"

const baseUrl = "https://uploads.gmnext.chikach.net"

export const getCharacterImage = (characterId: string, variant: "full" | "small") => {
  if (variant === "full") {
    return new URL(`assets/character/${characterId}.webp`, baseUrl).toString()
  } else {
    return new URL(`assets/character/${characterId}_small.webp`, baseUrl).toString()
  }
}

export const getElementImage = (element: GenshinElement) => {
  return new URL(`assets/element/${element}.webp`, baseUrl).toString()
}
