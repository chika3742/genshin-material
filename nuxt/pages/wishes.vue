<template>
  <PageContainer class="doc-container">
    <section v-if="showHelp">
      <h2>祈願天井カウンターとは</h2>
      <p>本ツールでは、天井カウント、最後に排出されたレアアイテム、星5が排出される確率(試行回数ベース)を表示します。</p>
      <p>そのために、下で説明する方法で取得したURLが必要になります。</p>

      <h2>注意事項</h2>
      <ul>
        <li>反映に1時間程度のラグがあります。</li>
        <li>ログイン中の場合、ガチャ履歴は同期されますが、URLは同期されません。</li>
        <li>確率の計算には、疑似天井(74回目以降の確率上昇)が加味されています。</li>
        <li>本ツールは中国大陸サーバーのゲームデータには対応していません。</li>
      </ul>

      <h2>安全性について</h2>
      <p>このURLには祈願履歴の取得だけができる認証キーが付帯していますが、これを利用して原神にログインしたり、メールアドレス等の個人情報にアクセスしたりすることは仕組み上不可能です。ご安心ください。</p>
      <p>また、この認証キーはサーバーで祈願履歴取得処理後すぐにメモリから削除され、アクセスログにもキーが残らないようになっています。</p>
      <p>バイパス用APIとして、Cloudflare Workersを利用しています。</p>

      <h2>URL取得方法</h2>
      <p>本ツールを利用するには、以下の方法で入手したURLを下の欄に貼り付け、「祈願を取得」をクリックします。</p>
      <p class="text-red font-weight-bold">
        ※現在、AndroidにはURLを入手する方法が存在しません。
      </p>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>Windows</v-expansion-panel-title>
          <v-expansion-panel-text>
            <ol>
              <li>WindowsキーとRキーを同時に押します。</li>
              <li>
                表示された「ファイル名を指定して実行」に、以下の文字列を貼り付け、Enterを押します。
                <div class="d-flex align-center mt-2">
                  <pre ref="windowsCommand">
                    powershell -Command "iex ""&{$(irm https://gist.githubusercontent.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235/raw/702e34117b07294e6959928963b76cfdafdd94f3/getlink.ps1)} global"""
                  </pre>
                  <v-btn class="ml-2" icon size="small" variant="text" @click="copyWindowsCommand">
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </div>
              </li>
              <li>何も表示されませんが、しばらく待つとURLがコピーされるためそれを本ページに貼り付けます。</li>
            </ol>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>iOS/iPadOS</v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>iOSでは外部アプリを用いて、原神アプリがサーバーと行う通信を監視してURLを取得します。</p>
            <ol>
              <li>App Storeより<a href="https://apps.apple.com/app/stream/id1312141691" target="_blank">Stream</a>アプリをインストールします。 </li>
              <li>アプリを起動し、「Sniff Now」をタップし、「"Stream"がVPN構成の追加を求めています」というダイアログが表示されたら「許可」をタップします。(パスコードの入力が要求されるので、入力します。)</li>
              <li>Streamアプリに戻ると「You must install CA」という内容のダイアログが表示されるので、「Install CA」をタップし、「Install CA Certificate」をタップします。</li>
              <li>「このWebサイトは構成プロファイルを・・・」と表示されるので、「許可」をタップします。</li>
              <li>本体設定を開き、一般 ＞ VPNとデバイス管理 ＞ Stream Generated CA 〜 ＞ 右上の「インストール」＞ パスコード入力 ＞ 右上の「インストール」 ＞ インストール の順にタップします。</li>
              <li>アプリに戻ると「For iOS 10.3+ and iOS 11 〜」と表示されますが、青の「I've trusted」をタップします。</li>
              <li><span class="font-weight-bold">＜2回目以降はここからの手順のみで構いません＞</span>原神を起動し、「祈願」をタップします。</li>
              <li>Streamアプリを開き、「Sniff Now」をタップします。</li>
              <li>原神に戻り、「祈願履歴」をタップします。</li>
              <li>Streamアプリに戻り、「Stop Sniffing」をタップし、右の「Sniff History」をタップします。</li>
              <li>
                「Sniff Now」をタップした時刻のものを選択(一番上が最新)し、検索アイコンをタップして以下の文字列をコピペし、右上の「Search」をタップします。
                <pre>hk4e-api-os.hoyoverse.com</pre>
              </li>
              <li>表示されたものをタップし、「Request」タブを開き、「REQUEST LINE」の下の部分をタップし、「Copy Url」をタップします。これを本ページに貼り付けます。</li>
            </ol>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>

    <div v-else>
      <v-btn color="blue-darken-2" @click="showHelp = true">
        初めての方はこちら
      </v-btn>
    </div>

    <section class="mt-4">
      <h2>URL入力</h2>
      <v-text-field v-model="url" :disabled="loading" :error-messages="error" clearable label="URL" />
      <v-row class="mt-4" no-gutters>
        <v-btn :loading="loading" color="primary" @click="fetchWishes">
          祈願を取得
        </v-btn>
        <v-btn :disabled="loading" class="ml-4" variant="text" @click="clearDialog = true">
          データをクリア
        </v-btn>
      </v-row>
      <p v-if="loading" class="mt-4 font-weight-bold text-orange">
        祈願履歴を取得しています。ブラウザーを閉じないでください。(別のページに移動しても構いません)
      </p>
    </section>

    <div class="mt-4">
      <section>
        <h2>イベント祈願・キャラクター</h2>
        <WishCounters :probability-count="10" wish-type="301" />
      </section>

      <section>
        <h2>イベント祈願・武器</h2>
        <WishCounters :probability-count="10" wish-type="302" />
      </section>

      <section>
        <h2>通常祈願・奔走世間</h2>
        <WishCounters :probability-count="10" wish-type="200" />
      </section>
    </div>

    <v-dialog v-model="clearDialog" max-width="400px">
      <v-card>
        <v-card-title>データクリア</v-card-title>
        <v-card-text>祈願履歴をクリアしますか？天井カウントが狂った際に改善する場合があります。</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="clearDialog = false">
            キャンセル
          </v-btn>
          <v-btn variant="text" @click="clearDialog = false; wishesStore.clear()">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </PageContainer>
