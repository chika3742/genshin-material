import releaseNotes from "~/assets/data/release-notes.yaml"

export function hiraToKana(input: string): string {
  return input.replace(/[\u3041-\u3096]/g, function(match) {
    const chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  }).replace(/[\uFF41-\uFF5A]/g, "")
}

export function getGachaProbability(type: "weapon" | "others", trials: number): number {
  const baseProbability = type === "weapon" ? 0.007 : 0.006
  const pseudoPityBorder = type === "weapon" ? 63 : 73
  if (!trials) { return 0 }
  if (trials <= pseudoPityBorder) { return 1 - Math.pow(1 - baseProbability, trials) } else {
    let prob = Math.pow(1 - baseProbability, pseudoPityBorder)
    for (let i = 1; i <= trials - pseudoPityBorder; i++) {
      prob *= 1 - (0.06 * i)
    }
    return 1 - prob
  }
}

const config = useRuntimeConfig()

export const currentVersion = `${releaseNotes[0].funcVersion}-build${config.public.ghRunNumber}_D${releaseNotes[0].dataVersion}`
