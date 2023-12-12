"use client";
import { Evento } from "@/type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getEvento from "@/actions/getEvento";
import Image from "next/image";
import { Loader } from "@/components/loader";

const EventoPage = ({ params }: { params: { eventoId: string } }) => {
  const [evento, setEvento] = useState<Evento>();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        setEvento(await getEvento(params.eventoId));
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
    <div className="text-white flex flex-col gap-y-5">
      <div className="text-2xl text-center flex flex-col sm:block ">
        <span className="text-center">{evento?.nome}</span>
        <span className="sm:ml-2 text-center">
          {formatDate(evento?.endDate!)}
        </span>
      </div>
      <div
        className="w-full h-52 overflow-hidden sm:h-96 flex justify-center items-center lg:rounded-lg"
        onDragStart={preventDefault}
        onContextMenu={preventDefault}
        // @ts-ignore
        style={{ userDrag: "none", userSelect: "none" }}
      >
        <Image
          src={evento?.imageUrl!}
          alt="image"
          width={1000}
          height={300}
          className="object-fill  "
        />
      </div>
      <div className="p-5 flex flex-col gap-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Descrizione:</span>
          <div className="text-lg flex flex-col gap-1">
            {evento?.informazioni.map((item) => (
              <span key={item.id}>{item.descrizione}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl">
            {evento.discoteca.scuola ? "Scuola" : "Discoteca"}
          </span>
          <div className="flex flex-row justify-between">
            <span className="text-lg">{evento?.discoteca.name}</span>
            <span className="text-lg">
              {evento?.discoteca.indirizzo} {evento?.discoteca.civico},{" "}
              {evento?.discoteca.city}
            </span>
          </div>
        </div>
      </div>
      <div
        className="w-[50%] m-2 mx-auto flex items-center justify-center transition cursor-pointer bg-black rounded-full py-5 text-center border border-white group"
        onClick={() => router.push(`/${evento?.discotecaId}`)}
      >
        <span className="text-xl ransition">Vai a comprare il biglietto</span>
      </div>
    </div>
  );
};

export default EventoPage;
