import {type Browser, chromium} from "playwright-core"
import {inject} from "vitest"

export interface TestOptions {
  webPort: number
  nativePort: number
}

export interface TestContext extends TestOptions {
  browser?: Browser
}

export const useContext = () => {
  const ctx = inject("myCtx")
  if (typeof ctx === "undefined") {
    throw new TypeError("No context")
  }
  return ctx as TestContext
}

export const getBrowser = async() => {
  const ctx = useContext()
  if (!ctx.browser) {
    ctx.browser = await chromium.launch()
  }
  return ctx.browser
}

export const closeBrowser = async() => {
  const ctx = useContext()
  if (ctx.browser) {
    await ctx.browser.close()
    ctx.browser = undefined
  }
}

export const createPage = async(path: string, native = false, options?: Parameters<Browser["newPage"]>[0]) => {
  const ctx = useContext()

  const browser = await getBrowser()
  const page = await browser.newPage(options)
  await page.goto(`http://localhost:${native ? ctx.nativePort : ctx.webPort}${path}`)
  return page
}
