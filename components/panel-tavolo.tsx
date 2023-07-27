import { cn } from '@/lib/utils'
import { openTavoloPlease } from '@/store/features/panel-tavolo-open'
import { AppDispatch, useAppSelector } from '@/store/store'
import { Discoteca } from '@/type'
import { X } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

interface PanelTavoloProps{
  discoteca: Discoteca
}

const PanelTavolo = ({discoteca}: PanelTavoloProps) => {
  const open = useAppSelector((state) => state.open.open)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className={cn("absolute w-full h-full p-5 text-white transition top-[-100%]", open ? "top-0" : "top-[-100%]")} style={{ backgroundImage: "url(/sfondo.jpg)"}}>
      <div className='text-3xl font-bold flex justify-between '>
        <span>Prenotazione Tavolo</span>
        <span className='cursor-pointer' onClick={() => dispatch(openTavoloPlease(!open))}><X size={30}/></span>
      </div>
      <div>
        <div className='text-xl'>
          Seleziona la data:
        </div>
     
      </div>
    </div>
  )
}

export default PanelTavolo