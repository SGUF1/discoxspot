import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex h-8 bg-transparent items-center justify-center text-white'>
        <Copyright className='h-5 w-5'/> <span className='ml-2'>DiscoSpot 2023</span>
    </div>
  )
}

export default Footer