import type {GlobalSetupContext} from "vitest/node"
import {getRandomPort, waitForPort} from "get-port-please"
import {execa} from "execa"
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
  if (process.env.VITEST_DEV === "true") {
    webPort = 3002
    nativePort = 3002
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
}
