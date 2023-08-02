"use client"
import ViewOrders from '@/components/view-orders'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import getOrders from '@/actions/getOrders'
import { Order } from '@/type'
import LeftBar from '@/components/leftbar'
import { Loader } from '@/components/loader'


const Prenotati = () => {
  const { user } = useUser()
  const userId = user?.id;
  const [orders, setOrders] = useState<Order[]>()
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetch() {
      try{
        setLoading(true)
        setOrders((await getOrders(userId!)))
      }catch(error: any){
        console.log("Errore nel trovare gli ordini")
      }finally{
        setLoading(false)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return null;
  }


  return (
    <div className='p-5 text-white lg:p-10 lg:px-20 h-[80vh] '>
      <div className='flex space-x-5'>
        <LeftBar />
        <ViewOrders orders={orders!} user={userId!} />
      </div>
    </div>
  )
}

export default Prenotati