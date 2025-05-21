const handleDownload = async () => {
  if (!url) {
    setResponse('Por favor, cole o link do vídeo.');
    return;
  }

  try {
    const res = await axios.post('/api/download', { url });
    setResponse(JSON.stringify(res.data, null, 2)); // Mostra tudo no JSON bonitinho
  } catch (error) {
    setResponse('Erro ao processar download.');
  }
};
