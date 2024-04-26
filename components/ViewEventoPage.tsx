"use client";
import { Evento } from "@/type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getEvento from "@/actions/getEvento";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

interface ViewEventoPageProps{
    eventoId: string
}
const ViewEventoPage = ({eventoId}: ViewEventoPageProps) => {
  const [evento, setEvento] = useState<Evento>();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        setEvento(await getEvento(eventoId));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [setEvento]);

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

  if (!isMounted || !evento?.discoteca.visibile) {
    return null;
  }
  if (loading) {
    return (
      <div className="h-full flex w-full justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (!evento) {
    return (
      <div className="flex justify-center items-center text-2xl p-52 text-white">
        EVENTO NON DISPONIBILE
      </div>
    );
  }
  return (
    <div>
      <div className="hidden md:flex justify-between mx-10 ">
        <div className="relative z-10 w-1/3 xl:mt-40">
          <div className="flex flex-col gap-y-2 ">
            <div className="text-2xl">Scopri</div>
            <div className="text-5xl flex flex-col font-bold  w-max">
              <span>{evento?.nome}</span>
              <span className="h-1 bg-gradient-to-r from-transparent to-red-600 w-full"></span>
            </div>
            <div className="text-xl text-red-600">Evento</div>
          </div>
          {evento?.informazioni.length === 0 ? (
            <div className="h-72"></div>
          ) : (
            <div className="bg-[#32323275]">
              {evento?.informazioni.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "text-md",
                    (item.tipoInformazione.nome.toLowerCase() === "titolo" &&
                      "mt-2 text-md font-bold") ||
                      (item.tipoInformazione.nome.toLowerCase() === "orario" &&
                        "mx-10 list-item")
                  )}
                >
                  {item.descrizione}
                </div>
              ))}
            </div>
          )}
          <div
            className="px-3 py-2 mt-7 bg-red-600 w-max rounded-md cursor-pointer shadow-xl hover:scale-110 hover:shadow-red-600 transition"
            onClick={() => router.push(`/${evento.discoteca.id}`)}
          >
            COMPRA IL BIGLIETTO DALLA LISTA
          </div>
        </div>
        <div className="w-3/5 aspect-video absolute left-96">
          <Image
            src={evento?.imageUrl!}
            alt="image"
            fill
            className="rounded-xl"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </div>

      {/* TELEFONO */}
      <div className="block md:hidden">
        <div className="relative w-full aspect-video">
          <Image
            src={evento?.imageUrl!}
            alt="image"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        {/* TESTO */}
        <div className="mx-2 ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-y-2 ">
              <div className="text-xl">Scopri</div>
              <div className="text-3xl flex flex-col font-bold  w-max">
                <span>{evento?.nome}</span>
                <span className="h-1 bg-gradient-to-r from-transparent to-red-600 w-full"></span>
              </div>
              <div className="text-md text-red-600">Evento</div>
            </div>
            <div className="flex flex-col gap-y-2">
              {formatDate(evento.endDate)}
            </div>
          </div>
          <div
            className="px-3 py-2 mt-3 bg-red-600 w-max rounded-md cursor-pointer shadow-xl hover:scale-110 hover:shadow-red-600 transition"
            onClick={() => router.push(`/${evento.discoteca.id}`)}
          >
            COMPRA IL BIGLIETTO DALLA LISTA
          </div>
          <div className="mt-4">
            {evento?.informazioni.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "text-sm",
                  (item.tipoInformazione.nome.toLowerCase() === "titolo" &&
                    "mt-2 text-md font-bold") ||
                    (item.tipoInformazione.nome.toLowerCase() === "orario" &&
                      "mx-10 list-item")
                )}
              >
                {item.descrizione}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEventoPage;
