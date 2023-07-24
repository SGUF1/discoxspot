"use client"
import React, { useState } from "react";
import { Heart, Home, Menu, Users2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useRouter, usePathname } from 'next/navigation'


import { cn } from "@/lib/utils";
const LeftBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className={cn("lg:-mt-10 w-2/12 border-r h-[max-content] flex flex-col gap-6 justify-center items-center border-red-200 sm:w-44", isOpen ? "w-full" : "w-2/12")}>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/" && "text-red-200")} onClick={() => {router.push("/"); }}>
        <Home className="h-7 w-7 " />
        <span className="ml-2 hidden sm:block">Home</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/preferiti" && "text-red-200")} onClick={() => { router.push("/preferiti"); }}>
        <Heart className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Preferiti</span>
      </div>
      <div className="flex items-center">
        <Users2 className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Invita amici</span>
      </div>
      <div className="flex items-center">
        <Users2 className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Invita amici</span>
      </div>
      <div className="flex items-center">
        <Users2 className="h-7 w-7" />  
        <span className="ml-2 hidden sm:block">Invita amici</span>
      </div>
      <div className="flex items-center">
        <Users2 className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Invita amici</span>
      </div>

      <div className="mt-[170%] sm:mt-[130%] ">
        <UserButton signInUrl="/" />
      </div>
    </div >
  );
};

export default LeftBar;
