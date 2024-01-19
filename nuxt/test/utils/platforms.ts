import {test} from "vitest"
import {useContext} from "./test-utils"

const ctx = useContext()

export const testNative = test.skipIf(typeof ctx.devNativeUi === "undefined" || !ctx.devNativeUi)

export const testWeb = test.skipIf(typeof ctx.devNativeUi === "undefined" || ctx.devNativeUi)
