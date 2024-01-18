import fs from "fs/promises"
import * as yaml from "yaml"
import type {ReleaseNotes} from "~/types/generated/release-notes.g"

export const syncAppVersion = async() => {
  const iosAppVersionConfigPath = "./ios/App/Configs/Generated.xcconfig"
  const androidAppVersionConfigPath = "./android/generated.properties"

  const version = await getCurrentVersion()

  const iosConfigString = `GM_VERSION_NAME=${version}\nGM_VERSION_NUMBER=${process.env.APP_VERSION_NUMBER}\n`
  const androidConfigString = `gm.versionName=${version}\ngm.versionNumber=${process.env.APP_VERSION_NUMBER}\n`

  await fs.writeFile(iosAppVersionConfigPath, iosConfigString)
  await fs.writeFile(androidAppVersionConfigPath, androidConfigString)
}

const getCurrentVersion = async() => {
  const releaseNotes = yaml.parse(
    await fs.readFile("./assets/data/release-notes.yaml", "utf-8"),
  ) as ReleaseNotes

  return releaseNotes[0].funcVersion
}
