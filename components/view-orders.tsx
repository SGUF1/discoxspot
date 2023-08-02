"use client"

import { Order } from '@/type'
import { format } from 'date-fns'
import { MapPin, PlusCircle, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import QrCodeGenerator from './qr/qrcodegenerator'
import axios from 'axios'

interface ViewOrdersProps {
    orders: Order[]
    user: string;
}
const ViewOrders = ({ orders, user }: ViewOrdersProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [codice, setCodice] = useState("")
    const [inputCodice, setInputCodice] = useState("")
    const [addCodice, setAddCodice] = useState(false)
    const [responseMessage, setResponseMessage] = useState()
    const preventDefault = (event: any) => {
        event.preventDefault();
    };

    const changeOpen = () => {
        setIsOpen(!isOpen)
    }
    const changeAddCodice = () => {
        setAddCodice(!addCodice)
    }
    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/prenotazione/checkout`, {
            userAccountId: user,
            codiceTavolo: inputCodice
        })

        window.location = response.data.url;
    }
    console.log(inputCodice)
    return (
        <>
            <div className='lg:-mt-10 grid grid-cols-1 overflow-y-scroll w-full  overflow-x-auto h-[80vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white' >
                {orders?.length === 0 ? <div className="flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[80vh] flex-col">
                    <div>Nessun ordine trovato</div>
                    <div>Clicca sul + per unirti a un tavolo</div>
                </div> : orders?.map((item) => (
                    <div className='flex flex-col items-center' key={item.id} >
                        <div className='h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl'
                            onDragStart={preventDefault}
                            onContextMenu={preventDefault}
                            // @ts-ignore
                            style={{ userDrag: 'none', userSelect: 'none' }}>
                            <Image src={item.tavolo.imageUrl} alt='image' width={1000} height={100} className='object-contain lg:hover:scale-125 transition hover:cursor-pointer ' onClick={() => { }} />
                        </div>
                        <div className='flex w-[95%] sm:w-[95%]  mt-2 justify-between' >
                            <div className='flex flex-col gap-1' onClick={() => { }}>
                                <div>{item.tavolo.numeroTavolo}</div>
                                <div>{item.discoteca.name}</div>
                                <div className='flex '><MapPin size={20} /><span className='ml-1'>{item.discoteca.indirizzo} {item.discoteca.civico}, {item.discoteca.city}, {item.discoteca.provincia.name}</span></div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span>{format(new Date(item.orderDate), "MMMM do, yyyy")}</span>
                                <span className="text-right text-xl font-bold" onClick={() => {
                                    changeOpen();
                                    setCodice(item.codice)
                                }}>{item.codice}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='fixed top-[88vh] right-10 lg:right-20 ' onClick={changeAddCodice}><PlusCircle className='h-10 w-10' /></div>
            </div>
            <div className={`bg-black absolute top-0 flex-col space-y-20 text-white left-[-20px] z-20 justify-center items-center text-xl font-bold h-full w-full ${isOpen ? 'flex' : 'hidden'}`}
                onClick={() => {
                    changeOpen();
                    setCodice("");
                }}>
                <div>Clicca da qualsiasi parte per uscire</div>
                {codice !== "" && <QrCodeGenerator data={codice} />}
            </div>
            <div className={` absolute flex-col left-[50%] p-5 bg-black rounded-xl space-y-10 w-[30vh] sm:w-[60vh] border translate-x-[-50%]  justify-center top-[40%] ${addCodice ? 'flex' : 'hidden'}`}>
                <div className='flex justify-between text-2xl '>
                    <div>Inserisci il codice:</div>
                    <div onClick={changeAddCodice} ><X className='h-7 w-7 cursor-pointer' /></div>
                </div>
                <div className=''>
                    <input className='w-full p-3 rounded-xl text-lg text-black font-bold text-center' value={inputCodice} onChange={(e) => setInputCodice(e.target.value)} />
                </div>
                <div className='flex items-center justify-center flex-col gap-3'>
                    <button className='w-full text-white text-lg border p-2 rounded-xl' onClick={onCheckout}>CONTROLLA E PAGA</button>
                    <div className='text-lg'>{responseMessage}</div>
                </div>
            </div>
        </>
    )
}

export default ViewOrders