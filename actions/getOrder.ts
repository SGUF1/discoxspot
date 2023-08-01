import { Order } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrder = async (codice: string): Promise<Order> => {
    const res = await fetch(`${URL}/${codice}`);
    return res.json();
};

export default getOrder; 
