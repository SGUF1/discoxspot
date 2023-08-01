import { Data } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/discoteche`;

const getDate = async (id: string): Promise<Data[]> => {
    const res = await fetch(`${URL}/${id}/impost/date`)
    return res.json()
}

export default getDate