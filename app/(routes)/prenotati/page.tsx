import ViewOrders from '@/components/view-orders'
import React, { useEffect, useState } from 'react'
import LeftBar from '@/components/leftbar'


const Prenotati = () => {
  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-[80vh] '>
      <div className='flex space-x-5'>
        <LeftBar />
        <ViewOrders   />
      </div>
    </div>
  )
}

export default Prenotati