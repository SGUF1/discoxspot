"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import SearchBar from "./searchbar";
import { useRouter } from "next/navigation";
import { UserAccounts } from "@/type";
import { X } from "lucide-react";
import Link from "next/link";
import { RiMenu2Fill } from "react-icons/ri";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { openLeftPlease } from "@/store/features/left-bar-open";
interface HeaderProps {
  user: UserAccounts;
  singolo?: boolean;
}
const Header = ({ user, singolo }: HeaderProps) => {
  const router = useRouter();
  const preventDefault = (event: any) => {
    event.preventDefault();
  };
  const openLeft = useAppSelector((state) => state.leftBar.openLeft);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(openLeftPlease(false))
  }, []);

  const handleLeftBar = () => {
    if(openLeft){
      dispatch(openLeftPlease(false))
    }else{
      dispatch(openLeftPlease(true))
    }
  }

  return (
 
    <div>
      {!singolo ? (
        <div className="p-5 sm:p-10 px-3 flex justify-between w-full items-center">
          <div className="flex items-center">
            <div className="md:hidden">
              <RiMenu2Fill className="h-5 w-5" onClick={handleLeftBar} />
            </div>
            <div className="md:text-2xl ml-3 text-md flex-wrap">
              Ciao <br className="block sm:hidden" />
              <span className="font-bold">{user.name}</span>
            </div>
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
      ) : (
        <div className="">
          <Link
            href={"/"}
            className="p-5 sm:p-10 px-3 flex text-xl tracking-tighter justify-center w-full items-center z-10"
          >
            <span className="-mr-1">disco</span>
            <span className="text-4xl font-bold text-red-600 text-center">
              X
            </span>
            <span className="-ml-[3px]">spot</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
