import {afterAll, beforeAll, describe, expect} from "vitest"
import type {Page} from "playwright-core"
import {createPage, waitForMounted} from "~/test/utils/test-utils"
import {testNative, testWeb} from "~/test/utils/platforms"

describe("Page title", () => {
  describe("Web", () => {
    let page: Page

    beforeAll(async() => {
      page = await createPage("/", false, {locale: "ja"})
      await waitForMounted(page)
    })

    testWeb("title is shown properly on the top page", async() => {
      await waitForMounted(page)
      expect(await page.title()).toBe("ホーム - 原神素材ノート")
      expect(await (await page.$(".v-toolbar-title__placeholder"))?.textContent()).toBe("ホーム")
    })

    afterAll(async() => {
      await page.close()
    })
  })

  describe("Native", () => {
    let page: Page

    beforeAll(async() => {
      page = await createPage("/bookmarks", true, {locale: "ja"})
      await waitForMounted(page)
    })

    testNative("title is shown properly on the bookmark page", async() => {
      expect(await (await page.$(".v-toolbar-title__placeholder"))?.textContent()).toBe("ブックマーク")
    })

    testNative("title is shown properly on the database page", async() => {
      await page.click(".v-bottom-navigation .v-btn:nth-of-type(2)")
      expect(await (await page.$(".v-toolbar-title__placeholder"))?.textContent()).toBe("データベース")
    })

    afterAll(async() => {
      await page.close()
    })
  })
})
