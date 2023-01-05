import releaseNotes from "~/assets/data/release-notes.yaml"

export function hiraToKana(input: string): string {
  return input.replace(/[\u3041-\u3096]/g, function(match) {
    const chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  }).replace(/[\uFF41-\uFF5A]/g, "")
}

export const currentVersion = `${releaseNotes[0].funcVersion}_D${releaseNotes[0].dataVersion}`
