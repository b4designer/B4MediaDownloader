import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL é obrigatória" });
  }

  try {
    // Aqui você colocaria a lógica para extrair o link direto do vídeo,
    // usando APIs de terceiros ou scraping, dependendo do serviço.

    // Exemplo simplificado: retorna a mesma URL (substitua pela lógica real)
    // Você deve implementar a lógica para obter o link real do vídeo.

    // Para testar, vamos só retornar a URL original.
    return res.status(200).json({ downloadUrl: url });

  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
