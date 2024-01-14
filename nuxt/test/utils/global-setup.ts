import type {GlobalSetupContext} from "vitest/node"
import {getRandomPort, waitForPort} from "get-port-please"
import {execa} from "execa"
import type {TestOptions} from "~/test/utils/test-utils"

export const createContext = (options: TestOptions) => {
  return {
    ...options,
  }
}

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
    void execa("npx", ["serve", "dist_web", "-l", webPort.toString()])
    await waitForPort(webPort, {retries: 20})

    nativePort = await getRandomPort()
    console.log(`Starting server on port ${nativePort}...`)
    void execa("npx", ["serve", "dist", "-l", nativePort.toString()])
    await waitForPort(nativePort, {retries: 20})
  }

  const ctx = createContext({
    webPort,
    nativePort,
  })

  provide("myCtx", ctx)
}