</template>

<script lang="ts" setup>
import {FetchError} from "ofetch"
import {GachaLogEntry} from "../../shared-types/gacha-log-entry"
import {ErrorResponse} from "~/types/showcase"
import {useFetch} from "#imports"
import {useWishesStore} from "~/stores/wishes.store"
import {useConfigStore} from "~/stores/config.store"

definePageMeta({
  title: "wishes",
  keepalive: true,
})

const snackbar = useSnackbar()
const config = useRuntimeConfig()
const wishesStore = useWishesStore()
const configStore = useConfigStore()

const showHelp = ref(false)
const loading = ref(false)
const clearDialog = ref(false)
const error = ref("")
const url = ref(configStore.gachaUrl)
const windowsCommand = ref<HTMLElement>()

const copyWindowsCommand = () => {
  if (windowsCommand.value?.textContent) {
    navigator.clipboard.writeText(windowsCommand.value.textContent.trim())
    snackbar.show("コピーしました")
  }
}

const fetchWishes = async() => {
  // 空欄の場合
  if (url.value === "") {
    error.value = "URLを入力してください"
    return
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(url.value)
  } catch (e) {
    // URLの形式が正しくない
    error.value = "正しいURLを入力してください"
    return
  }

  // 必要なパラメーターが存在しない
  if (!parsedUrl.searchParams.has("authkey") || !parsedUrl.searchParams.has("region")) {
    error.value = "正しいURLを入力してください"
  }

  error.value = ""

  loading.value = true

  const requestUrl = new URL("/api/gacha-log", config.public.apiBaseUrl ?? location.href)
  requestUrl.searchParams.set("auth_key", parsedUrl.searchParams.get("authkey")!)
  requestUrl.searchParams.set("region", parsedUrl.searchParams.get("region")!)

  for (const gachaType of ["301", "200", "302"]) {
    const lastId = wishesStore.wishes.slice().reverse().find(e => e.gachaType === gachaType)?.id
    if (lastId) {
      requestUrl.searchParams.set(`lastId${gachaType}`, lastId)
    }
  }

  const result = await useFetch<GachaLogEntry[], FetchError<ErrorResponse>>(requestUrl.toString())

  if (result.data.value) {
    configStore.gachaUrl = url.value

    if (result.data.value.length === 0) {
      snackbar.show("新しい祈願がありません。反映に1時間ほどかかる場合があります。")
    } else {
      snackbar.show("祈願履歴の取得が完了しました。")
      await wishesStore.appendAll(result.data.value)
    }
  } else if (result.error.value) {
    switch (result.error.value?.data?.code) {
      case "invalid_authkey":
        error.value = "URLが正しくありません"
        break
      case "authkey_timeout":
        error.value = "URLの有効期限が切れています。再度取得して貼り付けてください。"
        break
      case "too_many_requests":
        error.value = "リクエストが多過ぎます。しばらく待ってから再度お試しください。"
        break
      default:
        snackbar.show("エラーが発生しました")
    }
  }

  loading.value = false
}

onMounted(() => {
  wishesStore.fetchFromIdb()
})

</script>
