"use client";

import getDiscoteca from "@/actions/getDiscoteca";
import getUser from "@/actions/getUser";
import likeToDiscoteca from "@/actions/likeToDiscoteca";
import { cn } from "@/lib/utils";
import {
  Discoteca,
  Evento,
  Lista,
  Order,
  OrderBiglietto,
  UserAccounts,
} from "@/type";
import { Heart, MapPin, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QrCodeGenerator from "./qr/qrcodegenerator";
import { format } from "date-fns";
import axios from "axios";

interface ModelViewProps {
  discoteca?: Discoteca;
  user?: UserAccounts;
  evento?: Evento;
  lista?: Lista;
  tavolo?: Order;
  biglietto?: OrderBiglietto;
  //   handleOnHeart?: (item: Discoteca) => Promise<void>;
}

const ModelView: React.FC<ModelViewProps> = ({
  discoteca,
  evento,
  lista,
  user,
  tavolo,
  biglietto,
  //   handleOnHeart,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnHeart = async () => {
    try {
      setIsLoading(true);
      await likeToDiscoteca(user?.id!, discoteca?.id!);
      await fetch();
    } catch (error) {
      console.error("Error while liking discoteca:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const router = useRouter();

  const preventDefault = (event: any) => {
    event.preventDefault();
  };
  const [userProfile, setUserProfile] = useState<UserAccounts>(user!);

  const fetch = async () => {
    try {
      setUserProfile(await getUser(user?.id!));
    } catch (err) {
      console.log(err);
    }
  };
  const shareBiglietto = async (codice: string) => {
    try {
      await navigator.share({
        title: `discoXspot\n${
          biglietto?.codice === codice && biglietto.lista.discoteca.name
        }`,

        text: `Compra anche tu il biglietto e divertiti con me!\n`,
        url: `https://app.discoxspot.com/liste/${codice}`,
      });
    } catch (error) {
      console.error("Errore nella condivisione:", error);
    }
  };

  const shareTavolo = async (codice: string) => {
    try {
      await navigator.share({
        title: "DiscoXSpot",
        text: `Unisciti anche tu al mio tavolo e divertiti con me\n`,
        url: `https://app.discoxspot.com/prenotati?codice=${codice}`,
      });
    } catch (error) {
      console.error("Errore nella condivisione:", error);
    }
  };
  const formatDate = (data: string) => {
    const dateObject = new Date(data);
    const options = { year: "numeric", month: "long", day: "numeric" };

    // @ts-ignore
    const dataFormattata = dateObject.toLocaleDateString(undefined, options);

    return dataFormattata;
  };
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fun() {
      if (searchParams.get("codice")) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/prenotazione/checkout`,
          {
            userAccountId: user?.id,
            codiceTavolo: searchParams.get("codice"),
          }
        );

        window.location = response.data.url;
      }
    }
    fun();
  });
  return (
    <div className="">
      {discoteca && (
        <div
          onClick={() => router.push(`/${discoteca.id}`)}
          className="p-4 group rounded items-center shadow-xl cursor-pointer transition hover:scale-105  hover:shadow-red-600 shadow-black flex flex-col justify-center space-y-2"
        >
          <div className=" flex flex-col h-full w-full justify-center space-y-4">
            <div
              className="relative  w-full aspect-video "
              onDragStart={preventDefault}
              onContextMenu={preventDefault}
              // @ts-ignore
              style={{ userDrag: "none", userSelect: "none" }}
            >
              <Image
                src={discoteca.imageUrl}
                alt="img"
                fill
                className="rounded-xl hover:scale-105 transition"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col -space-y-2">
                <h2 className="text-lg font-semibold mb-2">{discoteca.name}</h2>
                <span className="text-xs text-gray-400 flex items-start">
                  <MapPin size={15} /> {discoteca.indirizzo} {discoteca.civico},{" "}
                  {discoteca.provincia.name}
                </span>
              </div>
              <button
                disabled={isLoading}
                className={cn(
                  "outline-none ",
                  isLoading ? "cursor-wait" : "cursor-pointer"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnHeart();
                }}
              >
                <Heart
                  fill={cn(
                    "",
                    userProfile?.discoteche.find(
                      (item) => item.id === discoteca.id
                    )
                      ? "red"
                      : "white"
                  )}
                  color={`${userProfile?.discoteche.find((item) =>
                    item.id === discoteca.id ? "red" : "white"
                  )}`}
                />
              </button>
            </div>
          </div>
          <span className="h-[2px] w-0 group-hover:w-full bg-red-500 duration-300" />
        </div>
      )}
      {evento && (
        <div
          onClick={() => router.push(`/eventi/${evento.id}`)}
          className="p-4 group rounded items-center shadow-xl cursor-pointer transition hover:scale-105  hover:shadow-red-600 shadow-black flex flex-col justify-center space-y-2 "
        >
          <div className="flex flex-col h-full w-full justify-center space-y-4">
            <div
              className="relative  w-full aspect-video "
              onDragStart={preventDefault}
              onContextMenu={preventDefault}
              // @ts-ignore
              style={{ userDrag: "none", userSelect: "none" }}
            >
              <Image
                src={evento.imageUrl}
                alt="img"
                fill
                className="rounded-xl hover:scale-105 transition"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col -space-y-2">
                <h2 className="text-lg font-semibold mb-2">{evento.nome}</h2>
                <div className="flex flex-col group-[1] ">
                  <Link
                    href={`/${evento.discoteca.id}`}
                    className="underline text-xs text-gray-400 flex items-start"
                  >
                    {evento.discoteca.name}
                  </Link>
                </div>
              </div>
              <div className="text-sm">{formatDate(evento.endDate)}</div>
            </div>
          </div>
          <span className="h-[2px] w-0 group-hover:w-full bg-red-500 duration-300" />
        </div>
      )}
      {lista && (
        <div
          onClick={() => router.push(`/liste/${lista.id}`)}
          className="p-4 group rounded items-center shadow-xl cursor-pointer transition hover:scale-105  hover:shadow-red-600 shadow-black flex flex-col justify-center space-y-2 "
        >
          <div className="flex flex-col h-full w-full justify-center space-y-4">
            <div
              className="relative  w-full aspect-video "
              onDragStart={preventDefault}
              onContextMenu={preventDefault}
              // @ts-ignore
              style={{ userDrag: "none", userSelect: "none" }}
            >
              <Image
                src={lista.imageUrl}
                alt="img"
                fill
                className="rounded-xl hover:scale-105 transition"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col -space-y-2">
                <h2 className="text-lg font-semibold mb-2">{lista.nome}</h2>
                <div className="flex flex-col group-[1]">
                  <Link
                    href={`/${lista.discoteca.id}`}
                    className="underline text-xs text-gray-400 flex items-start"
                  >
                    {lista.discoteca.name}
                  </Link>
                </div>
              </div>
              <div className="text-sm">{formatDate(lista.dataLimite)}</div>
            </div>
          </div>
          <span className="h-[2px] w-0 group-hover:w-full bg-red-500 duration-300" />
        </div>
      )}
      {biglietto && (
        <div className="flex flex-col overflow-hidden ">
          <div className="flex flex-col space-y-5 bg-[#3B3B3B]  rounded-t-xl">
            {/* titolo */}
            <div className="px-5 py-2 bg-red-500 rounded-t-xl text-center font-bold">
              {biglietto.lista.discoteca.name}
            </div>
            <div className="flex flex-col px-5 space-y-4   ">
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <span className="uppercase text-sm">Nome lista</span>
                  <span className="font-bold">{biglietto.lista.nome}</span>
                </div>
                <div className="flex flex-col sm:hidden">
                  <span className="uppercase text-sm">Nome Cognome</span>
                  <span className="font-bold">
                    {user?.name} {user?.surname}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="uppercase text-sm">Nome Cognome</span>
                <span className="font-bold">
                  {user?.name} {user?.surname}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start sm:justify-normal">
                <span className="uppercase text-sm">Data</span>
                <span className="font-bold">
                  {formatDate(biglietto.lista.dataLimite)}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center pb-5 sm:items-start sm:justify-normal">
                <span
                  className=" underline"
                  onClick={() => shareBiglietto(biglietto?.codice!)}
                >
                  INVITA AMICO/A
                </span>
              </div>
            </div>
          </div>
          <div className="flex relative">
            <span className="absolute bg-[#1F1F1F] -top-3 -left-3 h-6 w-6  rounded-full" />
            <span className="border-2 border-[#1f1f1f] border-dashed w-full" />
            <span className="absolute bg-[#1F1F1F] -top-3 -right-3 h-6 w-6  rounded-full" />
          </div>
          <div className="flex flex-col -mt-1 space-y-10 bg-[#3B3B3B] pb-14 rounded-b-xl">
            <div className="px-5 py-2 bg-red-500 rounded-t-xl text-center font-bold">
              CODICE
            </div>
            {biglietto.confermato ? (
              <div className="relative ">
                <div className="text-center flex flex-col text-2xl  font-bold tracking-widest">
                  {biglietto.codice}
                </div>
                <div className="flex justify-center items-center ">
                  <QrCodeGenerator data={biglietto.codice!} />
                </div>
                <div className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl -rotate-45 font-bold text-red-500 space-y-5">
                  <span className="text-white py-3 px-5 border-red-600 border-[10px]">
                    DISCO<span className="text-red-600">X</span>SPOT
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center flex flex-col text-2xl  font-bold tracking-widest">
                  {biglietto.codice}
                </div>
                <div className="flex justify-center items-center ">
                  <QrCodeGenerator data={biglietto.codice!} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {tavolo && (
        <div className="flex flex-col  ">
          <div className="flex flex-col space-y-5 bg-[#3B3B3B]  rounded-t-xl">
            {/* titolo */}
            <div className="px-5 py-2 bg-red-500 rounded-t-xl text-center font-bold">
              {tavolo.discoteca.name}
            </div>
            <div className="flex flex-col px-5 space-y-4   ">
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <span className="uppercase text-sm">Tavolo</span>
                  <span className="font-bold">
                    {tavolo.tavolo.numeroTavolo}
                  </span>
                </div>
                <div className="flex flex-col sm:hidden">
                  <span className="uppercase text-sm">Capo tavolo</span>
                  <span className="font-bold">
                    {user?.name} {user?.surname}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="uppercase text-sm">Capo tavolo</span>
                <span className="font-bold">
                  {user?.name} {user?.surname}
                </span>
              </div>
              <div className="flex flex-col sm:items-start sm:justify-normal">
                <span className="uppercase text-sm">Data prenotazione</span>
                <span className="font-bold">
                  {format(new Date(tavolo.orderDate), "MMMM do, yyyy")}
                </span>
              </div>
              <div className="flex flex-col pb-5 sm:items-start sm:justify-normal">
                <div className="flex-col flex sm:items-start sm:justify-normal">
                  <span className="uppercase text-sm">numero persone</span>
                  <span className="font-bold">
                    {tavolo.numeroPersonePagato}/{tavolo.numeroPersone}
                  </span>
                  <span
                    className="mt-2 underline"
                    onClick={() => shareTavolo(tavolo.codice)}
                  >
                    INVITA UN&apos;AMICO/A
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex relative">
            <span className="absolute bg-[#1F1F1F] -top-3 -left-3 h-6 w-6  rounded-full" />
            <span className="border-2 border-[#1f1f1f] border-dashed w-full" />
            <span className="absolute bg-[#1F1F1F] -top-3 -right-3 h-6 w-6  rounded-full" />
          </div>
          <div className="flex flex-col -mt-1 space-y-10 bg-[#3B3B3B] pb-14 rounded-b-xl">
            <div className="px-5 py-2 bg-red-500 rounded-t-xl text-center font-bold">
              CODICE
            </div>
            <div className="text-center flex flex-col text-2xl  font-bold tracking-widest">
              {tavolo.codice}
            </div>
            <div className="flex justify-center items-center ">
              <QrCodeGenerator data={tavolo.codice!} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelView;
