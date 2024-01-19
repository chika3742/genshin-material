import {describe, it} from "vitest"
import {createPage, waitForMounted} from "~/test/utils/test-utils"

describe("setup", () => {
  it("should be set up", async() => {
    {
      const index = await createPage("/", false)
      await waitForMounted(index)
      await index.close()
    }
    {
      const index = await createPage("/bookmarks", true)
      await waitForMounted(index)
      await index.close()
    }
  }, 40000)
})
