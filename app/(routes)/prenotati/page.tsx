import React, { useEffect, useState } from 'react'
import LeftBar from '@/components/leftbar'
import { auth } from '@clerk/nextjs'
import getUser from '@/actions/getUser'
import Header from '@/components/header'
import View from '@/components/view-discoteche'


const Prenotati =async () => {
   const userId = auth().userId

  const user = await getUser(userId!)
  return (
    <div className=" text-white relative h-[screen] ">
      <div className="flex h-full">
        <LeftBar />
        <div className="w-full h-full relative">
          <Header user={user} />
          <View user={user} number={7} />
        </div>
      </div>
    </div>
  );
}

export default Prenotati