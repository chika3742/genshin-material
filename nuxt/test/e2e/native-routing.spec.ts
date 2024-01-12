import {afterAll, describe, test} from "vitest"
import {createPage} from "~/test/utils/test-utils"

describe("Native routing", async() => {
  const page = await createPage("/?force_native=true")

  test("navigates to the default path when switching tab", async() => {
    await page.click(".v-bottom-navigation .v-btn:nth-of-type(2)")
    await page.waitForURL(() => new URL(page.url()).pathname === "/database")
  })

  test("goes to the first page when switching to the first tab after navigating to another page", async() => {
    await page.click(".v-container .v-list-item:nth-of-type(1)")
    await page.waitForURL(() => new URL(page.url()).pathname === "/characters")
    await page.click(".v-bottom-navigation .v-btn:nth-of-type(1)")
    await page.waitForURL(() => new URL(page.url()).pathname === "/bookmarks")
  })

  test("restores the route when switching to the second tab", async() => {
    await page.click(".v-bottom-navigation .v-btn:nth-of-type(2)")
    await page.waitForURL(() => new URL(page.url()).pathname === "/characters")
  })

  test("backs with the back button", async() => {
    await page.click(".gm-navigate-back")
    await page.waitForURL(() => new URL(page.url()).pathname === "/database")
  })

  afterAll(async() => {
    await page.close()
  })
})
