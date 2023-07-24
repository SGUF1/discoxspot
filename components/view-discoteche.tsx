"use client"

import { Discoteca, Provincia, UserAccount } from '@/type'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, HeartPulse } from 'lucide-react'
import likeToDiscoteca from '@/actions/likeToDiscoteca'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import getDiscoteca from '@/actions/getDiscoteca'
import getDiscoteche from '@/actions/getDiscoteche'
import useLike from '@/hooks/use-like'
interface ViewDiscotecheProps {
    province: Provincia[]
    user: UserAccount
}

const ViewDiscoteche = ({ province, user }: ViewDiscotecheProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [discoteche, setDiscoteche] = useState<Discoteca[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const like = useLike()
    useEffect(() => {
        async function fetch() {
            try {
                setDiscoteche((await getDiscoteche()))
            } catch (error) {

            }
        }

        fetch()
        const interval = setInterval(fetch, 1000);

        return () => clearInterval(interval);
    }, [])
    const handleOnHeart = async (item: Discoteca) => {

        try {
            setIsLoading(true)
            like.addItem(item)
            await likeToDiscoteca(user.id, item.id)

        } catch (error) {
            console.error("Error while liking discoteca:", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='lg:-mt-10 grid grid-cols-1 overflow-y-scroll  overflow-x-auto h-[70vh] sm:grid-cols-2 lg:grid-cols-3 w-[95%]  2xl:grid-cols-4 gap-8 text-white'>
            {discoteche.map((item) => (
                <div className='flex flex-col items-center' key={item.id}>
                    <div className='h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl'>
                        <Image src={item.imageUrl} alt='image' width={1000} height={100} className='object-contain lg:hover:scale-125 transition hover:cursor-pointer ' />
                    </div>
                    <div className='flex w-[95%] sm:w-[95%]  mt-2 justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div>{item.name}</div>
                            <div>{item.indirizzo} {item.civico}, {item.cap}, {province?.find(provincia => provincia.id === item.provinciaId)?.name}</div>
                        </div>
                        <div className='flex items-center cursor-pointer outline-none' onClick={() => handleOnHeart(item)}>
                            <Heart size={22} className='hover:scale-110 transition' fill={`${like.items.find((disco) => disco.id === item.id) ? "red" : "black"}`} color={`${like.items.find((disco) => disco.id === item.id) ? "red" : "white"}`} />
                            <span className='ml-1'>{item.like}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewDiscoteche