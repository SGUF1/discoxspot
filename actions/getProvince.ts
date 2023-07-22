import { Provincia } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/province`;

const getProvince = async (): Promise<Provincia[]> => {
  const res = await fetch(`${URL}`);
  return res.json();
};

export default getProvince;
