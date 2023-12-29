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
    <div className=" text-white relative h-[screen] ">
      <div className="flex h-full">
        <LeftBar />
        <div className="w-full h-full relative">
          <Header user={user}/>
          {user.eta < 16 && <BoxDomande userId={user.id} />}
          <View user={user} number={3} />
        </div>
      </div>
    </div>
  );
};

export default Page;
