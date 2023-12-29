"use client";

import {
  Discoteca,
  Evento,
  Lista,
  Order,
  OrderBiglietto,
  UserAccount,
  UserAccounts,
} from "@/type";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import likeToDiscoteca from "@/actions/likeToDiscoteca";
import { usePathname, useRouter } from "next/navigation";
import getDiscoteche from "@/actions/getDiscoteche";
import useLike from "@/hooks/use-like";
import { useAppSelector } from "@/store/store";
import { Loader } from "./loader";
import useUserIdSet from "@/hooks/use-userId";
import getLikeDiscoteche from "@/actions/getLikedDiscoteche";
import { useUser } from "@clerk/nextjs";
import getClassificaDiscoteche from "@/actions/getClassificaDiscoteche";
import getScuole from "@/actions/getScuole";
import HomePageBanner from "./HomePageBanner";
import { cn } from "@/lib/utils";
import getEventi from "@/actions/getEventi";
import getListe from "@/actions/getListe";
import ModelView from "./ModelView";
import Loading from "@/app/loading";
import getUser from "@/actions/getUser";
import getOrderBiglietti from "@/actions/getBiglietti";
import getOrder from "@/actions/getOrder";
import getOrders from "@/actions/getOrders";

interface ViewDiscotecheProps {
  user: UserAccounts;
  number: number;
  home?: boolean;
}

