"use client"
import React, { useState } from "react";
import { Calendar, Heart, Home, List, Menu, PartyPopper, Ticket, TicketIcon, Trophy, Users2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useRouter, usePathname } from 'next/navigation'


import { cn } from "@/lib/utils";
const LeftBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className={cn("lg:-mt-10 lg:-ml-14 mt-4 border-r relative flex flex-col gap-6 h-full justify-center sm:items-center border-red-200 sm:w-48 lg:w-44", isOpen ? "w-full" : "w-[50px]")}>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/" && "text-red-200")} onClick={() => { router.push("/"); }}>
        <Home className="h-7 w-7 " />
        <span className="ml-2 hidden sm:block">Home</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/eventi" && "text-red-200")} onClick={() => { router.push("/eventi"); }}>
        <PartyPopper className="h-7 w-7" />
        <span className="ml-2 hidden sm:block" >Eventi</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/like-rank" && "text-red-200")} onClick={() => { router.push("/like-rank"); }}>
        <Trophy className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Classifica</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/liste" && "text-red-200")} onClick={() => { router.push("/liste"); }}>
        <List className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Liste</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/bigliettis" && "text-red-200")} onClick={() => { router.push("/biglietti"); }}>
        <Ticket className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Biglietti</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/prenotati" && "text-red-200")} onClick={() => { router.push("/prenotati"); }}>
        <Calendar className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Tavoli</span>
      </div>
      <div className={cn("flex items-center cursor-pointer ", pathname === "/preferiti" && "text-red-200")} onClick={() => { router.push("/preferiti"); }}>
        <Heart className="h-7 w-7" />
        <span className="ml-2 hidden sm:block">Preferiti</span>
      </div>
      <div className="mt-[37vh]  sm:mt-[200%] ">
        <UserButton signInUrl="/" />
      </div>
    </div >
  );
};

export default LeftBar;
