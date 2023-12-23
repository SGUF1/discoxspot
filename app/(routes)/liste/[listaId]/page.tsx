"use client";
import {
  Discoteca,
  Evento,
  Lista,
  OrderBiglietto,
  UserAccount,
  UserAccounts,
} from "@/type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getEvento from "@/actions/getEvento";
import Image from "next/image";
import getDiscoteca from "@/actions/getDiscoteca";
import { Heart, MapPin } from "lucide-react";
import getEventi from "@/actions/getEventi";
import ViewEventi from "@/components/view-eventi";
import PanelTavolo from "@/components/panel-tavolo";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store/store";
import { cn } from "@/lib/utils";
import { openTavoloPlease } from "@/store/features/panel-tavolo-open";
import { Loader } from "@/components/loader";
import getHourse from "@/actions/getHourse";
import getLista from "@/actions/getLista";
import { format } from "date-fns";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import getUser from "@/actions/getUser";
import getOrderBiglietti from "@/actions/getBiglietti";

const EventoPage = ({ params }: { params: { listaId: string } }) => {
  const [lista, setLista] = useState<Lista>();
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const open = useAppSelector((state) => state.open.open);
  const { user } = useUser();
  const userId = user?.id;
  const [man, setMan] = useState<OrderBiglietto[]>();
  const router = useRouter();
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        setLista(await getLista(params.listaId));
        setMan(await getOrderBiglietti(userId!));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetch();
    dispatch(openTavoloPlease(false));
  }, [setLista, setLoading, params.listaId, dispatch, userId]);

  const formatDate = (data: string) => {
    const dateObject = new Date(data);
    const options = { year: "numeric", month: "long", day: "numeric" };

    // @ts-ignore
    const dataFormattata = dateObject.toLocaleDateString(undefined, options);

    return dataFormattata;
  };

  const preventDefault = (event: any) => {
    event.preventDefault();
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onCheckout = async (gender?: "m" | "f") => {
    if (man?.find((biglietto) => biglietto.listaId === params.listaId)) {
      router.push("/biglietti");
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/liste/${params.listaId}/checkout`,
        {
          userAccountId: userId,
          listaId: params.listaId,
          firstName: user?.firstName,
          lastName: user?.lastName,
          gender,
        }
      );

      window.location = response.data.url;
    }
  };

  if (!isMounted) {
    return null;
  }

  if (
    new Date(lista?.dataLimite!) <
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1,
      0,
      0
    )
  ) {
    return loading ? (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    ) : (
      <div className="flex justify-center items-center text-2xl p-52 text-white">
        LISTA NON É PIÙ DISPONIBILE
      </div>
    );
  }
  const TicketPurchaseSection = () => {
    const isTicketPurchased = man?.find(
      (biglietto) => biglietto.listaId === params.listaId
    );

    const ticketButtonClass =
      "w-full sm:w-[40%] flex items-center justify-center transition cursor-pointer bg-black rounded-full py-3 text-center border border-white group";

    if (isTicketPurchased) {
      return (
        <div
          className={ticketButtonClass}
          onClick={() => router.push("/biglietti")}
        >
          <span className="text-xl transition">Visualizza biglietto</span>
        </div>
      );
    } else if (lista?.unisex) {
      return (
        <div className={ticketButtonClass} onClick={() => onCheckout()}>
          <span className="text-xl transition">
            Compra biglietto - {lista?.prezzoBiglietto}€
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 p-2">
          <div className={ticketButtonClass} onClick={() => onCheckout("f")}>
            <span className="text-xl transition">
              Biglietto Femmina - {lista?.prezzoDonna}€
            </span>
          </div>
          <div className={ticketButtonClass} onClick={() => onCheckout("m")}>
            <span className="text-xl transition">
              Biglietto Maschio - {lista?.prezzoBiglietto}€
            </span>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div
        className={cn("text-white flex-col gap-y-5", open ? "hidden" : "flex")}
      >
        <div className="text-2xl text-center flex justify-center sm:block ">
          <span className="text-center">{lista?.nome}</span>
        </div>
        <div
          className="w-full h-52 overflow-hidden sm:h-96 flex justify-center items-center lg:rounded-xl"
          onDragStart={preventDefault}
          onContextMenu={preventDefault}
          // @ts-ignore
          style={{ userDrag: "none", userSelect: "none" }}
        >
          <Image
            src={lista?.imageUrl!}
            alt="image"
            width={2000}
            height={300}
            className="object-fill "
          />
        </div>
        <div className="p-5 flex flex-col gap-y-3 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold">Descrizione:</span>
            <div className="text-lg flex flex-col gap-2">
              {lista?.informazioni.map((item) => (
                <span key={item.id}>{item.descrizione}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold">
              {lista?.discoteca.scuola ? "Scuola" : "Discoteca"}:
            </span>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-y-2">
              <span>{lista?.discoteca.name}</span>
              <span className="flex items-center justify-center sm:justify-start">
                <MapPin className="h-5 w-5" />
                {lista?.discoteca.indirizzo} {lista?.discoteca.civico},{" "}
                {lista?.discoteca.city}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xl fond-bold">Altri dettagli lista:</span>
            <div className="flex sm:flex-row flex-col justify-between sm:items-center">
              <span className="text-center">
                {lista?.bigliettiInfiniti
                  ? "Biglietti infiniti"
                  : `Biglietti rimanenti: ${lista?.bigliettiRimanenti}`}
              </span>
              <span className="text-center">
                Costo biglietto singolo: {lista?.prezzoBiglietto}€{" "}
              </span>
              {lista?.dataLimite ? (
                <span className="text-center">
                  Termina il:{" "}
                  {format(new Date(lista.dataLimite), "MMMM do, yyyy")}
                </span>
              ) : (
                <span className="text-center">Data Limite non disponibile</span>
              )}{" "}
            </div>
          </div>
        </div>
        {/* <div
          className="w-[50%] m-2 mx-auto flex items-center justify-center transition cursor-pointer bg-black rounded-full py-3 text-center border border-white group"
          onClick={onCheckout}
        >
          <span className="text-xl ransition">
            {man?.find((biglietto) => biglietto.listaId === params.listaId)
              ? "Visualizza biglietto"
              : "Compra biglietto"}
          </span>
        </div> */}
        <TicketPurchaseSection />
      </div>
    </>
  );
};

export default EventoPage;
