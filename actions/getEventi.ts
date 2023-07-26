import { Discoteca, Evento } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/eventi`;

const getEventi = async (): Promise<Evento[]> => {
    const res = await fetch(`${URL}`)
    return res.json()
}

export default getEventi