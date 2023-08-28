import { Copyright } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex bg-transparent items-center justify-center text-white'>
        <Copyright className='h-5 w-5'/> <span className='ml-2'>discoXspot 2023</span>
    </div>
  )
}

export default Footer