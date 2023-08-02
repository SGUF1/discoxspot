import React from 'react'
import { auth } from '@clerk/nextjs'
import LeftBar from '@/components/leftbar'
import ViewDiscoteche from '@/components/view-discoteche'
import getUser from '@/actions/getUser'
import createUser from '@/actions/createUser'
import ViewEventi from '@/components/view-eventi'
const UserPage = async () => {


  const userId = auth().userId
  try {
    if (userId) {
      await createUser(userId);
    }

  } catch (errore) {
  }
  const user = await getUser(userId!)
  return (
    <div className='p-5 text-white  lg:p-10 lg:px-20 h-[80vh]'>
      <div className='flex space-x-5'>
        <LeftBar/>
        <ViewEventi/>
      </div>
    </div>
  )
}

export default UserPage