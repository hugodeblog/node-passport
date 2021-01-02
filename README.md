# Node.jsでPassportを使ったサンプル

PassportはNode.jsで利用できる認証のためのミドルウェアだ。

http://www.passportjs.org/ - Passport

> Passport is authentication middleware for Node.js.
> Extremely flexible and modular, Passport can be unobtrusively dropped in
> to any Express-based web application. A comprehensive set of strategies
> support authentication using a username and password, Facebook, Twitter, and more.

Passportに加えて、セッション情報を使えば、ユーザーがログインしている状態とログインしていない状態でページの表示を切り替えることが可能。  

例えば、掲示板の投稿内容はログインしていないと見れないようなサイトの構築などで利用できる。  

今回はPassportを使ったログイン処理の簡単なサンプルを実装してみることで、Passportの使い方を見てみる。

## 使用する主なモジュールなど

* express 
* passport
* express-session

etc...

## 主なファイル構成

```txt
./
├── app.mjs （プログラム本体）
├── approotdir.mjs
├── appsupport.mjs
├── package.json
├── routes
│   ├── index.mjs （トップページ）
│   └── users.mjs （ログイン、サインアップ）
└── views
|   ├── error.hbs
|   ├── index.hbs
|   ├── layout.hbs
|   ├── login-failure.hbs （ログイン失敗時）
|   ├── login.hbs （ログインフォーム入力）
|   ├── signup-failure.hbs （サインアップ失敗時）
|   ├── signup-success.hbs （サインアップ成功時）
|   └── signup.hbs （サインアップフォーム入力）
|
```

## アプリの実行方法

```
$ npm run start

> node-passport@0.0.0 start
> node ./app.mjs

Listening on port 3000
```

3000番ポートで待ち受けする。

* トップページ
  * http://localhost:3000
* ログインフォーム  
  * http://localhost:3000/users/login  
* サインアップフォーム
  * http://localhost:3000/uesrs/signup