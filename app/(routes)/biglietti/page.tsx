import React, { useEffect, useState } from 'react'
import LeftBar from '@/components/leftbar'
import ViewBiglietti from '@/components/view-biglietti'


const Prenotati = () => {
  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-[80vh] '>
      <div className='flex space-x-5'>
        <LeftBar />
        <ViewBiglietti   />
      </div>
    </div>
  )
}

export default Prenotati