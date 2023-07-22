import { Discoteca, Provincia } from '@/type'
import React from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
interface ViewDiscotecheProps {
    discoteche: Discoteca[]
    province: Provincia[]
}

const ViewDiscoteche = ({ discoteche, province }: ViewDiscotecheProps) => {
    return (
        <div className='mt-10 grid grid-cols-1 overflow-y-scroll h-[70vh] sm:grid-cols-2 lg:grid-cols-3 w-[85%] gap-8 text-white'>
            {discoteche.map((item) => (
                <div className='flex flex-col items-center' key={item.id}>
                    <div className='h-32 sm:h-44 flex items-center w-64 sm:w-80 overflow-hidden rounded-xl'>
                        <Image src={item.imageUrl} alt='image' width={400} height={100} className='object-contain hover:scale-125 transition' />
                    </div>
                    <div className='flex w-64 sm:w-80 mt-2 justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div>{item.name}</div>
                            <div>{item.indirizzo} {item.civico}, {item.cap}, {province?.find(provincia => provincia.id === item.provinciaId)?.name}</div>
                        </div>
                        <div className='flex items-center'><Heart className="h-5 w-5" /> <span>{item.like}</span></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewDiscoteche