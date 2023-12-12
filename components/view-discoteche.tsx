"use client";

import { Discoteca, UserAccounts } from "@/type";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import likeToDiscoteca from "@/actions/likeToDiscoteca";
import { useRouter } from "next/navigation";
import getDiscoteche from "@/actions/getDiscoteche";
import useLike from "@/hooks/use-like";
import { useAppSelector } from "@/store/store";
import { Loader } from "./loader";
import useUserIdSet from "@/hooks/use-userId";
import getLikeDiscoteche from "@/actions/getLikedDiscoteche";
import { useUser } from "@clerk/nextjs";
import getClassificaDiscoteche from "@/actions/getClassificaDiscoteche";
import getScuole from "@/actions/getScuole";

interface ViewDiscotecheProps {
  preferiti?: boolean | false;
  user: UserAccounts;
  classifica?: boolean | false;
  scuole?: true | false;
}

const ViewDiscoteche = ({
  user,
  preferiti,
  classifica,
  scuole,
}: ViewDiscotecheProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [discoteche, setDiscoteche] = useState<Discoteca[]>([]);
  const { addItem } = useUserIdSet();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const like = useLike();
  const searchTerm = useAppSelector((state) => state.discoteche.ricerca);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        if (first) {
          setIsLoading(true);
        }
        if (preferiti) {
          const allDiscoteche = await getLikeDiscoteche(user.id);
          setDiscoteche(allDiscoteche);
        } else if (classifica) {
          const allDiscoteche = await getClassificaDiscoteche(user.id);
          setDiscoteche(allDiscoteche);
        } else if (scuole) {
          const allDiscoteche = await getScuole();
          setDiscoteche(allDiscoteche);
        } else {
          const allDiscoteche = await getDiscoteche();
          setDiscoteche(allDiscoteche);
        }
      } catch (error) {
        console.error("Error fetching discoteche:", error);
      } finally {
        setIsLoading(false);
        setFirst(false);
      }
    }
    fetch();
    if (!classifica) {
      const interval = setInterval(fetch, 1000);

      return () => clearInterval(interval);
    }
  }, [first, setDiscoteche, classifica, preferiti, user]);
  const filteredDiscoteche = discoteche.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOnHeart = async (item: Discoteca) => {
    try {
      setIsLoading(true);
      await likeToDiscoteca(user.id, item.id);
    } catch (error) {
      console.error("Error while liking discoteca:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const preventDefault = (event: any) => {
    event.preventDefault();
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
  if (!isMounted) {
    return null;
  }

  return (
    <div className="lg:-mt-10 grid grid-cols-1 -mt-4  overflow-y-scroll w-full  overflow-x-auto h-[75vh] sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 text-white">
      {filteredDiscoteche.length === 0 ? (
        <div className="flex justify-center absolute items-center w-[75%] lg:w-[77%] h-[84vh]">
          {scuole ? "Nessuna scuola trovata" : "Nessuna discoteca trovata"}
        </div>
      ) : (
        filteredDiscoteche.map((item) => (
          <div className="flex flex-col items-center" key={item.id}>
            <div
              className="h-36 sm:h-48 flex items-center w-[95%] sm:w-[95%]  overflow-hidden rounded-xl"
              onDragStart={preventDefault}
              onContextMenu={preventDefault}
              onClick={() => router.push(`/${item.id}`)}
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
            <div className="flex w-[95%] sm:w-[95%]  mt-2 justify-between">
              <div
                className="flex flex-col gap-1"
                onClick={() => router.push(`/${item.id}`)}
              >
                <div>{item.name}</div>
                <div className="flex ">
                  <MapPin size={20} />
                  <span className="ml-1">
                    {item.indirizzo} {item.civico}, {item.city},{" "}
                    {item.provincia.name}
                  </span>
                </div>
              </div>
              <button
                className={`flex items-center ${
                  !classifica ? "cursor-pointer" : "cursor-default"
                } outline-none`}
                onClick={() => !classifica && handleOnHeart(item)}
                disabled={isLoading}
              >
                <Heart
                  size={22}
                  className={`${!classifica && "hover:scale-110"} transition`}
                  fill={`${
                    item.userAccounts.find((userA) => userA.id === user.id)
                      ? "red"
                      : "transparent"
                  }`}
                  color={`${
                    item.userAccounts.find((userA) => userA.id === user.id)
                      ? "red"
                      : "white"
                  }`}
                />
                {!preferiti && <span className="ml-1">{item.like}</span>}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewDiscoteche;
