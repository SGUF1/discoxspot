import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
    return (
        <div className='flex items-center'>
            <input type='text' placeholder='search' className='bg-gray-300 p-2 rounded-full text-black w-72 h-9 text-sm' />
            <SearchIcon className='h-5 w-5 absolute ml-64 text-black ' />
        </div>
    )
}

export default SearchBar