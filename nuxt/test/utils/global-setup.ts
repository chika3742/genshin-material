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
  let port: number
  if (process.env.VITEST_DEV === "true") {
    port = 3002
  } else {
    port = await getRandomPort()

    console.log("Building...")
    await execa("npm", ["run", "generate"])
    console.log(`Starting server on port ${port}...`)
    void execa("npx", ["serve", "dist", "-l", port.toString()])
    await waitForPort(port, {retries: 20})
  }

  const ctx = createContext({
    port,
  })

  provide("myCtx", ctx)
}
