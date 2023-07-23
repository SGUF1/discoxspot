"use client"
import { Discoteca } from '@/type'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')

    
    return (    
        <div className='flex items-center'>
            <input type='text' placeholder='search' className='bg-gray-300 p-2 rounded-full text-black w-72 h-9 text-sm' value={searchTerm} onChange={(e: any) => setSearchTerm(e.target.value)}/>
            <SearchIcon className='h-5 w-5 absolute ml-64 text-black ' />
        </div>
    )
}

export default SearchBar