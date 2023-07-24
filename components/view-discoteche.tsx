"use client"

import { Discoteca, Provincia } from '@/type'
import React, { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import likeToDiscoteca from '@/actions/likeToDiscoteca'
import { useRouter } from 'next/navigation'
interface ViewDiscotecheProps {
    discoteche: Discoteca[]
    province: Provincia[]
    userId: string
}

const ViewDiscoteche = ({ discoteche, province, userId }: ViewDiscotecheProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    return (
        <div className='mt-10 grid grid-cols-1 overflow-y-scroll overflow-x-auto h-[75vh] sm:grid-cols-2 lg:grid-cols-3 w-[95%]  2xl:grid-cols-4 gap-8 text-white'>
            {discoteche.map((item) => (
                <div className='flex flex-col items-center' key={item.id}>
                    <div className='h-36 sm:h-48 flex items-center w-56 sm:w-64 lg:w-[310px] overflow-hidden rounded-xl'>
                        <Image src={item.imageUrl} alt='image' width={400} height={100} className='object-contain lg:hover:scale-125 transition hover:cursor-pointer ' />
                    </div>
                    <div className='flex w-56 sm:w-64 lg:w-[310px] mt-2 justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div>{item.name}</div>
                            <div>{item.indirizzo} {item.civico}, {item.cap}, {province?.find(provincia => provincia.id === item.provinciaId)?.name}</div>
                        </div>
                        <div className='flex items-center cursor-pointer' onClick={async () => {
                            if(!loading){
                                try {
                                    setLoading(true)
                                    await likeToDiscoteca(userId, item.id)
                                } catch (error) {
                                }
                                finally{
                                    setLoading(false)
                                }
                            }
                            
                        }}><Heart className="h-5 w-5" /> <span className='ml-2'>{item.like}</span></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewDiscoteche