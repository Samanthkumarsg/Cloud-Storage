import React from 'react'
import { AiFillCloud } from "react-icons/ai";

function Header() {
    return (
        <div className='text-xl font-bold py-8 bg-white text-gray-800 flex flex-row items-center justify-center '>
            <AiFillCloud className='text-lg h-8 w-8 stroke text-indigo-500 animate-pulse mr-2' />Seal Storage
        </div>
    )
}

export default Header