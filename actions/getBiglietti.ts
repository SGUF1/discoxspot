import { OrderBiglietto } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const getOrderBiglietti = async (accountId: string): Promise<OrderBiglietto[]> => {
    const res = await fetch(`${URL}/${accountId}/orderBiglietti`);
    return res.json();
};

export default getOrderBiglietti; 
