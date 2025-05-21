import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido, use POST' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL não fornecida' });
  }

  try {
    const response = await axios.post(
      'https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink',
      { url },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
          'x-rapidapi-key': '410bf42c1amsh445a25e9282143ap12ca98jsn45215382351b',
        },
      }
    );

    // Retorna o resultado da API pro front
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error);
    return res.status(500).json({ error: 'Erro ao processar download' });
  }
}
