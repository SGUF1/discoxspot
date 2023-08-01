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
            <div className={cn('items-center hidden', pathname === "/" && "flex",)}>
                <input type='text' placeholder='search' className='bg-gray-300 p-2 rounded-full text-black w-52 h-9 text-sm' value={searchTerm} onChange={(e: any) => { setSearchTerm(e.target.value); }} />
                <SearchIcon className='h-5 w-5 absolute ml-64 text-black ' />
            </div>
            {pathname === "/preferiti" && <div className='text-white text-xl'>Preferiti</div>}
            {pathname === "/eventi" && <div className='text-white text-xl'>Eventi</div>}
            {pathname === "/like-rank" && <div className='text-white text-xl'>Classifica Discoteche</div>}
        </>
    )
}

export default SearchBar