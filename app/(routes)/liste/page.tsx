import React, { useEffect, useState } from 'react'
import LeftBar from '@/components/leftbar'
import ViewListe from '@/components/view-liste'
import createUser from '@/actions/createUser';
import { auth } from '@clerk/nextjs';
import Header from '@/components/header';
import View from '@/components/view-discoteche';
import getUser from '@/actions/getUser';


const Liste = async () => {
    const userId = auth().userId;
  const user = await getUser(userId!);
   
  
  return (
    <div className=" text-white relative h-[screen] ">
      <div className="flex h-full">
        <LeftBar />
        <div className="w-full h-full relative">
          <Header user={user} />
          <View user={user} number={5} />
        </div>
      </div>
    </div>
  );
}

export default Liste