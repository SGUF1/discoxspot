import React from 'react'
import { Users2 } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
const LeftBar = () => {

    return (
        <div className='w-2/12 border-r h-[max-content] mt-10 flex flex-col gap-6 justify-center items-center border-red-200 sm:w-44'>
            <div className='flex items-center'>
                <Users2 className='h-7 w-7' />
                <span className='ml-2 hidden sm:block'>Invita amici</span>
            </div><div className='flex items-center'>
                <Users2 className='h-7 w-7' />
                <span className='ml-2 hidden sm:block'>Invita amici</span>
            </div><div className='flex items-center'>
                <Users2 className='h-7 w-7' />
                <span className='ml-2 hidden sm:block'>Invita amici</span>
            </div><div className='flex items-center'>
                <Users2 className='h-7 w-7' />
                <span className='ml-2 hidden sm:block'>Invita amici</span>
            </div><div className='flex items-center'>
                <Users2 className='h-7 w-7' />
                <span className='ml-2 hidden sm:block'>Invita amici</span>
            </div>

            <div className='mt-52 sm:mt-60 self-start sm:ml-6'>
                <UserButton signInUrl='/'/>
            </div>
        </div>
    )
}

export default LeftBar