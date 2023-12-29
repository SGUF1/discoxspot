import React from 'react'
import Header from '@/components/header';
import LeftBar from '@/components/leftbar';
import getDiscoteche from '@/actions/getDiscoteche';
import View from '@/components/view-discoteche';
import getProvince from '@/actions/getProvince';
import Footer from '@/components/footer';
import { useDispatch } from 'react-redux'
import { auth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import createUser from '@/actions/createUser';
import getUser from '@/actions/getUser';
import getUsers from '@/actions/getUsers';

const LikeRankPage = async () => {
  
  
  const userId = auth().userId

  const user = await getUser(userId!)
  return (
    <div className=" text-white relative h-[screen] ">
      <div className="flex h-full">
        <LeftBar />
        <div className="w-full h-full relative">
          <Header user={user} />
          <View user={user} number={2} />
        </div>
      </div>
    </div>
  );
}

export default LikeRankPage