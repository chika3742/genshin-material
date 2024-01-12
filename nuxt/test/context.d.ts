declare module "vitest" {
  import type {TestContext} from "~/test/utils/test-utils";

  interface ProvidedContext {
    myCtx: TestContext
  }
}

export {}
