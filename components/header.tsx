"use client"

import React from 'react'
import Image from 'next/image'
import SearchBar from './searchbar'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const preventDefault = (event: any) => {
        event.preventDefault();
    };
    return (
        <div className='flex justify-between items-center p-2 lg:p-5 lg:px-20 w-full '>
            <div onDragStart={preventDefault}
                onContextMenu={preventDefault}
                // @ts-ignore
                style={{ userDrag: 'none', userSelect: 'none' }}>
                {/* <Image src={"https://res.cloudinary.com/dg2hpjtdh/image/upload/v1688768031/htzdr7jksuvpdn3uy3vc.jpg"} onClick={() => router.push("/")} alt='logo' width={50} height={50} /> */}
                <Image src={"/dxs_logo.png"} alt='image' width={140} height={90} className='w-[150px] lg:w-[200px]' onClick={() => router.push("/")} />
            </div>
            <div>
                <SearchBar />
            </div>

        </div>
    )
}

export default Header