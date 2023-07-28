import { cn } from '@/lib/utils'
import { openTavoloPlease } from '@/store/features/panel-tavolo-open'
import { AppDispatch, useAppSelector } from '@/store/store'
import { Data, Discoteca } from '@/type'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, format } from 'date-fns'
import Image from 'next/image'

interface PanelTavoloProps {
  discoteca: Discoteca
}
const items = [
  {
    id: "domenica",
    label: "Domenica",
    numero: 0,
  },
  {
    id: "lunedi",
    label: "Lunedì",
    numero: 1,
  },
  {
    id: "martedi",
    label: "Martedì",
    numero: 2,
  },
  {
    id: "mercoledi",
    label: "Mercoledì",
    numero: 3,
  },
  {
    id: "giovedi",
    label: "Giovedì",
    numero: 4,
  },
  {
    id: "venerdi",
    label: "Venerdì",
    numero: 5,
  },
  {
    id: "sabato",
    label: "Sabato",
    numero: 6,
  },
]
const PanelTavolo = ({ discoteca }: PanelTavoloProps) => {
  const open = useAppSelector((state) => state.open.open)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSala, setSelectedSala] = useState("");
  const [selectedPiano, setSelectedPiano] = useState("")
  const [selectedTavolo, setSelectedTavolo] = useState("")
  const toISODate = (date: string) => {
    return new Date(date).toISOString();
  };

  const setAbilitate = (date: Date) => {
    const disabledDays = items.map(item => item.numero);
    const isDateActive = discoteca?.date?.some((data) => data.type === "aperto" && data.giorni?.some((giorno) => items.find((item) => item.id === giorno)?.numero === disabledDays[date.getDay()]));
    const isDateInRangeArray = dateRangeArray.some((dates) => dates.find((data) => data === format(date, 'yyyy-MM-dd')));
    return isDateActive && !isDateInRangeArray;
  };

  const getDatesBetweenDates = (startDate: any, endDate: any) => {
    const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    return dates.map((date) => format(date, 'yyyy-MM-dd'));
  };

  const dateArray = discoteca?.date.map((item) => item.dateRange);
  const preventDefault = (event: any) => {
    event.preventDefault();
  };
  // @ts-ignore
  const dateRangeArray = dateArray.map((param) => {
    const startDate = param?.from ?? null;
    const endDate = param?.to ?? null
    return getDatesBetweenDates(startDate, endDate);
  });

  console.log(selectedDate)
  console.log(selectedPiano)
  console.log(selectedSala)
  console.log(selectedTavolo)

  return (
    <div className={cn("absolute w-full h-full p-5 space-y-5 text-white transition top-[-100%]", open ? "top-0" : "top-[-100%]")} style={{ backgroundImage: "url(/sfondo.jpg)" }}>
      <div className='text-3xl font-bold flex justify-between items-center' >
        <span>Prenotazione Tavolo</span>
        <span className='cursor-pointer' onClick={() => dispatch(openTavoloPlease(!open))}><X size={30} /></span>
      </div>
      <div className='flex space-x-4 mt-2 items-center'>
        <div className='text-xl'>
          Seleziona la data:
        </div>
        <div>
          <DatePicker
            selected={selectedDate} // value prop (current value of the date)
            // @ts-ignore
            onChange={(date) => setSelectedDate(date)} // onChange handler (function to update the date)
            filterDate={setAbilitate}
            minDate={new Date('2023-07-01')}
            dateFormat="dd-MM-yyyy"
            className='text-black rounded-2xl px-2 text-lg text-center w-[150px] p-1'
          />
        </div>
      </div>
      {selectedDate &&
        <div className='flex '>
          <div className='text-xl'>
            <span>
              Selezione piano:
            </span>
            <select className='ml-3 text-black rounded-2xl p-1 px-2 text-center text-lg' value={selectedPiano} onChange={(e) => {
              setSelectedPiano(e.target.value);
              setSelectedSala("")
              setSelectedTavolo("")
            }}>
              {discoteca.sale.map((sala) =>
                <option key={sala.id} value={sala.piano.id} className="text-lg">{sala.piano.nome}</option>)}
            </select>
          </div>
        </div>}
      {selectedPiano &&
        <div className='flex flex-col gap-4 mt-2'>
          <div className='text-xl'>Seleziona la sala:</div>
          <div className='w-full flex overflow-x-scroll h-[auto] gap-x-4 lg:gap-x-10'>
            {discoteca?.sale.map((sala) =>
              sala.pianoId === selectedPiano ? 
                <div key={sala.id} className='w-[350px]'>
                  <div className='w-[350px] rounded-2xl overflow-hidden aspect-video h-[200px] flex justify-center items-center rounded-b-none'
                    onDragStart={preventDefault}
                    onContextMenu={preventDefault}
                    // @ts-ignore
                    style={{ userDrag: 'none', userSelect: 'none' }}>
                    <Image src={sala.imageUrl} alt='image' width={600} height={200} className=' lg:hover:scale-125 transition' />
                  </div>
                  <div className='w-[full] flex flex-col space-y-2 border-t-0 border p-4 rounded-b-2xl '>
                    <div className='text-xl font-bold text-center'>{sala.nome}</div>
                    <div>
                      <div className='text-xl font-bold'>Descrizione:</div>
                      <div className='text-[16px] h-[100px] overflow-y-scroll'>
                        {sala.informazioni.map((item) => (<div key={item.id}>
                          {item.descrizione}
                        </div>))}
                      </div>
                      <div className={cn('mx-1 text-xl text-center p-2 rounded-2xl mt-3 cursor-pointer transition-colors outline-none ', sala.id === selectedSala ? 'bg-green-500 transition' : "bg-red-500 transition")}
                        onClick={() => setSelectedSala(sala.id)} >{selectedSala === sala.id ? "Selezionato" : "Seleziona"}</div>
                    </div>
                  </div>

                </div>
                : <></>
            )}
          </div>
        </div>
      }
      {selectedSala &&
        <div className='flex flex-col gap-4 mt-2'>
          <div className='text-xl'>Seleziona la sala:</div>
          <div className='w-full flex overflow-x-scroll h-[auto] gap-x-4 lg:gap-x-10'>
            {discoteca?.sale.find((sala) => sala.id === selectedSala)?.tavoli.map((tavolo) =>
              <div key={tavolo.id} className='w-[350px]'>
                <div className='w-[350px] rounded-2xl overflow-hidden aspect-video h-[200px] flex justify-center items-center rounded-b-none'>
                  <Image src={tavolo.imageUrl} alt='image' width={600} height={200} className=' lg:hover:scale-125 transition' />
                </div>
                <div className='w-[full] flex flex-col space-y-2 border-t-0 border p-4 rounded-b-2xl '>
                  <div className='text-xl font-bold text-center'>{tavolo.numeroTavolo}</div>
                  <div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default PanelTavolo
