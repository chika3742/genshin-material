import fs from "fs"
import {compile} from "json-schema-to-typescript"
import {parse} from "yaml"
import {pascalCase} from "scule"

export const generateSchemas = async() => {
  const files = fs.readdirSync("./schemas")
  for (const fileName of files) {
    const name = pascalCase(fileName.split(".")[0])
    const result = await compile(parse(fs.readFileSync(`./schemas/${fileName}`).toString()), name, {
      bannerComment: "/* eslint-disable */\n/* This file was generated. DO NOT edit by hand. */",
    })
    fs.mkdirSync("./models/generated", {recursive: true})
    fs.writeFileSync(`./models/generated/${fileName.split(".")[0]}.g.ts`, result)
  }
}
