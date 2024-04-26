import { AlertTriangle, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePageBanner = () => {
  const preventDefault = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="xl:mx-40 md:mx-20 sm:mx-10 mx-4 px-5 py-5 rounded-lg bg-gradient-to-l flex-col md:flex-row from-red-600 flex xl:py-10 md:px-10 md:py-10 md:justify-between xl:px-20 items-center">
      <div className="xl:space-y-10 xl:w-2/4 md:w-2/3 md:space-y-5  space-y-2 w-full ">
        <div className="flex xl:space-x-10 md:space-x-5 space-x-5 justify-center md:justify-normal ">
          <span>
            <Crown />
          </span>
          <span>Organizza la tua serata da sogno!</span>
        </div>
        <div className="text-white tracking-widest xl:text-3xl font-extrabold md:text-2xl text-2xl text-center md:text-left">
          Unisciti a disco<span className="text-red-700 ">X</span>spot
        </div>
        <div>
          Trova il posto perfetto per la tua serata fuori, prenota i tavoli e
          acquista i biglietti senza problemi con pochi tocchi. Niente più
          attese in fila.
        </div>
        <div className="flex xl:flex-row xl:w-[250px] md:w-[200px] sm:w-[200px] w-[190px] md:text-sm justify-between text-xs ">
          <div className="border-2 cursor-pointer border-white text-white bg-transparent rounded-full py-1 px-3">
            Prenota
          </div>
          <Link className="border-2 cursor-pointer border-gray-300 text-gray-100 bg-transparent rounded-full py-1 px-3" href={"https://www.discoxspot.com"}>
            Visita il sito
          </Link>
        </div>
      </div>
      <div
        className="relative md:h-40 xl:h-72 hidden md:block h-32 aspect-square"
        onDragStart={preventDefault}
        onContextMenu={preventDefault}
        // @ts-ignore
        style={{ userDrag: "none", userSelect: "none" }}
      >
        <Image
          src={"/sfera2.png"}
          alt="img"
          fill
          className="rounded-full customShadow"
          objectFit="cover"
                  objectPosition="center"
        />
      </div>
    </div>
  );
};

export default HomePageBanner;
