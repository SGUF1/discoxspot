import { Discoteca } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const getClassificaDiscoteche = async (id: string): Promise<Discoteca[]> => {
    const res = await fetch(`${URL}/${id}/discoteche/classifica`)
    return res.json()
}

export default getClassificaDiscoteche