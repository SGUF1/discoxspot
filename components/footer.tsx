import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='absolute flex bottom-0 h-16 bg-black w-[90%] items-center justify-center'>
        <Copyright className='h-5 w-5'/> <span className='ml-2'>DiscoSpot</span>
    </div>
  )
}

export default Footer