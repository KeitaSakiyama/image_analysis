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

Tesseract の注意:
- OCR を使うにはシステムに Tesseract OCR エンジンがインストールされている必要があります。
- macOS (Homebrew): `brew install tesseract`
- Ubuntu: `sudo apt install tesseract-ocr`
- Windows: https://github.com/tesseract-ocr/tesseract/wiki/Downloads からインストーラを入手

日本語 OCR を使う場合:
- Homebrew (macOS): `brew install tesseract-lang` または個別に tessdata を置く（例: `brew install tesseract-lang` が利用可能でない場合は以下手順）
- 手動インストール例:
   1. tessdata をダウンロード: `wget https://github.com/tesseract-ocr/tessdata/raw/main/jpn.traineddata`
   2. ダウンロードした `jpn.traineddata` を Tesseract の tessdata ディレクトリに置く（macOS では通常 `/opt/homebrew/share/tessdata/`）
   3. `tesseract --list-langs` で `jpn` が表示されることを確認


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
