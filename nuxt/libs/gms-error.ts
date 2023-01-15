declare type GmsErrorCode = "schema-ver-mismatch" | "object-is-partial" | "not-signed-in"

export class GmsError extends Error {
  type = "GmsError"

  constructor(public code: GmsErrorCode, message: string) {
    super(message)
  }
}

export function isGmsError(e: any): e is GmsError {
  return e?.type === "GmsError"
}
