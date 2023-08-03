import React from 'react'
import Header from '@/components/header';
import LeftBar from '@/components/leftbar';
import getDiscoteche from '@/actions/getDiscoteche';
import ViewDiscoteche from '@/components/view-discoteche';
import getProvince from '@/actions/getProvince';
import Footer from '@/components/footer';
import { useDispatch } from 'react-redux'
import { auth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import createUser from '@/actions/createUser';
import getUser from '@/actions/getUser';
import getUsers from '@/actions/getUsers';
import useUserIdSet from '@/hooks/use-userId';

const Page = async () => {
  
  const userId = auth().userId
  try{
    if (userId) {
      await createUser(userId);
    }
    
  }catch(errore){
  }

  
  const user = await getUser(userId!)
  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-[80vh] '>
      <div className='flex space-x-5'>
        <LeftBar />
        <ViewDiscoteche  user={user}/>
      </div>
    </div>
  )
}

export default Page