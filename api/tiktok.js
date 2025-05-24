const https = require('https');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Método não permitido');
  }

  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send('URL do vídeo não fornecida');
  }

  const options = {
    method: 'POST',
    hostname: 'auto-download-all-in-one.p.rapidapi.com',
    path: '/v1/social/autolink',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Use variável de ambiente!
      'x-rapidapi-host': 'auto-download-all-in-one.p.rapidapi.com',
      'Content-Type': 'application/json'
    }
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => (data += chunk));
    apiRes.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json && json.data && json.data.video) {
          // Envia o link do vídeo sem marca d'água
          res.redirect(json.data.video);
        } else {
          res.status(500).send('Erro ao processar a resposta da API');
        }
      } catch (err) {
        res.status(500).send('Erro ao interpretar resposta da API');
      }
    });
  });

  apiReq.on('error', (e) => {
    console.error(e);
    res.status(500).send('Erro ao acessar a API');
  });

  apiReq.write(JSON.stringify({ url: videoUrl }));
  apiReq.end();
};
