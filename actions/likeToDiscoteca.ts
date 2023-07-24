const likeToDiscoteca = async (userId: string, discotecaId: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount/${userId}/putlike`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specifica che i dati inviati sono in formato JSON
    },
    body: JSON.stringify({ userId, discotecaId }), // Converte l'oggetto userId in una stringa JSON da includere nel corpo della richiesta
  };

  const res = await fetch(URL, requestOptions);
  return res.json();
};

export default likeToDiscoteca;
