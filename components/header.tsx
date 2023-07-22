import React from 'react'
import Image from 'next/image'
import SearchBar from './searchbar'
const Header = () => {
    return (
        <div className='flex justify-between items-center'>
            <div>
                <Image src={"https://res.cloudinary.com/dg2hpjtdh/image/upload/v1688768031/htzdr7jksuvpdn3uy3vc.jpg"} alt='logo' width={50} height={50} />
            </div>
            <div>
                <SearchBar/>
            </div>
            
        </div>
    )
}

export default Header