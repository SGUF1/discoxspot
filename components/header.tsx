"use client";

import React from "react";
import Image from "next/image";
import SearchBar from "./searchbar";
import { useRouter } from "next/navigation";
import { UserAccounts } from "@/type";
import { X } from "lucide-react";

interface HeaderProps {
  user: UserAccounts;
  singolo?: boolean;
}
const Header = ({ user, singolo }: HeaderProps) => {
  const router = useRouter();
  const preventDefault = (event: any) => {
    event.preventDefault();
  };
  return (
    // <div className='flex justify-between items-center bg-transparent p-2 lg:p-5 lg:px-20 w-full '>
    //     <div onDragStart={preventDefault}
    //         onContextMenu={preventDefault}
    //         // @ts-ignore
    //         style={{ userDrag: 'none', userSelect: 'none' }}>
    //         {/* <Image src={"https://res.cloudinary.com/dg2hpjtdh/image/upload/v1688768031/htzdr7jksuvpdn3uy3vc.jpg"} onClick={() => router.push("/")} alt='logo' width={50} height={50} /> */}
    //         {/* <Image src={"/discoxspot.png"} alt='image' width={140} height={90} className='w-[150px] lg:w-[200px] bg-transparent' onClick={() => router.push("/")} /> */}
    //     </div>
    //     <div>
    //         <SearchBar />
    //     </div>

    // </div>
    <div>
      {!singolo ? (
        <div className="p-5 sm:p-10 px-3 flex justify-between w-full items-center">
          <div className="md:text-2xl text-md flex-wrap">
            Ciao <br className="block sm:hidden" />
            <span className="font-bold">{user.name}</span>
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-10 px-3 flex text-xl tracking-tighter justify-center w-full items-center z-10">
          disco
          <span className="text-4xl font-bold text-red-500 text-center">X</span>
          spot
        </div>
      )}
    </div>
  );
};

export default Header;
