import { StringMappingType } from "typescript";

export interface UserAccount {
  id: string;
  name: string;
  discoteche: Discoteca[]
}

export interface Discoteca {
  id: string;
  name: string;
  cap: string;
  indirizzo: string;
  provinciaId: string;
  caparra: boolean;
  visibile: boolean;
  imageUrl: string;
  priority: number;
  maximumOrderDate: number;
  civico: number;
  city: string;
  piani: Piano[]
  provincia: Provincia;
  informazioni: Informazione[];
  eventi: Evento[];
  sale: Sala[];
  date: Data[]
  like: number
  userAccounts: UserAccounts[]
}

export interface UserAccounts{
  id: string;
  discoteche: Discoteca[]
}
export interface Provincia {
  id: string;
  name: string;
}

export interface Piano {
  id: string;
  nome: string;
  discoteca: Discoteca;
}

export interface Informazione {
  id: string;
  descrizione: string;
  numeroInformazione: string;
  discotecaId: string;
  tipoInformazioneId: string;
  tipoInformazione: TipoInformazione;
  discoteca: Discoteca;
}

export interface TipoInformazione {
  id: string;
  nome: string;
  informazioni: Informazione[];
}

export interface Evento {
  id: string;
  nome: string;
  imageUrl: string;
  discotecaId: string;
  discoteca: Discoteca;
  startDate: string;
  endDate: string;
  prioriti: string;
  tipologiaEventoId: string;
  tipologiaEvento: TipologiaEvento;
  eventoSala: Boolean;
  salaId?: string;
  sala?: Sala;
  informazioni: Informazione[];
  oraInizio: string;
  oraFine: string;
}

export interface TipologiaEvento{
    id: string
    name: string
    eventi: Evento[]
}

export interface Sala{
    id: string;
    nome: string
    imageUrl: string;
    discotecaId: string;
    discoteca: Discoteca
    tavoli: Tavolo[]
    eventi: Evento[]
    date: Data[]
    statoId: string
    stato: Stato
    pianoId: string;
    piano: Piano
    informazioni: Informazione[]
}

export interface Data{
  id: string;
  salaId?: string;
  giorni?: string[],
  dateRange?: {from: string, to: string},
  discotecaId: string;
  type?: string
  data?: string
  sala?: Sala,
  discoteca: Discoteca,
  createdAt: string;
  updatedAt: string;
}

export interface Posto{
    id: string;
    numero: number;
    tavoloId: string;
    tavolo: Tavolo
    stato: Stato
}

export interface Stato{
    id: string;
    nome: string
    tavoli: Tavolo[]
    posti: Posto[]
    sale: Sala[]
    order: Order[]
    colore: string
}

export interface Posizione{
    id: string;
    nome: string;
    tavoli: Tavolo[]
}

export interface Tavolo{
    id: string;
    numeroTavolo: string;
    posizioneId: string
    posizione: Posizione
    posti: Posto[]
    salaId: string;
    sala: Sala
    numeroMinimo: number | 0,
    descrizione: string;
    prezzo: string;
    imageUrl: string;
    statoId: string;
    stato: Stato;
    orderItems: OrderItem[]
}

export interface Menu{
    id: string;
    nome: string;
    discotecaId: string;
    portate: Portata[]
    isVisible: boolean
    discoteca: Discoteca
}

export interface Prodotto{
    id: string;
    nome: string;
    portataId: string;
    portata: Portata;
    descrizione: string;
    prezzo: number;
    orderItems: OrderItem[]
}

export interface Portata{
    id: string;
    nome: string;
    menuId: string;
    menu: Menu
    prodotti: Prodotto[]
    numeroPortata: number;
    lastPortata: boolean
}

export interface OptionProdotto{
    id: string;
    nome: string;
}

export interface Order{
    id: string;
    discotecaId: string;
    discoteca: Discoteca;
    orderItems: OrderItem[]
    isPaid: boolean;
    phone: string;
    orderDate: Date;
    expiredDate: Date;
    statoId: string
    stato: Stato
}

export interface OrderItem{
    id: string
    orderId: string;
    order: Order;
    tavoloId: string;
    tavolo: Tavolo;
    prodottoId: String;
    prodotto: Prodotto;
}