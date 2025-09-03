import React, { useState } from 'react';

async function postFormData(url, formData) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err.message };
  }
}

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [lang, setLang] = useState('eng');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    let formData;
    try {
      formData = new FormData();
      formData.append('file', file);
    } catch (err) {
      setResult({ error: '画像変換エラー: ' + err.message });
      setLoading(false);
      return;
    }
    const { data, error } = await postFormData('http://localhost:8000/analyze/', formData);
    if (error) {
      setResult({ error: '分析リクエストエラー: ' + error });
    } else {
      setResult(data);
    }
    setLoading(false);
  };

  const handleOCR = async () => {
    if (!file) return;
    setLoading(true);
    let formData;
    try {
      formData = new FormData();
      formData.append('file', file);
      formData.append('lang', lang);
    } catch (err) {
      setResult({ error: '画像変換エラー: ' + err.message });
      setLoading(false);
      return;
    }
    const { data, error } = await postFormData('http://localhost:8000/ocr/', formData);
    if (error) {
      setResult({ error: 'OCRリクエストエラー: ' + error });
    } else {
      setResult(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>画像アップロード＆分析</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <label style={{ marginLeft: 10 }}>
        言語:
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ marginLeft: 6 }}>
          <option value="eng">English (eng)</option>
          <option value="jpn">日本語 (jpn)</option>
        </select>
      </label>
      <button onClick={handleUpload} disabled={!file || loading} style={{ marginLeft: 10 }}>
        {loading ? '送信中...' : 'アップロードして分析'}
      </button>
      <button onClick={handleOCR} disabled={!file || loading} style={{ marginLeft: 10 }}>
        {loading ? '送信中...' : 'OCRでテキスト抽出'}
      </button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>分析結果</h3>
          <ul>
            <li>ファイル名: {result.filename}</li>
            <li>幅: {result.width ? `${result.width}px` : '—'}</li>
            <li>高さ: {result.height ? `${result.height}px` : '—'}</li>
            <li>フォーマット: {result.format ? result.format : '—'}</li>
          </ul>
          {result.text && (
            <div style={{ marginTop: 12 }}>
              <h4>OCR抽出テキスト</h4>
              <pre style={{ whiteSpace: 'pre-wrap', background: '#f6f6f6', padding: 10 }}>{result.text}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
