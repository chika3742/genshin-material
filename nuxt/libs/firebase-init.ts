import {FirebaseApp, getApps, initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getFunctions} from "firebase/functions"
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check"

const config = {
  apiKey: "AIzaSyCFtaRMzuKo67LrZs2UBUKBUZHai2pArFQ",
  authDomain: "chikach.net",
  projectId: "genshin-material",
  storageBucket: "genshin-material.appspot.com",
  messagingSenderId: "1018400803757",
  appId: "1:1018400803757:web:4143744be70153c7b76f24",
}

let firebaseApp: FirebaseApp

const apps = getApps()
if (apps.length === 0) {
  firebaseApp = initializeApp(config)
} else {
  firebaseApp = apps[0]
}

if (process.client) {
  if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider("6Ld24h4hAAAAAN-JYNNotD24f3W7TgsmaXOJUYcT"),
    isTokenAutoRefreshEnabled: true,
  })
}

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const functions = getFunctions(firebaseApp)

const fbApp = firebaseApp

export {auth, firestore, functions, fbApp}
