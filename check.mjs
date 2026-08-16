const apiKey = process.env.GEMINI_API_KEY;

async function showModels() {
  console.log("🔍 使えるAIを検索中...\n");
  const url = "https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error) {
       console.log("❌ エラーが出ました:", data.error.message);
       return;
    }

    console.log("✅ あなたが今使えるAIの名前（モデル名）一覧です：");
    data.models.forEach(model => {
      // チャットに使えるAIだけを絞り込んで表示します
      if (model.supportedGenerationMethods.includes("generateContent")) {
         console.log("👉 " + model.name.replace("models/", ""));
      }
    });
  } catch (e) {
    console.log("通信に失敗しました。");
  }
}

showModels();