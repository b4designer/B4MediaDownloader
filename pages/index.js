import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const handleDownload = async () => {
    if (!url) {
      setMensagem('Por favor, cole o link do vídeo.');
      return;
    }

    setMensagem('Processando...');
    setDownloadLinks([]);

    try {
      const res = await axios.post('/api/download', { url });
      console.log(res.data); // Para ver como vem a resposta no console

      const links = res.data.data.links; // <- ajuste esse caminho se precisar

      if (links && links.length > 0) {
        setDownloadLinks(links);
        setMensagem('Links de download disponíveis!');
      } else {
        setMensagem('Nenhum link encontrado.');
      }

    } catch (error) {
      console.error(error);
      setMensagem('Erro ao processar download.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>B4 Media Downloader</h1>
      <p style={styles.subtitle}>Cole o link do vídeo abaixo para baixar</p>

      <input
        type="text"
        placeholder="https://..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleDownload} style={styles.button}>
        Baixar Vídeo
      </button>

      <p style={styles.message}>{mensagem}</p>

      <div style={styles.linksContainer}>
        {downloadLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.downloadButton}
          >
            Baixar {link.quality}
          </a>
        ))}
      </div>
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
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    gap: 10,
  },
  downloadButton: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: 6,
    textDecoration: 'none',
    fontSize: 16,
    textAlign: 'center',
  },
};
