import React from 'react'
import Header from '@/components/header';
import LeftBar from '@/components/leftbar';
import getDiscoteche from '@/actions/getDiscoteche';
import ViewDiscoteche from '@/components/view-discoteche';
import getProvince from '@/actions/getProvince';


const Page = async () => {

  const discoteche = await getDiscoteche()
  const province = await getProvince()
  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-full'>
        <Header/>
        <div className='flex space-x-10'>
        <LeftBar />
        <ViewDiscoteche discoteche={discoteche} province={province}/>
        </div>
    </div>
  )
}

export default Page