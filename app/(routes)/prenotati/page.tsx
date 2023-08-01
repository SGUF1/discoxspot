"use client"
import ViewOrders from '@/components/view-orders'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import getOrders from '@/actions/getOrders'
import { Order } from '@/type'
import LeftBar from '@/components/leftbar'


const Prenotati = () => {
  const { user } = useUser()
  const userId = user!.id;
  const [orders, setOrders] = useState<Order[]>()
  useEffect(() => {
    async function fetch() {
      setOrders((await getOrders(userId)))
    }

    fetch()
  })

  return (
    <div className='text-white'>
      <LeftBar />
      <div className='text-2xl'>Visualizza le tue prenotazioni:</div>
      <div>
        <ViewOrders orders={orders!} />
      </div>
    </div>
  )
}

export default Prenotati