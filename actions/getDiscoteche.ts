import { Discoteca } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/discoteche`;

const getDiscoteche = async (): Promise<Discoteca[]> => {
    const res = await fetch(`${URL}`)
    return res.json()
}

export default getDiscoteche