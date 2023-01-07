import * as admin from "firebase-admin"

admin.initializeApp()

export * from "./funcs/on-user-delete"
export * from "./funcs/send-notifications"
