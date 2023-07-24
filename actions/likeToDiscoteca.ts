const likeToDiscoteca = async (userId: string, discotecaId: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount/${userId}/putlike`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({ userId, discotecaId }),
  };

  const res = await fetch(URL, requestOptions);
  return res.json();
};

export default likeToDiscoteca;
