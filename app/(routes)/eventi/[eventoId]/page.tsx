"use client"
import { Evento } from '@/type'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import getEvento from '@/actions/getEvento'
import Image from 'next/image'

const EventoPage = ({ params }: { params: { eventoId: string } }) => {
    const [evento, setEvento] = useState<Evento>()
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        async function fetch() {
            setEvento((await getEvento(params.eventoId)))
        }
        fetch()
    }, [setEvento])

    const formatDate = (data: string) => {
        const dateObject = new Date(data);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        // @ts-ignore
        const dataFormattata = dateObject.toLocaleDateString(undefined, options);

        return dataFormattata
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
        <div className="text-white flex flex-col gap-y-5">
            <div className='text-2xl text-center flex flex-col sm:block '>
                <span className='text-center'>{evento?.nome}</span>
                <span className='sm:ml-2 text-center'>{formatDate(evento?.startDate!)}</span>
            </div>
            <div className='w-full h-52 overflow-hidden sm:h-96 flex justify-center items-center '
                onDragStart={preventDefault}
                onContextMenu={preventDefault}
                // @ts-ignore
                style={{ userDrag: 'none', userSelect: 'none' }}>
                <Image src={evento?.imageUrl!} alt='image' width={1000} height={300} className='object-fill lg:rounded-2xl' />
            </div>
            <div className='p-5 flex flex-col gap-y-3'>

                <div className='flex flex-col gap-1'>
                    <span className='text-xl'>Descrizione:</span>
                    <div className='text-sm flex flex-col gap-1'>{evento?.informazioni.map((item) => (
                        <span key={item.id}>{item.descrizione}</span>
                    ))}</div>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-xl'>Discoteca:</span>
                    <span className='text-sm'>{evento?.discoteca.name}</span>
                </div>
            </div>
            <div className='w-[95%] m-2 mx-auto bg-black rounded-full p-5 text-center'>Prenota Tavolo</div>
        </div>
    )
}

export default EventoPage