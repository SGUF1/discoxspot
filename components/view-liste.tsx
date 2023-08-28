"use client";

import { Evento, Lista, UserAccounts } from "@/type";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLike from "@/hooks/use-like";
import getEventi from "@/actions/getEventi";
import { Loader } from "./loader";
import getListe from "@/actions/getListe";
import { format } from "date-fns";

const ViewListe = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [liste, setListe] = useState<Lista[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const like = useLike();
  var cont = 0;

  useEffect(() => {
    async function fetch() {
      try {
        if (cont === 0) setIsLoading(true);

        const allListe = await getListe();

        setListe(allListe);
      } catch (error) {
        console.error("Error fatching liste:", error);
      } finally {
        setIsLoading(false);
        cont++;
      }
    }

    fetch();
    const interval = setInterval(fetch, 1000);

    return () => clearInterval(interval);
  }, [cont]);

  const preventDefault = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="justify-center items-center flex w-full">
        <Loader />
      </div>
    );
  }
  if (!isMounted) {
    return null;
  }

  return (
    <div className="lg:-mt-10 grid grid-cols-1 m-mt-4  overflow-y-scroll w-full  overflow-x-auto h-[75vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white">
      {liste.length === 0 ? (
        <div className="flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[80vh] flex-col">
          NESSUNA LISTA TROVATA
        </div>
      ) : (
        liste.map((item) => (
          <div
            className="flex flex-col items-center"
            key={item.id}
            onClick={() => router.push(`/liste/${item.id}`)}
          >
            <div
              className="h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl"
              onDragStart={preventDefault}
              onContextMenu={preventDefault}
              // @ts-ignore
              style={{ userDrag: "none", userSelect: "none" }}
            >
              <Image
                src={item.imageUrl}
                alt="image"
                width={1000}
                height={100}
                className="object-contain lg:hover:scale-125 transition hover:cursor-pointer "
              />
            </div>
            <div className="flex w-[95%] sm:w-[95%] flex-col mt-2 justify-between">
              <div className="text-center">{item.nome}</div>
              <div className="flex justify-between">
                <span>{item.discoteca.name}</span>
                <span className="text-blue-400">
                  {item.bigliettiInfiniti
                    ? "Infiniti"
                    : item.bigliettiRimanenti}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{item.prezzoBiglietto}€</span>
                <span>
                  Fino il{" "}
                  <span className="lowercase">
                    {format(new Date(item.dataLimite), "MMMM do, yyyy")}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewListe;
