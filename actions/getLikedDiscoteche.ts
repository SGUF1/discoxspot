import { Discoteca } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const getLikeDiscoteche = async (id: string): Promise<Discoteca[]> => {
    const res = await fetch(`${URL}/${id}/discoteche`)
    return res.json()
}

export default getLikeDiscoteche