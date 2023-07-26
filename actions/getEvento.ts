import { Discoteca, Evento } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/eventi`;

const getEvento = async (id: string): Promise<Evento> => {
    const res = await fetch(`${URL}/${id}`)
    return res.json()
}

export default getEvento