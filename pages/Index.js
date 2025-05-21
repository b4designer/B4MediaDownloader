import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setDownloadLink("");

    try {
      const res = await axios.post("/api/download", { url });
      if (res.data.downloadUrl) {
        setDownloadLink(res.data.downloadUrl);
      } else {
        setError("Não foi possível gerar o link de download.");
      }
    } catch (e) {
      setError("Erro ao processar o download.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>B4MediaDownloader</h1>
      <p>Baixe vídeos do TikTok, YouTube, Kwai e Instagram de forma rápida e simples.</p>
      
      <input
        type="text"
        placeholder="Cole a URL do vídeo aqui"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 10, fontSize: 16 }}
      />

      <button
        onClick={handleDownload}
        disabled={!url || loading}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 5,
        }}
      >
        {loading ? "Processando..." : "Gerar Link de Download"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {downloadLink && (
        <div style={{ marginTop: 20 }}>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", fontSize: 18 }}>
            Clique aqui para baixar seu vídeo
          </a>
        </div>
      )}
    </div>
  );
}
