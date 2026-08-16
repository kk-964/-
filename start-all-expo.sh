#!/bin/bash

# 全アプリをExpo Goで起動するスクリプト
# 使用方法: ./start-all-expo.sh

echo "📱 複数Expoアプリをポート変更で起動"
echo "======================================"
echo ""

# ポート設定
declare -A PORTS=( ["my-final-app"]=8081 ["my-fortune-app"]=8082 ["my-new-app"]=8083 )

# 各アプリのディレクトリが存在するか確認
for app in "${!PORTS[@]}"; do
  if [ ! -d "$app" ]; then
    echo "❌ エラー: $app ディレクトリが見つかりません"
    exit 1
  fi
done

echo "各アプリを別のターミナルで以下のコマンドで起動してください："
echo ""

for app in "${!PORTS[@]}"; do
  port=${PORTS[$app]}
  echo "📲 $app (ポート $port):"
  echo "   cd $app && npm start"
  echo ""
done

echo "または、以下のコマンドで自動起動できます："
echo ""
echo "tmux を使う場合："
echo "  tmux new-session -d -s 'expo-my-final' -c 'my-final-app' 'npm start'"
echo "  tmux new-session -d -s 'expo-my-fortune' -c 'my-fortune-app' 'npm start'"
echo "  tmux new-session -d -s 'expo-my-new' -c 'my-new-app' 'npm start'"
echo ""

# tmuxがインストールされているかチェック
if command -v tmux &> /dev/null; then
  echo "tmux が見つかりました。自動起動します..."
  echo ""
  
  tmux new-session -d -s expo-my-final-app -c "$(pwd)/my-final-app" "npm start"
  echo "✅ my-final-app 起動 (tmux session: expo-my-final-app)"
  
  sleep 2
  
  tmux new-session -d -s expo-my-fortune-app -c "$(pwd)/my-fortune-app" "npm start"
  echo "✅ my-fortune-app 起動 (tmux session: expo-my-fortune-app)"
  
  sleep 2
  
  tmux new-session -d -s expo-my-new-app -c "$(pwd)/my-new-app" "npm start"
  echo "✅ my-new-app 起動 (tmux session: expo-my-new-app)"
  
  echo ""
  echo "📲 各ターミナルのセッションを確認："
  echo "  tmux list-sessions"
  echo ""
  echo "セッションを見る："
  echo "  tmux attach-session -t expo-my-final-app"
  echo "  tmux attach-session -t expo-my-fortune-app"
  echo "  tmux attach-session -t expo-my-new-app"
  echo ""
  echo "すべてのセッションを終了："
  echo "  tmux kill-server"
else
  echo "⚠️  tmux がインストールされていません。"
  echo "各アプリを別のターミナルで手動で起動してください。"
fi
