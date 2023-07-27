"use client"
import { Discoteca, Evento } from '@/type'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import getEvento from '@/actions/getEvento'
import Image from 'next/image'
import getDiscoteca from '@/actions/getDiscoteca'
import { Heart } from 'lucide-react'
import getEventi from '@/actions/getEventi'
import ViewEventi from '@/components/view-eventi'
import PanelTavolo from '@/components/panel-tavolo'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/store/store'
import { cn } from '@/lib/utils'
import { openTavoloPlease } from '@/store/features/panel-tavolo-open'

const EventoPage = ({ params }: { params: { discotecaId: string } }) => {
    const [discoteca, setDiscoteca] = useState<Discoteca>()
    const [eventi, setEventi] = useState<Evento[]>([])
    const [isMounted, setIsMounted] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const open = useAppSelector((state) => state.open.open)
    const router = useRouter()
    useEffect(() => {
        async function fetch() {
            setDiscoteca((await getDiscoteca(params.discotecaId)))
            setEventi((await getEventi()))
        }
        fetch()
    }, [])

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

    if (!isMounted || !discoteca?.visibile) {
        return null;
    }
    return (
        <>
            <div className={cn("text-white  flex-col gap-y-5", open ? "hidden" : "flex")}>
                <div className='text-2xl text-center flex justify-center sm:block '>
                    <span className='text-center'>{discoteca?.name}</span>
                </div>
                <div className='w-full h-52 overflow-hidden sm:h-96 flex justify-center items-center lg:rounded-xl'
                    onDragStart={preventDefault}
                    onContextMenu={preventDefault}
                    // @ts-ignore
                    style={{ userDrag: 'none', userSelect: 'none' }}>
                    <Image src={discoteca?.imageUrl!} alt='image' width={2000} height={300} className='object-fill ' />
                </div>
                <div className='p-5 flex flex-col gap-y-3'>

                    <div className='flex flex-col gap-1'>
                        <span className='text-xl'>Descrizione:</span>
                        <div className='text-lg flex flex-col gap-1'>{discoteca?.informazioni.map((item) => (
                            <span key={item.id}>{item.descrizione}</span>
                        ))}</div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-xl'>Posizione:</span>
                        <div className='flex flex-row justify-between'>
                            <span className='text-lg'>{discoteca?.indirizzo} {discoteca?.civico}, {discoteca?.city}</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <span className='text-xl'>Eventi futuri</span>
                        <div className=' flex flex-row overflow-x-scroll space-x-20 w-[350px] sm:w-[50vh] lg:w-[100vh] '>
                            {discoteca?.eventi.map((item) => (
                                <div className='flex flex-col items-center w-[4000px]' key={item.id} onClick={() => router.push(`/eventi/${item.id}`)}>
                                    <div className='h-32 sm:h-48 flex items-center w-[200px] lg:w-[500px] justify-center overflow-hidden rounded-xl' onDragStart={preventDefault}
                                        onContextMenu={preventDefault}
                                        // @ts-ignore
                                        style={{ userDrag: 'none', userSelect: 'none' }}>
                                        <Image src={item.imageUrl} alt='image' width={3000} height={100} className='object-contain lg:hover:scale-125 transition cursor-pointer ' />
                                    </div>
                                    <div className='flex w-[200px] sm:w-[95%] flex-col mt-2 justify-between'>
                                        <div className='text-center text-xl font-bold'>{item.nome}</div>
                                        <div className='flex justify-between'>
                                            <span className='text-blue-400'>{item.tipologiaEvento?.name}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>{item.sala?.nome}</span>
                                            <span>{formatDate(item.startDate)}</span>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>

                <div className='w-[50%] m-2 mx-auto flex items-center justify-center transition cursor-pointer bg-black rounded-full py-5 text-center border border-white group' onClick={() => dispatch(openTavoloPlease(!open))}>
                    <span className='text-xl ransition' >Prenota Tavolo</span>
                </div>
            </div>
            <PanelTavolo discoteca={discoteca}/>
        </>
    )
}

export default EventoPage