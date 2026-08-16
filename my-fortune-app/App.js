import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';

// CameraViewの遅延読み込み
let CameraView = null;
let useCameraPermissions = null;

const loadCamera = async () => {
  try {
    const camera = await import('expo-camera');
    CameraView = camera.CameraView;
    useCameraPermissions = camera.useCameraPermissions;
  } catch (error) {
    console.error('Camera module failed to load:', error);
  }
};

loadCamera();

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  // ✅ 初期化: カメラのみ非同期で読み込み
  useEffect(() => {
    const initCamera = async () => {
      try {
        if (useCameraPermissions) {
          const [status, requestPerm] = await useCameraPermissions();
          setPermission(status);
          if (!status?.granted) {
            requestPerm();
          }
        }
      } catch (error) {
        console.error('Permission check failed:', error);
        setCameraReady(true); // フォールバック: カメラなしで起動
      }
    };
    
    initCamera();
  }, []);

  // ✅ 権限チェック
  if (permission === null && useCameraPermissions) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#e91e63" />
          <Text style={styles.loadingText}>アプリを初期化中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (permission && !permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 16 }}>
            カメラの権限が必要です
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => requestPermission()}>
            <Text style={styles.buttonText}>権限を許可する</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const takePictureAndFortune = async () => {
    setLoading(true);
    setFortune(null);

    // 2秒間分析する演出
    setTimeout(() => {
      const results = [
        { title: "大吉 🌟", text: "素晴らしいエネルギーです！新しい挑戦が大成功する予感。" },
        { title: "中吉 ✨", text: "とても整理された良い運気。懐かしい人に連絡してみよう。" },
        { title: "吉 🍀", text: "落ち着いた雰囲気。自分のペースで過ごすと運気アップ！" },
        { title: "開運 🚀", text: "不要なものを1つ整理すると、明日から運気が急上昇します！" }
      ];
      const random = Math.floor(Math.random() * results.length);
      setFortune(results[random]);
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🔮 AI 持ち物・お部屋占い</Text>
      
      <View style={styles.cameraContainer}>
        {CameraView && permission?.granted ? (
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} onCameraReady={() => setCameraReady(true)}>
            <View style={styles.overlay}>
              {loading && (
                <View style={styles.loadingBox}>
                  <ActivityIndicator size="large" color="#e91e63" />
                  <Text style={styles.loadingText}>✨ AIがオーラを分析中... ✨</Text>
                </View>
              )}
            </View>
          </CameraView>
        ) : (
          <View style={[styles.camera, styles.placeholderCamera]}>
            <Text style={styles.placeholderText}>📷 カメラが利用できません</Text>
          </View>
        )}
      </View>

      <View style={styles.resultContainer}>
        {fortune ? (
          <View>
            <Text style={styles.fortuneTitle}>{fortune.title}</Text>
            <Text style={styles.fortuneText}>{fortune.text}</Text>
          </View>
        ) : (
          <Text style={styles.hintText}>被写体をカメラに向けてボタンを押してね</Text>
        )}
      </View>

      <TouchableOpacity style={styles.captureButton} onPress={takePictureAndFortune}>
        <Text style={styles.buttonText}>📸 写真を撮って占う！</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fce4ec', alignItems: 'center', justifyContent: 'center', padding: 20 },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#e91e63', marginBottom: 15 },
  cameraContainer: { width: '100%', height: 350, borderRadius: 20, overflow: 'hidden', marginBottom: 20 },
  camera: { flex: 1 },
  placeholderCamera: { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#666', fontSize: 16 },
  overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  loadingBox: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 20, borderRadius: 10, alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#e91e63', fontWeight: 'bold' },
  resultContainer: { width: '100%', minHeight: 80, backgroundColor: 'white', borderRadius: 15, padding: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  fortuneTitle: { fontSize: 24, fontWeight: 'bold', color: '#e91e63', textAlign: 'center' },
  fortuneText: { fontSize: 16, color: '#333', textAlign: 'center', marginTop: 5 },
  hintText: { color: '#888', fontStyle: 'italic' },
  button: { backgroundColor: '#e91e63', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  captureButton: { backgroundColor: '#e91e63', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }
});