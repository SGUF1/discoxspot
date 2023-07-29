"use client"

import { Discoteca, UserAccounts } from '@/type'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import likeToDiscoteca from '@/actions/likeToDiscoteca'
import { useRouter } from 'next/navigation'
import getDiscoteche from '@/actions/getDiscoteche'
import useLike from '@/hooks/use-like'
import { useAppSelector } from '@/store/store'
import { Loader } from './loader'

interface ViewDiscotecheProps {
    preferiti?: boolean | false
    user: UserAccounts
}

const ViewDiscoteche = ({ user, preferiti }: ViewDiscotecheProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [discoteche, setDiscoteche] = useState<Discoteca[]>([])
    
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const like = useLike()
    const searchTerm = useAppSelector((state) => state.discoteche.ricerca)
    var cont = 0
    useEffect(() => {
        async function fetch() {
            try {
                if(cont === 0){
                    setIsLoading(true)
                }
                const allDiscoteche = await getDiscoteche();

                if (preferiti) {
                    const preferiteIds = user.discoteche.map(item => item.id);
                    setDiscoteche(allDiscoteche.filter(item => preferiteIds.includes(item.id)));
                } else {
                    setDiscoteche(allDiscoteche);
                }
            } catch (error) {
                console.error("Error fetching discoteche:", error);
            }
            finally{
                setIsLoading(false)
                cont++
            }
        }
       
        fetch()
        const interval = setInterval(fetch, 1000);

        return () => clearInterval(interval);
    }, [])
    const filteredDiscoteche = (discoteche.filter(
        item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    const handleOnHeart = async (item: Discoteca) => {

        try {
            setIsLoading(true)
            await likeToDiscoteca(user.id, item.id)
        } catch (error) {
            console.error("Error while liking discoteca:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const preventDefault = (event: any) => {
        event.preventDefault();
    };
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='lg:-mt-10 grid grid-cols-1 overflow-y-scroll w-full  overflow-x-auto h-[70vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white'>
            {filteredDiscoteche.length === 0 ? <div className="flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[70vh]">Nessuna discoteca trovata</div> : filteredDiscoteche.map((item) => (
                <div className='flex flex-col items-center' key={item.id} >
                    <div className='h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl' 
                        onDragStart={preventDefault}
                        onContextMenu={preventDefault}
                        // @ts-ignore
                        style={{ userDrag: 'none', userSelect: 'none' }}>
                        <Image src={item.imageUrl} alt='image' width={1000} height={100} className='object-contain lg:hover:scale-125 transition hover:cursor-pointer ' onClick={() => router.push(`/${item.id}`)} />
                    </div>
                    <div className='flex w-[95%] sm:w-[95%]  mt-2 justify-between' >
                        <div className='flex flex-col gap-1' onClick={() => router.push(`/${item.id}`)}>
                            <div>{item.name}</div>
                            <div>{item.indirizzo} {item.civico}, {item.cap}, {item.provincia.name}</div>
                        </div>
                        <div className='flex items-center cursor-pointer outline-none' onClick={() => handleOnHeart(item)} >
                            <Heart size={22} className='hover:scale-110 transition' fill={`${item.userAccounts.find((userA) => userA.id === user.id) ? "red" : "transparent"}`} color={`${item.userAccounts.find((userA) => userA.id === user.id) ? "red" : "white"}`} />
                            {!preferiti && <span className='ml-1'>{item.like}</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewDiscoteche