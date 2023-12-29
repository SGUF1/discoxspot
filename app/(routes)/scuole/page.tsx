import React from "react";
import Header from "@/components/header";
import LeftBar from "@/components/leftbar";
import getDiscoteche from "@/actions/getDiscoteche";
import View from "@/components/view-discoteche";
import getProvince from "@/actions/getProvince";
import Footer from "@/components/footer";
import { useDispatch } from "react-redux";
import { auth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import createUser from "@/actions/createUser";
import getUser from "@/actions/getUser";
import getUsers from "@/actions/getUsers";
import useUserIdSet from "@/hooks/use-userId";
import BoxDomande from "@/components/boxdomande";

const Page = async () => {
  const userId = auth().userId;

  try {
    if (userId) {
      await createUser(userId);
    }
  } catch (errore) {}

  const user = await getUser(userId!);
  return (
    <div className="p-5 text-white lg:p-10 lg:px-20 h-[80vh] ">
      <div className="flex space-x-5">
        <LeftBar />
        {user.eta < 16 && <BoxDomande userId={user.id} />}
        {/* <View user={user} scuole/> */}
      </div>
    </div>
  );
};

export default Page;
