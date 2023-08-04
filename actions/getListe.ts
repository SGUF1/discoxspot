import { Lista } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/liste`;

const getListe = async (): Promise<Lista[]> => {
    const res = await fetch(`${URL}`)
    return res.json()
}

export default getListe