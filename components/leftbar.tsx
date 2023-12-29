"use client";
import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Disc3,
  GraduationCap,
  Heart,
  Home,
  List,
  Menu,
  PartyPopper,
  School,
  Star,
  Tag,
  Ticket,
  TicketIcon,
  Trophy,
  Users2,
} from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import { UserButton } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";

const LeftBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return <></>;
  }
  const links = [
    { href: "/", name: "Home", icon: <Home /> },
    // { href: "/notifiche", name: "Notifiche", icon: <Bell /> },
    { href: "/eventi", name: "Eventi", icon: <Disc3 /> },
    { href: "/like-rank", name: "Classifica", icon: <Star /> },
    { href: "/liste", name: "Liste", icon: <Tag /> },
    { href: "/preferiti", name: "Preferiti", icon: <Heart /> },
    { href: "/biglietti", name: "Biglietti", icon: <Ticket /> },
    { href: "/prenotati", name: "Tavoli", icon: <MdOutlineTableBar /> },
  ];
  return (
    <div className="bg-[#3B3B3B] w-[75px]  relative  xl:w-[250px] h-screen ">
      <div className="fixed top-0 left-0 h-screen xl:px-[30px]  xl:py-[30px]">
        {/* ds */}
        <div className="relative hidden 2xl:mb-[130px] mb-[20px] h-10 xl:block">
          <Image src={"/discoxspot.png"} alt="logo" fill />
        </div>
        <div className="relative block  h-10 xl:hidden">
          <Image src={"/background.png"} alt="logo" fill />
        </div>
        <div className="items-center space-x-10 justify-center xl:justify-normal hidden xl:flex">
          <span>Menu</span>
          <span className="bg-white w-[75px] h-[2px] hidden xl:block"></span>
        </div>
        <div className="relative w-full">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex px-0 py-[10px]  "
            >
              <div
                className={cn(
                  "text-white  rounded-xl w-[65px] hover:bg-white  justify-center xl:justify-normal hover:text-orange-500 duration-300 flex  xl:w-full py-[10px] items-center px-[14px]",
                  pathname === item.href && "bg-orange-500 text-white font-bold"
                )}
              >
                <span className="text-2xl xl:mr-[20px]  ">{item.icon}</span>
                <span className="hidden xl:block">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-20 md:bottom-10 items-center flex flex-col space-y-10  justify-center left-0 w-full ">
          <div className="items-center space-x-10 justify-center xl:justify-center  hidden xl:flex">
            <span>Profile</span>
            <span className="bg-white w-[75px] h-[2px] hidden xl:block"></span>
          </div>
          <UserButton signInUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
