# Expo Go でアプリを確認する方法

## 準備

### 1. Expo Go をインストール
iPhoneのApp StoreからExpo Goをインストールしてください。

### 2. 依存パッケージをインストール
```bash
npm install
```

各アプリディレクトリでも依存をインストール：
```bash
cd my-final-app
npm install
cd ../my-fortune-app
npm install
cd ../my-new-app
npm install
```

## アプリを起動してQRコードを表示

### 方法1：個別にアプリを起動（推奨）

```bash
# my-final-app を起動
cd my-final-app
npm start

# 別のターミナルで my-fortune-app を起動
cd ../my-fortune-app
npm start

# 別のターミナルで my-new-app を起動
cd ../my-new-app
npm start
```

### 方法2：スクリプトで一括起動
```bash
npm run start:all
```

## QRコードをスキャン

ターミナルに表示されたQRコードを以下の方法でスキャンしてください：

1. **iPhoneからスキャン**
   - Expo Goアプリを開く
   - 「Scan QR code」をタップ
   - カメラでQRコードをスキャン

2. **キーボードショートカット**
   - `w` - Webブラウザで開く
   - `i` - iOS（シミュレータ/接続デバイス）で開く
   - `a` - Android（シミュレータ/接続デバイス）で開く

## トラブルシューティング

### QRコードが表示されない場合
- ターミナルでコマンドが実行されているか確認
- `expo start` が正常に起動しているか確認
- ファイアウォール設定を確認

### デバイスが接続できない場合
- iPhoneとパソコンが同じWiFiネットワークにいることを確認
- Expo Goアプリが最新バージョンか確認
- LAN接続ではなくインターネット接続経由の場合は `expo start --tunnel` を使用

## Tunnel モード（インターネット経由）
社内ネットワークやセキュアな環境では：
```bash
cd my-final-app
expo start --tunnel
```
