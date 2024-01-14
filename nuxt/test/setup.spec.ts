import {describe, it} from "vitest"
import {createPage} from "~/test/utils/test-utils"

describe("setup", () => {
  it("should be set up", async() => {
    {
      const index = await createPage("/")
      await index.waitForSelector(".v-application")
      await index.close()
    }
    {
      const index = await createPage("/", true)
      await index.waitForSelector(".v-application")
      await index.close()
    }
  }, 10000)
})
