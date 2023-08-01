import { Order } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const getOrders = async (accountId: string): Promise<Order[]> => {
    const res = await fetch(`${URL}/${accountId}/orders`);
    return res.json();
};

export default getOrders; 
