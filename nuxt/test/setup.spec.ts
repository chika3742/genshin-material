import {beforeAll, describe, expect, it} from "vitest"
import {execa} from "execa"
import {getRandomPort, waitForPort} from "get-port-please"
import {createContext, createPage} from "~/test/test-utils"

const port = await getRandomPort()
beforeAll(async() => {
  console.log("Building...")
  await execa("npm", ["run", "generate"])
  console.log("Starting server...")
  void execa("npx", ["serve", "dist", "-l", port.toString()])
  await waitForPort(port, {retries: 20})

  createContext({
    port,
  })
}, 120 * 1e3)

describe("setup", () => {
  it("should be set up", async() => {
    const index = await createPage("/")

    expect(await index.waitForSelector(".v-application")).toBeTruthy()
  })
})
