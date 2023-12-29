import React from 'react'
import { auth } from '@clerk/nextjs'
import LeftBar from '@/components/leftbar'
import View from '@/components/view-discoteche'
import getUser from '@/actions/getUser'
import createUser from '@/actions/createUser'
import Header from '@/components/header'
const UserPage = async () => {


    const userId = auth().userId;
    const user = await getUser(userId!);

    return (
      <div className=" text-white relative h-[screen] ">
        <div className="flex h-full">
          <LeftBar />
          <div className="w-full h-full relative">
            <Header user={user} />
            <View user={user} number={1} />
          </div>
        </div>
      </div>
    );
}

export default UserPage