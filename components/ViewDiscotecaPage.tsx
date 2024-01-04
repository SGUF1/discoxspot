"use client";
import getDiscoteca from "@/actions/getDiscoteca";
import getHourse from "@/actions/getHourse";
import Loading from "@/app/loading";
import { cn } from "@/lib/utils";
import { Discoteca, Tavolo } from "@/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import View from "./view-discoteche";
import ModelView from "./ModelView";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PanelTavolo from "./panel-tavolo";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { openTavoloPlease } from "@/store/features/panel-tavolo-open";

interface ViewDiscotecaPageProps {
  discotecaId: string;
}
const ViewDiscotecaPage = ({ discotecaId }: ViewDiscotecaPageProps) => {
  const [disco, setDisco] = useState<Discoteca>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const open = useAppSelector((state) => state.open.open);
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        setDisco(await getDiscoteca(discotecaId));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
    setIsMounted(true);

      }
    };
    fetch();
  }, [discotecaId]);
  const currentDate = new Date();
  const tavoli: Tavolo[] = (disco?.sale.flatMap((sale) => sale.tavoli)!);
  const futureEventi = disco?.eventi.filter((dateString) => {
    const dateObject = new Date(dateString.endDate);
    return (
      dateObject >=
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours() - 24,
        0
      )
    );
  });

  const futureListe = disco?.liste?.filter((dateString) => {
    const dateObject = new Date(dateString.dataLimite);
    return (
      dateObject >=
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours() - 24,
        0
      )
    );
  });

  const preventDefault = (event: any) => {
    event.preventDefault();
  };
  

  
  
  const formatDate = (data: string) => {
    const dateObject = new Date(data);
    const options = { year: "numeric", month: "long", day: "numeric" };

    // @ts-ignore
    const dataFormattata = dateObject.toLocaleDateString(undefined, options);

    return dataFormattata;
  };

  const eventiContent = () => {
    let contentToRender;

    if (futureEventi?.length === 0) {
      contentToRender = (
        <div className="flex h-32 justify-center items-center relative z-10 ">
          Nessun evento trovato
        </div>
      );
    } else {
      contentToRender = (
        <div className="mt-5 flex  space-x-4 pb-10 flex-row  w-max relative z-10 ">
          {futureEventi?.map((item) => (
            <>
              <div
                key={item.id}
                onClick={() => router.push(`/eventi/${item.id}`)}
                className="p-4 bg-[#1F1F1F] group rounded w-full items-center shadow-xl cursor-pointer transition hover:scale-105  hover:shadow-red-600 shadow-black flex flex-col justify-center space-y-2 "
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
                      src={item.imageUrl}
                      alt="img"
                      fill
                      className="rounded-xl hover:scale-105 transition"
                    />
                  </div>
                  <div className="flex flex-col w-[200px] md:w-[300px]">
                    <div className="flex flex-col -space-y-2">
                      <h2 className="text-md font-semibold mb-2">
                        {item.nome}
                      </h2>
                      <div className="flex flex-col group-[1] "></div>
                    </div>
                    <div className="text-xs">{formatDate(item.endDate)}</div>
                  </div>
                </div>
                <span className="h-[2px] w-0 group-hover:w-full bg-red-600 duration-300" />
              </div>
            </>
          ))}
        </div>
      );
    }
    return contentToRender;
  };

  const listeContent = () => {
    let contentToRender;

    if (futureListe?.length === 0) {
      contentToRender = (
        <div className="flex h-32 justify-center items-center relative z-10  ">
          Nessuna lista trovata
        </div>
      );
    } else {
      contentToRender = (
        <div className="mt-5 flex  space-x-4 pb-10  flex-row  w-max relative z-10">
          {futureListe?.map((lista) => (
            <>
              <div
                onClick={() => router.push(`/liste/${lista.id}`)}
                className="p-4 bg-[#1F1F1F] group rounded w-full items-center shadow-xl cursor-pointer transition hover:scale-105  hover:shadow-red-600 shadow-black flex flex-col justify-center space-y-2 "
              >
                <div className="flex flex-col  w-full justify-center space-y-4">
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
                  <div className="flex flex-col ">
                    <div className="flex flex-col -space-y-2 w-[200px] md:w-[300px]">
                      <h2 className="text-md font-semibold mb-2">
                        {lista.nome}
                      </h2>
                    </div>
                    <div className="text-xs -mt-2">
                      {formatDate(lista.dataLimite)}
                    </div>
                  </div>
                </div>
                <span className="h-[2px] w-0 group-hover:w-full bg-red-600 duration-300" />
              </div>
            </>
          ))}
        </div>
      );
    }
    return contentToRender;
  };
