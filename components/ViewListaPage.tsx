"use client";
import { Evento, Lista, OrderBiglietto } from "@/type";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getEvento from "@/actions/getEvento";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import getLista from "@/actions/getLista";
import { useUser } from "@clerk/nextjs";
import getUser from "@/actions/getUser";
import getOrderBiglietti from "@/actions/getBiglietti";
import axios from "axios";

interface ViewListaPageProps {
  listaId: string;
}
const ViewListaPage = ({ listaId }: ViewListaPageProps) => {
    const { user } = useUser();
  const [lista, setLista] = useState<Lista>();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [man, setMan] = useState<OrderBiglietto[]>();

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        setLista(await getLista(listaId));
        setMan(await getOrderBiglietti(user?.id!))
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [listaId, setLista]);

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

  if (!isMounted || !lista?.discoteca.visibile) {
    return null;
  }
  if (loading) {
    return (
      <div className="h-full flex w-full justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (!lista) {
    return (
      <div className="flex justify-center items-center text-2xl p-52 text-white">
        LISTA NON DISPONIBILE
      </div>
    );
  }
  const onCheckout = async (gender?: string) => {
    if (man?.find((biglietto) => biglietto.listaId === listaId)) {
      router.push("/biglietti");
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/liste/${listaId}/checkout`,
        {
          userAccountId: user?.id,
          listaId: listaId,
          firstName: user?.firstName,
          lastName: user?.lastName,
          gender,
        }
      );

      window.location = response.data.url;
    }
  };
  const biglietti = () => {
    let content;

    const data = [
      { title: "Biglietto Uomo", prezzo: lista.prezzoBiglietto, gender: "m" },
      { title: "Biglietto Donna", prezzo: lista.prezzoDonna, gender: "f" },
    ];
 const isTicketPurchased = man?.find(
      (biglietto) => biglietto.listaId === listaId
    );
    return isTicketPurchased ? (
      <div className="flex flex-col items-center mx-14 space-y-5 mt-5 justify-center">
        <div className="flex px-10 justify-between shadow-xl cursor-pointer hover:shadow-red-600 transition hover:scale-110 w-full h-16 items-center rounded-xl bg-red-600 ">
          <div className="flex flex-col -space-y-1 ">Già comprato</div>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center mx-14 space-y-5 mt-5 justify-center">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex px-10 justify-between shadow-xl cursor-pointer hover:shadow-red-600 transition hover:scale-110 w-full h-16 items-center rounded-xl bg-red-600 "
          >
            <div className="flex flex-col -space-y-1 " onClick={() => onCheckout(item.gender)}>
              <span className="text-black font-bold">{item.title}</span>
              <span className="text-xs text-gray-400">{lista.nome}</span>
            </div>
            <div>{item.prezzo}€</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="hidden md:flex justify-between mx-10 ">
        <div className="relative z-10 w-1/3 xl:mt-40">
          <div className="flex flex-col gap-y-2 ">
            <div className="text-2xl">Scopri</div>
            <div className="text-5xl flex flex-col font-bold  w-max">
              <span>{lista?.nome}</span>
              <span className="h-1 bg-gradient-to-r from-transparent to-red-600 w-full"></span>
            </div>
            <div className="text-xl text-red-600">Lista</div>
          </div>
          {lista?.informazioni.length === 0 ? (
            <div className="h-72"></div>
          ) : (
            <div className="bg-[#32323275] mb-10">
              {lista?.informazioni.map((item) => (
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
        </div>
        <div className="relative z-10 w-1/3 xl:mt-72">{biglietti()}</div>
        <div className="w-3/5 aspect-video absolute left-96">
          <Image
            src={lista?.imageUrl!}
            alt="image"
            fill
            className="rounded-xl"
          />
        </div>
      </div>

      {/* TELEFONO */}
      <div className="block md:hidden">
        <div className="relative w-full aspect-video">
          <Image src={lista?.imageUrl!} alt="image" fill />
        </div>
        {/* TESTO */}
        <div className="mx-2 ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-y-2 ">
              <div className="text-xl">Scopri</div>
              <div className="text-3xl flex flex-col font-bold  w-max">
                <span>{lista?.nome}</span>
                <span className="h-1 bg-gradient-to-r from-transparent to-red-600 w-full"></span>
              </div>
              <div className="text-md text-red-600">Lista</div>
            </div>
            <div className="flex flex-col gap-y-2">
              {formatDate(lista.dataLimite)}
            </div>
          </div>

          <div className="mt-4 mb-10">
            {lista?.informazioni.map((item) =>
              item.descrizione.length > 3 ? (
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
              ) : (
                <br key={item.id} />
              )
            )}
          </div>
          {biglietti()}
        </div>
      </div>
    </div>
  );
};

export default ViewListaPage;
