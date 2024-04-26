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
  X,
} from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import { UserButton } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";
import { AppDispatch, useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { openLeftPlease } from "@/store/features/left-bar-open";

const LeftBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const openLeft = useAppSelector((state) => state.leftBar.openLeft);
  const dispatch = useDispatch<AppDispatch>();

  const handleLeftBar = () => {
    if (openLeft) {
      dispatch(openLeftPlease(false));
    } else {
      dispatch(openLeftPlease(true));
    }
  };
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
    <div
      className={cn(
        "bg-[#3B3B3B] w-[250px] z-10 xl:w-[250px] h-screen duration-300 ",
        !openLeft
          ? "absolute -translate-x-full md:relative md:-translate-x-0"
          : "absolute translate-x-0 md:relative"
      )}
    >
      <div className="fixed top-0 left-0 h-screen md:px-[30px]  md:py-[30px]">
        {/* ds */}
        <div className="relative hidden 2xl:mb-[30px] mb-[20px] h-10 xl:block">
          <Image
            src={"/discoxspot.png"}
            alt="logo"
            fill
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="relative flex justify-between  items-center text-2xl text-center  xl:hidden">
          <div className="relative mt-5 w-36 h-10  ">
            <Image
              src={"/discoxspot.png"}
              alt="logo"
              fill
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="mt-5 pr-5 md:hidden">
            <X onClick={handleLeftBar} />
          </div>
        </div>
        <div className="items-center space-x-10 justify-center xl:justify-normal hidden xl:flex">
          <span>Menu</span>
          <span className="bg-white w-[75px] h-[2px] hidden xl:block"></span>
        </div>
        <div className="relative w-full mt-5 md:mt-5 duration-300">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex px-0 py-[10px]  "
            >
              <div
                className={cn(
                  "text-white  rounded-xl hover:bg-white justify-center xl:justify-normal w-[250px] hover:text-red-600 duration-300 flex  md:w-full py-[10px] items-center px-[14px]",
                  pathname === item.href && "bg-red-600 text-white font-bold"
                )}
              >
                <span className="text-2xl mr-[20px]  ">{item.icon}</span>
                <span className="">{item.name}</span>
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
