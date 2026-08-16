import { GoogleGenerativeAI } from "@google/generative-ai";

// ターミナルで打ち込んだ質問を受け取る
const prompt = process.argv[2];

if (!prompt) {
  console.log("⚠️ 質問が入力されていません。例: node chat.mjs こんにちは");
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.log("⚠️ APIキーがセットされていません。export GEMINI_API_KEY=... を実行してください。");
  process.exit(1);
}

// Geminiの準備
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

// Geminiに質問を投げる
async function run() {
  console.log("Geminiが考え中...\n");
  try {
    const result = await model.generateContent(prompt);
    console.log("🤖 Geminiの回答:");
    console.log(result.response.text());
  } catch (error) {
    console.log("エラーが発生しました:", error.message);
  }
}

run();