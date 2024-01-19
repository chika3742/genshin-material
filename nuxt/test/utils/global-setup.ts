import type {GlobalSetupContext} from "vitest/node"
import {getRandomPort, waitForPort} from "get-port-please"
import {execa} from "execa"
import {chromium} from "playwright-core"
import type {TestContext, TestOptions} from "~/test/utils/test-utils"

export const createContext = (options: TestOptions): TestContext => {
  return {
    ...options,
  }
}

let currentContext: TestContext

export const setup = async({provide}: GlobalSetupContext) => {
  let webPort: number
  let nativePort: number
  let devNativeUi: boolean | undefined
  if (process.env.VITEST_DEV === "true") {
    webPort = 3002
    nativePort = 3002

    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${webPort}`)
    devNativeUi = await page.evaluate("__NUXT__.config.public.nativeUi")
    await page.close()
    await browser.close()
  } else {
    console.log("Building...(1/2)")
    await execa("npm", ["run", "generate"])
    console.log("Building...(2/2)")
    await execa("npm", ["run", "generate:native"])

    webPort = await getRandomPort()
    console.log(`Starting server on port ${webPort}...`)
    void execa("npx", ["serve", "dist", "-l", webPort.toString()])
    await waitForPort(webPort, {retries: 20})

    nativePort = await getRandomPort()
    console.log(`Starting server on port ${nativePort}...`)
    void execa("npx", ["serve", "dist_native", "-l", nativePort.toString()])
    await waitForPort(nativePort, {retries: 20})
  }

  const ctx = createContext({
    webPort,
    nativePort,
    devNativeUi,
  })

  provide("myCtx", ctx)
  currentContext = ctx
}

export const teardown = async() => {
  if (process.env.VITEST_DEV !== "true") {
    const pids = await execa("lsof", [
      `-ti:${currentContext.webPort},${currentContext.nativePort}`,
    ])
    await execa("kill", pids.stdout.split("\n"))
  }

  await currentContext.browser?.close()
  currentContext.browser = undefined
}
