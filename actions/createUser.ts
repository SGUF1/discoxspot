const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const createUser = async (userId: string, ) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specifica che i dati inviati sono in formato JSON
    },
    body: JSON.stringify({userId: userId, }), // Converte l'oggetto userId in una stringa JSON da includere nel corpo della richiesta
  };

  const res = await fetch(URL, requestOptions);
  return res.json();
};

export default createUser;
