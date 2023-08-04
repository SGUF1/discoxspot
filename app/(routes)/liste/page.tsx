import React, { useEffect, useState } from 'react'
import LeftBar from '@/components/leftbar'
import ViewListe from '@/components/view-liste'


const Liste = () => {
  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-[80vh] '>
      <div className='flex space-x-5'>
        <LeftBar />
        <ViewListe />
      </div>
    </div>
  )
}

export default Liste