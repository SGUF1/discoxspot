import { Lista } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/liste`;

const getLista = async (id: string): Promise<Lista> => {
    const res = await fetch(`${URL}/${id}`)
    return res.json()
}

export default getLista