import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:8000/analyze/', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>画像アップロード＆分析</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading} style={{ marginLeft: 10 }}>
        {loading ? '送信中...' : 'アップロードして分析'}
      </button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>分析結果</h3>
          <ul>
            <li>ファイル名: {result.filename}</li>
            <li>幅: {result.width}px</li>
            <li>高さ: {result.height}px</li>
            <li>フォーマット: {result.format}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
