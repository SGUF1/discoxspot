import { cn } from '@/lib/utils'
import { openTavoloPlease } from '@/store/features/panel-tavolo-open'
import { AppDispatch, useAppSelector } from '@/store/store'
import { Data, Discoteca, Piano, Portata, Prodotto, Sala, Tavolo } from '@/type'
import { Minus, Plus, Salad, X } from 'lucide-react'
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

  interface ProdottoConQuantity {
    prodotto: Prodotto,
    quantita: number;
  }
  interface PortataConProdotti {
    portata: Portata;
    prodottiConQuantita: ProdottoConQuantity[];
  }
  const open = useAppSelector((state) => state.open.open)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSala, setSelectedSala] = useState<Sala>();
  const [selectedPiano, setSelectedPiano] = useState<Piano>()
  const [selectedTavolo, setSelectedTavolo] = useState<Tavolo>()
  const [selectedNumeroPersone, setNumeroPersone] = useState(0)
  const [minimoPersone, setMinimoPersone] = useState(0)
  const [massimoPersone, setMassimoPersone] = useState(0)
  const [selectedBibita, setSelectedBibita] = useState<PortataConProdotti[]>([])
  const aggiungiProdotto = (prodotto: Prodotto, quantita: number) => {
    if (isNaN(quantita)) {
      quantita = 1;
    }

    const existingPortata = selectedBibita.find((item) => item.portata.id === prodotto.portataId);
    const totaleBibite = selectedBibita.find((sele) => sele.portata.id === prodotto.portataId)?.portata.numeroBibiteTotale ?? 0
    const totaleBibitePres = totaleBibitePresenti(prodotto.portataId)
  if(totaleBibitePres < totaleBibite){
    if (existingPortata) {
      const existingProdotto = existingPortata.prodottiConQuantita.find((item) => item.prodotto.id === prodotto.id);
      if (existingProdotto) {
        aumentaQuantitaProdotto(existingPortata.portata, prodotto);
      } else {
        const numeroBibiteDiverse = existingPortata.portata.numeroBibiteDiverse ?? 0;
        const numeroProdottiConQuantita = existingPortata.prodottiConQuantita.length;
        if (numeroBibiteDiverse > numeroProdottiConQuantita) {
          setSelectedBibita((prev) => [
            ...prev.map((item) =>
              item.portata.id === prodotto.portataId
                ? {
                  ...item,
                  prodottiConQuantita: [
                    ...item.prodottiConQuantita,
                    {
                      prodotto,
                      quantita,
                    },
                  ],
                }
                : item
            ),
          ]);
        }
      }
    } else {
      const portata = discoteca.menu
        .map((menu) => menu.portate.find((portata) => portata.id === prodotto.portataId))
        .find((portata) => portata !== undefined);

      if (portata) {
        setSelectedBibita((prev) => [
          ...prev,
          {
            portata,
            prodottiConQuantita: [
              {
                prodotto,
                quantita,
              },
            ],
          },
        ]);
      }
    }
  }
    
  };
  const aumentaQuantitaProdotto = (portata: Portata, prodotto: Prodotto) => {
    const totaleBibite = selectedBibita.find((sele) => sele.portata.id === portata.id)?.portata.numeroBibiteTotale ?? 0
    const totaleBibitePres = totaleBibitePresenti(portata.id)
    if(totaleBibite > totaleBibitePres){
      if (selectedBibita.find((sele) => sele.portata.id === portata.id)?.prodottiConQuantita.find((prod) => prodotto.id === prod.prodotto.id)?.quantita! < prodotto.limite)
        setSelectedBibita((prev) => [
          ...prev.map((item) =>
            item.portata.id === portata.id
              ? {
                ...item,
                prodottiConQuantita: item.prodottiConQuantita.map((prodottoItem) =>
                  prodottoItem.prodotto.id === prodotto.id
                    ? {
                      ...prodottoItem,
                      quantita: prodottoItem.quantita + 1,
                    }
                    : prodottoItem
                ),
              }
              : item
          ),
        ]);
    }
  };

  const totaleBibitePresenti = (portataId: string) => {
    const totale = selectedBibita.reduce((acc, sele) => {
      if (sele.portata.id === portataId) {
        return acc + sele.prodottiConQuantita.reduce((accProdotti, prodotto) => accProdotti + prodotto.quantita, 0);
      }
      return acc;
    }, 0);

    return totale;
  };
  const diminuisciQuantitaProdotto = (portata: Portata, prodotto: Prodotto) => {
    setSelectedBibita((prev) =>
      prev.map((item) =>
        item.portata.id === portata.id
          ? {
            ...item,
            prodottiConQuantita: item.prodottiConQuantita.map((prodottoItem) =>
              prodottoItem.prodotto.id === prodotto.id
                ? {
                  ...prodottoItem,
                  quantita: Math.max(prodottoItem.quantita - 1, 0), // Impedisci che la quantità scenda sotto 0
                }
                : prodottoItem
            ).filter((prodottoItem) => prodottoItem.quantita > 0), // Rimuovi l'elemento se la quantità è 0
          }
          : item
      )
    );
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
  console.log(selectedNumeroPersone)
  return (
    <div className={cn("absolute w-full h-full p-5 space-y-5 text-white transition top-[-100%]", open ? "top-0" : "top-[-300%]")} style={{ backgroundImage: "url(/sfondo.jpg)" }}>
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
            <select className='ml-3 text-black rounded-2xl p-1 px-2 text-center text-lg' value={selectedPiano?.id} defaultValue={""} onChange={(e) => {
              setSelectedPiano(discoteca.piani.find((item) => item.id === e.target.value));
              setSelectedSala(undefined)
              setSelectedTavolo(undefined)
              setNumeroPersone(0)
            }}>
              {discoteca.piani.map(element =>
                <option key={element.id} value={element.id} className="text-lg">{element.nome}</option>)}
            </select>
          </div>
        </div>}
      {selectedPiano &&
        <div className='flex flex-col gap-4 mt-2'>
          <div className='text-xl'>Seleziona la sala:</div>
          <div className='w-full flex overflow-x-scroll h-[auto] gap-x-4 lg:gap-x-10'>
            {discoteca?.sale.map((sala) =>
              sala.pianoId === selectedPiano.id ?
                <div key={sala.id} className='w-[350px]'>
                  <div className='w-[350px] rounded-2xl overflow-hidden aspect-video h-[200px] flex justify-center items-center rounded-b-none'
                    onDragStart={preventDefault}
                    onContextMenu={preventDefault}
                    // @ts-ignore
                    style={{ userDrag: 'none', userSelect: 'none' }}>
                    <Image src={sala.imageUrl} alt='image' width={600} height={200} className=' lg:hover:scale-125 transition' priority />
                  </div>
                  <div className='w-[full] flex flex-col space-y-2 border-t-0 border p-4 rounded-b-2xl '>
                    <div className='text-2xl font-bold flex justify-between items-center '>
                      <div className='flex-1 '>{sala.nome}</div>
                      <div className='w-5 h-5 rounded-full border ' style={{ background: `${sala.stato?.colore}` }} />
                    </div>
                    <div>
                      <div className='text-xl font-bold'>Descrizione:</div>
                      <div className='text-[16px] h-[100px] overflow-y-scroll'>
                        {sala.informazioni.map((item) => (<div key={item.id}>
                          {item.descrizione}
                        </div>))}
                      </div>
                      <div className={cn('mx-1 text-xl text-center p-2 rounded-2xl mt-3 cursor-pointer transition-colors outline-none ', sala.id === selectedSala?.id ? 'bg-green-500 transition' : "bg-red-500 transition")}
                        onClick={() => {
                          setSelectedSala(sala)
                          setNumeroPersone(0)
                        }} >{selectedSala?.id === sala.id ? "Selezionato" : "Seleziona"}</div>
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
          <div className='text-xl'>Seleziona il tavolo:</div>
          <div className='w-full flex overflow-x-scroll h-[auto] gap-x-4 lg:gap-x-10'>
            {discoteca?.sale.find((sala) => sala.id === selectedSala.id)?.tavoli.map((tavolo) =>
              <div key={tavolo.id} className='w-[350px]'>
                <div className='w-[350px] rounded-2xl overflow-hidden aspect-video h-[200px] flex justify-center items-center rounded-b-none'
                  onDragStart={preventDefault}
                  onContextMenu={preventDefault}
                  // @ts-ignore
                  style={{ userDrag: 'none', userSelect: 'none' }}>
                  <Image src={tavolo.imageUrl} alt='image' width={600} height={200} className=' lg:hover:scale-125 transition' priority />
                </div>
                <div className='w-[full] flex flex-col space-y-2 border-t-0 border p-4 rounded-b-2xl  '>
                  <div className='text-xl font-bold flex items-center justify-between relative'>
                    <div>{tavolo.prezzo}€</div>
                    <div className=' w-full absolute text-center '>{tavolo.numeroTavolo}</div>
                    <div className='w-5 h-5 rounded-full border ' style={{ background: `${tavolo.stato?.colore}` }} />
                  </div>
                  <div>
                    <div>Descrizione:</div>
                    <div className='h-[100px] overflow-y-scroll'>{tavolo.descrizione}</div>
                  </div>
                  <div>
                    <div><span>Limite minimo: </span> <span>{tavolo.numeroMinimo}</span></div>
                    <div><span>Limite massimo: </span> <span>{tavolo.posti.length}</span></div>
                  </div>
                  <div className={cn('mx-1 text-xl text-center p-2 rounded-2xl mt-3 cursor-pointer transition-colors outline-none ', tavolo.id === selectedTavolo?.id ? 'bg-green-500 transition' : "bg-red-500 transition")}
                    onClick={() => {
                      setSelectedTavolo(selectedSala.tavoli.find((tavol) => tavol.id === tavolo.id));
                      setNumeroPersone(0)
                    }} >{selectedTavolo?.id === tavolo.id ? "Selezionato" : "Seleziona"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      {selectedTavolo &&
        <div className='flex sm:space-x-2 flex-col'>
          <div className='flex  items-center'>
            <div className='text-xl'>Inserisci numero persone:</div>
            <input value={selectedNumeroPersone} onChange={(e) => setNumeroPersone(Number(e.target.value))} type='number' className='rounded-2xl px-2 p-1 w-[100px] ml-2 sm:w-[150px] lg:w-[200px] text-center items-center text-black' />
          </div>
          {selectedNumeroPersone < selectedTavolo?.numeroMinimo! && <span className='text-red-500 text-lg'>Il numero minimo di persone deve essere maggiore/uguale al minimo </span>}
          {selectedNumeroPersone > selectedTavolo?.posti.length! && <span className='text-red-500 text-lg'>Il numero minimo di persone deve essere minore/uguale al massimo </span>}
        </div>}
      {((selectedTavolo?.numeroMinimo! <= selectedNumeroPersone) && (selectedNumeroPersone <= selectedTavolo?.posti.length!)) &&
        <div>
          <div className='text-xl'>Menu</div>
          <div>
            {discoteca.menu.map((item) =>
              <div key={item.id}>
                <div>
                  {item.portate.map((portata) =>
                    <div key={portata.id}>
                      <span className='text-lg'>{portata.nome}</span>
                      <div className='flex flex-row overflow-x-scroll gap-x-4 lg:gap-x-10'>
                        {portata.prodotti.map((prodotto) =>
                          <div key={prodotto.id} className='w-[350px]'>
                            <div className='w-[350px] rounded-2xl overflow-hidden aspect-video h-[200px] flex justify-center items-center rounded-b-none'
                              onDragStart={preventDefault}
                              onContextMenu={preventDefault}
                              // @ts-ignore
                              style={{ userDrag: 'none', userSelect: 'none' }}>
                              <Image src={prodotto.imageUrl} alt='image' width={600} height={200} className=' lg:hover:scale-125 transition' priority />
                            </div>
                            <div className='w-[full] flex flex-col space-y-2 border-t-0 border p-4 rounded-b-2xl  '>
                              <div className='text-xl font-bold flex items-center justify-between relative'>
                                <div>{prodotto.prezzo}€</div>
                                <div className=' w-full absolute text-center '>{prodotto.nome}</div>
                                <div>{selectedBibita.find((sele) => sele.portata.id === portata.id)?.prodottiConQuantita?.find((prod) => prod?.prodotto.id === prodotto.id)?.quantita ?? 0}</div>
                              </div>
                              <div>
                                <div>Descrizione:</div>
                                <div className='h-[100px] overflow-y-scroll'>{prodotto.descrizione}</div>
                              </div>
                              <div className='flex items-center justify-evenly h-[50px]'>
                                {selectedBibita.find((item) => item.portata.id === portata.id)?.prodottiConQuantita?.find((prod) => prod?.prodotto.id === prodotto.id) && <div className=' flex items-center justify-center p-2 rounded-full bg-red-500 cursor-pointer'
                                  onClick={() => diminuisciQuantitaProdotto(portata, prodotto)}>
                                  <Minus size={19} />
                                </div>}

                                <div className={cn('mx-1 text-xl text-center p-2 w-[150px]  rounded-2xl  cursor-pointer  transition-colors outline-none ', selectedBibita.find((item) => item.portata.id === portata.id)?.prodottiConQuantita?.find((prod) => prod?.prodotto.id === prodotto.id) ? 'bg-green-500 transition' : "bg-red-500 transition")}
                                  onClick={() => {
                                    aggiungiProdotto(prodotto, selectedBibita.find((sele) => sele.portata.id === portata.id)?.prodottiConQuantita?.find((prod) => prod?.prodotto.id === prodotto.id)?.quantita!)
                                  }} >

                                  {selectedBibita.find((item) => item.portata.id === portata.id)?.prodottiConQuantita?.find((prod) => prod?.prodotto.id === prodotto.id) ? "Selezionato" : "Seleziona"}

                                </div>

                                {selectedBibita.find((item) => item.portata.id === portata.id)?.prodottiConQuantita?.find((prod) => prod?.prodotto.id === prodotto.id) && <div className=' flex items-center justify-center p-2 rounded-full bg-green-500 cursor-pointer'
                                  onClick={() => aumentaQuantitaProdotto(portata, prodotto)}>
                                  <Plus size={19} />
                                </div>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
