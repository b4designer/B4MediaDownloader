import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleDownload = async () => {
    if (!url) {
      setResponse('Por favor, cole o link do vídeo.');
      return;
    }

    try {
      const res = await axios.get(`/api/download?url=${encodeURIComponent(url)}`);
      setResponse(res.data.downloadUrl ? `Vídeo pronto: ${res.data.downloadUrl}` : res.data.message);
    } catch (error) {
      setResponse('Erro ao processar download.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>B4 Media Downloader</h1>
      <p style={styles.subtitle}>Cole o link do vídeo abaixo para baixar</p>

      <input
        type="text"
        placeholder="Ex: https://www.tiktok.com/..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleDownload} style={styles.button}>
        Baixar Vídeo
      </button>

      {response && <p style={styles.response}>{response}</p>}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 36,
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    padding: 12,
    width: 320,
    borderRadius: 6,
    border: '1px solid #ccc',
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    maxWidth: 320,
  }
};
