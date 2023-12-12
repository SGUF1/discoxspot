import { Discoteca } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/scuole`;

const getDiscoteca = async (id: string): Promise<Discoteca> => {
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export default getDiscoteca;
