import type {CapacitorConfig} from "@capacitor/cli"

const devConfig = {
  url: process.env.CAP_DEBUG_SERVER_URL,
  cleartext: true,
}

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("Running in development mode")
}

const config: CapacitorConfig = {
  appId: "net.chikach.genshinmaterial",
  appName: "genshin-material",
  webDir: "dist_native",
  server: {
    androidScheme: "https",
    ...process.env.NODE_ENV === "development" ? devConfig : {},
  },
}

export default config
