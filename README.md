# 画像アップロード＆分析 Webアプリ サンプル

## 構成
- バックエンド: FastAPI (Python)
- フロントエンド: React

## セットアップ手順

### バックエンド
1. 必要なパッケージをインストール
   ```sh
   cd backend
   pip install -r requirements.txt
   ```
2. サーバー起動
   ```sh
   uvicorn main:app --reload
   ```

### フロントエンド
1. 必要なパッケージをインストール
   ```sh
   cd frontend
   npm install
   ```
2. サーバー起動
   ```sh
   npm start
   ```

### 使い方
- フロントエンド（React）で画像を選択し「アップロードして分析」ボタンを押すと、FastAPIサーバーに画像が送信され、画像サイズやフォーマットが表示されます。

---

※ CORS設定済みなので、ローカルでそのまま動作します。
