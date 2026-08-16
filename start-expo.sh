#!/bin/bash

# Expoサーバーを起動するスクリプト
# 使用方法: ./start-expo.sh my-final-app

APP_DIR="${1:-.}"

echo "📱 Expo Go QRコード生成スクリプト"
echo "================================="
echo ""
echo "🚀 $APP_DIR を起動中..."
echo ""

cd "$APP_DIR"

# package.json が存在するか確認
if [ ! -f "package.json" ]; then
  echo "❌ エラー: $APP_DIR に package.json が見つかりません"
  exit 1
fi

# 依存がインストールされているか確認
if [ ! -d "node_modules" ]; then
  echo "📦 依存をインストール中..."
  npm install
fi

echo ""
echo "✅ Expoサーバー起動中..."
echo ""
echo "📲 iPhoneでExpo Goを開いて、下のQRコードをスキャンしてください"
echo ""

npm start
