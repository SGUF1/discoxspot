import { Order } from '@/type'
import React from 'react'

interface ViewOrdersProps {
    orders: Order[]
}
const ViewOrders = ({ orders }: ViewOrdersProps) => {
    return (
        <div className='grid grid-cols-4'>
            {orders.map((item) => (
                <div key={item.id}>
                    {item.tavolo.numeroTavolo}
                </div>
            ))}
        </div>
    )
}

export default ViewOrders