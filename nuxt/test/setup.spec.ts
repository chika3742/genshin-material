import {describe, expect, it} from "vitest"
import {createPage} from "~/test/utils/test-utils"

describe("setup", () => {
  it("should be set up", async() => {
    const index = await createPage("/")

    expect(await index.waitForSelector(".v-application")).toBeTruthy()

    await index.close()
  }, 10000)
})
