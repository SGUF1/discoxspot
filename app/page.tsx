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

const Page = async () => {
  
  const discoteche = await getDiscoteche()
  const province = await getProvince()
  
  const userId = auth().userId
  try{
    if (userId) {
      await createUser(userId);
    }

  }catch(errore){
    
  }
  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-full'>
      <Header />
      <div className='flex space-x-5'>
        <LeftBar />
        <ViewDiscoteche discoteche={discoteche} province={province} userId={userId!}/>
      </div>
      <Footer />
    </div>
  )
}

export default Page