const tavoliContent = () => {
  let contentToRender;

  if (tavoli?.length === 0) {
    contentToRender = (
      <div className="flex h-32 justify-center items-center relative z-10  ">
        Nessun tavolo trovato
      </div>
    );
  } else {
    contentToRender = (
      <div className="mt-5 flex  space-x-4 pb-10 flex-row  w-max relative z-10">
        {tavoli?.map((tavolo) => (
          <>
            <div className="p-4 group rounded bg-[#1F1F1F] w-full items-center shadow-xl cursor-pointer transition hover:scale-105  hover:shadow-red-600 shadow-black flex flex-col justify-center space-y-2 ">
              <div className="flex flex-col  w-full justify-center space-y-4">
                <div
                  className="relative  w-full aspect-video "
                  onDragStart={preventDefault}
                  onContextMenu={preventDefault}
                  // @ts-ignore
                  style={{ userDrag: "none", userSelect: "none" }}
                >
                  <Image
                    src={tavolo.imageUrl}
                    alt="img"
                    fill
                    className="rounded-xl hover:scale-105 transition"
                  />
                </div>
                <div className="flex flex-col ">
                  <div className="flex flex-col -space-y-2 w-[200px] md:w-[300px]">
                    <h2 className="text-md font-semibold mb-2">
                      {tavolo.numeroTavolo}
                    </h2>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs -mt-2">
                        {tavolo.sala.piano.nome}
                      </div>
                      <div className="text-xs">{tavolo.posizione.nome}</div>
                    </div>
                    <div className="text-xs -mt-2">
                      <div>MIN: {tavolo.numeroMinimo}</div>
                      <div>MAX: {tavolo.numeroMassimo}</div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="h-[2px] w-0 group-hover:w-full bg-red-600 duration-300" />
            </div>
          </>
        ))}
      </div>
    );
  }
  return contentToRender;
};
  if(!isMounted){
    return <Loading/>
  }
  return (
    <div>
      {disco?.visibile ? (
        <>
          <div className={cn("", open ? " hidden" : "h-max overflow-auto")}>
            <div className="hidden md:flex justify-between mx-10 ">
              <div className="relative z-10 w-1/3 xl:mt-40">
                <div className="flex flex-col gap-y-2 ">
                  <div className="text-2xl">Scopri</div>
                  <div className="text-5xl flex flex-col font-bold  w-max">
                    <span>{disco?.name}</span>
                    <span className="h-1 bg-gradient-to-r from-transparent to-red-600 w-full"></span>
                  </div>
                  <div className="text-xl text-red-600">Discoteca</div>
                </div>
                {disco?.informazioni.length === 0 ? (
                  <div className="h-72"></div>
                ) : (
                  <div>
                    {disco?.informazioni.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "text-md",
                          (item.tipoInformazione.nome.toLowerCase() ===
                            "titolo" &&
                            "mt-2 text-md font-bold") ||
                            (item.tipoInformazione.nome.toLowerCase() ===
                              "orario" &&
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
                  onClick={() => dispatch(openTavoloPlease(!open))}
                >
                  PRENOTA TAVOLO
                </div>
              </div>
              <div className="w-3/5 aspect-video absolute left-96 -z-10">
                <Image
                  src={disco?.imageUrl!}
                  alt="image"
                  fill
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* TELEFONO */}
            <div className="block md:hidden">
              <div className="relative w-full aspect-video">
                <Image src={disco?.imageUrl!} alt="image" fill />
              </div>
              {/* TESTO */}
              <div className="mx-2">
                <div className="flex flex-col gap-y-2 ">
                  <div className="text-xl">Scopri</div>
                  <div className="text-3xl flex flex-col font-bold  w-max">
                    <span>{disco?.name}</span>
                    <span className="h-1 bg-gradient-to-r from-transparent to-red-600 w-full"></span>
                  </div>
                  <div className="text-md text-red-600">Discoteca</div>
                </div>

                <div>
                  {disco?.informazioni.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "text-sm",
                        (item.tipoInformazione.nome.toLowerCase() ===
                          "titolo" &&
                          "mt-2 text-md font-bold") ||
                          (item.tipoInformazione.nome.toLowerCase() ===
                            "orario" &&
                            "mx-10 list-item")
                      )}
                    >
                      {item.descrizione}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex mt-3 justify-center">
                <div
                  className="px-3 py-2  bg-red-600 w-max rounded-md cursor-pointer shadow-xl hover:scale-110 hover:shadow-red-600 transition"
                  onClick={() => dispatch(openTavoloPlease(!open))}
                >
                  PRENOTA TAVOLO
                </div>
              </div>
            </div>
            <div className="mt-20 mx-2 flex flex-col  gap-2 md:gap-x-5">
              <div className="flex flex-col relative z-10 ">
                <span className="text-xl ">Eventi</span>
                <div className="overflow-x-scroll w-full ">
                  {eventiContent()}
                </div>
              </div>
              <div className="flex flex-col relative z-10  ">
                <span className="text-xl">Liste</span>
                <div className="overflow-x-scroll w-full">
                  {listeContent()}
                </div>
              </div>
              <div className="flex-col relative z-10 sm:hidden lg:flex  ">
                <span className="text-xl">Tavoli</span>
                <div className="overflow-x-scroll w-full">
                  {tavoliContent()}
                </div>
              </div>
            </div>
           
          </div>
          <PanelTavolo discoteca={disco!} />
        </>
      ) : (
        <div className="text-center">DISCOTECA NON DISPONBILE</div>
      )}
    </div>
  );
};

export default ViewDiscotecaPage;
