import type {CapacitorConfig} from "@capacitor/cli"

const devConfig = {
  url: "http://192.168.0.61:3002",
  cleartext: true,
}

const config: CapacitorConfig = {
  appId: "net.chikach.genshinmaterial",
  appName: "genshin-material",
  webDir: "dist",
  server: {
    androidScheme: "https",
    // ...devConfig,
  },
}

export default config
