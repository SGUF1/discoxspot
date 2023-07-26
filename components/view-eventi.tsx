"use client"

import { Evento, UserAccounts } from '@/type'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useLike from '@/hooks/use-like'
import getEventi from '@/actions/getEventi'
interface ViewEventiProps {
    user: UserAccounts
}

const ViewEventi = ({ user }: ViewEventiProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [eventi, setEventi] = useState<Evento[]>([])

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const like = useLike()
    useEffect(() => {
        async function fetch() {
            try {
                const allEventi = await getEventi();

                setEventi(allEventi);
            } catch (error) {
                console.error("Error fetching eventi:", error);
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
        return dateObject > currentDate;
    });
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }



    return (
        <div className='lg:-mt-10 grid grid-cols-1 overflow-y-scroll w-full  overflow-x-auto h-[70vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white'>
            {futureDates.length === 0 ? <div className='flex justify-center sm:justify-start  items-center sm:items-start'>NESSUN EVENTO</div> :futureDates.map((item) => (
                <div className='flex flex-col items-center' key={item.id} onClick={() => router.push(`/eventi/${item.id}`)}>
                    <div className='h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl'>
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