import {ErrorResponse} from "~/types/showcase"
import {ApiErrorCode} from "~/types/api-error-codes"

export function errorResponse(message: string, code: ApiErrorCode, status: number) {
  return jsonResponse({
    errorMessage: message,
    code,
  } as ErrorResponse, {
    status,
  })
}

export function jsonResponse(json: Record<string, any>, init?: ResponseInit) {
  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  })
}
