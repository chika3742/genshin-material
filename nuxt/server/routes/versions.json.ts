import fs from "fs/promises"
import * as yaml from "yaml"
import type {ReleaseNotes} from "~/types/generated/release-notes.g"

export default defineEventHandler(async() => {
  return yaml.parse(await fs.readFile("./assets/data/release-notes.yaml", "utf-8")) as ReleaseNotes
})
