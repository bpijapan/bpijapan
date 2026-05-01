# BPI JAPAN Website + Cal.com Booking

GitHub Pagesでそのまま公開できる、BPI JAPAN向けの静的ホームページです。  
今回の版では、Cal.comを使った予約専用ページ `booking.html` を追加しています。

## ファイル構成

```text
bpi-japan-cal-booking-site/
├── index.html
├── booking.html
├── booking-config.js
├── booking.js
├── styles.css
├── script.js
├── assets/
│   ├── favicon.svg
│   └── og-image.svg
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## 公開方法：GitHub Pages

1. GitHubで新しいリポジトリを作成します。
2. このフォルダの中身をリポジトリ直下にアップロードします。
3. GitHubの `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` を `Deploy from a branch` にします。
5. `Branch` を `main`、フォルダを `/root` にして保存します。
6. 数分後に表示されるURLへアクセスすると公開されます。

## 予約メニュー

今回の設定は以下の2メニューです。

- BPI 90分コース：`https://cal.com/bpi-japan/bpijapan-lesson`
- コース相談：`https://cal.com/bpi-japan/bpijapan-consultation`

無料カウンセリングはInstagram DM受付にしています。

## Cal.com設定

`booking-config.js` はすでに下記の内容で設定済みです。

```js
username: "bpi-japan"
lesson.slug: "bpijapan-lesson"
course.slug: "bpijapan-consultation"
```

Cal.com側でイベントURLを変更した場合は、`booking-config.js` の `slug` を変更してください。

## Instagramリンクの差し替え

公開前に、以下の仮URLを実際のInstagram URLへ置き換えてください。

```txt
https://www.instagram.com/bpi_japan/
```

置き換えるファイル：

- `index.html`
- `booking.html`
- `booking-config.js`

## 差し替えると良いもの

- トレーナー写真：`assets/` に写真を入れて、`trainer-photo placeholder` 部分を `<img>` に変更
- `sitemap.xml` のURL：独自ドメインまたはGitHub PagesのURLに変更
- `og-image.svg`：SNSでシェアされた時の画像。Canvaなどで作った画像に差し替えてもOK

## 写真を入れる場合の例

```html
<div class="trainer-photo">
  <img src="assets/tsuyoshi.jpg" alt="Tsuyoshi Takimura">
</div>
```

その場合、CSSに以下を追加するときれいに表示されます。

```css
.trainer-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
```
