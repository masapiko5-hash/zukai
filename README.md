# zukai

Claude の `show_widget` に、短いデータから図を描く JavaScript 部品です。

```html
<div id="z"></div>
<script src="https://cdn.jsdelivr.net/gh/masapiko5-hash/zukai@v1.0.0/zukai.js"></script>
<script>
  zukai('#z', {
    type: 'compare',
    eye: '喫茶店の候補',
    title: 'ゆっくり話すなら案 B',
    cards: [
      {name: '案 A', rows: [['席', 'カウンターのみ', 'warn']]},
      {name: '案 B', pick: true, tag: 'おすすめ', rows: [['席', 'テーブルあり', 'ok']]}
    ],
    cap: ['案 B は向かい合って座れる', '一人で立ち寄るなら案 A も使いやすい。']
  })
</script>
```

`zukai(target, spec)` の描画先は CSS セレクタか要素です。同じ描画先を指定すると中身を入れ替えます。公開関数は `window.zukai`、版は `zukai.version`（`1.0.0`）です。

## 共通の項目

- `type` は図の型です。`eye` は小見出し、`title` は結論です。
- `cap: [太字の1行, 補足の1〜2行]` は図の下の説明です。各操作に `cap` があると、その説明に切り替わります。
- `summary` は読み上げ用の要約です。省くと題を使います。
- `static: true` は PNG 用です。全項目を表示し、手順の補足は各段の下に出します。`whatif` は指定した初期値で計算した結果を表示します。

## 6つの型

`?` は省ける項目です。各見本は手元のブラウザで開けます。

| 型 | 項目 |
| --- | --- |
| [numbers](examples/numbers.html) | `kpis: [{label, value, note?, tone?}]`、`bars: [{label, sub?, value, text?, tone?, tag?, group?}]`、`chips: [{key, label, cap?}]`。選んだチップと同じ `group` の棒を強調します。「全部」は自動で付き、`key: 'all'` の項目でその説明を指定できます。 |
| [compare](examples/compare.html) | `cards: [{name, icon?, tag?, pick?, rows: [[項目, 値, mark?]]}]`。`pick: true` でカードを強調します。 |
| [flow](examples/flow.html) | `steps: [{icon, label, sub?, cap?}]`。最初の手順から始まり、手順を直接選ぶか「前へ」「次へ」で移動できます。 |
| [layers](examples/layers.html) | `layers: [{key?, name, sub?, items: [文字 または {text, mark?}], hot?, dashed?, cap?}]`、`legend: [[mark, 文字]]`。 |
| [lanes](examples/lanes.html) | `lanes: [{key?, name, sub?, icon?, hot?, items: [文字 または [icon, 文字]], cap?}]`。 |
| [whatif](examples/whatif.html) | `sliders: [{key, label, min, max, step, value, unit?}]`、`calc: (v) => ({title?, bars: [{label, value, text?, tone?}], cap?})`。`v[key]` に現在値が数値で入ります。 |

- `layers` と `lanes` は `key` がある項目からチップを作ります。`hot: true` で枠を強調します。
- 棒の `value` は数値です。正の最大値を基準に伸び、0 以下の長さは 0 です。`text` を渡すと棒の端に単位付きの値などを出せます。`tone` は `danger` または `accent` です。
- `mark` は `ok`、`warn`、`ng`、`q`、`lock` です。`icon` には Tabler Icons の名前（例 `clock`）を指定します。アイコンフォントと暗い画面用の色変数は表示側で用意します。

図ごとに書くのはデータだけです。公開するのは部品と一般的な見本で、渡したデータは表示するページ内で使います。部品はデータを外部へ送信しません。
