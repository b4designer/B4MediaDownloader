const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) return res.status(400).send('URL não fornecida.');

  try {
    if (ytdl.validateURL(videoURL)) {
      const info = await ytdl.getInfo(videoURL);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

      res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

      ytdl(videoURL, {
        format: 'mp4'
      }).pipe(res);

    } else if (videoURL.includes('tiktok.com')) {
      // Aqui, use API externa real, essa é só uma simulação
      const response = await axios.get(`https://api.example.com/tiktok?url=${encodeURIComponent(videoURL)}`);
      const downloadLink = response.data.downloadUrl;
      res.redirect(downloadLink);

    } else if (videoURL.includes('instagram.com')) {
      const response = await axios.get(`https://api.example.com/instagram?url=${encodeURIComponent(videoURL)}`);
      const downloadLink = response.data.downloadUrl;
      res.redirect(downloadLink);

    } else if (videoURL.includes('kwai')) {
      const response = await axios.get(`https://api.example.com/kwai?url=${encodeURIComponent(videoURL)}`);
      const downloadLink = response.data.downloadUrl;
      res.redirect(downloadLink);

    } else {
      res.status(400).send('Plataforma não suportada.');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar download.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});