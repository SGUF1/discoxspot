"use client"
import { Copyright } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathname = usePathname()
  return (
    <div className={` bg-transparent items-center justify-center text-white ${pathname !== "/" ? 'hidden' : "flex"}`} >
        <Copyright className='h-5 w-5'/> <span className='ml-2'>discoXspot 2023</span>
    </div>
  )
}

export default Footer