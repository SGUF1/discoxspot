import { Discoteca, UserAccount } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const getUser = async (id: string): Promise<UserAccount> => {
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export default getUser;
