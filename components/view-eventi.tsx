"use client"

import { Evento, UserAccounts } from '@/type'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useLike from '@/hooks/use-like'
import getEventi from '@/actions/getEventi'
import { Loader } from './loader'
import getHourse from '@/actions/getHourse'
const ViewEventi = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [eventi, setEventi] = useState<Evento[]>([])

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const like = useLike()
    var cont = 0

    useEffect(() => {
        async function fetch() {
            try {
                if (cont === 0)
                    setIsLoading(true)

                const allEventi = await getEventi();

                setEventi(allEventi);
            } catch (error) {
                console.error("Error fetchindg eventi:", error);
            } finally {
                setIsLoading(false)
                cont++
            }
        }

        fetch()
        const interval = setInterval(fetch, 1000);

        return () => clearInterval(interval);
    }, [])

    const formatDate = (data: string) => {
        const dateObject = new Date(data);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        // Ottieni la data nel formato desiderato
        // @ts-ignore
        const dataFormattata = dateObject.toLocaleDateString(undefined, options);

        return dataFormattata
    }
    const currentDate = new Date();

    const futureDates = eventi.filter((dateString) => {
        const dateObject = new Date(dateString.startDate);
        return dateObject >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + getHourse, 0);
    });
    const preventDefault = (event: any) => {
        event.preventDefault();
    };


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (isLoading) {
        return <div className='justify-center items-center flex w-full'><Loader /></div>
    }
    if (!isMounted) {
        return null;
    }

    return (
        <div className='lg:-mt-10 grid grid-cols-1 -mt-4  overflow-y-scroll w-full  overflow-x-auto h-[70vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white'>
            {futureDates.length === 0 ? <div className='flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[80vh]'>Nessun evento trovato</div> : futureDates.map((item) => (
                <div className='flex flex-col items-center' key={item.id} onClick={() => router.push(`/eventi/${item.id}`)}>
                    <div className='h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl' onDragStart={preventDefault}
                        onContextMenu={preventDefault}
                        // @ts-ignore
                        style={{ userDrag: 'none', userSelect: 'none' }}>
                        <Image src={item.imageUrl} alt='image' width={1000} height={100} className='object-contain lg:hover:scale-125 transition hover:cursor-pointer ' />
                    </div>
                    <div className='flex w-[95%] sm:w-[95%] flex-col mt-2 justify-between'>
                        <div className='text-center'>{item.nome}</div>
                        <div className='flex justify-between'>
                            <span>{item.discoteca.name}</span>
                            <span className='text-blue-400'>{item.tipologiaEvento.name}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>{item.sala?.nome}</span>
                            <span>{formatDate(item.startDate)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default ViewEventi