const View = ({ user, number, home }: ViewDiscotecheProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [discoteche, setDiscoteche] = useState<Discoteca[]>([]);
  const [likedDiscoteche, setLikedDiscoteche] = useState<Discoteca[]>([]);
  const [biglietti, setBiglietti] = useState<OrderBiglietto[]>([]);
  const [tavoli, setTavoli] = useState<Order[]>([]);
  const [classificaDiscoteche, setClassificaDiscoteche] = useState<Discoteca[]>(
    []
  );
  const [eventi, setEventi] = useState<Evento[]>([]);
  const [liste, setListe] = useState<Lista[]>([]);
  const { addItem } = useUserIdSet();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const like = useLike();
  const searchTerm = useAppSelector((state) => state.discoteche.ricerca);
  const [first, setFirst] = useState(true);
  const pathName = usePathname();
  const [userProfile, setUserProfile] = useState<UserAccounts>(user);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = [
    { name: "Prefiriti", uid: "preferiti", number: 1 },
    { name: "Classifica", uid: "classifica", number: 2 },
    { name: "Discoteche", uid: "discoteche", number: 3 },
    { name: "Eventi", uid: "eventi", number: 4 },
    { name: "Liste", uid: "liste", number: 5 },
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetch = async (number: number) => {
    try {
      setIsLoading(true);
      let data;

      switch (number) {
        case 1: // preferiti
          try {
            setIsLoading(true);
            setUserProfile(await getUser(userProfile.id));
            data = await getLikeDiscoteche(userProfile.id);
            setLikedDiscoteche(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
          break;
        case 2: // classifica
          try {
            setIsLoading(true);
            data = await getClassificaDiscoteche(userProfile.id);

            setClassificaDiscoteche(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }

          break;
        case 3: // discoteche
          try {
            setIsLoading(true);
            setUserProfile(await getUser(userProfile.id));
            data = await getDiscoteche();
            setDiscoteche(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }

          break;
        case 4: // eventi
          try {
            setIsLoading(true);
            data = await getEventi();
            setEventi(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }

          break;
        case 5: // liste
          try {
            setIsLoading(true);
            data = await getListe();
            setListe(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
          break;
        case 6: // liste
          try {
            setIsLoading(true);
            data = await getOrderBiglietti(user.id);
            setBiglietti(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }
          break;
        case 7: // liste
          try {
            setIsLoading(true);
            data = await getOrders(user.id);
            setTavoli(data);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading(false);
          }

          break;
        default:
          console.error("Invalid number provided for fetch.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Qui puoi gestire l'errore in modo più dettagliato, come mostrare un messaggio all'utente.
    } finally {
      setIsLoading(false);
      setFirst(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Imposta il loading a true prima della chiamata
        await fetch(number);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Imposta il loading a false dopo la chiamata, indipendentemente dal risultato
      }
    };

    // Chiama la funzione fetchData al montaggio e ogni volta che il valore di 'number' cambia
    fetchData();
  }, [number]); // 'number' è la dipendenza, quindi il useEffect verrà chiamato ogni volta che 'number' cambia

  const filteredDiscoteche = discoteche.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const preventDefault = (event: any) => {
    event.preventDefault();
  };

  const [optionSelected, setOptionSelected] = useState(
    options.find((item) => item.number === number)?.uid
  );

  const handleSelectOptionClick = async (number: number, uid: string) => {
    setOptionSelected(uid);
    await fetch(number);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading && first) {
    return (
      <div className="justify-center items-center flex w-full">
        <Loader />
      </div>
    );
  }

  const content = () => {
    let contentToRender;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      );
    }

    if (optionSelected === "discoteche") {
      if (filteredDiscoteche.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessuna discoteca trovata
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {filteredDiscoteche.map((item) => (
              <ModelView key={item.id} discoteca={item} user={userProfile} />
            ))}
          </div>
        );
      }
    } else if (optionSelected === "preferiti") {
      if (likedDiscoteche.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessuna discoteca trovata
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {likedDiscoteche.map((item) => (
              <ModelView key={item.id} discoteca={item} user={userProfile} />
            ))}
          </div>
        );
      }
    } else if (optionSelected === "classifica") {
      if (classificaDiscoteche.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessuna discoteca trovata
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {classificaDiscoteche.map((item) => (
              <ModelView key={item.id} discoteca={item} user={userProfile} />
            ))}
          </div>
        );
      }
    } else if (optionSelected === "eventi") {
      if (eventi.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessun evento trovato
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {eventi.map((item) => (
              <ModelView key={item.id} evento={item} user={userProfile} />
            ))}
          </div>
        );
      }
    } else if (optionSelected === "liste") {
      if (liste.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessuna lista trovata
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {liste.map((item) => (
              <ModelView key={item.id} lista={item} user={userProfile} />
            ))}
          </div>
        );
      }
    }

    if (number === 6) {
      if (biglietti.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessun biglietto trovato
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center gap-y-10 sm:gap-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4 pb-10">
            {biglietti.map((item) => (
              <ModelView key={item.id} biglietto={item} user={userProfile} />
            ))}
          </div>
        );
      }
    } else if (number === 7) {
      if (tavoli.length === 0) {
        contentToRender = (
          <div className="flex justify-center items-center">
            Nessun tavolo trovato
          </div>
        );
      } else {
        contentToRender = (
          <div className="mt-5 mx-5 justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {tavoli.map((item) => (
              <ModelView key={item.id} tavolo={item} user={userProfile} />
            ))}
          </div>
        );
      }
    }
    return contentToRender;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full grid grid-cols-1 overflow-y-scroll overflow-x-auto h-[80vh] ">
      {number <= 5 && (
        <div className="flex flex-col space-y-10">
          <HomePageBanner />
          {pathName === "/" && (
            <div className="sm:mx-10 md:mx-20 mx-5 w-max md:space-x-5 space-x-2 flex justify-between overflow-x-scroll">
              {options.map((item) => (
                <span
                  key={item.name}
                  className={cn(
                    "py-1 px-3 cursor-pointer rounded-full border transition",
                    optionSelected === item.uid &&
                      "bg-orange-600 border-transparent"
                  )}
                  onClick={() => handleSelectOptionClick(item.number, item.uid)}
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chiamata alla funzione content() che dovrebbe gestire il rendering in base a optionSelected */}
      {content()}
    </div>
  );
};

export default View;
