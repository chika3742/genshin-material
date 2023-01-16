export interface GachaLogEntry {
  id: string
  gachaType: string
  time: string
  name: string
  itemType: "キャラクター" | "武器"
  rankType: string
}