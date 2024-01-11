import {type Browser, chromium} from "playwright-core"

interface TestOptions {
  port: number
}

interface TestContext extends TestOptions {
  browser?: Browser
}

let currentContext: TestContext | null = null

export const createContext = (options: TestOptions) => {
  currentContext = {
    ...options,
  }
}

export const useContext = () => {
  if (!currentContext) {
    throw new Error("No context")
  }
  return currentContext
}

export const getBrowser = async() => {
  const ctx = useContext()
  if (!ctx.browser) {
    ctx.browser = await chromium.launch()
  }
  return ctx.browser
}

export const createPage = async(path: string, options?: Parameters<Browser["newPage"]>[0]) => {
  const browser = await getBrowser()
  const page = await browser.newPage(options)
  await page.goto(`http://localhost:${useContext().port}${path}`)
  return page
}
