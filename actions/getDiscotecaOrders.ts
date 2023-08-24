import { Order } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/discoteche`;

const getDiscotecaOrder = async (discotecaId: string): Promise<Order[]> => {
    const res = await fetch(`${URL}/${discotecaId}/impost/orders`);
    return res.json();
};

export default getDiscotecaOrder; 
