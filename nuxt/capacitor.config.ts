import type {CapacitorConfig} from "@capacitor/cli"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const devConfig = {
  url: "http://192.168.0.61:3002",
  cleartext: true,
}

const config: CapacitorConfig = {
  appId: "net.chikach.genshinmaterial",
  appName: "genshin-material",
  webDir: "dist_native",
  server: {
    androidScheme: "https",
    // ...devConfig,
  },
}

export default config