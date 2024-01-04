"use client"
import { searchDisco } from '@/store/features/search-discoteca'
import { AppDispatch } from '@/store/store'
import { Discoteca } from '@/type'
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const pathname = usePathname()
    dispatch(searchDisco(searchTerm))

    return (
      <>
        <div
          className={cn(
            "items-center  hidden bg-[#3B3B3B] p-2 rounded-full text-white md:w-65 sm:w-44 w-40 h-9 text-sm",
            pathname === "/" || pathname === "/scuole"
              ? "flex justify-between"
              : ""
          )}
        >
          <SearchIcon className="h-5 w-5   " />
          <input
            type="text"
            placeholder="Locali"
            className="bg-transparent p-2 rounded-full outline-none  w-full h-9 text-sm"
            value={searchTerm}
            onChange={(e: any) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        {}
        {pathname === "/preferiti" && (
          <div className="text-white text-xl">Preferiti</div>
        )}
        {pathname === "/eventi" && (
          <div className="text-white text-xl">Eventi</div>
        )}
        {pathname === "/like-rank" && (
          <div className="text-white text-xl">Classifica Discoteche</div>
        )}
        {pathname === "/prenotati" && (
          <div className="text-white text-xl">Tavoli</div>
        )}
        {pathname === "/liste" && (
          <div className="text-white text-xl">Liste</div>
        )}
        {pathname === "/biglietti" && (
          <div className="text-white text-xl">Biglietti</div>
        )}
      </>
    );
}

export default SearchBar