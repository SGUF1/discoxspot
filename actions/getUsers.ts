import { Discoteca, UserAccounts } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/useraccount`;

const getUsers = async (): Promise<UserAccounts[]> => {
  const res = await fetch(`${URL}`);
  return res.json();
};

export default getUsers;
