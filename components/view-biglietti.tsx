"use client"

import { OrderBiglietto } from '@/type'
import { format } from 'date-fns'
import { MapPin, PlusCircle, Share, Share2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import QrCodeGenerator from './qr/qrcodegenerator'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import { Loader } from './loader'
import useUserIdSet from '@/hooks/use-userId'
import { useUser } from '@clerk/nextjs'
import getOrderBiglietti from '@/actions/getBiglietti'


const ViewBiglietti = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<OrderBiglietto[]>()
    const [isMounted, setIsMounted] = useState(false);
    const { user } = useUser()

    const userId = user?.id
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const allBiglietti = await getOrderBiglietti(userId!);

                setOrders(allBiglietti);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }
        if (userId) {
            fetchData();
        }

    }, [userId]);
    const preventDefault = (event: any) => {
        event.preventDefault();
    };
    const searchParams = useSearchParams()
    useEffect(() => {
        async function fun() {
            if (searchParams.get("codice")) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/prenotazione/checkout`, {
                    userAccountId: userId,
                    codiceTavolo: searchParams.get("codice")
                })

                window.location = response.data.url;
            }
        }
        fun()
    })

    const shareContent = async (codice: string) => {
        try {
            await navigator.share({
                title: 'DiscoXSpot',
                text: `Unisciti al nostro mitico tavolo`,
                url: `https://discospot.vercel.app/liste/${codice}`,
            });
        } catch (error) {
            console.error('Errore nella condivisione:', error);
        }
    };
    const [isOpen, setIsOpen] = useState(false)
    const [codice, setCodice] = useState("")

    const changeOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (loading) {
        return <div className='justify-center items-center flex w-full'><Loader /></div>
    }
    if (!isMounted) {
        return null;
    }
    return (
        <>
            <div className='lg:-mt-10 grid grid-cols-1  -mt-4 overflow-y-scroll w-full  overflow-x-auto h-[80vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white' >
                {orders?.length === 0 ? <div className="flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[80vh] flex-col">
                    <div>Nessun biglietto trovato</div>
                </div> : orders?.map((item) => (
                    <div className='flex flex-col items-center' key={item.id} >
                        <div className='h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl'
                            onDragStart={preventDefault}
                            onContextMenu={preventDefault}
                            // @ts-ignore
                            style={{ userDrag: 'none', userSelect: 'none' }}>
                            <Image src={item.lista.imageUrl} alt='image' width={1000} height={100} className='object-contain lg:hover:scale-125 transition hover:cursor-pointer ' onClick={() => { }} />
                        </div>
                        <div className='flex w-[95%] sm:w-[95%]  mt-2 justify-between' >
                            <div className='flex flex-col gap-1' onClick={() => { }}>
                                <div>{item.lista.discoteca.name}</div>
                                <div className='flex '><MapPin size={20} /><span className='ml-1'>{item.lista.discoteca.indirizzo} {item.lista.discoteca.civico}, {item.lista.discoteca.city}, {item.lista.discoteca.provincia.name}</span></div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span>{format(new Date(item.lista.dataLimite), "MMMM do, yyyy")}</span>
                                <span className="text-right text-xl font-bold cursor-pointer" onClick={() => { changeOpen(); setCodice(item.codice!) }}>{item.codice}</span>
                                <span className='flex justify-end cursor-pointer' onClick={() => shareContent(item.listaId)}>
                                    <Share2 className='h-5 w-5' />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`bg-black absolute top-0 flex-col space-y-20 text-white left-[-20px] z-20 justify-center items-center text-xl font-bold h-full w-full ${isOpen ? 'flex' : 'hidden'}`}
                onClick={() => {
                    changeOpen();
                    setCodice("");
                }}>
                <div>Clicca da qualsiasi parte per uscire</div>
                {codice !== "" && <QrCodeGenerator data={codice} />}
            </div>
        </>
    )
}

export default ViewBiglietti