
const updateUser = async (userId: string, firstDomanda: any, secondDomanda: string, eta: number) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount/${userId}`;
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", // Specifica che i dati inviati sono in formato JSON
        },
        body: JSON.stringify({ userId, firstDomanda, secondDomanda, eta }), // Converte l'oggetto userId in una stringa JSON da includere nel corpo della richiesta
    };

    const res = await fetch(URL, requestOptions);
    return res.json(); 
};

export default updateUser;
