import { Order } from '@/type'
import { format } from 'date-fns'
import { MapPin, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ViewOrdersProps {
    orders: Order[]
}
const ViewOrders = ({ orders }: ViewOrdersProps) => {
    const preventDefault = (event: any) => {
        event.preventDefault();
    };
    return (
        <div className='lg:-mt-10 grid grid-cols-1 overflow-y-scroll w-full  overflow-x-auto h-[80vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white relative' >
            {orders?.length === 0 ? <div className="flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[70vh] flex-col">
                <span>Nessun ordine trovato</span>
                <span>Clicca sul + per unirti a un tavolo</span>
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
                            <div className='flex '><MapPin size={20} /><span className='ml-1'>{item.discoteca.indirizzo} {item.discoteca.civico}, {item.discoteca.cap}, {item.discoteca.provincia.name}</span></div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span>{format(new Date(item.orderDate), "MMMM do, yyyy")}</span>
                            <span className="text-right text-xl font-bold">{item.codice}</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className='fixed top-[88vh] right-10 lg:right-20 '><PlusCircle className='h-10 w-10' /></div>
        </div>
    )
}

export default ViewOrders