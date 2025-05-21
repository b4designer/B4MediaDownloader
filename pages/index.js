import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleDownload = async () => {
    try {
      const res = await axios.get(`/api/download?url=${encodeURIComponent(url)}`);
      setResponse(res.data.message || 'Download concluído!');
    } catch (error) {
      setResponse('Erro ao processar download.');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>B4 Media Downloader</h1>
      <p>Baixe vídeos do TikTok, YouTube, Kwai e Instagram</p>
      <input
        type="text"
        placeholder="Cole o link aqui..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: 8, width: 300, marginRight: 10 }}
      />
      <button
        onClick={handleDownload}
        style={{
          padding: '8px 16px',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Baixar
      </button>
      {response && (
        <p style={{ marginTop: 20 }}>{response}</p>
      )}
    </div>
  );
}
